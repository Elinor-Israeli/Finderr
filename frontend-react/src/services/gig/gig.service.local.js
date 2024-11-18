import { storageService } from '../async-storage.service'
import { utilService } from '../util.service'
import { userService } from '../user/user.service.local'

const STORAGE_KEY = 'gig'
_createGigs()

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    getDefaultFilter,
    getGigSlides,
    getGigSelling,
    getDefaultSort
}

window.cs = gigService
function getDefaultFilter() {
    return { title: '', tags: [], daysToMake: '', minPrice: '', maxPrice: '' }
}
function getDefaultSort() {
    return { categorySort: 'recommended' }
}

async function query(filterBy = { title: '', tags: [], daysToMake: '' }, sortBy, userId) {
    var gigs = await storageService.query(STORAGE_KEY)
    if (userId) gigs = gigs.filter(gig => gig.owner_id === userId)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }
    if (sortBy.categorySort === 'recommended') {
        gigs.sort((a, b) => b.owner_rate - a.owner_rate)
    }
    if (filterBy.tags?.length) {
        gigs = gigs.filter(gig => gig.tags.some(tag => filterBy.tags.includes(tag)))
    }
    if (filterBy.daysToMake) {
        gigs = gigs.filter(gig => +gig.daysToMake <= +filterBy.daysToMake)
    }
    if (filterBy.minPrice) {
        gigs = gigs.filter(gig => gig.price >= filterBy.minPrice)
    }
    if (filterBy.maxPrice) {
        gigs = gigs.filter(gig => gig.price <= filterBy.maxPrice)
    }
    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await storageService.put(STORAGE_KEY, gig)
    } else {
        // Later, owner is set by the backend
        gig.owner_id = userService.getLoggedinUser()._id
        savedGig = await storageService.post(STORAGE_KEY, gig)
    }
    return savedGig
}

