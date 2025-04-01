export const SHOW_MSG = 'show-msg'

type EventListener<T = any> = (data: T) => void

interface EventMap {
  [eventName: string]: EventListener[]
}

function createEventEmitter() {
  const listenersMap:EventMap = {}

  return {
    on<T = any>(evName:string, listener: EventListener<T>): () => void  {
      listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener];

      return () => {
        listenersMap[evName] = listenersMap[evName].filter((func) => func !== listener);
      };
    },
    emit<T = any>(evName: string, data: T): void {
      if (!listenersMap[evName]) return;
      listenersMap[evName].forEach((listener) => listener(data));
    },
  };
}

export const eventBus = createEventEmitter()

// Utility functions to show specific message types
export function showUserMsg(msg: { txt: string; type: 'success' | 'error' }) {
  eventBus.emit(SHOW_MSG, msg)
}

export function showSuccessMsg(txt: string) {
  showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt: string) {
  showUserMsg({ txt, type: 'error' })
}

declare global {
  interface Window {
    showUserMsg: typeof showUserMsg;
    showSuccessMsg: typeof showSuccessMsg;
    showErrorMsg: typeof showErrorMsg;
  }
}

// Attach to the window for testing in the browser console
window.showUserMsg = showUserMsg
window.showSuccessMsg = showSuccessMsg
window.showErrorMsg = showErrorMsg
