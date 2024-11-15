import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser, updateUser } from '../store/user/user.actions' 
import { ImgUploader } from '../cmps/ImgUploader' 

import { userService } from '../services/user/user.service.local'

export function UserProfile({ watchedUser }) {
  const user = useSelector(storeState => storeState.userModule.user)

  const loginUser = userService.getLoggedinUser()
  const [isSameUser, setIsSameUser] = useState(false)
  const { userId } = useParams()

  useEffect(() => {
    loginUser && loadUser(loginUser._id)
    if (userId === loginUser?._id) setIsSameUser(true)
    else setIsSameUser(false)
  }, [userId])

  function onUploaded(data) {
    const newUser = { ...user, imgUrl: data }
    updateUser(newUser)
  }

  return (
    <div className="user-profile">
      {userId && <>
        <div className="user-profile-info" >
          <div className="img-profile-container">
            {isSameUser && <div className="upload-camera "></div>}
            {isSameUser && <img src={loginUser?.imgUrl}></img>}
            {!isSameUser && <img src={watchedUser?.imgUrl}></img>}

            {isSameUser && <ImgUploader onUploaded={onUploaded} />}
          </div>
          <h2>{watchedUser?.username}</h2>
        </div>

        <ul className="user-stats-desc">
          <li>
            <div><span className="fa-solid location-dot"></span><span>From</span></div>
            <span>America</span>
          </li>
          <li>
            <div><span className="fa-solid user"></span><span>Member since</span></div>
            <span>Oct 2024</span>
          </li>
          <li>
            <div><span className="fa-solid clock"></span><span>Avg. Response Time</span></div>
            <span>5 hour</span>
          </li>
          <li>
            <div><span className="fa-solid paper-plan"></span><span>Last Delivery</span></div>
            <span>1 day</span>
          </li>
        </ul>
      </>}
    </div >
  )
}