import { useState, useEffect, useRef } from 'react'

import { socketService, SOCKET_EMIT_ORDER_WATCH, SOCKET_EVENT_ORDER_FROM_YOU  } from '../services/socket.service'
import { eventBus, showSuccessMsg  } from '../services/event-bus.service' 

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    socketService.on(SOCKET_EVENT_ORDER_FROM_YOU, (userName) => {
      showSuccessMsg(`New order from ${userName}`)
    })

    socketService.on(SOCKET_EMIT_ORDER_WATCH, ({ sellerName, status }) => {
      showSuccessMsg(`Your order from ${sellerName} was ${status}`)
    })

  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return <section className={`user-msg ${msg.type}`}>
    {msg.txt}
  </section>
}