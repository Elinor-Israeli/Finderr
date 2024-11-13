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

   function checkSliderPosition(){
        const slider = sliderRef.current
        setIsAtStart(slider.scrollLeft === 0) 
        setIsAtEnd(slider.scrollLeft + slider.clientWidth === slider.scrollWidth) 
    }

    useEffect(() => {
        const slider = sliderRef.current
        slider.addEventListener('scroll', checkSliderPosition)

        checkSliderPosition()

        return () => {
            slider.removeEventListener('scroll', checkSliderPosition)
        }
    }, [slides])

    const categoryColors = {
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
        'Marketing': '#00732e',
    }

    return (
        <section className="main-slider-container">
            <button
                className="slide-btn fa-solid chevron-left prev"
                onClick={slideLeft}
                disabled={isAtStart}
            ></button>
            <ul className="slider" ref={sliderRef}>
                {slides.map((slide, idx) => {
                    //* the background color based on the category
                    const backgroundColor = categoryColors[slide.category] || '#FFFFFF'; // default 
    
                    return (
                        <li 
                            className="slider-item" 
                            key={idx} 
                            style={{ backgroundColor }} 
                        >
                            <div onClick={() => filterByCategory(["graphic-design", "design", "logo-design"])}>
                            <div className="card-content">
                                    <h4>{slide.category}</h4>
                                    <p>{slide.desc}</p>
                                </div>
                                <div className="img-slide-list">
                                    <img className="img-slide-list" src={slide.url} alt={slide.desc || "Slide Image"} />
                                </div>
                               
                            </div>
                        </li>
                    )
                })}
            </ul>
            <button
                className="slide-btn fa-solid chevron-right next"
                onClick={slideRight}
                disabled={isAtEnd}
            ></button>
        </section>
    )
}