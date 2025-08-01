// Background service worker for YouTube Shorts Limit Tracker
chrome.runtime.onInstalled.addListener(() => {
  console.log('YouTube Shorts Limit Tracker extension installed');
  
  // Initialize default settings
  chrome.storage.session.set({
    shortsLimit: 10,
    sessionStartTime: Date.now()
  });
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // Open popup when extension icon is clicked
  chrome.action.setPopup({ popup: 'popup.html' });
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
    console.log('🎯 Background received trackVisit:', request.shortsId);
    
    chrome.storage.session.get(['shortsVisited', 'shortsLimit'], (result) => {
      const shortsVisited = result.shortsVisited || [];
      const limit = result.shortsLimit || 10;
      
      console.log('📊 Current data:', { shortsVisited, limit });
      
      // Check if this shorts ID was already visited
      if (!shortsVisited.includes(request.shortsId)) {
        shortsVisited.push(request.shortsId);
        
        console.log('➕ Added new shorts:', request.shortsId);
        console.log('📈 Updated count:', shortsVisited.length);
        
        // Save updated data
        chrome.storage.session.set({ 
          shortsVisited: shortsVisited,
          sessionStartTime: result.sessionStartTime || Date.now()
        }, () => {
          // Check if limit is reached
          const limitReached = shortsVisited.length >= limit;
          console.log('🎯 Limit reached:', limitReached);
          
          sendResponse({ 
            success: true, 
            limitReached: limitReached,
            count: shortsVisited.length,
            limit: limit
          });
        });
      } else {
        console.log('🔄 Shorts already visited:', request.shortsId);
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
    chrome.storage.session.set({ shortsLimit: request.limit }, () => {
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
});

// Clear session data when browser is closed (session storage is automatically cleared)
// But we can also listen for browser shutdown events
chrome.runtime.onSuspend.addListener(() => {
  console.log('Extension suspending - session data will be cleared');
}); 