import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { gigService } from '../../services/gig/gig.service.local'
import { showErrorMsg } from '../../services/event-bus.service'
// import { GigProgram } from '../../cmps/gig/gig-program'

import { SlideDetails } from '../../cmps/slide/slide-details'
import { StarRating } from '../../cmps/review/StarRating'
import { GigCard } from '../../cmps/gig/GigCard'
import { LongTxt } from '../../cmps/LongTxt'
import { ReviewIndex } from '../../cmps/review/ReviewIndex'
import { Accordion } from '../../cmps/Accordion'
import { ReviewAll } from '../../cmps/review/ReviewAll'
import { GiRoundStar } from 'react-icons/gi'
import { Rating } from '@mui/material'
import { GigBreadcrumbs } from '../../cmps/GigBreadcrumbs'


export function GigDetails({ userReviews }) {
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

    const levelNumber = parseInt(gig.owner.level.replace(/\D/g, ''), 10)
    const { imgUrl, fullname, rate, level, country } = gig.owner
    const displayCountry = country ? country : 'Unknown'

    return <section className="gig-details">
        <div className="gig-details-container">
            <div className="left">
                <GigBreadcrumbs />
                <h1 className='gig-details-title'>{gig.title}</h1>
                <div className="user">
                    <img src={imgUrl} alt="user-img" className="profile-picture" />
                    <div className="user-info">
                        <div className="user-name-level">
                            <span className="user-name">{fullname}</span>
                            <div className="user-level">
                                <div className="level">
                                    {gig.owner.level === 'level 3' ? 'Top Rated' : ` ${gig.owner.level}`}
                                </div>
                                <div className="level-icons">
                                    {[...Array(3)].map((_, idx) => (
                                        <svg
                                            key={idx}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 10 10"
                                            width="10"
                                            height="10"
                                            fill={idx < levelNumber ? "black" : "gray"}
                                            style={{ marginLeft: "4px" }}
                                            className='owner-level-preview'
                                        >
                                            <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="stars">
                            <StarRating value={gig.owner.rate} />
                            <span className="reviews-num">
                                ({userReviews ? userReviews.length : 1}  reviews)
                            </span>
                        </div>
                    </div>
                </div>


                <div className="thumbnail">
                    <SlideDetails gig={gig} />
                </div>

                <div className="gig-about">
                    <h3 className='about-gig-header'>About This Gig</h3>
                    <p>{gig.description}</p>
                    <span style={{ backgroundColor: '#ffecd1', fontFamily: 'Macan' }}>What you'll get:</span>
                    <p>{gig.description2}</p>
                    <span style={{ backgroundColor: '#ffecd1', fontFamily: 'Macan' }}>Why you should hire me :</span>
                </div>
                {/* <ul>
                    <li>Best Quality & Fast Delivery</li>
                    <li>24/7 available & Good communication</li>
                    <li>30 Days of Free ongoing Support</li>
                    <li>Unlimited Revisions</li>
                    <li>Free Video instruction on how to update website</li>
                </ul> */}

                {/* <p>This service is amazing and impressive, Right? I can guarantee you the Quality of work.</p>
                     <p>Still not sure we're a good fit?<span style={{ backgroundColor: '#ffecd1' }}> Contact me to schedule a Zoom call.</span></p>
                  <p>{fullname}</p> */}

                <div className="gig-about-filter">
                    <ul style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 0px 20px' }}>
                        <li className="row-item">
                            <span className='head'>Platform:</span><li>WordPress</li>
                        </li>
                        <li className="row-item">
                            <span className='head'>Website Type:</span><li>Business</li>
                        </li>
                        <li className="row-item spaced">
                            <span className='head'>Service Type:</span><li>New Design</li>
                        </li>
                    </ul>
                </div>
                    
                    <h3 className='get-to-know'>Get to know {gig.owner.fullname}</h3>
                    <div className="contact-info">
                    <div className="contact-info-user">
                    <img src={imgUrl} alt="user-img" className="contact-info-profile-picture" />
                    <div className="user-info">
                        <div className="contact-info-user-name-level">
                            <span className="contact-info-user-name">{fullname}</span>
                            <div className="contact-info-user-level">
                                <div className="contact-info-level">
                                    {gig.owner.level === 'level 3' ? 'Top Rated' : ` ${gig.owner.level}`}
                                </div>
                                <div className="level-icons">
                                    {[...Array(3)].map((_, idx) => (
                                        <svg
                                            key={idx}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 10 10"
                                            width="10"
                                            height="10"
                                            fill={idx < levelNumber ? "black" : "gray"}
                                            style={{ marginLeft: "4px" }}
                                            className='owner-level-preview'
                                        >
                                            <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="contact-info-stars">
                            <StarRating value={gig.owner.rate} />
                            <span className="contact-info-reviews-num">
                                ({userReviews ? userReviews.length : 1}  reviews)
                            </span>
                            </div>
                        </div>
                        
                    </div>
                    <button className="contact-me">Contact me</button>
                    {/* {gig && <button><Link to={`/user/${gig.owner._id}`}>Contact Me</Link></button>} */}
                    
                    <ReviewAll gig={gig} />

                    
                
                



                    </div>
            </div>
            <div className="right">
                <GigCard gig={gig} onSetChat={onSetChat} />
            </div>
        </div>
    </section>


    {/* // return //<section className='main-gig-details'> */}
    //    
    //         
    //           
    //             
    //                     {/* Level: {levelNumber} */}
    //                    
    //                     
    //                 {/* owner-level */}
    //                
    //             </div>
    //             <div className="thumbnail">
    //                 <SlideDetails gig={gig} />
    //             </div>
    //         </div>
    //         <div className="gig-description gig-details-info">
    //             <ReviewIndex gig={gig} />
    //             <div className="gig-about">
    //                 <h3 className='about-gig-header'>About This Gig</h3>
    //                 <p>{gig.description}</p>
    //                 <p style={{ backgroundColor: '#ffecd1' }}>What you'll get:</p>
    //                 <p>{gig.description2}</p>
    //                 <p style={{ backgroundColor: '#ffecd1' }}>Why should hire me :</p>
    //                 <ul>
    //                     <li>Best Quality & Fast Delivery</li>
    //                     <li>24/7 available & Good communication</li>
    //                     <li>30 Days of Free ongoing Support</li>
    //                     <li>Unlimited Revisions</li>
    //                     <li>Free Video instruction on how to update website</li>
    //                 </ul>
    //                 <p>This service is amazing and impressive, Right? I can guarantee you the Quality of work.</p>
    //                 <p>Still not sure we're a good fit?<span style={{ backgroundColor: '#ffecd1' }}> Contact me to schedule a Zoom call.</span></p>
    //                 <p>{fullname}</p>
    //             </div>
    //             <div className="gig-about-filter">
    //                 <ul style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 0px 20px' }}>
    //                     <li className="row-item">
    //                         <p>Platform:</p><li>WordPress</li>
    //                     </li>
    //                     <li className="row-item">
    //                         <p>Website Type:</p><li>Business</li>
    //                     </li>
    //                     <li className="row-item spaced">
    //                         <p>Service Type:</p><li>New Design</li>
    //                     </li>
    //                 </ul>
    //             </div>
    //             <div className="seller-about">
    //                 <h3>Get to know {gig.owner.fullname}</h3>
    //                 <div className="seller-details">
    //                     <img src={imgUrl} alt="user-img" className="seller-image" />
    //                     <div className="seller-info">
    //                         <p className="seller-name">{fullname}</p>
    //                         <div className="seller-rating-level">
    //                             
    //                             <div>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#222325" viewBox="0 0 16 16">
    //                                     <path
    //                                         fillRule="evenodd"
    //                                         d="M16 6.2c0 .182-.125.353-.25.484l-3.49 3.57.826 5.04c.01.07.01.131.01.202 0 .262-.115.504-.394.504a.76.76 0 0 1-.385-.121L8 13.499l-4.317 2.38a.8.8 0 0 1-.385.121c-.279 0-.404-.242-.404-.504 0-.07.01-.131.02-.202l.826-5.04-3.5-3.57C.125 6.554 0 6.382 0 6.2c0-.302.298-.423.538-.463L5.365 5 7.53.413C7.615.222 7.779 0 8 0s.385.222.471.413l2.164 4.588 4.826.736c.231.04.539.16.539.463"
    //                                         clipRule="evenodd"
    //                                         style={{ transform: "translateX(-5px)" }}
    //                                     />
    //                                 </svg>
    //                             </div>
    //                             <span className="rate padding">{rate.toFixed(1)} (reviews) | </span>
    //                             {/* <span className="rate">{rate}</span> */}
    //                             <p
    //                                 style={{
    //                                     backgroundColor: gig.owner.level === 'level 3' ? '#FFE0B3' : 'inherit',
    //                                     marginLeft: '10px',
    //                                 }}
    //                                 className="seller-level"
    //                             >
    //                                 {gig.owner.level === 'level 3' ? 'Top Rated' : ` ${gig.owner.level}`}
    //                                 {[...Array(3)].map((_, idx) => (
    //                                     <svg
    //                                         key={idx}
    //                                         xmlns="http://www.w3.org/2000/svg"
    //                                         viewBox="0 0 10 10"
    //                                         width="10"
    //                                         height="10"
    //                                         fill={idx < levelNumber ? "black" : "gray"}
    //                                         style={{
    //                                             marginLeft: "4px",
    //                                             backgroundColor: gig.owner.level === 'level 3' ? '#FFE0B3' : 'inherit',
    //                                             fontFamily: 'macan-semibold'
    //                                         }}
    //                                         className="level-star"
    //                                     >
    //                                         <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
    //                                     </svg>
    //                                 ))}
    //                             </p>
    //                         </div>
    //                         {gig && <button><Link to={`/user/${gig.owner._id}`}>Contact Me</Link></button>}
    //                     </div>
    //                 </div>
    //             </div>
    //             {/* owner-level */}
    //             <div className="owner-description">
    //                 <p style={{ margin: '0px 0px 24px' }}>Stefan is part of the Fiverr Pro catalog and has been hand-picked by a dedicated Fiverr Pro team for their skills and expertise.</p>
    //                 <p style={{ margin: '0px 0px 16px' }}><strong>Expert in:</strong></p>
    //                 <div className='expert-style'>
    //                     <p className="expert-item">
    //                         <svg className='blue-ball' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ color: 'blue' }}>
    //                             <path fillRule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z" clipRule="evenodd"></path>
    //                         </svg>
    //                         Brand Style Guides 
    //                     </p>
    //                     <p className="expert-item">
    //                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style={{ color: 'blue' }}>
    //                             <path fillRule="evenodd" d="M8.203.432a1.89 1.89 0 0 0-2.406 0l-1.113.912a1.9 1.9 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.98 1.98 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.91 1.91 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.91 1.91 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a2 2 0 0 1-.194-.863l.006-1.456a1.95 1.95 0 0 0-1.5-1.915L10.1 1.728a1.9 1.9 0 0 1-.784-.384zm2.184 5.883a.74.74 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.74.74 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016z" clipRule="evenodd"></path>
    //                         </svg>
    //                         Logo Design
    //                     </p>
    //                 </div>

    //                 {/* <hr /> */}
    //                 <ul className="profile-info">
    //                     {/* <li><span>From</span><span>{displayCountry}</span></li>                <li><span>Member since</span><span>Oct 2012</span></li> */}
    //                     <li><span className="info-label">From</span><span className="info-value">America</span></li>
    //                     <li><span className="info-label">Member since</span><span className="info-value">Oct 2012</span></li>
    //                     <li><span className="info-label">Avg. response time</span><span className="info-value">5 hours</span></li>
    //                     <li><span className="info-label">Last delivery</span><span className="info-value">about 1 hour</span></li>
    //                     <li><span className="info-label">Languages</span><span className="info-value-languages">Serbian, English, French, German</span></li>
    //                 </ul>
    //                 <div>
    //                     <div>
    //                         <p className='under-Languages'>
    //                             {txt}
    //                         </p>
    //                         {isMobile && <LongTxt txt={txt} length={length} />}
    //                     </div>
    //                 </div>
    //                 {/* <hr /> */}
    //                 <article>{gig.about}</article>
    //             </div>
    //             <div>
    //                 <Accordion title="FAQ" className='accordion-title'>
    //                     <p style={{ padding: '20px 0px' }}>What types of artwork can you create using AI?</p>
    //                     <p>
    //                         I can create a wide range of artwork, including portraits, landscapes, concept designs, abstract art, book covers, product visualizations, and more. If you can imagine it, I can bring it to life using AI.
    //                     </p>
    //                 </Accordion>
    //             </div>
    //             <ReviewAll gig={gig} />

    //             {/* <ReviewIndex gig={gig} /> */}
    //             {/* {isChat && <GigChat gig={gig} onSetChat={onSetChat} />} //* later */}

    //         </div>
    //         {/* </section> */}

    //         <GigCard gig={gig} onSetChat={onSetChat} />
    //     </section >
}