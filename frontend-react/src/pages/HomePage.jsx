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
    const sellingTxts = gigService.getGigSelling()
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
        <section>
            <section className="home-page full main-layout">

                <div className="hero-container full main-layout">

                    <div className="main-header full main-layout">
                        <h1 className="hero-msg">
                            Scale your professional <br />work force with<i> freelance</i>
                        </h1>
                        <div className="search-bar full main-layout">
                            {/* <input type="text" className="search-input" placeholder="find service" /> */}
                            {/* <input type="text" class="search-input w-100" placeholder="Search" /> */}
                            {/* <button class="search-btn cursor-pointer m-1">Submit</button>
<textarea class="p-2 w-50" placeholder="Type your message"></textarea> */}
                            <Search onSetFilter={onSetFilter} />
                        </div>

                        <section className="trusted-by">
                            <span>Trusted by: </span>
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

                {/* { <div> //! here
    <video class="_19aaquz1j _19aaquz16 _19aaquz18 _1rfvtgw1h"
        autoplay
        controls
        poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png"
        preload="auto"
        crossorigin="anonymous"
        role="video"
        playsinline
        style="--_19aaquz0: 100%; --_19aaquzh: 452px; --_19aaquzj: 589px; object-fit: cover;">

        <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-ef43201-1722432611137/Vontelle%20Breakthrough%209x16.mp4" type="video/mp4">

        <track label="EN"
            srclang="en-US"
            src="https://npm-assets.fiverrcdn.com/assets/@fiverr/logged_out_homepage_perseus/subtitles_en.c0bcbb7.vtt"
            default
            kind="subtitles">
    </video>
</div>  */}

            </div>
            <div className="selling-proposition full main-layout">
                <div className="flex">
                    <div className="selling-text">
                        <h2>A whole world of freelance talent at your fingertips</h2>
                        <ul>
                            {sellingTxts.map((sellingTxt, idx) =>
                                <li key={idx}>
                                    <h6>
                                        <span className="fa-regular circle-check"></span>
                                        <span>{sellingTxt.title}</span>
                                    </h6>
                                    <p>{sellingTxt.desc}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="img-container">
                        <img src={'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_600,dpr_2.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png'} alt="" />
                        {/* <picture>
                            <source media="(min-width: 1160px)" srcset="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/atta…set/asset/2321104…-1721984733481/fiverr-pro.png 1x, https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/atta…/asset/2321104…-1721984733469/fiverr-pro_2x.png 2x"></source>
                            <source media="(min-width: 900px)" srcset="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_585,dpr_1.0/v1/atta…set/asset/2321104…-1721984733481/fiverr-pro.png 1x, https://fiverr-res.cloudinary.com/q_auto,f_auto,w_585,dpr_2.0/v1/atta…/asset/2321104…-1721984733469/fiverr-pro_2x.png 2x"></source>
                            <source media="(min-width: 600px)" srcset="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_800,dpr_1.0/v1/atta…set/asset/2321104…-1721984733481/fiverr-pro.png 1x, https://fiverr-res.cloudinary.com/q_auto,f_auto,w_800,dpr_2.0/v1/atta…/asset/2321104…-1721984733469/fiverr-pro_2x.png 2x"></source>
                            <img src={"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/atta…set/asset/2321104…-1721984733481/fiverr-pro.png"}/>

                        </picture> */}
                    </div>
                </div>
            </div>
            <div className="title-popular">Popular services</div>
            <section className="wrapper-card">
                <div className="wrapper pink-medium">
                    <div className="touch">
                        <div className="inner">
                            <div className="header pink-medium">
                                <h3>Website Development</h3>
                            </div>
                            <div className="content">
                                <img className="V9AK6Eo" alt="Website Development" src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper green-medium">
                    <div className="touch">
                        <div className="inner">
                            <div className="header green-medium">
                                <h3>Card Title</h3>
                            </div>
                            <div className="content">
                                <p>Some content goes here...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper yellow-medium">
                    <div className="touch">
                        <div className="inner">
                            <div className="header yellow-medium">
                                <h3>Card Title</h3>
                            </div>
                            <div className="content">
                                <p>Some content goes here...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper orange-medium">
                    <div className="touch">
                        <div className="inner">
                            <div className="header orange-medium">
                                <h3>Card Title</h3>
                            </div>
                            <div className="content">
                                <p>Some content goes here...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper yellow-dark">
                    <div className="touch">
                        <div className="inner">
                            <div className="header yellow-dark">
                                <h3>Card Title</h3>
                            </div>
                            <div className="content">
                                <p>Some content goes here...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper orange-dark">
                    <div className="touch">
                        <div className="inner">
                            <div className="header orange-dark">
                                <h3>Card Title</h3>
                            </div>
                            <div className="content">
                                <p>Some content goes here...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper pink-dark">
                    <div className="touch">
                        <div className="inner">
                            <div className="header pink-dark">
                                <h3>Card Title</h3>
                            </div>
                            <div className="content">
                                <p>Some content goes here...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper green-dark">
                    <div className="touch">
                        <div className="inner">
                            <div className="header green-dark">
                                <h3>Card Title</h3>
                            </div>
                            <div className="content">
                                <p>Some content goes here...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper orange-primary">
                    <div className="touch">
                        <div className="inner">
                            <div className="header orange-primary">
                                <h3>Card Title</h3>
                            </div>
                            <div className="content">
                                <p>Some content goes here...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </section>
    )
}


