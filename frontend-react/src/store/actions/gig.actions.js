import { store } from '../store'
import { ADD_GIG, REMOVE_GIG, SET_GIGS, UPDATE_GIG  } from '../reducers/gig.reducer'
import { LOADING_DONE,LOADING_START } from '../reducers/system.reducer'
import { gigService } from '../../services/gig/gig.service.local' 
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service'

export function getActionRemoveGig(gigId) {
    return {
        type: REMOVE_GIG,
        gigId
    }
}
export function getActionAddGig(gig) {
    return {
        type: ADD_GIG,
        gig
    }
}
export function getActionUpdateGig(gig) {
    return {
        type: UPDATE_GIG,
        gig
    }
}

export async function loadGigs(filterBy, sortBy, userId) {
    try {
        store.dispatch({ type: LOADING_START })
        const gigs = await gigService.query(filterBy, sortBy, userId)
        store.dispatch({ type: SET_GIGS, gigs })
    } catch (err) {
        console.log('Cannot load gigs', err)
        throw err
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeGig(gigId) {
    try {
        await gigService.remove(gigId)
        store.dispatch(getActionRemoveGig(gigId))
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
    }
}

export async function addGig(gig) {
    try {
        const savedGig = await gigService.save(gig)
        console.log('Added Gig', savedGig)
        store.dispatch(getActionAddGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot add gig', err)
        throw err
    }
}

export async function updateGig(gig) {
    try {
        const savedGig = await gigService.save(gig)
        console.log('Updated Gig action store:', savedGig)
        store.dispatch(getActionUpdateGig(savedGig))
        return savedGig
    } catch (err) {
        console.log('Cannot save gig', err)
        throw err
    }
}
