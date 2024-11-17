import { useEffect, useRef, useState } from 'react'
import { gigService } from '../../services/gig/gig.service.local'

export function GigCategoryMenu({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const CategorySliderRef = useRef()
    const [isVisible, setIsVisible] = useState(false)
    const [isLeftDisabled, setIsLeftDisabled] = useState(true)
    const [isRightDisabled, setIsRightDisabled] = useState(true)
    // const [active, setActive] = useState(false)
    const { pathname } = window.location

    useEffect(() => {
        function handleScroll() {
            const scrollPosition = window.scrollY

            // Toggle visibility based on scroll position
            if (scrollPosition >= 800 && pathname === '/') {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }

            const scrollLeft = CategorySliderRef.current.scrollLeft
            const scrollWidth = CategorySliderRef.current.scrollWidth
            const clientWidth = CategorySliderRef.current.clientWidth

            setIsLeftDisabled(scrollLeft === 0)
            setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth)
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [pathname])

    function filterByCategory(categories) {
        setFilterByToEdit({ ...filterByToEdit, tags: categories })
        onSetFilter({ ...filterByToEdit, tags: categories })
    }

    function slideLeft() {
        CategorySliderRef.current.scrollLeft -= 220
    }

    function slideRight() {
        CategorySliderRef.current.scrollLeft += 220
    }

    return (
        <>
            {/* Conditionally render the component based on isVisible */}
            <div className={`categories-menu-package full ${isVisible ? '' : 'no-display'}`}>
            {/* <div className={ active ? 'categories-menu-package main-layout active' : ''}> */}
            
                <nav className="categories-menu-package__menu app-header-nav">
                    {/* <button
                        className="category-btn fa-solid chevron-left left"
                        onClick={slideLeft}
                        disabled={isLeftDisabled}
                    ></button> */}
                    <ul className="categories categories-menu-package__categories nav-links" id="categories" ref={CategorySliderRef}>
                        <li onClick={() => filterByCategory(['graphic-design', 'design', 'logo-design'])}>
                            <a>Graphic & Design</a>
                        </li>
                        <li onClick={() => filterByCategory(['digital-marketing', 'digital'])}>
                            <a>Digital Marketing</a>
                        </li>
                        <li onClick={() => filterByCategory(['writing-translation', 'translation'])}>
                            <a>Writing & Translation</a>
                        </li>
                        <li onClick={() => filterByCategory(['video-animation', 'animation'])}>
                            <a>Video & Animation</a>
                        </li>
                        {/* <li onClick={() => filterByCategory(['music-audio', 'audio'])}>
                            <a>Music & Audio</a>
                        </li> */}
                        <li onClick={() => filterByCategory(['music-audio', 'audio'])}>
                            <a>Music & Audio</a>
                        </li>
                        <li onClick={() => filterByCategory(['programming-tech', 'tech'])}>
                            <a>Personal Growth</a>
                        </li>
                        <li onClick={() => filterByCategory(['programming-tech', 'tech'])}>
                            <a>Programming & Tech</a>
                        </li>
                        <li onClick={() => filterByCategory(['business'])}>
                            <a>Business</a>
                        </li>
                        <li onClick={() => filterByCategory(['lifestyle'])}>
                            <a>Lifestyle</a>
                        </li>
                        <li onClick={() => filterByCategory(['trending'])}>
                            <a>Trending</a>
                        </li> 
                          {/* <li onClick={() => filterByCategory(['trending'])}>
                            <a>Finance</a>
                        </li>  */}
                    </ul>
                    {/* <button
                        className="category-btn fa-solid chevron-right right"
                        onClick={slideRight}
                        disabled={isRightDisabled}
                    ></button> */}
                </nav>
            </div>
        </>
    )
}
