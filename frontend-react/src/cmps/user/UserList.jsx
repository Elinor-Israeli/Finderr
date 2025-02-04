import { Link } from 'react-router-dom'
import { GigPreview } from '../gig/GigPreview'
import { userService } from '../../services/user/user.service.remote'

export function UserList({ gigs, onRemoveGig, user }) {
  const loginUser = userService.getLoggedinUser()
  const isLoggedInUser = loginUser && loginUser._id === user?._id

  return (
    <div>
      {/* Show "Add Gig" button for the logged-in user */}
      {isLoggedInUser && (
        <div className="gig-add-btn">
          <Link to="/gig/edit">
            <span className="plus"></span>
            <span>Add Gig</span>
          </Link>
        </div>
      )}

      {/* Container for all Gig previews */}
      <div className="user-gig-list-container">
        {/* Iterate through the gigs */}
        {gigs.map(gig => (
          <div className="gig-preview" key={gig._id}>
            {/* Display Gig preview */}
            <GigPreview gig={gig} />
            
            {/* Show Remove and Edit buttons for the logged-in user */}
            {isLoggedInUser && (
              <div className="user-preview-btns">
                {/* Remove button */}
                <button
                  className="gig-edit-btn-left"
                  onClick={() => onRemoveGig(gig._id)}
                >
                  Remove
                </button>
                {/* Edit button */}
                <Link className="gig-edit-btn-right" to={`/gig/edit/${gig._id}`}>
                  Edit
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
