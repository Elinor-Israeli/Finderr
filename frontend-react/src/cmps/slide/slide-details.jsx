import { useState } from 'react'
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
// import { GigCard } from '../gig/GigCard';

export function SlideDetails({ gig }) {
    let slides = gig.imgUrl
    const [slideIndex, setSlideIndex] = useState(0)
    const [isDynamic, setIsDynamic] = useState(0)

    // Next/prev controls forword and back 
    function plusSlides(n) {
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

    function currentSlide(n) {
        setSlideIndex(n)
        setIsDynamic(n)
    }

    return <div className="slide-details">
        <div className="container">
            <div className="my-slides">
                <img src={slides[slideIndex]} />
            </div>

            <a className="prev fa-solid chevron-left" onClick={() => plusSlides(-1)}><IoIosArrowBack /></a>
            <a className="next fa-solid chevron-right" onClick={() => plusSlides(1)}><IoIosArrowForward /></a>
            <div className="thumbs-containers">
                {slides.map((slide, index) => {
                    return <div className="column" key={index}>
                        <img className={isDynamic === index ? "demo-active demo cursor " : "demo cursor"} src={slide} onClick={() => currentSlide(index)} />
                    </div>
                })}
            </div>
            {/* <GigCard></GigCard> */}

        </div>
    </div>
}
