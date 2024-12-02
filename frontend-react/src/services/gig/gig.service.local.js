import { storageService } from '../async-storage.service'
import { utilService } from '../util.service'
import { userService } from '../user/user.service.remote'

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
}

window.cs = gigService
function getDefaultFilter() {
    return { title: '', tags: [], daysToMake: '', minPrice: '', maxPrice: '' }
}


async function query(filterBy = { title: '', tags: [], daysToMake: '' }, userId) {
    var gigs = await storageService.query(STORAGE_KEY)
    if (userId) gigs = gigs.filter(gig => gig.owner_id === userId)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
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

    // if (sort === 'bestSelling') {
    //     gigs.sort((gig1, gig2) =>
    //         (getAvgRating(gig2.reviews) - getAvgRating(gig1.reviews)))
    // } else if (sort === 'recommended') {
    //     gigs.sort((gig1, gig2) => 
    //     (gig2.likedByUsers.length - gig1.likedByUsers.length))
    // } else if (sort === 'newestArrivals') {
    //     gigs.sort((gig1, gig2) => new Date(gig2.createdAt) - new Date(gig1.createdAt));
    // }

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

const languages = [
    "English", "Spanish", "Mandarin Chinese", "Hindi", "Arabic", "Portuguese", "Bengali",
    "Russian", "Japanese", "Punjabi", "German", "French", "Javanese", "Korean", "Vietnamese",
    "Tamil", "Turkish", "Italian", "Urdu", "Malay", "Thai", "Persian", "Dutch", "Swahili",
    "Polish", "Ukrainian", "Romanian", "Greek", "Hungarian", "Czech", "Slovak", "Finnish",
    "Swedish", "Danish", "Norwegian", "Bulgarian", "Serbian", "Croatian", "Hebrew", "Burmese",
    "Sinhala", "Lao", "Khmer", "Zulu", "Afrikaans", "Yoruba", "Hausa", "Igbo", "Pashto", "Kurdish",
    "Azeri", "Kazakh", "Uzbek", "Armenian", "Georgian", "Albanian", "Bosnian", "Latvian",
    "Lithuanian", "Estonian", "Maltese", "Basque", "Galician", "Catalan", "Welsh",
    "Scottish Gaelic", "Irish Gaelic", "Maori", "Samoan", "Tongan", "Fijian", "Tahitian",
    "Haitian Creole", "Malagasy", "Swati", "Tswana", "Xhosa", "Sotho", "Somali", "Amharic",
    "Tigrinya", "Oromo", "Kinyarwanda", "Kirundi", "Wolof", "Bambara", "Fulani", "Tibetan",
    "Nepali", "Mongolian", "Chechen", "Uyghur", "Tagalog", "Cebuano", "Ilocano", "Hmong", "Aymara",
    "Quechua"
]

function makeLanguages() {
    return languages.sort(() => 0.5 - Math.random()).slice(0, 3);
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


function _createGigs() {
    let gigs = utilService.loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        gigs = [
            {
                _id: 'i102',
                title: "I will provide a great logo for you",
                price: 15,
                owner_id: "u102",
                owner_rate: 5,
                owner: {
                    _id: "u102",
                    fullname: "Boya",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                    level: "level 3",
                    rate: 5
                },
                Languages: 'Germany',
                country: "Germany",
                daysToMake: 2,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/110928855/original/c3fc46f6ac4d0287a2511cf5b06144aaa499326d.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/110928855/original/7ca6bdb0455fd2b541a96b9e7c566da52930168a/do-minimalist-logo-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/110928855/original/8b65c55172f99d57b28fe8030a9d6695f2f21a6f/do-minimalist-logo-design.jpg",
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            // {
            //     _id: 'i102',
            //     title: "I will do data entry, copy paste, web research as your VA",
            //     price: 15,
            //     owner_id: "u102",
            //     owner_rate: 4,
            //     Languages: "English,Spanish,Japanese",
            //     country: "United States",
            //     owner: {
            //         _id: "u102",
            //         fullname: "Boya",
            //         imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
            //         level: "level 3",
            //         rate: 5
            //     },
            //     daysToMake: 2,
            //     description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
            //     description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
            //     imgUrl: [
            //         "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123020_960_720.jpg",
            //         "https://cdn.pixabay.com/photo/2022/01/30/18/28/lines-6981892_960_720.jpg",
            //         "https://cdn.pixabay.com/photo/2022/04/10/09/45/background-7123019_960_720.jpg",
            //         "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/378248214/original/99e4871876679239674652a835c72bc80afb937e/create-ai-based-assets-to-enhance-your-brand-or-website.jpg"
            //     ],
            //     tags: [
            //         "graphic-design",
            //         "artisitic",
            //         "proffesional",
            //         "accessible"
            //     ],
            //     likedByUsers: ['mini-user'] // for user-wishlist : use $in
            // },
            {
                _id: 'i103',
                title: "I will do elegant professional business logo design services",
                price: 12,
                owner_id: "u126",
                owner_rate: 4,
                owner: {
                    _id: "u126",
                    fullname: "Sari",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                    level: "level 1",
                    rate: 5
                },
                Languages: "English,French,Japanese",
                country: "French",
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/23197467/original/d4f9121d0d962301e3ef52c1a5217bf003889e2a/design-an-impressive-logo.jpg",
                    "https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20231004/The%20Pudgy%20Pilot_ocez0n.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/fe83cf4d240504f0b090a573dd2fbd09-1709558877/Green%20Ark%20Investments_A%20Mockup%205/design-an-impressive-logo.jpg"

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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
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
            // {
            //     _id: 'i105',
            //     title: "I will make 6 figure shopify dropshipping store or shopify website",
            //     price: 10,
            //     owner_id: "u105",
            //     owner_rate: 4,
            //     owner: {
            //         _id: "u105",
            //         fullname: "Jo Bara",
            //         imgUrl: 'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_960_720.jpg',
            //         level: "level 3",
            //         rate: 5
            //     },
            //     Languages: "Czech,Norwegian,Turkish",
            //     country: "Czech",
            //     daysToMake: 4,
            //     description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
            //     imgUrl: [
            //         "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/0487fdb70fad4214574ff8cf694e2f87-1729681532/05%20v3/create-ai-based-assets-to-enhance-your-brand-or-website.jpg",
            //         "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758313_960_720.png",
            //         "https://cdn.pixabay.com/photo/2015/08/04/19/21/happy-birthday-875122_960_720.jpg",
            //         "https://cdn.pixabay.com/photo/2018/10/19/10/26/bicycle-3758314_960_720.png"
            //     ],
            //     tags: [
            //         "writing-translation",
            //         "artisitic",
            //         "proffesional",
            //         "accessible"
            //     ],
            //     likedByUsers: ['mini-user'] // for user-wishlist : use $in
            // },
            {
                _id: 'i106',
                title: "I will mix and master your music, experienced professional engineer",
                price: 20,
                owner_id: "u106",
                owner_rate: 4,
                owner: {
                    _id: "u106",
                    fullname: "Anita Bath",
                    imgUrl: 'https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg',
                    level: "level 3",
                    rate: 1
                },
                Languages: "Serbian,Norwegian,Croatian",
                country: "Serbian",
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
                owner_rate: 4,
                owner: {
                    _id: "u107",
                    fullname: "Zozo Ta",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                    level: "level 3",
                    rate: 3.5
                },
                Languages: "Pashto,Khmer,Croatian",
                country: "Khmer",
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
                owner_rate: 4,
                owner: {
                    _id: "u107",
                    fullname: "Zozo Ta",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                    level: "level 3",
                    rate: 3.5
                },
                Languages: "Azeri,Khmer,Croatian",
                country: "Khmer",
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
                title: "I will create a stunning commercial brand ",
                price: 25,
                owner_id: "u109",
                owner_rate: 4,
                owner: {
                    _id: "u109",
                    fullname: "Emma",
                    imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/3110358213b5c68c7528642de4dc5456-1718607287523/87b04afd-e3a8-4879-b07d-6f0388bfc9d8.jpg',
                    level: "level 3",
                    rate: 4
                },
                Languages: "Azeri,Khmer,Kazakh",
                country: "Khmer",
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                description2: "Professional, Clean, Modern & Stunning WordPress Website All Devices are Responsive and User Friendly E-commerce and Payment method integration Social Media integration and Live Chat Speed Optimization & SSL Certificate Installation Domain and Hosting Setup WordPress and Plugins Installation Use Demo Copy right free graphic",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/324001381/original/fb1b824eedf063e8f23b57d73c0969bc9033993a/do-modern-minimalist-luxury-business-logo-design-1a80.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/324001381/original/0507af1676f66ba00a8cc9000d62e85782e8c3c8/do-modern-minimalist-luxury-business-logo-design-1a80.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/324001381/original/2b7ab3e89a19f186c23fcce0b3b1ffc1b7babc24/do-modern-minimalist-luxury-business-logo-design-1a80.jpg",
                    "https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20240607/branding%20Cannbies_divrmr.jpg"
                ],
                tags: [
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user'] // for user-wishlist : use $in
            },
            // {
            //     _id: 'i130',
            //     title: "I will translate english to german or translate german to english professionally",
            //     price: 30,
            //     owner_id: "u130",
            //     owner_rate: 1,
            //     owner: {
            //         _id: "u130",
            //         fullname: "Nura Kersa",
            //         imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
            //         level: "level 3",
            //         rate: 1
            //     },
            //     Languages: "Galician,Khmer,Maltese",
            //     country: "Irish Gaelic",
            //     daysToMake: 6,
            //     description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
            //     imgUrl: [
            //         "https://cdn.pixabay.com/photo/2021/02/08/12/48/camera-5994642_960_720.png",
            //         "https://cdn.pixabay.com/photo/2022/09/14/22/12/camera-7455311_960_720.png",
            //         "https://cdn.pixabay.com/photo/2019/03/30/20/27/camera-4091991_960_720.png"

            //     ],
            //     tags: [
            //         "digital-marketing",
            //         "artisitic",
            //         "proffesional",
            //         "accessible"
            //     ],
            //     likedByUsers: ['mini-user'] // for user-wishlist : use $in
            // },
            // {
            //     _id: 'i140',
            //     title: "I will translate english to german or translate german to english professionally",
            //     price: 30,
            //     owner_id: "u140",
            //     owner_rate: 1,
            //     owner: {
            //         _id: "u140",
            //         fullname: "Nura Kersa",
            //         imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
            //         level: "level 3",
            //         rate: 1
            //     },
            //     Languages: "Tahitian,Khmer,Maltese",
            //     country: "Tahitian",
            //     daysToMake: 6,
            //     description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
            //     imgUrl: [
            //         "https://cdn.pixabay.com/photo/2021/02/08/12/48/camera-5994642_960_720.png",
            //         "https://cdn.pixabay.com/photo/2022/09/14/22/12/camera-7455311_960_720.png",
            //         "https://cdn.pixabay.com/photo/2019/03/30/20/27/camera-4091991_960_720.png"

            //     ],
            //     tags: [
            //         "digital-marketing",
            //         "artisitic",
            //         "proffesional",
            //         "accessible"
            //     ],
            //     likedByUsers: ['mini-user'] // for user-wishlist : use $in
            // },
            {
                _id: 'i111',
                title: "I will do 3 modern minimalist logo design for your business",
                price: 17,
                owner_id: "u111",
                owner_rate: 2,
                owner: {
                    _id: "u111",
                    fullname: "Anita Bath",
                    imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/03/35/girl-1867092_960_720.jpg',
                    level: "level 2",
                    rate: 4
                },
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/192945874/original/45074ea0dfcd30781722c0cc82cdd54355d2102d/do-minimal-logo-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/192945874/original/93ff8be5d9b11b94cbb4ec7bfa2a2efc041736ba/do-minimal-logo-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/192945874/original/cfbc1e5c5410119fe6997ab6829aa843006db4a1/do-minimal-logo-design.jpg"

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
                _id: 'i112',
                title: "I will do modern versatile minimalist luxury business logo design",

                price: 15,
                owner_id: "u112",
                owner: {
                    _id: "u112",
                    fullname: "Boya",
                    imgUrl: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg',
                    level: "level 2",
                    rate: 5
                },
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
                owner_rate: 5,
                daysToMake: 2,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/329437940/original/289c156161c400527a6f3a0cd3c94e177da0e417/do-minimalist-logo-design.png",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/329437940/original/2fcc47499d07bbb72d2a1e098cfb7bb0ccec57cb/do-minimalist-logo-design.png",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/329437940/original/6f0b39fba11e0d0dbb8e36a3b3df88b485f47eb1/do-minimalist-logo-design.png"
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
                owner_rate: 5,
                owner: {
                    _id: "u113",
                    fullname: "Amit",
                    imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                    level: "level 1",
                    rate: 4
                },
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230723/LOGO-DESIGN_tzmukv.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/f1e78f55e2c30f9e605703c2b03a301d-1694636599/1/do-minimalist-logo-design.png",
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/31c279ea906bb7de7240e5494038c7d9-1694636652/2/do-minimalist-logo-design.png",
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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
                owner_rate: 4,
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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
                daysToMake: 7,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [

                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/2687733/original/c5d51f42c35abd4a3e0c9e510f43aacb11d4fad2/design-a-retro-vintage-logo.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/2687733/original/e1ecb09dc04071c76a3e6563c743c57a3cebe0ec/design-a-retro-vintage-logo.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/2687733/original/509114576f1abace30cf75f1f4eed98d87355320/design-a-retro-vintage-logo.jpg"
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
                title: "I will design a retro vintage logo",
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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
                daysToMake: 6,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20170608/Gig1-ilovepdf-compressed_mucfxe.jpg",
                    "https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20170608/Gig2-ilovepdf-compressed_l1ryfk.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/06171dae5e4dfec1c87bfc6ee7d33f0a-1728225356/ElGalp%C3%B3ndelMate4/design-a-retro-vintage-logo.jpg"

                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible",
                    "logo design",
                    "graphic-design",
                    "artisitic",
                    "proffesional",
                    "accessible"
                ],
                likedByUsers: ['mini-user']
            },
            {
                _id: 'i121',
                title: "I will do 3 modern minimalist logo design for your business",
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
                Languages: "English,Swahili,Turkish",
                country: "Turkish",
                daysToMake: 3,
                description: "Best Gig for Travel Affiliates Programs absolutely automated websites!!! Up to 3,000,000 Hotels, 600 Airlines, Over 1,000 Cruises, 23,000 tours & activities from 2,200 global destinations, and a variety of Car Rental companies on one website. Start Earning Money more traffic makes generate more money. Each time your users click on the deals suggested by the Search Engine, you will be making affiliate commissions, also on booking.",
                imgUrl: [
                    "https://fiverr-res.cloudinary.com/image/upload/t_gig_pdf_gallery_view_ver4,f_jpg/20230321/Logo-04_bzvjv2.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/afc1343462af4a164255c1b0bed0b83f-1691478050/Logo%20Mock%20Final/do-minimal-logo-design.jpg",
                    // "https://www.istockphoto.com/photo/road-trip-romance-gm1707927462-539418998?utm_source=pixabay&utm_medium=affiliate&utm_campaign=ADP_photo_sponsored_P1&utm_content=https%3A%2F%2Fpixabay.com%2Fphotos%2Fcat-roux-old-look-profile-animal-5183427%2F&utm_term=adventure",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/db4462531ebcf14f9725ed0eb1820099-1690959745/Logo%20Mock%20Final/do-minimal-logo-design.jpg"

                ],
                tags: [
                    "digital-marketing",
                    "artisitic",
                    "proffesional",
                    "accessible",
                    "logo design",
                    "graphic-design",
                ],

                likedByUsers: ['mini-user']
            },
            // {
            //     _id: 'i122',
            //     title: "I will do hyper realistic pencil portrait by hand drawing",
            //     about: "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
            //     price: 172,
            //     owner: {
            //         _id: "u1122",
            //         fullname: "frederickkessie",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
            //         level: "3",
            //         rate: 2
            //     },
            //     Languages: "English,Swahili,Turkish",
            //     country: "Ghana",
            //     daysToMake: 26,
            //     description: "Hello! Much obliged for visiting my gig :) In this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles. In case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)? Kindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document. I will give hand-drawn dark and White or hued reasonable pictures. Sympathetically give me clear reference photograph however much as could be expected. The material I utilized for Creating pencil representations are: Drawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on. You can give me anything: Picture photographs, Family photographs, Creature photographs, Any item photographs, Scene photographs, Engineering photographs, Anything you envision. Kindly reach me prior to submitting your request! Much appreciated. I DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
            //     imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg",
            //     tags: ["pencil drawing",
            //         "realistic  drawing",
            //         "hand drawing",
            //         "portrait drawing",
            //         "pencil sketch",
            //         "logo design",
            //         "graphic-design",
            //     ],
            //     likedByUsers: ["mini-user"],
            //     reviews: [
            //         {
            //             name: "tobiaspille300",
            //             country: "Thailand",
            //             flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
            //             review: "frederickkessie is a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result! Highly recommended work with this guy!",
            //             reviewedAt: " Published 2 months ago"
            //         },
            //         {
            //             name: "liam31",
            //             country: "United Kingdom",
            //             flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            //             review: "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
            //             reviewedAt: "Published 3 weeks ago"
            //         },
            //         {
            //             name: "liam31",
            //             country: "United Kingdom",
            //             flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            //             review: "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
            //             reviewedAt: "Published 3 weeks ago"
            //         },
            //         {
            //             name: "larsonraz",
            //             country: "United States",
            //             flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             review: "Very detailed",
            //             reviewedAt: "Published 1 week ago"
            //         },
            //         {
            //             name: "stevekaszycki",
            //             country: "United States",
            //             flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             review: "very nice portrait, very good quality.",
            //             reviewedAt: "Published 2 weeks ago"
            //         }
            //     ]
            // },
            // {
            //     _id: 'i123',
            //     title: 'I will do hyper realistic pencil sketch portrait by hand drawing',
            //     about: 'Hello, this is Masuk, stand up for vividstore, I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.',
            //     price: 151,
            //     owner: {
            //         _id: 'u1123',
            //         fullname: 'vividstore',
            //         imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg',
            //         level: '2',
            //         rate: 4
            //     },
            //     Languages: "English,Swahili,Turkish",
            //     country: 'Bangladesh',
            //     daysToMake: 24,
            //     description: 'Hey ! Thanks for visiting my gig :)\nIn this gig i\'m offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i\'ll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black & White or colored realistic portraits.\nKindly provide me clear reference photo as much as possible.\nThe material I used for Creating pencil portraits are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, tombomono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can give me anything:\nPortrait photos\nFamily photos\nAnimal photos\nAny product photos\nLandscape photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITAL FILE, IF YOU WANT THE ORIGINAL ONE THEN MESSAGE ME FOR DETAILS.\nFeel free to ask me anything! :)\nThank You...\nvividstore',
            //     imgUrl: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg',
            //     tags: [
            //         'pencil drawing',
            //         'realistic drawing',
            //         'pencil portrait',
            //         'sketch',
            //         'pencil sketch',
            //         "logo design",
            //         "graphic-design",

            //     ],
            //     likedByUsers: [
            //         'mini-user'
            //     ]
            // },
            // {
            //     _id: 'i124',
            //     title: 'I will draw a hyperrealistic portrait of face or entire body and animals',
            //     about: 'Hello! I\'m a brazilian artist specialized in hyperrealistic drawings and paintings of human figures and animals, i use a diversity of techniques like Oil painting, dry pastel drawing and pencil. I have over 30 years of experience, check out my portfolio.',
            //     price: 198,
            //     owner: {
            //         _id: 'u1124',
            //         fullname: 'andreacarvalho_',
            //         imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
            //         level: '3',
            //         rate: 5
            //     },
            //     Languages: "English,Swahili,Turkish",
            //     country: 'Brazil',
            //     daysToMake: 4,
            //     description: 'Desenho de lápis hiperrealista da sua foto, posso adicionar detalhes de fundo e personalizar o desenho do jeito que você quiser.',
            //     imgUrl: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg',
            //     tags: [
            //         'pencil',
            //         'drawing',
            //         'portrait',
            //         'realistic',
            //         'painting',
            //         "logo design",
            //         "graphic-design",
            //     ],
            //     likedByUsers: [
            //         'mini-user'
            //     ],
            //     reviews: [
            //         {
            //             name: 'rachelrbarnes1',
            //             country: 'United States',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            //             review: 'Incredibly grateful for the amazing experience working with you . You are so talented and a kind soul! I highly recommend if you want high quality art to work with her every time',
            //             reviewedAt: 'Published 1 month ago'
            //         },
            //         {
            //             name: 'mark001994',
            //             country: 'Austria',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png',
            //             review: 'The artist was very kind and polite also very fast at the communication. The delivery of the project was on time. And her work is worth the money. I\'m really excited about the painting she did. I can truely recommend the Aritst and her work. Big Thanks! :)',
            //             reviewedAt: 'Published 1 month ago'
            //         },
            //         {
            //             name: 'thurstonrobby',
            //             country: 'United States',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            //             review: 'incredible on how precise that art is, picture perfect. 100% amazing job and I will use your services again ...',
            //             reviewedAt: 'Published 3 weeks ago'
            //         },
            //         {
            //             name: 'gavrielm',
            //             country: 'Israel',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png',
            //             review: 'amazing saller and great work',
            //             reviewedAt: 'Published 6 days ago'
            //         },
            //         {
            //             name: 'garebear52',
            //             country: 'United States',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            //             review: 'Beautiful drawing! Just what I wanted.',
            //             reviewedAt: 'Published 1 week ago'
            //         }
            //     ]
            // },
            // {
            //     _id: 'i126',
            //     title: 'I will write sociology, psychology and social sciences articles',
            //     about: 'My name is Mary, a graduate from Mount Kenya University, I am professional writer and my focus is to every single detail. I will transform your dream to reality. I am experienced in article, project/content writing for a couple of years. Furthermore, I have a long history of writing research-focused content and projects. My ultimate goal is to closely with my client to deliver quality and comprehensive project. Let\'s take your business to the next level. Thank you',
            //     price: 116,
            //     owner: {
            //         _id: 'u1126',
            //         fullname: 'winny_writer',
            //         imgUrl: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e34531bf0bbed9d144dba7384f6473b6-1621577835789/60307055-cde9-4dc2-9e9e-4daa421991d3.jpg',
            //         level: '3',
            //         rate: 2
            //     },
            //     Languages: "English,Swahili,Turkish",
            //     country: 'Kenya',
            //     daysToMake: 28,
            //     description: 'Hello, welcome to my Gig, I write sociology psychology and all social sciences content\nI am an expert writer who can help you with writing essays, research projects, and articles on criminology, sociology, and psychology. I gained so much experience over the time. i can handle papers from undergraduate all the way to PHD in criminology and sociology and psychology.\nI always strive to provide best quality to my clients and provide plagiarism-free work. I am also familiar with the following reference formats: APA, MLA, HARVARD, CHICAGO\nPlease contact me before placing an order, thank you.',
            //     imgUrl: 'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg',
            //     tags: [
            //         'technical writing',
            //         "graphic-design",
            //     ],
            //     likedByUsers: [
            //         'mini-user'
            //     ],
            //     reviews: [
            //         {
            //             name: 'far832013',
            //             country: 'Canada',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png',
            //             review: 'I had a bad experience…. The work doesn’t match the requirement at all. Although l sent a specific and detailed question, l received a general answer. Not recommend and will not deal again.',
            //             reviewedAt: 'Published 2 months ago'
            //         },
            //         {
            //             name: 'rehanmirdk',
            //             country: 'Denmark',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1f0.png',
            //             review: 'She was excellent in communicating, using my references to write a proper academic paper in sociology, and finish in only 15 hours after getting questions. Most recommended seller!',
            //             reviewedAt: 'Published 3 weeks ago'
            //         },
            //         {
            //             name: 'raevyn22',
            //             country: 'United States',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            //             review: 'Exactly what I asked for',
            //             reviewedAt: 'Published 8 hours ago'
            //         },
            //         {
            //             name: 'raevyn22',
            //             country: 'United States',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            //             review: 'Always gets the job done',
            //             reviewedAt: 'Published 1 day ago'
            //         },
            //         {
            //             name: 'junyeongcho',
            //             country: 'United States',
            //             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            //             review: 'She could understand the contents and write well',
            //             reviewedAt: 'Published 3 days ago'
            //         }
            //     ]
            // },
            {
                _id: "i127",
                title: "I will do modern timeless logo design with copyrights",
                about: 'Hello! This is Rashin Faria, a Data Entry Specialist & Virtual Assistant at your service. I have excellent experience in Data Entry, Data Processing, Data Uploading, MS Word/Excel, Google Spreadsheet, PDF, Web Research, Ecommerce Product Entry, Data Scraping and others. With a 24/7 supporting team we work together for the betterment of the projects. We have extensive experience to do our project very fast and professionally. Client satisfaction is our first priority. Order Now! Regards Rashin Faria',
                price: 200,
                owner_id: "u127",
                owner_rate: 4,
                owner: {
                    _id: "u127",
                    fullname: "Jo Bara",
                    imgUrl: 'https://fiverr-res.cloudinary.com/image/upload/t_profile_original,q_auto,f_auto/v1/attachments/profile/photo/77bafcda971c8f8b8f7b5c9777c49e8a-1728723826955/04fae5b6-19d9-4fc0-8af2-064821b978d9.jpg',
                    level: "level 3",
                    rate: 5
                },
                Languages: "English,Swahili,Turkish",
                country: 'Bangladesh',
                daysToMake: 3,
                description: 'Hello Sir/Ma\'am,\nHave a cordial welcome to Rashin07’s outstanding services on Fiverr.\nAre you searching for a trustworthy virtual assistant for your projects regarding data entry? I’m here to help. I’m an enthusiastic, hard-working and detail-oriented working person who has developed a mature and responsible approach to any task that I undertake. With excellent teamwork, we always try to work with dedication to achieve a certain objective on time. We are always at your service to provide budget-friendly qualitative work. Check out the following services & Order Now.\nOur Services:\nWeb Research\nCopy Paste Jobs\nData Entry\nData Scraping\nData Conversion (PDF/Image to excel)\nProduct Listing\nShopify / Woo-commerce Product Entry\nLead Generation\nMS Excel (Data Cleaning/Formatting /Chart/Macro)\nManual Typing\nAnd more!\nOur Specialties:\n24/7 customer service\nUnlimited Revisions\nOn-time delivery\nWork efficiently\nPrompt response\nNOTE – Please contact me before placing an order. Feel free to discuss the project & set the right estimations for you.\nRegards\nRashin Faria\nData Entry | Copy Paste | Web Scraping | Web Research | Product Entry',
                imgUrl: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/115722335/original/a97a040130a654a1cd79940188aa398680920eca/design-minimalist-logo-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/115722335/original/5655a351acead96fa69c29acde4abe0948d585f6/design-minimalist-logo-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/115722335/original/b02532dda6153b61668903d96f09b15d3022b642/design-minimalist-logo-design.jpg"
                ],
                tags: [
                    'web research',
                    'manual typing',
                    'data entry',
                    'copy paste',
                    'product listing',
                    "logo design",
                    "graphic-design",
                ],
                likedByUsers: [
                    'mini-user'
                ],
                reviews: [
                    {
                        name: 'threeangelsuk',
                        country: 'United Kingdom',
                        flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
                        review: 'Daisy accept the job. However, I think my job could have been done in the hours set and it was not. I would not use again from this experience.',
                        reviewedAt: 'Published 1 month ago'
                    },
                    {
                        name: 'kasper711',
                        country: 'Netherlands',
                        flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png',
                        review: 'Clear communication, did the job!',
                        reviewedAt: 'Published 1 day ago'
                    },
                    {
                        name: 'jmorgenstern82',
                        country: 'New Zealand',
                        flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ff.png',
                        review: 'Provided exactly what was required, quickly, and with great communication. Thank you.',
                        reviewedAt: 'Published 2 days ago'
                    },
                    {
                        name: 'philipgrewin',
                        country: 'Sweden',
                        flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f8-1f1ea.png',
                        review: 'Great, faster than expected!',
                        reviewedAt: 'Published 4 days ago'
                    },
                    {
                        name: 'beanfiver',
                        country: 'United States',
                        flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
                        review: 'Efficient! Great communicator! Highly recommended!',
                        reviewedAt: 'Published 1 week ago'
                    }
                ]
            },
            {
                _id: "i128",
                title: "I will do modern, professional business logo design with copyrights",
                about: "Hello fiverr community,my name is Muhammad Waqar and i'm here to help you with your lead generation, web research and data entry projects. We are a group of experts which work together for the betterment of the projects we take from our clients. So don't forget to reach out me for your next project. Thank you very much",
                price: 134,
                owner_id: "u128",
                owner_rate: 4,
                owner: {
                    _id: "u128",
                    fullname: "waqarcreatives",
                    imgUrl: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/70eec3c605a7ac4cd14f13462f2dff2b-1694111481/DIA-01/design-unique-logo-with-all-copyrights-f446.jpg",
                    level: "3",
                    rate: 5
                },
                Languages: "English,Swahili,Turkish",
                country: "Pakistan",
                daysToMake: 3,
                description: "Looking for an experienced data entry expert? don't waste your time, just hire me and relax.\nWe are team of qualified professionals for guaranteed high quality work to our clients\nI will provide professional data entry work, data collecting from web, table graphs and all type of internet research like research related to businesses, companies information and enter into excel within fastest possible time.\nWhether you have big project like thousands of rows entries in excel or very tiny project like minutes of work, i'm here to provide you highly satisfied experience for your project.\nHere are the services we offer:\nData Entry\nWeb Research\nLead Generation\nCopy Paste Work\nCompanies Data Research\nInternet Research\nData Conversion into Excel\nTyping in Excel\nProperty Research\nCopy Paste Work\nPDF to Excel\nFormatting of excel sheets\nWhy hire me?\nGuaranteed quality work\nAll time communication during the project within Fiverr\nQuick Turnaround\nI will give my best and 100% to the project\nI can provide sample for the satisfaction before the order\nFeel free and don't hesitate to contact us for superior work\nNote: All communication and payment should be done via the fiverr platform.",
                imgUrl: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/252322613/original/4bf4a5f907cc22a954ff12314b1d9ae3b1d9b51f/create-a-modern-minimalist-and-luxury-logo-design.jpg"],
                tags: [
                    "web research",
                    "data entry",
                    "lead generation",
                    "data entry excel",
                    "data entry typing",
                    "logo design",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                reviews: [
                    {
                        name: "elliottbz",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "He cared a lot and asked questions, which showed me he wants to give quality work. That was really appreciated.",
                        reviewedAt: "Published 1 month ago"
                    },
                    {
                        name: "jeradg21",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Muhammad was responsive and did a good job collecting the information for a very reasonable price. His English isn't perfect, but we didn't struggle to communicate. If you give good directions, you'll get good results.",
                        reviewedAt: "Published 1 month ago"
                    },
                    {
                        name: "dustinolsen1",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "This was my second time working with waqarcreatives and I love the quickness and level of accuracy. If he doesn't understand something, he asks for clarification before starting the project.",
                        reviewedAt: "Published 2 months ago"
                    },
                    {
                        name: "kenneth8239",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Outstanding work. This is the 2nd project that WaqarCreatives completed for me, and I will be back to hire them again!",
                        reviewedAt: "Published 1 week ago"
                    },
                    {
                        name: "heirloomclean",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Super efficient - Does amazing work. Have several orders with this seller and they always perform. Thank you so much",
                        reviewedAt: "Published 2 months ago"
                    }
                ]
            },
            {
                _id: "i129",
                title: "I will create a modern minimalist and luxury logo design",
                about: "Hello fiverr community,my name is Muhammad Waqar and i'm here to help you with your lead generation, web research and data entry projects. We are a group of experts which work together for the betterment of the projects we take from our clients. So don't forget to reach out me for your next project. Thank you very much",
                price: 134,
                owner_id: "u129",
                owner_rate: 4,
                owner: {
                    _id: "u129",
                    fullname: "waqarcreatives",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7928a9bdb9e68c7dcc870f7dac91d92b-768025031598387384699/JPEG_20200826_012943_1616096493516260103.jpg",
                    level: "3",
                    rate: 5
                },
                country: "Pakistan",
                Languages: "English",
                daysToMake: 3,
                description: "Looking for an experienced data entry expert? don't waste your time, just hire me and relax.\nWe are team of qualified professionals for guaranteed high quality work to our clients\nI will provide professional data entry work, data collecting from web, table graphs and all type of internet research like research related to businesses, companies information and enter into excel within fastest possible time.\nWhether you have big project like thousands of rows entries in excel or very tiny project like minutes of work, i'm here to provide you highly satisfied experience for your project.\nHere are the services we offer:\nData Entry\nWeb Research\nLead Generation\nCopy Paste Work\nCompanies Data Research\nInternet Research\nData Conversion into Excel\nTyping in Excel\nProperty Research\nCopy Paste Work\nPDF to Excel\nFormatting of excel sheets\nWhy hire me?\nGuaranteed quality work\nAll time communication during the project within Fiverr\nQuick Turnaround\nI will give my best and 100% to the project\nI can provide sample for the satisfaction before the order\nFeel free and don't hesitate to contact us for superior work\nNote: All communication and payment should be done via the fiverr platform.",
                imgUrl: ["https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/252322613/original/d2a30f73b23e582e4f29ab8212bd48b02c7c71d9/create-a-modern-minimalist-and-luxury-logo-design.jpg"],
                tags: [
                    "web research",
                    "data entry",
                    "lead generation",
                    "data entry excel",
                    "data entry typing",
                    "logo design",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                reviews: [
                    {
                        name: "elliottbz",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "He cared a lot and asked questions, which showed me he wants to give quality work. That was really appreciated.",
                        reviewedAt: "Published 1 month ago"
                    },
                    {
                        name: "jeradg21",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Muhammad was responsive and did a good job collecting the information for a very reasonable price. His English isn't perfect, but we didn't struggle to communicate. If you give good directions, you'll get good results.",
                        reviewedAt: "Published 1 month ago"
                    },
                    {
                        name: "dustinolsen1",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "This was my second time working with waqarcreatives and I love the quickness and level of accuracy. If he doesn't understand something, he asks for clarification before starting the project.",
                        reviewedAt: "Published 2 months ago"
                    },
                    {
                        name: "kenneth8239",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Outstanding work. This is the 2nd project that WaqarCreatives completed for me, and I will be back to hire them again!",
                        reviewedAt: "Published 1 week ago"
                    },
                    {
                        name: "heirloomclean",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Super efficient - Does amazing work. Have several orders with this seller and they always perform. Thank you so much",
                        reviewedAt: "Published 2 months ago"
                    }
                ]
            },

            {

                owner_rate: 5,
                title: "I will do excel data entry, copypaste, and any type of data entry",
                about: "I'm glad you're here! My name is Abrar Hussain. I’m a professional Transcriptionist and data entry expert. I’ve a BS degree in Mechanical engineering. From last more than three years, I’ve been working as a Data entry operator and English language transcriptionist. To me, customer satisfaction and providing the best quality work are always my top priorities. I’m really good at MS Office and Transcript. Get yourselves a skillful creator and professional Assistant by simply contacting me. So, drop a message, and let's get started. I am also available for long term projects. Thanks!",
                price: 106,
                _id: "i130",
                owner_id: "u130",
                owner: {
                    _id: "u130",
                    fullname: "abrar_029",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/798a61194492b92313c2f5b27d5397bb-1615924783131/a6a1c7f0-0cc0-4c50-95e1-2693d183ee1c.jpg",
                    level: "2",
                    rate: 3
                },
                Languages: "English,Swahili,Turkish",
                country: "Pakistan",
                daysToMake: 7,
                description: "I will do excel data entry, copy paste, and any type of data entry\nHello, Welcome to my Gig. Are you looking for a professional virtual assistant for, Excel Data Entry, Typing Work Copy Paste Work, Data Entry, Data collection, Data mining, using MS Word, MS Excel, Google doc, or Google Spreadsheet? Then, you are at the right place. Following are the services that I'm offering.\nExcel Data Entry\nCopy Paste Work\nShopify Product listing\nProduct Listing\nData Entry\nData Conversion\nData Scraping\nJPEG to Excel or Word\nPDF to Excel or Word\nTyping in Excel or Word\nWordPress Data Entry\nWeb Research and Web Scrapping\nE-commerce Products Listing\nProperty Research, Public Record Search\nData Collection from LinkedIn/Instagram\nReal Estate Research and Data Entry (Name, Email, Phone, Address, etc.)\nWhy chose me?\nExtra fast delivery\n100% Quality assurance\nlowest possible rates\nQuick Reply.\nUnlimited Revisions to make sure Maximum customer satisfaction\nData Security\nPlease contact me before placing an order and get my free consultancy about the project how to do it in the best possible way. Also If you need sample work Please feel free to demand.\nThanks & Regards,\nAbrar Hussain",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/199776653/original/b710f145db1a54491e2d777831107c0174c78565.png"],
                tags: [
                    "excel data entry",
                    "virtual assistant",
                    "data entry",
                    "copy paste",
                    "typing jobs",
                    "logo design",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "mac_x711",
                        "country": "Thailand",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
                        "review": "As usual, Abrar has been totally amazing in every work that's assigned to him. Words can't be expressed how awesome he is in doing anything that's assigned of him. I'm just thankful that he's always there for me and he goes above and beyond on what I asked of him. He's simply the best. Looking forward to our next projects 😊😊",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "applist22",
                        "country": "Austria",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
                        "review": "Abrar and his team did an amazing job. The communication was great and he was every time available to discuss the project and when problems popped up he was flexible and agile to solve them with great effort & motivation. He provided first-class delivery and project management skills and is a reliable partner for any kind of project! I will work with him in the near future again - was a great pleasure and I'm very satisfied!",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "brandersongroup",
                        "country": "United Kingdom",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        "review": "Ive worked with Abrar before, and once again he did a great job with what I’d asked him to do. Will definitely be working with him again.",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "schneida",
                        "country": "Austria",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
                        "review": "It was a pleasure to work with Abrar and his team. He is fast responding and an awesome problem solver who always reaches the goals for his clients. He is on my shortlist for other jobs in the future for sure.",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "jarrodrandol238",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "This is my second project with him. Delivered on time and exactly how I asked. I would hire him if he lived in Florida!!!",
                        "reviewedAt": "Published 2 days ago"
                    }
                ]
            },
            {
                _id: "i131",
                owner_id: "u131",
                owner_rate: 5,
                title: "I will design 3 modern minimalist flat logo designs",
                about: "Hello! My name is VD. I am a connoisseur of art and music. I love being around nature and my pets. I have a team of professional graphic designers with an experience of 8+ years. We specialize in logo designing. We're available exclusively on fiverr to rock your world with our designing skills. Come and experience it for yourself!",
                price: 170,
                owner: {
                    _id: "u131",
                    fullname: "design_desk",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/044fb5914a845a4eb59fc2b69f7f7b32-1634120039750/4dbc2acb-7322-4cd0-9afb-e5190e8e8a0d.jpg",
                    level: "2",
                    rate: 3
                },
                Languages: "English,Swahili,Turkish",
                country: "India",
                daysToMake: 16,
                description: "Hi there ! Thanks for stopping by !!\nA Team of Talented Graphic Designer with 8+ years of experience in Graphic Industry, expertise as Logo Maker, You'll get creative & AWESOME logo design for your business.\nMy portfolio : https://www.fiverr.com/users/design_desk/portfolio/NjFiYjE4NmMwZTgwMDUwMDAxZTMzMjJh\n★ Why Us? ★\nTalented Logo Maker Team\nFully custom made, creative, original, UNIQUE and AWESOME designs\nProfessional customer support 24/7\nHigh Quality work\n100% money back policy if not satisfied\n★ WHAT DO YOU GET? ★\n✔ Highly Professional, UNIQUE & High Quality designs\n✔ UNLIMITED revisions until u r 100% satisfied\n✔ Fast turn around time 24 to 48 hours only.\n✔ 100% original & unique vector design from Adobe Illustrator\n✔ Vector Source Files (scalable without any quality loss) (AI, EPS, PDF) for the final design ✔ PROFESSIONAL Communication & Outstanding Customer Support ✔ Guaranteed High Quality work\nIf you have any question,\nFeel free to★ Contact Me! ★I'll be happy to help !\nLet's get started!\n-Your Logo Maker",
                imgUrl: ['https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg'],
                tags: [
                    "minimalist",
                    "flat",
                    "logo design",
                    "modern",
                    "unique",
                    "logo maker",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "airbornesnow",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "The seller's communication was EXCELLENT and the service was exactly as described. When I wanted revisions, they did not hesitate to provide me with alterations of the design. Although they were nice and kind when I asked for the revisions, all the revisions were half a**ed and sloppy. Even when I provided a concept drawing for them to TRACE, the results were still not what I expected. Buyers BEWARE: The seller's communication is excellent, friendly, and VERY kind. However, if you ask for any revisions, the revisions you will receive will be sloppy and half-a**ed.",
                        "reviewedAt": "Published 4 days ago"
                    },
                    {
                        "name": "jacobmnb",
                        "country": "United Kingdom",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        "review": "I thought this service was amazing, I bought the basic option just hoping for a basic logo, but the seller went above my expectations and provided me with a bunch of concepts that were better than I could have imagined, for £7.90 I think this service is a must-buy for anyone needing a professional-looking logo and not wanting to spend a huge amount",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "ashtonpeckham",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "The seller was very responsive. We had revisions after the initial designs were delivered and the seller made them very quickly. The logo we selected is perfect for our current needs. Recommend including your vision in the initial request so you don't end up with ideas that you don't like. There were only 2 real contenders because the Fiverr site wouldn't allow me to attach my hand drawn idea. The paperclip icon was essentially rendered inactive, even after several attempts. This is no fault of the designers; i should have been even more descriptive with my request when I was unable to attach files.",
                        "reviewedAt": "Published 1 week ago"
                    },
                    {
                        "name": "borowski10",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Ultimately, I am very happy with the final logo I received. However, the seller's communication could have been better. There were a few times I asked for specific revisions and I was sent the same thing or something else that I didn't ask for. It took about 2 weeks for me to finally get what I was looking for. In the end, I got what I paid for and I am grateful for the service!",
                        "reviewedAt": "Published 2 days ago"
                    },
                    {
                        "name": "fowlplay_uk",
                        "country": "United Kingdom",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        "review": "VD was great. I had a very specific design in mind already that I needed recreating professionally and they did not disappoint. Even when I started to get picky with the design, nothing I requested was ever too much trouble. We went through many revisions to get it to exactly how I wanted it and every interaction we had was effortless. This is the first project I'd commissioned so wasn't really sure on the correct etiquette, yet VD made things so easy for me. Can't recommend these guys enough for that",
                        "reviewedAt": "Published 2 months ago"
                    }
                ]
            },
            // {
            //     _id: "i132",
            //     owner_id: "u132",
            //     owner_rate: 5,
            //     title: "I will create modern unique and creative logo design",
            //     about: "I am a professional graphics designer from PakIsTaN... Designing is not only my job, it's my Passion. All I need from you is a rough sketch of your idea. Then you can just relax and see the magic happening. Not only you'll get stunning and professional designs, but also you'll have top class custome",
            //     price: 61,
            //     owner: {
            //         _id: "u132",
            //         _id: "u132",
            //         fullname: "soduzai_gfx1",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a2dd1a0482bbfe54e61c6c2d6e64696e-1640431251801/943f73b5-dc43-4fe4-9728-9a58f0aafdbc.jpg",
            //         level: "basic/premium",
            //         rate: 3
            //     },
            //     country: "Pakistan",
            //     daysToMake: 2,
            //     description: "Hi esteemed buyer!\nLooking for modern unique and creative 2d or 3d logo design? Yes, you're at the right place.\nHaving a vast experience with hundreds of satisfied customers across the globe, I extend my services to design modern unique and creative logo design to represent your brand idea in a befitting manner.\nWhat proves my individuality over others?\nQuick delivery, quality work and transforming your brain idea into a 3d creative unique and modern logo design are my attributes.\nMY GIG OFFERINGS ARE:\nBest customer care\nRevisions within 24 Hours\n100% satisfaction guaranteed\nModern unique and creative designing ideas\nLogically and aesthetically hypnotizing logos\n1 free revision after completion of order\nEditable and re-sizeable vector files\nFont download link included\nHigh resolution final files in zip\nNote: For Complex Illustrations and Mascots, please discuss in inbox before placing order! It is also not included in our packages.\nHave queries? Contact us in inbox anytime!\n★Hearing from you would be an absolute pleasure, Go ahead and ORDER NOW!★",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103152154/original/b89645456b7f6906afa872771737e980b6f57cfb.jpg"],
            //     tags: [
            //         "modern logo",
            //         "creative logo",
            //         "logo design",
            //         "unique logo",
            //         "logo maker"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "devsreads",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "Thank you SO MUCH to the seller. He was so patient and willing to work and correct as many times as we needed as some things got miscommunicated and he easily fixed them. Thank you!!!",
            //             "reviewedAt": "Published 3 days ago"
            //         },
            //         {
            //             "name": "raymondyslas",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "This designer is awesome. I have got my idea materialised in an efficient manner and the way I wanted. Seeing this logo, I would say this is the best designer to do any kind of graphics work.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "gbsol579",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "This designer is so quick and efficient in his work. My order was delivered in few hours. The design is hypnotizing and truly reflects my business idea. Highly recommended!",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "antoniodixon65",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "This is a really good design. The designer owes the skills needed to actually understand and then materailize a buyer's idea. Commendable and highly recommended.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "allendrozdowski",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "This designer has done a fantastic job. I like the design sense and colour combination of the designer. This is what I was looking for. I highly recommend him for graphics related work.",
            //             "reviewedAt": "Published 1 month ago"
            //         }
            //     ]
            // },
            // {
            //     _id: "i133",
            //     owner_id: "u133",
            //     owner_rate: 5,
            //     title: "I will design 3 modern minimalist logo design",
            //     about: "I am a professional artist having rich experience in hand sketched and digital artwork. I have served tons of businesses with smarter business solutions. I am here to get the global exposure and would like to contribute more towards our creative community. Thanks.",
            //     price: 89,
            //     owner: {
            //         _id: "u133",
            //         fullname: "modernmarvel",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d366617946e54cbc9aa114f27259e3ef-1552848300306/3c155f72-15c9-47d0-8f68-b75a519a7999.jpg",
            //         level: "basic/premium",
            //         rate: 4
            //     },
            //     country: "India",
            //     daysToMake: 7,
            //     description: "ModernMarvel heartily welcomes you to Minimalist Modern Logo Design gig.\nWe are Brand Creators and professional business consultants. Each business has his own story to tell and having high recall value is prime purpose behind getting a LOGO. Thus, We believe in creating simple yet effective masterpiece which blown away your customers mind.\nYour idea of getting Modern memorable and attractive logo design is just one step away. So, Lets discuss and choose a best design for your business.\nOur recommendation BRANDING PACK @ $65 ONLY:\n5 BRANDED logos with minimal designs + vector source files\nAttractive Social media covers (FB + Twitter)\nProfessional stationery design (B card + letterhead)\nUnlimited revision rounds\nExclusive customer support\nRefund & Package selection guidelines:\nIf the designs are as per your initial shared brief, refund wont be a possible option. You can ask for revision if i missed out anything.\nMy samples are from my premium / standard package.\nWe are closed on Sunday.\nMy key skills:\nMinimalist Modern Logo Design | Minimal | Modern | Typography | Line art | Custom logo | Vintage |\nKeen to Get Started!",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125798593/original/fea4f6af37e201fa9cb71a85583fedc171da2a26.jpg"],
            //     tags: [
            //         "modern logo",
            //         "custom logo",
            //         "logo design",
            //         "minimalist logo",
            //         "website logo",
            //         "logo maker"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "bartstrijbos",
            //             "country": "Netherlands",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
            //             "review": "Use your revisions and communication, and you will have something that works for you! I recommend modernmarvel for the price they ask! I did not know what to expect from my first buy on FIverr. The previews where what I was going for, so I thought why not give it a try. The initial delivery had two good concepts and three concepts I did not like. The two good concepts however, where not really what I wanted though. I submitted a revision proposal and hoped for the best. This is where this seller shines! From the initial designs, he worked quickly with every suggestion I made for revisions and was good in communication. I slowly saw my project evolving to something I love. Recommended!",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "v_winko33",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "Working with this seller was a great experience in that he was quick to respond (considering the 11+ hr time zone difference), friendly, reliable, and professional. He created some concepts with literally no reference the first time around, and the second time around I gave him more of an idea of what I was looking for and found the ideal logo. You get what you pay for, and the price I think is a very good deal that's hard to find. Communication +asking questions is key to get all that you want and need from this great offer. Although I am satisfied with the logo, I probably would've liked something more like the work he shows in his second picture on his profile/gigs. I do recommend him!",
            //             "reviewedAt": "Published 3 weeks ago"
            //         },
            //         {
            //             "name": "brendanpaull",
            //             "country": "Japan",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ef-1f1f5.png",
            //             "review": "Seller was extremely communicative and always responded very quickly even on his/her day off (Sunday). While I got something that will get my started and I suppose I got what I paid for (the price was definitely quite low), I would be hard pressed to call the designs I got as \"modern\" or \"minimalist\" like the logo presented in the profile. They felt like clip-art from 10 to 15 years ago attached to my website name.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "tracyblehm",
            //             "country": "Canada",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
            //             "review": "I was a little nervous as I had never hired anyone before and have had bad experiences on other platforms. However this was absolutely marvelous. I loved the design. It was shocking how fast it was done and how amazing it turned out. I will definitely be hiring them again for my other projects that are coming up. Thank-you!!",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "jai_s22",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "Using this service was a pretty decent experience. It took a bit longer than I wanted to finally get the final design. I had to go back and forth for a week trying to find the correct revision of the design. At first, I thought the experience of the designer was not the best due to finding some logos with minimal effort. Once I messaged the designer that I felt that the designs that they were producing were not satisfying me, they then were able to put a lot of effort into my ideas. I personally had to come up with the design of my logo instead of them using their experience and trusting them to come up with one themselves. Eventually, they did deliver so I am happy with the way it finished.",
            //             "reviewedAt": "Published 2 weeks ago"
            //         }
            //     ]
            // },
            // {
            //     _id: "i134",
            //     owner_id: "u134",
            //     owner_rate: 5,
            //     title: "I will do professional modern business logo design with copyrights",
            //     about: "Welcome to Budding Solutions. An agency of 15+ Graphic Designers with great expertise. We strive to provide unique & graphically rich designs with exceptional & lifetime customer service. Let us be your GO-TO option for your graphic design needs and you won't be disappointed.",
            //     price: 105,
            //     owner: {
            //         _id: "u134",
            //         fullname: "shailene_george",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3ec0d56f436079ef157dbcc1d21c4c62-1625030446037/1c926a30-7aa5-4de8-9a3b-6565be7ddd5b.jpg",
            //         level: "basic/premium",
            //         rate: 5
            //     },
            //     country: "Pakistan",
            //     daysToMake: 21,
            //     description: "Greetings!! Welcome to Budding Solutions.\n\"Your one-stop-shop for all your graphic needs\"\nIf you are looking for a Modern and Professional Business logo design, then you are at the right place. We focus on creating simple yet effective designs that elevate your business outlook and leave an everlasting impression.\nWe stand out from our competition due to our best-in-class Customer Support and Quality Designs.\nWhy Us?\n✔ Combination of experience and creativity\n✔ Unique and original designs\n✔ Superior customer care and satisfaction\n✔ Transparent and High-resolution image types\n✔ Different types of source files (AI, EPS, PDF and SVG)\n✔ Complete Branding Guide\n✔ Unlimited revisions until you are 100% satisfied\n✔ Full Copyrights\nMASCOT DESIGNS ARE NOT INCLUDED IN BASIC OR STANDARD GIGS.\nTHE DESIGNS SHOWN ON THE PORTFOLIO ARE FROM STANDARD OR PREMIUM PACKS.\nLogo Design | Professional Logo | Modern Logo | Badge | Hand drawn | Feminine | Signature | Business Logo\nWe look forward to working with you. Please don't hesitate to reach out at any time with any questions.\nPlease review the FAQ section for further clarification.",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142024147/original/25c0cb214ccc1e1458cb975cddec0e3e348f75ee.jpg"],
            //     tags: [
            //         "modern logo",
            //         "logo",
            //         "custom logo",
            //         "creative logo",
            //         "professional logo",
            //         "logo maker"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "bossymouse",
            //             "country": "Netherlands",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
            //             "review": "I'd recommend this seller. She was skilled and very communicative. Also I got tons of revisions as promised and always quickly. Sometimes it was hard to get her to polish the details as I intended, I think because of the language barrier, but if a revision turned out different than I expected she started working on it again without asking questions. Lastly she gave tips about branding when needed. To be honest I'm not quite sure if the social media kit and website optimized image were worth my money, because those were mostly the same image in different ratios. But I probably had unrealistic expectations. On the other hand the copyright document is very polished and accurate!",
            //             "reviewedAt": "Published 1 week ago"
            //         },
            //         {
            //             "name": "coastalcleaners",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "I'm so grateful & thrilled that I can say, my experience was a sucess! I love my LOGO that Shailene created, I couldn't be happier! I reached out and let her know exactly what I needed, she promptly responded and made me an offer. I couldn't refuse, as she was more than willing to accommodate my budget. She sent me the drafts soon after, and I was pleased to see the results! I didn't need any revisions and I'm pleased to say that I've now got a NEW LOGO For my Brand/Company. I officially feel Accomplished! Thank you SO Much Shailene and Fiverr! You have made this journey so much lighter on my feet, and I would definitely recommend Shailene as an Artist and the Fiverr company!",
            //             "reviewedAt": "Published 3 weeks ago"
            //         },
            //         {
            //             "name": "ndethlefs",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "This was the first time I've used Fiverr and was a little worried how it would go. This was by far the best experience I've had working with someone remote and at a fair price. shailene_george always got back to me right away. I couldn't be happier with my experience and will also being recommending George to anyone I can and using again when needed. 5 stars all the way here!",
            //             "reviewedAt": "Published 3 weeks ago"
            //         },
            //         {
            //             "name": "mrmikevh",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "Shailene is awesome to work with. Very professional and attentive. She deliveries amazing work at a value you just can't find anywhere else. As a busy front-end developer, I find buying her premium GIG is the way to go. My clients are always blown away with her work. She has made me a customer for life with her work and her friendly personality. Thank you Shailene and bless you. Can't wait for our next GIG together.",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "j_powell23",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "A friend of mine (Maximum Performance Productions) recommended Fiverr. I'm starting a new business and needed a design to catapult us to new heights. It didn't take long to find the right artist. Shallene was able to capture my idea and interpret it into the design that I am very pleased with. Her communication skills and response time are second to none. She is very informative and answered all my questions satisfactorily. Shallene performed her tasks timely and without delay. I am forever grateful for the outstanding designs she has provided and would highly recommend her to anyone. Thank You Shallene!",
            //             "reviewedAt": "Published 1 week ago"
            //         }
            //     ]
            // },
            {
                _id: "i135",
                owner_id: "u135",
                owner_rate: 5,
                title: "I will write you an attractive instagram bio",
                about: "Thanks for stopping by! I'm a Social Media Specialist with 8+ years experience. I can help with all your Social Media related tasks! Send me a message. Let's get it done!",
                price: 155,
                owner: {
                    _id: "u135",
                    fullname: "bellavida123",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9e2d7f453419c08e138fbfe9e65347df-696051281638594671.588431/DD8E6DDC-C231-47D3-B61A-97274452D3BF",
                    level: "basic/premium",
                    rate: 2
                },
                Languages: "English,Swahili,Turkish",
                country: "Jamaica",
                daysToMake: 25,
                description: "The FIRST thing a potential follower sees on your page is your bio.\nStand out, and build trust with a bio that informs and captivates everyone who views it. This will not only attract new people to your page, but it will keep them there!\nYou've seen those profiles on Instagram that look amazing, and you deserve that for your business too.\nGet the Instagram bio you need, and with it, more followers and clients!\nWhat you'll receive:\n⭐ One unique, professionally designed bio\n⭐ A captivating layout that engages your viewers\n⭐ A call to action, if required\n⭐ 24 hour delivery\n⭐ 100% Satisfaction Guarantee\nLet's build you a great Instagram page that is sure to bring AND KEEP followers.\nIf you BUY a gig from me always feel free to request a revision if you need any part of your order revised. Thank you.",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/157827646/original/8f14f50a81ddd1a60b4af990ea5154a26975d150.jpg"],
                tags: [
                    "bio",
                    "instagram marketing",
                    "instagram",
                    "social media",
                    "social network"
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "bswoll51",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "She was amazing! Told me exactly when she would start. Got it done and over-delivered! Tips to grow my following and exclusive tailoring of my bio. She can call me The Terminator because I'll be back. 🤣",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "dawnmichaela",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "My bio turned out better than I could have hoped for! She took all my words and ideas and turned it in to a clear and powerful bio. I highly recommend working with her. She is easy to communicate with, responds quickly, and got it done fast. I would definitely use her again.",
                        "reviewedAt": "Published 1 week ago"
                    },
                    {
                        "name": "iidark",
                        "country": "United Kingdom",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        "review": "Wonderful working with this seller. The work is as promised and delivered on time and on point. I would definitely recommend their work, in fact I'm about to book another gig from them.",
                        "reviewedAt": "Published 2 weeks ago"
                    },
                    {
                        "name": "singh_manu1313",
                        "country": "New Zealand",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ff.png",
                        "review": "She is really good. I ordered two bio and both are amazing. Very easy to convey the message. And she did exactly what i was looking for. Definitely recommend",
                        "reviewedAt": "Published 1 week ago"
                    },
                    {
                        "name": "charliericeiii",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Thank you so much for creating my bios for me on my social media pages. We got it right how we wanted it to I appreciate that. God bless!",
                        "reviewedAt": "Published 3 weeks ago"
                    }
                ]
            },
            // {
            //     _id: "i136",
            //     owner_id: "u136",
            //     owner_rate: 5,
            //     title: "I will create an effective instagram hashtag growth strategy",
            //     about: "Hello! My name is Tommy. I am a multi-displinary marketer with experience in both the Western and Chinese digital marketing landscape. I am passionate about crafting impactful experiences and digital marketing strategies at the intersection of brand and product. I have worked in London, Hong Kong and in Shanghai for companies such as the Adidas, L'Oreal, Pfizer and Danone I currently offer Instagram growth and TikTok marketing strategies on Fiverr",
            //     price: 101,
            //     owner: {
            //         _id: "u136",
            //         fullname: "tommysiu",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/429c1a9395f66cd8a36b38028ff35aa6-1550219507580/db25059c-6725-4e49-bf82-fa4d2af0a780.jpg",
            //         level: "basic/premium",
            //         rate: 4
            //     },
            //     country: "Hong Kong",
            //     daysToMake: 21,
            //     description: "Why me?\nI have worked with Fortune 500 brands such as Adidas, L’Oreal, Xiaomi & Pfizer on numerous marketing and branding campaigns.\nI’ve successfully delivered 4000+ hashtag strategies with over 2600+ happy clients to help them achieve organic instagram growth.\nWhy my service?\nI will strategically research, analyze & handpick best-performing hashtags tailored to your Instagram account. I will teach you:\n✅ How you can effectively use hashtags to rank and grow organically\n✅ How to avoid bad hashtags to avoid negative growth\n✅ Stand out from your competition and increase your sales\n✅ How to increase traffic and conversion organically\n✅ Account optimization and posting secrets to gain new Instagram followers\nWhat will you get?\n✅ Data-backed high-ranking hashtags tailored to your niche and brand\n✅ Profile optimization so you can be discovered quickly\n✅ Personalized hashtag strategy to help you grow and increase your followers\n✅ Expert video guide to teach you to find high-ranking hashtags\n✅ Monthly newsletter based on Instagram's newest algorithm updates\n✅ Masters Course 2021/2022 (Platinum or Diamond Gig)",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/video/upload/so_0.0,t_gig_cards_web/jylhbgosxfqilptpru24.png"],
            //     tags: [
            //         "instagram hashtags",
            //         "instagram marketing",
            //         "instagram",
            //         "instagram growth"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "jayebiz",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "I am very new to organic growth and trying to work Instagram in the best way possible for my business. I found this seller on a whim and WOW. I know that a lot of his reviews say that he is amazing but I didn't expect nearly HALF of what I got. It was so good that I immediately printed it out and made it into my own little book to reference as I go through the process of building my Instagram audience. In all honesty, I think that he should charge way more for what he gives. I can't believe I got so much value at this very fair price! Thank you so much and I can't WAIT to implement your strategies starting TODAY!!",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "basayra",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "I was very very skeptical. Since this is my 1st business. I truly appreciated I was able to communicate with him and let him know about my \"unique\" nitch. Before we even proceeded he asked for my Instagram to make sure he could provided the services I requested. I was not prepared for the the whole breakdown!! I am shocked as to how much information I received for the price. Not only did i receive information regarding hashtags, but when to post, what to write under the post, how to not repost to the same things to become saturated . I can't wait to implement this new information to my Gram. Sooooo yeah about my unique niche go follow @ba_sayra.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "marialeeheller",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "As other sellers described- the service is excellent, especially for the price. I did notice some spelling errors but that did not detract from the overall informative report. I am very pleased with the delivery and I learned A LOT. Also, the hashtags he provided were on point- very impressed. Let me preface this by saying that I had purchased similar hashtag research from another top seller on this platform and what I received was subpar. My business has elements of sustainability that I haven't pushed too much (because the 100% sustainable products haven't launched yet), but he picked up on it and delivered results that included this. 👏👏👏",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "soniabukh",
            //             "country": "Italy",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f9.png",
            //             "review": "Tommy is absolutely great! My expectations were high because of all the other excellent reviews, but wow he really does go above and beyond! I got the most basic hashtag strategy package and not only did he do a great job with it, he also included a lot of bonus information and tools. If you're tired of not knowing how Instagram works and trying random tactics hoping they'll work and get your account seen, let me offer you a suggestion: buy this gig! You won't regret it! I can't wait to start implementing all his great advice. P.S. Communication was great and delivery was on time!",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "ricarda20",
            //             "country": "Germany",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
            //             "review": "Wow, I agree with everything everyone else said: Tommy overdelivers by far. What an amazing package. Thank you so much Tommy. It will take awhile to work through it but wow, I am speechless. To everyone who is considering using Tommy's service: DO IT!",
            //             "reviewedAt": "Published 1 week ago"
            //         }
            //     ]
            // },
            // {
            //     _id: "i137",
            //     owner_id: "u137",
            //     owner_rate: 5,
            //     title: "I will do organic promotion and marketing for youtube monetization",
            //     about: "I am trained in online marketing, and I have studied SEO, Ads (Google, Facebook, Bing...), I have 6 years of experience in digital marketing, in which time working at fiverr is 3 years, with more than 2000 completed orders, the main work that I do is: - Youtube seo and promotion - SEO - Website traffics - Spotify promotion - Instagram promotion Contact me if you have any questions!",
            //     price: 87,
            //     owner: {
            //         _id: "u137",
            //         fullname: "farah_youtube",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5db4b0cccf5a3e138a9f57542175248c-1620011414308/8d7f7d68-efe9-465e-80d2-aedcc548efdb.JPG",
            //         level: "basic/premium",
            //         rate: 5
            //     },
            //     country: "Vietnam",
            //     daysToMake: 7,
            //     description: "Do you want to Monitize your YouTube Channel?\ni'm the best for digital media marketing, i will help you make youtube monetization\nSafe methods we use:\n· Web 2.0\n· iFrame Embedding\n· PPC advertising campaign\n· Do SEO friendly Video optimization\n· Will share video in Suggested & related videos\n· Add video in Niche related playlists for more impressions\nI strictly follow YT and Fiverr TOS so it means you will get organic You Tube Promotion for your channel monetization.\nREQUIREMENT:\nChannel Link\nWhat do you get from this gig?\n● Watch time boost\n● Compliance with YT TOS\n● Fully Organic And Real Traffic\n● 100% chances of monetization\n● Naturally helps in Video Ranking\nThink that your best friend is Elon Musk, and tomorrow morning you are asking him to post a post asking people to watch your vide0, probably you will get monetized in less than an hour!\nI do the same, just without Elon Musk :)",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/167364631/original/ddbe1967fc0deba979b6d66f2871051245a1544a.jpeg"],
            //     tags: [
            //         "youtube",
            //         "monetization",
            //         "youtube channel",
            //         "youtube promotion"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "tonyamajette",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "The seller got me the promotion that I needed, however, she stated that I could contact her if I had any problems and I did and she was not helpful. This is my second gig with her and she was great at many things but not so much at helping me to understand or correct issues with the result of her efforts. I had planned to use her for many other gigs but in light of her response to my request for help, I cannot. I do recommend her for getting you the numbers that you need but if you are denied, do not expect any help from her to actually get passed the review process for monetization.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "robertpetyko",
            //             "country": "Hungary",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ed-1f1fa.png",
            //             "review": "She delivered as promised. I was sceptical . I bought a smallest package. My watch hour went up. Also gained a lot of subscribers. Some been deleted. But what`s been promised been delivered. So well done !",
            //             "reviewedAt": "Published 1 week ago"
            //         },
            //         {
            //             "name": "brucefrausto893",
            //             "country": "Thailand",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
            //             "review": "she increased my subscribers amount by a little over 1000 subscribers and over 4000 watch hours. I recommend to anyone who wants a boost for their channel.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "vwgbooks",
            //             "country": "United Kingdom",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            //             "review": "The gig was good, nothing amazing. I didn't really notice any difference when using this gig. Watch time, subs didn't increase that much. I did order the lowest gig, so I wasn't expecting big numbers or anything. It was a good gig and the seller was easy to work with.",
            //             "reviewedAt": "Published 2 weeks ago"
            //         },
            //         {
            //             "name": "dulline",
            //             "country": "Romania",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f7-1f1f4.png",
            //             "review": "I just want to be short and clear she is the BEST ! Very happy and satisfied what she did to my youtube channel ! A lot of subscribers and more what she said and more watch hours.If you want to grow your youtube channel fast and organic 100% real she is the ONE who can do it ! Thank you very much Farah !",
            //             "reviewedAt": "Published 2 weeks ago"
            //         }
            //     ]
            // },
            {
                _id: "i138",
                owner_id: "u138",
                owner_rate: 5,
                title: "I will develop a content strategy for your brand or business",
                about: "Hello! My name is Maria, and I am a digital marketer with over 3 years of experience working with diverse brands and businesses. I am well versed in everything marketing, SEO, graphic design, writing, and video editing. I am a one-stop shop for whatever you and your brand needs. I look to working with you!",
                price: 162,
                owner: {
                    _id: "u138",
                    fullname: "mariarotunda",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d098c50d82476b11568f3a50111a8a89-1636128369729/ef737ebd-6908-47bc-be50-963dabe16d0e.jpg",
                    level: "basic/premium",
                    rate: 2
                },
                Languages: "English,Swahili,Turkish",
                country: "United States",
                daysToMake: 27,
                description: "Quality content, industry-specific keywords, and a social media plan will help your business and brand soar! I am a digital marketing strategist and content creator who is ready to help build your online presence.\nWhat you will get:\nAn evaluation of your current page(s) to identify your strengths and weaknesses\nA custom strategy specific to your brand, mission, and standards\nCustom designed graphics created for your target audience\nSEO optimized keywords to use in captions and as hashtags\nAround the clock customer service and communication to help you with anything and everything you need\nI am here to take your brand to the next level! Message me with any questions you have.",
                imgUrl: ["https://fiverr-res.cloudinary.com/video/upload/so_1.760625,t_gig_cards_web/ffupfvrslj3mos2byhrh.png"],
                tags: [
                    "instagram marketing",
                    "web marketing",
                    "social media manager",
                    "social marketers",
                    "seo marketing"
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "thaddeuswill410",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Omg, This seller was amazing and exactly what we needed.. We were kinda in a funk and need to be saved. She did just that with amazing energy, a wonderful attitude and passion for what she does. The strategy was perfect, Thanks again for bringing us great value.. Highly Suggested..",
                        "reviewedAt": "Published 2 weeks ago"
                    },
                    {
                        "name": "nickjuliano",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Excellent job! Ive been using Fiverr for 3 years now and by far one of the best results/deliverables that I’ve gotten. The video describing what you did was a step above the rest. I’ll definitely be implementing your suggestions. I appreciate all of your hard work.",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "joshuanathan474",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Really smooth transaction. She went above and beyond in detail for the marketing / brand style guides. Looking to get more tasks completed with the Seller.",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "onyxwoman",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "She did a really good job that prompted me to make some badly needed changes. The advice was really good. I especially liked the video input.",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "tcbrownvo",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Provided excellent service and good direction. Thank you.",
                        "reviewedAt": "Published 1 week ago"
                    }
                ]
            },
            {
                _id: "i139",
                owner_id: "u139",
                owner_rate: 5,
                title: "I will perform research on any subject matter for you",
                about: "I am a current Doctoral Researcher with a strong research and scientific history, having published academic papers and presented at numerous international conferences. I have a BSc (Hons), a MScR, and have nearly finished my PhD. My experience has given me excellent research and written communication skills, as well as knowledge of how to present and illustrate data digitally. I am highly experienced in the use of the Microsoft Office and Adobe suite of apps. Outside of my career I am very interested in applying my scientific training to aspects of fitness and nutrition.",
                price: 59,
                owner: {
                    _id: "u139",
                    fullname: "struhenderson",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/eb6eef20969192eca1d8b1301e91cb4f-1630440851285/60f03cc4-71f2-437b-a241-f9423b6e2728.jpg",
                    level: "2",
                    rate: 3
                },
                Languages: "English,Swahili,Turkish",
                country: "United Kingdom",
                daysToMake: 18,
                description: "I have over 5 years of experience conducting high-quality, detailed research throughout my Master of Science by Research degree and PhD programme.\nThe training and projects I have undertaken in my degrees have given me the ability to efficiently source key information. In particular, the niche research required for academic theses has made me proficient at sourcing the most relevant details.\nFurthermore, I have learned how to synthesise a lot of information in a short period of time, incorporate it into further research, and write what I have learned into top-quality publications. This allows me to pinpoint the most important information and produce concise, detailed summaries.\nI will provide a document in whichever format you require (e.g. Word.docx, Adobe.pdf) complete with a detailed summary, references and links should you wish to conduct further research. If you would like me to conduct follow-up research based on what I have provided, please do not hesitate to get in touch for discounted rates.\n<---- PLEASE NOTE: I will not write academic articles, essays or papers. ---->\nPLEASE GET IN TOUCH BEFORE ORDERING TO DISCUSS YOUR REQUIREMENTS.",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/222820209/original/50b95e0afd209c75fa3693b835fd0db671249736.png"],
                tags: [
                    "online research",
                    "research",
                    "internet researcher",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "veeg10",
                        "country": "Jordan",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ef-1f1f4.png",
                        "review": "Amazing work! Every word is unique and all ideas were related to the research even though, the research question had some complexity. He even went extra miles and Straun is very genuine with great communication. I recommend Straun to anyone seeking for an excellent, clear research. THANKS! I am keen to see the next research!",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "schapes47",
                        "country": "Netherlands",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
                        "review": "Struan´s research is outstanding. Meticulous work and a stellar ability to synthesize information in the shortest amount of time. The price is also very fair taking the quality of the research into consideration. Can only recommend and if I ever need assistance in research I know whom to work with again!",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "harrybenham228",
                        "country": "United Kingdom",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        "review": "Once again, Struan exceeded expectations and delivered an excellent research review. He implements a lot of referencing, proving his depth of research- I will definitely work with him again, thank you!",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "harrybenham228",
                        "country": "United Kingdom",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        "review": "Struan's work is exceptional! His communication, service and final delivery were of the highest quality and even better than expected. I will definitely choose him for research work again!",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "bossbroc",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "My absolute go-to researcher!",
                        "reviewedAt": "Published 3 hours ago"
                    }
                ]
            },
            {
                _id: "i140",
                owner_id: "u140",
                owner_rate: 5,
                title: "I will provide quality essays research and summaries on any topic",
                about: "I am an enthusiastic and proficient writer with 4+ years of research related experience. My journey in the writing industry kicked off at the University where I did countless research and gained more experience. I will assist you with any kind of research and solve your different business needs. Please reach out for excellent and timely work.",
                price: 71,
                owner: {
                    _id: "u140",
                    fullname: "victoriaeva610",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/34a47e49caa09a703d81ef0621ad0ac1-1626197544385/3cb9eb7a-2163-4722-a1b0-0ddb9eb04d4e.png",
                    level: "basic/premium",
                    rate: 4
                },
                Languages: "English,Swahili,Turkish",
                country: "Kenya",
                daysToMake: 18,
                description: "GET CUSTOM ORDERS, QUALITY WORK, AND AN AMAZING EXPERIENCE\nIf you're looking for a professional researcher and a committed writer for all your writing needs, click on this gig because I can't wait to work with YOU.\nI am an expert writer with over 8 years' experience. I guarantee quality, original content written from scratch, plagiarism free, and delivered within the shortest time possible. My main areas of expertise are\nResearch\nEnglish\nHistory\nBusiness\nPsychology\nnursing, arts\nEducation\nCriminal justice\nSociology\nSupply chain\nLogistics\nCase studies\nMarketing\nSummary Writing\nI will offer YOU:\n100% Plagiarism free content\nTimely turnaround\nTop-notch grammar\nWell researched and referenced content\n24/7 Customer support\nKindly contact me before placing an order.\nPS: Custom orders also available upon request",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/217276086/original/6a004b8b82868ab02836bdfcb42c4a0e4b042f87.png"],
                tags: [
                    "reports",
                    "articles",
                    "internet researcher",
                    "summaries",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "isabellaava851",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "The seller went above and beyond and highly recommend u look no further. Her ability to create such detailed projects has convinced me that she is the best at what she does and will work with her again and again.",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "lincoingabriel",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "This seller was extremely communicative, which I really appreciated. The seller was prompt with the delivery and the work was professionally done! I would highly recommend and use the services again!",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "tiffanyhaddish",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Awesome at communication and writing. Really sweet and understanding, goes above and beyond to assure customer satisfaction!! 5 out of 5 recommend!!!",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "loganmax688",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "a great buyer with great understanding on the task, I will definitely come again and again, I am really impressed.",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "candiceaponte",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "She got me my assignment back in 6 hours. Thank you so much",
                        "reviewedAt": "Published 7 hours ago"
                    }
                ]
            },
            {
                _id: "i141",
                owner_id: "u141",
                owner_rate: 5,
                title: "I will deliver quality case study analysis, articles, research and summaries",
                about: "I am a professional and diligent writer with more than 6 years experience as a freelance writer. My goal is your satisfaction and to deliver work that you will appreciate. Writing is my passion and I aim to do excellent work for all my clients that will meet the set goals and standards.",
                price: 103,
                owner: {
                    _id: "u141",
                    fullname: "angela_637",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/03e667c26a63c20863e016917c423eb0-1622910916319/85930fed-bb45-4b01-b117-3913f19b77d7.PNG",
                    level: "basic/premium",
                    rate: 4
                },
                Languages: "English,Swahili,Turkish",
                country: "Kenya",
                daysToMake: 11,
                description: "Hi, thank you for clicking my gig.\nKindly contact me before placing an order to discuss the requirements and check for availability.\nAre you looking for a professional for your essays, articles, case study, reflections, summary and research work? Then look no further, you are on the right PLACE.\nI am here to provide you with high-quality and professional services. I have been in the writing industry for over six years. As a researcher, I have a keen interest in identifying major problems and proposing better solutions/recommendations against them.\nWhat you will get from this gig?\nUnique and creative content\nOn-time delivery\nEngaging content\nWell researched and quality work\n100% plagiarism-free\nN/B: I OFFER SERVICES ACCORDING TO FIVERR TERMS OF SERVICE (TOS).",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/210082068/original/f1d222ff641f41a63cce8235a6a5128f05b477bc.jpg"],
                tags: [
                    "research and summary",
                    "case study",
                    "research",
                    "summary",
                    "articles",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "myaznd",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Her work is absolutely amazing ! Delivered on time and very accommodating . would definitely recommend . I will be reaching out again .",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "evanclark",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "excellent experience. Angela delivered exactly what she said she would. Very thorough and High quality of service and communication. will definitely work with again!",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "ronneishapicket",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Didn’t need any modifications was absolutely perfect ! Got me an A so I highly recommend! And will be shopping in the future",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "klemicha",
                        "country": "Austria",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
                        "review": "Angela did a great job in a short time, understood the task easily, communicated well & has good language skills. Thanks a lot :)",
                        "reviewedAt": "Published 1 week ago"
                    },
                    {
                        "name": "whatsrealeasy",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "great work on the research",
                        "reviewedAt": "Published 4 days ago"
                    }
                ]
            },
            {
                _id: "i142",
                owner_id: "u142",
                owner_rate: 5,
                title: "I will do market research, business research, swot analysis, and competitive analysis",
                about: "Hi, my name is Lay. I'm a professional writer in Microsoft word, excel, PowerPoint expert with years of experience. Through my time of work, I have been able to manage tasks such as document formatting & editing, designing, cleanup, and typing of documents for both individual firms and local governments, having worked that long I'm proficient and have the capacity in executing tasks involved in different fields requested by the client. Welcome, let us work together. regards, Troyeb84.",
                price: 72,
                owner: {
                    _id: "u142",
                    fullname: "layee84",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b398d51589f16ed08ca0510c2c5edbe2-1636020659427/ecb5ae5e-d22a-47bc-bd9f-e7b2f99c0994.jpg",
                    level: "3",
                    rate: 2
                },
                Languages: "English,Swahili,Turkish",
                country: "Kenya",
                daysToMake: 4,
                description: "Hello Fiverr Community,\nThis is Layee, A professional Business Consultant.\nBefore venturing in to any field in the business sector, it’s important to carry out a prior study, and carry out market research on that particular business.\nI will carry out a comprehensive market research for you, and come up with a detailed market research report.\nThe Market Research Report will cover the following areas depending on the package & availability of information: -\n· Market Research\n· Competitor analysis\n· Industry analysis\n· Product Research\n· Market Segmentation\n· Porter's Five Forces Analysis\n· Pestle Analysis\n· Market Trends\n· Market Drivers\n· Marketing Mix\n· Market Size\n· Total Available Market (TAM)\n· Demographics\n· SWOT Analysis\n· Market Growth\n· Marketing Options\n· Marketing Strategies\n· Future Markets\n· Web Research\n· Business Plan (Gig Extra)\nAnd Many More….\nThe success of your business is my primary objective/priority, and will offer all these services so that you are able to achieve your business objectives easily, and on time (or",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/232972469/original/679ec7f5d8e49604c2290664620969803d96f7c7.jpg"],
                tags: [
                    "competitive analysis",
                    "business research",
                    "market research",
                    "reports",
                    "swot analysis",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "njameshoward",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Great communication and speed",
                        "reviewedAt": "Published 2 weeks ago"
                    },
                    {
                        "name": "lucasnowak224",
                        "country": "Pakistan",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f5-1f1f0.png",
                        "review": "Brilliant communication, time management and highly appreciate the hardwork and input.",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "lucasnowak224",
                        "country": "Pakistan",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f5-1f1f0.png",
                        "review": "Met tight deadline with great communication and cooperation.",
                        "reviewedAt": "Published 4 weeks ago"
                    },
                    {
                        "name": "muradyoussef",
                        "country": "Austria",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
                        "review": "verrrrrrrrrrrrrrrry gooooooooooooooooood",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "cantillo16",
                        "country": "Costa Rica",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1f7.png",
                        "review": "Excellent service",
                        "reviewedAt": "Published 2 months ago"
                    }
                ]
            },
            {
                _id: "i143",
                owner_id: "u143",
                owner_rate: 5,
                title: "I will translate english to hebrew and hebrew to english",
                about: "Hi guys! I am a native level speaker (reader, writer, typer, dreamer) of Hebrew and English, and I live in beautiful Israel. I can translate English to Hebrew and Hebrew to English, for any type of content you need - articles, blog posts, social media posts, ads, books, presentation, reports and many more. I am SUPER organised and LOVE what I do. So let's start working on your projects! Contact me :)",
                price: 120,
                owner: {
                    _id: "u143",
                    fullname: "shiranmor17",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2077b8d6eeb98061673b868ec51a9267-1636915857681/b31b149f-5e31-46bd-9a2e-27e94cc3e5e2.jpeg",
                    level: "basic/premium",
                    rate: 4
                },
                Languages: "English,Swahili,Turkish",
                country: "Israel",
                daysToMake: 28,
                description: "Hello and welcome to my gig!\nI am Shiran and I have 3 years of experience in translations and 6 years of writing experience (Hebrew and English). I make a high-quality, accurate translations from Hebrew to English and English to Hebrew. I DO NOT USE GOOGLE TRANSLATE.\nI can translate any topic and many types of content. I will translate almost any text, article, book, social media posts, subtitle and even websites.\nNo technical or legal translation or transcription.",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/232298461/original/e2872bd49bcb0a344ca35cae4e6a858dbf794fb7.png"],
                tags: [
                    "hebrew to english",
                    "accurate translation",
                    "english to hebrew",
                    "hebrew",
                    "translation",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "adamronde",
                        "country": "Israel",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
                        "review": "I got my document translated by the deadline, with high efficiency and translation level. I got nice inputs and comments that helped the final delivery be excellent. thank you a lot for providing a great service.",
                        "reviewedAt": "Published 2 weeks ago"
                    },
                    {
                        "name": "worldpressnow",
                        "country": "Germany",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
                        "review": "Good communication, very friendly and quick delivery!",
                        "reviewedAt": "Published 2 weeks ago"
                    },
                    {
                        "name": "osherbanay1",
                        "country": "Israel",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
                        "review": "Amazing! very accurate and very quick, pleasure to work with!",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "talleizer",
                        "country": "Israel",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
                        "review": "shiran do a great job definitely recommanded",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "idankayam",
                        "country": "Israel",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
                        "review": "great she is the best",
                        "reviewedAt": "Published 1 month ago"
                    }
                ]
            },
            // {
            //     _id: "i144",
            //     owner_id: "u144",
            //     owner_rate: 5,
            //     title: "I will perfectly translate from russian to english or from english to russian",
            //     about: "In 2014, I joined Fiverr to offer professional Russian to English and English to Russian translation services. I hold a Master of Arts degree in Spanish and English and graduated from Russian Military University in 2009. I worked in Uganda, Thailand, Russia, and several other countries, and I'm open to all cultures and nations. I have huge experience in the field of Russian and English philology. I really love dogs because they are my life and my passion... especially Dobermans ^__^. Hire me and unleash the power of Russian military translator and interpreter.",
            //     price: 69,
            //     owner: {
            //         _id: "u144",
            //         fullname: "vovkaslovesnyy",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/profile/photos/3232052/original/1484208202021_Profile.png",
            //         level: "basic/premium",
            //         rate: 2
            //     },
            //     country: "Russia",
            //     daysToMake: 15,
            //     description: "**The one and only Top Rated Seller with flawless Russian as the mother tongue (34+ years in Moscow)**\nOn this page, you can order professional and flawless Russian to English translation and English to Russian translation by a native and experienced Russian and English translator.\nI work in the field of Russian to English and English to Russian translation since 2009 and have successfully received a diploma with honors and a Master of Arts degree in Spanish and English.\nIn case if you are looking for perfect quality at the best price, I am your best choice!\nI offer the following:\n- An individual approach for every customer\n- My goal is quality, and I will never make something average just to finish it as fast as I can\n- Free correction after implementation is offered for all the orders\n- Flexible rules and ultimate solutions for my customers\n- I research translated topics, reading articles and related websites in order to get the context\nI have vast experience in Russian and English translation of\n- religious documents\n- whitepapers (ICOs)\n- software\n- games\n- websites\n- CMS\n- agreements\n- manuals\n- subtitles\nand other materials\nOrder Russian and English translation",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3296856/original/767ea5cb0ccd4893231d198cbd1e7a82a42d1faf.jpg"],
            //     tags: [
            //         "english to russian",
            //         "russian to english",
            //         "translate",
            //         "translation",
            //         "russian"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "alzano2020",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "I needed a document translated ASAP on Friday night! I had a high quality translation by the time I woke up own Sat morning. Great job! Highly recommended.",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "marianabolivar",
            //             "country": "United Kingdom",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            //             "review": "Vladimir, you are the best. Always professional, very quick delivery. I recommend your gigs to anyone who need a reliable and excellent Russian/ English translation.",
            //             "reviewedAt": "Published 4 weeks ago"
            //         },
            //         {
            //             "name": "lhancha",
            //             "country": "Morocco",
            //             "flag": "Was very thorough and professional. Completed the work accurately and in a timely manner. I will order again in the future. Thank you.",
            //             "review": "Was very thorough and professional. Completed the work accurately and in a timely manner. I will order again in the future. Thank you.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "smc_rus",
            //             "country": "Latvia",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f1-1f1fb.png",
            //             "review": "You are the best, thank you!",
            //             "reviewedAt": "Published 2 days ago"
            //         },
            //         {
            //             "name": "smc_rus",
            //             "country": "Latvia",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f1-1f1fb.png",
            //             "review": "Perfect communication and translations, thank you!",
            //             "reviewedAt": "Published 3 days ago"
            //         }
            //     ]
            // },
            // {
            //     _id: "i145",
            //     owner_id: "u145",
            //     owner_rate: 5,
            //     title: "I will provide a professional manual english to french translation",
            //     about: "French native translator/copywriter born in Paris & I grew up in the U.S. If you've been looking for a writer that'll actually get you results, you've just found him. Some of my clients: Kayak, L’Express (black Friday event), Viral launch, publishing companies, etc...",
            //     price: 87,
            //     owner: {
            //         _id: "u145",
            //         fullname: "quantz75",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/aeb50869a3c9aa4f4d01a4a5076780d8-1597753670171/66b99c65-4308-4b81-a088-b0610d5d75b6.jpg",
            //         level: "basic/premium",
            //         rate: 5
            //     },
            //     country: "France",
            //     daysToMake: 6,
            //     description: "Who am I?\nI'm a French native translator (copywriter) born in Paris working as a freelancer since 2008 for well-known clients and agencies (KAYAK, L'EXPRESS, Expedia). If you've been looking for a French translator that'll actually make your translation accurate (english to french translation & french to english), you've just found him.\nI will :\nTranslate from English to French and French to English\nMake it sound natural (localization)\nFor resumes, documents, PDFs, and Amazon listing please message me first.\nWhy should you choose me?\n\"We highly recommend Alexis. He read the guidelines carefully and provided a top-quality output. And now he is working on another project with us.\" L'EXPRESS (Black Friday content)\n\"Alexis was very willing to take on new work, responded fast to messages, and finished the work ahead of schedule. He is open to changes and very flexible. I recommend him for any French translation work.\" KAYAK\nI've written and translated content into French / English for small businesses, entrepreneurs at all levels, Fortune 100 and tech giants, as well as celebrities and bestselling authors.",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/129378192/original/accecd46dd68bf0eae72b5c91db4edc34c625cd3.jpg"],
            //     tags: [
            //         "french to english",
            //         "translate french",
            //         "english to french",
            //         "french translation"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "patmangan",
            //             "country": "Canada",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
            //             "review": "I needed a resume and cover letter translated from English to French. This gentleman not only did a fantastic job in translating the language, he equally conveyed my tone of voice through the translation (it still sounds like I wrote it). In addition to a job perfectly done, the communication was clear and the delivery was quick. I am impressed by the quality of work, especially for the great price.",
            //             "reviewedAt": "Published 3 weeks ago"
            //         },
            //         {
            //             "name": "amandasap",
            //             "country": "Canada",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
            //             "review": "Translated 3 different json files for me, quick and accurate service, and seller is very easy to communicate with. Will order again in the future",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "purhealth",
            //             "country": "Canada",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
            //             "review": "Very accurately translated from English to French. The editing to our document was also completed. A pleasure to work with!",
            //             "reviewedAt": "Published 1 day ago"
            //         },
            //         {
            //             "name": "jimbob",
            //             "country": "Ireland",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1ea.png",
            //             "review": "Great job. Done in record time. I will definitely use this seller again. Highly recommended for French translations",
            //             "reviewedAt": "Published 1 day ago"
            //         },
            //         {
            //             "name": "aliaksandra_nik",
            //             "country": "Belarus",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e7-1f1fe.png",
            //             "review": "Thank you for the fastest delivery and great translation!",
            //             "reviewedAt": "Published 2 days ago"
            //         }
            //     ]
            // },
            {
                _id: "i146",
                owner_id: "u146",
                owner_rate: 5,
                title: "I will translate your website french to english, english to french",
                about: "We are a small team consisting of bilingual English, French and Spanish speakers. We have extensive experience translating all kinds of documents ranging from academic essays to business reports, subtitles and scripts to short novels. We ensure all of our projects are completed with the highest degree of quality and our dedicated approach means that your translated document will be a perfect version, with attention paid over the register and vocabulary used.",
                price: 109,
                owner: {
                    _id: "u146",
                    fullname: "moremarks",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/c7335c7b5aa8d880333495ef8f4bbee5-1617624531791/a2fc714b-c261-490d-b93a-af081a385234.png",
                    level: "2",
                    rate: 4
                },
                Languages: "English,Swahili,Turkish",
                country: "United Kingdom",
                daysToMake: 16,
                description: "I will translate all translations sent to me within 12 hours. I can translate French to English and English to French.\nTranslations completed by a Bilingual French & English speaker and an experienced translator. I have extensive experience translation all kinds of projects.\nIf you have any questions, please send a message am I will get back to you ass soon as possible. If you have a larger project to do, don't hesitate to get in contact and we can find a solution that works for you.\nPlease send a message so I can send you a custom order.",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/217112898/original/2857822ef954d4d7305529500a3b9ab3eee33a0c.png"],
                tags: [
                    "french to english",
                    "english translation",
                    "translation",
                    "french translation",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "theowl_mktg",
                        "country": "France",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1f7.png",
                        "review": "Amazing ! Extremely reactive and truly professional. We needed translation for a french marketing website : translations were delivered in a short span of time with high quality. Execution was excellent : the seller kept the text evocative and emotive. I really recommend !",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "saracousin",
                        "country": "Switzerland",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png",
                        "review": "Fast and great job",
                        "reviewedAt": "Published 3 days ago"
                    },
                    {
                        "name": "felipecabrer920",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
                        "review": "Quick turnaround and quality work!",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "oliviercroce738",
                        "country": "France",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1f7.png",
                        "review": "Merci beaucoup pour la qualité du travail et la réactivité",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "stephanemeer",
                        "country": "France",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1f7.png",
                        "review": "Very fast and effective translation from French to English. Thank you so much for your help.",
                        "reviewedAt": "Published 1 month ago"
                    }
                ]
            },
            // {
            //     _id: "i147",
            //     owner_id: "u147",
            //     owner_rate: 5,
            //     title: "I will create a sales whiteboard video",
            //     about: "Welcome! My name is Gregoria. I am an experienced Marketer that loves to spice up whatever you bring to the table. With many years of marketing, and over 8 years of Video Advertising, I will help your enterprise get a high level of Attraction, Interaction, and of course, Sales; through Animation. I and my team work FULL TIME on Fiverr to guarantee quick, and excellent Animation videos.",
            //     price: 159,
            //     owner: {
            //         _id: "u147",
            //         fullname: "allesanimation",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ba950f423b857c85340d9e0f22e57bce-1624271979495/ce05a5ca-dcd2-406a-8a20-e41bcb0a429c.jpg",
            //         level: "basic/premium",
            //         rate: 5
            //     },
            //     country: "Germany",
            //     daysToMake: 7,
            //     description: "Kindly contact me for orders above 90 seconds.\nWhat does my package include?\nMotion whiteboard video\nScriptwriting (Additional $50 per 150 words)\nVoice over; Male & Female(English and German)\nBackground music & imagery\nHD Video\nColored whiteboard\nCommercial Rights (Additional $20)\nBroadcast Rights (Additional $50)\nNote: Voice-over is available in German, US English, and UK English.\n.\n.\n.\nBitte kontaktieren Sie mich für Bestellungen über 90 Sekunden.\nWas beinhaltet mein Paket?\nMotion Whiteboard Video\nDrehbuchschreiben (Zusätzliche €50 pro 150 Wörter)\nVoice-over; Männlich & Weiblich (Englisch und Deutsch)\nHintergrundmusik und Bilder\nHD-Video\nFarbiges Whiteboard\nKommerzielle Rechte (Zusätzliche €20)\nÜbertragungsrechte (Zusätzliche €50)\nHinweis: Voice-Over ist in Deutsch, US-Englisch und UK-Englisch verfügbar.",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/video/upload/t_gig_cards_web/lrceizjt7bnvlvkd8dbo.png"],
            //     tags: [
            //         "whiteboard video",
            //         "explainer video",
            //         "explain"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "kommissark",
            //             "country": "Switzerland",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png",
            //             "review": "Seller responds quickly. Animation of the video is great. Unfortunately due to technical limitations after several revisions I finally had to cut the video on my own.",
            //             "reviewedAt": "Published 3 weeks ago"
            //         },
            //         {
            //             "name": "danhub77",
            //             "country": "Austria",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
            //             "review": "Ich bin rundherum sehr zufrieden gewesen.... :-) Werde mich beim nächsten Video auch wieder an Gregoria wenden..... Dankeschön",
            //             "reviewedAt": "Published 2 days ago"
            //         },
            //         {
            //             "name": "lovethgreorg",
            //             "country": "Germany",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
            //             "review": "Das Projekt lief wie erwartet gut. Von Anfang an war sie respektvoll und nahm sich Zeit, um die Animation zu überarbeiten. Möchten Sie an einem langen Projekt arbeiten? sie ist definitiv deine beste Wette. Wir werden für mehr zurück sein.",
            //             "reviewedAt": "Published 3 days ago"
            //         },
            //         {
            //             "name": "freakx733",
            //             "country": "Germany",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
            //             "review": "Sehr gut geworden. Vielen Dank nochmal!",
            //             "reviewedAt": "Published 1 week ago"
            //         },
            //         {
            //             "name": "gradyguez",
            //             "country": "Germany",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
            //             "review": "Sie war schnell mit der Lieferung. Ich habe nur ein paar Antworten auf ihre Fragen gegeben und am Ende hatte ich eine perfekte Animation. Ich werde für mehr zurück sein.",
            //             "reviewedAt": "Published 2 weeks ago"
            //         }
            //     ]
            // },
            {
                _id: "i148",
                owner_id: "u148",
                owner_rate: 5,
                title: "I will create professional 2d animation explainer video",
                about: "Hello Welcome to AMA Studio. If You are looking for Explainer video or Want to share your Story With World in Creative Way Or Maybe you launched a music and thinking about a video for it well you came to the right place, here in ama studio we provide professional animation with 3 different styles, we also provide scriptwriting and professional voiceovers with multiple gender and multiple accents so what are you waiting for Contact us Now.",
                price: 78,
                owner: {
                    _id: "u148",
                    fullname: "ama_studio1",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/18ecf7c17fc8aa50d64b8a89c500a5ad-1612199164491/1963fa7b-062c-4c52-a26d-30473a2d3fad.png",
                    level: "basic/premium",
                    rate: 5
                },
                Languages: "English,Swahili,Turkish",
                country: "Pakistan",
                daysToMake: 17,
                description: "Are You Looking For A 2d Animation Explainer Video For Your Website, Product Or Service?\nWe Offer High Quality Video With Quick Turnaround Time Which Ensures Your Business Gets The Engaging Audience And Profit Turn Around.\nNeed Explainer Animation In Spanish (Español) ? German (Deutsch)? Italian (Italiano) ? No Problem! We Understand All Languages.\nWhat You Will Get And Each Package?\n• Fantastic 2d Animation\n• Full Hd 1080p\n• Background Imagery\n• Background Music\n• Professional Voice-over\n• Unlimited Revisions\nScript Writing Services Are Also Provided.\nIf You Have Any Custom Work Or Do You Have Any Storyboard Please Contact Me Before The Order For Custom Order\nBest Regards\nAMA",
                imgUrl: ["https://fiverr-res.cloudinary.com/video/upload/t_gig_cards_web/efora4o9znelgccz7fkq.png"],
                tags: [
                    "explainer video",
                    "2d animation",
                    "2d animation video",
                    "cartoon animation",
                    "promotional video",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "andres_r_",
                        "country": "Germany",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
                        "review": "I was reluctant about using this kind of service at first, but I am very happy with the final result and positively surprised about how creative ama_studio is. I would recommend the service 100% and surely will use it again in the future. Fast, reliable, and the best price-quality ratio.",
                        "reviewedAt": "Published 2 days ago"
                    },
                    {
                        "name": "leonkaplun351",
                        "country": "Israel",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
                        "review": "WOW ! Amazing JOB ! After the first revision when I explained my needs They fixed it fast to exactly what I asked Great Communication We have a long term partnership from now Thank you",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "fiverrvg",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Seller communicated well and took time to properly understand my requirements. Seller accommodated revisions and worked with me to meet my expectations.",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "mrmichael1324",
                        "country": "United Kingdom",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        "review": "First time using Fiverr and could not of asked for a better experience. So fast and professional. EXACTLY what I wanted. 100% recommended.",
                        "reviewedAt": "Published 3 weeks ago"
                    },
                    {
                        "name": "reneshamcneal",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "They gave me everything I asked for and was very patient with me with all the requests I asked for.",
                        "reviewedAt": "Published 2 months ago"
                    }
                ]
            },
            // {
            //     _id: "i149",
            //     owner_id: "u149",
            //     owner_rate: 5,
            //     title: "I will create a professional whiteboard animation",
            //     about: "Hi my name is Arnold! I enjoy marketing, i specialize in graphics, especially memes, white board animation and explainer videos. Check out my gigs and feel free to contact me for any other needs! Customer Satisfaction over everything! 100% Rating!!!",
            //     price: 197,
            //     owner: {
            //         _id: "u149",
            //         fullname: "encrypt99",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/aa1d8903ba72305648ba75fc6e81d9b7-1633524346738/5f95f4e0-24ca-4a86-8860-d01d81fd7c4a.jpg",
            //         level: "basic/premium",
            //         rate: 3
            //     },
            //     country: "Nigeria",
            //     daysToMake: 12,
            //     description: "Hii, Welcome to my Whiteboard Animation Video Gig!\nIn this gig, I'll Create the Most EYE-CATCHING whiteboard animation videos tailored to fit your needs.\nThese unique whiteboard Explainer videos for your brand Or business will help to increase your sales and it will definitely create a unique impression on your clients by making them engaging.\nyou'll Get:\n1. The most Unique Explainer Videos compared to other normal whiteboard videos\n2. Fully Colored Videos\n3. Unlimited Revisions Until you're Satisfied\n4. High-Quality Delivery\n5. Fast Communication\n6. All Niche Available\n7. 100% Satisfaction Guaranty\n8. Moneyback Guaranty\n**************\nIf you need custom drawings please check my other gig! or Feel Free to Ping me We'll discuss it : )\nI'm also providing Voiceover and Script Writing Services Please check the extras for the same...\nKindly ensure all required information is readily available before ordering.\nStill, Have Questions?\nFeel Free to contact me Anytime I'm Always here to help you : )\nLooking forward to receiving your Order...\nRegards\nArnold",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/video/upload/so_26.270999,t_gig_cards_web/tfl3oturwkkl0qp55kmf.png"],
            //     tags: [
            //         "whiteboard video",
            //         "explainer video",
            //         "whiteboard explainer",
            //         "white board",
            //         "whiteboard animation"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "malini_pearl",
            //             "country": "India",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f3.png",
            //             "review": "Really surprised by his work. Simply wow.. I never expected the outcome and the quality and the script he wrote was just amazing. For the details I gave to him, never expected the output received.. Will definitely reach you soon with other orders... VERY SATISFIED And HIGHLY RECOMENDED SELLER...",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "sanjanassss",
            //             "country": "United Kingdom",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            //             "review": "It was an awesome experience working with him. looking forward to work long term for sure. Silvia Uk Barkley Trading London ltd",
            //             "reviewedAt": "Published 1 day ago"
            //         },
            //         {
            //             "name": "richardcanton",
            //             "country": "United Kingdom",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
            //             "review": "This seller was excellent from start to finish. Very prompt and the final product is superb quality. Thank you very much, will use again for sure.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "hemanth8196",
            //             "country": "India",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f3.png",
            //             "review": "Very Responsive and will did a lot for our request... Thanks A lot for Your Speedy Delivery and hardwork bro.... HIGHLY RECOMMENDED SELLER FOR WHITEBOARD ANIMATIONS...",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "bakus09",
            //             "country": "Cote D'Ivoire",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ee.png",
            //             "review": "Great Job!",
            //             "reviewedAt": "Published 7 hours ago"
            //         }
            //     ]
            // },
            // {
            //     _id: "i150",
            //     owner_id: "u150",
            //     owner_rate: 5,
            //     title: "I will create an eye catching whiteboard animation digital hand drawn",
            //     about: "Online Marketing professional with 20 years of experience. After running websites, paid-ads, blogs, and e-shops, in 2012 it was clear that video was essential for Internet Marketing and I began creating whiteboard and animated explainers, which quickly became a passion. I decided to start offering those services to others on Fiverr and since then I have gathered a great team of artists in order to provide quality animation work at affordable prices.",
            //     price: 164,
            //     owner: {
            //         _id: "u150",
            //         fullname: "bnn_marketing",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/ee46166ba8c4ab29d551cb80bf88815e-1600882516719/10098270-e9f3-4ee8-b9f4-2c70cc457dd9.JPG",
            //         level: "basic/premium",
            //         rate: 4
            //     },
            //     country: "Argentina",
            //     daysToMake: 12,
            //     description: "ENGAGE YOUR AUDIENCE!!!\nwith your own whiteboard animated doodle video\nULTRA FAST 48 Hours turn-around available\nPUT YOUR VIDEO MARKETING ON STEROIDS\nWe`ll create a fantastic speed-draw or whiteboard animation of any logo, picture, script or text\nWhat you get for $35:\n30-second video with voice over recording\nImages from our Exclusive Hand Drawn Library + 2 Custom Drawings\nBackground Music\nYou must Provide the Script for the video - Up to 75 words\n1080p Video in MP4 or any video format you need\nExtras Available\nFull HD 1920x1080 Delivery\nFast Delivery\nScript Writing\nWatermark\nColor\nSubtitles\nIf you have other requirements just contact us and we´ll reply soon.\n100% Satisfaction Guaranteed\nYour satisfaction is important to us.\nORDER NOW!\nATTENTION - Projects of 300+ words, contact me for a quote and timeframe first.",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/video/upload/so_4.985944,t_gig_cards_web/llttjkqfxz0ybon92ifg.png"],
            //     tags: [
            //         "explainer video",
            //         "doodle",
            //         "whiteboard animation",
            //         "hand drawing"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "jaygreen341",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "Working with bnn_marketing has been very easy! They provided a product that is better than what I expected. Even when I made a mistake on my order, Daniel was very understanding and professional. There are many companies to choose from; However, I can see why bnn_marketing is a top seller, I would highly recommend them to anyone!",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "tomiyostoner",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "I didn't exactly have a vision for what the finished project would look like, just a general idea that a whiteboard explainer might work well. BNN_Marketing really delivered exactly what I was looking for. Customizations were spot on and I love the finished product.",
            //             "reviewedAt": "Published 2 weeks ago"
            //         },
            //         {
            //             "name": "joetankard",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "daniel is the man!! always high quality work with great customer service. im a repeat customer and his work is featured on my company websites. always 5 stars, highly recommend!",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "jrwaddington",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "The video came out amazing. They did a great job capturing the essence of the narration. The only down side was that it was 3 days late.",
            //             "reviewedAt": "Published 2 months ago"
            //         },
            //         {
            //             "name": "macjacart",
            //             "country": "Canada",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
            //             "review": "As always a great product. The delivery was a little late, but the production was absolutely first class. I have worked with this Seller before and I look forward to the next project.",
            //             "reviewedAt": "Published 6 days ago"
            //         }
            //     ]
            // },
            {
                _id: "i151",
                owner_id: "u151",
                owner_rate: 5,
                title: "I will write, rebrand, edit and optimize your linkedin profile",
                about: "I'm one of Fiverr's original sellers and I will handle all of your copywriting and SEO blogging needs! You will see my reviews are OUTSTANDING. Fast turn-around and always here to help. :)",
                price: 108,
                owner: {
                    _id: "u151",
                    fullname: "mediagirl",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e3f2db9a69a2cc7b69c653d3185b6ba9-1592756841572/fbdf1383-4893-4f94-a3c9-a324c68aca4f.jpg",
                    level: "3",
                    rate: 4
                },
                Languages: "English,Swahili,Turkish",
                country: "United States",
                daysToMake: 17,
                description: "You've got one chance to make a first impression.\nYour LinkedIn profile is that chance. Are you leaving potential employers with the best impression you can?\nAre you hire-able?\nI'm here to make sure your LinkedIn profile is branded and optimized to it's full potential! I will spend time analyzing, researching and rebranding your profile to help you get noticed.\nI'm back on Fiverr and ready to bring my expertise to help you reach your goals. I was one of the Original Top-Rated Sellers and my ratings speak for themselves. Over 8k gigs completed, and most all of my completed reviews are 5 star!\nI have 3 packages to choose from depending on the level of help you need.\nI hold a Bachelor's Degree in Communication from University of Southern California and have been writing in a professional capacity for over 10 years. I have extensive SEO knowledge and I am a trained copy writer, creative writer and content creation master. Let me help market you for your dream job!",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/161720033/original/b710f4f32dea2048e662276a241c9d5dfe638106.jpeg"],
                tags: [
                    "resume writer",
                    "linked in",
                    "linkedin",
                    "job hunting",
                    "resume writing",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "ppiork",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "The written communicate was good. I received a response within a few hours. I did not like that all communications had to go through the Fiverr platform, even after securing the project. (This might be a new Fiverr restriction - not sure.) A lot of time was lost in the wait whereas a call could have cleared up a lot of questions and given greater clarity sooner. Also, I didn't feel the seller fully understood the voice, tone, and purpose for my using the Fiverr. I had to repeat my purpose a couple of times. This seller is very responsive and with time and very detailed directions, she can provide what you're looking for.",
                        "reviewedAt": "Published 2 weeks ago"
                    },
                    {
                        "name": "larrin",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Thank you for the tips and rewrite. I wanted to know if you would be ok adding Chief Marketing Officer, Patriot Gold Group",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "adrienne0115",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Mediagirl is amazing, with a very quick turnaround. She took a most cumbersome task of redoing my LinkedIn, and made it absolutely something that I am proud of. I would highly recommend her services.",
                        "reviewedAt": "Published 4 days ago"
                    },
                    {
                        "name": "antonnakov",
                        "country": "Germany",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
                        "review": "Overall good service and very good value for money. I'd recommend it to others looking for a critical review of their LinkedIn Profile.",
                        "reviewedAt": "Published 5 days ago"
                    },
                    {
                        "name": "nyc1989",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Mediagirl is truly phenomenal. She has excellent writing skills and helped me to significantly improve my LinkedIn profile. I would highly recommend her.",
                        "reviewedAt": "Published 2 months ago"
                    }
                ]
            },
            // {
            //     _id: "i152",
            //     owner_id: "u152",
            //     owner_rate: 5,
            //     title: "I will fully upgrade your linkedin profile",
            //     about: "I am a Certified Professional Resume Writer (CPRW), career consultant, and language expert with 14+ years of experience. As a Harvard graduate, I learned from the experts at the Harvard Career Services Office where I honed my abilities to write powerful resumes and cover letters that get my clients hired. US-based: Boston, MA.",
            //     price: 96,
            //     owner: {
            //         _id: "u152",
            //         fullname: "harvardcv",
            //         imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/profile/photos/3844073/original/IMG_7304.jpg",
            //         level: "basic/premium",
            //         rate: 3
            //     },
            //     country: "United States",
            //     daysToMake: 22,
            //     description: "This gig is designed to maximize the full range of LinkedIn's networking and recruiting power through using accomplishment-based, optimized content with LinkedIn's internal search algorithms to ensure you appear on the radar of headhunters and recruiters.\nThis service is for clients seeking work with a company, not to promote a business.\nThe Process:\n1) Send in your fully current resume of 1-2 pages max. and the URL (link) to your LinkedIn page.\n2) I will create a full professional summary (the 'about' section) in Word.doc.\n3) I will also fully upgrade your job descriptions, which will be done on the same Word.doc as #2.\n4) Once you transfer this content into your LinkedIn profile, I will complete the full multi-point inspection of your entire public profile to ensure all areas of the profile are fully optimized.\nThe Results:\nMy clients typically see a 300% increase in LinkedIn traffic.\n* To couple a LinkedIn service with a resume/cover letter, please visit this gig:\nhttps://www.fiverr.com/harvardcv/create-edit-and-design-your-cv-cover-letter-and-linkedin-profile",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/131354127/original/7ea13693d5539c7714613fa799147a1e88cf91e3.jpg"],
            //     tags: [
            //         "linkedin profile",
            //         "linkedin",
            //         "resume writing",
            //         "linkedin banner",
            //         "linkedin business"
            //     ],
            //     likedByUsers: [
            //         "mini-user"
            //     ],
            //     "reviews": [
            //         {
            //             "name": "mcdona77",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "WOW, Richard did an amazing job highlighting my skillsets while offering guidance on how to maintain and improve my profile over time. He was incredibly detailed and looked through my entire profile. I'm in marketing, but sometimes it's hard to market yourself. Richard was my second set of eyes and gave me the outside lens I needed to keep my profile in check and improve my keywords. I would highly recommend his services!",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "igorvidic",
            //             "country": "Norway",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f4.png",
            //             "review": "I've got 4 messages from the recruiters within a couple of days after my update of profile (based on harvardcv's suggestions) even though I am not open to work. I've got them before but not at this rate, meaning that the job has been done great. It is only up to me to improve my skills and experience if I want to get more traffic, and then, I will again ask harvardcv to update my linkeding.",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "amelle55",
            //             "country": "Switzerland",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png",
            //             "review": "Richard was great to work with, very professional. He upgraded my LinkedIn profile even if the one I had was not bad, but he was creative and came back with great suggestions and language that I wouldn’t have done on my own. He did the full review, added the necessary optimizations, and even provided advice on my picture and other sections besides the résumé and work experience sections. I am very satisfied and give him 5/5 score. Thank you Richard!",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "dnassozi",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "Richard is such a great communicator and wow, he tremendously transformed my resume/LinkedIn profile and gave it wings! I love it and can't wait to upload and share my new profile!! Thanks, Richard",
            //             "reviewedAt": "Published 1 month ago"
            //         },
            //         {
            //             "name": "uniquedrobinson",
            //             "country": "United States",
            //             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
            //             "review": "Exceptionally gifted at handcrafting and customizing a LinkedIn profile that matched my skills and expertise brilliantly. The BEST investment I’ve made in my professional branding. My satisfaction exceeded 100%. He went over and above to deliver magnificent results! I highly recommend. Thank you Richard for helping me to 1OX my professional brand.",
            //             "reviewedAt": "Published 5 days ago"
            //         }
            //     ]
            // },
            {
                _id: "i153",
                owner_id: "u153",
                owner_rate: 5,
                title: "I will revamp your linkedin profile or write a professional summary, bio",
                about: "I am Hina, a Certified Professional Resume Writer and Career Consultant. I can write and design a job-oriented Resume and Cover Letter and Optimize your LinkedIn profiles. I have successfully helped recruit and land jobs for thousands of job seekers. As a professional Article Writer and Editor, I have extensive experience in Content Writing, Blog Post Writing, Proofreading Editing, and Copywriting. I am MS Office Certified and an expert in Data entry, file conversion, and PowerPoint presentations. Order with confidence! Always open to custom offers!",
                price: 165,
                owner: {
                    _id: "u153",
                    fullname: "haniwritertech",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/079e914e9f28e8269dee6bb109ef85a1-1570850131880/40fbde37-316f-4de2-9ca5-07b1300360d2.jpg",
                    level: "3",
                    rate: 2
                },
                Languages: "English,Swahili,Turkish",
                country: "Pakistan",
                daysToMake: 28,
                description: "Are you want to make your LinkedIn profile, resume, and cover letter attractive so that the right employers can find you? I am here to assist you.\nI will revamp, create, and optimize your LinkedIn profile with the right choice of keywords. I know the importance of an attractive and professional Linkedin profile and summary that can help you get the job of your dreams.\nWhat you will get?\nEye-catching Headline title that will make you stand out\nKiller bio/summary to grab attention\nEducation, Certifications & Awards\nProfessional Experience\nLinkedIn profile optimization\nHighlight your skills\n100% satisfaction guarantee\nAts resume writing and cover letter\nNote: If you have any questions or special requirements, send me a message. I will be happy to assist you.\nBest Regards!\nHina",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/200950826/original/08090f735021ad8441f30fe2f38542ce95a2ead9.png"],
                tags: [
                    "profile optimization",
                    "linkedin profile",
                    "linkedin summary",
                    "resume writing",
                    "linkedin bio",
                    "graphic-design",
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "stevengcc",
                        "country": "Malaysia",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f2-1f1fe.png",
                        "review": "i was in hospital when the job automatically completed. the fund was transferred and unfortunately she wrote the description wrongly. however she was willing to redo the work without any complains. very responsible freelancer. highly recommended",
                        "reviewedAt": "Published 1 week ago"
                    },
                    {
                        "name": "lharris02",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Seller was very fast and prompt, delivered within 12 hours! However, some of my job experiences were padded with skills and programming languages I'm not familiar with. Other than the job experiences, everything looks great.",
                        "reviewedAt": "Published 2 weeks ago"
                    },
                    {
                        "name": "rafhaelgomes992",
                        "country": "Brazil",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e7-1f1f7.png",
                        "review": "Haniwritertech wrote something even better than I was expecting in a really short period of time. I highly recommend it.",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "rajraj731",
                        "country": "United Kingdom",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        "review": "She has updated my profile in 4hrs time. I really appreciate your time and effort. I will recommend her for everyone",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "haftomg",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Thank you hani for doing all the good work in short period of time i can’t thank you enough. Very highly recommended!! Keep up the good work!!",
                        "reviewedAt": "Published 2 months ago"
                    }
                ]
            },
            {
                _id: "i154",
                owner_id: "u154",
                owner_rate: 5,
                title: "I will write and optimize your linkedin profile in 24 hours",
                about: "As a CV Writer, Resume Writer, Covering Letter Writer, and LinkedIn Profile Writer, I have written CVs for hundreds of people from all walks of life and within many different market sectors. I help job seekers build their LinkedIn presence and create compelling resumes, so they can get in front of recruiters, impress hiring managers, and land the perfect job for them. I'm excited to help you kickstart your career!",
                price: 53,
                owner: {
                    _id: "u154",
                    fullname: "muzamilbutt401",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/eb5d29b35cb0f6bd47e3a2f1fb8a55db-1595779512175/3d984139-fd41-42b2-a94c-fca974593c8a.jpg",
                    level: "3",
                    rate: 5
                },
                Languages: "English,Swahili,Turkish",
                country: "Pakistan",
                daysToMake: 14,
                description: "✪ LinkedIn Writing and Optimization Services ✪\nDo you want to stand out and take your career or business to the next level?\nI help Entrepreneurs, Change Makers & Big Dreamers stand out and take direction so they can make a great digital first impression!\nMy extensive experience in International Recruitment and Resume Writing has allowed me to gain an in-depth knowledge of industry-specific requirements across a vast range of disciplines. I can make your LinkedIn profile stand out from the crowd!\nChoose one of the packages outlined below or request a custom offer to improve your personal LinkedIn success.\nPackages:\nBasic (Entry-Level Profile): Review and optimization of your LinkedIn Headline and Bio with keywords.\nStandard (Professional Profile): Full LinkedIn profile optimization, including Headline, Bio, and career history rewrite, skill suggestions, and industry-tailored recommendations.\nPremium (Profile Creation): Creation of a full profile from scratch, optimized to meet your career preferences.\nBusiness Profiles ( Message Me To Discuss)\nNow is the time to start moving your career or business to the next level!",
                imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/159966352/original/1a65840f4a6b0333d7bd37ea876663dc54b9aeaf.jpg"],
                tags: [
                    "bio",
                    "linkedin profile",
                    "linkedin optimize",
                    "linkedin",
                    "resume writing"
                ],
                likedByUsers: [
                    "mini-user"
                ],
                "reviews": [
                    {
                        "name": "kofaisal",
                        "country": "Kuwait",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f0-1f1fc.png",
                        "review": "For my case, I didn’t see any value added; the seller could go to my profile and assess what are the things my profile needs. He asked to choose the premium package which means creation of a full LinkedIn profile from scratch. To be fair, I am going to list what are the things I have learned from him: how to put the symbol in the description, shared with me a list skills, that I have to put my full name in the first name, and how to customize my Linkedin URL. Finally, after I received the delivery, I asked if may he share with me a few versions of the “About” section. He said that he was not able to send more versions this is because I have to pay for it. Again, I have paid $50.",
                        "reviewedAt": "Published 1 month ago"
                    },
                    {
                        "name": "simplyjassi",
                        "country": "Germany",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
                        "review": "He is great to work with and I was very impressed how fast he produced work in this quality. My whole profile is coherent and appealing now. I am very happy with it! Also I appreciate when somebody makes changes until the result fits the customer perfectly. Thank you! I loved working with you :)",
                        "reviewedAt": "Published 2 weeks ago"
                    },
                    {
                        "name": "jovial1",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "Very accurate descriptions for Linkedin profile and on-time delivery! Will definitely recommend his services. Thank you so much & Happy holidays!!",
                        "reviewedAt": "Published 2 months ago"
                    },
                    {
                        "name": "zurismommy",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "The seller was very attentive and got the work done on the first attempt. I am very grateful for the time saved and the level of the work. Thank you!!",
                        "reviewedAt": "Published 1 week ago"
                    },
                    {
                        "name": "laispereira94",
                        "country": "United States",
                        "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        "review": "I wasn't super clear on what I wanted, and I appreciated their willingness to help and try again. I was super happy with the final product and will surely be recommending them in the future! Thank you again!",
                        "reviewedAt": "Published 1 week ago"
                    }
                ]
            },
            // {
            //     _id: "i155",
            //     owner_id: "u155",
            //     owner_rate: 4.8,
            //     title: "I will design a professional logo for your business",
            //     about: "As an experienced graphic designer, I specialize in creating stunning logos that represent your brand identity. I ensure high-quality and impactful designs to leave a lasting impression.",
            //     price: 75,
            //     owner: {
            //         _id: "u155",
            //         fullname: "graphicgenius",
            //         imgUrl: "https://example.com/u155.jpg",
            //         level: "2",
            //         rate: 4.8
            //     },
            //     Languages: "English,Spanish",
            //     country: "United States",
            //     daysToMake: 5,
            //     description: "✪ Professional Logo Design Services ✪\nYour logo is the face of your business, and I'm here to help you make it unforgettable. I will design a custom logo tailored to your needs and preferences, ensuring it aligns with your brand values.",
            //     imgUrl: ["https://images.pexels.com/photos/29481495/pexels-photo-29481495.jpeg"],
            //     tags: [
            //         "graphic-design",
            //         "logo design",
            //         "branding",
            //         "professional design",
            //         "custom logo"
            //     ],
            //     likedByUsers: ["user123", "user456"]
            // },
            // {
            //     _id: "i156",
            //     owner_id: "u156",
            //     owner_rate: 4.9,
            //     title: "I will create a responsive website for your business",
            //     about: "I am a web developer with 5+ years of experience in building professional and responsive websites. Let me help you establish a powerful online presence.",
            //     price: 250,
            //     owner: {
            //         _id: "u156",
            //         fullname: "webmasterpro",
            //         imgUrl: "https://example.com/u156.jpg",
            //         level: "3",
            //         rate: 4.9
            //     },
            //     Languages: "English,French",
            //     country: "Canada",
            //     daysToMake: 15,
            //     description: "✪ Responsive Website Design ✪\nI will design and develop a fully responsive website for your business, ensuring compatibility across all devices and browsers. My goal is to deliver a user-friendly and visually appealing website that drives results.",
            //     imgUrl: ["https://images.pexels.com/photos/29459845/pexels-photo-29459845.jpeg"],
            //     tags: [
            //         "graphic-design",
            //         "web design",
            //         "responsive design",
            //         "frontend development",
            //         "user experience"
            //     ],
            //     likedByUsers: ["user789"]
            // },
            // {
            //     _id: "i157",
            //     owner_id: "u157",
            //     owner_rate: 4.7,
            //     title: "I will design a creative business card",
            //     about: "Specializing in creating sleek and professional business cards that leave a lasting impression. Perfect for entrepreneurs and professionals.",
            //     price: 20,
            //     owner: {
            //         _id: "u157",
            //         fullname: "cardcreator",
            //         imgUrl: "https://example.com/u157.jpg",
            //         level: "3",
            //         rate: 4.7
            //     },
            //     Languages: "English,Portuguese",
            //     country: "Brazil",
            //     daysToMake: 3,
            //     description: "✪ Business Card Design ✪\nI will create a personalized business card that fits your style and profession. From minimalist to bold, I've got you covered.",
            //     imgUrl: ["https://images.pexels.com/photos/29418745/pexels-photo-29418745.jpeg"],
            //     tags: ["graphic-design", "business card", "branding", "stationery", "professional"],
            //     likedByUsers: ["user111", "user222"]
            // },
            // {
            //     _id: "i158",
            //     owner_id: "u158",
            //     owner_rate: 4.6,
            //     title: "I will create an eye-catching flyer",
            //     about: "With years of experience in graphic design, I will create a flyer that grabs attention and conveys your message effectively.",
            //     price: 40,
            //     owner: {
            //         _id: "u158",
            //         fullname: "flyerdesigns",
            //         imgUrl: "https://example.com/u158.jpg",
            //         level: "1",
            //         rate: 4.6
            //     },
            //     Languages: "English,German",
            //     country: "Germany",
            //     daysToMake: 4,
            //     description: "✪ Flyer Design Services ✪\nWhether for events, promotions, or business, I design flyers that stand out. My designs are visually appealing and effectively communicate your purpose.",
            //     imgUrl: ["https://images.pexels.com/photos/29414465/pexels-photo-29414465.jpeg"],
            //     tags: ["graphic-design", "flyer", "promotion", "event", "creative design"],
            //     likedByUsers: ["user333"]
            // },
            // {
            //     _id: "i159",
            //     owner_id: "u159",
            //     owner_rate: 4.9,
            //     title: "I will create a 3D mockup for your product",
            //     about: "Expert in creating stunning 3D product mockups for e-commerce, marketing, and presentations.",
            //     price: 100,
            //     owner: {
            //         _id: "u159",
            //         fullname: "mockupmaster",
            //         imgUrl: "https://example.com/u159.jpg",
            //         level: "2",
            //         rate: 4.9
            //     },
            //     Languages: "English,Italian",
            //     country: "Italy",
            //     daysToMake: 10,
            //     description: "✪ 3D Mockup Design ✪\nI will deliver high-quality 3D mockups that showcase your product professionally. Perfect for advertising and presentations.",
            //     imgUrl: ["https://example.com/i159.jpg"],
            //     tags: ["graphic-design", "3D design", "mockup", "product showcase", "visualization"],
            //     likedByUsers: ["user444", "user555"]
            // },
            // {
            //     _id: "i160",
            //     owner_id: "u160",
            //     owner_rate: 4.8,
            //     title: "I will edit your photos professionally",
            //     about: "I provide professional photo editing services, including retouching, color correction, and background removal.",
            //     price: 15,
            //     owner: {
            //         _id: "u160",
            //         fullname: "photoeditor",
            //         imgUrl: "https://example.com/u160.jpg",
            //         level: "basic",
            //         rate: 4.8
            //     },
            //     Languages: "English,Arabic",
            //     country: "Egypt",
            //     daysToMake: 2,
            //     description: "✪ Photo Editing Services ✪\nFrom portraits to product photos, I offer professional editing services to enhance your images and make them shine.",
            //     imgUrl: ["https://example.com/i160.jpg"],
            //     tags: ["graphic-design", "photo editing", "retouching", "background removal", "color correction"],
            //     likedByUsers: ["user666"]
            // },
            // {
            //     _id: "i160",
            //     owner_id: "u160",
            //     owner_rate: 4.7,
            //     title: "I will edit and proofread your documents",
            //     about: "I provide meticulous editing and proofreading services to ensure your documents are error-free and professional.",
            //     price: 30,
            //     owner: {
            //         _id: "u160",
            //         fullname: "editexpert",
            //         imgUrl: "https://example.com/u160.jpg",
            //         level: "basic",
            //         rate: 4.7
            //     },
            //     Languages: "English",
            //     country: "Australia",
            //     daysToMake: 2,
            //     description: "From grammar checks to style improvements, I will polish your documents to perfection, ensuring clarity and professionalism.",
            //     imgUrl: ["https://example.com/i160.jpg"],
            //     tags: ["editing", "graphic-design", "proofreading", "grammar", "writing improvement"],
            //     likedByUsers: ["user567", "user345"]
            // },
            // {
            //     _id: "i161",
            //     owner_id: "u161",
            //     owner_rate: 4.8,
            //     title: "I will create stunning social media graphics",
            //     about: "I specialize in creating visually appealing social media graphics to boost engagement and promote your brand.",
            //     price: 40,
            //     owner: {
            //         _id: "u161",
            //         fullname: "socialdesignpro",
            //         imgUrl: "https://example.com/u161.jpg",
            //         level: "standard",
            //         rate: 4.8
            //     },
            //     Languages: "English,French",
            //     country: "Canada",
            //     daysToMake: 3,
            //     description: "Whether you need graphics for Instagram, Facebook, or Twitter, I design visuals that grab attention and drive results.",
            //     imgUrl: ["https://example.com/i161.jpg"],
            //     tags: ["social media", "graphic-design", "graphics", "branding", "digital design"],
            //     likedByUsers: ["user111", "user222"]
            // },
            // {
            //     _id: "i162",
            //     owner_id: "u162",
            //     owner_rate: 4.6,
            //     title: "I will design a responsive WordPress website",
            //     about: "I build professional and fully responsive WordPress websites that are tailored to meet your business needs.",
            //     price: 200,
            //     owner: {
            //         _id: "u162",
            //         fullname: "webbuilderpro",
            //         imgUrl: "https://example.com/u162.jpg",
            //         level: "expert",
            //         rate: 4.6
            //     },
            //     Languages: "English",
            //     country: "India",
            //     daysToMake: 7,
            //     description: "A great website is key to your online presence. Let me create a modern, fast, and user-friendly WordPress website for you.",
            //     imgUrl: ["https://example.com/i162.jpg"],
            //     tags: ["WordPress", "graphic-design", "web development", "responsive design", "SEO"],
            //     likedByUsers: ["user888", "user999"]
            // },
            // {
            //     _id: "i163",
            //     owner_id: "u163",
            //     owner_rate: 4.9,
            //     title: "I will create engaging YouTube thumbnails",
            //     about: "Get custom YouTube thumbnails designed to boost your video's click-through rate and audience engagement.",
            //     price: 15,
            //     owner: {
            //         _id: "u163",
            //         fullname: "thumbnailguru",
            //         imgUrl: "https://example.com/u163.jpg",
            //         level: "basic",
            //         rate: 4.9
            //     },
            //     Languages: "English",
            //     country: "United States",
            //     daysToMake: 1,
            //     description: "Eye-catching thumbnails are essential for YouTube success. Let me design one that gets your video noticed!",
            //     imgUrl: ["https://example.com/i163.jpg"],
            //     tags: ["YouTube", "graphic-design", "thumbnail", "design", "video marketing"],
            //     likedByUsers: ["user234", "user567"]
            // },
            // {
            //     _id: "i164",
            //     owner_id: "u164",
            //     owner_rate: 4.8,
            //     title: "I will translate English to French professionally",
            //     about: "As a native French speaker, I offer precise and contextually accurate English-to-French translations.",
            //     price: 50,
            //     owner: {
            //         _id: "u164",
            //         fullname: "languagepro",
            //         imgUrl: "https://example.com/u164.jpg",
            //         level: "standard",
            //         rate: 4.8
            //     },
            //     Languages: "English,French",
            //     country: "France",
            //     daysToMake: 3,
            //     description: "Translate your documents, websites, or content seamlessly from English to French with a professional touch.",
            //     imgUrl: ["https://example.com/i164.jpg"],
            //     tags: ["translation", "graphic-design", "French", "English", "language"],
            //     likedByUsers: ["user333", "user444"]
            // },
            // {
            //     _id: "i165",
            //     owner_id: "u165",
            //     owner_rate: 4.7,
            //     title: "I will develop a custom mobile app for your business",
            //     about: "I create high-performance mobile apps tailored to your specific business requirements.",
            //     price: 500,
            //     owner: {
            //         _id: "u165",
            //         fullname: "appmaster",
            //         imgUrl: "https://example.com/u165.jpg",
            //         level: "expert",
            //         rate: 4.7
            //     },
            //     Languages: "English",
            //     country: "Germany",
            //     daysToMake: 14,
            //     description: "From concept to deployment, I deliver mobile apps that provide seamless user experiences.",
            //     imgUrl: ["https://example.com/i165.jpg"],
            //     tags: ["mobile app", "graphic-design", "Android", "iOS", "development"],
            //     likedByUsers: ["user555", "user666"]
            // },
            // {
            //     _id: "i166",
            //     owner_id: "u166",
            //     owner_rate: 4.9,
            //     title: "I will write SEO-friendly blog posts and articles",
            //     about: "I provide engaging, well-researched content optimized for search engines.",
            //     price: 80,
            //     owner: {
            //         _id: "u166",
            //         fullname: "contentking",
            //         imgUrl: "https://example.com/u166.jpg",
            //         level: "standard",
            //         rate: 4.9
            //     },
            //     Languages: "English",
            //     country: "United Kingdom",
            //     daysToMake: 5,
            //     description: "Attract readers and improve your website's SEO with my professionally written articles.",
            //     imgUrl: ["https://example.com/i166.jpg"],
            //     tags: ["content writing" ,"graphic-design", "blogging", "SEO", "articles"],
            //     likedByUsers: ["user777", "user888"]
            // },
            // {
            //     _id: "i167",
            //     owner_id: "u167",
            //     owner_rate: 4.6,
            //     title: "I will create 3D product animations",
            //     about: "I specialize in high-quality 3D product animations that highlight every detail of your product.",
            //     price: 300,
            //     owner: {
            //         _id: "u167",
            //         fullname: "animatorpro",
            //         imgUrl: "https://example.com/u167.jpg",
            //         level: "expert",
            //         rate: 4.6
            //     },
            //     Languages: "English",
            //     country: "Japan",
            //     daysToMake: 10,
            //     description: "Showcase your product with stunning 3D animations that capture attention and drive sales.",
            //     imgUrl: ["https://example.com/i167.jpg"],
            //     tags: ["3D animation", "graphic-design", "product showcase", "visuals", "motion graphics"],
            //     likedByUsers: ["user999", "user000"]
            // },
            // {
            //     _id: "i168",
            //     owner_id: "u168",
            //     owner_rate: 4.7,
            //     title: "I will design minimalist business cards",
            //     about: "Crafting elegant, minimalist business cards that leave a lasting impression.",
            //     price: 25,
            //     owner: {
            //         _id: "u168",
            //         fullname: "cardcrafter",
            //         imgUrl: "https://example.com/u168.jpg",
            //         level: "basic",
            //         rate: 4.7
            //     },
            //     Languages: "English",
            //     country: "South Korea",
            //     daysToMake: 2,
            //     description: "Your business card is your introduction. Let me design one that speaks volumes.",
            //     imgUrl: ["https://example.com/i168.jpg"],
            //     tags: ["business card", "graphic-design", "minimalist", "branding"],
            //     likedByUsers: ["user111", "user222"]
            // },
            // {
            //     _id: "i169",
            //     owner_id: "u169",
            //     owner_rate: 4.8,
            //     title: "I will create detailed architectural 3D models",
            //     about: "I provide professional 3D modeling services for architectural designs.",
            //     price: 400,
            //     owner: {
            //         _id: "u169",
            //         fullname: "archimaster",
            //         imgUrl: "https://example.com/u169.jpg",
            //         level: "expert",
            //         rate: 4.8
            //     },
            //     Languages: "English",
            //     country: "Italy",
            //     daysToMake: 12,
            //     description: "Transform your architectural concepts into realistic 3D models that impress clients.",
            //     imgUrl: ["https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/121778216/original/55069f1….png"],
            //     tags: ["3D modeling", "graphic-design", "architecture", "design", "visualization"],
            //     likedByUsers: ["user333", "user444"]
            // },
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



