import { useEffect, useState } from 'react'

export function Accordion({ children, title = 'Some important title' }) {
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 600px)").matches)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 600px)")
        const handleMediaChange = (event) => setIsMobile(event.matches)
        
        mediaQuery.addEventListener('change', handleMediaChange)

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange)
        }
    }, [])

    function toggleAccordion() {
        if (isMobile) {
            setIsOpen((prev) => !prev)
        }
    }

    // only render the Accordion if isMobile is true
    return (
        isMobile && (
            <section className={`accordion ${isOpen ? 'open' : ''}`}>
                <section onClick={toggleAccordion} className="title-container">
                    <h2>{title}</h2>
                    <span className="arrow">⌄</span>
                </section>
                {isOpen && <section className="content">{children}</section>}
            </section>
        )
    )
}