function getGigSlides() {
    return [
        {
            url:"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156477/website-development.png",
            // url: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_305,dpr_2.0/v1/attachments/generic_asset/asset/055f758c1f5b3a1ab38c047dce553860-1598561741678/logo-design-2x.png',
             desc: 'Development',
            category: 'Website'
        },
        {
            url:"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/logo-design.png" ,
            desc: "\u200B",
            category: 'Logo Design'
        },
        {
            url:"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156488/seo.png",
            desc: "\u200B",
            category: 'SEO'
        },
        {
            url:"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156473/architecture-design.png", 
            desc: 'Interlor Design',
            category: 'Architecture &' 
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/social-media-marketing.png",
            desc: 'Marketing',
            category: 'Social Media'
        },
        {
            url:"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156479/voice-over.png", 
            desc: "\u200B",
            category: 'Voice Over'
        },
        {
            url:"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/ece24f7f595e2dd44b26567705d1c600-1728279781879/UGC%20Video%20img.png",
            desc: "\u200B",
            category: 'UGC Videos'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png",
            desc: 'Development',
            category: 'Software'
        },
        {
            url:"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156495/data-science.png",
            desc: 'Data Sclence &',
            category: 'ML'
        },
        {
            url: "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156481/product-photography.png",
            desc: 'Photography',
            category: 'Product'
        },
        {
            url:"https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_1.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156474/e-commerce.png",
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


function _createGigs() {
    let gigs = utilService.loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        gigs = [
            {
                _id: 'i102',
                title: "I will provide a great logo for you",
                title2: "\u200B",
                price: 15,
                owner_id: "u102",
                owner_rate: 4,
                owner: {
                    _id: "u102",
                    fullname: "Boya",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                    level: "level 3",
                    rate: 5
                },
                daysToMake: 2,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123020_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/01/30/18/28/lines-6981892_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123019_960_720.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/378248214/original/99e4871876679239674652a835c72bc80afb937e/create-ai-based-assets-to-enhance-your-brand-or-website.jpg"
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i103',
                title: "I will do elegant professional business logo design services",
                price: 12,
                owner_id: "u102",
                owner_rate: 4,
                owner: {
                    _id: "u102",
                    fullname: "Boya",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                    level: "level 1",
                    rate: 5
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2023/01/10/10/33/path-7709452_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/08/01/18/35/ocean-7358753_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2023/01/05/08/17/bird-7698384_960_720.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/378248214/original/99e4871876679239674652a835c72bc80afb937e/create-ai-based-assets-to-enhance-your-brand-or-website.jpg"

                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i104',
                title: "I will do 3 modern minimalist logo design",
                price: 18,
                owner_id: "u102",
                owner_rate: 4,
                owner: {
                    _id: "u102",
                    fullname: "Boya",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                    level: "level 3",
                    rate: 5
                },
                daysToMake: 1,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/0487fdb70fad4214574ff8cf694e2f87-1729681532/05%20v3/create-ai-based-assets-to-enhance-your-brand-or-website.jpg",
                    "https://cdn.pixabay.com/photo/2022/11/15/04/54/automotive-7593064_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/12/17/19/04/house-7662218_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/05/30/08/57/flowers-7230812_960_720.jpg"
                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i105',
                title: "I will make 6 figure shopify dropshipping store or shopify website",
                price: 10,
                owner_id: "u105",
                owner_rate:4,
                owner: {
                    _id: "u105",
                    fullname: "Jo Bara",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_960_720.jpg',
                    level: "level 3",
                    rate: 5
                },
                daysToMake: 4,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/0487fdb70fad4214574ff8cf694e2f87-1729681532/05%20v3/create-ai-based-assets-to-enhance-your-brand-or-website.jpg",
                    "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758313_960_720.png",
                    "https://cdn.pixabay.com/photo/2015/08/04/19/21/happy-birthday-875122_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758314_960_720.png"
                ],
                tags: [
                    "writing-translation",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i106',
                title: "I will mix and master your music, experienced professional engineer",
                price: 20,
                owner_id: "u106",
                owner_rate:4,
                owner: {
                    _id: "u106",
                    fullname: "Anita Bath",
                    imgUrl: 'https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg',
                    level: "level 3",
                    rate: 1
                },
                daysToMake: 5,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/0487fdb70fad4214574ff8cf694e2f87-1729681532/05%20v3/create-ai-based-assets-to-enhance-your-brand-or-website.jpg",
                    "https://cdn.pixabay.com/photo/2020/02/08/00/32/icon-4828765_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/12/05/05/20/cat-7635983_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/12/03/15/14/christmas-7632906_960_720.jpg"
                ],
                tags: [
                    "music-audio",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i107',
                title: "I will create an animated marketing video for business and sales",

                price: 8,
                owner_id: "u107",
                owner_rate:4,
                owner: {
                    _id: "u107",
                    fullname: "Zozo Ta",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                    level: "level 3",
                    rate: 3.5
                },
                daysToMake: 2,
                description: "I will be your female singer songwriter in english and in french.",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/6826741ae53df1b3f973b22ddb4d8fad-1721629613/weed%20004/create-ai-based-assets-to-enhance-your-brand-or-website.jpg",
                    "https://cdn.pixabay.com/photo/2022/08/14/08/26/abstract-art-7385224_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/09/10/18/23/print-7445476_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/08/14/08/26/abstract-art-7385225_960_720.jpg"
                ],
                tags: [
                    "lifestyle",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i108',
                title: "I will design your printed circuit board pcb, ready for manufacturing",
                price: 5,
                owner_id: "u108",
                owner_rate:4,
                owner: {
                    _id: "u107",
                    fullname: "Zozo Ta",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                    level: "level 3",
                    rate: 3.5
                },
                daysToMake: 2,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/6826741ae53df1b3f973b22ddb4d8fad-1721629613/weed%20004/create-ai-based-assets-to-enhance-your-brand-or-website.jpg",
                    "https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2019/12/18/18/03/angel-4704518_960_720.png",
                    "https://cdn.pixabay.com/photo/2021/11/18/21/57/christmas-6807486_960_720.jpg"
                ],
                tags: [
                    "lifestyle",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user']
            },

            {
                _id: 'i109',
                title: "I will create a stunning commercial brand video",
                price: 25,
                owner_id: "u109",
                owner_rate:4,
                owner: {
                    _id: "u109",
                    fullname: "Bill Loney",
                    imgUrl: 'https://cdn.pixabay.com/photo/2018/03/12/20/57/woman-3220835_960_720.jpg',
                    level: "level 3",
                    rate: 4
                },
                daysToMake: 7,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/6826741ae53df1b3f973b22ddb4d8fad-1721629613/weed%20004/create-ai-based-assets-to-enhance-your-brand-or-website.jpg",
                    "https://cdn.pixabay.com/photo/2016/04/01/09/24/automobile-1299344_960_720.png",
                    "https://cdn.pixabay.com/photo/2013/07/12/19/31/cadillac-154920_960_720.png",
                    "https://cdn.pixabay.com/photo/2012/04/11/18/28/car-29281_960_720.png"
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i130',
                title: "I will translate english to german or translate german to english professionally",
                price: 30,
                owner_id: "u130",
                owner_rate: 1,
                owner: {
                    _id: "u130",
                    fullname: "Nura Kersa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
                    level: "level 3",
                    rate: 1
                },
                daysToMake: 6,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2021/02/08/12/48/camera-5994642_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/09/14/22/12/camera-7455311_960_720.png",
                    "https://cdn.pixabay.com/photo/2019/03/30/20/27/camera-4091991_960_720.png"

                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i111',
                title: "I will write SEO health, nutrition and fitness articles blog posts",
                price: 17,
                owner_id: "u111",
                owner_rate:2,
                owner: {
                    _id: "u111",
                    fullname: "Anita Bath",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/03/35/girl-1867092_960_720.jpg',
                    level: "level 2",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/06/18/16/55/cute-7270285_960_720.png",
                    "https://cdn.pixabay.com/photo/2021/01/19/02/37/cat-5929889_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/05/13/12/44/room-7193628_960_720.png"

                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            }, {
                _id: 'i112',
                title: "I will provide automated social websites for passive income",

                price: 15,
                owner_id: "u112",
                owner: {
                    _id: "u112",
                    fullname: "Boya",
                    imgUrl: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg',
                    level: "level 2",
                    rate: 5
                },
                owner_rate:5,
                daysToMake: 2,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/01/30/18/28/lines-6981892_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123020_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123019_960_720.jpg"
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i113',
                title: "I will do elegant professional business logo design services",
                price: 12,
                owner_id: "u113",
                owner_rate:5,
                owner: {
                    _id: "u113",
                    fullname: "Ssudu Dda",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                    level: "level 1",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2022/08/01/18/35/ocean-7358753_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2023/01/05/08/17/bird-7698384_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2023/01/10/10/33/path-7709452_960_720.png",
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i114',
                title: "I will do 3 modern minimalist logo design",
                price: 18,
                owner_id: "u114",
                owner: {
                    _id: "u114",
                    fullname: "Puki Dfa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
                    level: "level 2",
                    rate: 2
                },
                owner_rate:4,
                daysToMake: 1,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2022/12/17/19/04/house-7662218_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/05/30/08/57/flowers-7230812_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/11/15/04/54/automotive-7593064_960_720.jpg"
                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i115',
                title: "I will make 6 figure shopify dropshipping store or shopify website",
                price: 10,
                owner_id: "u115",
                owner_rate: 5,
                owner: {
                    _id: "u115",
                    fullname: "Jo Bara",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                    level: "level 2",
                    rate: 5
                },
                daysToMake: 4,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2015/08/04/19/21/happy-birthday-875122_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758314_960_720.png",
                    "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758313_960_720.png",
                ],
                tags: [
                    "writing-translation",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i116',
                title: "I will mix and master your music, experienced professional engineer",
                price: 20,
                owner_id: "u116",
                owner_rate: 5,
                owner: {
                    _id: "u116",
                    fullname: "Anita Bath",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg',
                    level: "level 2",
                    rate: 1
                },
                daysToMake: 5,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2022/12/05/05/20/cat-7635983_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/12/03/15/14/christmas-7632906_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2020/02/08/00/32/icon-4828765_960_720.jpg",
                ],
                tags: [
                    "music-audio",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i117',
                title: "I will create an animated marketing video for business and sales",

                price: 8,
                owner_id: "u117",
                owner: {
                    _id: "u117",
                    fullname: "Zozo Ta",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg',
                    level: "level 2",
                    rate: 2
                },
                owner_rate: 2,
                daysToMake: 2,
                description: "I will be your female singer songwriter in english and in french.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2022/08/14/08/26/abstract-art-7385225_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/09/10/18/23/print-7445476_960_720.png",

                    "https://cdn.pixabay.com/photo/2022/08/14/08/26/abstract-art-7385224_960_720.jpg"
                ],
                tags: [
                    "lifestyle",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            {
                _id: 'i118',
                title: "I will design your printed circuit board pcb, ready for manufacturing",
                price: 5,
                owner_id: "u118",
                owner_rate: 3,
                owner: {
                    _id: "u118",
                    fullname: "Mumu Asa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_960_720.jpg',
                    level: "level 2",
                    rate: 3
                },
                daysToMake: 2,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2019/12/18/18/03/angel-4704518_960_720.png",
                    "https://cdn.pixabay.com/photo/2021/11/18/21/57/christmas-6807486_960_720.jpg",
                    "https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_960_720.jpg"
                ],
                tags: [
                    "lifestyle",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },

            {
                _id: 'i119',
                title: "I will create a stunning commercial brand video",
                price: 25,
                owner_id: "u119",
                owner_rate: 4,
                owner: {
                    _id: "u119",
                    fullname: "Bill Loney",
                    imgUrl: 'https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_960_720.jpg',
                    level: "level 2",
                    rate: 4
                },
                daysToMake: 7,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://cdn.pixabay.com/photo/2013/07/12/19/31/cadillac-154920_960_720.png",
                    "https://cdn.pixabay.com/photo/2012/04/11/18/28/car-29281_960_720.png",
                    "https://cdn.pixabay.com/photo/2016/04/01/09/24/automobile-1299344_960_720.png"
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user']
            },
            {
                _id: 'i120',
                title: "I will translate english to german or translate german to english professionally",
                price: 30,
                owner_id: "u120",
                owner_rate: 1,
                owner: {
                    _id: "u120",
                    fullname: "Nura Kersa",
                    imgUrl: 'https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg',
                    level: "level 2",
                    rate: 1
                },
                daysToMake: 6,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2021/02/08/12/48/camera-5994642_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/09/14/22/12/camera-7455311_960_720.png",
                    "https://cdn.pixabay.com/photo/2019/03/30/20/27/camera-4091991_960_720.png"

                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user']
            },
            {
                _id: 'i121',
                title: "I will write SEO health, nutrition and fitness articles blog posts",
                price: 17,
                owner_id: "u121",
                owner_rate: 1,
                owner: {
                    _id: "u121",
                    fullname: "Anita Bath",
                    imgUrl: 'https://cdn.pixabay.com/photo/2015/01/12/10/45/man-597178_960_720.jpg',
                    level: "level 2",
                    rate: 4
                },
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://cdn.pixabay.com/photo/2021/01/19/02/37/cat-5929889_960_720.png",
                    "https://cdn.pixabay.com/photo/2022/06/18/16/55/cute-7270285_960_720.png",
                    // "https://www.istockphoto.com/photo/road-trip-romance-gm1707927462-539418998?utm_source=pixabay&utm_medium=affiliate&utm_campaign=ADP_photo_sponsored_P1&utm_content=https%3A%2F%2Fpixabay.com%2Fphotos%2Fcat-roux-old-look-profile-animal-5183427%2F&utm_term=adventure",
                    "https://cdn.pixabay.com/photo/2022/05/13/12/44/room-7193628_960_720.png"

                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user']
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, gigs)
    }
}


function getEmptyGig(title = '', description = '', price = 0, tags = [], daysToMake = '', imgUrl = [], wishList = []) {
    return {
        _id: '',
        title,
        description,
        price,
        tags,
        daysToMake,
        imgUrl,
        wishList
    }
}