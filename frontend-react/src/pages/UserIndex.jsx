import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadGigs, removeGig  } from '../store/actions/gig.actions' 
import { loadOrders } from '../store/actions/order.actions'
import { UserList } from '../cmps/user/UserList'
import { UserProfile } from './UserProfile'
import { loadWatchedUser } from '../store/user/user.actions'
import { ReviewList } from '../cmps/review/ReviewList' 
import { ReviewBar } from '../cmps/review/ReviewBar' 

import { userService } from '../services/user/user.service.local'
import { showSuccessMsg, showErrorMsg  } from '../services/event-bus.service'
import UserSellerTable from '../cmps/user/UserSellerTable'

export function UserIndex() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const watchedUser = useSelector(storeState => storeState.userModule.watchedUser)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.gigModule.sortBy)
    const { userId } = useParams()
    const loginUser = userService.getLoggedinUser()

    console.log(watchedUser)
    

    useEffect(() => {
        userId && loadWatchedUser(userId)
        loadOrders()
        loadGigs(filterBy, sortBy, userId)
    }, [filterBy, userId])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    if (!userId) return <div className="loader-container">
        <div className="loader"></div>
    </div>
    return (
        <section className="user-index">
            <aside className="user-info">
                <UserProfile watchedUser={watchedUser} />
                <div className="user-review-bar">{watchedUser && watchedUser.reviews && <ReviewBar userReviews={watchedUser.reviews} />}</div>
                {/* {watchedUser && gigs && <UserList gigs={gigs.filter(gig => gig.owner._id === userId)} onRemoveGig={onRemoveGig} user={watchedUser} />} */}

                {/* {watchedUser && gigs && Array.isArray(gigs) && gigs.length > 0 && (
                    <UserList
                        gigs={gigs.filter(gig => gig.owner._id === userId)}
                        onRemoveGig={onRemoveGig}
                        user={watchedUser}
                    />
                )} */}

                {watchedUser && watchedUser.reviews && <ReviewList userReviews={watchedUser.reviews} />}
            </aside>
            <main className="user-main">
                {loginUser?._id === userId && orders.filter(order => order.seller._id === loginUser._id).length !== 0 && loginUser && <UserSellerTable
                    orders={orders.filter(order => order.seller._id === loginUser._id)} length={120} />}
            </main>
        </section>
    )
}