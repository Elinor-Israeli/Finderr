
import { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
// import FacebookLogin from 'react-facebook-login'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    // const history = useHistory()
    useEffect(() => {
        document.body.classList.add('modal-open')

        return () => {
            document.body.classList.remove('modal-open')
        }
    }, [])

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        props.setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        props.onCloseModal()
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        props.onSignup(credentials)
        props.onCloseModal()
        clearState()
    }

    function toggleSignup() {
        props.setIsSignup(!props.isSignup)
    }

    function handleOverlayClick(ev) {
        if (ev.target.classList.contains('modal-overlay')) {
            onClose()
        }
    }

    // const responseFacebook = (response) => {
    //     console.log('Facebook login response:', response)
    //     if (response.status !== 'unknown') {

    //         const { name, email, userID, accessToken } = response
    //         const fbUser = { name, email, userID, accessToken }
    //         props.onLogin(fbUser) 
    //         props.onCloseModal()
    //     }
    // }


    // const responseApple = (response) => {
    //     console.log('Apple login response:', response)
    //     if (response) {
    //         const { name, email } = response
    //         const appleUser = { name, email }
    //         props.onLogin(appleUser)
    //         props.onCloseModal()
    //     }
    // }

    const { username, password } = credentials
    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="login-signup-modal" onClick={e => e.stopPropagation()}>
                <div className="banner" style={{ maxWidth: '437px', position: 'relative', margin: '0 auto' }}>
                    <img
                        src="https://fiverr-res.cloudinary.com/npm-assets/layout-service/standard.0638957.png"
                        alt=""
                        style={{
                            width: '460px',
                            height: '645px',
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            borderBottomLeftRadius: '12px',
                            borderBottomRightRadius: '12px',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    />
                    <div
                        className="text-box"
                        style={{
                            position: 'absolute',
                            padding: '54px 40px',
                            top: 0, 
                            left: 0,
                            zIndex: 2, 
                            color: 'white',
                        }}
                    >
                        <h2>Success starts here</h2>
                        <ul style={{fontSize:'20px'}}>
                            <li style={{ lineHeight: '42px' }}>✓ Over 700 categories</li>
                            <li style={{ lineHeight: '42px' }}>✓ Quality work done faster</li>
                            <li style={{ lineHeight: '42px' }}>✓ Access to talent and businesses across the globe</li>
                            <li style={{ lineHeight: '42px' }}></li>
                        </ul>
                    </div>
                </div>
                <div className="modal-layout">
                    <section className="modal-content">
                        {!props.isSignup && <>
                            <h4><strong>Sign in to finderr</strong></h4>
                            <form className="login-signup" onSubmit={onLogin}>
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        placeholder="Username: try bob"
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Password: try 123"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button>Continue</button>
                            </form>
                        </>}
                        <div className="signup-section">
                            {props.isSignup && <>
                                <h4><strong>Join to Finderr</strong></h4>
                                <form className="signup-form" onSubmit={onSignup}>
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={credentials.fullname}
                                            placeholder="Full Name"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={credentials.username}
                                            placeholder="Username"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={credentials.password}
                                            placeholder="Password"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button>Continue</button>
                                </form>
                            </>}

                             {/* Social Login Buttons */}
                        {/* <div className="social-login-buttons">
                            <div className="facebook-login">
                                <FacebookLogin
                                    appId="YOUR_FACEBOOK_APP_ID" // Replace with your Facebook App ID
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    textButton="Login with Facebook"
                                    icon="fa-facebook"
                                />
                            </div>
                            <div className="apple-login">
                                <button
                                    className="apple-sign-in-btn"
                                    onClick={responseApple} // Call Apple Sign-In logic
                                >
                                    Login with Apple
                                </button>
                            </div>
                            <div className="email-login">
                                <button onClick={() => alert('Login with Email')}>
                                    Login with Email
                                </button>
                            </div>
                        </div> */}

                            <button className="btn-link" onClick={toggleSignup}>{props.isSignup ? 'Already a member? Sign In' : 'Not a member yet? Join now'}</button>
                        </div>
                        <div className="modal-footer">
                            By joining, you agree to the Finderr Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}