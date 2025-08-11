// Popup script for YouTube Shorts Tracker (Safari compatible)
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

  // Safari-compatible storage functions using message passing to background script
  function getStorageData() {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage({ action: 'getStats' }, function(response) {
          if (chrome.runtime.lastError) {
            console.error('Chrome runtime error:', chrome.runtime.lastError);
            resolve({
              shortsVisited: [],
              shortsLimit: 10,
              sessionStartTime: Date.now()
            });
          } else if (response) {
            resolve({
              shortsVisited: response.shortsVisited || [],
              shortsLimit: response.shortsLimit || 10,
              sessionStartTime: response.sessionStartTime || Date.now()
            });
          } else {
            // Fallback to direct storage access if message passing fails
            chrome.storage.local.get(['youtubeShortsTracker'], function(result) {
              const data = result.youtubeShortsTracker || {
                shortsVisited: [],
                shortsLimit: 10,
                sessionStartTime: Date.now()
              };
              resolve(data);
            });
          }
        });
      } catch (error) {
        console.error('Error reading storage:', error);
        resolve({
          shortsVisited: [],
          shortsLimit: 10,
          sessionStartTime: Date.now()
        });
      }
    });
  }

  function updateLimit(newLimit) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage({ action: 'updateLimit', limit: newLimit }, function(response) {
          if (chrome.runtime.lastError) {
            console.error('Chrome runtime error:', chrome.runtime.lastError);
            resolve(false);
          } else {
            resolve(response && response.success);
          }
        });
      } catch (error) {
        console.error('Error updating limit:', error);
        resolve(false);
      }
    });
  }

  function resetSession() {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage({ action: 'resetSession' }, function(response) {
          if (chrome.runtime.lastError) {
            console.error('Chrome runtime error:', chrome.runtime.lastError);
            resolve(false);
          } else {
            resolve(response && response.success);
          }
        });
      } catch (error) {
        console.error('Error resetting session:', error);
        resolve(false);
      }
    });
  }

  // Load and display current stats
  async function loadStats() {
    const data = await getStorageData();
    const visited = data.shortsVisited.length;
    const limit = data.shortsLimit;
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
        timeString = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
      } else if (diffHours > 0) {
        timeString = `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
      } else if (diffMins > 0) {
        timeString = `${diffMins} minute${diffMins > 1 ? 's' : ''}`;
      } else {
        timeString = 'Just started';
      }

      sessionTime.textContent = `Session started: ${timeString} ago`;
    }
  }

  // Update limit
  updateLimitBtn.addEventListener('click', async function() {
    const newLimit = parseInt(limitInput.value);
    if (newLimit > 0 && newLimit <= 100) {
      const success = await updateLimit(newLimit);
      if (success) {
        loadStats(); // Reload stats to reflect new limit
        showNotification('Limit updated successfully!');
      } else {
        showNotification('Failed to update limit. Please try again.', 'error');
      }
    } else {
      showNotification('Please enter a valid limit (1-100)', 'error');
    }
  });

  // Reset session
  resetSessionBtn.addEventListener('click', async function() {
    if (confirm('Are you sure you want to reset the current session? This will clear all tracked shorts.')) {
      const success = await resetSession();
      if (success) {
        loadStats(); // Reload stats
        showNotification('Session reset successfully!');
      } else {
        showNotification('Failed to reset session. Please try again.', 'error');
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