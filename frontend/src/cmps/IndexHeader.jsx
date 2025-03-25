import { Link, useNavigate } from 'react-router-dom'
import { SET_FILTER } from '../store/reducers/gig.reducer'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { userService } from '../services/user/user.service.remote'
import { gigService } from '../services/gig/gig.service.remote'
import { useDispatch, useSelector } from 'react-redux'
import { OrderDropdown } from './index-header-items/OrderDropdown'
import { login, logout, signup } from '../store/actions/user.actions'
import { ModalLogin } from './index-header-items/ModalLogin'
import { DropdownLogin } from './index-header-items/DropdownLogin'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { loadGigs } from '../store/actions/gig.actions'
import { Logo } from './Logo'
import { IndexHeaderSearchBar } from '../../src/cmps/index-header-items/IndexHeaderSearchBar'

export function IndexHeader() {
  const loginUser = userService.getLoggedinUser()
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
  const wishListGigs = useMemo(() => {
    return gigs.filter(gig => gig.wishList?.includes(user?._id))
  }, [gigs, user])

  useEffect(() => {
  
    function handleResize() {
      setWindowSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [pathname])

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
    if (user) {
      loadGigs()
    }
  }, [user])

  const onExploreClick = useCallback(() => {
    const resetFilter = gigService.getDefaultFilter()
    dispatch({ type: SET_FILTER, filterBy: resetFilter })
    navigate('/gig')
  }, [dispatch, navigate])
  
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

  const handleOrder = useCallback(() => {
    setIsOrder(prev => !prev)
  }, [])

  function onOpenModal() {
    setIsModal(true)
  }

  function onCloseModal() {
    setIsModal(false)
  }

  return (
    <section className="index-header full">
      <div className={`index-header-container main-layout `}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Logo/>
        <IndexHeaderSearchBar/>
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