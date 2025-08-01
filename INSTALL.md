# 🚀 Quick Installation Guide

Choose your browser and follow the installation instructions:

## 🌐 Chrome Installation

1. **Navigate to the Chrome extension folder:**
   ```
   cd chrome-extension
   ```

2. **Open Chrome and go to:** `chrome://extensions/`

3. **Enable Developer mode** (toggle in top right)

4. **Click "Load unpacked"** and select the `chrome-extension` folder

5. **Pin the extension** to your toolbar

📖 **[Detailed Chrome Guide](chrome-extension/README.md)**

## 🍎 Safari Installation

1. **Navigate to the Safari extension folder:**
   ```
   cd safari-extension
   ```

2. **Enable Developer mode in Safari:**
   - Safari → Preferences → Advanced
   - Check "Show Develop menu in menu bar"

3. **Use Safari Extension Builder:**
   - Develop → Show Extension Builder
   - Create new extension
   - Copy code from Safari-specific files

📖 **[Detailed Safari Guide](safari-extension/README.md)**

## 🎨 Icons Required

Both extensions need icon files. Create PNG files from `shared/icon.svg`:

- `icon16.png` (16x16 pixels)
- `icon48.png` (48x48 pixels)  
- `icon128.png` (128x128 pixels)

📖 **[Icon Creation Guide](shared/ICON_INSTRUCTIONS.md)**

## 📁 Project Structure

```
youtube-shorts-tracker/
├── chrome-extension/          # Chrome version
├── safari-extension/          # Safari version
├── shared/                    # Shared resources
└── README.md                 # Main documentation
```

## 🎯 What It Does

- Tracks YouTube Shorts visits in your browser session
- Shows popup when you reach your limit
- Beautiful UI with progress tracking
- Configurable limits and session reset

## 🆘 Need Help?

- **Chrome Issues:** See [Chrome Guide](chrome-extension/README.md)
- **Safari Issues:** See [Safari Guide](safari-extension/README.md)
- **General Questions:** See [Main README](README.md) 