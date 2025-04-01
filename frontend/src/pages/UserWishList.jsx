import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { GigPreview } from '../cmps/GigPreview'
import { loadGigs } from '../store/actions/gig.actions'

export function UserWishList() {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.user)
  let gigs = useSelector((storeState) => storeState.gigModule.gigs)

  useEffect(() => {
    if (user) {
      loadGigs()
    } else {
      navigate("/gig")
    }
  }, [user, navigate]) 

  const wishListGigs = user
    ? gigs.filter((gig) => gig.wishList && gig.wishList.includes(user._id)) 
    : []

 

  return (
    <div className="wish-list">
      <h1 style={{marginTop:'23px'}}>My list</h1>
      <p style={{marginTop:'23px', fontSize:'1.4rem'}}>Organize your go-to freelancers and favorite services into </p>
      <p style={{marginTop:'-13px', fontSize:'1.4rem'}}>custom lists you can easily access and share with your team.</p>
      <h3 style={{marginTop: '10px', fontSize: '1.2rem'}}>
        You have {wishListGigs.length} {wishListGigs.length === 1 ? 'gig' : 'gigs'} in your wishlist.
      </h3>
      <ul className="gig-list">
        {wishListGigs.length > 0 ? (
          wishListGigs.map((gig) => (
            <li className="gig-preview" key={gig._id}>
              <GigPreview gig={gig} />
            </li>
          ))
        ) : (
          <h2>Your wish list is empty</h2>
        )}
      </ul>
    </div>
  )
}

