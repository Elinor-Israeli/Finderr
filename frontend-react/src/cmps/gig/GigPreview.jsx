// import { Link } from 'react-router-dom'
// import Box from '@mui/material/Box'
// import Rating from '@mui/material/Rating'
// import { FaRegHeart } from "react-icons/fa";
// import { TbBrandZoom } from "react-icons/tb";
// import { useSelector } from 'react-redux'
// import { useEffect, useState } from 'react'
// import { updateGig } from '../../store/actions/gig.actions'
// import { SlideGigPreview } from '../slide/SlideGigPreview'

// export function GigPreview({ gig }) {
//     const user = useSelector((storeState) => storeState.userModule.user)
//     const [heart, setHeart] = useState(false)

//     useEffect(() => {
//         if (user) {
//             if (gig.wishList.includes(user._id)) {
//                 setHeart(true)
//             }
//         } else {
//             setHeart(false)
//         }
//     }, [user])

//     function getTxtToShow(txt, length) {
//         return (txt.length < length) ? txt : txt.substring(0, length + 1) + '...'
//     }

//     async function onHandleHeart() {
//         try {
//             let index = gig.wishList.indexOf(user._id)
//             if (index > -1) {
//                 gig.wishList.splice(index, 1)
//                 setHeart(false)
//             } else {
//                 gig.wishList.push(user._id)
//                 setHeart(true)
//             }
//             await updateGig({ ...gig })
//         }
//         catch (err) {
//             console.log(err)
//         }
//         // finally
//     }


//     // const levelNumber = parseInt(gig.owner.level.replace(/\D/g, ''), 10)
//     const levelNumber = 2
//     // console.log(gig)

//     return (
//         <>
//             <Link to={`/gig/${gig._id}`} className="img-container">
//                 <SlideGigPreview gig={gig} />
//                 <div className="btn-container">
//                     <button
//                         onClick={(ev) => {
//                             ev.preventDefault()
//                             ev.stopPropagation()
//                             onHandleHeart()
//                         }}
//                         title="save to my list"
//                         style={{
//                             color: heart ? "#ffffff" : "#ffffff",

//                             // transition: "color .6s ease",
//                             fontSize: '25px',
//                             margin: '10px',
//                             padding: '10px'
//                         }}
//                     >
//                         <div className="btn-heart-container">
//                             <button onClick={onHandleHeart} className="fa-solid heart" title="save to my list" style={heart ? { color: "#f74040", transition: "color .6s ease" } : { color: "#b5b6ba", transition: "color .6s ease" }}></button>
//                         </div>
//                         <FaRegHeart />
//                         {/* <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 512 512"
//                             fill="currentColor"
//                             width="24"
//                             height="24"
//                             style={{ backgroundColor: 'transparent' }}
//                         >
//                             <path d="M462.3 62.7c-54.5-46.4-136-39.4-186.9 16.4l-22.6 25.2-22.6-25.2c-50.9-55.8-132.4-62.8-186.9-16.4-60.4 51.5-65.2 142.4-13.3 202.2L224 464l171.9-198.1c51.8-59.8 47.1-150.7-13.3-202.2z" />
//                         </svg> */}
//                     </button>
//                 </div>
//             </Link>
//             <div className="content">
//                 <div className="owner-info">
//                     <img src={gig.owner && gig.owner.imgUrl} alt="" />
//                     <div className="owner">
//                         <Link className='owner-name' to={`/user/${gig.owner._id}`}>{gig.owner && gig.owner.fullname}</Link>
//                         <div className="owner-level-container">
//                             <span className='owner-level'>
//                                 Level: {levelNumber}
//                                 {[...Array(3)].map((_, idx) => (
//                                     <svg
//                                         key={idx}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 10 10"
//                                         width="10"
//                                         height="10"
//                                         fill={idx < levelNumber ? "black" : "gray"}
//                                         style={{ marginLeft: "4px" }}
//                                     >
//                                         <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
//                                     </svg>
//                                 ))}
//                             </span>
//                         </div>
//                     </div>


//                 </div>
//                 <Link className="title" to={`/gig/${gig._id}`}>
//                     <div className="long-txt">
//                         <span>{getTxtToShow(gig.title, 55)}</span>
//                     </div>
//                 </Link>
//                 <div className="rate">
//                     {/* <Box sx={{ '& > legend': { mt: '5px', marginTop: '5px', color: 'black' }, '& .MuiRating-icon': { color: 'red',marginRight: '4px' } }}> */}
//                     <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z" /></svg>
//                     {/* <Rating
//                             value={gig.owner.rate}
//                             name="half-rating-read"
//                             size="small"
//                             precision={0.5}
//                             max={1}
//                             readOnly
//                         /> */}
//                     {/* </Box> */}
//                     <div className='rate-num'>{gig.owner && gig.owner.rate}</div>
//                     <div className='ratings-count'>({gig.owner && gig.owner.ratingsCount})</div>
//                 </div>
//                 <Link className="price" to={`/gig/${gig._id}`}>
//                     <span className='price-margin'>
//                         From ${gig.price.toFixed(2)}
//                         <sup></sup>
//                     </span>
//                 </Link>
//             </div>
//         </>
//     )
// }
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateGig } from '../../store/actions/gig.actions'
import { FaRegHeart } from "react-icons/fa";
import { SlideGigPreview } from '../slide/SlideGigPreview'


