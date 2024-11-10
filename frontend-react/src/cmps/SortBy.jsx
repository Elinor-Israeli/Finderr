import { useState, useCallback,useEffect } from 'react'
import { gigService } from '../services/gig/gig.service.local'

export function SortBy({ onSort }) {
    const [sortBy, setSortBy] = useState(gigService.getDefaultSort())
    const [sortByShow, setSortByShow] = useState(false)

    const toggleSortByShow = useCallback(() => {
      setSortByShow(prev => !prev)
    }, [])
  
    function handleChangeSort ({ target }){
      const { value } = target
      setSortBy(prev => ({ ...prev, category: value }))
      onSort({ ...sortBy, category: value })
      setSortByShow(false)
    }

    useEffect(() => {
        const handleOutsideClick = (ev) => {
          if (!ev.target.closest('.filter-menu.sort-by')) {
            setSortByShow(false)
          }
        }
        
        document.addEventListener("mousedown", handleOutsideClick)
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick)
        }
      }, [])
  
    return (
      <div className="gig-sort">
        <span>Sort by</span>
        <div className="filter-menu sort-by" onClick={toggleSortByShow}>
          {sortBy.category}
          <span className="fa-solid angle-down"></span>
          {sortByShow && (
            <div className="sort-by-options">
              <div className="sort-option">
                <input
                  type="radio"
                  id="recommended"
                  name="sort-by"
                  value="recommended"
                  onChange={handleChangeSort}
                  checked={sortBy.category === 'recommended'}
                />
                <label htmlFor="recommended">
                  <span>
                    <div className="checked-input"></div>
                  </span>
                  Recommended
                </label>
              </div>
              <div className="sort-option">
                <input
                  type="radio"
                  id="price"
                  name="sort-by"
                  value="price"
                  onChange={handleChangeSort}
                  checked={sortBy.category === 'price'}
                />
                <label htmlFor="price">
                  <span>
                    <div className="checked-input"></div>
                  </span>
                  Price
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }