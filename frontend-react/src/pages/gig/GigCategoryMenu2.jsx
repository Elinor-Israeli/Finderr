import { useEffect, useRef, useState } from 'react'
import { gigService } from '../../services/gig/gig.service.remote'

export function CategoryMenu2({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const CategorysliderRef = useRef()
    const [lastDirection, setLastDirection] = useState('')
    const [categoryMenuClassName, setCategoryMenuClassName] = useState('')
    const [linesSetDisplay, setLinesSetDisplay] = useState('')
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900)
    const sliderRef = useRef()
   
    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth >= 900)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const categories = [
        {  categories: ['graphic-design', 'design', 'logo-design','logo'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg", title: <>Graphics<br />& Design</> },
        {  categories: ['digital-marketing', 'digital'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg", title: <>Digital<br />Marketing</> },
        {  categories: ['writing-translation', 'translation'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg", title: <>Writing<br />& Translation</> },
        {  categories: ['video-animation', 'animation'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg", title: <>Video<br />& Animation</> },
        {  categories: ['programming-tech', 'tech'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services-thin.104f389.svg", title: "AI Services"},
        {  categories: ['music-audio', 'audio'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg", title: "Music & Audio" },
        {  categories: ['business'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg", title: <>Business</> },
        {  categories: ['lifestyle'], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting-thin.d5547ff.svg", title: <>Consulting</> }
    ]

    function filterByCategory( categories) {
        const updatedFilter = { ...filterByToEdit,  categories }
        setFilterByToEdit(updatedFilter)
        onSetFilter(updatedFilter)
    }

    function  slideLeft() {
        const slider = sliderRef.current
        if (slider.scrollLeft > 0) {
            slider.scrollLeft -= 100
            setLastDirection('left')
        } else {
            setLastDirection('left')
        }
    }

    function slideRight() {
        const slider = sliderRef.current
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth

        if (slider.scrollLeft < maxScrollLeft) {
            slider.scrollLeft += 100
            setLastDirection('right')
        } else {
            setLastDirection('right')
        }
    }

    return (
        <>
            <div className={`${linesSetDisplay}`}></div>
            <nav className={`${categoryMenuClassName}`}>
                {isWideScreen && (
                    <button className="category-btn left" onClick={slideLeft}  >
                        {/* <IoIosArrowBack /> */}
                    </button>
                )}
                <ul className="categories2" id="categories2" ref={CategorysliderRef}>
                    {categories.map((category, index) => (
                        <div key={index} onClick={() => filterByCategory(category.categories)} className="card-container">
                            {isWideScreen ? (
                                <li className="card">
                                    <a href="#">
                                        <img src={category.imgSrc} alt={category.title} loading="lazy" className="z0qhg80" />
                                        <span>{category.title}</span>
                                    </a>
                                </li>
                            ) : (
                                <>
                                    <li className="card">
                                        <img src={category.imgSrc} alt={category.title} loading="lazy" className="z0qhg80" />
                                    </li>
                                    <a href="#">{category.title}</a>
                                </>
                            )}
                        </div>
                    ))}
                </ul>
                {isWideScreen && (
                    <button className="category-btn fa-solid chevron-right right" onClick={slideRight}>
                        {/* <IoIosArrowForward /> */}
                    </button>
                )}
            </nav>
            <div className={`${linesSetDisplay}`}></div>
        </>
    )
}
