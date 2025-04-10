import { useEffect, useRef, useState } from 'react'
import { gigService } from '../../services/gig/gig.service.remote'
import useOnSetFilter from '../../utils/hooks'
import { getPopularServices, categoryColors} from '../../utils/ui'

interface Slide {
    category: string;
    desc: string;
    url: string;
  }
  

export function PopularServicesCarousel() {
    const slides = getPopularServices()
    const sliderRef =  useRef<HTMLUListElement | null>(null)
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isAtStart, setIsAtStart] = useState<boolean>(true)
    const [isAtEnd, setIsAtEnd] = useState<boolean>(false)
    const onSetFilter = useOnSetFilter()

    function filterByCategory( categories:string[]): void {
        const updatedFilter = { ...filterByToEdit,  categories }
        setFilterByToEdit(updatedFilter)
        onSetFilter(updatedFilter)
    }

    function slideLeft(): void {
        const slider = sliderRef.current
        if (slider.scrollLeft > 0) {
            slider.scrollLeft -= 500
        }
    }
    
    function slideRight(): void  {
        const slider = sliderRef.current
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth
    
        if (slider.scrollLeft < maxScrollLeft) {
            slider.scrollLeft += 500
        }
    }

    function checkSliderPosition(): void  {
        const slider = sliderRef.current
        const maxScrollLeft = slider.scrollWidth - slider.clientWidth
        const isAtStart = slider.scrollLeft === 0
        const isAtEnd = slider.scrollLeft >= maxScrollLeft - 1

        setIsAtStart(isAtStart)
        setIsAtEnd(isAtEnd)
    }

    useEffect(() => {
        const slider = sliderRef.current
        slider.addEventListener('scroll', checkSliderPosition)
        checkSliderPosition()
        return () => {
            slider.removeEventListener('scroll', checkSliderPosition)
        }
    }, [slides])
     
    return (
        <section className='contain-all-slider'>
            <div className='popular-services'>
                <p>Popular services</p>
            </div>
            <section className="main-slider-container">
                <button
                    className="slide-btn prev"
                    onClick={slideLeft}
                    disabled={isAtStart}
                >
                    <svg width="16" height="16" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.2279 0.690653L7.84662 1.30934C7.99306 1.45578 7.99306 1.69322 7.84662 1.83968L2.19978 7.5L7.84662 13.1603C7.99306 13.3067 7.99306 13.5442 7.84662 13.6907L7.2279 14.3094C7.08147 14.4558 6.84403 14.4558 6.69756 14.3094L0.153374 7.76518C0.00693607 7.61875 0.00693607 7.38131 0.153374 7.23484L6.69756 0.690653C6.84403 0.544184 7.08147 0.544184 7.2279 0.690653Z"></path>
                    </svg>
                </button>
                <ul className="slider" ref={sliderRef}>
                    {slides.map((slide, idx) => {
                        const backgroundColor = categoryColors[slide.category] || '#FFFFFF'; 

                        return (
                            <li
                                className="slider-item"
                                key={idx}
                                style={{ backgroundColor }}
                            >
                                <div onClick={() => filterByCategory([slide.category.toLowerCase().replace(/\s+/g, '-')])}>
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
                    className="slide-btn next"
                    onClick={slideRight}
                    disabled={isAtEnd}
                >
                    <svg width="16" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"></path>
                    </svg>
                </button>
            </section>
        </section>
    )
}