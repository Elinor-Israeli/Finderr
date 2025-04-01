import { gigService } from "../../services/gig/gig.service.remote"
import { GigActionTypes, GigState, SetGigsAction, SetUserGigsAction, RemoveGigAction, AddGigAction, UpdateGigAction, SetFilterAction } from '../../types/Gig'
import {SET_GIGS, SET_USER_GIGS, REMOVE_GIG, ADD_GIG, UPDATE_GIG, SET_FILTER } from '../../types/Gig'

const initialState = {
    gigs: [],
    userGigs: [],
    lastRemovedGig: null,
    filterBy: gigService.getDefaultFilter(),
}

export function gigReducer(
    state: GigState = initialState,
    action: GigActionTypes
): GigState {
    switch (action.type) {
        case SET_GIGS:
            const SetGigsAction = action as SetGigsAction
            return { ...state, gigs: SetGigsAction.gigs }

        case SET_USER_GIGS:
            const SetUserGigsAction = action as SetUserGigsAction
            return { ...state, userGigs: SetUserGigsAction.userGigs }

        case REMOVE_GIG: {
            const SetRemoveGigAction = action as RemoveGigAction
            const lastRemovedGig = state.gigs.find(gig => gig._id === SetRemoveGigAction.gigId)
            const gigs = state.gigs.filter(gig => gig._id !== SetRemoveGigAction.gigId)
            return { ...state, gigs, lastRemovedGig }
        }
        case ADD_GIG:
            const SetAddGigAction = action as AddGigAction
            return { ...state, gigs: [...state.gigs, SetAddGigAction.gig] }

        case UPDATE_GIG: {
            const SetUpdateGigAction = action as UpdateGigAction
            const gigs = state.gigs.map(gig => (gig._id === SetUpdateGigAction.gig._id) ? SetUpdateGigAction.gig : gig)
            return { ...state, gigs }

        }
        case SET_FILTER:
            const FilterAction = action as SetFilterAction
            return { ...state, filterBy: FilterAction.filterBy }

        default:
            return state
    }
}
