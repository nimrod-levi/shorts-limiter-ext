// Background script for YouTube Shorts Limit Tracker (Safari compatible)
(function() {
  'use strict';

  // Initialize extension when installed
  function initializeExtension() {
    console.log('YouTube Shorts Limit Tracker extension installed');
    
    // Initialize default settings using chrome.storage.local
    const defaultData = {
      shortsLimit: 10,
      sessionStartTime: Date.now(),
      shortsVisited: []
    };
    
    // Set default data if not already set
    chrome.storage.local.get(['youtubeShortsTracker'], function(result) {
      if (!result.youtubeShortsTracker) {
        chrome.storage.local.set({ youtubeShortsTracker: defaultData });
      }
    });
  }

  // Handle extension icon click
  function handleIconClick(tab) {
    // Safari doesn't support setPopup, so we'll handle this differently
    console.log('Extension icon clicked');
  }

  // Initialize when extension loads
  initializeExtension();

  // Listen for messages from content scripts
  function handleMessage(request, sender, sendResponse) {
    if (request.action === 'getStats') {
      chrome.storage.local.get(['youtubeShortsTracker'], function(result) {
        const parsedData = result.youtubeShortsTracker || {
          shortsVisited: [],
          shortsLimit: 10,
          sessionStartTime: Date.now()
        };
        
        sendResponse({
          shortsVisited: parsedData.shortsVisited || [],
          shortsLimit: parsedData.shortsLimit || 10,
          sessionStartTime: parsedData.sessionStartTime || Date.now()
        });
      });
      return true; // Keep message channel open for async response
    }
    
    if (request.action === 'updateLimit') {
      chrome.storage.local.get(['youtubeShortsTracker'], function(result) {
        const parsedData = result.youtubeShortsTracker || {};
        parsedData.shortsLimit = request.limit;
        chrome.storage.local.set({ youtubeShortsTracker: parsedData }, function() {
          sendResponse({ success: true });
        });
      });
      return true;
    }
    
    if (request.action === 'resetSession') {
      chrome.storage.local.get(['youtubeShortsTracker'], function(result) {
        const parsedData = result.youtubeShortsTracker || {};
        parsedData.shortsVisited = [];
        parsedData.sessionStartTime = Date.now();
        chrome.storage.local.set({ youtubeShortsTracker: parsedData }, function() {
          sendResponse({ success: true });
        });
      });
      return true;
    }
  }

  // Safari-compatible message handling
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    chrome.runtime.onInstalled.addListener(initializeExtension);
    chrome.runtime.onMessage.addListener(handleMessage);
  }

  // Fallback for Safari
  if (typeof safari !== 'undefined' && safari.extension) {
    safari.self.addEventListener('message', function(event) {
      handleMessage(event.message, event.target, function(response) {
        event.target.page.dispatchMessage('response', response);
      });
    });
  }

})(); 