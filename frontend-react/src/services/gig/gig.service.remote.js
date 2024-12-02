import { httpService } from '../http.service' 
// import { userService } from '../user/user.service.remote' 

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    getDefaultFilter,
    getGigSelling,
    getGigSlides,
    addGigMsg

}
window.cs = gigService

function getDefaultFilter() {
    return { title: '', tags: [], daysToMake: '', minPrice: '', maxPrice: '' }
}

async function query(filterBy = getDefaultFilter(), userId = '') {
    return httpService.get(`gig`, { params: { filterBy, userId } })
}

function getById(gigId) {
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    return httpService.delete(`gig/${gigId}`)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await httpService.put(`gig/${gig._id}`, gig)
    } else {
        // gig.owner = userService.getLoggedinUser()
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, {txt})
    return savedMsg
}

function getGigSlides() {
    return [
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_2.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png',
            desc: 'Build your brand',
            category: 'Logo Design'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_2.0/v1/attachments/generic_asset/asset/ae11e2d45410b0eded7fba0e46b09dbd-1598561917003/wordpress-2x.png',
            desc: 'Customize your site',
            category: 'WordPress'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_2.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741669/voiceover-2x.png',
            desc: 'hare your message',
            category: 'Voice Over'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741663/animated-explainer-2x.png',
            desc: 'Engage your audience',
            category: 'Video Explainer'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741667/social-2x.png',
            desc: 'Reach more customers',
            category: 'Social Media'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741668/seo-2x.png',
            desc: 'Unlock growth online',
            category: 'SEO'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/illustration-2x.png',
            desc: 'Color your dreams',
            category: 'Illustration'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741674/translation-2x.png',
            desc: 'Go global',
            category: 'Translation'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741664/data-entry-2x.png',
            desc: 'Learn your business',
            category: 'Data Entry'
        },
        {
            url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_1.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/book-covers-2x.png',
            desc: 'Showcase your story',
            category: 'Book Covers'
        }
    ]
}

function getGigSelling() {
    return [
        {
            title: 'The best for every budget',
            desc: 'Find high-quality services at every price point. No hourly rates, just project-based pricing.'
        },
        {
            title: 'Quality work done quickly',
            desc: 'Find the right freelancer to begin working on your project within minutes.'
        },
        {
            title: 'Protected payments, every time',
            desc: 'Always know what you\'ll pay upfront. Your payment isn\'t released until you approve the work.'
        },
        {
            title: '24/7 support',
            desc: 'Questions? Our round-the-clock support team is available to help anytime, anywhere.'
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
    chat = []
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

