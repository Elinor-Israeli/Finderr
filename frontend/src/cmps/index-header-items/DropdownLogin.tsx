import { Link } from 'react-router-dom'
import type {LoginUser} from '../../types/User'

interface DropdownLoginProps {
    setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>
    onLogout: () => void
    loginUser: LoginUser  
}
  

export function DropdownLogin(props: DropdownLoginProps) {

    return <div className="dropdown">
        <ul>
            <li className='profile-btn'>
                <Link to={`/user/${props.loginUser._id}`} onClick={() => props.setIsDropdown(false)}>Profile</Link>
            </li>
            <li className='logout-btn' onClick={() => props.onLogout()}>
                <span>Logout</span>
            </li>
        </ul>
    </div>
}