export function GigPreview({ gig }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [heart, setHeart] = useState(false)

    useEffect(() => {
        
        if (user && gig.wishList.includes(user._id)) {
            setHeart(true)
        } else {
            setHeart(false)
        }
    }, [user, gig.wishList]) 

   
    const onHandleHeart = async (ev) => {
        // console.log('check');
        
        ev.preventDefault()
        ev.stopPropagation()

        try {
            const updatedGig = { ...gig }
            const userIndex = updatedGig.wishList.indexOf(user._id)

           
            if (userIndex > -1) {
                updatedGig.wishList.splice(userIndex, 1) 
                setHeart(false)
            } else {
                updatedGig.wishList.push(user._id) 
                setHeart(true)
            }

            await updateGig(updatedGig) 
        } catch (err) {
            console.log("Error updating wishlist:", err)
        }
    }

    
    const getTxtToShow = (txt, length) => {
        return txt.length < length ? txt : `${txt.substring(0, length)}...`
    }

    const renderLevelStars = (levelNumber) => {
        return [...Array(3)].map((_, idx) => (
            <svg // level icons
                key={idx}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 10"
                width="9"
                height="9"
                fill={idx < levelNumber ? "black" : "gray"}
                style={{ marginLeft: "3px",marginTop: "3px" }}
            >
                <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
            </svg>
        ))
    }

    return (
        <div className="gig-preview__container">
            <Link to={`/gig/${gig._id}`} className="gig-preview__img-container">
                <SlideGigPreview gig={gig} />
                <div className="gig-preview__btn-container-heart">
                    {/* <button  onClick={onHandleHeart}>
                      <img src="/img/gray_heart.png" alt="" /> */}
                        {/* // title="save to my list"
                        // className={`gig-preview__heart-button ${heart ? 'gig-preview__heart-button--active' : ''}`}
                        // fill="red"
                        // stroke= 'red' */}
                        {/* <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill='white'
                        
                        xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.325 2.00937C12.5188 0.490623 9.72813 0.718748 8 2.47812C6.27188 0.718748 3.48125 0.487498 1.675 2.00937C-0.674996 3.9875 -0.331246 7.2125 1.34375 8.92187L6.825 14.5062C7.1375 14.825 7.55625 15.0031 8 15.0031C8.44688 15.0031 8.8625 14.8281 9.175 14.5094L14.6563 8.925C16.3281 7.21562 16.6781 3.99062 14.325 2.00937ZM13.5875 7.86875L8.10625 13.4531C8.03125 13.5281 7.96875 13.5281 7.89375 13.4531L2.4125 7.86875C1.27188 6.70625 1.04063 4.50625 2.64063 3.15937C3.85625 2.1375 5.73125 2.29062 6.90625 3.4875L8 4.60312L9.09375 3.4875C10.275 2.28437 12.15 2.1375 13.3594 3.15625C14.9563 4.50312 14.7188 6.71562 13.5875 7.86875Z"/></svg> */}
                    
                        {/* <FaRegHeart /> */}
                    {/* </button> */}
                    <button onClick={onHandleHeart}>
                        {/* Conditionally render heart images based on `heart` state */}
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
                    {gig.owner && gig.owner.imgUrl && <img className="gig-preview__owner-img" src={gig.owner.imgUrl} alt="Owner" />}
                    <div className="gig-preview__owner">
                        <Link className="gig-preview__owner-name" to={`/user/${gig.owner?._id}`}>{gig.owner?.fullname}</Link>
                        <div className="gig-preview__owner-level-container">
                            <span className="gig-preview__owner-level">
                                Level {2} {/* You can replace the hardcoded value with actual data */}
                                {renderLevelStars(2)} {/* Placeholder for level */}
                            </span>
                        </div>
                    </div>
                </div>

                <Link className="gig-preview__title" to={`/gig/${gig._id}`}>
                    <div className="gig-preview__long-txt">
                        <span>{getTxtToShow(gig.title, 55)}</span>
                    </div>
                </Link>

                <div className="gig-preview__rate">
                    <svg width="15" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z" />
                    </svg>
                    <div className="gig-preview__rate-num">{gig.owner?.rate}.0</div>
                    {/* <div className="gig-preview__ratings-count">({gig.owner?.ratingsCount})</div> */}
                    <div className="gig-preview__ratings-count">(64)</div>
                </div>

                <Link className="gig-preview__price" to={`/gig/${gig._id}`}>
                    <span className="gig-preview__price-margin">
                        From ${gig.price.toFixed(2)}
                    </span>
                </Link>
            </div>
        </div>
    )
}
