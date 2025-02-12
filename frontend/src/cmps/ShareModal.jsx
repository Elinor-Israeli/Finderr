import {useEffect, useRef } from 'react'
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { BsX } from "react-icons/bs";


function ShareModal({ gigUrl, onClose }) {
  const modalRef = useRef()
  const shareMessage = "Check out this gig!"

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(gigUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(gigUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(gigUrl)}&text=${encodeURIComponent(shareMessage)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(gigUrl)}`,
    copyLink: () => {
      navigator.clipboard.writeText(gigUrl)
      alert("Link copied to clipboard!")
    },
  }

  return (
    <div className="share-modal">
      <div className="modal-content" ref={modalRef}>
        <button className="close-btn" onClick={onClose}><BsX style={{fontSize:'22px'}}/></button>
        <h3>Share this gig</h3>
        <p>Spread the word about this Gig on Finderr</p>
        <div className="share-buttons">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="share-btn share-facebook"><FaFacebook className="facebook-icon-share" />
            <span className="facebook-text" >facebook</span></a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="share-btn share-twitter"><AiFillTwitterCircle className="twitter-icon-share" />
            <span className="twitter-text">twitter</span></a>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="share-btn share-linkedIn"><TiSocialLinkedinCircular className="linkedin-icon-share" />
            <span className="linkedIn-text">linkedIn</span></a>
          <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="share-btn share-whatsapp"><FaWhatsapp className="whatsapp-icon-share" />
            <span className="whatsapp-text">whatsapp</span></a>
          <button onClick={socialLinks.copyLink} className="share-btn">
            <div className="circle-wrapper">
              <circle className="background-circle" cx="24" cy="24" r="25.5" fillOpacity="0" fill="#000" />
              <AiOutlineLink className="link-icon-share" />
            </div>
            <p className="whatsapp-text" style={{ fontSize: '12.5px', marginTop: '5px', color: '#62646a', fontFamily: "Macan" }}>
              Copy Link
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
