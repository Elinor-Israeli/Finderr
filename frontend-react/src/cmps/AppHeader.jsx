import { Link, NavLink } from 'react-router-dom'
export function AppHeader() {
    return (
        <header className="app-header">
            <nav className='app-header-nav'>
                <h3 className='logo'>Fiverr</h3>
                <Link className='gig-header-link' to="gig">Explore</Link>
                <Link className='gig-header-link' to="gig">Become a seller</Link>
                <Link className="gig-header-link sign-in-btn">Sign in</Link>
                <Link className="join-btn">Join</Link>
            </nav>
           
        </header>
    )
}