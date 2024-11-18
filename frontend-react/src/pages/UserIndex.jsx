import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FaTelegramPlane } from "react-icons/fa";

import { loadGigs, removeGig } from '../store/actions/gig.actions'
import { loadOrders } from '../store/actions/order.actions'
import { UserList } from '../cmps/user/UserList'
import { UserProfile } from './UserProfile'
import { loadWatchedUser } from '../store/user/user.actions'
import { ReviewList } from '../cmps/review/ReviewList'
import { ReviewBar } from '../cmps/review/ReviewBar'

import { userService } from '../services/user/user.service.local'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import UserSellerTable from '../cmps/user/UserSellerTable'

export function UserIndex() {
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const watchedUser = useSelector(storeState => storeState.userModule.watchedUser)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.gigModule.sortBy)
    const { userId } = useParams()
    const loginUser = userService.getLoggedinUser()
    const [time, setTime] = useState('')

    const [user, setUser] = useState(null)

    useEffect(() => {
        userId && loadWatchedUser(userId)
        loadOrders()
        loadUser()
        loadGigs(filterBy, sortBy, userId)
    }, [filterBy, userId])

    useEffect(() => {
        // Function to update time
        const updateTime = () => {
            const currentDate = new Date()
            const hours = currentDate.getHours()
            const minutes = currentDate.getMinutes()
            const ampm = hours >= 12 ? 'PM' : 'AM'
            const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm} local time`
            setTime(formattedTime)
        }

        updateTime()

        const intervalId = setInterval(updateTime, 60000)

        return () => clearInterval(intervalId)
    }, [])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
        } catch (err) {
            console.log('user =>', err)
        }
    }

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    if (!user) return <div className="loader-container">
        <div className="loader"></div>
    </div>
    return (
        <section className="user-index">
            <aside className="user-info">
                <UserProfile watchedUser={watchedUser} />
                <div className="user-review-bar">{watchedUser && watchedUser.reviews && <ReviewBar userReviews={watchedUser.reviews} />}</div>
                {watchedUser && gigs && <UserList gigs={gigs.filter(gig => gig.owner_id === userId)} onRemoveGig={onRemoveGig} user={watchedUser} />}

                {watchedUser && watchedUser.reviews && <ReviewList userReviews={watchedUser.reviews} />}
            </aside>
            <main className="user-main">
                <div className="card-user">
                    <div className="card-header">
                        <img src={watchedUser?.imgUrl}></img>

                        <div>
                            <div>
                                <h3 className="username">{watchedUser?.username}</h3>
                            </div>
                            <span className="status"> Offline • {time}</span>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="offer-info">
                            <span className="offer-label">Offers hourly rates</span>
                        </div>
                        <div className="consultation-info">
                            <button className="consultation-btn"><FaTelegramPlane />
                                Contact me</button>
                            <p className="response-time">Average response time: 1 hour</p>
                        </div>
                    </div>
                </div>
                {<UserSellerTable
                    orders={orders.filter(order => order.seller._id === loginUser._id)} length={120} />}
            </main>
        </section>
    )
}