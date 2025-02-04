import { useEffect, useState } from 'react'

import { userService } from '../../services/user/user.service.remote' 
import { ReviewList } from './ReviewList'

export function ReviewIndex({ gig }) {
    const [userReviews, setUserReviews] = useState(null)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
   
    useEffect(() => {
        async function loadUserReviews() {
            try {
                const userReviews = await userService.getUserReviews(gig.owner_id)
                setUserReviews(userReviews)
            } catch (err) {
                console.log('userReviews =>', err)
            }
        }
        loadUserReviews()
        const handleResize = () => setIsMobile(window.innerWidth <= 600)
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [gig.owner_id])

    
    if (!userReviews) return <div>loading...</div>
   
    return (
        !isMobile && (
            <section className="review-app">
                <header className="reviews-header">
                    What people loved about this freelancer
                    <div>
                        <a href="#Reviews">See all reviews</a>
                    </div>
                </header>
                <ReviewList userReviews={userReviews.slice(0, 1)} /> 
            </section>
        )
    )
}
