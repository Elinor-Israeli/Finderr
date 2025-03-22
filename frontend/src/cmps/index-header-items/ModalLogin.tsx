import { LoginSignup } from "./LoginSignUp" 
import type {Credentials} from '../../types/User'

interface ModalLoginProps {
    onSignup: (credentials: Credentials) => void
    onLogin: (credentials: Credentials) => void
    onCloseModal: () => void
    setIsSignup: React.Dispatch<React.SetStateAction<boolean>>
    isSignup: boolean
  }

export function ModalLogin(props:ModalLoginProps) {

    return <section className="modal">
        <div className="content">
            <LoginSignup onLogin={props.onLogin} onSignup={props.onSignup} onCloseModal={props.onCloseModal}
                setIsSignup={props.setIsSignup} isSignup={props.isSignup} />
        </div>
    </section>
}