# Safari Installation Guide

## Prerequisites

1. **macOS**: Safari extensions only work on macOS
2. **Safari 14+**: Make sure you're using Safari 14 or later
3. **Developer Mode**: You'll need to enable developer mode in Safari

## Installation Steps

### Step 1: Enable Developer Mode

1. Open **Safari**
2. Go to **Safari** → **Preferences** (or **Settings** in newer versions)
3. Click on the **Advanced** tab
4. Check the box that says **"Show Develop menu in menu bar"**
5. Close the preferences window

### Step 2: Enable Extension Development

1. In Safari, go to **Develop** → **Show Extension Builder**
2. If you don't see "Show Extension Builder", you may need to:
   - Go to **Safari** → **Preferences** → **Advanced**
   - Check **"Show Develop menu in menu bar"**
   - Restart Safari

### Step 3: Create Extension Project

1. In the Extension Builder, click the **"+"** button
2. Select **"New Extension"**
3. Give your extension a name: **"YouTube Shorts Limit Tracker"**
4. Click **"Create Extension"**

### Step 4: Configure Extension

1. **General Tab**:
   - Extension Name: `YouTube Shorts Limit Tracker`
   - Version: `1.0`
   - Description: `Tracks YouTube Shorts visits and shows popup when limit reached`

2. **Permissions Tab**:
   - Add **"Access to websites"** permission
   - Add the pattern: `https://www.youtube.com/*`

3. **Injected Content Tab**:
   - Click **"+"** to add a new script
   - Name: `Content Script`
   - Script: Copy the contents of `content-safari.js`
   - Match Pattern: `https://www.youtube.com/shorts/*`

4. **Extension Website Tab**:
   - Add the popup HTML: Copy the contents of `popup-safari.html`
   - Add the popup script: Copy the contents of `popup-safari.js`

### Step 5: Add Icons

1. In the Extension Builder, go to the **General** tab
2. Click **"Choose Icon"** for each icon size
3. Use the PNG files you created from the SVG:
   - `icon16.png` (16x16)
   - `icon48.png` (48x48)
   - `icon128.png` (128x128)

### Step 6: Build and Install

1. Click **"Build"** in the Extension Builder
2. If successful, click **"Install"**
3. Safari will ask for permission - click **"Allow"**

## Alternative: Manual Installation

If the Extension Builder doesn't work, you can create the extension manually:

### Step 1: Create Extension Directory

```bash
mkdir ~/Desktop/YouTube-Shorts-Tracker.safariextension
cd ~/Desktop/YouTube-Shorts-Tracker.safariextension
```

### Step 2: Create Info.plist

Create a file called `Info.plist` with this content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Author</key>
    <string>Your Name</string>
    <key>CFBundleDisplayName</key>
    <string>YouTube Shorts Limit Tracker</string>
    <key>CFBundleIdentifier</key>
    <string>com.yourname.youtube-shorts-tracker</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>Chrome</key>
    <dict>
        <key>Global Page</key>
        <string>background-safari.js</string>
        <key>Popovers</key>
        <array>
            <dict>
                <key>Filename</key>
                <string>popup-safari.html</string>
                <key>Height</key>
                <integer>400</integer>
                <key>Identifier</key>
                <string>popup</string>
                <key>Width</key>
                <integer>320</integer>
            </dict>
        </array>
        <key>Toolbar</key>
        <array>
            <dict>
                <key>Command</key>
                <string>show-popup</string>
                <key>Identifier</key>
                <string>toolbar</string>
                <key>Popover</key>
                <string>popup</string>
                <key>Tool Tip</key>
                <string>YouTube Shorts Tracker</string>
            </dict>
        </array>
    </dict>
    <key>Content</key>
    <dict>
        <key>Scripts</key>
        <dict>
            <key>End</key>
            <array>
                <string>content-safari.js</string>
            </array>
        </dict>
        <key>Whitelist</key>
        <array>
            <string>https://www.youtube.com/shorts/*</string>
        </array>
    </dict>
    <key>Description</key>
    <string>Tracks YouTube Shorts visits and shows popup when limit reached</string>
    <key>DeveloperIdentifier</key>
    <string>YOUR_DEVELOPER_ID</string>
    <key>Permissions</key>
    <dict>
        <key>Website Access</key>
        <dict>
            <key>Allowed Domains</key>
            <array>
                <string>https://www.youtube.com/*</string>
            </array>
            <key>Include Secure Pages</key>
            <true/>
        </dict>
    </dict>
    <key>Update Manifest URL</key>
    <string></string>
    <key>Website</key>
    <string>https://github.com/yourusername/youtube-shorts-tracker</string>
</dict>
</plist>
```

### Step 3: Copy Files

Copy these files to the extension directory:
- `content-safari.js`
- `background-safari.js`
- `popup-safari.html`
- `popup-safari.js`
- `icon16.png`
- `icon48.png`
- `icon128.png`

### Step 4: Install Extension

1. Double-click the `.safariextension` folder
2. Safari will ask if you want to install the extension
3. Click **"Install"**

## Testing the Extension

1. **Open Safari** and go to any YouTube Shorts page
2. **Click the extension icon** in the toolbar to open the popup
3. **Set your limit** and test the tracking functionality
4. **Visit multiple shorts** to see the counter increase
5. **Reach your limit** to see the popup notification

## Troubleshooting

### Extension Not Appearing
- Make sure you enabled the Develop menu
- Check that the extension was built successfully
- Try restarting Safari

### Popup Not Working
- Check the console for JavaScript errors
- Make sure all files are in the correct location
- Verify the Info.plist configuration

### Tracking Not Working
- Ensure you're on a YouTube Shorts page (URL contains `/shorts/`)
- Check that the content script is properly injected
- Look for errors in the Safari Web Inspector console

### Storage Issues
- Safari uses localStorage instead of chrome.storage
- Data persists until you clear browser data
- Check Safari's Privacy settings

## Differences from Chrome Version

1. **Storage**: Uses localStorage instead of chrome.storage.session
2. **Manifest**: Uses manifest v2 format instead of v3
3. **Background**: Uses background scripts instead of service workers
4. **Permissions**: Different permission structure
5. **Installation**: Requires Extension Builder or manual installation
6. **Development**: More complex development process

## Updating the Extension

1. Make your changes to the files
2. In Extension Builder, click **"Build"** again
3. Click **"Install"** to update the extension
4. Or manually replace files and restart Safari

## Uninstalling

1. Go to **Safari** → **Preferences** → **Extensions**
2. Find your extension and click **"Uninstall"**
3. Or delete the `.safariextension` folder 