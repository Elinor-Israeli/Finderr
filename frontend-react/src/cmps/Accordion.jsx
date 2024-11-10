import { useEffect, useState } from 'react'
import { IoIosArrowForward, IoIosArrowDown  } from 'react-icons/io';

export function Accordion({ children, title = 'Some important title' }) {
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 600px)").matches)
    const [isOpen, setIsOpen] = useState(false)

    // useEffect(() => {
    //     const mediaQuery = window.matchMedia("(max-width: 600px)")
    //     const handleMediaChange = (event) => setIsMobile(event.matches)
        
    //     mediaQuery.addEventListener('change', handleMediaChange)

    //     return () => {
    //         mediaQuery.removeEventListener('change', handleMediaChange)
    //     }
    // }, [])

    function toggleAccordion() {
            setIsOpen((prev) => !prev)
    }

    return (

            <section className={`accordion ${isOpen ? 'open' : ''}`}>
                <section onClick={toggleAccordion} className="title-container">
                    <h2>{title}</h2>
                    <span className="arrow">
                    {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />} 
                </span>
                    {/* </span> */} //! here (up and no down)
                </section>
                {isOpen && <section className="content">{children}</section>}
            </section>
    )
}

// ⌄