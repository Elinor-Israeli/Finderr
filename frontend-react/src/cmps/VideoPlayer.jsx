import React, { useRef,useEffect } from 'react';

function VideoPlayer() {
  const videoRef = useRef()

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  return (
    <div>
      <video 
        ref={videoRef} 
        width="100%" 
        height="auto" 
        controls 
        muted  
        autoPlay
        onEnded={handleVideoEnd}
        style={{ width: '100%', height: '590px', borderRadius: '16px', objectFit: 'cover', marginBottom: '100px' }}

      >
        <source src="/img/fivver-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer;
