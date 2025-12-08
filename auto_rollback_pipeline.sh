#!/usr/bin/env bash
# auto_rollback_pipeline.sh
# Auto deploy + rollback for Render. Creates snapshot tags, triggers deploy, polls status, rollback on failure.
set -u
# Don't 'set -e' globally because we want to handle errors explicitly in places.

########################################
# CONFIG - Replace these values
########################################
GITHUB_URL="${GITHUB_URL:-https://github.com/Mangalamkol/Manngalam-WiFi-Zone.git}"
BRANCH="${BRANCH:-main}"
RENDER_SERVICE_ID="${RENDER_SERVICE_ID:-srv-your-service-id}"      # <-- replace
RENDER_API_KEY="${RENDER_API_KEY:-YOUR_RENDER_API_KEY}"            # <-- replace
POLL_INTERVAL_SECONDS=8
POLL_TIMEOUT_SECONDS=900   # 15 minutes
LOGFILE="${LOGFILE:-auto_rollback.log}"

# Optional: which folder to use as repo root; change if script runs from different cwd
PROJECT_ROOT="${PROJECT_ROOT:-$(pwd)}"

########################################
# HELPER FUNCTIONS
########################################
timestamp() { date "+%Y-%m-%d %H:%M:%S"; }
log() { echo "[$(timestamp)] $*" | tee -a "$LOGFILE"; }

die() {
  log "❌ $*"
  exit 1
}

# sanity
command -v git >/dev/null 2>&1 || die "git required"
command -v curl >/dev/null 2>&1 || die "curl required"
command -v jq >/dev/null 2>&1 || die "jq required"

cd "$PROJECT_ROOT" || die "Cannot cd to project root"

########################################
# 1) ensure git remote + branch exist
########################################
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  log "No git repo found — initializing"
  git init
fi

if ! git rev-parse --verify "$BRANCH" >/dev/null 2>&1; then
  git checkout -B "$BRANCH"
else
  git checkout "$BRANCH"
fi

if git remote get-url origin >/dev/null 2>&1; then
    git remote set-url origin "$GITHUB_URL"
else
    log "Setting origin to $GITHUB_URL"
    git remote add origin "$GITHUB_URL" || die "Failed to add remote"
fi

########################################
# 2) create snapshot tag (timestamped)
########################################
SNAP_TAG="snapshot-$(date +%Y%m%d-%H%M%S)"
log "Creating snapshot tag: $SNAP_TAG"
git add -A
# If there are changes, commit them before tagging
if ! git diff --quiet || ! git diff --staged --quiet; then
  git commit -m "autosnapshot: pre-deploy snapshot $SNAP_TAG" || log "No changes to commit (commit may have failed)"
fi
git tag -f "$SNAP_TAG"
git push origin "$BRANCH" --force || die "push failed"
git push origin "refs/tags/$SNAP_TAG" --force || log "tag push failed (continuing)"

########################################
# 3) create a "last-known-good" pointer if none exists
########################################
# We keep a lightweight 'last-good' tag name that points to last successful snapshot.
LAST_GOOD_TAG="last-good-deploy"

if ! git show-ref --tags | grep -q "$LAST_GOOD_TAG" ; then
  # create initial last-good that points to current commit (safe default)
  git tag -f "$LAST_GOOD_TAG" HEAD
  git push origin "refs/tags/$LAST_GOOD_TAG" --force || log "Initial last-good tag push failed"
  log "Initialized tag $LAST_GOOD_TAG"
fi

########################################
# 4) Trigger Render Deploy
########################################
trigger_render_deploy(){
  log "Triggering Render deploy for service $RENDER_SERVICE_ID"
  # create a deploy via Render API - uses a POST to /deploys
  resp=$(curl -sS -X POST "https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys" \
    -H "Authorization: Bearer ${RENDER_API_KEY}" \
    -H "Accept: application/json" \
    -d '{}')
  if echo "$resp" | jq -e .id >/dev/null 2>&1; then
    deploy_id=$(echo "$resp" | jq -r .id)
    log "Deploy triggered: id=$deploy_id"
    echo "$deploy_id"
  else
    log "Render API trigger failed: $resp"
    return 1
  fi
}

