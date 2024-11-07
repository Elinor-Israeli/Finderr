import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

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

    return (
     <>
        <Link to={`/gig/${gig._id}`} className="img-container">
            <SlideGigPreview gig={gig} />
        </Link>

        <div className="content">
            <div className="owner-info">
                <img src={gig.owner && gig.owner.imgUrl} alt="" />
                <div className="owner">
                    <Link to={`/user/${gig.owner._id}`}>{gig.owner && gig.owner.fullname}</Link>
                    {/* <span>{gig.owner && gig.owner.level}</span> */}
                </div>
            </div>
            <Link className="title" to={`/gig/${gig._id}`}>
                <div className="long-txt">
                    <span>{getTxtToShow(gig.title, 60)}</span>
                </div>
            </Link>
            <div className="rate">
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Rating value={gig.owner.rate} name="half-rating-read" size="small"
                        precision={0.5} max={1} readOnly />
                </Box>
                <div>{gig.owner && gig.owner.rate}</div>
                <div className='ratings-count'>({gig.owner && gig.owner.ratingsCount})</div>

            </div>

        </div>

        <footer>
            <div className="btn-container">
                <button onClick={onHandleHeart} className="fa-solid heart" title="save to my list" style={heart ? { color: "#f74040", transition: "color .6s ease" } : { color: "#b5b6ba", transition: "color .6s ease" }}></button>
            </div>
            <Link className="price" to={`/gig/${gig._id}`}>
                {/* <small>Starting at</small> */}
                <span className='price-margin'>
                ${gig.price.toFixed(2)}
                    <sup></sup>
                </span>
            </Link>
        </footer>
    </>
    )
}

