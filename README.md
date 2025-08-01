# YouTube Shorts Limit Tracker

A cross-browser extension that tracks YouTube Shorts visits and notifies you when you reach a configurable limit. Available for Chrome and Safari.

## 🚀 Quick Start

### Chrome
1. Open `chrome://extensions/`
2. Enable Developer mode
3. Click "Load unpacked" → select `chrome-extension/` folder
4. Pin to toolbar

### Safari
1. Enable Developer mode in Safari
2. Use Safari Extension Builder or manual installation
3. See [Safari Installation Guide](shared/SAFARI_INSTALLATION.md)

## 📁 Project Structure

```
├── chrome-extension/     # Chrome version
├── safari-extension/     # Safari version  
├── shared/              # Shared resources
├── INSTALL.md           # Installation guide
└── README.md           # This file
```

## 🎯 Features

- **Session Tracking**: Counts unique YouTube Shorts visited
- **Configurable Limit**: Set your daily limit (default: 10)
- **Visual Progress**: Progress bar with color-coded status
- **Smart Notifications**: Popup alerts when limit reached
- **Session Reset**: Start fresh anytime
- **Cross-Browser**: Works on Chrome and Safari

## 📚 Documentation

- **[Chrome Guide](chrome-extension/README.md)** - Chrome installation & usage
- **[Safari Guide](safari-extension/README.md)** - Safari installation & usage
- **[Installation Guide](INSTALL.md)** - Detailed setup instructions

## 🔒 Privacy

- All data stored locally in your browser
- No external data transmission
- Chrome: Session data auto-cleared on browser close
- Safari: Data persists until manually cleared

## 🛠️ Development

### Chrome
1. Edit files in `chrome-extension/`
2. Go to `chrome://extensions/`
3. Click refresh icon on extension card

### Safari  
1. Edit files in `safari-extension/`
2. In Extension Builder, click "Build"
3. Click "Install" to update

## 📄 License

MIT License - Open source and free to use. 