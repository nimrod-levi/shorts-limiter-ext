# 🔧 Troubleshooting Guide

## Issue: Counter stays at 0

If the extension counter stays at 0 after visiting YouTube Shorts, follow these steps:

### 1. Check Extension Installation

**Chrome:**
1. Go to `chrome://extensions/`
2. Enable Developer mode
3. Make sure the extension is loaded and enabled
4. Check for any error messages in the extension card

**Safari:**
1. Open Safari Extension Builder
2. Ensure the extension is built and installed
3. Check Safari's Privacy settings

### 2. Check Console Logs

**Chrome:**
1. Open YouTube Shorts page
2. Press F12 to open DevTools
3. Go to Console tab
4. Look for messages starting with 🔍, 📊, ✅, or ❌
5. Check for any error messages

**Safari:**
1. Open Safari Developer menu
2. Enable Web Inspector
3. Open Console and check for messages

### 3. Test Storage

Use the debug test page (`test-debug.html`) to:
1. Test Chrome storage functionality
2. Test background message communication
3. Verify data is being saved correctly

### 4. Common Issues

#### Issue: Extension not loading
- **Solution**: Reload the extension in Chrome extensions page
- **Solution**: Rebuild the extension in Safari Extension Builder

#### Issue: Content script not running
- **Check**: Make sure you're on a YouTube Shorts URL (`youtube.com/shorts/...`)
- **Check**: Verify the content script is injected (check console for 🔍 messages)

#### Issue: Storage not working
- **Chrome**: Check if `chrome.storage.session` is available
- **Safari**: Check if `localStorage` is accessible

#### Issue: Background script not responding
- **Check**: Look for 🎯 messages in the background script console
- **Check**: Verify the service worker is active

### 5. Debug Steps

1. **Clear all data:**
   - Chrome: Clear browser data or reset extension
   - Safari: Clear website data for YouTube

2. **Test with a fresh session:**
   - Close all YouTube tabs
   - Open a new YouTube Shorts page
   - Check if tracking starts working

3. **Verify URL matching:**
   - Make sure you're visiting URLs like `https://www.youtube.com/shorts/VIDEO_ID`
   - The extension only works on `/shorts/` URLs

4. **Check permissions:**
   - Ensure the extension has permission to access YouTube
   - Check if any ad blockers are interfering

### 6. Manual Testing

1. Open the extension popup
2. Set a low limit (like 2)
3. Visit 2 different YouTube Shorts
4. Check if the counter increases
5. Check if the limit popup appears

### 7. Reset Extension

If nothing works:
1. Remove the extension completely
2. Clear all browser data
3. Reinstall the extension
4. Test with a fresh session

### 8. Debug Messages

The extension now includes detailed logging:

- 🔍 `Tracking shorts visit:` - Content script detected a shorts page
- 📊 `Background response:` - Response from background script
- ✅ `Shorts visit tracked:` - Successfully tracked a visit
- ❌ `Error tracking shorts visit:` - Error occurred
- 🎯 `Background received trackVisit:` - Background script received message
- 📈 `Updated count:` - New count after adding shorts
- 🔄 `Shorts already visited:` - Duplicate visit detected

### 9. Contact Support

If the issue persists:
1. Take screenshots of console logs
2. Note which browser and version you're using
3. Describe the exact steps to reproduce the issue 