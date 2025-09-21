# YouTube Shorts Limit Tracker

A cross-browser extension that tracks YouTube Shorts visits and notifies you when you reach a configurable limit. Available for Chrome and Safari with optimized implementations for each browser.

## 🚀 Quick Start

### Chrome Extension
1. Open `chrome://extensions/`
2. Enable Developer mode (toggle in top right)
3. Click "Load unpacked" → select `chrome-extension/` folder
4. Pin the extension to your toolbar

### Safari Extension
1. Enable Developer mode in Safari (Safari → Preferences → Advanced)
2. Use Safari Extension Builder or manual installation
3. See [Safari Installation Guide](safari-extension/README.md)

## 📁 Project Structure

```
├── chrome-extension/     # Chrome Manifest V3 extension
│   ├── manifest.json     # Chrome extension configuration
│   ├── background.js     # Service worker
│   ├── content.js        # Content script for tracking
│   ├── popup.html        # Extension popup interface
│   ├── popup.js          # Popup functionality
│   └── icons/            # Extension icons
├── safari-extension/     # Safari Manifest V3 extension
│   ├── manifest.json     # Safari extension configuration
│   ├── background.js     # Background service worker
│   ├── content.js        # Content script for tracking
│   ├── popup.html        # Extension popup interface
│   ├── popup.js          # Popup functionality
│   └── icons/            # Extension icons
├── INSTALL.md           # Installation guide
├── TROUBLESHOOTING.md   # Troubleshooting guide
└── README.md           # This file
```

## 🎯 Features

- **Smart Session Tracking**: Counts unique YouTube Shorts visited per session
- **Configurable Limits**: Set your daily limit (1-100, default: 10)
- **Visual Progress Bar**: Color-coded progress indicator
  - 🟢 Green: Normal usage (0-60%)
  - 🟡 Yellow: Approaching limit (60-80%)
  - 🔴 Red: Near/at limit (80%+)
- **Smart Notifications**: Popup alerts when limit is reached
- **Session Management**: Reset session anytime
- **Cross-Browser Support**: Optimized for Chrome and Safari
- **Real-time Updates**: Live progress tracking
- **Session Duration**: Track how long your session has been active

## 🔧 Technical Details

### Chrome Extension
- **Manifest Version**: 3
- **Storage**: `chrome.storage.session` (auto-cleared on browser close)
- **Background**: Service Worker
- **Permissions**: `storage`, `activeTab`, `scripting`

### Safari Extension
- **Manifest Version**: 3
- **Storage**: `chrome.storage.local` (persistent until manually cleared)
- **Background**: Service Worker
- **Permissions**: `storage`

## 📚 Documentation

- **[Chrome Guide](chrome-extension/README.md)** - Chrome installation & usage
- **[Safari Guide](safari-extension/README.md)** - Safari installation & usage
- **[Installation Guide](INSTALL.md)** - Detailed setup instructions
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions

## 🔒 Privacy & Security

- **Local Storage Only**: All data stored locally in your browser
- **No External Communication**: No data sent to external servers
- **Minimal Permissions**: Only accesses YouTube Shorts pages
- **Session Isolation**: Chrome data auto-cleared, Safari data user-controlled
- **Open Source**: Full source code available for review

## 🛠️ Development

### Chrome Development
1. Edit files in `chrome-extension/`
2. Go to `chrome://extensions/`
3. Click refresh icon on extension card
4. Test your changes

### Safari Development
1. Edit files in `safari-extension/`
2. Use Safari Extension Builder or manual installation
3. Click "Build" and "Install" to update
4. Test in Safari

### Key Implementation Differences

| **Aspect**          | **Chrome Extension**            | **Safari Extension**        |
|---------------------|---------------------------------|-----------------------------|
| **Storage**         | `chrome.storage.session`        | `chrome.storage.local`      |
| **Data Persistence**| Session-only                    | Persistent                  |
| **Manifest**        | V3                              | V3                          |
| **Background**      | Service Worker                  | Service Worker              |
| **Installation**    | Load unpacked                   | Extension Builder           |

## 🐛 Troubleshooting

- **Extension not working?** Check browser permissions and console errors
- **Tracking issues?** Ensure you're on YouTube Shorts pages (`/shorts/`)
- **Storage problems?** Check browser storage settings
- **See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)** for detailed solutions

## 📄 License

MIT License - Open source and free to use. 