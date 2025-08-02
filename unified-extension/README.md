# YouTube Shorts Limit Tracker - Unified Cross-Browser Extension

A unified browser extension that works on both **Chrome** and **Safari** to help you track and limit your YouTube Shorts viewing sessions.

## ✨ Features

- 📊 **Real-time tracking** of YouTube Shorts visits
- ⚡ **Customizable limits** (1-100 shorts per session)
- 🚨 **Smart notifications** when you reach your limit
- 🔄 **Session management** with reset capabilities
- 🌐 **Cross-browser compatibility** (Chrome & Safari)
- 💾 **Persistent storage** with browser-appropriate methods
- 🎨 **Modern, responsive UI** with gradient design

## 🚀 Installation

### For Google Chrome / Chromium Browsers

1. **Download or Clone** this repository to your computer
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle switch in the top-right corner)
4. **Click "Load unpacked"**
5. **Select the `unified-extension` folder** from your downloaded files
6. **Pin the extension** (click the puzzle piece icon in Chrome toolbar, then pin)

### For Safari

1. **Download or Clone** this repository to your computer
2. **Open Safari** and go to **Safari > Settings > Extensions**
3. **Enable "Allow unsigned extensions"** (for development)
4. **Click "Add Extension..."** 
5. **Navigate and select the `unified-extension` folder**
6. **Enable the extension** in the list
7. **Grant permissions** for YouTube access when prompted

## 📱 How to Use

1. **Install the extension** following the instructions above
2. **Visit YouTube Shorts** (`youtube.com/shorts/...`)
3. **View your stats** by clicking the extension icon
4. **Set your limit** using the input field (default: 10 shorts)
5. **Track your progress** with the visual progress bar
6. **Get notified** when you reach your limit
7. **Reset session** anytime to start fresh

## 🔧 Configuration

### Setting Your Limit
- Click the extension icon to open the popup
- Enter your desired limit (1-100 shorts)
- Click "Update Limit" to save

### Resetting Your Session
- Click "Reset Session" in the popup
- Confirm the reset when prompted
- Your counter will reset to 0

## 🛠️ Technical Details

### Cross-Browser Compatibility Features

#### Storage Strategy
- **Chrome**: Uses `chrome.storage.session` for temporary data
- **Safari**: Uses `chrome.storage.local` with namespaced keys
- **Fallback**: Direct storage handling for maximum compatibility

#### Messaging Architecture
- **Chrome**: Background script handles message passing
- **Safari**: Direct storage access with fallback messaging
- **Unified**: Automatic browser detection and adaptation

#### Permissions
- `storage`: For saving your preferences and session data
- `activeTab`: For detecting YouTube Shorts pages
- `host_permissions`: YouTube.com access for tracking

### Browser Detection
The extension automatically detects your browser and adapts its behavior:
- Different storage mechanisms
- Optimized message passing
- Browser-specific UI indicators

## 📂 File Structure

```
unified-extension/
├── manifest.json          # Cross-browser manifest
├── background.js           # Unified background script
├── content.js             # Cross-browser content script
├── popup.html             # Responsive popup interface
├── popup.js               # Unified popup logic
├── icon16.png            # 16x16 icon
├── icon48.png            # 48x48 icon
├── icon128.png           # 128x128 icon
└── README.md             # This file
```

## 🔒 Privacy

- **No data collection**: All data stays on your device
- **No external requests**: Extension works entirely offline
- **Local storage only**: Your limits and session data never leave your browser
- **Open source**: Full transparency of functionality

## 🐛 Troubleshooting

### Extension Not Working
1. **Refresh the YouTube page** after installation
2. **Check permissions** in browser extension settings
3. **Ensure developer mode** is enabled (Chrome)
4. **Try reloading the extension** in extension settings

### Data Not Persisting
- **Chrome**: Data resets when browser closes (by design)
- **Safari**: Data persists until manually reset
- **Mixed behavior**: Check browser detection in popup

### Notifications Not Showing
1. **Check if you're on YouTube Shorts** (`/shorts/` in URL)
2. **Look for popup notifications** on the page
3. **Try refreshing** the YouTube page
4. **Check browser console** for error messages

## 🎯 Browser Differences

| Feature | Chrome | Safari |
|---------|--------|--------|
| Data Persistence | Session-based | Local storage |
| Background Scripts | Service Worker | Scripts array |
| Permissions | Separate host_permissions | Unified permissions |
| Development | Dev mode toggle | Allow unsigned extensions |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both Chrome and Safari
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Support

If you encounter any issues:
1. Check this README for troubleshooting
2. Look at browser console for errors
3. Open an issue in the repository
4. Include your browser version and error details

---

**Made with ❤️ for healthier social media habits**