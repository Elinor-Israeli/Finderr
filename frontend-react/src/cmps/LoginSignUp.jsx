import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, signup  } from '../store/actions/user.actions'
import { userService } from '../services/user/user.service.local' 
import { showErrorMsg, showSuccessMsg  } from '../services/event-bus.service'

export function LoginSignup({ isSignup, onClose, onToggleSignup }) {
    const [user, setUser] = useState(userService.getEmptyUser)
    const [error] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add('modal-open')

        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [])

    function handleChange({ target }) {
        const { name, value } = target
        setUser(prevUser => ({ ...prevUser, [name]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        const method = isSignup ? signup : login

        try {
            await method(user)
            showSuccessMsg(`You are logged in`)
            navigate('/')
            onClose()
        } catch (err) {
            showErrorMsg('Could\'nt log in')
        }
    }

    function handleOverlayClick(ev) {
        if (ev.target.classList.contains('modal-overlay')) {
            onClose()
        }
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="login-signup-modal" onClick={e => e.stopPropagation()}>
                <div className="banner">
                    <div className="text-box">
                        <h2>Success starts here</h2>
                        <ul>
                            <li>✓ Over 700 categories</li>
                            <li>✓ Quality work done faster</li>
                            <li>✓ Access to talent and businesses </li>
                            <li>across the globe</li>
                        </ul>
                    </div>
                    <img src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png" alt="" />
                </div>

                <div className="modal-layout">
                    <div className="modal-content">
                        <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
                        <form onSubmit={handleSubmit} className='login-signup'>
                            {error && <p className="error">{error}</p>}

                            {isSignup && <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value="dsf"
                                    onChange={handleChange}
                                    placeholder="Full name"
                                    required
                                />
                            </div>}

                            <div className="input-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value="dsc"
                                    onChange={handleChange}
                                    placeholder="Username"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value="sdf"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            <button type="submit" className="continue-btn">
                                {isSignup ? 'Sign Up' : 'Sign In'}
                            </button>

                            <p className="toggle-mode" onClick={onToggleSignup}>
                                {isSignup ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
                            </p>
                        </form>
                    </div>

                    <div className="modal-footer">
                        By joining, you agree to the Finderr Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
                    </div>
                </div>
            </div>
        </div>
    )
}
