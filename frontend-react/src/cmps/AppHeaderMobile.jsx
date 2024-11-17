import { Link } from 'react-router-dom'

export function AppHeaderMobile({ onToggleMenu, user, onLogout, onOpenModal, setIsSignup }) {

    return <div className="main-screen" onClick={() => onToggleMenu()}>
        <div className="mobile-menu">
            {user && <div className="user">
                <img src={user.imgUrl} />
                <span>{user.fullname}</span>
            </div>}
            <ul>
                {!user && <>
                    <li><button className="join-btn"
                        onClick={() => { onOpenModal(); setIsSignup(true) }}>Join</button></li>
                    <li><Link className="grey-btn" onClick={() => { onOpenModal(); setIsSignup(false) }}>Sign in</Link></li>
                </>}
                <li><Link className="grey-btn" to="/gig">Explore</Link></li>
                {user && <>
                    <li><Link className="grey-btn" to={`/user/${user._id}`}>Profile</Link></li>
                    <li><button className="user-link grey-btn">Orders</button></li>
                    <li className="grey-btn" onClick={() => onLogout()}>Logout</li>
                </>}
            </ul>
        </div>
    </div>
}