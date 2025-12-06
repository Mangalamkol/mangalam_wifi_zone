#!/usr/bin/env bash
set -euo pipefail
if [ -z "${RENDER_DEPLOY_HOOK:-}" ]; then
  echo "RENDER_DEPLOY_HOOK not set. Falling back to secret variable usage in GitHub Actions."
fi
echo "Triggering Render deploy hook..."
curl -s -X POST "$RENDER_DEPLOY_HOOK" || echo "curl failed (check RENDER_DEPLOY_HOOK)"
echo "Done."
