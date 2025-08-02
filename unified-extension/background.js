// Unified Background Script for YouTube Shorts Limit Tracker
// Compatible with both Chrome and Safari browsers

(function() {
  'use strict';

  // Browser detection
  const isChrome = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
  const isSafari = typeof safari !== 'undefined' || (isChrome && navigator.userAgent.includes('Safari'));
  
  // Storage abstraction layer
  const Storage = {
    // Use session storage for Chrome, local storage for Safari
    get: function(keys) {
      return new Promise((resolve) => {
        if (isChrome && chrome.storage.session) {
          // Chrome: Use session storage
          chrome.storage.session.get(keys, resolve);
        } else {
          // Safari/fallback: Use local storage with namespace
          chrome.storage.local.get(['youtubeShortsTracker'], (result) => {
            const data = result.youtubeShortsTracker || {};
            const filteredData = {};
            keys.forEach(key => {
              filteredData[key] = data[key];
            });
            resolve(filteredData);
          });
        }
      });
    },

    set: function(data) {
      return new Promise((resolve) => {
        if (isChrome && chrome.storage.session) {
          // Chrome: Use session storage
          chrome.storage.session.set(data, () => resolve());
        } else {
          // Safari/fallback: Use local storage with namespace
          chrome.storage.local.get(['youtubeShortsTracker'], (result) => {
            const existingData = result.youtubeShortsTracker || {};
            const updatedData = { ...existingData, ...data };
            chrome.storage.local.set({ youtubeShortsTracker: updatedData }, () => resolve());
          });
        }
      });
    }
  };

  // Initialize extension
  function initializeExtension() {
    console.log('YouTube Shorts Limit Tracker extension installed');
    
    // Initialize default settings
    Storage.set({
      shortsLimit: 10,
      sessionStartTime: Date.now(),
      shortsVisited: []
    });
  }

  // Handle extension icon click
  function handleIconClick(tab) {
    if (isChrome) {
      chrome.action.setPopup({ popup: 'popup.html' });
    }
    console.log('Extension icon clicked');
  }

  // Message handler
  function handleMessage(request, sender, sendResponse) {
    if (request.action === 'getStats') {
      Storage.get(['shortsVisited', 'shortsLimit', 'sessionStartTime']).then((result) => {
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
      
      Storage.get(['shortsVisited', 'shortsLimit']).then((result) => {
        const shortsVisited = result.shortsVisited || [];
        const limit = result.shortsLimit || 10;
        
        console.log('📊 Current data:', { shortsVisited, limit });
        
        // Check if this shorts ID was already visited
        if (!shortsVisited.includes(request.shortsId)) {
          shortsVisited.push(request.shortsId);
          
          console.log('➕ Added new shorts:', request.shortsId);
          console.log('📈 Updated count:', shortsVisited.length);
          
          // Save updated data
          Storage.set({ 
            shortsVisited: shortsVisited,
            sessionStartTime: result.sessionStartTime || Date.now()
          }).then(() => {
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
      Storage.set({ shortsLimit: request.limit }).then(() => {
        sendResponse({ success: true });
      });
      return true;
    }
    
    if (request.action === 'resetSession') {
      Storage.set({
        shortsVisited: [],
        sessionStartTime: Date.now()
      }).then(() => {
        sendResponse({ success: true });
      });
      return true;
    }
  }

  // Initialize based on browser
  if (isChrome && chrome.runtime) {
    // Chrome setup
    chrome.runtime.onInstalled.addListener(initializeExtension);
    chrome.runtime.onMessage.addListener(handleMessage);
    
    if (chrome.action && chrome.action.onClicked) {
      chrome.action.onClicked.addListener(handleIconClick);
    }

    // Clear session data when browser is closed (Chrome only)
    if (chrome.runtime.onSuspend) {
      chrome.runtime.onSuspend.addListener(() => {
        console.log('Extension suspending - session data will be cleared');
      });
    }
  }

  // Safari fallback (though Safari also supports chrome.runtime now)
  if (typeof safari !== 'undefined' && safari.extension) {
    safari.self.addEventListener('message', function(event) {
      handleMessage(event.message, event.target, function(response) {
        event.target.page.dispatchMessage('response', response);
      });
    });
  }

  // Initialize extension on load
  if (typeof chrome !== 'undefined' && chrome.storage) {
    initializeExtension();
  }

})();