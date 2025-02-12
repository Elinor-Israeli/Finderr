import { store } from "../store.js"
import { CHANGE_MSG } from './system.reducer.js'

export function changeUserMsg(msg) {
    store.dispatch({ type: CHANGE_MSG, msg })
}