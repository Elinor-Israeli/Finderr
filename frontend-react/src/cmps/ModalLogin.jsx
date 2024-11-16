import { LoginSignup } from "./LoginSignUp" 

export function ModalLogin({ onLogin, onSignup, onCloseModal, setIsSignup, isSignup }) {

    return <section className="modal">
        <div className="content">
            <LoginSignup onLogin={onLogin} onSignup={onSignup} onCloseModal={onCloseModal}
                setIsSignup={setIsSignup} isSignup={isSignup} />
        </div>
    </section>
}