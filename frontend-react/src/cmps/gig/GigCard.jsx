import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function GigCard({ gig, onSetChat }) {
    const [program, setProgram] = useState(1)
    const [setShowModal] = useState(false)

    function handleProgram(num) {
        if (num === 1) setProgram(1)
        if (num === 2) setProgram(2)
        if (num === 3) setProgram(3)
    }

   let randomValue = null

    function generateRandom(min = 10, max = 60, reset = false) {
        if (reset || randomValue === null) {
            randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return randomValue;
    }

    const randomDiscount = Math.floor(Math.random() * (25 - 5 + 1)) + 5

    return (
        <div className="gig-details-side">
            <div className="gig-program">
                <div className="gig-program-name">
                    <button
                        onClick={() => handleProgram(1)}
                        className={program === 1 ? "active-basic" : ""}
                    >
                        Basic
                    </button>
                    <button
                        onClick={() => handleProgram(2)}
                        className={program === 2 ? "active-basic" : ""}
                    >
                        Standard
                    </button>
                    <button
                        onClick={() => handleProgram(3)}
                        className={program === 3 ? "active-basic" : ""}
                    >
                        Premium
                    </button>
                </div>

                {program === 1 && (
                    <div className="gig-program-info">
                        <h2 className="gig-program-price">${gig.price}</h2>
                        <p>Save up to {randomDiscount}% with <span style={{ color: 'green' }}>Subscribe to Save</span></p>
                        <p className='dec-gig'>
                            {gig.title}
                        </p>
                        <p className="delivery">
                            <span className="delivery-time fa-regular clock">
                                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
                                    <path d="M9 4H7v5h5V7H9V4z"></path>
                                </svg>
                            </span>
                            <span>
                                3 Days Delivery
                            </span>
                            <span className="fa-solid arrows-rotate">3 Revisions</span>
                        </p>
                        <ul>
                            <li>
                                <span className="svg-payment green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg>
                                </span>
                                <span> 1 concept included </span>
                            </li>
                            <li>
                                <span className="svg-payment green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></span>
                                <span>Include source file</span>
                            </li>
                            <li>
                                <span className="svg-payment green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></span>
                                <span>Logo transparency</span>
                            </li>
                            <li>
                                <span className="svg-payment fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'gray' }}>
                                    <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                                </svg></span>
                                <span>Include 3D mockup</span>
                            </li>
                            <li>
                                <span className="svg-payment fa-solid fa-check fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></span>
                                <span>Vector file</span>
                            </li>
                        </ul>
                        <Link className="gig-program-link-continue" to={`/payment/${gig._id}`}>
                            Continue
                        </Link>
                    </div>
                )}

                {program === 2 && (
                    <div className="gig-program-info">
                        <h2 className="gig-program-price">${gig.price + generateRandom(10, 50, true)}</h2>
                        <p className='dec-gig'>
                            <span className="gig-program-basic">Standard2 </span>
                            {gig.title}
                        </p>
                        <p className="delivery">
                            <span className="fa-regular clock"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
                                <path d="M9 4H7v5h5V7H9V4z"></path>
                            </svg>
                            </span>
                            <span>2 Days Delivery</span>
                            <span className="fa-solid arrows-rotate">5 Revisions</span>
                        </p>
                        <ul>
                            <li>
                                <span className="svg-payment green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></span>
                                <span> 2 concept included </span>
                            </li>
                            <li>
                                <span className="svg-payment green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></span>
                                <span>Include source file</span>
                            </li>
                            <li>
                                <span className="svg-payment green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'gray' }}>
                                    <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                                </svg></span>
                                <span>Logo transparency</span>
                            </li>
                            <li>
                                <span className="svg-payment fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></span>
                                <span>Include 3D mockup</span>
                            </li>
                            <li>
                                <span className="svg-payment fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'gray' }}>
                                    <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                                </svg></span>
                                <span>Vector file</span>
                            </li>
                        </ul>
                        <Link className="gig-program-link-continue" to={`/payment/${gig._id}`}>
                            Continue
                        </Link>
                    </div>
                )}

                {program === 3 && (
                    <div className="gig-program-info">
                        <h2 className="gig-program-price">${gig.price + Math.floor(Math.random() * (75 - 25 + 1)) + 25}</h2>
                        <p className='dec-gig'>
                            <span className="gig-program-basic">Premium 3 </span>
                            {gig.title}
                        </p>
                        <p className="delivery">
                            <span className="svg-payment fa-regular clock"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
                                <path d="M9 4H7v5h5V7H9V4z"></path>
                            </svg>
                            </span>
                            <span>1 Days Delivery</span>1 Days Delivery
                            <span className="fa-solid arrows-rotate"></span>
                            <span>Unlimited Revisions</span>
                        </p>
                        <ul>
                            <li>
                                <span className="green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'gray' }}>
                                    <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                                </svg>
                                </span>
                                <span> 3 concept included </span>
                            </li>
                            <li>
                                <span className="svg-payment green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'gray' }}>
                                    <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                                </svg>
                                </span>
                                <span>Include source file</span>
                            </li>
                            <li>
                                <span className="svg-payment green-check fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'gray' }}>
                                    <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                                </svg></span>
                                <span>Logo transparency ++ Social Media Kit</span>
                            </li>
                            <li>
                                <span className="svg-payment fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></span>
                                <span>VIP Support</span>
                            </li>
                            <li>
                                <span className="svg-payment fa-solid fa-check"><svg width="16" height="16" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path></svg></span>
                                <span>Vector file</span>
                            </li>
                        </ul>
                        <Link className="gig-program-link-continue" to={`/payment/${gig._id}`}>
                            Continue
                        </Link>
                    </div>

                )}
                <a href="/compare-packages" className="center-container">
                    <button className="compare-packages-button">
                    <a style={{ scrollBehavior: 'smooth', fontFamily: "Macan",color: '#404145' }} href="#Compare packages" >Compare packages</a>
                    </button>
                </a>
            </div>

            <div
                to={`/user/${gig.owner_id}`}
                className="contact-seller"
                onClick={() => onSetChat()}
            >
                <button className="contact-seller-btn">Contact me</button>
            </div>
            
        </div>
    )
} 