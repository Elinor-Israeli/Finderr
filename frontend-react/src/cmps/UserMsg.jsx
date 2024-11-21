import { useState, useEffect, useRef } from 'react';
import { eventBus, showSuccessMsg, showErrorMsg } from '../services/event-bus.service';

export function UserMsg() {
  const [msg, setMsg] = useState(null);
  const timeoutIdRef = useRef();

  useEffect(() => {
    // Listen for 'show-msg' events from the eventBus
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg);

      // Automatically close the message after 3 seconds
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        setMsg(null);
      }, 3000);
    });

    // Cleanup event listener on unmount
    return () => unsubscribe();
  }, []);

  // Function to manually close the message
  function closeMsg() {
    setMsg(null);
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
  }

  if (!msg) return null; // If no message, render nothing

  return (
    <section className={`user-msg ${msg.type} visible`}>
      <p>{msg.txt}</p>
      <button onClick={closeMsg}>X</button>
    </section>
  );
}
