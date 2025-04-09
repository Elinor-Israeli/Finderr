import { httpService } from '../http.service'
import { Gig } from '../../types/Gig'

export const gigService = {
    query,
    getById,
    add,
    update,
    remove,
    getEmptyGig,
    getDefaultFilter,
    toggleWishlist,
    getWishlistGigs
}

function getDefaultFilter() {
    return { categories: [], daysToMake: '', minPrice: '', maxPrice: '' , userId:'' }
}

async function query(filterBy = getDefaultFilter()): Promise<Gig[]> {
    return httpService.get(`gig`, filterBy)
}

function getById(gigId: string) {
    return httpService.get(`gig/${gigId}`)
}

async function getWishlistGigs(userId: string): Promise<Gig[]> {
    return httpService.get(`gig/wishlist/${userId}`)
}

async function remove(gigId: string) {
    return httpService.delete(`gig/${gigId}`)
}

async function add(gig:Gig) {
    var addedGig
    addedGig = await httpService.post('gig', gig)
    return addedGig
}

async function update(gig:Gig) {
    var updatedGig
    updatedGig = await httpService.put(`gig/${gig._id}`, gig)
    return updatedGig
}

async function toggleWishlist(gigId: string): Promise<Gig> {
    try {
        const gig = { gigId }
        const response: Gig = await httpService.put<Gig>('gig/wishlist', gig) 
        return response
    } catch (error) {
        console.error('Failed to update wishlist', error)
        throw new Error('Failed to update wishlist')
    }
}


function getEmptyGig(
    title = '',
    description = '',
    price = 30,
    tags = [],
    daysToMake = 1,
    imgUrl = [],
    about = "I have many hobbies :) I love creativity and enjoy helping others.",
    wishList = [],
    chat = [],
) {
    return {
        title,
        description,
        price,
        tags,
        daysToMake,
        imgUrl,
        about,
        wishList,
        chat
    }
}

