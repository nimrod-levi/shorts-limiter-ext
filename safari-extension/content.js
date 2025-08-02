// Content script for YouTube Shorts tracking (Safari compatible)
(function() {
  'use strict';

  // Default limit - can be configured in popup
  const DEFAULT_LIMIT = 10;
  
  // Check if current page is a YouTube Shorts page
  function isShortsPage() {
    return window.location.href.includes('/shorts/');
  }

  // Get the shorts ID from URL
  function getShortsId() {
    const match = window.location.href.match(/\/shorts\/([^/?]+)/);
    return match ? match[1] : null;
  }

  // Safari-compatible storage functions
  function getStorageData() {
    try {
      const data = localStorage.getItem('youtubeShortsTracker');
      return data ? JSON.parse(data) : {
        shortsVisited: [],
        shortsLimit: DEFAULT_LIMIT,
        sessionStartTime: Date.now()
      };
    } catch (error) {
      console.error('Error reading storage:', error);
      return {
        shortsVisited: [],
        shortsLimit: DEFAULT_LIMIT,
        sessionStartTime: Date.now()
      };
    }
  }

  function setStorageData(data) {
    try {
      localStorage.setItem('youtubeShortsTracker', JSON.stringify(data));
    } catch (error) {
      console.error('Error writing storage:', error);
    }
  }

  // Create and show popup notification
  function showLimitPopup() {
    // Remove existing popup if any
    const existingPopup = document.getElementById('shorts-limit-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create popup
    const popup = document.createElement('div');
    popup.id = 'shorts-limit-popup';
    popup.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 6px 30px rgba(0,0,0,0.4);
      z-index: 10000;
      font-family: Arial, sans-serif;
      max-width: 500px;
      animation: slideIn 0.3s ease-out;
    `;

    popup.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 20px;">
        <span style="font-size: 36px; font-weight: bold;">⚠️ Limit Reached!</span>
        <button id="close-popup" style="margin-left: auto; background: none; border: none; color: white; font-size: 32px; cursor: pointer;">×</button>
      </div>
      <p style="margin: 0; line-height: 1.5; font-size: 18px;">
        You've reached your maximum number of YouTube Shorts for this session. 
        Consider taking a break!
      </p>
    `;

    // Add close button functionality
    popup.querySelector('#close-popup').addEventListener('click', () => {
      popup.remove();
    });

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (popup.parentNode) {
        popup.remove();
      }
    }, 10000);

    document.body.appendChild(popup);

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Track shorts visit
  function trackShortsVisit() {
    if (!isShortsPage()) return;

    const shortsId = getShortsId();
    if (!shortsId) return;

    try {
      // Get current session data
      const data = getStorageData();
      const shortsVisited = data.shortsVisited || [];
      const limit = data.shortsLimit || DEFAULT_LIMIT;

      // Check if this shorts ID was already visited in this session
      if (!shortsVisited.includes(shortsId)) {
        shortsVisited.push(shortsId);
        
        // Save updated data
        setStorageData({
          ...data,
          shortsVisited: shortsVisited,
          sessionStartTime: data.sessionStartTime || Date.now()
        });

        // Check if limit is reached
        if (shortsVisited.length >= limit) {
          showLimitPopup();
        }

        // Log for debugging
        console.log(`Shorts visited: ${shortsVisited.length}/${limit}`);
      }
    } catch (error) {
      console.error('Error tracking shorts visit:', error);
    }
  }

  // Initialize tracking when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trackShortsVisit);
  } else {
    trackShortsVisit();
  }

  // Track navigation changes (for SPA behavior)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(trackShortsVisit, 100); // Small delay to ensure page is loaded
    }
  }).observe(document, { subtree: true, childList: true });

  // Listen for messages from popup
  window.addEventListener('message', function(event) {
    if (event.source !== window) return;
    
    if (event.data.type === 'GET_STATS') {
      const data = getStorageData();
      window.postMessage({
        type: 'STATS_RESPONSE',
        data: data
      }, '*');
    }
    
    if (event.data.type === 'UPDATE_LIMIT') {
      const data = getStorageData();
      data.shortsLimit = event.data.limit;
      setStorageData(data);
      window.postMessage({
        type: 'LIMIT_UPDATED',
        success: true
      }, '*');
    }
    
    if (event.data.type === 'RESET_SESSION') {
      const data = getStorageData();
      data.shortsVisited = [];
      data.sessionStartTime = Date.now();
      setStorageData(data);
      window.postMessage({
        type: 'SESSION_RESET',
        success: true
      }, '*');
    }
  });

})(); 