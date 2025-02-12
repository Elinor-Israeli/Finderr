import { Link } from 'react-router-dom'

export function DropdownLogin({ onLogout, setIsDropdown, loginUser }) {
    return <aside className="dropdown">
        <ul>
            <li><Link to={`/user/${loginUser._id}`} onClick={() => setIsDropdown(false)}>Profile</Link></li>
            <li onClick={() => onLogout()}><span>Logout</span></li>
        </ul>
    </aside>
}