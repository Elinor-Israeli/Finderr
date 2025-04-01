import { userService } from "../../services/user/user.service.remote"
import { UpdateUserAction, SetUserAction, UserState, SET_USER, UPDATE_USER  } from '../../types/User'

const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
}

type UserActionTypes = SetUserAction | UpdateUserAction

export function userReducer(
    state: UserState = initialState,
    action: UserActionTypes
): UserState {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }

        case UPDATE_USER:
            return { ...state, user: { ...action.user } }

        default:
            return state
    }
}
