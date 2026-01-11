#!/bin/bash

# Create a zip file of the entire project
PROJECT_NAME="rock-lab-website"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ZIP_FILE="${PROJECT_NAME}_${TIMESTAMP}.zip"

echo "Creating zip file: $ZIP_FILE"

# Exclude node_modules, dist, and git files from the zip
zip -r "$ZIP_FILE" . \
  -x "node_modules/*" \
  ".git/*" \
  ".gitignore" \
  "dist/*" \
  "$ZIP_FILE" \
  ".DS_Store" \
  "*.log"

if [ $? -eq 0 ]; then
  echo "✓ Successfully created: $ZIP_FILE"
  echo "File size: $(du -h "$ZIP_FILE" | cut -f1)"
  echo ""
  echo "Download your site files from:"
  echo "  $PWD/$ZIP_FILE"
else
  echo "✗ Error creating zip file"
  exit 1
fi
