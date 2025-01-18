// // // import { Link } from 'react-router-dom'
// // // import { GigPreview } from '../gig/GigPreview'
// // // import { userService } from '../../services/user/user.service.remote'

// // // export function UserList({ gigs, onRemoveGig, user }) {
// // //   const loginUser = userService.getLoggedinUser()

// // //   return <div >
// // //     {loginUser && (loginUser._id === user._id) && <div className="gig-add-btn">
// // //       <Link to="/gig/edit">
// // //         <span className="plus"></span>
// // //         <span className="gig-add-btn">Add Gig</span>
// // //       </Link>
// // //     </div>}
// // //     {gigs.map(gig =>
// // //       <div className="gig-preview user-gig-list" key={gig._id}>
// // //         <GigPreview gig={gig} />
// // //         {user && loginUser && (loginUser._id === user._id) && <div className="user-preview-btns">
// // //           <button className="gig-edit-btn-left" onClick={() => { onRemoveGig(gig._id) }}></button>
// // //           <Link className="gig-edit-btn-right" to={`/gig/edit/${gig._id}`}></Link>
// // //         </div>}
// // //       </div>)
// // //     }
// // //   </div>
// // // }

// // import { Link } from 'react-router-dom'
// // import { GigPreview } from '../gig/GigPreview'
// // import { userService } from '../../services/user/user.service.remote'

// // export function UserList({ gigs, onRemoveGig, user }) {
// //   const loginUser = userService.getLoggedinUser()

// //   // Check for logged in user and if the user matches
// //   const isLoggedInUser = loginUser && loginUser._id === user?._id

// //   return (
// //     <div>
// //       {/* Add Gig Button for the logged-in user */}
// //       {isLoggedInUser && (
// //         <div className="gig-add-btn">
// //           <Link to="/gig/edit">
// //             <span className="plus"></span>
// //             <span>Add Gig</span>
// //           </Link>
// //         </div>
// //       )}

// //       {/* Map over gigs and display them */}
// //       {gigs.map(gig => (
// //         <div className="gig-preview user-gig-list" key={gig._id}>
// //           <GigPreview gig={gig} />

// //           {/* Show edit and remove buttons for the logged-in user */}
// //           {isLoggedInUser && (
// //             <div className="user-preview-btns">
// //               <button className="gig-edit-btn-left" onClick={() => onRemoveGig(gig._id)}>
// //                 Remove
// //               </button>
// //               <Link className="gig-edit-btn-right" to={`/gig/edit/${gig._id}`}>
// //                 Edit
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }
// import { Link } from 'react-router-dom'
// import { GigPreview } from '../gig/GigPreview'
// import { userService } from '../../services/user/user.service.remote'

// export function UserList({ gigs, onRemoveGig, user }) {
//   const loginUser = userService.getLoggedinUser()

//   // Check for logged-in user and if the user matches
//   const isLoggedInUser = loginUser && loginUser._id === user?._id

//   return (
//     <div>
//       {/* Add Gig Button for the logged-in user */}
//       {isLoggedInUser && (
//         <div className="gig-add-btn">
//           <Link to="/gig/edit">
//             <span className="plus"></span>
//             <span>Add Gig</span>
//           </Link>
//         </div>
//       )}

//       {/* Container for Gig previews */}
//       <div className="user-gig-list-container">
//         {/* Map over gigs and display them */}
//         {gigs.map(gig => (
//           <div className="gig-preview" key={gig._id}>
//             <GigPreview gig={gig} />
            
//             {/* Show edit and remove buttons for the logged-in user */}
//             {isLoggedInUser && (
//               <div className="user-preview-btns">
//                 <button className="gig-edit-btn-left" onClick={() => onRemoveGig(gig._id)}>
//                   Remove
//                 </button>
//                 <Link className="gig-edit-btn-right" to={`/gig/edit/${gig._id}`}>
//                   Edit
//                 </Link>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
import { Link } from 'react-router-dom'
import { GigPreview } from '../gig/GigPreview'
import { userService } from '../../services/user/user.service.remote'

export function UserList({ gigs, onRemoveGig, user }) {
  const loginUser = userService.getLoggedinUser()

  // Check if the logged-in user is the same as the user viewing the gigs
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
