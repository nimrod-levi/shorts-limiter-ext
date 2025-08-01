// Background script for YouTube Shorts Limit Tracker (Safari compatible)
(function() {
  'use strict';

  // Initialize extension when installed
  function initializeExtension() {
    console.log('YouTube Shorts Limit Tracker extension installed');
    
    // Initialize default settings in localStorage
    const defaultData = {
      shortsLimit: 10,
      sessionStartTime: Date.now(),
      shortsVisited: []
    };
    
    // Set default data if not already set
    if (!localStorage.getItem('youtubeShortsTracker')) {
      localStorage.setItem('youtubeShortsTracker', JSON.stringify(defaultData));
    }
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
      try {
        const data = localStorage.getItem('youtubeShortsTracker');
        const parsedData = data ? JSON.parse(data) : {
          shortsVisited: [],
          shortsLimit: 10,
          sessionStartTime: Date.now()
        };
        
        sendResponse({
          shortsVisited: parsedData.shortsVisited || [],
          shortsLimit: parsedData.shortsLimit || 10,
          sessionStartTime: parsedData.sessionStartTime || Date.now()
        });
      } catch (error) {
        console.error('Error getting stats:', error);
        sendResponse({
          shortsVisited: [],
          shortsLimit: 10,
          sessionStartTime: Date.now()
        });
      }
      return true; // Keep message channel open for async response
    }
    
    if (request.action === 'updateLimit') {
      try {
        const data = localStorage.getItem('youtubeShortsTracker');
        const parsedData = data ? JSON.parse(data) : {};
        parsedData.shortsLimit = request.limit;
        localStorage.setItem('youtubeShortsTracker', JSON.stringify(parsedData));
        sendResponse({ success: true });
      } catch (error) {
        console.error('Error updating limit:', error);
        sendResponse({ success: false });
      }
      return true;
    }
    
    if (request.action === 'resetSession') {
      try {
        const data = localStorage.getItem('youtubeShortsTracker');
        const parsedData = data ? JSON.parse(data) : {};
        parsedData.shortsVisited = [];
        parsedData.sessionStartTime = Date.now();
        localStorage.setItem('youtubeShortsTracker', JSON.stringify(parsedData));
        sendResponse({ success: true });
      } catch (error) {
        console.error('Error resetting session:', error);
        sendResponse({ success: false });
      }
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