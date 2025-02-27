import { Link } from 'react-router-dom'

export function DropdownLogin({ onLogout, setIsDropdown, loginUser }) {
    return <div className="dropdown">
        <ul>
            <li className='profile-btn'><Link to={`/user/${loginUser._id}`} onClick={() => setIsDropdown(false)}>Profile</Link></li>
            <li className='logout-btn'onClick={() => onLogout()}><span>Logout</span></li>
        </ul>
    </div>
}