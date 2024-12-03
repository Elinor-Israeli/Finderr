import { useEffect, useState } from 'react'

import { userService } from '../../services/user/user.service.remote' 
import { ReviewList } from './ReviewList'

export function ReviewIndex({ gig }) {
    const [userReviews, setUserReviews] = useState(null)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600)
    // const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
    //* i did here becouse in the scss it did not work somehow
    useEffect(() => {
        loadUserReviews()

        const handleResize = () => setIsMobile(window.innerWidth <= 600)
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    async function loadUserReviews() {
        try {
            const userReviews = await userService.getUserReviews(gig.owner_id)
            setUserReviews(userReviews)
        } catch (err) {
            console.log('userReviews =>', err)
        }
    }

    if (!userReviews) return <div>loading...</div>
    const nextReview = () => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % userReviews.length)
    }

    return (
        // <section className="review-app">
        //     {/* <h3>Reviews</h3> */}
        //     <header className='reviews-header'>
        //     What people loved about this freelancer
        //     <div>
        //         <a href="#">See all reviews</a>
        //     </div>
        //     </header>
        //     <ReviewList userReviews={userReviews} />

        //     </section>
        //     )

        !isMobile && (
            <section className="review-app">
                <header className="reviews-header">
                    What people loved about this freelancer
                    <div>
                        <a href="#Reviews">See all reviews</a>
                    </div>
                </header>
                <ReviewList userReviews={userReviews.slice(0, 1)} /> 
                {/* <button onClick={nextReview} className="next-review-button">Next</button> */}
            </section>
        )
    )
}
