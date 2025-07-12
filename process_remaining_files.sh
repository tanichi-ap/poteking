#!/bin/bash

# Get list of remaining files that need GTM code
remaining_files=($(find /mnt/d/tanichi/cursor_pj/poteking -name "*.html" -type f | grep -v "index.html" | grep -v "ai-application-form.html" | xargs grep -L "Google Tag Manager" | head -20))

echo "Found ${#remaining_files[@]} files to process in this batch"

# List the files
for file in "${remaining_files[@]}"; do
    echo "$(basename "$file")"
done