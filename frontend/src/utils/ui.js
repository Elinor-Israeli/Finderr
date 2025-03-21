
export function getCategoryName(categoryList) {

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
