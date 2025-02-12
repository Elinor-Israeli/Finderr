import { httpService } from '../http.service'

export const gigService = {
    query,
    getById,
    add,
    update,
    remove,
    getEmptyGig,
    getDefaultFilter,
    getGigSelling,
    getGigSlides,
    addGigMsg,
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

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
    return savedMsg
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


function getGigSlides() {
    return [
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png",
            // url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_2.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png',
            desc: 'Development',
            category: 'Website'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png",
            desc: "\u200B",
            category: 'Logo Design'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png",
            desc: "\u200B",
            category: 'SEO'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png",
            desc: 'Interlor Design',
            category: 'Architecture &'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/social-media-marketing.png",
            desc: 'Marketing',
            category: 'Social Media'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156479/voice-over.png",
            desc: "\u200B",
            category: 'Voice Over'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/ece24f7f595e2dd44b26567705d1c600-1728279781879/UGC%20Video%20img.png",
            desc: "\u200B",
            category: 'UGC Videos'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png",
            desc: 'Development',
            category: 'Software'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156495/data-science.png",
            desc: 'Data Sclence &',
            category: 'ML'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156481/product-photography.png",
            desc: 'Photography',
            category: 'Product'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156474/e-commerce.png",
            desc: 'Marketing',
            category: 'E-Commerce'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/video-editing.png",
            desc: "\u200B",
            category: 'Video Editing'
        }
    ]
}

function getGigSelling() {
    return [
        {
            title: 'Dedicated hiring experts',
            desc: 'Count on an account manager to find you the right talent and see to your project’s every need.'
        },
        {
            title: 'Satisfaction guarantee',
            desc: 'Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.'
        },
        {
            title: 'Advanced management tools',
            desc: 'Seamlessly integrate freelancers into your team and projects.'
        },
        {
            title: 'Flexible payment models',
            desc: 'Pay per project or opt for hourly rates to facilitate longer-term collaboration.'
        }
    ]
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

