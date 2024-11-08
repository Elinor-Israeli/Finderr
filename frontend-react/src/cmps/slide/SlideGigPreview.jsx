import { useState } from 'react'
import { IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDropleft } from "react-icons/io";

export function SlideGigPreview({ gig }) {
    let slides = gig.imgUrl
    const [slideIndex, setSlideIndex] = useState(0)
    const [isDynamic, setIsDynamic] = useState(0)

    function plusSlides(ev, n) {
        ev.preventDefault()
        if (slideIndex === slides.length - 1 && n === 1) {
            setSlideIndex(0)
            setIsDynamic(0)
        }
        else if (slideIndex === 0 && n === -1) {
            setSlideIndex(slides.length - 1)
            setIsDynamic(slides.length - 1)
        }
        else {
            setSlideIndex((prevSlide) => (prevSlide + n))
            setIsDynamic(slideIndex + n)
        }
    }

    function onDot(ev, slideIndex) {
        ev.preventDefault()
        setSlideIndex(slideIndex)
        setIsDynamic(slideIndex)
    }

    return (
        <div className="gig-preview-img">
            {/* Left Arrow (previous slide) */}
            <div
                className="prev"
                onClick={(ev) => plusSlides(ev, -1)}
            >
                {/* <IoIosArrowDropleft style={{ fontSize: '2rem' }} /> */}
            </div>

            {/* Image */}
            <img src={slides[slideIndex]} alt="Gig Preview" />

            {/* Right Arrow (next slide) */}
            <div
  className="next"
  onClick={(ev) => plusSlides(ev, 1)}
//   style={{
//     // background: 'transparent url(https://fiverr-res.cloudinary.com/npm-assets/@fiverr/search_perseus/apps/carousel-arrows.b9dde63.svg) no-repeat',
//     backgroundSize: 'contain', // Makes sure the background scales nicely
//     backgroundPosition: 'center', // Centers the background image
//     width: '70px', // Set an appropriate width for the div
//     display: 'flex', // Flexbox to center the icon
//     justifyContent: 'center',
//     alignItems: 'center',
//   }}
>
  {/* <IoIosArrowDropright style={{ fontSize: '10rem', width: 'auto', height: 'auto' }} /> */}
</div>

            {/* Dot Navigation */}
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