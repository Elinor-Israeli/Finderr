import { storageService } from '../async-storage.service' 
import { utilService } from '../util.service' 

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'user'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    getUserReviews
}

window.userService = userService

function getUsers() {
    return storageService.query('user')
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}

async function getUserReviews(userId) {
    const user = await storageService.get('user', userId)
    return user.reviews
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    await storageService.put('user', user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    if (user) {
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)

}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        users = [
            {
                _id: "u102",
                fullname: "Carol",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                username: "Boya",
                password: "secret",
                level: 3,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:4,
                reviews: [
                    {
                        id: "3e45",
                        gig: "{optional-mini-gig}",
                        txt: "I can't express how satisfied I am with the service I received! This seller is a true professional who knows exactly what he's doing when it comes to WordPress. Not only is he incredibly skilled at editing and fixing any issues on my site, but he's also very helpful and understanding throughout the entire process. After an amazing first experience, I came back for a second order, and once again, he exceeded my expectations. He made sure to understand every detail of what I needed and delivered everything perfectly, even faster than before! The consistency in his work is truly impressive. His communication is top-notch. He listens carefully, offers helpful suggestions, and ensures everything is taken care of quickly without sacrificing quality. I felt completely confident that my website was in the best hands. Whether it was tweaking designs, fixing technical glitches, or optimizing performance, he handled it all effortlessly. He’s truly the best WordPress editor I’ve ever worked with, and I’ve tried quite a few gigs before. If you're looking for someone who is professional, hard-working, and capable of editing any WordPress issue you throw at him, this is the gig you should definitely choose. Highly recommend!",
                        rate: 4,
                        by: {
                            _id: "u103",
                            fullname: "Puki Smuki",
                            imgUrl: "https://cdn.pixabay.com/photo/2021/07/01/02/01/avatar-6377965_960_720.png"
                        }
                    },
                    {
                        id: "vdfv",
                        gig: "{optional-mini-gig}",
                        txt: "I can't express how satisfied I am with the service I received! This seller is a true professional who knows exactly what he's doing when it comes to WordPress. Not only is he incredibly skilled at editing and fixing any issues on my site, but he's also very helpful and understanding throughout the entire process. After an amazing first experience, I came back for a second order, and once again, he exceeded my expectations. He made sure to understand every detail of what I needed and delivered everything perfectly, even faster than before! The consistency in his work is truly impressive. His communication is top-notch. He listens carefully, offers helpful suggestions, and ensures everything is taken care of quickly without sacrificing quality. I felt completely confident that my website was in the best hands. Whether it was tweaking designs, fixing technical glitches, or optimizing performance, he handled it all effortlessly. He’s truly the best WordPress editor I’ve ever worked with, and I’ve tried quite a few gigs before. If you're looking for someone who is professional, hard-working, and capable of editing any WordPress issue you throw at him, this is the gig you should definitely choose. Highly recommend!",
                        rate: 4,
                        by: {
                            _id: "u103",
                            fullname: "Puki Smuki",
                            imgUrl: "https://cdn.pixabay.com/photo/2021/07/01/02/01/avatar-6377965_960_720.png"
                        }
                    }
                ],
            },
            {
                _id: "u105",
                fullname: "Jo Bara",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_960_720.jpg',
                username: "user5",
                password: "secret",
                level: 2,
                rate:4,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                reviews: [
                    {
                        id: "maderthgrId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 4,
                        by: {
                            _id: "u104",
                            fullname: "elensky",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                        }
                    },
                    {
                        id: "r4tr4",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 4,
                        by: {
                            _id: "u104",
                            fullname: "elensky",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u106",
                fullname: "Bobo Basa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg',
                username: "user6",
                password: "secret",
                level: 1,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:4,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 4,
                        by: {
                            _id: "u107",
                            fullname: "Zozo Ta",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u107",
                fullname: "Zozo Ta",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                username: "user7",
                password: "secret",
                level: 2,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:4,
                reviews: [
                    {
                        id: utilService.makeId(),
                        gig: "{optional-mini-gig}",
                        txt: "I like that the seller was very responsive. However, I was expecting more of a creative/artistic experience, whereas, I feel that stock images were used and slightly modified to create a logo. However, due to the price point, I also understand there can only be so much time put into this.",
                        rate: 3.3,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u145",
                            country: "United States",
                            flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                            fullname: "lauraschirer",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
                        }
                    },
                    {
                        id: utilService.makeId(),
                        gig: "{optional-mini-gig}",
                        txt: 'For the most part, I\'m satisfied. The logo turned out well, but the social media kit was pretty useless. I think I chose a seller that was a little "too busy" for my taste. I\'ll pay more next time, so I can get a little more devotion to the job.',
                        rate: 3.7,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u146",
                            country: "Denmark",
                            fullname: "jespergenopfind",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_960_720.jpg',
                        }
                    },
                    {
                        id: utilService.makeId(),
                        gig: "{optional-mini-gig}",
                        txt: 'Amazing work! The logoflow did everything I asked, and worked with me and my detail oriented-indecisive self through every step of the way. This is a high-touch service, and a high-touch seller. I feel like I\'ve been taken care of beyond what I could have thought, and I am so very happy with what I got. So many thanks, and honestly I look forward to working with logoflow again! Highly recommend!',
                        rate: 5,
                        createdAt: utilService.randomPastTime(),
                        by: {
                            _id: "u147",
                            country: "Thailand",
                            fullname: "zedisindeeddead",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/03/35/girl-1867092_960_720.jpg',
                        }
                    },
                ],
            },
            {
                _id: "u108",
                fullname: "Mumu Asa",
                imgUrl:'https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_960_720.jpg',
                username: "Alibaba",
                password: "secret",
                level: 3,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:4,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 4,
                        by: {
                            _id: "u107",
                            fullname: "Zozo Ta",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u109",
                fullname: "Alibaba",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_960_720.jpg',
                username: "Alibaba",
                password: "secret",
                level: 1,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:4,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 4,
                        by: {
                            _id: "u107",
                            fullname: "Zozo Ta",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u130",
                fullname: "Nura Kersa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/03/12/20/57/woman-3220835_960_720.jpg',
                username: "user130",
                password: "secret",
                level: 3,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 1,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 1,
                        by: {
                            _id: "u107",
                            fullname: "Zozo Ta",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u111",
                fullname: "Bobo Basa",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/03/35/girl-1867092_960_720.jpg',
                username: "user130",
                password: "secret",
                level: 1,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:2,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 2,
                        by: {
                            _id: "u130",
                            fullname: "Nura Kersa",

                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u112",
                fullname: "Ca",
                imgUrl: 'https://cdn.pixabay.com/photo/2015/01/08/18/29/entrepreneur-593358_960_720.jpg',
                username: "Mosh Nahumy",
                password: "secret",
                level: 2,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:5,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 5,
                        by: {
                            _id: "u130",
                            fullname: "Nura Kersa",

                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u113",
                fullname: "Ssudu Dda",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                username: "user113",
                password: "secret",
                level: 2,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:5,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 5,
                        by: {
                            _id: "u130",
                            fullname: "Nura Kersa",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/05/46/young-woman-1867618_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u114",
                fullname: "Puki Dfa",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
                username: "user114",
                password: "secret",
                level: 2,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate:4,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 2,
                        by: {
                            _id: "u113",
                            fullname: "Ssudu Dda",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u114",
                fullname: "Puki Dfa",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg',
                username: "user114",
                password: "secret",
                level: 2,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 2,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 2,
                        by: {
                            _id: "u113",
                            fullname: "Ssudu Dda",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u115",
                fullname: "Jo Bara",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                username: "user115",
                password: "secret",
                level: 1,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 5,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 5,
                        by: {
                            _id: "u113",
                            fullname: "Ssudu Dda",
                            imgUrl: 'https://cdn.pixabay.com/photo/2017/06/26/02/47/man-2442565_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u116",
                fullname: "Bobo Basa",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg',
                username: "user116",
                password: "secret",
                level: 3,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 5,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 5,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u117",
                fullname: "Zozo Ta",
                imgUrl: 'https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg',
                username: "user117",
                password: "secret",
                level: 1,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 2,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 2,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u118",
                fullname: "Mumu Asa",
                imgUrl: 'https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_960_720.jpg',
                username: "user117",
                password: "secret",
                level: 2,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 3,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 3,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u119",
                fullname: "Quti Vvfa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_960_720.jpg',
                username: "user119",
                password: "secret",
                level: 3,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 4,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 4,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u120",
                fullname: "Nura Kersa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg',
                username: "user120",
                password: "secret",
                level: 3,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 1,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 1,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            },
            {
                _id: "u121",
                fullname: "Bobo Basa",
                imgUrl: 'https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_960_720.jpg',
                username: "user121",
                password: "secret",
                level: 3,
                description:"I am a Visual Designer with over 7 years of professional experience, specialising in branding, logo, and UI/UX design. I am driven by a passion for crafting unique, minimalist, and timeless designs that capture the essence of authentic brands and companies across all industries.",
                rate: 1,
                reviews: [
                    {
                        id: "madeId",
                        gig: "{optional-mini-gig}",
                        txt: " are qualities that exemplify someone who is not only thoughtful and considerate but also efficient and effective in their actions. A person who is kind goes out of their way to help others, showing empathy and care in every interaction. The addition of being quick and efficient means that they also manage their time well, completing tasks rapidly without sacrificing quality. This combination of compassion and productivity is highly valuable in both personal and professional settings, making such individuals stand out as exemplary team players or leaders.",
                        rate: 1,
                        by: {
                            _id: "u115",
                            fullname: "Jo Bara",
                            imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_960_720.jpg',
                        }
                    }
                ],
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, users)
    }
}
