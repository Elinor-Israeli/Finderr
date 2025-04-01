import { store } from '../store'
import {  SET_USER, UPDATE_USER } from '../../types/User'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { userService } from '../../services/user/user.service.remote'
import { showErrorMsg } from '../../services/event-bus.service' 
import { socketService } from '../../services/socket.service'


export async function updateUser(user) {
    try {
        await userService.update(user)
        store.dispatch({ type: UPDATE_USER, user })

    }
    catch (err) {
        console.log("UserActions: cannot update the user ", err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    store.dispatch({type: LOADING_START})

    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

