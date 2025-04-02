import { useRef, useEffect, useState } from 'react'

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isVisible])

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls
        muted
        onEnded={handleVideoEnd}
        style={{
          width: '100%',
          height: '590px',
          borderRadius: '16px',
          objectFit: 'cover',
          marginBottom: '100px',
        }}
      >
        <source src="/img/fivver-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer
