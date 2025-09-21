# YouTube Shorts Limit Tracker - Safari Extension

A Safari extension that tracks YouTube Shorts visits and notifies you when you reach a configurable limit. Built with Manifest V3 and optimized for Safari's security model with persistent data storage.

## ✨ Features

- **Persistent Session Tracking**: Counts unique YouTube Shorts visited with data that survives browser restarts
- **Configurable Limits**: Set your daily limit (1-100, default: 10)
- **Visual Progress Bar**: Color-coded progress indicator with real-time updates
- **Smart Notifications**: Popup alerts when limit is reached
- **Session Management**: Reset session anytime with one click
- **Session Duration**: Track how long your current session has been active
- **Beautiful UI**: Modern gradient-based interface with glassmorphism effects
- **Cross-Browser Compatibility**: Works with both Chrome and Safari APIs
- **Real-time Updates**: Live progress tracking across all tabs

## 🚀 Installation

### Prerequisites
- **macOS**: Safari extensions only work on macOS
- **Safari 14+**: Make sure you're using Safari 14 or later
- **Developer Mode**: Enable developer mode in Safari

### Method 1: Safari Extension Builder (Recommended)

1. **Enable Developer Mode**:
   - Open Safari
   - Go to Safari → Preferences → Advanced
   - Check "Show Develop menu in menu bar"

2. **Open Extension Builder**:
   - Go to Develop → Show Extension Builder
   - Click the "+" button and select "New Extension"
   - Name it "YouTube Shorts Limit Tracker"

3. **Configure Extension**:
   - **General Tab**: Set name, version, and description
   - **Permissions Tab**: Add "Access to websites" for `https://www.youtube.com/*`
   - **Injected Content Tab**: Add content script from `content.js`
   - **Extension Website Tab**: Add popup HTML and script

4. **Add Icons**:
   - Use the PNG files (`icon16.png`, `icon48.png`, `icon128.png`)
   - Add icons for 16x16, 48x48, and 128x128 sizes

5. **Build and Install**:
   - Click "Build" in Extension Builder
   - Click "Install" when successful
   - Allow permissions when prompted

### Method 2: Manual Installation

1. **Create Extension Directory**:
   ```bash
   mkdir ~/Desktop/YouTube-Shorts-Tracker.safariextension
   cd ~/Desktop/YouTube-Shorts-Tracker.safariextension
   ```

2. **Copy Files**:
   - Copy all files from this `safari-extension` folder
   - Ensure all files are in the correct location

3. **Install**:
   - Double-click the `.safariextension` folder
   - Click "Install" when Safari prompts

### Verification
- The extension icon should appear in your Safari toolbar
- Click the icon to open the popup and verify it's working
- Visit a YouTube Shorts page to test tracking

## 📱 Usage

### Automatic Tracking
- **No setup required** - the extension automatically tracks when you visit YouTube Shorts
- **Unique counting** - each short is counted only once per session
- **Cross-tab tracking** - counts shorts across all Safari tabs
- **Persistent data** - data survives browser restarts until manually cleared

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
safari-extension/
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
   - Sends tracking data to background script via message passing
   - Shows limit notification popup when needed
   - Includes Safari-compatible error handling and fallbacks

2. **Background Service Worker** (`background.js`):
   - Manages data storage using `chrome.storage.local`
   - Handles communication between content script and popup
   - Tracks unique shorts visits and session data
   - Provides real-time updates to popup
   - Includes cross-browser compatibility for Chrome and Safari APIs

3. **Popup Interface** (`popup.html` + `popup.js`):
   - Displays current session statistics
   - Allows limit configuration (1-100)
   - Shows visual progress bar with color coding
   - Provides session reset functionality
   - Shows session duration
   - Includes Safari-compatible storage access with fallbacks

4. **Storage System**:
   - Uses `chrome.storage.local` for persistent data storage
   - Data persists across browser restarts until manually cleared
   - Stores: visited shorts IDs, limit setting, session start time
   - Includes unified data structure (`youtubeShortsTracker`)

## 🔒 Privacy & Security

- **Local Storage Only**: All data stored locally in Safari's storage
- **No External Communication**: No data sent to external servers
- **Minimal Permissions**: Only requires `storage` permission
- **Persistent Data**: Data survives browser restarts until manually cleared
- **YouTube Only**: Only accesses YouTube Shorts pages
- **Cross-Browser Compatible**: Works with both Chrome and Safari APIs
- **Open Source**: Full source code available for security review

## 🛠️ Development

### Setup Development Environment
1. Clone or download the extension files
2. Open Safari and enable Developer mode
3. Use Safari Extension Builder or manual installation
4. Configure permissions and content scripts

### Making Changes
1. **Edit files** in your preferred code editor
2. **In Extension Builder**: Click "Build" and "Install" to update
3. **Manual installation**: Replace files and restart Safari
4. **Test changes** by visiting YouTube Shorts pages

### Debugging
- **Console logs**: Check Safari Web Inspector console for debugging info
- **Extension popup**: Right-click extension icon → "Inspect popup"
- **Background script**: Use Safari Web Inspector for background debugging
- **Content script**: Use YouTube page Web Inspector console

## 🐛 Troubleshooting

### Extension Not Appearing
- ✅ Make sure you enabled the Develop menu in Safari
- ✅ Check that the extension was built successfully in Extension Builder
- ✅ Try restarting Safari
- ✅ Verify extension is enabled in Safari preferences

### Tracking Issues
- ✅ Ensure you're on a YouTube Shorts page (URL contains `/shorts/`)
- ✅ Check Safari's Privacy settings for storage access
- ✅ Look for errors in the Safari Web Inspector console
- ✅ Try visiting different YouTube Shorts pages

### Popup Not Working
- ✅ Check the console for JavaScript errors
- ✅ Make sure all files are in the correct location
- ✅ Verify the extension configuration in Extension Builder
- ✅ Try resetting the session from the popup

### Storage Problems
- ✅ Safari uses `chrome.storage.local` instead of `localStorage`
- ✅ Data persists until you clear browser data or reset session
- ✅ Check Safari's Privacy settings for storage access
- ✅ Verify extension has storage permissions

## 📋 Requirements

- **macOS**: Required for Safari extensions
- **Safari Version**: 14+ (Manifest V3 support)
- **Permissions**: `storage`
- **Host Permissions**: `https://www.youtube.com/*`
- **Content Scripts**: `https://www.youtube.com/shorts/*`

## 🔄 Differences from Chrome Version

| Feature | Chrome | Safari |
|---------|--------|--------|
| Storage | `chrome.storage.session` | `chrome.storage.local` |
| Data Persistence | Session only | Persistent |
| Manifest | V3 | V3 |
| Background | Service Worker | Service Worker |
| Installation | Load unpacked | Extension Builder/Manual |
| Session Data | Auto-cleared | Persists until cleared |
| Error Handling | Chrome-specific | Cross-browser compatible |

## 📄 License

This project is open source and available under the MIT License. 