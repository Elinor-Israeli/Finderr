import io from 'socket.io-client'
import { userService } from './user/user.service.remote' 

export const SOCKET_EVENT_ORDER_ADDED = 'order-added'
export const SOCKET_EVENT_ORDER_ADDED_TO_DASHBOARD = 'order-added-to-dashboard'
export const SOCKET_EVENT_ORDER_UPDATE_STATUS = 'order-update-status'
export const SOCKET_EVENT_ORDER_UPDATED = 'order-updated'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

/* eslint-disable no-undef */
const BASE_URL = import.meta.env.NODE_ENV === 'production'  
    ? import.meta.env.VITE_API_URL
    : '//localhost:3033/'


export const socketService = createSocketService()

socketService.setup()

function createSocketService() { 
  var socket = null
  const socketService = {
    setup() {
      socket = io(BASE_URL) 
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId:string) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}
