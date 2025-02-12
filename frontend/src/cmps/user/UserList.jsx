import { Link } from 'react-router-dom'
import { GigPreview } from '../gig/GigPreview'
import { userService } from '../../services/user/user.service.remote'

export function UserList({ gigs, onRemoveGig, user }) {
  const loginUser = userService.getLoggedinUser()
  const isLoggedInUser = loginUser && loginUser._id === user?._id

  return (
    <div>
      {isLoggedInUser && (
        <div className="gig-add-btn">
          <Link to="/gig/edit">
            <span className="plus"></span>
            <span>Add Gig</span>
          </Link>
        </div>
      )}

      <div className="user-gig-list-container">
        {gigs.map(gig => (
          <div className="gig-preview" key={gig._id}>
            <GigPreview gig={gig} />
                        {isLoggedInUser && (
              <div className="user-preview-btns">
                <button
                  className="gig-edit-btn-left"
                  onClick={() => onRemoveGig(gig._id)}
                >
                  Remove
                </button>
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
