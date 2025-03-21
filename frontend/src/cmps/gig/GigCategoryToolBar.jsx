import { useEffect, useRef, useState } from "react"
import { gigService } from "../../services/gig/gig.service.remote"
import useOnSetFilter from '../../utils/hooks'

export function GigCategoryToolBar() {
    const [, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const CategorySliderRef = useRef(null)
    const [, setIsVisible] = useState(false)
    const [isLeftDisabled, setIsLeftDisabled] = useState(true)
    const [isRightDisabled, setIsRightDisabled] = useState(true)
    const { pathname } = window.location
    const onSetFilter = useOnSetFilter()

    useEffect(() => {
        function updateScrollButtons() {
            if (CategorySliderRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = CategorySliderRef.current
                setIsLeftDisabled(scrollLeft <= 0);
                setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth)
            }
        }
    
        function handleScroll() {
            const scrollPosition = window.scrollY
            setIsVisible(scrollPosition >= 800 && pathname === "/")
    
            updateScrollButtons()
        }
    
        const sliderElement = CategorySliderRef.current
    
        window.addEventListener("scroll", handleScroll)
        if (sliderElement) {
            sliderElement.addEventListener("scroll", updateScrollButtons)
        }
        handleScroll()
    
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (sliderElement) {
                sliderElement.removeEventListener("scroll", updateScrollButtons)
            }
        }
    }, [pathname])
    
    function filterByCategory(categories) {
        setFilterByToEdit((prevFilter) => {
            const updatedFilter = { ...prevFilter, categories }
            onSetFilter(updatedFilter)
            return updatedFilter
        })
    }

    function slideLeft() {
        if (CategorySliderRef.current) {
            CategorySliderRef.current.scrollBy({ left: -220, behavior: "smooth" })
        }
    }

    function slideRight() {
        if (CategorySliderRef.current) {
            CategorySliderRef.current.scrollBy({ left: 220, behavior: "smooth" })
        }
    }

    return (
        <div className="categories-menu-package">
            <nav className="categories-menu-package__menu app-header-nav main-layout">
                <button onClick={slideLeft} disabled={isLeftDisabled} className="category-btn side-start">
                    <svg width="8" height="15" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.2279 0.690653L7.84662 1.30934C7.99306 1.45578 7.99306 1.69322 7.84662 1.83968L2.19978 7.5L7.84662 13.1603C7.99306 13.3067 7.99306 13.5442 7.84662 13.6907L7.2279 14.3094C7.08147 14.4558 6.84403 14.4558 6.69756 14.3094L0.153374 7.76518C0.00693607 7.61875 0.00693607 7.38131 0.153374 7.23484L6.69756 0.690653C6.84403 0.544184 7.08147 0.544184 7.2279 0.690653Z" />
                    </svg>
                </button>

                <ul className="categories categories-menu-package__categories nav-links" ref={CategorySliderRef}>
                    <li onClick={() => filterByCategory(["graphic-design", "design", "logo-design", "logo"])}>
                        <a className="menu-title">Graphic & Design</a>
                    </li>
                    <li onClick={() => filterByCategory(["digital-marketing", "digital"])}>
                        <a className="menu-title">Digital Marketing</a>
                    </li>
                    <li onClick={() => filterByCategory(["writing-translation", "translation"])}>
                        <a className="menu-title">Writing & Translation</a>
                    </li>
                    <li onClick={() => filterByCategory(["video-animation", "animation"])}>
                        <a className="menu-title">Video & Animation</a>
                    </li>
                    <li onClick={() => filterByCategory(["music-audio", "audio"])}>
                        <a className="menu-title">Music & Audio</a>
                    </li>
                    <li onClick={() => filterByCategory(["programming-tech", "tech"])}>
                        <a className="menu-title">Personal Growth</a>
                    </li>
                    <li onClick={() => filterByCategory(["programming-tech", "tech"])}>
                        <a className="menu-title">Programming & Tech</a>
                    </li>
                    <li onClick={() => filterByCategory(["business"])}>
                        <a className="menu-title">Business</a>
                    </li>
                    <li onClick={() => filterByCategory(["lifestyle"])}>
                        <a className="menu-title">Lifestyle</a>
                    </li>
                    <li onClick={() => filterByCategory(["trending"])}>
                        <a className="menu-title">Trending</a>
                    </li>
                    <li onClick={() => filterByCategory(["finance"])}>
                        <a className="menu-title">Finance</a>
                    </li>
                </ul>

                <button onClick={slideRight} disabled={isRightDisabled} className="category-btn side-end">
                    <svg width="8" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
                    </svg>
                </button>
            </nav>
        </div>
    )
}
