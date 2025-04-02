import { Link } from 'react-router-dom'

export function Logo() {
    return (
        <Link to="/">
        <div className="logo">
          <span className='logo-text'>finderr</span>
          <span className='logo-dot'>.</span>
        </div>
      </Link>

    )
}