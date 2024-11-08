import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { gigService } from '../../services/gig/gig.service.local'
import { showErrorMsg } from '../../services/event-bus.service'
// import { GigProgram } from '../../cmps/gig/gig-program'

import { SlideDetails } from '../../cmps/slide/slide-details'
import { StarRating } from '../../cmps/review/StarRating'
import { GigCard } from '../../cmps/gig/GigCard'
import { LongTxt } from '../../cmps/LongTxt'
// import { ReviewIndex } from '../../cmps/review/review-index'


export function GigDetails() {
    const { gigId } = useParams()
    const navigate = useNavigate()
    const [gig, setGig] = useState()
    const [isChat, setIsChat] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        loadGig()
    }, [gigId])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600)
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const txt = "I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.";
    const length = 100

    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            setGig(gig)
        }
        catch (err) {
            console.log('had issue in gig details', err)
            showErrorMsg('cannot load gig')
            navigate('/gig')
        }
    }

    function onSetChat() {
        setIsChat(prev => !prev)
    }

    if (!gig) return <div className="loader-container">
        <div className="loader"></div>
    </div>

    const { imgUrl, fullname, rate, level, country } = gig.owner
    const displayCountry = country ? country : 'Unknown'

    // return //<section className='main-gig-details'>
    return <section className="gig-details">
        <div className="gig-details-preview gig-details-info">
            <nav>{`🏠 / Graphics & design / Logo Design`}</nav>
            <h1>{gig.title}</h1>
            <div className="owner-details">
                <img src={imgUrl} alt="user-img" />
                <p>{fullname}</p>
                <p>{level}</p>
                <span className="divider"></span>
                <div className="star-preview">
                    <StarRating value={rate} />
                    <span className="rate padding">{rate}</span>
                </div>
            </div>
            <div className="thumbnail">
                <SlideDetails gig={gig} />
            </div>
        </div>

        <div className="gig-description gig-details-info">
            <div className="gig-about">
                <h3>About This Gig</h3>
                <p>{gig.description}</p>
                <p style={{ backgroundColor: '#ffecd1' }}>What you'll get:</p>
                <p>Professional, Clean, Modern & Stunning WordPress Website

                    All Devices are Responsive and User Friendly

                    E-commerce and Payment method integration

                    Social Media integration and Live Chat

                    Speed Optimization & SSL Certificate Installation

                    Domain and Hosting Setup

                    WordPress and Plugins Installation

                    Use Demo Copy right free graphic</p>
                     //! add another description2
                     //! border (like hr)
                    //! review
                    //! style to fix 

                <p style={{ backgroundColor: '#ffecd1' }}>Why should hire me :</p>

                <ul>
                    <li>Best Quality & Fast Delivery</li>
                    <li>24/7 available & Good communication</li>
                    <li>30 Days of Free ongoing Support</li>
                    <li>Unlimited Revisions</li>
                    <li>Free Video instruction on how to update website</li>
                </ul>
                <p>This service is amazing and impressive, Right? I can guarantee you the Quality of work.</p>
                <p>Still not sure we're a good fit?<span style={{ backgroundColor: '#ffecd1' }}> Contact me to schedule a Zoom call.</span></p>
                <p>{fullname}</p>
            </div>
            <div className="gig-about-owner">
                <h3>About The Seller</h3>
                <div className="owner-details">
                    <img src={imgUrl} alt="user-img" />

                    <div className="owner-content">
                        <p className="owner-fullname">{fullname}</p>
                        <div className="star-preview">
                            <StarRating value={rate} />
                            <span className="rate padding">{rate}</span>
                        </div>
                        {gig && <button><Link to={`/user/${gig.owner._id}`}>Contact Me</Link></button>}
                    </div>
                </div>
            </div>

            <div className="owner-description">
                <p style={{ margin: '0px 0px 24px' }}>Stefan is part of the Fiverr Pro catalog and has been hand-picked by a dedicated Fiverr Pro team for their skills and expertise.</p>
                <p style={{ margin: '0px 0px 16px' }}><strong>Expert in:</strong></p>
                <div className='expert-style'>
                    <p className="expert-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ color: 'blue' }}>
                            <path fillRule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z" clipRule="evenodd"></path>
                        </svg>
                        Brand Style Guides
                    </p>
                    <p className="expert-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ color: 'blue' }}>
                            <path fillRule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z" clipRule="evenodd"></path>
                        </svg>
                        Logo Design
                    </p>
                </div>

                {/* <hr /> */}
                <ul className="profile-info">
                    {/* <li><span>From</span><span>{displayCountry}</span></li>                <li><span>Member since</span><span>Oct 2012</span></li> */}
                    <li><span className="info-label">From</span><span className="info-value">America</span></li>
                    <li><span className="info-label">Member since</span><span className="info-value">Oct 2012</span></li>
                    <li><span className="info-label">Avg. response time</span><span className="info-value">5 hours</span></li>
                    <li><span className="info-label">Last delivery</span><span className="info-value">about 1 hour</span></li>
                    <li><span className="info-label">Languages</span><span className="info-value-languages">Serbian, English, French, German</span></li>
                </ul>
                <div>
                    <div>
                        <p className='under-Languages'>
                            {txt}
                        </p>
                        {isMobile && <LongTxt txt={txt} length={length} />}
                    </div>
                </div>
                {/* <hr /> */}
                <article>{gig.about}</article>
            </div>

            {/* <ReviewIndex gig={gig} />
            {isChat && <GigChat gig={gig} onSetChat={onSetChat} />} */}

        </div>
        {/* </section> */}
        <GigCard gig={gig} onSetChat={onSetChat} />
    </section >
}