import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export function SlideDetails({ gig }) {
    const slides = gig.imgUrl
    const [slideIndex, setSlideIndex] = useState(0)

    function plusSlides(n) {
        if (slideIndex === slides.length - 1 && n === 1) {
            setSlideIndex(0)
        } else if (slideIndex === 0 && n === -1) {
            setSlideIndex(slides.length - 1)
        } else {
            setSlideIndex(prevSlide => prevSlide + n)
        }
    }

    function currentSlide(n) {
        setSlideIndex(n)
    }

    return (
        <div className="slide-details">
            <div className="container-slide-detail">
              
                <div className="my-slides">
                    <img src={slides[slideIndex]} alt={`Slide ${slideIndex + 1}`} />
                </div>

                
                <a className="previous" onClick={() => plusSlides(-1)}>
                    <IoIosArrowBack />
                </a>
                <a className="next-slide" onClick={() => plusSlides(1)}>
                    <IoIosArrowForward />
                </a>

               
                <div className="thumbs-container">
                    {slides.map((slide, index) => (
                        <div className="column" key={index}>
                            <img
                                className={slideIndex === index ? "demo-active demo cursor" : "demo cursor"}
                                src={slide}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => currentSlide(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
