import { useEffect, useRef, useState } from 'react'
import { gigService } from '../../services/gig/gig.service.local'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export function CategoryMenu2({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const CategorysliderRef = useRef()
    const [lastDirection, setLastDirection] = useState('')
    const [categoryMenuClassName, setCategoryMenuClassName] = useState('')
    const [linesSetDisplay, setLinesSetDisplay] = useState('')
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900)
    const { pathname } = window.location
    // const [slideIndex, setSlideIndex] = useState(0)
    // const [isDynamic, setIsDynamic] = useState(0)
    const sliderRef = useRef()
    const [isAtStart, setIsAtStart] = useState(true) 
    const [isAtEnd, setIsAtEnd] = useState(true)



    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 600 && window.scrollY >= 300 && pathname === '/') {
                setCategoryMenuClassName('categories-menu')
                setLinesSetDisplay('main-app-header full')
            } else if (window.scrollY < 300 && pathname === '/') {
                setCategoryMenuClassName('no-display')
                setLinesSetDisplay('no-display')
            } else if (window.innerWidth < 600) {
                setCategoryMenuClassName('no-display')
                setLinesSetDisplay('no-display')
            } else {
                setCategoryMenuClassName('categories-menu')
                setLinesSetDisplay('main-app-header full')
            }
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [pathname])

    useEffect(() => {
        const handleResize = () => setIsWideScreen(window.innerWidth >= 900)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const categories = [
        { tags: ["graphics-design"], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg", title: <>Graphics<br />& Design</> },
        { tags: ["digital-marketing"], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg", title: <>Digital<br />Marketing</> },
        { tags: ["writing-translation"], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg", title: <>Writing<br />& Translation</> },
        { tags: ["video-animation"], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg", title: <>Video<br />& Animation</> },
        { tags: ["ai-services"], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services-thin.104f389.svg", title: "AI Services"},
        { tags: ["music-audio"], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg", title: "Music & Audio" },
        { tags: ["business"], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg", title: <>Business</> },
        { tags: ["consulting"], imgSrc: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting-thin.d5547ff.svg", title: <>Consulting</> }
    ]

    function filterByCategory(tags) {
        const updatedFilter = { ...filterByToEdit, tags }
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
                        <IoIosArrowBack />
                    </button>
                )}
                <ul className="categories2" id="categories2" ref={CategorysliderRef}>
                    {categories.map((category, index) => (
                        <div key={index} onClick={() => filterByCategory(category.tags)} className="card-container">
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
                        <IoIosArrowForward />
                    </button>
                )}
            </nav>
            <div className={`${linesSetDisplay}`}></div>
        </>
    )
}
