import { store } from '../store'
import { ADD_GIG, REMOVE_GIG, SET_GIGS, UPDATE_GIG } from '../reducers/gig.reducer'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { gigService } from '../../services/gig/gig.service.remote'

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

export async function loadGigs(filterBy) {
    store.dispatch({ type: LOADING_START })
    try {
        const gigs = await gigService.query(filterBy)
        store.dispatch({ type: SET_GIGS, gigs })
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
        const addedGig = await gigService.add(gig)
        console.log('Added Gig', addedGig)
        store.dispatch(getActionAddGig(addedGig))
        return addedGig
    } catch (err) {
        console.log('Cannot add gig', err)
        throw err
    }
}

export async function updateGig(gig) {
    try {
        const updatedGig = await gigService.update(gig)
        console.log('Updated Gig action store:', updatedGig)
        store.dispatch(getActionUpdateGig(updatedGig))
        return updatedGig
    } catch (err) {
        console.log('Cannot save gig', err)
        throw err
    }
}

export async function addAndRemoveToWishlist(gigId) {
    try {
        const updatedGig = await gigService.toggleWishlist(gigId)

        console.log('Updated Gig after wishlist toggle:', updatedGig)
        store.dispatch(getActionUpdateGig(updatedGig))

        return updatedGig
    } catch (err) {
        console.log('Cannot toggle wishlist', err)
        throw err
    }
}
