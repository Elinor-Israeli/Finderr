import { Link } from 'react-router-dom'

import { GigPreview } from '../gig/GigPreview'

import { userService } from '../../services/user/user.service.remote'

export function UserList({ gigs, onRemoveGig, user }) {
  const loginUser = userService.getLoggedinUser()

  return <ul className="gig-list user-gig-list">
    {loginUser && (loginUser._id === user._id) && <li className="gig-add-btn">
      <Link to="/gig/edit">
        <span className="plus"></span>
        <span className="gig-add-btn">Add Gig</span>
      </Link>
    </li>}
    {gigs.map(gig =>
      <li className="gig-preview" key={gig._id}>
        <GigPreview gig={gig} />
        {user && loginUser && (loginUser._id === user._id) && <div className="user-preview-btns">
          <button className="gig-edit-btn-left" onClick={() => { onRemoveGig(gig._id) }}></button>
          <Link className="gig-edit-btn-right" to={`/gig/edit/${gig._id}`}></Link>
        </div>}
      </li>)
    }
  </ul>
}