import React, { useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { FaWhatsapp } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";

function ShareModal({ gigUrl, onClose }) {
  const shareMessage = "Check out this gig!"

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
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>Share this gig</h3>
        <p>Spread the word about this Gig on Finderr</p>
        <div className="share-buttons">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="share-btn"><FaFacebook style={{ fontSize: '35px',fill:''}}/>
          facebook</a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="share-btn"><AiFillTwitterCircle style={{ fontSize: '35px'}}/>
          twitter</a>
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="share-btn"><TiSocialLinkedinCircular style={{ fontSize: '35px'}}/>
          linkedIn</a>
          <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="share-btn"><FaWhatsapp style={{ fontSize: '35px'}}/>
          whatsapp</a>
          <button onClick={socialLinks.copyLink} className="share-btn"><AiOutlineLink style={{ fontSize: '35px'}}/>
          Copy Link</button>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
