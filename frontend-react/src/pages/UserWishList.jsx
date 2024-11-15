import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { GigPreview } from '../cmps/gig/GigPreview'
import { loadGigs } from '../store/actions/gig.actions' 

function UserWishList() {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.user)
  let gigs = useSelector(storeState => storeState.gigModule.gigs)

  useEffect(() => {
    if (user) loadGigs()
    else navigate("/gig")
  }, [user])

  return <div className="wish-list">
    <h1>My wish list</h1>

    <ul className="gig-list">
      {user && gigs.filter(gig => gig.wishList.includes(user._id)).map(gig =>
        <li className="gig-preview" key={gig._id}>
          <GigPreview gig={gig} />
        </li>)}
    </ul>
    {user && gigs.filter(gig => gig.wishList.includes(user._id)).length === 0 && <h2>Your wish list is empty</h2>}

  </div>

}

export default UserWishList