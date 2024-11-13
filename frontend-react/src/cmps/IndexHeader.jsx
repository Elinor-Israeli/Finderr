import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export function IndexHeader() {
    return (
        <div className="index-header">
            <div className="index-header-container">
                <Link to="/">
                    <div className="logo">
                        <span className='logo-text'>finderr</span>
                        <span className='logo-dot'>.</span>
                    </div>
                </Link>
                <div className="index-search">
                    <div className="search-index-input">
                    <input type="text" placeholder='What service are you looking for today?' />
                    <button className='btn-index-search'>
                    <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="white">
                        <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
                    </svg>
                </span>
                    </button>
                    </div>
                </div>
                <div className="links">
                    <span>Fiver pro</span>
                    <Link to="gig"><span>Explore</span></Link>
                    <span>English</span>
                    <Link to="gig"> <span>Become a Seller</span></Link>
                    <span>Sign in</span>
                    <button className='join-btn-index-header'>Join</button>
                </div>
            </div>
        </div>
    )
}