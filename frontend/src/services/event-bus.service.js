export const SHOW_MSG = 'show-msg';

function createEventEmitter() {
  const listenersMap = {};

  return {
    on(evName, listener) {
      listenersMap[evName] = listenersMap[evName]
        ? [...listenersMap[evName], listener]
        : [listener];
      return () => {
        listenersMap[evName] = listenersMap[evName].filter((func) => func !== listener);
      };
    },
    emit(evName, data) {
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach((listener) => listener(data));
    },
  };
}

export const eventBus = createEventEmitter();

// Utility functions to show specific message types
export function showUserMsg(msg) {
  eventBus.emit(SHOW_MSG, msg);
}

export function showSuccessMsg(txt) {
  showUserMsg({ txt, type: 'success' });
}

export function showErrorMsg(txt) {
  showUserMsg({ txt, type: 'error' });
}

// Attach to the window for testing in the browser console
window.showUserMsg = showUserMsg;
window.showSuccessMsg = showSuccessMsg;
window.showErrorMsg = showErrorMsg;
