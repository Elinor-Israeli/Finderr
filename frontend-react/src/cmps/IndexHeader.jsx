import { Link, useNavigate, useLocation } from 'react-router-dom'
import { SET_FILTER } from '../store/reducers/gig.reducer'
import { useEffect, useRef, useState } from 'react'
import { userService } from '../services/user/user.service.local'
import { gigService } from '../services/gig/gig.service.local'
import { GigCategoryMenu } from './gig/GigCategoryMenu'
import { useDispatch, useSelector } from 'react-redux'
import { UserBuyGig } from './user/UserBuyGig'

export function IndexHeader({ onSetFilter, isSticky }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const elInputRef = useRef(null)
    const { pathname } = useLocation()
    const [windowSize, setWindowSize] = useState(null)
    const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    

    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize)
    }, []);

    useEffect(() => {

        const handleScroll = () => {
            if (pathname === '/' && window.scrollY > 600) {
                setIsCategoryMenuVisible(true)
                setShowSearch(true)
            } else {
                setIsCategoryMenuVisible(false)
                setShowSearch(false)
            }
        };

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

    return (
        <section className={`my-header main-layout full`}>
            <div className="index-header main layout  full">
                <div className={`index-header-container full main-layout ${isSticky ? 'sticky' : ''}`}>

                    <Link to="/">
                        <div className="logo">
                            <span className='logo-text'>finderr</span>
                            <span className='logo-dot'>.</span>
                        </div>
                    </Link>

                    {pathname === '/' && showSearch && (
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
                    )}
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


            {pathname === '/' ? (
                <div style={{ position: 'fixed', top: '85px', left: '0', width: '100%', zIndex: 10000, backgroundColor: 'white', display: isCategoryMenuVisible ? 'block' : 'none' }}>
                    {isCategoryMenuVisible && <GigCategoryMenu onSetFilter={onSetFilter} />}
                </div>
            ) : (
                <div>
                    <GigCategoryMenu onSetFilter={onSetFilter} />
                </div>
            )}
        </section>
    )
}
