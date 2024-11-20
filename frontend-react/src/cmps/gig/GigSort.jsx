import { useEffect, useRef, useState } from 'react'
import { gigService } from '../../services/gig/gig.service.local'

export function SortBy({ onSort }) {
  const [sortBy, setSortBy] = useState(gigService.getDefaultSort())
  const [isSortByShown, setIsSortByShown] = useState(false)  
  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isSortByShown && ref.current && !ref.current.contains(e.target)) {
        setIsSortByShown(false) 
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isSortByShown])

  function handleChangeSort({ target }) {
    const { value } = target
    const newSortBy = { ...sortBy, categorySort: value }
    setSortBy(newSortBy)
    onSort(newSortBy)
    setIsSortByShown(false)
  }

  return
//    (
    // <div className="gig-sort">
    //   <span>Sort by</span>
    //   <div className="filter-menu sort-by" ref={ref}>
    //     {sortBy.categorySort}
    //     <span className=" angle-down"></span>
    //     {isSortByShown && (
    //       <div className="sort-by-options">
    //         <div className="sort-option">
    //           <input
    //             type="radio"
    //             id="recommended"
    //             name="sort-by"
    //             value="recommended"
    //             onChange={handleChangeSort}
    //             checked={sortBy.categorySort === 'recommended'} 
    //           />
    //           <label htmlFor="recommended"><span><div className="checked-input"></div></span>Recommended</label>
    //         </div>
    //         <div className="sort-option">
    //           <input
    //             type="radio"
    //             id="price"
    //             name="sort-by"
    //             value="price"
    //             onChange={handleChangeSort}
    //             checked={sortBy.categorySort === 'price'} 
    //           />
    //           <label htmlFor="price"><span><div className="checked-input"></div></span>Price</label>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
//   )
}
