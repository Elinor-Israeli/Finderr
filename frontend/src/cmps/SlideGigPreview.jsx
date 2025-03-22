import { useState } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"

export function SlideGigPreview({ gig }) {
    let slides = gig.imgUrl
    const [slideIndex, setSlideIndex] = useState(0)
    const [isDynamic, setIsDynamic] = useState(0)

    function plusSlides(ev, n) {
        ev.preventDefault()
        if (ev.target.closest('.disabled')) return
        if (slideIndex === slides.length - 1 && n === 1) {
            setSlideIndex(0)
        } else if (slideIndex === 0 && n === -1) {
            setSlideIndex(slides.length - 1)
        } else {
            setSlideIndex(prevSlide => prevSlide + n)
        }
    }

    function onDot(ev, slideIndex) {
        ev.preventDefault()
        setSlideIndex(slideIndex)
        setIsDynamic(slideIndex)
    }
    return (
        <div className="gig-preview-img">
            <div className="image-container">
                <div
                    className={`prev ${slideIndex === 0 ? 'disabled' : ''}`}
                    onClick={(ev) => plusSlides(ev, -1)}
                >
                    <IoIosArrowBack className='icon-prev' style={{  fill: 'black',stroke:'black' }}/>
                </div>
                <img src={slides[slideIndex]} alt="Gig Preview" className='image-slides' />
                <div
                    className={`next ${slideIndex === slides.length - 1 ? 'disabled' : ''}`}
                    onClick={(ev) => plusSlides(ev, 1)}
                >
                    <IoIosArrowForward className='icon-next' style={{  fill: 'black',stroke:'black' }}/>
                </div>
            </div>
            <ul className="dot-container">
                {slides.map((slideIndex) => (
                    <li
                        key={slideIndex}
                        className={isDynamic === slideIndex ? "dot dot-active" : "dot"}
                        onClick={(ev) => onDot(ev, slideIndex)}
                    ></li>
                ))}
            </ul>
        </div>
    )
}

