import { useEffect, useRef, useState } from 'react'
import { gigService } from '../services/gig/gig.service.remote'

export function Search({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const elInputRef = useRef(null)
    const { pathname } = window.location
    const [windowSize, setWindowSize] = useState(null)

    useEffect(() => {
        function handleResize() {
            setWindowSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onPlaceholder() {
        let placeholder = 'Search for any service...'
        if (pathname === '/') {
            placeholder = 'Search for any service...'
        } else if (pathname !== '/' && windowSize < 900) {
            placeholder = 'Search for any service...'
        }
        return placeholder
    }

    return (
        <form className="gig-search search-form" onSubmit={onSubmitFilter}>
            <input
                type="text"
                className={`gig-search ${pathname !== '/' ? 'long-placeholder' : ''}`}
                id="categories"
                name="categories"
                placeholder={onPlaceholder()}
                value={filterByToEdit.categories}
                onChange={handleChange}
                ref={elInputRef}
            />
            <button className="btn-gig-search">
                <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="black">
                        <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
                    </svg>
                </span>
            </button>
            <div className="search-bar-dim-background focused-animation"></div>
        </form>
    )
}
