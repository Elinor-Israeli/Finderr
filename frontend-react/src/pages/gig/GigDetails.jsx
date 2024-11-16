import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { gigService } from '../../services/gig/gig.service.local'
import { showErrorMsg } from '../../services/event-bus.service'
import { SlideDetails } from '../../cmps/slide/slide-details'
import { GigCard } from '../../cmps/gig/GigCard'
import { ReviewAll } from '../../cmps/review/ReviewAll'
import { GigBreadcrumbs } from '../../cmps/GigBreadcrumbs'
import { UserInfo } from '../../cmps/user/UserInfo'


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

    return <section className="gig-details">
        <div className="gig-details-container">
            <div className="left">
                <GigBreadcrumbs />
                <h1 className='gig-details-title'>{gig.title}</h1>
                <UserInfo gig={gig} compact={true}/>
                <div className="thumbnail">
                    <SlideDetails gig={gig} />
                </div>

                <div className="gig-about">
                    <h3 className='about-gig-header'>About This Gig</h3>
                    <p>{gig.description}</p>
                    <span>What you'll get:</span>
                    <p>{gig.description2}</p>
                    <span>Why you should hire me :</span>
                </div>
                <div className="gig-about-filter">
                    <ul>
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
                <UserInfo gig={gig} compact={false}/>
                <ReviewAll gig={gig} />
            </div>
            <div className="right">
                <GigCard gig={gig}/>
            </div>
        </div>
    </section>
}