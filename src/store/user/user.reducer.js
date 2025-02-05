import { userService } from "../../services/user/user.service.remote"

export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const UPDATE_USER = 'UPDATE_USER'

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.watchedUser }
            break
        case UPDATE_USER:
            newState = { ...state, user: { ...action.user } }
            break
        default:
    }

    return newState

}
