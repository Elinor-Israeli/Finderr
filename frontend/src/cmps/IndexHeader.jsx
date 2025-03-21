import { Link, useNavigate } from 'react-router-dom'
import { SET_FILTER } from '../store/reducers/gig.reducer'
import { useEffect, useRef, useState } from 'react'
import { userService } from '../services/user/user.service.remote'
import { gigService } from '../services/gig/gig.service.remote'
import { useDispatch, useSelector } from 'react-redux'
import { OrderDropdown } from './index-header-items/OrderDropdown'
import { login, logout, signup } from '../store/actions/user.actions'
import { ModalLogin } from './index-header-items/ModalLogin'
import { DropdownLogin } from './index-header-items/DropdownLogin'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadGigs } from '../store/actions/gig.actions'
import useOnSetFilter from '../utils/hooks'

export function IndexHeader() {
  const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
  const elInputRef = useRef(null)
  const [, setIsCategoryMenuVisible] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [, setShowSearch] = useState(false)
  const loginUser = userService.getLoggedinUser()
  const [, setHeaderClassName] = useState('')
  const user = useSelector(storeState => storeState.userModule.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState(false)
  const [isDropdown, setIsDropdown] = useState(false)
  const [isOrder, setIsOrder] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const { pathname } = window.location
  const [windowSize, setWindowSize] = useState(null)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const wishListGigs = gigs.filter(gig => gig.wishList && gig.wishList.includes(user?._id))
  const onSetFilter = useOnSetFilter()

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
    let placeholder = 'What service are you looking for today?'
    if (pathname === '/') {
      placeholder = 'What service are you looking for today?'
    } else if (pathname !== '/' && windowSize < 900) {
      placeholder = 'What service are you looking for today?'
    }
    return placeholder
  }

  function onExploreClick() {
    const resetFilter = gigService.getDefaultFilter()
    dispatch({ type: SET_FILTER, filterBy: resetFilter })
    navigate('/gig')
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
      navigate('/')
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

  function handleOrder() {
    setIsOrder(prev => !prev)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const threshold = 400
      if (scrollPosition >= threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  useEffect(() => {
    // we load gigs here for determining wether the wishlist heart icon should be red or grey 
    // so we only load gigs when there is a signed in user
    if (user) {
      loadGigs()
    } 
  }, [user]) 

  return (
    <section className="index-header full">
      <div className={`index-header-container main-layout `}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          <Link to="/">
            <div className="logo">
              <span className='logo-text'>finderr</span>
              <span className='logo-dot'>.</span>
            </div>
          </Link>

          <form className={`index-search ${isVisible ? 'block-header' : 'hidden'}`} onSubmit={onSubmitFilter}>
            <div className="search-index-input">
              <input
                type="text"
                className={`gig-search ${pathname !== '/' ? 'long-placeholder' : ''}`}
                id="categories"
                name="categories"
                placeholder={onPlaceholder()}
                value={filterByToEdit.categories}
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
          <div className="links ">
            <Link to="/gig" onClick={onExploreClick}>
              <span className='explore-btn'>Explore</span>
            </Link>
            {user &&
              <>
                <Link to="/dashboard" className="dashboard-link">
                  <span>Dashboard</span>
                </Link>
                {(windowSize > 900) && <div className="user-orders">
                  <Link onClick={handleOrder}>Orders</Link>
                  {isOrder && <OrderDropdown />}
                </div>}
                <Link to="/wishlist" className="heart" title="save to list">
                  <img
                    src={wishListGigs.length > 0 ? "/img/red_heart.png" : "/img/gray_heart.png"} 
                    alt="Heart"
                    className="heart-img"
                    style={{ aspectRatio: 'unset' }}
                  />
                </Link>
                {(windowSize > 900) && <div className="user-header-img">
                  <img src={user.imgUrl}
                    alt='user'
                    style={{
                      borderRadius: '50%',
                      width: '2em',
                      height: '2em',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setIsOrder(false)
                      setIsDropdown(!isDropdown)
                    }} />
                  {isDropdown && <DropdownLogin loginUser={loginUser} onLogout={onLogout} setIsDropdown={setIsDropdown} />}
                </div>}
              </>
            }
            {!user &&
              <>
                {isModal && <ModalLogin onLogin={onLogin} onSignup={onSignup}
                  onCloseModal={onCloseModal} setIsSignup={setIsSignup} isSignup={isSignup} />}
                {(windowSize > 900) && <Link className='sign-in-link' onClick={() => { onOpenModal(); setIsSignup(false) }}>Sign in</Link>}
                {(windowSize > 900) && <button className="join-btn-index-header"
                  onClick={() => { onOpenModal(); setIsSignup(true) }}>Join</button>}
              </>
            }
          </div>
        </div>
      </div>
    </section>
  )
}