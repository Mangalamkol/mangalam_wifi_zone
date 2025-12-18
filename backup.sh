#!/bin/bash
# === Mangalam WiFi Zone : Daily Backup Script ===

DATE=$(date +"%Y-%m-%d_%H-%M")
BACKUP_DIR="$HOME/backups"
APP_DIR="$HOME/myapp"

mkdir -p $BACKUP_DIR

# MongoDB Backup
mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/mongo_$DATE"

# Project Backup
tar -czf $BACKUP_DIR/app_$DATE.tar.gz $APP_DIR

echo "BACKUP DONE : $DATE"