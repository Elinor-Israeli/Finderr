import { StarRating } from '../review/StarRating'
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../../services/user/user.service.remote'

export function UserInfo({ user_id, compact,owner }) {
    const [user, setUser] = useState(null)
    
    const loadUser = useCallback(async () => {
        try {
            const user = await userService.getById(user_id)
            setUser(user)
        } catch (err) {
            console.log('user =>', err)
        }
    }, [user_id]) 
    
    useEffect(() => {
        loadUser()
    }, [loadUser])

    if (!user) return <div className="loader-container">
        <div className="loader"></div>
    </div>

    return compact ? (
        <div className="user">
            <img src={user.imgUrl} alt="user-img" className="profile-picture" />
            <div className="user-info">
                <div className="user-name-level">
                    <span className="user-name">{user.fullname}</span>
                    <Link className="gig-preview__owner-name" to={`/user/${owner?._id}`}>{owner?.fullname}</Link>
                    <div className="user-level">
                        <div className="level">
                            {user.level === 'level 3' ? 'Top Rated' : `Level ${user.level}`}
                        </div>
                        <div className="level-icons" >
                            <div className={`level-icons ${user.level === 3 ? 'top-rated' : ''}`}></div>
                            {[...Array(3)].map((_, idx) => (
                                <svg
                                    key={idx}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 10 10"
                                    width="10"
                                    height="10"
                                    fill={idx < user.level ? "black" : "gray"}
                                    style={{ marginLeft: "4px" }}
                                    className="owner-level-preview"
                                >
                                    <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="stars">
                    <StarRating value={user.rate} />
                    <span className="reviews-num">
                        ({user.reviews ? user.reviews.length : 1}  reviews)
                    </span>
                </div>
            </div>
        </div>
    ) : (
        <div className="contact-info">
            <h3 className='get-to-know'>Get to know {user.fullname}</h3>
            <div className="contact-info-user">
                <img src={user.imgUrl} alt="user-img" className="contact-info-profile-picture" />
                <div className="user-info">
                    <div className="contact-info-user-name-level">
                        <span className="contact-info-user-name">{user.fullname}</span>
                        <div className="contact-info-user-level">
                            <div className="contact-info-level">
                                {user.level === 'level 3' ? 'Top Rated' : `Level ${user.level}`}
                            </div>
                            <div className="level-icons">
                                {[...Array(3)].map((_, idx) => (
                                    <svg
                                        key={idx}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 10 10"
                                        width="10"
                                        height="10"
                                        fill={idx < user.level ? "black" : "gray"}
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
                        <StarRating value={user.rate} />
                        <span className="contact-info-reviews-num">
                            ({user.reviews ? user.reviews.length : 1}  reviews)
                        </span>
                    </div>
                </div>
            </div>
            {/* <button className="contact-me">Contact me</button> */}
        </div>
    )
}