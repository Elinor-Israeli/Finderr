import { useState } from "react"
import { useSelector } from "react-redux"

import { addReview } from "../store/actions/review.actions"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ReviewEdit() {
	const users = useSelector(storeState => storeState.userModule.users)
	const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutUserId: '' })

	function handleChange(ev) {
		const { name, value } = ev.target
		setReviewToEdit({ ...reviewToEdit, [name]: value })
	}

    async function onAddReview(ev) {
		ev.preventDefault()
		if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
            
		try {
			await addReview(reviewToEdit)
			showSuccessMsg('Review added')
			setReviewToEdit({ txt: '', aboutUserId: '' })
		} catch (err) {
			showErrorMsg('Cannot add review')
		}
	}

   return <form className="review-edit" onSubmit={onAddReview}>
        <select onChange={handleChange} value={reviewToEdit.aboutUserId} name="aboutUserId">
            <option value="">Review about...</option>
            {users.map(user =>
                <option key={user._id} value={user._id}>
                    {user.fullname}
                </option>
            )}
        </select>
        <textarea name="txt" onChange={handleChange} value={reviewToEdit.txt}></textarea>
        <button>Add</button>
    </form>

}