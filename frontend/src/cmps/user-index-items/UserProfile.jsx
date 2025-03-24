import { useState, useEffect } from 'react'
import { IoLocationOutline } from "react-icons/io5"
import { updateUser } from '../../store/actions/user.actions'
import { userService } from '../../services/user/user.service.remote'
import { uploadService } from '../../services/upload.service'

export function UserProfile({ user }) {

  const loginUser = userService.getLoggedinUser()
  const [aboutMe, setAboutMe] = useState('')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.imgUrl || '')
  const [fileName,] = useState('')

  const isSameUser = user._id === loginUser?._id

  useEffect(() => {
    setProfileImage(user?.imgUrl || '')
  }, [user])

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

  async function onImageChange(event) {
    const file = event.target.files[0]
    if (!file) return

    try {
      const { secure_url } = await uploadService.uploadImg(event)

      setProfileImage(secure_url)

    } catch (error) {
      console.error('Error uploading image:', error)
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
      console.log('close');

    } catch (err) {
      console.error("Error updating user image:", err)
    }
  }

  return (
    <div className="user-profile">
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
            {!isSameUser && (
              <>
                <img src={user?.imgUrl} alt="profile" />
              </>
            )}
          </div>
          <div style={{ marginLeft: '20px', fontFamily: 'Macan' }}>
            <h2 style={{ fontSize: '30px', color: '#222325' }}>{user?.username}</h2>
            <div style={{ marginTop: '1rem', fontSize: '20px' }}>Level {user.level} </div>
            <div style={{ marginTop: '1rem', fontSize: '20px' }}>{user.aboutMe}</div>

            <div className=" location-dot" style={{ display: 'flex', marginTop: '1rem' }}>
              <span><IoLocationOutline /></span>
              <span style={{ marginRight: '20px' }}>America</span>

            </div>
          </div>
          {isSameUser && (
            <div className='info-profile-details'>
              <button className='edit-profile-btn' onClick={toggleEditProfile}>Edit Profile</button>
            </div>
          )
          }
        </div>

        {isEditingProfile && (
          <div className="edit-profile-modal">
            <div className='modal-overlay-profile'>
              <div className="modal-content-profile">
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
          </div>
        )}

        {isEditingImage && (
          <div className="edit-image-modal">
            <div className='modal-overlay-profile'>
              <div className="modal-content-profile">
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
            </div>
        )}
          </>
    </div>
      )
}