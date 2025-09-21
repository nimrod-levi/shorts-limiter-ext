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

  // Safari-compatible storage functions using extension storage API
  function getStorageData() {
    return new Promise((resolve) => {
      try {
        const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
        storage.local.get(['youtubeShortsTracker'], function(result) {
          const data = result.youtubeShortsTracker || {
            shortsVisited: [],
            shortsLimit: DEFAULT_LIMIT,
            sessionStartTime: Date.now()
          };
          resolve(data);
        });
      } catch (error) {
        resolve({
          shortsVisited: [],
          shortsLimit: DEFAULT_LIMIT,
          sessionStartTime: Date.now()
        });
      }
    });
  }

  function setStorageData(data) {
    return new Promise((resolve) => {
      try {
        const storage = typeof browser !== 'undefined' ? browser.storage : chrome.storage;
        storage.local.set({ youtubeShortsTracker: data }, function() {
          resolve(true);
        });
      } catch (error) {
        resolve(false);
      }
    });
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
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: Arial, sans-serif;
      max-width: 300px;
      animation: slideIn 0.3s ease-out;
    `;

    popup.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <span style="font-size: 18px; font-weight: bold;">⚠️ Limit Reached!</span>
        <button id="close-popup" style="margin-left: auto; background: none; border: none; color: white; font-size: 20px; cursor: pointer;">×</button>
      </div>
      <p style="margin: 0; line-height: 1.4;">
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

  // Track visited shorts to prevent duplicate tracking
  const trackedShorts = new Set();
  let trackingInProgress = false;

  // Track shorts visit
  async function trackShortsVisit() {
    if (!isShortsPage()) return;

    const shortsId = getShortsId();
    if (!shortsId) return;

    // Prevent duplicate tracking
    if (trackedShorts.has(shortsId) || trackingInProgress) {
      // Shorts already tracked or tracking in progress
      return;
    }

    trackingInProgress = true;
    trackedShorts.add(shortsId);

    try {
      // Send message to background script to track the visit
      const runtime = typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;
      const response = await new Promise((resolve) => {
        runtime.sendMessage({ 
          action: 'trackVisit', 
          shortsId: shortsId 
        }, function(response) {
          if (chrome.runtime.lastError) {
            // Runtime error
            resolve(null);
          } else {
            resolve(response);
          }
        });
      });
      
      // Background response received
      
      if (response && response.limitReached) {
        showLimitPopup();
      }

      // Shorts visit tracked successfully
    } catch (error) {

      trackedShorts.delete(shortsId);
    } finally {
      trackingInProgress = false;
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


})(); 