
import { useState } from 'react'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

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

    const { username, password } = credentials
    return <section className="login-signup">
        {!props.isSignup && <>
            <h4>Sign in to Finderr</h4>
            <form className="login-form" onSubmit={onLogin}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username: try lofty"
                    onChange={handleChange}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password: try 123"
                    onChange={handleChange}
                    required
                />
                <button>Continue</button>
            </form>
        </>}
        <div className="signup-section">
            {props.isSignup && <>
                <h4>Join to Finderr</h4>
                <form className="signup-form" onSubmit={onSignup}>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <button>Continue</button>
                </form>
            </>}
            <button className="btn-link" onClick={toggleSignup}>{props.isSignup ? 'Already a member? Sign In' : 'Not a member yet? Join now'}</button>
        </div>
    </section>
}