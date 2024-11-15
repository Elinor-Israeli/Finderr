import { Link, useNavigate } from 'react-router-dom'

// import { Search } from './HederSearch'
import { SET_FILTER } from '../store/reducers/gig.reducer' 
// import { GigCategoryMenu } from './gig/GigCategoryMenu'

import { useEffect, useRef, useState } from 'react'

import { userService } from '../services/user/user.service.local'
import { gigService } from '../services/gig/gig.service.local'
import { GigCategoryMenu } from './gig/GigCategoryMenu'
import { useDispatch, useSelector } from 'react-redux'
import { UserBuyGig } from './user/UserBuyGig'
// import { GigCategoryMenu3 } from './gig/GigCategoryMenu3'
// UserBuyGig //!!

export function IndexHeader({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const elInputRef = useRef(null)
    const { pathname } = window.location
    const [windowSize, setWindowSize] = useState(null)
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const headerRef = useRef(null)
    //~ or import { useLocation } from 'react-router-dom';

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

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

    // export function IndexHeader() {
    return (
        <section className=" my-header full">
        <div className="index-header full">
            <div className="index-header-container main-layout">
                <Link to="/">
                    <div className="logo">
                        <span className='logo-text'>finderr</span>
                        <span className='logo-dot'>.</span>
                    </div>
                </Link>
                <form className="index-search" onSubmit={onSubmitFilter}>
                    <div className="search-index-input" >
                        <input type="text"
                            className={`gig-search ${pathname !== '/' ? 'long-placeholder' : ''}`}

                            //  placeholder='What service are you looking for today?'
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
                        {/* {(windowSize > 900) && <div className="user-header-img">
                            <img src={user.imgUrl}
                                onClick={() => {
                                    setIsOrder(false)
                                    setIsDropdown(!isDropdown)
                                }} />
                            {isDropdown && <Dropdown loginUser={loginUser} onLogout={onLogout} setIsDropdown={setIsDropdown} user={user} />}
                        </div>} */}
                    </>
                }
                    <span>English</span>
                    <Link to="gig"> <span>Become a Seller</span></Link>
                    <span>Sign in</span>
                    
                    <button className='join-btn-index-header'>Join</button>
                </div>
            </div>
           
        </div>
        <div>
        <GigCategoryMenu onSetFilter={onSetFilter} />
        {/* <GigCategoryMenu3 onSetFilter={onSetFilter}/> */}
        </div>
        </section>
        
    )
}