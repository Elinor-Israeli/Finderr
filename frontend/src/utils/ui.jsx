
export function getCategoryName(categoryList) {
console.log('categoryList', categoryList);

    switch (true) {
        case categoryList.includes('graphic-design') || categoryList.includes('design') || categoryList.includes('logo-design') || categoryList.includes('logo'):
            return {
                headline: 'Graphic & Design',
                secondHeadline: 'Let us help you create stunning visuals for your brand with expert graphic design.'
            }
        case categoryList.includes('digital-marketing') || categoryList.includes('digital'):
            return {
                headline: 'Digital & Marketing',
                secondHeadline: 'Maximize your online presence and grow your business with digital marketing experts.'
            }
        case categoryList.includes('writing-translation') || categoryList.includes('translation'):
            return {
                headline: 'Writing & Translation',
                secondHeadline: 'Communicate clearly with professional writing and translation services.'
            }
        case categoryList.includes('video-animation') || categoryList.includes('animation'):
            return {
                headline: 'Video & Animation',
                secondHeadline: 'Bring your ideas to life with high-quality video production and animation services.'
            }
        case categoryList.includes('music-audio') || categoryList.includes('audio'):
            return {
                headline: 'Music & Audio',
                secondHeadline: 'Enhance your project with top-quality music and audio production.'
            }
        case categoryList.includes('programming-tech') || categoryList.includes('tech'):
            return {
                headline: 'Programming & Tech',
                secondHeadline: 'Get the best tech solutions and custom programming to power your business.'
            }
        case categoryList.includes('business'):
            return {
                headline: 'Business',
                secondHeadline: 'Grow your business with expert strategies and solutions.'
            }
        case categoryList.includes('lifestyle'):
            return {
                headline: 'Lifestyle',
                secondHeadline: 'Enhance your lifestyle with expert services and personal growth solutions.'
            }
        case categoryList.includes('trending'):
            return {
                headline: 'Trending',
                secondHeadline: 'Stay ahead of the curve with the latest trending services.'
            }
        case categoryList.includes('website'):
            return {
                headline: 'Website',
                secondHeadline: 'Create stunning, high-performing websites that captivate and convert.'
            }
        case categoryList.includes('logo-design'):
            return {
                headline: 'Logo Design',
                secondHeadline: 'Create a lasting impression with a unique and professional logo design.'
            }
        case categoryList.includes('seo'):
            return {
                headline: 'SEO',
                secondHeadline: 'Boost your search rankings and drive organic traffic with expert SEO strategies.'
            }
        case categoryList.includes('architecture-'):
            return {
                headline: 'Architecture & Interior Design',
                secondHeadline: 'Transform spaces with innovative architectural and interior design solutions.'
            }
        case categoryList.includes('ml'):
            return {
                headline: 'Data Science & ML',
                secondHeadline: 'Harness AI-powered solutions to drive innovation and efficiency.'

            }
        case categoryList.includes('product'):
            return {
                headline: 'Product & Photography',
                secondHeadline: 'Capture stunning visuals that tell your story with professional photography.'
            }

        case categoryList.includes('e-commerce'):
            return {
                headline: 'Marketing & E-Commerce',
                secondHeadline: 'Engage your audience and grow your brand with strategic marketing solutions.'
            }
        case categoryList.includes('voice-over'):
            return {
                headline: 'Voice Over',
                secondHeadline: 'Bring your scripts to life with professional and captivating voice overs.'
            }
        case categoryList.includes('video-editing'):
            return {
                headline: 'Video Editing',
                secondHeadline: 'Turn raw footage into compelling stories with expert video editing.'
            }
        case categoryList.includes('social-media'):
            return {
                headline: 'Social Media',
                secondHeadline: 'Amplify your brand’s voice and connect with your audience through social media.'
            }
        case categoryList.includes('ugc-videos'):
            return {
                headline: 'UGC Videos',
                secondHeadline: 'Engage your audience with authentic and high-quality user-generated content videos.'
            }
        case categoryList.includes('software'):
            return {
                headline: 'Software Development',
                secondHeadline: 'Build cutting-edge software solutions tailored to your needs.'
            }
        default:
        return { 
            headline: 'Browse, Hire, and Get Things Done', 
            secondHeadline: 'Hire experts in design, writing, marketing, tech, and more - all in one place!'
        }

    }
}

export const categories = [
    { categories: ['graphic-design', 'design', 'logo-design', 'logo'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg", title: <>Graphics & Design</> },
    { categories: ['digital-marketing', 'digital'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg", title: <>Digital Marketing</> },
    { categories: ['writing-translation', 'translation'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg", title: <>Writing & Translation</> },
    { categories: ['video-animation', 'animation'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg", title: <>Video & Animation</> },
    { categories: ['programming-tech', 'tech'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services-thin.104f389.svg", title: "AI Services" },
    { categories: ['music-audio', 'audio'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg", title: "Music & Audio" },
    { categories: ['business'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg", title: <>Business</> },
    { categories: ['lifestyle'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting-thin.d5547ff.svg", title: <>Consulting</> }
]

export const categoriesToolBar = [
    { name: "Graphic & Design", filters: ["graphic-design", "design", "logo-design", "logo"] },
    { name: "Digital Marketing", filters: ["digital-marketing", "digital"] },
    { name: "Writing & Translation", filters: ["writing-translation", "translation"] },
    { name: "Video & Animation", filters: ["video-animation", "animation"] },
    { name: "Music & Audio", filters: ["music-audio", "audio"] },
    { name: "Personal Growth", filters: ["programming-tech", "tech"] },
    { name: "Programming & Tech", filters: ["programming-tech", "tech"] },
    { name: "Business", filters: ["business"] },
    { name: "Lifestyle", filters: ["lifestyle"] },
    { name: "Trending", filters: ["trending"] },
    { name: "Finance", filters: ["finance"] },
]

export const categoryColors = {
    'Website': '#00732e',
    'Logo Design': '#ff7640',
    'SEO': '#003912',
    'Architecture &': '#4d1727',
    'Social Media': '#687200',
    'Voice Over': '#421300',
    'UGC Videos': '#be5272',
    'Software': '#254200',
    'ML': '#8f2900',
    'Product': '#687200',
    'Video Editing': '#be5272',
    'E-Commerce': '#00732e',
}

export function getPopularServices() {
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
            desc: 'Interior Design',
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
            desc: 'Data Science &',
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

