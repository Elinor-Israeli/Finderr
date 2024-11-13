import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export function IndexHeader(){
    return(
        <div className="index-header">
            <div className="index-header-container">
            <Link to="/">
                <div className="logo">
                    <span className='logo-text'>finderr</span>
                    <span className='logo-dot'>.</span>
                </div>
                </Link>
                <div className="links">
                <Link> <span>Fiver pro</span></Link>
                <Link><span>Explore</span></Link>
                <span>English</span>
                <Link to="gig"> <span>Become a Seller</span></Link>
                <span>Sign in</span>
                <button className='join-btn-index-header'>Join</button>
                </div>
            </div>
        </div>
    )
}