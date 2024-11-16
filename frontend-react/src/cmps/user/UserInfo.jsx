import { StarRating } from '../../cmps/review/StarRating'
import { LongTxt } from '../../cmps/LongTxt'
import { useEffect, useState } from 'react'

export function UserInfo({ gig, compact }) {
    const { imgUrl, fullname, rate, level, country } = gig.owner
    const levelNumber = parseInt(gig.owner.level.replace(/\D/g, ''), 10)
    const [userReviews, setUserReviews] = useState(null)

    const txt = "I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries."

    useEffect(() => {
        loadUserReviews()
    }, [])

    async function loadUserReviews() {
        try {
            const userReviews = await userService.getUserReviews(gig.owner._id)
            setUserReviews(userReviews)
        } catch (err) {
            console.log('userReviews =>', err)
        }
    }

    return compact ? (
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
    ) : (
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
            <ul className="profile-info">
                <li><span className="info-label">From</span><span className="info-value">America</span></li>
                <li><span className="info-label">Member since</span><span className="info-value">Oct 2012</span></li>
                <li><span className="info-label">Avg. response time</span><span className="info-value">5 hours</span></li>
                <li><span className="info-label">Last delivery</span><span className="info-value">about 1 hour</span></li>
                <li><span className="info-label">Languages</span><span className="info-value-languages">Serbian, English, French, German</span></li>
            </ul>
            <div>
                <p className='under-Languages'>
                    {txt}
                </p>
                <LongTxt txt={txt} length={length}/>
            </div>
        </div>
    )
}