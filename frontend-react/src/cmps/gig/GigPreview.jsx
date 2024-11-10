import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { FaRegHeart } from "react-icons/fa";
import { TbBrandZoom } from "react-icons/tb";

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateGig } from '../../store/actions/gig.actions'
import { SlideGigPreview } from '../slide/SlideGigPreview'

export function GigPreview({ gig }) {
    const user = useSelector((storeState) => storeState.userModule.user)
    const [heart, setHeart] = useState(false)

    useEffect(() => {
        if (user) {
            if (gig.wishList.includes(user._id)) {
                setHeart(true)
            }
        } else {
            setHeart(false)
        }
    }, [user])

    //* i tell him down ⬇️ in how many words
    function getTxtToShow(txt, length) {
        return (txt.length < length) ? txt : txt.substring(0, length + 1) + '...'
    }

    async function onHandleHeart() {
        try {
            let index = gig.wishList.indexOf(user._id)
            if (index > -1) {
                gig.wishList.splice(index, 1)
                setHeart(false)
            } else {
                gig.wishList.push(user._id)
                setHeart(true)
            }
            await updateGig({ ...gig })
        }
        catch (err) {
            console.log(err)
        }
    }

    const levelNumber = parseInt(gig.owner.level.replace(/\D/g, ''), 10)
    return (
        <>
            <Link to={`/gig/${gig._id}`} className="img-container">
                <SlideGigPreview gig={gig} />
                <div className="btn-container">
                    <button
                        onClick={(ev) => {
                            ev.preventDefault() //* by preventDefault
                            ev.stopPropagation() //* on the heart the link is off
                            onHandleHeart()
                        }}
                        title="save to my list"
                        style={{
                            color: heart ? "#f74040" : "#b5b6ba",
                            transition: "color .6s ease",
                            fontSize: '34px' //* the size of the heart icon 
                        }}
                    >
                        <FaRegHeart />
                    </button>
                </div>
            </Link>
            <div className="content">
                <div className="owner-info">
                    <img src={gig.owner && gig.owner.imgUrl} alt="" />
                    <div className="owner">
                        <Link to={`/user/${gig.owner._id}`}>{gig.owner && gig.owner.fullname}</Link>
                        <p className='owner-level-container'>
                    Level: {levelNumber}
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
                </p>
                    </div>
                    
                </div>
                <Link className="title" to={`/gig/${gig._id}`}>
                    <div className="long-txt">
                        <span>{getTxtToShow(gig.title, 55)}</span>
                    </div>
                </Link>
                <div className="rate">
                    <Box sx={{ '& > legend': { mt: '5px', marginTop: '5px', color: 'black' }, '& .MuiRating-icon': { color: 'black' } }}>
                        <Rating
                            value={gig.owner.rate}
                            name="half-rating-read"
                            size="small"
                            precision={0.5}
                            max={1}
                            readOnly
                        />
                    </Box>
                    <div className='rate-num'>{gig.owner && gig.owner.rate}</div>
                    <div className='ratings-count'>({gig.owner && gig.owner.ratingsCount})</div>
                </div>
                <Link className="price" to={`/gig/${gig._id}`}>
                    <span className='price-margin'>
                        ${gig.price.toFixed(2)}
                        <sup></sup>
                    </span>
                </Link>
                {/* <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <TbBrandZoom />
                    Offers video consultations
                </div> */}
            </div>
        </>
    )
}

