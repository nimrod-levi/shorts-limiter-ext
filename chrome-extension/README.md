# YouTube Shorts Limit Tracker - Chrome Extension

A Chrome extension that tracks YouTube Shorts visits and notifies you when you reach a configurable limit. Built with Manifest V3 and optimized for Chrome's security model.

## ✨ Features

- **Smart Session Tracking**: Counts unique YouTube Shorts visited per browser session
- **Configurable Limits**: Set your daily limit (1-100, default: 10)
- **Visual Progress Bar**: Color-coded progress indicator with real-time updates
- **Smart Notifications**: Popup alerts when limit is reached
- **Session Management**: Reset session anytime with one click
- **Session Duration**: Track how long your current session has been active
- **Beautiful UI**: Modern gradient-based interface with glassmorphism effects
- **Real-time Updates**: Live progress tracking across all tabs

## 🚀 Installation

### Quick Install
1. **Open Chrome** and navigate to `chrome://extensions/`
2. **Enable Developer mode** (toggle switch in top right corner)
3. **Click "Load unpacked"** and select the `chrome-extension` folder
4. **Pin the extension** to your toolbar for easy access

### Verification
- The extension icon should appear in your Chrome toolbar
- Click the icon to open the popup and verify it's working
- Visit a YouTube Shorts page to test tracking

## 📱 Usage

### Automatic Tracking
- **No setup required** - the extension automatically tracks when you visit YouTube Shorts
- **Unique counting** - each short is counted only once per session
- **Cross-tab tracking** - counts shorts across all Chrome tabs
- **Session isolation** - data is automatically cleared when you close Chrome

### Configuration
- **Click the extension icon** to open the popup interface
- **Set your limit** using the number input (1-100)
- **View progress** with the visual progress bar
- **Reset session** anytime to start fresh
- **Monitor session time** to see how long you've been browsing

### Visual Indicators
The progress bar changes color based on your usage:
- 🟢 **Green**: Normal usage (0-60% of limit)
- 🟡 **Yellow**: Approaching limit (60-80% of limit)  
- 🔴 **Red**: Near or at limit (80%+ of limit)

### Notifications
- **Limit reached popup** appears on YouTube when you hit your limit
- **Auto-dismiss** after 10 seconds or close manually
- **Non-intrusive** - appears in top-right corner of the page

## 🏗️ Technical Architecture

### Files Structure
```
chrome-extension/
├── manifest.json          # Manifest V3 configuration
├── background.js          # Service worker for data management
├── content.js            # Content script for page tracking
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality and UI logic
├── icon16.png            # Extension icon (16x16)
├── icon48.png            # Extension icon (48x48)
├── icon128.png           # Extension icon (128x128)
└── README.md             # This documentation
```

### How It Works

1. **Content Script** (`content.js`):
   - Runs on YouTube Shorts pages (`https://www.youtube.com/shorts/*`)
   - Detects page navigation and extracts shorts ID from URL
   - Sends tracking data to background script
   - Shows limit notification popup when needed

2. **Background Service Worker** (`background.js`):
   - Manages data storage using `chrome.storage.session`
   - Handles communication between content script and popup
   - Tracks unique shorts visits and session data
   - Provides real-time updates to popup

3. **Popup Interface** (`popup.html` + `popup.js`):
   - Displays current session statistics
   - Allows limit configuration (1-100)
   - Shows visual progress bar with color coding
   - Provides session reset functionality
   - Shows session duration

4. **Storage System**:
   - Uses `chrome.storage.session` for temporary data
   - Data automatically cleared when browser closes
   - Stores: visited shorts IDs, limit setting, session start time

## 🔒 Privacy & Security

- **Local Storage Only**: All data stored locally in Chrome's session storage
- **No External Communication**: No data sent to external servers
- **Minimal Permissions**: Only requires `storage`, `activeTab`, and `scripting`
- **Session Isolation**: Data automatically cleared when browser closes
- **YouTube Only**: Only accesses YouTube Shorts pages
- **Open Source**: Full source code available for security review

## 🛠️ Development

### Setup Development Environment
1. Clone or download the extension files
2. Open Chrome and go to `chrome://extensions/`
3. Enable Developer mode
4. Click "Load unpacked" and select the `chrome-extension` folder

### Making Changes
1. **Edit files** in your preferred code editor
2. **Go to** `chrome://extensions/`
3. **Click refresh** icon on the extension card
4. **Test changes** by visiting YouTube Shorts pages

### Debugging
- **Console logs**: Check Chrome DevTools console for debugging info
- **Extension popup**: Right-click extension icon → "Inspect popup"
- **Background script**: Go to `chrome://extensions/` → extension details → "Inspect views: background page"
- **Content script**: Use YouTube page DevTools console

## 🐛 Troubleshooting

### Extension Not Working
- ✅ Ensure you're on a YouTube Shorts page (URL contains `/shorts/`)
- ✅ Check that the extension is enabled in `chrome://extensions/`
- ✅ Try refreshing the page or resetting the session
- ✅ Check Chrome console for error messages

### Tracking Issues
- ✅ Verify extension has permission to access YouTube
- ✅ Try visiting different YouTube Shorts pages
- ✅ Reset the session from the extension popup
- ✅ Check if ad blockers are interfering

### Popup Not Showing
- ✅ Ensure extension is pinned to toolbar
- ✅ Try clicking the extension icon
- ✅ Check if popup is blocked by browser settings
- ✅ Verify extension is not disabled

### Storage Problems
- ✅ Check Chrome storage settings
- ✅ Clear browser data if needed
- ✅ Reset the extension if data is corrupted

## 📋 Requirements

- **Chrome Version**: 88+ (Manifest V3 support)
- **Permissions**: `storage`, `activeTab`, `scripting`
- **Host Permissions**: `https://www.youtube.com/*`
- **Content Scripts**: `https://www.youtube.com/shorts/*`

## 📄 License

This project is open source and available under the MIT License. 