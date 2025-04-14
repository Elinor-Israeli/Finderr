import  { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { GigPreview } from '../cmps/GigPreview'
import { loadWishListGigs } from '../store/actions/gig.actions'

export function UserWishList() {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.user)
  const wishlistGigs = useSelector((storeState) => storeState.gigModule.wishlistGigs)
  
  useEffect(() => {
    if (user) {
      loadWishListGigs()
    } else {
      navigate("/gig")
    }
  }, [user, navigate]) 
 
  return (
    <div className="wish-list">
      <h1 style={{marginTop:'23px'}}>My list</h1>
      <p style={{marginTop:'23px', fontSize:'1.4rem'}}>Organize your go-to freelancers and favorite services into </p>
      <p style={{marginTop:'-13px', fontSize:'1.4rem'}}>custom lists you can easily access and share with your team.</p>
      <h3 style={{marginTop: '10px', fontSize: '1.2rem'}}>
        You have {wishlistGigs?.length} {wishlistGigs?.length === 1 ? 'gig' : 'gigs'} in your wishlist.
      </h3>
      <ul className="gig-list">
        {wishlistGigs?.length > 0 ? (
          wishlistGigs.map((wishListGig) => (
            <li className="gig-preview" key={wishListGig._id}>
              <GigPreview gig={wishListGig} />
            </li>
          ))
        ) : (
          <h2>Your wish list is empty</h2>
        )}
      </ul>
    </div>
  )
}

