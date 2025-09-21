// Background script for YouTube Shorts Limit Tracker (Safari compatible)
(function() {
  'use strict';

  // Notify popup about data updates
  function notifyPopupUpdate() {
    try {
      const runtime = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;
      if (runtime && runtime.sendMessage) {
        runtime.sendMessage({ action: 'dataUpdated' });
      }
    } catch (error) {
      console.log('Failed to notify popup about data update');
    }
  }

  // Initialize extension when installed
  function initializeExtension() {
    // Initialize default settings using chrome.storage.local
    const defaultData = {
      shortsLimit: 10,
      sessionStartTime: Date.now(),
      shortsVisited: []
    };
    
    // Set default data if not already set
    const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
    storage.local.get(['youtubeShortsTracker'], function(result) {
      if (!result.youtubeShortsTracker) {
        storage.local.set({ youtubeShortsTracker: defaultData });
      }
    });
  }

  // Initialize when extension loads
  initializeExtension();

  // Listen for messages from content scripts and popup
  function handleMessage(request, sender, sendResponse) {
    if (request.action === 'getStats') {
      const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
      storage.local.get(['youtubeShortsTracker'], function(result) {
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
      return true;
    }
    
    if (request.action === 'trackVisit') {
      const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
      storage.local.get(['youtubeShortsTracker'], function(result) {
        const parsedData = result.youtubeShortsTracker || {
          shortsVisited: [],
          shortsLimit: 10,
          sessionStartTime: Date.now()
        };
        
        const shortsVisited = parsedData.shortsVisited || [];
        const limit = parsedData.shortsLimit || 10;
        
        if (!shortsVisited.includes(request.shortsId)) {
          shortsVisited.push(request.shortsId);
          
          const updatedData = {
            ...parsedData,
            shortsVisited: shortsVisited,
            sessionStartTime: parsedData.sessionStartTime || Date.now()
          };
          
          storage.local.set({ 
            youtubeShortsTracker: updatedData
          }, () => {
            if (chrome.runtime.lastError) {
              sendResponse({ 
                success: false, 
                error: chrome.runtime.lastError.message
              });
            } else {
              const limitReached = shortsVisited.length >= limit;
              
              // Notify popup about data update
              notifyPopupUpdate();
              
              sendResponse({ 
                success: true, 
                limitReached: limitReached,
                count: shortsVisited.length,
                limit: limit
              });
            }
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
      return true;
    }
    
    if (request.action === 'updateLimit') {
      const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
      storage.local.get(['youtubeShortsTracker'], function(result) {
        const parsedData = result.youtubeShortsTracker || {};
        parsedData.shortsLimit = request.limit;
        storage.local.set({ youtubeShortsTracker: parsedData }, function() {
          // Notify popup about data update
          notifyPopupUpdate();
          sendResponse({ success: true });
        });
      });
      return true;
    }
    
    if (request.action === 'resetSession') {
      const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
      storage.local.get(['youtubeShortsTracker'], function(result) {
        const parsedData = result.youtubeShortsTracker || {};
        parsedData.shortsVisited = [];
        parsedData.sessionStartTime = Date.now();
        storage.local.set({ youtubeShortsTracker: parsedData }, function() {
          // Notify popup about data update
          notifyPopupUpdate();
          sendResponse({ success: true });
        });
      });
      return true;
    }
  }

  // Safari-compatible message handling
  const runtime = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;
  if (typeof runtime !== 'undefined') {
    runtime.onInstalled.addListener(initializeExtension);
    runtime.onMessage.addListener(handleMessage);
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