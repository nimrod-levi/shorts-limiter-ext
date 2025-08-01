#!/bin/bash

echo "🔍 Verifying YouTube Shorts Limit Tracker Project Structure..."
echo "=================================================="

# Check for required directories
echo "📁 Checking directories..."
for dir in chrome-extension safari-extension shared; do
    if [ -d "$dir" ]; then
        echo "✅ $dir/ exists"
    else
        echo "❌ $dir/ missing"
    fi
done

echo ""
echo "📄 Checking Chrome extension files..."
chrome_files=("manifest.json" "content.js" "background.js" "popup.html" "popup.js" "icon16.png" "icon48.png" "icon128.png")
for file in "${chrome_files[@]}"; do
    if [ -f "chrome-extension/$file" ]; then
        echo "✅ chrome-extension/$file"
    else
        echo "❌ chrome-extension/$file missing"
    fi
done

echo ""
echo "📄 Checking Safari extension files..."
safari_files=("manifest.json" "content.js" "background.js" "popup.html" "popup.js" "icon16.png" "icon48.png" "icon128.png")
for file in "${safari_files[@]}"; do
    if [ -f "safari-extension/$file" ]; then
        echo "✅ safari-extension/$file"
    else
        echo "❌ safari-extension/$file missing"
    fi
done

echo ""
echo "📄 Checking shared files..."
shared_files=("icon128.png")
for file in "${shared_files[@]}"; do
    if [ -f "shared/$file" ]; then
        echo "✅ shared/$file"
    else
        echo "❌ shared/$file missing"
    fi
done

echo ""
echo "📄 Checking root files..."
root_files=("README.md" "INSTALL.md" ".gitignore" "TROUBLESHOOTING.md")
for file in "${root_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file missing"
    fi
done


echo ""
echo "🎯 Project Structure Verification Complete!"
echo "==================================================" 