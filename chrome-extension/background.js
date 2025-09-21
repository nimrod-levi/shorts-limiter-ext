// Background service worker for YouTube Shorts Limit Tracker - SECURE VERSION
chrome.runtime.onInstalled.addListener(() => {
  console.log('YouTube Shorts Limit Tracker extension installed');
  
  // Initialize default settings with validation
  const defaultSettings = {
    shortsLimit: 10,
    sessionStartTime: Date.now()
  };
  
  // Validate and sanitize default settings
  if (typeof defaultSettings.shortsLimit === 'number' && 
      defaultSettings.shortsLimit > 0 && 
      defaultSettings.shortsLimit <= 100) {
    chrome.storage.session.set(defaultSettings);
  } else {
    console.error('Invalid default settings detected');
  }
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Open popup when extension icon is clicked
  chrome.action.setPopup({ popup: 'popup.html' });
});

// Listen for messages from content script - SECURE VERSION
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Validate sender is from extension context
  if (!sender.tab) {
    sendResponse({ error: 'Invalid sender' });
    return;
  }

  if (request.action === 'getStats') {
    chrome.storage.session.get(['shortsVisited', 'shortsLimit', 'sessionStartTime'], (result) => {
      sendResponse({
        shortsVisited: result.shortsVisited || [],
        shortsLimit: result.shortsLimit || 10,
        sessionStartTime: result.sessionStartTime || Date.now()
      });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'trackVisit') {
    // Validate shorts ID format
    if (!request.shortsId || 
        typeof request.shortsId !== 'string' ||
        !/^[a-zA-Z0-9_-]{11}$/.test(request.shortsId)) {
      sendResponse({ error: 'Invalid shorts ID' });
      return;
    }
    
    chrome.storage.session.get(['shortsVisited', 'shortsLimit'], (result) => {
      const shortsVisited = result.shortsVisited || [];
      const limit = result.shortsLimit || 10;
      
      // Validate stored data
      if (!Array.isArray(shortsVisited)) {
        sendResponse({ error: 'Invalid storage data' });
        return;
      }
      
      // Check if this shorts ID was already visited
      if (!shortsVisited.includes(request.shortsId)) {
        shortsVisited.push(request.shortsId);
        
        // Save updated data
        chrome.storage.session.set({ 
          shortsVisited: shortsVisited,
          sessionStartTime: result.sessionStartTime || Date.now()
        }, () => {
          // Check if limit is reached
          const limitReached = shortsVisited.length >= limit;
          
          sendResponse({ 
            success: true, 
            limitReached: limitReached,
            count: shortsVisited.length,
            limit: limit
          });
        });
      } else {
        sendResponse({ 
          success: true, 
          limitReached: false,
          count: shortsVisited.length,
          limit: limit
        });
      }
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'updateLimit') {
    // Validate limit input
    const newLimit = parseInt(request.limit);
    if (isNaN(newLimit) || newLimit < 1 || newLimit > 100) {
      sendResponse({ error: 'Invalid limit value' });
      return;
    }
    
    chrome.storage.session.set({ shortsLimit: newLimit }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'resetSession') {
    chrome.storage.session.set({
      shortsVisited: [],
      sessionStartTime: Date.now()
    }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  // Handle unknown actions
  sendResponse({ error: 'Unknown action' });
});

// Clear session data when browser is closed (session storage is automatically cleared)
// But we can also listen for browser shutdown events
chrome.runtime.onSuspend.addListener(() => {
  console.log('Extension suspending - session data will be cleared');
}); 