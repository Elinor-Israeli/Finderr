import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUserGigs, removeGig } from '../store/actions/gig.actions'
import { UserGigList } from '../cmps/user/UserGigList'
import { UserProfile } from './UserProfile'
import { loadUser } from '../store/user/user.actions'
import { userService } from '../services/user/user.service.remote'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { Loader } from '../cmps/Loader'

export function UserIndex() {
    const loggedinUser = useSelector(storeState => storeState.userModule.user)
    const gigs = useSelector(storeState => storeState.gigModule.userGigs)
    const { userId } = useParams()
    const [, setTime] = useState('')
    const [user, setUser] = useState()

    useEffect(() => {
        if (loggedinUser._id === userId) {
            loadUser(userId)
            loadUserGigs(userId)
        }
    }, [userId, loggedinUser])

    useEffect(() => {
        async function fetchData() {
            const userInfo = await userService.getById(userId)
            setUser(userInfo)
        }
        if (loggedinUser._id !== userId) {
            fetchData()
        }
    }, [userId, loggedinUser])

    const displayedUser = loggedinUser._id === userId ?  loggedinUser : user
    console.log('displayedUser', displayedUser)
    console.log('loggedinUser', loggedinUser);
    console.log('user', user);

    useEffect(() => {
        const updateTime = () => {
            const currentDate = new Date()
            const hours = currentDate.getHours()
            const minutes = currentDate.getMinutes()
            const AmPm = hours >= 12 ? 'PM' : 'AM'
            const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${AmPm} local time`
            setTime(formattedTime)
        }

        updateTime()
        const intervalId = setInterval(updateTime, 60000)
        return () => clearInterval(intervalId)
    }, [])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
            loadUserGigs(userId)

        } catch (err) {
            console.error('Failed to remove gig:', err)
            showErrorMsg('Cannot remove gig')
        }
    }

    if (!displayedUser) return <div className="loader-container">
        <Loader src="https://fiverr-res.cloudinary.com/app_assets/fiverr_logo_loader.svg" alt="Thumbnail not available" />
    </div>

    return (
        <section className="user-index">
            <aside className="user-info">
                <UserProfile user={displayedUser} />
                {loggedinUser._id === userId && gigs && <UserGigList gigs={gigs} onRemoveGig={onRemoveGig} user={displayedUser} />}
            </aside>
        </section>
    )
}