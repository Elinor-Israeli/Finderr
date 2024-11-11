import { Link, NavLink } from 'react-router-dom'
import { GigFilter } from './gig/GigFilter'
import { GigMenu } from './gig/Gigmenu'

export function AppHeader() {
    return (
        <header className="app-header full">
            <nav className='app-header-nav'>
                <h3 className='logo'><Link to="/">Finderr<span>.</span></Link></h3>
                <div className="search-bar-header">
                    <input type="text" className="search-input-header" placeholder="Search for any service..." />
                    <button className="search-btn-header"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></button>
                </div>
               
                    <button className='gig-header-link'>Finderr Pro<svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"/></svg></button>
                    <button className='gig-header-link' to="gig">Explore<svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"/></svg></button>
                    <button className='gig-header-link' >English</button>
                    <Link className='gig-header-link' to="gig">Become a seller</Link>
                    <Link className="gig-header-link sign-in-btn">Sign in</Link>
                    <Link className="join-btn">Join</Link>
              
            </nav>
            <section className="categories-menu full main-layout">
                <ul className="categories">
                    <li><a>Graphic & Design</a></li>
                    <li><a>Digital Marketing</a></li>
                    <li><a>Writing & Translation</a></li>
                    <li><a>Video & Animation</a></li>
                    <li><a >Music & Audio</a></li>
                    <li><a>Programming & Tech</a></li>
                    <li><a>AI Services</a></li>
                    <li><a>Business</a></li>
                    <li><a>Lifestyle</a></li>
                    <li><a>Personal Growth</a></li>
                    <li><a> Consulting</a></li>
                    <li><a>Trending</a></li>
                    <button ><svg width="8" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" /></svg></button>
                </ul>
            </section>
        </header>
    )
}