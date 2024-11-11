import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { GigSort } from '../../cmps/gig/GigSort'

import { GigList } from '../../cmps/gig/GigList' 
// import { TopFilterBar } from '../../cmps/gig/top-filter-bar'
// import { SortyBy } from '../../cmps/gig/sort-by'
import { loadGigs } from '../../store/actions/gig.actions' 
import { SET_FILTER } from '../../store/reducers/gig.reducer' 
// import { SortBy } from '../../cmps/SortBy'

export function GigIndex() {
    const filterByFromStore = useSelector(storeState => storeState.gigModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.gigModule.sortBy)
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    let gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    // const [filterSortClassName, setFilterSortClassName] = useState('')

    // useEffect(() => {
    //     renderUiByQueryStringParams()
    // }, [])

    useEffect(() => {
        loadGigs(filterBy, sortBy)
    }, [filterBy, sortBy])

    // function renderUiByQueryStringParams() {
    //     if (searchParams.get('title')) {
    //         filterBy.title = searchParams.get('title')
    //     }

    //     if (searchParams.get('category')) {
    //         filterBy.tags = [searchParams.get('category')]
    //     }

    //     if (searchParams.get('minPrice')) {
    //         filterBy.minPrice = [searchParams.get('minPrice')]
    //     }

    //     if (searchParams.get('maxPrice')) {
    //         filterBy.maxPrice = [searchParams.get('maxPrice')]
    //     }

    //     if (searchParams.get('daysToMake')) {
    //         filterBy.daysToMake = [searchParams.get('daysToMake')]
    //     }
    //     onSetFilter(filterBy)
    // }

    function onSort(sortBy) {
        dispatch({ type: SET_SORT, sortBy })
    }

    if (!gigs.length && isLoading) return <div>loading...</div>
    return <section className="gig-index full main-layout">
            <div className="filter-sort-container">
                {/* <TopFilter onSetFilter={onSetFilter} /> */}
                {/* <SortBy onSort={onSort} /> */}
            </div>
            {/* <GigSort onSort={onSort} /> */}
        <GigList gigs={gigs} />
       
    </section>
}