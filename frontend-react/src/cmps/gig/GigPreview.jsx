import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateGig } from '../../store/actions/gig.actions'
import { SlideGigPreview } from '../slide/SlideGigPreview'
import { showSuccessMsg } from '../../services/event-bus.service';
import { userService } from '../../services/user/user.service.remote'; 


export function GigPreview({ gig }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [heart, setHeart] = useState(false)
    const [owner, setOwner] = useState(null)
    
    useEffect(() => {
        if (user) {
          if (Array.isArray(gig.wishList) && gig.wishList.includes(user._id)) {
            setHeart(true)
          } else {
            setHeart(false)
          }
        } else {
          setHeart(false)
        }
    
        loadOwner()
      }, [user, gig])

    async function loadOwner() {
        try {
            const owner = await userService.getById(gig.owner_id)
            setOwner(owner)
            if (!Array.isArray(gig.wishList)) {
                gig.wishList = [] 
              }
        } catch (err) {
            console.log('owner =>', err)
        }
    }


    const onHandleHeart = async (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
    
        try {
          const updatedGig = { ...gig }
    
          if (!Array.isArray(updatedGig.wishList)) {
            updatedGig.wishList = []  
          }
    
          const userIndex = updatedGig.wishList.indexOf(user._id)
    
          if (userIndex != -1) {
            updatedGig.wishList.splice(userIndex, 1)
            setHeart(false)
            showSuccessMsg(`Remove to ${user.fullname}`)
          } else {
            updatedGig.wishList.push(user._id)
            setHeart(true)
            showSuccessMsg(`Saved to ${user.fullname}`)
          }
    
          await updateGig(updatedGig)
        } catch (err) {
          console.log("Error updating wishlist:", err)
        }
      }
    


    const getTxtToShow = (txt, length) => {
        return txt.length < length ? txt : `${txt.substring(0, length)}...`
    }

    function renderLevelStars (levelNumber) {
        return [...Array(3)].map((_, idx) => (
            <svg // level icons
                key={idx}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 10"
                width="9"
                height="9"
                fill={idx < levelNumber ? "black" : "gray"}
                style={{ marginLeft: "3px", marginTop: "-1px" }}
            >
                <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
            </svg>
        ))
    }

    if (!owner) return <div className="loader-container">
        <div className="loader"></div>
    </div>

    return (
        <div className="gig-preview__container">
            <Link to={`/gig/${gig._id}`} className="gig-preview__img-container">
                <SlideGigPreview gig={gig} />
                <div className="gig-preview__btn-container-heart">
                    <button onClick={onHandleHeart}>
                        <img
                            src={heart ? "./img/red_heart.png" : "./img/gray_heart.png"}
                            alt="Heart"
                            className="heart-img"
                        />
                    </button>
                </div>
            </Link>

            <div className="gig-preview__content">
                <div className="gig-preview__owner-info">
                    {owner && owner.imgUrl && <img className="gig-preview__owner-img" src={owner.imgUrl} alt="Owner" />}
                    <div className="gig-preview__owner">
                        <Link className="gig-preview__owner-name" to={`/user/${owner?._id}`}>{owner?.fullname}</Link>
                        {owner && owner.level && <div className="gig-preview__owner-level-container">
                            <span
                                className="gig-preview__owner-level"
                                style={owner.level === 3 ? { backgroundColor: '#ffe0b3', padding: '2px 6px', borderRadius: '4px' } : {}}
                            >
                                {owner.level === 3 ? `Top Rated ${owner.level}` : `Level ${owner.level}`}
                                {renderLevelStars(owner.level)}
                            </span>
                        </div>}
                    </div>
                </div>

                <Link className="gig-preview__title" to={`/gig/${gig._id}`}>
                    <div className="gig-preview__long-txt">
                        <span>{getTxtToShow(gig.title, 75)}</span>
                    </div>
                </Link>
                <div className="gig-rate-price">
                    <div className="gig-preview__rate">
                        <svg width="15" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z" />
                        </svg>
                        <div className="gig-preview__rate-num">{owner.rate}</div>
                        {/* <div className="gig-preview__ratings-count">({gig.owner?.ratingsCount})</div> */}
                        {/* <div className="gig-preview__ratings-count">({owner.reviews.length})</div> */}
                       
                        {/* <div className='ratings-count'>({gig.owner && gig.owner.ratingsCount})</div> */}
                    </div>

                    <Link className="gig-preview__price" to={`/gig/${gig._id}`}>
                        <span className="gig-preview__price-margin">
                            From ${gig.price}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
