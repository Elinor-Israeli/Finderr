import { useState, useEffect, useRef } from 'react'
import { HiMiniXMark } from "react-icons/hi2"
import { eventBus,  showSuccessMsg } from '../services/event-bus.service' 
import { socketService, SOCKET_EVENT_ORDER_ADDED_TO_DASHBOARD, SOCKET_EVENT_ORDER_UPDATE_STATUS } from '../services/socket.service' 

interface Message {
  txt: string;
  type: string;
}

export function UserMsg() {
  const [msg, setMsg] =useState<Message | null>(null)
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

    socketService.on(SOCKET_EVENT_ORDER_ADDED_TO_DASHBOARD, order => {
      console.log("New order received:", order) 
			showSuccessMsg(`You have a new order from ${order.buyer.fullname}`)
		})
    socketService.on(SOCKET_EVENT_ORDER_UPDATE_STATUS, (updatedOrder) => {
      console.log("Order status updated:", updatedOrder) 
      showSuccessMsg(`The status of your order has been updated to: ${updatedOrder.status}`)
    })

    return () => {
			unsubscribe()
			socketService.off(SOCKET_EVENT_ORDER_ADDED_TO_DASHBOARD)
      socketService.off(SOCKET_EVENT_ORDER_UPDATE_STATUS)
		}

  }, [])

  function closeMsg() {
    setMsg(null)
  }

  if (!msg) return null

  return (
    <section className={`user-msg ${msg.type} visible`}>
      <div className='svg-icon-msg'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#3FCA89" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m3.644-10.612a.774.774 0 0 1 0 1.095l-4.129 4.129a.774.774 0 0 1-1.095 0L4.356 8.547A.774.774 0 1 1 5.45 7.453L6.968 8.97l3.581-3.582a.774.774 0 0 1 1.095 0" clipRule="evenodd"></path></svg>
      </div>
      <p className='txt-msg-icon'>{msg.txt}</p>
      <button onClick={closeMsg}><HiMiniXMark style={{ fontSize: '22px', marginLeft: '-22px', marginTop: '8px' }} />
      </button>
    </section>
  )
}
