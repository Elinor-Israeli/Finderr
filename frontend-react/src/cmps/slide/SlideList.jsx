import { useEffect, useRef, useState } from 'react'

import { gigService } from '../../services/gig/gig.service.local' 

export function SlideList({onSetFilter}) {
    const slides = gigService.getGigSlides()
    const sliderRef = useRef()
    const [lastDirection, setLastDirection] = useState('')
    const filterByToEdit = useRef(gigService.getDefaultFilter())
    const [isAtStart, setIsAtStart] = useState(true) 
    const [isAtEnd, setIsAtEnd] = useState(true)

    function filterByCategory(categories) {
        filterByToEdit.current.tags = categories
        onSetFilter(filterByToEdit.current)
    }

    function  slideLeft() {
        const slider = sliderRef.current
        if (slider.scrollLeft > 0) {
            slider.scrollLeft -= 1000
            setLastDirection('left')
        } else {
            setLastDirection('left')
        }
    }

    function slideRight() {
        const slider = sliderRef.current
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth

        if (slider.scrollLeft < maxScrollLeft) {
            slider.scrollLeft += 1000
            setLastDirection('right')
        } else {
            setLastDirection('right')
        }
    }

    const checkSliderPosition = () => {
        const slider = sliderRef.current
        setIsAtStart(slider.scrollLeft === 0) // Check if at the start
        setIsAtEnd(slider.scrollLeft + slider.clientWidth === slider.scrollWidth) // Check if at the end
    }

    useEffect(() => {
        const slider = sliderRef.current
        slider.addEventListener('scroll', checkSliderPosition)

        checkSliderPosition()

        return () => {
            slider.removeEventListener('scroll', checkSliderPosition)
        }
    }, [slides])

    return <section className="main-slider-container">
        <button className="slide-btn fa-solid chevron-left prev" onClick={slideLeft}  disabled={isAtStart} ></button>
        <ul className="slider" ref={sliderRef}>
            {slides.map((slide, idx) =>
                <div className="slider-card" key={idx} onClick={() => filterByCategory(["graphic-design", "design", "logo-design"])}>
                    <h4>
                        <small>{slide.desc}</small>
                        {slide.category}
                    </h4>
                    <div className="img-slide">
                        <img src={slide.url} alt="" />
                    </div>
                </div>
            )}
        </ul>
        <button className="slide-btn fa-solid chevron-right next" onClick={slideRight} disabled={isAtEnd} ></button>
    </section>
}