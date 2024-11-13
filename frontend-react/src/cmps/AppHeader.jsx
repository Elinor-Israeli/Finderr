import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { login, logout, signup } from '../../store/user/user.actions'
import { Search } from './HederSearch'
import { SET_FILTER } from '../store/reducers/gig.reducer'
import { GigCategoryMenu } from './gig/GigCategoryMenu'

import { useEffect, useRef, useState } from 'react'
// import { ModalLogin } from './modal-login'
// import { Dropdown } from './dropdown'

import { userService } from '../services/user/user.service.local'

export function AppHeader() {
    const loginUser = userService.getLoggedinUser()
    const [headerClassName, setHeaderClassName] = useState('')
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isModal, setIsModal] = useState(false)
    const [isDropdown, setIsDropdown] = useState(false)
    const [isOrder, setIsOrder] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const { pathname } = window.location
    const [windowSize, setWindowSize] = useState(null)
    const headerRef = useRef(null)

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY >= 150 && pathname === '/') setHeaderClassName('app-header header-home-page main-layout sticky full')
            else if (window.scrollY < 150 && pathname === '/') setHeaderClassName('app-header header-home-page main-layout')
            else setHeaderClassName('main-layout grid-full')
        }
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [pathname, setWindowSize])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isModal && e.target.className && e.target.className !== "btn-link") {
                setIsModal(false)
            }
            if (isDropdown && e.target.className) {
                setIsDropdown(false)
            }
            if (isOrder && e.target.className !== "user-link") {
                setIsOrder(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isModal, isDropdown, isOrder])

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })

        let categoryParams
        let queryStringParams

        if (filterBy.title !== '') {
            queryStringParams = `?title=${filterBy.title}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }

        else {
            if (filterBy.tags[0] !== undefined) categoryParams = filterBy.tags[0]
            else { categoryParams = '' }
            queryStringParams = `?category=${categoryParams}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }
    }


    return <div className={`${headerClassName}`}>



        <nav className="app-header-nav" ref={headerRef}>

            <div className="app-header-aside">
            <nav className='app-header-nav'>
                <h3 className="logo">
                    <Link to="/">
                        <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#000000">
                                <path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path>
                            </g>
                            <g fill="#00FF00">
                                <path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path>
                            </g>
                        </svg>
                    </Link>
                </h3>
                    <button className='gig-header-link'>Finderr Pro<svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"/></svg></button>
                    <button className='gig-header-link' to="gig">Explore<svg width="16" height="16" viewBox="0 0 14 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M.19 1.272.81.653a.375.375 0 0 1 .53 0L7 6.3 12.66.653a.375.375 0 0 1 .53 0l.62.62a.375.375 0 0 1 0 .53L7.264 8.346a.375.375 0 0 1-.53 0L.19 1.802a.375.375 0 0 1 0-.53Z"/></svg></button>
                    <button className='gig-header-link' >English</button>
                    <Link className='gig-header-link' to="gig">Become a seller</Link>
                    <Link className="gig-header-link sign-in-btn">Sign in</Link>
                    <Link className="join-btn">Join</Link>
                    </nav>
                {/* {pathname !== '/' && <Search onSetFilter={onSetFilter} />} */}
            </div>

        </nav>
        <GigCategoryMenu onSetFilter={onSetFilter} />
    </div>
}