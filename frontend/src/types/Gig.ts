
export {
    GigActionTypes,
    Gig,
    GigState,
    SetGigsAction,
    SetUserGigsAction,
    RemoveGigAction,
    AddGigAction,
    UpdateGigAction,
    SetFilterAction,
    SetWishListGigsAction,
    FilterBy
} 

export const SET_GIGS = 'SET_GIGS'
export const SET_USER_GIGS = 'SET_USER_GIGS'
export const SET_WISHLIST_GIGS = 'SET_WISHLIST_GIGS'
export const REMOVE_GIG = 'REMOVE_GIG'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'
export const SET_FILTER = 'SET_FILTER'

type Gig = {
    _id: string
    price: number
    title: string
    owner_id: string
    tags: string[]
    aboutMe: string
    wishList: string[]
    daysToMake: number
    imgUrl: string[]
}

interface FilterBy {
    categories: string[]
    daysToMake: string
    minPrice: string
    maxPrice: string
    userId: string
}
interface GigState {
    gigs: Gig[]
    userGigs: Gig[]
    wishlistGigs: Gig[]
    lastRemovedGig: Gig | null
    filterBy: FilterBy
}

interface SetGigsAction {
    type: typeof SET_GIGS
    gigs: Gig[]
}

interface SetWishListGigsAction {
    type: typeof SET_WISHLIST_GIGS
    wishlistGigs: Gig[]
}
interface SetUserGigsAction {
    type: typeof SET_USER_GIGS
    userGigs: Gig[]
}

interface RemoveGigAction {
    type: typeof REMOVE_GIG
    gigId: string
}
interface AddGigAction {
    type: typeof ADD_GIG
    gig: Gig
}
interface UpdateGigAction {
    type: typeof UPDATE_GIG
    gig: Gig
}

interface SetFilterAction {
    type: typeof SET_FILTER
    filterBy: FilterBy
}

type GigActionTypes = 
    | SetGigsAction 
    | SetUserGigsAction 
    | RemoveGigAction 
    | AddGigAction 
    | UpdateGigAction 
    | SetFilterAction
    | SetWishListGigsAction

