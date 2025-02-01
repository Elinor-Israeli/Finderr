import { gigService } from "../../services/gig/gig.service.remote"

export const SET_GIGS = 'SET_GIGS'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const SET_FILTER = 'SET_FILTER'
export const SET_SORT = 'SET_SORT'

const initialState = {
    gigs: [],
    lastRemovedGig: null,
    filterBy: gigService.getDefaultFilter(),

}

export function gigReducer(state = initialState, action) {
    let newState = state
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break
        case REMOVE_GIG: {
            const lastRemovedGig = state.gigs.find(gig => gig._id === action.gigId)
            const gigs = state.gigs.filter(gig => gig._id !== action.gigId)
            newState = { ...state, gigs, lastRemovedGig }
            break
        }
        case ADD_GIG:
            newState = { ...state, gigs: [...state.gigs, action.gig] }
            break
        case UPDATE_GIG: {
            const gigs = state.gigs.map(gig => (gig._id === action.gig._id) ? action.gig : gig)
            newState = { ...state, gigs }
            break
        }
        case SET_FILTER:
            newState = { ...state, filterBy: action.filterBy }
            break
        case SET_SORT:
            newState = { ...state, sortBy: action.sortBy }
            break
        default:
    }
    return newState
}
