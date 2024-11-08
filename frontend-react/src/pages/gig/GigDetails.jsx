import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { gigService } from '../../services/gig/gig.service.local'
import { showErrorMsg } from '../../services/event-bus.service'
// import { GigProgram } from '../../cmps/gig/gig-program'

import { SlideDetails } from '../../cmps/slide/slide-details'
// import { ReviewIndex } from '../../cmps/review/review-index'


export function GigDetails() {
    const { gigId } = useParams()
    const navigate = useNavigate()
    const [gig, setGig] = useState()

    useEffect(() => {
        loadGig()
    }, [gigId])

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

    if (!gig) return <div className="loader-container">
        <div className="loader"></div>
    </div>

    const { imgUrl, fullname, rate, level, country } = gig.owner
    return <section className="gig-details">
        <div className="gig-details-preview gig-details-info">
            <nav>{`🏠 /Graphics & design / Logo Design`}</nav>
            <h1>{gig.title}</h1>
            <div className="owner-details">
                <img src={imgUrl} alt="user-img" />
                <p>{fullname}</p>
                <p>{level}</p>
                <span className="divider"></span>

                {/* <div className="star-preview">
                    <StarRating value={rate} />
                    <span className="rate padding">{rate}</span>
                </div> */}
            </div>
            <SlideDetails gig={gig} />
        </div>

        <div className="gig-description gig-details-info">
            <div className="gig-about">
                <h3>About This Gig</h3>
                <p>{gig.description}</p>
            </div>
            <div className="gig-about-owner">
                <h3>About The Seller</h3>
                <div className="owner-details">
                    <img src={imgUrl} alt="user-img" />
                    <div className="owner-content">
                        <p className="owner-fullname">{fullname}</p>
                        {/* <div className="star-preview">
                            <StarRating value={rate} />
                            <span className="rate padding">{rate}</span>
                        </div> */}
                        {gig && <button><Link to={`/user/${gig.owner._id}`}>Contact Me</Link></button>}
                    </div>
                </div>
            </div>

            <div className="owner-description">
                <ul>
                    <li><span>From</span><span>{country}</span></li>
                    <li><span>Member since</span><span>Oct 2012</span></li>
                    <li><span>Avg. response time</span><span>5 hours</span></li>
                    <li><span>Last delivery</span><span>about 1 hour</span></li>
                    <li><span>Languages</span><span>English</span></li>
                </ul>
                <article>{gig.about}</article>
            </div>
            {/* <ReviewIndex gig={gig} />
            {isChat && <GigChat gig={gig} onSetChat={onSetChat} />} */}
     <div className="gig-about">
                <h3>About This Gig</h3>
                <p>{gig.description}</p>
            </div>
        </div>
        {/* <GigProgram gig={gig} onSetChat={onSetChat} /> */}
    </section >
}