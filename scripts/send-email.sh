#!/bin/bash

STATUS=$1  # pass "success" or "failure"

FROM="$EMAIL_FROM"
TO="$EMAIL_TO"
SMTP_SERVER="email-smtp.ap-south-1.amazonaws.com"
SMTP_PORT="587"
SMTP_USER="$SMTP_USER"
SMTP_PASS="$SMTP_PASSWORD"

REPO="$GITHUB_REPOSITORY"
RUN_ID="$GITHUB_RUN_ID"
BRANCH="$GITHUB_REF_NAME"
NUMBER="$GITHUB_RUN_NUMBER"
ACTOR="$GITHUB_ACTOR"
BUILD_URL="https://github.com/$REPO/actions/runs/$RUN_ID"

if [ "$STATUS" == "success" ]; then
  SUBJECT="✅ Build Success - $REPO - $BRANCH - Build $NUMBER"
  BODY="✅ Build succeeded on branch $BRANCH.\n\nRun: $BUILD_URL.\n\nBuild deployed by $ACTOR"
else
  SUBJECT="❌ Build Failed - $REPO - $BRANCH - Build $NUMBER"
  BODY="❌ Build failed on branch $BRANCH.\n\nRun: $BUILD_URL.\n\nBuild deployed by $ACTOR"
fi

sendemail \
  -f "$FROM" \
  -t "$TO" \
  -u "$SUBJECT" \
  -m "$BODY" \
  -s "$SMTP_SERVER:$SMTP_PORT" \
  -xu "$SMTP_USER" \
  -xp "$SMTP_PASS" \
  -o tls=yes

