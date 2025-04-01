import { store } from '../store'
import { ADD_GIG, REMOVE_GIG, SET_GIGS,SET_USER_GIGS, UPDATE_GIG, Gig, FilterBy } from '../../types/Gig'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { gigService } from '../../services/gig/gig.service.remote'

export function getActionRemoveGig(gigId:string) {
    return {
        type: REMOVE_GIG,
        gigId
    }
}

export function getActionAddGig(gig:Gig) {
    return {
        type: ADD_GIG,
        gig
    }
}

export function getActionUpdateGig(gig:Gig) {
    return {
        type: UPDATE_GIG,
        gig
    }
}

export async function loadGigs(filterBy:FilterBy):Promise<void> {
    store.dispatch({ type: LOADING_START })
    try {
        const gigs = await gigService.query(filterBy)
        store.dispatch({ type: SET_GIGS, gigs })
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeGig(gigId:string):Promise<void> {
    try {
        await gigService.remove(gigId)
        store.dispatch(getActionRemoveGig(gigId))
    } catch (err) {
        console.log('Cannot remove gig', err)
        throw err
    }
}

export async function loadUserGigs(userId:string):Promise<void> {

    store.dispatch({ type: LOADING_START })

    try {
        
        let userGigs = await gigService.query({ userId })
        
        store.dispatch({ type: SET_USER_GIGS, userGigs })

    } catch (err) {
        console.log('Error loading user gigs:', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function addGig(gig:Gig):Promise<void> {
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

export async function updateGig(gig:Gig):Promise<void> {
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

export async function addAndRemoveToWishlist(gigId:string):Promise<void> {
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

  