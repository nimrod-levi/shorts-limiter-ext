// Unified Popup Script for YouTube Shorts Tracker
// Compatible with both Chrome and Safari browsers

document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const shortsCount = document.getElementById('shorts-count');
  const shortsLimit = document.getElementById('shorts-limit');
  const shortsRemaining = document.getElementById('shorts-remaining');
  const progressFill = document.getElementById('progress-fill');
  const limitInput = document.getElementById('limit-input');
  const updateLimitBtn = document.getElementById('update-limit');
  const resetSessionBtn = document.getElementById('reset-session');
  const sessionTime = document.getElementById('session-time');

  // Browser detection
  const isChrome = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

  // Unified storage abstraction layer
  const Storage = {
    get: function() {
      return new Promise((resolve) => {
        if (isChrome && chrome.storage.session) {
          // Chrome: Try session storage first, fall back to messaging
          chrome.storage.session.get(['shortsVisited', 'shortsLimit', 'sessionStartTime'], (result) => {
            if (chrome.runtime.lastError) {
              // If session storage fails, try messaging
              chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
                resolve(response || {
                  shortsVisited: [],
                  shortsLimit: 10,
                  sessionStartTime: Date.now()
                });
              });
            } else {
              resolve({
                shortsVisited: result.shortsVisited || [],
                shortsLimit: result.shortsLimit || 10,
                sessionStartTime: result.sessionStartTime || Date.now()
              });
            }
          });
        } else {
          // Safari/fallback: Use local storage with namespace
          chrome.storage.local.get(['youtubeShortsTracker'], (result) => {
            const data = result.youtubeShortsTracker || {
              shortsVisited: [],
              shortsLimit: 10,
              sessionStartTime: Date.now()
            };
            resolve(data);
          });
        }
      });
    },

    set: function(data) {
      return new Promise((resolve, reject) => {
        if (isChrome && chrome.storage.session) {
          // Chrome: Use session storage
          chrome.storage.session.set(data, () => {
            if (chrome.runtime.lastError) {
              // Fallback to messaging
              if (data.shortsLimit) {
                chrome.runtime.sendMessage({ action: 'updateLimit', limit: data.shortsLimit }, resolve);
              } else if (data.shortsVisited && data.shortsVisited.length === 0) {
                chrome.runtime.sendMessage({ action: 'resetSession' }, resolve);
              } else {
                resolve();
              }
            } else {
              resolve();
            }
          });
        } else {
          // Safari/fallback: Use local storage with namespace
          chrome.storage.local.get(['youtubeShortsTracker'], (result) => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
              return;
            }
            const existingData = result.youtubeShortsTracker || {};
            const updatedData = { ...existingData, ...data };
            chrome.storage.local.set({ youtubeShortsTracker: updatedData }, () => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            });
          });
        }
      });
    }
  };

  // Load and display current stats
  async function loadStats() {
    try {
      const data = await Storage.get();
      const visited = data.shortsVisited ? data.shortsVisited.length : 0;
      const limit = data.shortsLimit || 10;
      const remaining = Math.max(0, limit - visited);
      const progress = Math.min(100, (visited / limit) * 100);

      // Update display
      shortsCount.textContent = visited;
      shortsLimit.textContent = limit;
      shortsRemaining.textContent = remaining;
      progressFill.style.width = `${progress}%`;

      // Update input field
      limitInput.value = limit;

      // Update progress bar color based on usage
      if (progress >= 80) {
        progressFill.style.background = 'linear-gradient(90deg, #ff4444, #ff6666)';
      } else if (progress >= 60) {
        progressFill.style.background = 'linear-gradient(90deg, #ffaa00, #ffcc00)';
      } else {
        progressFill.style.background = 'linear-gradient(90deg, #4CAF50, #45a049)';
      }

      // Show session time
      if (data.sessionStartTime) {
        const sessionStart = new Date(data.sessionStartTime);
        const now = new Date();
        const diffMs = now - sessionStart;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        let timeString = '';
        if (diffDays > 0) {
          timeString = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
          timeString = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMins > 0) {
          timeString = `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        } else {
          timeString = 'Just started';
        }

        sessionTime.textContent = `Session started: ${timeString}`;
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  // Update limit
  updateLimitBtn.addEventListener('click', async function() {
    const newLimit = parseInt(limitInput.value);
    if (newLimit > 0 && newLimit <= 100) {
      try {
        await Storage.set({ shortsLimit: newLimit });
        loadStats(); // Reload stats to reflect new limit
        showNotification('Limit updated successfully!');
      } catch (error) {
        console.error('Error updating limit:', error);
        showNotification('Error updating limit', 'error');
      }
    } else {
      showNotification('Please enter a valid limit (1-100)', 'error');
    }
  });

  // Reset session
  resetSessionBtn.addEventListener('click', async function() {
    if (confirm('Are you sure you want to reset the current session? This will clear all tracked shorts.')) {
      try {
        await Storage.set({
          shortsVisited: [],
          sessionStartTime: Date.now()
        });
        loadStats(); // Reload stats
        showNotification('Session reset successfully!');
      } catch (error) {
        console.error('Error resetting session:', error);
        showNotification('Error resetting session', 'error');
      }
    }
  });

  // Show notification
  function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'error' ? '#ff4444' : '#4CAF50'};
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 1000;
      animation: slideDown 0.3s ease-out;
    `;
    notification.textContent = message;

    // Add animation CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideDown {
        from {
          transform: translateX(-50%) translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  // Handle Enter key in input field
  limitInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      updateLimitBtn.click();
    }
  });

  // Load initial stats
  loadStats();

  // Refresh stats every 5 seconds when popup is open
  const refreshInterval = setInterval(loadStats, 5000);

  // Clear interval when popup is closed
  window.addEventListener('beforeunload', () => {
    clearInterval(refreshInterval);
  });
});