########################################
# 5) Poll deploy status until success/failure/timeout
########################################
poll_deploy_status(){
  local deploy_id="$1"
  local waited=0
  while [ $waited -lt $POLL_TIMEOUT_SECONDS ]; do
    resp=$(curl -sS -X GET "https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys/${deploy_id}" \
      -H "Authorization: Bearer ${RENDER_API_KEY}" \
      -H "Accept: application/json")
    status=$(echo "$resp" | jq -r .state // "unknown")
    log "Deploy $deploy_id status: $status"
    case "$status" in
      "queued"|"created"|"building"|"deploying")
        sleep $POLL_INTERVAL_SECONDS
        waited=$((waited + POLL_INTERVAL_SECONDS))
        ;;
      "live")
        log "✅ Deploy succeeded (state=live)"
        return 0
        ;;
      "failed"|"errored"|"cancelled")
        log "❌ Deploy failed with state=$status"
        return 2
        ;;
      *)
        log "Unknown deploy state: $status"
        sleep $POLL_INTERVAL_SECONDS
        waited=$((waited + POLL_INTERVAL_SECONDS))
        ;;
    esac
  done
  log "⏱️ Poll timeout after $POLL_TIMEOUT_SECONDS seconds"
  return 3
}

########################################
# 6) Perform deploy & poll
########################################
DEPLOY_ID=$(trigger_render_deploy) || die "Could not trigger render deploy"

poll_deploy_status "$DEPLOY_ID"
POLL_RESULT=$?

if [ $POLL_RESULT -eq 0 ]; then
  # Success: update last-good pointer to this snapshot
  log "Marking $SNAP_TAG as last good"
  git tag -f "$LAST_GOOD_TAG" "$SNAP_TAG"
  git push origin "refs/tags/$LAST_GOOD_TAG" --force || log "Warning: pushing last-good tag failed"
  log "🎉 Deploy completed successfully"
  exit 0
fi

########################################
# 7) DEPLOY FAILED -> AUTOMATIC ROLLBACK
########################################
log "Starting automatic rollback to $LAST_GOOD_TAG"

# Fetch the tag commit
if git rev-parse --verify "refs/tags/$LAST_GOOD_TAG" >/dev/null 2>&1; then
  LAST_GOOD_COMMIT=$(git rev-list -n 1 "$LAST_GOOD_TAG")
  log "Last-good commit: $LAST_GOOD_COMMIT"
else
  log "No $LAST_GOOD_TAG tag found locally; trying to fetch"
  git fetch origin "refs/tags/$LAST_GOOD_TAG" || log "Could not fetch last-good tag; aborting rollback"
  if git rev-parse --verify "refs/tags/$LAST_GOOD_TAG" >/dev/null 2>&1; then
    LAST_GOOD_COMMIT=$(git rev-list -n 1 "$LAST_GOOD_TAG")
  else
    die "No last-good tag available — manual intervention required"
  fi
fi

# Create a rollback commit by resetting branch to last-good commit
ROLLBACK_BRANCH="rollback-$(date +%Y%m%d-%H%M%S)"
git checkout -B "$ROLLBACK_BRANCH" "$LAST_GOOD_COMMIT" || die "Failed to create rollback branch"

# Push rollback branch and set main to point to it (force update)
git push origin "$ROLLBACK_BRANCH:$BRANCH" --force || die "Failed to push rollback to origin"

log "Rollback branch pushed as $BRANCH. Triggering deploy of rollback..."

NEW_DEPLOY_ID=$(trigger_render_deploy) || die "Failed to trigger rollback deploy"

poll_deploy_status "$NEW_DEPLOY_ID"
NEW_POLL_RESULT=$?

if [ $NEW_POLL_RESULT -eq 0 ]; then
  log "✅ Rollback deploy succeeded. Branch $BRANCH is now at $LAST_GOOD_COMMIT"
  # update last-good tag to the commit (it's already pointing)
  git tag -f "$LAST_GOOD_TAG" "$LAST_GOOD_COMMIT"
  git push origin "refs/tags/$LAST_GOOD_TAG" --force || log "Warning: pushing last-good tag failed"
  exit 0
else
  log "❌ Rollback deploy also failed. Manual recovery required. See $LOGFILE"
  exit 2
fi
