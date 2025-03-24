import { httpService } from '../http.service'

export const gigService = {
    query,
    getById,
    add,
    update,
    remove,
    getEmptyGig,
    getDefaultFilter,
    toggleWishlist
}
window.cs = gigService

function getDefaultFilter() {
    return { categories: [], daysToMake: '', minPrice: '', maxPrice: '' , userId:'' }
}

async function query(filterBy = getDefaultFilter()) {
    return httpService.get(`gig`, filterBy)
}

function getById(gigId) {
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    return httpService.delete(`gig/${gigId}`)
}

async function add(gig) {
    var addedGig
    addedGig = await httpService.post('gig', gig)
    return addedGig
}

async function update(gig) {
    var updatedGig
    updatedGig = await httpService.put(`gig/${gig._id}`, gig)
    return updatedGig
}

async function toggleWishlist(gigId) {
    try {
        const gig = { gigId }
        const response = await httpService.put('gig/wishlist', gig)

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

