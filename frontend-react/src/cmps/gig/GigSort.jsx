// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { setFilter } from "path-to-actions";
//     const [isChecked, setisChecked] = useState({ bestSelling: false, recommended: false, newestArrivals: false });


export function SortBy({ handleCloseSort }) {
    // const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
    // const [isChecked, setisChecked] = useState({ bestSelling: false, recommended: false, newestArrivals: false })

    // useEffect(() => {
    //     switch (filterBy.sort) {
    //         case 'bestSelling':
    //             setisChecked({ bestSelling: true, recommended: false, newestArrivals: false })
    //             break;
    //         case 'recommended':
    //             setisChecked({ bestSelling: false, recommended: true, newestArrivals: false })
    //             break;
    //         case 'newestArrivals':
    //             setisChecked({ bestSelling: false, recommended: false, newestArrivals: true })
    //             break;

    //         default:
    //             break;
    //     }
    // }, [filterBy])

    // function onSort(ev, type) {
    //     ev.preventDefault()
    //     setFilter({ ...filterBy, sort: type })
    //     handleCloseSort()

    //     switch (filterBy.sort) {
    //         case 'bestSelling':
    //             setisChecked({ bestSelling: true, recommended: false, newestArrivals: false })
    //             break;
    //         case 'recommended':
    //             setisChecked({ bestSelling: false, recommended: true, newestArrivals: false })
    //             break;
    //         case 'newestArrivals':
    //             setisChecked({ bestSelling: false, recommended: false, newestArrivals: true })
    //             break;

    //         default:
    //             break;
    //     }
    // }

    // return (
    //     <form className={`sort-gig-form`}>

    //         <button className="sort-option" onClick={(ev) => onSort(ev, 'bestSelling')}>
    //             <div className={`${isChecked.bestSelling ? '' : 'transparent'}`}><svg width="14" height="14" viewBox="0 0 16 16" fill="#333" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z" /></svg></div>
    //             <p>Best selling</p>
    //         </button>

    //         <button className="sort-option" onClick={(ev) => onSort(ev, 'recommended')}>
    //             <div className={`${isChecked.recommended ? '' : 'transparent'}`}><svg width="14" height="14" viewBox="0 0 16 16" fill="#333" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z" /></svg></div>
    //             <p>Recommended</p>
    //         </button>

    //         <button className="sort-option" onClick={(ev) => onSort(ev, 'newestArrivals')}>
    //             <div className={`${isChecked.newestArrivals ? '' : 'transparent'}`}><svg width="14" height="14" viewBox="0 0 16 16" fill="#333" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z" /></svg></div>
    //             <p>Newest arrivals</p>
    //         </button>

    //     </form>
    // )
}