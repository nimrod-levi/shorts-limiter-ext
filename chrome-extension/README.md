# YouTube Shorts Limit Tracker - Chrome Extension

A Chrome extension that tracks the number of YouTube Shorts pages visited in a session and shows a popup notification when a configurable limit is reached.

## Features

- **Session Tracking**: Tracks unique YouTube Shorts visited during a browser session
- **Configurable Limit**: Set your own limit for maximum shorts per session (default: 10)
- **Visual Progress**: See your progress with a visual progress bar
- **Popup Notifications**: Get notified when you reach your limit
- **Session Reset**: Reset your session to start fresh
- **Beautiful UI**: Modern, gradient-based interface

## Installation

1. **Download the extension files** to a folder on your computer
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable Developer mode** by toggling the switch in the top right
4. **Click "Load unpacked"** and select the `chrome-extension` folder
5. **Pin the extension** to your toolbar for easy access

## Usage

### Basic Tracking
- The extension automatically tracks when you visit YouTube Shorts pages
- Each unique short is counted only once per session
- Session data is automatically cleared when you close the browser

### Configuration
- **Click the extension icon** to open the popup
- **Set your daily limit** using the input field (1-100)
- **View your progress** with the visual progress bar
- **Reset your session** if you want to start fresh

### Notifications
- When you reach your limit, a red popup will appear on YouTube
- The popup can be dismissed manually or will auto-close after 10 seconds
- The progress bar changes color based on usage:
  - Green: Normal usage
  - Yellow: 60-80% of limit
  - Red: 80%+ of limit

## Files Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── content.js            # Content script for tracking
├── background.js         # Background service worker
├── popup.html           # Extension popup interface
├── popup.js             # Popup functionality
├── icon16.png           # Extension icon (16x16)
├── icon48.png           # Extension icon (48x48)
├── icon128.png          # Extension icon (128x128)
└── README.md            # This file
```

## How It Works

1. **Content Script**: Runs on YouTube Shorts pages and tracks visits
2. **Session Storage**: Uses Chrome's session storage to persist data during the browser session
3. **URL Tracking**: Extracts the shorts ID from the URL to track unique visits
4. **Popup System**: Creates a notification popup when the limit is reached
5. **Background Service**: Manages data and handles communication between components

## Privacy

- All data is stored locally in your browser's session storage
- No data is sent to external servers
- Session data is automatically cleared when you close the browser
- The extension only accesses YouTube Shorts pages

## Troubleshooting

**Extension not working?**
- Make sure you're on a YouTube Shorts page (URL contains `/shorts/`)
- Check that the extension is enabled in `chrome://extensions/`
- Try refreshing the page or resetting the session

**Popup not showing?**
- Check that the extension has permission to access YouTube
- Try visiting a different YouTube Shorts page
- Reset the session from the extension popup

## Development

To modify the extension:

1. Edit the files as needed
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

## Icons

You'll need to create the icon files (`icon16.png`, `icon48.png`, `icon128.png`) from the `icon.svg` file in the parent directory. See `ICON_INSTRUCTIONS.md` for details.

## License

This project is open source and available under the MIT License. 