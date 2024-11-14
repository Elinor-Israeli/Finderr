// import { GigIndex } from "./gig/GigIndex";

// import { GigCategoryMenu } from "../cmps/gig/GigCategoryMenu";
import { CategoryMenu2 } from "./gig/GigCategoryMenu2";

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { SET_FILTER } from '../store/reducers/gig.reducer'

import { useEffect, useRef, useState } from 'react'


import { userService } from '../services/user/user.service.local'
import { SlideList } from "../cmps/slide/SlideList";
// import { HomePageSlider } from "./HomePageSlide";
import { Search } from "../cmps/HederSearch";
import { gigService } from "../services/gig/gig.service.local";

export function HomePage({ onSetFilter }) {
    const loginUser = userService.getLoggedinUser()
    const [headerClassName, setHeaderClassName] = useState('')
    const user = useSelector(storeState => storeState.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sellingTxt = gigService.getGigSelling()
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

    return (
        <section className="">
            <section className="home-page full main-layout">
                <div className="hero-container full main-layout">

                    <div className="main-header full main-layout">
                        <h1 className="hero-msg">
                            Scale your professional work force with<i className="special-font"> freelance</i>
                        </h1>
                        <div className="search-bar full main-layout">
                            {/* <input type="text" className="search-input" placeholder="find service" /> */}
                            {/* <input type="text" class="search-input w-100" placeholder="Search" /> */}
                            {/* <button class="search-btn cursor-pointer m-1">Submit</button>
<textarea class="p-2 w-50" placeholder="Type your message"></textarea> */}
                            <Search onSetFilter={onSetFilter} />
                        </div>

                        <section className="trusted-by">
                            <span>Trusted </span>
                            <span style={{marginLeft:'-25px'}}> by: </span>
                            <ul>
                                <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg" alt="Payoneer" width="82.42" height="16" /></li>
                                <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.d398de5.svg" alt="PayPal" width="53.01" height="12.69" /></li>
                                <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg" alt="P&G" width="33.13" height="13.8" /></li>
                                <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg" alt="NETFLIX" width="53.64" height="14.37" /></li>
                                <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg" alt="Google" width="53.41" height="17.87" /></li>
                                <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg" alt="meta" width="70" height="14" /></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </section >
            <div>
                <CategoryMenu2 onSetFilter={onSetFilter} />
                <SlideList onSetFilter={onSetFilter} />

                {/* <div>
  <svg xmlns="http://www.w3.org/2000/svg" width="139" height="34" fill="none">
    <path d="M81.646 13.112h-3.151c-2.029 0-3.115 1.547-3.115 4.124v9.318h-5.977V13.112h-2.535c-2.029 0-3.115 1.547-3.115 4.124v9.318h-5.977V8.14h5.977v2.8c.977-2.174 2.317-2.8 4.31-2.8h7.317v2.8c.977-2.174 2.318-2.8 4.31-2.8h1.956zm-25.174 5.672H44.01c.326 2.063 1.594 3.241 3.731 3.241 1.593 0 2.717-.663 3.08-1.841l5.288 1.51c-1.304 3.205-4.528 5.157-8.368 5.157-6.484 0-9.454-5.12-9.454-9.503 0-4.309 2.608-9.465 9.091-9.465 6.883 0 9.164 5.23 9.164 9.097.002.847-.035 1.399-.07 1.804m-5.796-3.572c-.145-1.584-1.268-3.057-3.297-3.057-1.883 0-3.006.847-3.369 3.057zM27.855 26.556h5.253L39.664 8.14H33.65l-3.188 10.718-3.26-10.718h-5.976zm-24.486 0h5.94V13.112h5.651v13.444h5.905V8.14H9.31V6.998c0-1.252.87-2.026 2.246-2.026h3.405V0h-4.384c-4.31 0-7.208 2.689-7.208 6.63v1.51H0v4.973h3.37zM86.987 34V8.153h3.483v2.737c1.077-1.824 3.267-3.03 5.78-3.03 5.458 0 8.582 4.015 8.582 9.492 0 5.475-3.268 9.492-8.76 9.492-2.406 0-4.56-1.132-5.601-2.885V34h-3.484zm14.326-16.647c0-3.833-2.226-6.389-5.566-6.389-3.375 0-5.565 2.556-5.565 6.389s2.19 6.388 5.565 6.388c3.34 0 5.566-2.555 5.566-6.388M116.757 11.219h-2.621c-3.302 0-4.381 2.994-4.381 7.009v8.324h-3.481v-18.4h3.483v3.542c.825-2.446 2.261-3.541 4.811-3.541h2.19zM115.91 17.353c0-5.513 3.913-9.492 9.335-9.492 5.421 0 9.298 3.98 9.298 9.492s-3.877 9.492-9.298 9.492c-5.422-.001-9.335-3.98-9.335-9.492m15.078 0c0-3.76-2.333-6.389-5.745-6.389-3.446 0-5.78 2.629-5.78 6.389s2.333 6.389 5.78 6.389c3.412 0 5.745-2.63 5.745-6.39M139 24.52v.043c0 1.251-.997 2.266-2.229 2.266-1.23 0-2.229-1.014-2.229-2.266v-.043c0-1.251.997-2.266 2.229-2.266 1.23 0 2.229 1.015 2.229 2.266"></path>
  </svg>
</div> */}

            </div>
            <section className="full main-layout">
                <div className="selling-proposition full main-layout">

                    <div className="selling-text">
                        <div className="header-container-header-img">
                            <h2 className="fiverr-pro">The <span className="premium-green">premium</span> freelance solution for businesses</h2>
                        </div>

                        <div className="selling-grid">
                            <div className="selling-item">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" fill="#003912">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z"></path>
                                    </svg>
                                </span>
                                <h6>
                                    <span className="circle-check"></span>

                                    <span>Dedicated hiring experts</span>
                                </h6>
                                <p>Count on an account manager to find you the right talent and see to your project’s every need.</p>
                            </div>

                            <div className="selling-item">
                            <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" fill="#003912">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z"></path>
                                    </svg>
                                </span>
                                <h6>
                                    <span className="circle-check"></span>
                                    <span>Satisfaction guarantee</span>
                                </h6>
                                <p>Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.</p>
                            </div>

                            <div className="selling-item">
                            <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" fill="#003912">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z"></path>
                                    </svg>
                                </span>
                                <h6>
                                    <span className="circle-check"></span>
                                    <span>Advanced management tools</span>
                                </h6>
                                <p>Seamlessly integrate freelancers into your team and projects.</p>
                            </div>

                            <div className="selling-item">
                            <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" fill="#003912">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z"></path>
                                    </svg>
                                </span>
                                <h6>
                                    <span className="circle-check"></span>
                                    <span>Flexible payment models</span>
                                </h6>
                                <p>Pay per project or opt for hourly rates to facilitate longer-term collaboration.</p>
                            </div>
                        </div>
                    </div>

                    <div className="img-container">
                        <img src="/img/homePage-status.png" alt="" />
                    </div>
                </div>
            </section>
        </section>
    )
}


