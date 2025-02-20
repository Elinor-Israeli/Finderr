import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5"
import { loadUser, updateUser } from '../store/user/user.actions'
import { userService } from '../services/user/user.service.remote'

export function UserProfile({ watchedUser }) {
  const user = useSelector(storeState => storeState.userModule.user)
  const loginUser = userService.getLoggedinUser()
  const [isSameUser, setIsSameUser] = useState(false)
  const [aboutMe, setAboutMe] = useState('')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [profileImage, setProfileImage] = useState(watchedUser?.imgUrl || '')
  const [fileName, __] = useState('')
  const { userId } = useParams()

  useEffect(() => {
    if (loginUser && !watchedUser) {
      loadUser(loginUser._id)
    }
    if (userId === loginUser?._id) setIsSameUser(true)
    else setIsSameUser(false)
  }, [loginUser, userId, watchedUser])

  function onAboutMeChange(event) {
    setAboutMe(event.target.value)
  }

  async function onAboutMeSubmit() {
    const updatedAboutMe = aboutMe.trim()
    const updatedUser = {
      ...user,
      aboutMe: updatedAboutMe,
    }

    try {
      await updateUser(updatedUser)
      setIsEditingProfile(false)
      watchedUser.aboutMe = updatedAboutMe
    } catch (err) {
      console.error("Error updating user:", err)
    }
  }

  function toggleEditProfile() {
    setIsEditingProfile(!isEditingProfile)
  }

  function toggleEditImage() {
    setIsEditingImage(!isEditingImage)
  }

  function onImageChange(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onImageSubmit() {
    const updatedUser = {
      ...user,
      imgUrl: profileImage,
    }

    try {
      await updateUser(updatedUser)
      setIsEditingImage(false)
      watchedUser.imgUrl = profileImage 
    } catch (err) {
      console.error("Error updating user image:", err)
    }
  }

  return (
    <div className="user-profile">
      {userId && (
        <>
          <div className="user-profile-info">
            <div className="img-profile-container">
              {isSameUser && (
                <>
                  <img src={profileImage || "default-image-url"} alt="profile" />
                  <button className='camera-btn'
                    onClick={toggleEditImage}
                  > <img className='profile-img'
                    src="https://icons.veryicon.com/png/o/miscellaneous/very-thin-linear-icon/camera-310.png"
                    alt="Camera Icon"
                    />
                  </button>
                </>
              )}
              {!isSameUser && <img src={watchedUser?.imgUrl} alt="profile" />}
            </div>
            <div style={{ marginLeft: '20px' , fontFamily:'Macan'}}>
              <h2 style={{ fontSize: '30px', color: '#222325'}}>{watchedUser?.username}</h2>
              <div style={{ marginTop: '1rem' , fontSize: '20px' }}>Level {watchedUser.level} </div>
              <div  style={{ marginTop: '1rem' , fontSize: '20px'}}>{watchedUser.aboutMe}</div>
             
                  <div className=" location-dot" style={{ display: 'flex', marginTop: '1rem' }}>
                    <span><IoLocationOutline /></span>
                    <span style={{ marginRight: '20px' }}>America</span>
                  
              </div>
            </div>
            <div className='info-profile-details'>
              {isSameUser && <button className='edit-profile-btn' onClick={toggleEditProfile}>Edit Profile</button>}
            </div>
          </div>

          {isEditingProfile && (
            <div className="edit-profile-modal">
              <div className="modal-content">
                <h3 >Edit Profile</h3>
                <div>
                  <textarea
                    value={aboutMe}
                    onChange={onAboutMeChange}
                    style={{ fontSize: '16px', fontFamily: 'Macan', width: '100%', height: '100px', padding: '10px' }}
                  />
                </div>
                <button onClick={onAboutMeSubmit} style={{ marginTop: '10px' }}>Save Changes</button>
                <button onClick={toggleEditProfile} style={{ marginTop: '10px', marginLeft: '10px' }}>Cancel</button>
              </div>
            </div>
          )}

          {isEditingImage && (
            <div className="edit-image-modal">
              <div className="modal-content">
                <h3 style={{ cursor: 'pointer' }}>Change Profile Image</h3>
                <div className='file-upload'>
                  <label style={{ marginTop: '10px' }} htmlFor="file-upload"  >
                    {fileName ? fileName : 'Choose a file'}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={onImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <button onClick={onImageSubmit} >Save Changes</button>
                <button onClick={toggleEditImage} >Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}