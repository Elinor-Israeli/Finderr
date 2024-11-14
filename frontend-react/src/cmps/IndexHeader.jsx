import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useEffect, useRef, useState } from 'react'
import { gigService } from '../services/gig/gig.service.local'

export function IndexHeader({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const elInputRef = useRef(null)
    const { pathname } = window.location
    const [windowSize, setWindowSize] = useState(null)
    //~ or import { useLocation } from 'react-router-dom';

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onPlaceholder() {
        let placeholder = 'Search for any service...'
        if (pathname === '/') {
            placeholder = 'Search for any service...'
        } else if (pathname !== '/' && windowSize < 900) {
            placeholder = 'Search for any service...'
        }
        return placeholder
    }

    // export function IndexHeader() {
    return (
        <div className="index-header">
            <div className="index-header-container">
                <Link to="/">
                    <div className="logo">
                        <span className='logo-text'>finderr</span>
                        <span className='logo-dot'>.</span>
                    </div>
                </Link>
                <form className="index-search" onSubmit={onSubmitFilter}>
                    <div className="search-index-input" >
                        <input type="text"
                            className={`gig-search ${pathname !== '/' ? 'long-placeholder' : ''}`}

                            //  placeholder='What service are you looking for today?'
                            id="title"
                            name="title"
                            placeholder={onPlaceholder()}
                            value={filterByToEdit.title}
                            onChange={handleChange}
                            ref={elInputRef}

                        />
                        <button className='btn-index-search'>
                            <span>
                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="white">
                                    <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                </form>
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