import { GigCategoryMenu } from "./gig/GigCategoryMenu"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SET_FILTER } from '../store/reducers/gig.reducer'
import { useEffect, useState } from 'react'
import { GigCategoryToolBar } from "../cmps/gig/GigCategoryToolBar"
import { SlideList } from "../cmps/slide/SlideList"
import { Search } from "../cmps/HeaderSearch"
import VideoPlayer from "../cmps/VideoPlayer"

export function HomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {

        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const threshold = 700
            if (scrollPosition >= threshold) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])



    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER, filterBy })

        let categoryParams
        let queryStringParams

        if (filterBy.title !== '') {
            queryStringParams = `?categories=${filterBy.categories}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }

        else {
            if (filterBy.tags[0] !== undefined) categoryParams = filterBy.tags[0]
            else { categoryParams = '' }
            queryStringParams = `?categories=${categoryParams}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
            navigate(`/gig${queryStringParams}`)
        }
    }

    return (
        <section>
            <div className={`home-category  ${isVisible ? 'block' : 'hidden'} `} style={{ borderBottom: '1px solid #e4e5e7' }} >
                <GigCategoryToolBar onSetFilter={onSetFilter} />
            </div>
            <section className="home-page ">
                <div className="hero-container ">
                    <h1 className="hero-msg ">
                        Scale your professional work force with freelance
                    </h1>
                    <div className="search-bar ">
                        <Search onSetFilter={onSetFilter} />
                    </div>
                    <section className="trusted-by">
                        <span>Trusted </span>
                        <span style={{ marginLeft: '-25px' }}> by: </span>
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
            </section >
            <div>
                <GigCategoryMenu onSetFilter={onSetFilter} />
                <SlideList onSetFilter={onSetFilter} />
            </div>

            <div className="selling-proposition full main-layout">

                <div className="selling-text">
                    <div className="header-container-header-img">
                        <h2 className="fiverr-pro">
                            The <span className="premium-green">premium</span> freelance <br /> solution for businesses
                        </h2>

                    </div>

                    <div className="selling-grid">
                        <div className="selling-item">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" fill="#003912">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z"></path>
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
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z"></path>
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
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z"></path>
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
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z"></path>
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
            <VideoPlayer />
        </section>
    )
}


