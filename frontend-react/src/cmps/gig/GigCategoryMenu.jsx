import { useEffect, useRef, useState } from 'react'
import { gigService } from '../../services/gig/gig.service.local'

export function GigCategoryMenu({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const CategorySliderRef = useRef()
    const [lastDirection, setLastDirection] = useState('')
    const [categoryMenuClassName, setCategoryMenuClassName] = useState('')
    const [linesSetDisplay, setLinesSetDisplay] = useState('')
    const [isLeftDisabled, setIsLeftDisabled] = useState(true) 
    const [isRightDisabled, setIsRightDisabled] = useState(true) 
    const { pathname } = window.location

    useEffect(() => {
        function handleScroll() {
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
       
            <div className="categories-menu-package">
                <nav className="categories-menu-package__menu app-header-nav">
                    <button
                        className="category-btn fa-solid chevron-left left"
                        onClick={slideLeft}
                    >
                         //! here
                    </button>
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
                        <li onClick={() => filterByCategory(['music-audio', 'audio'])}>
                            <a>Music & Audio</a>
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
                    </ul>
                    <button
                        className="category-btn fa-solid chevron-right right"
                        onClick={slideRight}
                    >
                        //! here
                    </button>
                </nav>
            </div>
        </>
    )
}
