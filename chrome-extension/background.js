// Notify popup about data updates
function notifyPopupUpdate() {
  try {
    chrome.runtime.sendMessage({ action: 'dataUpdated' });
  } catch (error) {
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.session.set({
    shortsLimit: 10,
    sessionStartTime: Date.now()
  });
});

chrome.action.onClicked.addListener(() => {
  chrome.action.setPopup({ popup: 'popup.html' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStats') {
    chrome.storage.session.get(['shortsVisited', 'shortsLimit', 'sessionStartTime'], (result) => {
      sendResponse({
        shortsVisited: result.shortsVisited || [],
        shortsLimit: result.shortsLimit || 10,
        sessionStartTime: result.sessionStartTime || Date.now()
      });
    });
    return true;
  }
  
  if (request.action === 'trackVisit') {
    chrome.storage.session.get(['shortsVisited', 'shortsLimit'], (result) => {
      const shortsVisited = result.shortsVisited || [];
      const limit = result.shortsLimit || 10;
      if (!shortsVisited.includes(request.shortsId)) {
        shortsVisited.push(request.shortsId);
        chrome.storage.session.set({ 
          shortsVisited: shortsVisited,
          sessionStartTime: result.sessionStartTime || Date.now()
        }, () => {
          const limitReached = shortsVisited.length >= limit;
          
          // Notify popup about data update
          notifyPopupUpdate();
          
          sendResponse({ 
            success: true, 
            limitReached: limitReached,
            count: shortsVisited.length,
            limit: limit
          });
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
    chrome.storage.session.set({ shortsLimit: request.limit }, () => {
      // Notify popup about data update
      notifyPopupUpdate();
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'resetSession') {
    chrome.storage.session.set({
      shortsVisited: [],
      sessionStartTime: Date.now()
    }, () => {
      // Notify popup about data update
      notifyPopupUpdate();
      sendResponse({ success: true });
    });
    return true;
  }
});

chrome.runtime.onSuspend.addListener(() => {});