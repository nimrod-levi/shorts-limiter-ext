// Content script for YouTube Shorts tracking
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

  // Create and show popup notification - SECURE VERSION
  function showLimitPopup() {
    // Remove existing popup if any
    const existingPopup = document.getElementById('shorts-limit-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create popup using secure DOM methods
    const popup = document.createElement('div');
    popup.id = 'shorts-limit-popup';
    
    // Apply styles securely
    const styles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#ff4444',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      zIndex: '10000',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '300px',
      animation: 'slideIn 0.3s ease-out'
    };
    
    Object.assign(popup.style, styles);

    // Create header container
    const headerDiv = document.createElement('div');
    Object.assign(headerDiv.style, {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    });

    // Create warning text
    const warningSpan = document.createElement('span');
    warningSpan.textContent = '⚠️ Limit Reached!';
    Object.assign(warningSpan.style, {
      fontSize: '18px',
      fontWeight: 'bold'
    });

    // Create close button
    const closeButton = document.createElement('button');
    closeButton.id = 'close-popup';
    closeButton.textContent = '×';
    Object.assign(closeButton.style, {
      marginLeft: 'auto',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer'
    });

    // Create message paragraph
    const messageP = document.createElement('p');
    messageP.textContent = 'You\'ve reached your maximum number of YouTube Shorts for this session. Consider taking a break!';
    Object.assign(messageP.style, {
      margin: '0',
      lineHeight: '1.4'
    });

    // Assemble popup
    headerDiv.appendChild(warningSpan);
    headerDiv.appendChild(closeButton);
    popup.appendChild(headerDiv);
    popup.appendChild(messageP);

    // Add close button functionality
    closeButton.addEventListener('click', () => {
      popup.remove();
    });

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (popup.parentNode) {
        popup.remove();
      }
    }, 10000);

    document.body.appendChild(popup);

    // Add CSS animation securely
    const existingStyle = document.getElementById('shorts-limit-animation');
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = 'shorts-limit-animation';
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
  }

  // Track shorts visit - SECURE VERSION
  async function trackShortsVisit() {
    if (!isShortsPage()) return;

    const shortsId = getShortsId();
    if (!shortsId) return;

    // Validate shorts ID format (basic validation)
    if (!/^[a-zA-Z0-9_-]{11}$/.test(shortsId)) {
      console.warn('Invalid shorts ID format detected');
      return;
    }

    try {
      // Send message to background script to track the visit
      const response = await chrome.runtime.sendMessage({ 
        action: 'trackVisit', 
        shortsId: shortsId 
      });
      
      if (response && response.limitReached) {
        showLimitPopup();
      }

      // Log success without exposing sensitive data
      console.log('✅ Shorts visit tracked successfully');
    } catch (error) {
      console.error('❌ Error tracking shorts visit');
      // Don't log the full error object which might contain sensitive info
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