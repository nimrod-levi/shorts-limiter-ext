# YouTube Shorts Limit Tracker - Safari Extension

A Safari extension that tracks the number of YouTube Shorts pages visited in a session and shows a popup notification when a configurable limit is reached.

## Features

- **Session Tracking**: Tracks unique YouTube Shorts visited during a browser session
- **Configurable Limit**: Set your own limit for maximum shorts per session (default: 10)
- **Visual Progress**: See your progress with a visual progress bar
- **Popup Notifications**: Get notified when you reach your limit
- **Session Reset**: Reset your session to start fresh
- **Beautiful UI**: Modern, gradient-based interface

## Prerequisites

1. **macOS**: Safari extensions only work on macOS
2. **Safari 14+**: Make sure you're using Safari 14 or later
3. **Developer Mode**: You'll need to enable developer mode in Safari

## Installation

### Method 1: Extension Builder (Recommended)

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
   - Use the PNG files created from `icon.svg`
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

2. **Create Info.plist**:
   - Copy the Info.plist content from the main `SAFARI_INSTALLATION.md`
   - Save as `Info.plist` in the extension directory

3. **Copy Files**:
   - Copy all files from this `safari-extension` folder
   - Add the icon PNG files

4. **Install**:
   - Double-click the `.safariextension` folder
   - Click "Install" when Safari prompts

## Usage

### Basic Tracking
- The extension automatically tracks when you visit YouTube Shorts pages
- Each unique short is counted only once per session
- Session data persists until you clear browser data or reset the session

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
safari-extension/
├── manifest.json  # Safari manifest
├── content.js     # Safari content script
├── background.js  # Safari background script
├── popup.html    # Safari popup interface
├── popup.js      # Safari popup functionality
├── icon16.png           # Extension icon (16x16)
├── icon48.png           # Extension icon (48x48)
├── icon128.png          # Extension icon (128x128)
└── README.md            # This file
```

## How It Works

1. **Content Script**: Runs on YouTube Shorts pages and tracks visits
2. **Local Storage**: Uses localStorage to persist data (survives browser restarts)
3. **URL Tracking**: Extracts the shorts ID from the URL to track unique visits
4. **Popup System**: Creates a notification popup when the limit is reached
5. **Background Script**: Manages data and handles communication

## Privacy

- All data is stored locally in your browser's localStorage
- No data is sent to external servers
- Data persists until you clear browser data or reset the session
- The extension only accesses YouTube Shorts pages

## Troubleshooting

**Extension not appearing?**
- Make sure you enabled the Develop menu
- Check that the extension was built successfully
- Try restarting Safari

**Popup not working?**
- Check the console for JavaScript errors
- Make sure all files are in the correct location
- Verify the Info.plist configuration

**Tracking not working?**
- Ensure you're on a YouTube Shorts page
- Check Safari's Privacy settings
- Look for errors in the Safari Web Inspector console

**Storage issues?**
- Safari uses localStorage instead of chrome.storage
- Data persists until you clear browser data
- Check Safari's Privacy settings

## Development

To modify the extension:

1. Edit the files as needed
2. In Extension Builder, click **"Build"** again
3. Click **"Install"** to update the extension
4. Or manually replace files and restart Safari

## Differences from Chrome Version

| Feature | Chrome | Safari |
|---------|--------|--------|
| Storage | `chrome.storage.session` | `localStorage` |
| Manifest | v3 | v2 |
| Background | Service Worker | Background Script |
| Installation | Load unpacked | Extension Builder/Manual |
| Session Data | Auto-cleared | Persists until cleared |

## Icons

You'll need to create the icon files (`icon16.png`, `icon48.png`, `icon128.png`) from the `icon.svg` file in the parent directory. See `ICON_INSTRUCTIONS.md` for details.

## License

This project is open source and available under the MIT License. 