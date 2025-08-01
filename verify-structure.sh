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
safari_files=("manifest-safari.json" "content-safari.js" "background-safari.js" "popup-safari.html" "popup-safari.js" "icon16.png" "icon48.png" "icon128.png")
for file in "${safari_files[@]}"; do
    if [ -f "safari-extension/$file" ]; then
        echo "✅ safari-extension/$file"
    else
        echo "❌ safari-extension/$file missing"
    fi
done

echo ""
echo "📄 Checking shared files..."
shared_files=("icon128.png" "SAFARI_INSTALLATION.md")
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
echo "🧹 Checking for unwanted files..."
unwanted_files=(".DS_Store" "~/")
for file in "${unwanted_files[@]}"; do
    if [ -e "$file" ]; then
        echo "⚠️  Found unwanted file: $file"
    else
        echo "✅ No unwanted file: $file"
    fi
done

echo ""
echo "🎯 Project Structure Verification Complete!"
echo "==================================================" 