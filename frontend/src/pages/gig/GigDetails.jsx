import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { gigService } from '../../services/gig/gig.service.remote'
import { showErrorMsg } from '../../services/event-bus.service'
import { SlideDetails } from '../../cmps/slide/SlideDetails'
import { GigCard } from '../../cmps/gig/GigCard'
import { GigBreadcrumbs } from '../../cmps/GigBreadcrumbs'
import { UserInfo } from '../../cmps/user/UserInfo'
import {PricingTable }from '../../cmps/PricingTable'
import { Loader } from '../../cmps/Loader'


export function GigDetails() {
    const { gigId } = useParams()
    const navigate = useNavigate()
    const [gig, setGig] = useState()

    useEffect(() => {
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
    
        loadGig()
    }, [gigId, navigate ])

    
    if (!gig) return <div className="gig-details">
         <Loader src="https://fiverr-res.cloudinary.com/app_assets/fiverr_logo_loader.svg" alt="Loading..." />
    </div>
    gig.owner || {}

    return <section className="gig-details">
        <div className="gig-details-container">
            <div className="left">
                <GigBreadcrumbs categories={gig.tags} />
                <h1 className='gig-details-title'>{gig.title}</h1>
                <UserInfo user_id={gig.owner_id} compact={true} />
                <div className="thumbnail">
                    <SlideDetails gig={gig} />
                </div>

                <div className="gig-about">
                    <h3 className='about-gig-header'>About This Gig</h3>
                    <p>{gig.description}</p>
                    
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
                <UserInfo user_id={gig.owner_id} compact={false} />
                <div style={{ padding: '24px 0 0', fontFamily: 'Macan', fontSize: '16px' }}>
                    <div className="owner-description">
                        <ul>
                            <li><strong><span>From</span></strong><span>{gig.country}</span></li>
                            <li><strong><span>Member since</span></strong><span>userOrders</span></li>
                            <li><strong><span>Avg. response time</span></strong><span>5 hours</span></li>
                            <li><strong><span>Last delivery</span></strong><span>about 1 hour</span></li>
                            <li><strong><span>Languages</span></strong><span>{gig.Languages}</span></li>
                        </ul>
                        <p>
                           {gig.title} Order now!
                        </p>
                    </div>
                    <div>
                        <PricingTable gig={gig} />
                    </div>
                </div>
            </div>
            <div className="right">
                <GigCard gig={gig} />
            </div>
        </div>
    </section>
}