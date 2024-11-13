import { useState } from 'react'
// import { IoIosArrowDropright } from "react-icons/io";
// import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export function SlideGigPreview({ gig }) {
    let slides = gig.imgUrl
    const [slideIndex, setSlideIndex] = useState(0)
    const [isDynamic, setIsDynamic] = useState(0)

    function plusSlides(ev, n) {
        ev.preventDefault();
        
        // Prevent action if the button is disabled
        if (ev.target.closest('.disabled')) return;

        if (slideIndex === slides.length - 1 && n === 1) {
            setSlideIndex(0); // Go to the first slide
        } else if (slideIndex === 0 && n === -1) {
            setSlideIndex(slides.length - 1); // Go to the last slide
        } else {
            setSlideIndex(prevSlide => prevSlide + n); // Increment or decrement slide index
        }
    }

    function onDot(ev, slideIndex) {
        ev.preventDefault()
        setSlideIndex(slideIndex)
        setIsDynamic(slideIndex)
    }
    //  ! here (Swallows the image)
    return (
        // <div className="next fa-solid chevron-right" onClick={(ev) => plusSlides(ev, 1)}></div>

        <div className="gig-preview-img">
            <div className="image-container">
                <div
                    className={`prev ${slideIndex === 0 ? 'disabled' : ''}`}
                    onClick={(ev) => plusSlides(ev, -1)}
                >
                    <IoIosArrowBack />
                </div>
                <img src={slides[slideIndex]} alt="Gig Preview" className='image-slides' />

                <div
                    className={`next ${slideIndex === slides.length - 1 ? 'disabled' : ''}`}
                    onClick={(ev) => plusSlides(ev, 1)}
                >
                    <IoIosArrowForward />
                </div>
            </div>
            <ul className="dot-container">
                {slides.map((slide, slideIndex) => (
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

