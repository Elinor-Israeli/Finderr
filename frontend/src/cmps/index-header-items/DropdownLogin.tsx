import { userService } from '../../services/user/user.service.remote'
import { Link } from 'react-router-dom'
import type {LoginUser} from '../../types/User'

interface DropdownLoginProps {
    setIsDropdown: React.Dispatch<React.SetStateAction<boolean>>
    onLogout: () => void
    loginUser: LoginUser  
    
}
  

export function DropdownLogin(props: DropdownLoginProps) {
  const loginUser = userService.getLoggedinUser()
  console.log('loginUser', loginUser);
  

    return <div className="dropdown">
        <ul>
            <li className='profile-btn'>
                <Link to={`/user/${loginUser?._id}`} onClick={() => props.setIsDropdown(false)}>Profile</Link>
            </li>
            <li className='logout-btn' onClick={() => props.onLogout()}>
                <span>Logout</span>
            </li>
        </ul>
    </div>
}