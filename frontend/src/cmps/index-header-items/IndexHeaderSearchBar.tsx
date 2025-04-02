import {  useEffect, useRef, useState, useCallback } from 'react'
import useOnSetFilter from '../../utils/hooks'
import { gigService } from '../../services/gig/gig.service.remote'

export function IndexHeaderSearchBar () {
      const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
      const onSetFilter = useOnSetFilter()

    const elInputRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const { pathname } = window.location


    useEffect(() => {
        function handleScroll() {
          const scrollPosition = window.scrollY;
          if (pathname === '/' && scrollPosition >= 150) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      }, [pathname])

       const handleChange = useCallback(({ target }) => {
          let { value, name: field, type } = target
          value = (type === 'number') ? +value : value
          setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        }, [setFilterByToEdit])

        const onSubmitFilter = useCallback((ev) => {
            ev.preventDefault()
            onSetFilter(filterByToEdit)
          }, [filterByToEdit, onSetFilter])

    return (
        <form
        className={`index-search ${pathname !== '/' ? 'always-visible' : isVisible ? 'block-header' : 'hidden'}`}
        onSubmit={onSubmitFilter}
      >
        <div className="search-index-input">
          <input
            type="text"
            className={`gig-search ${pathname !== '/' ? 'long-placeholder' : ''}`}
            id="categories"
            name="categories"
            placeholder={'What service are you looking for today?'}
            value={filterByToEdit.categories}
            onChange={handleChange}
            ref={elInputRef}
          />
          <button className="btn-index-search">
            <span>
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="white">
                <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
              </svg>
            </span>
          </button>
        </div>
      </form>
    )
}