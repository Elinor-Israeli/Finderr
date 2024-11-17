import { Link, useNavigate, useLocation } from 'react-router-dom'
import { SET_FILTER } from '../store/reducers/gig.reducer'
import { useEffect, useRef, useState } from 'react'
import { userService } from '../services/user/user.service.local'
import { gigService } from '../services/gig/gig.service.local'
import { GigCategoryMenu } from './gig/GigCategoryMenu'
import { useDispatch, useSelector } from 'react-redux'
import { UserBuyGig } from './user/UserBuyGig'
import { login, logout, signup } from '../store/user/user.actions'
import { ModalLogin } from './ModalLogin'
// import { AppHeaderMobile } from './AppHeaderMobile'
// import { DropdownLogin } from './DropdownLogin'
// import { Search } from './HederSearch'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function IndexHeader({ onSetFilter, isSticky }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const elInputRef = useRef(null)
    const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
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
    const [heart, setHeart] = useState(false)

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

    useEffect(() => {

        const handleScroll = () => {
            if (pathname === '/' && window.scrollY > 600) {
                setIsCategoryMenuVisible(true)
                setShowSearch(true)
            } else {
                setIsCategoryMenuVisible(false)
                setShowSearch(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onPlaceholder() {
        let placeholder = 'Search for any service...'
        if (pathname === '/') {
            placeholder = 'Search for any service...'
        } else if (pathname !== '/' && windowSize < 900) {
            placeholder = 'Search for any service...'
        }
        return placeholder
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })

        let categoryParams
        let queryStringParams

        if (filterBy.title !== '') {
            queryStringParams = `?title=${filterBy.title}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`;
            navigate(`/gig${queryStringParams}`)
        } else {
            categoryParams = filterBy.tags[0] || ''
            queryStringParams = `?category=${categoryParams}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`;
            navigate(`/gig${queryStringParams}`)
        }
    }

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    async function onLogout() {
        try {
            await logout()
            setIsDropdown(false)
            showSuccessMsg(`Bye now`)
            navigate('/gig')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onOpenModal() {
        setIsModal(true)
    }

    function onCloseModal() {
        setIsModal(false)
    }

    function onToggleMenu() {
        setIsOpenMenu(!isOpenMenu)
    }

    function handleOrder() {
        setIsOrder(prev => !prev)
    }
    return (
        //     <nav className="app-header-nav" ref={headerRef}>
        //     <button className=" menu-toggle-btn"
        //         onClick={() => onToggleMenu()}></button>
        //     {/* {(windowSize < 900) && isOpenMenu &&
        //         <AppHeaderMobile onToggleMenu={onToggleMenu} user={user} onLogout={onLogout} onOpenModal={onOpenModal} setIsSignup={setIsSignup} />} */}


        //     <div className="app-header-main">
        //         {(windowSize > 900) && <Link to="/gig"
        //             onClick={() => {
        //                 onSetFilter(gigService.getDefaultFilter())
        //             }}>Explore</Link>}
        //         {user &&
        //             <>
        //                 {(windowSize > 900) && <div className="user-orders">
        //                     <Link onClick={handleOrder}>Orders</Link>
        //                     {isOrder && <UserBuyGig />}
        //                 </div>}
        //                 <Link to="/wishlist" className="heart" title="save to list">
        //                  {/* <img
        //                         src={heart ? "./img/red_heart.png" : "./img/gray_heart.png"}
        //                         alt="Heart"
        //                         className="heart-img"

        //                     /> */}
        //                     </Link>
        //                 {(windowSize > 900) && <div className="user-header-img">
        //                     <img src={user.imgUrl}
        //                         onClick={() => {
        //                             setIsOrder(false)
        //                             setIsDropdown(!isDropdown)
        //                         }} />
        //                     {isDropdown && <DropdownLogin loginUser={loginUser} onLogout={onLogout} setIsDropdown={setIsDropdown} user={user} />}
        //                 </div>}
        //             </>
        //         }
        //         {!user &&
        //             <>
        //                 {isModal && <ModalLogin onLogin={onLogin} onSignup={onSignup}
        //                     onCloseModal={onCloseModal} setIsSignup={setIsSignup} isSignup={isSignup} />}
        //                 {(windowSize > 900) && <Link onClick={() => { onOpenModal(); setIsSignup(false) }}>Sign in</Link>}
        //                 {(windowSize > 900) && <button className="join-btn"
        //                     onClick={() => { onOpenModal(); setIsSignup(true) }}>Join</button>}
        //             </>
        //         }
        //     </div>
        // </nav>
        <section className={`my-header main-layout `}>
            <div className="index-header main layout  ">
                <div className={`index-header-container  main-layout ${isSticky ? 'sticky' : ''}`}>

                    <Link to="/">
                        <div className="logo">
                            <span className='logo-text'>finderr</span>
                            <span className='logo-dot'>.</span>
                        </div>
                    </Link>

                    {/* {pathname === '/' && showSearch && ( */}
                    <form className="index-search" onSubmit={onSubmitFilter}>
                        <div className="search-index-input">
                            <input
                                type="text"
                                className={`gig-search ${pathname !== '/' ? 'long-placeholder' : ''}`}
                                id="title"
                                name="title"
                                placeholder={onPlaceholder()}
                                value={filterByToEdit.title}
                                onChange={handleChange}
                                ref={elInputRef}
                            />
                            <button className='btn-index-search'>
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="white">
                                        <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                    {/* )} */}
                    <div className="links">
                        <span>Fiver pro</span>
                        <Link to="gig"><span>Explore</span></Link>
                        {user &&
                            <>
                                <div className="user-orders">
                                    <Link onClick={handleOrder}>Orders</Link>
                                    {isOrder && <UserBuyGig />}
                                </div>
                                <Link to="/wishlist" className="fa-regular heart" title="save to list"></Link>
                            </>
                        }
                        <span>English</span>
                        <Link to="gig"> <span>Become a Seller</span></Link>
                        <span>Sign in</span>
                        <button className='join-btn-index-header'>Join</button>
                    </div>
                </div>
            </div>


            <div className={`full`}>

                {pathname === '/' ? (
                    <div style={{ position: 'fixed', top: '85px', left: '0', width: '100%', zIndex: 10000, backgroundColor: 'white', display: isCategoryMenuVisible ? 'block' : 'none' }}>
                        {isCategoryMenuVisible && <GigCategoryMenu onSetFilter={onSetFilter} />}
                    </div>
                ) : (
                    <div>
                        <GigCategoryMenu onSetFilter={onSetFilter} />
                    </div>
                )}
            </div>
        </section>
    )
}
