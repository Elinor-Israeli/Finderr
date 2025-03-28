import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GigBreadcrumbs } from '../cmps/GigBreadcrumbs'
import { GigList } from '../cmps/gig-index-items/GigList'
import { SortBudgetAndDelivery } from '../cmps/gig-index-items/SortBudgetAndDelivery'
import { loadGigs } from '../store/actions/gig.actions'
import { SET_FILTER } from '../store/reducers/gig.reducer'
import { Loader } from '../cmps/Loader'
import { getCategoryName } from '../utils/ui'
import { GigCategoryToolBar } from '../cmps/GigCategoryToolBar'

export function GigIndex() {
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    let gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [filterAndSort, setFilterAndSort] = useState('')

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY >= 140) setFilterAndSort('filter-sort full  filter-sort-shadow')
            else setFilterAndSort('filter-sort full ')
        }
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const onSetFilter = useCallback((filterBy) => {
        dispatch({ type: SET_FILTER, filterBy })

        const queryParams = new URLSearchParams()

        if (filterBy.categories && filterBy.categories.length > 0) {
            queryParams.set('categories', filterBy.categories.join(','))
        } else {
            queryParams.delete('categories')
        }

        if (filterBy.minPrice) {
            queryParams.set('minPrice', filterBy.minPrice)
        } else {
            queryParams.delete('minPrice')
        }

        if (filterBy.maxPrice) {
            queryParams.set('maxPrice', filterBy.maxPrice)
        } else {
            queryParams.delete('maxPrice')
        }

        if (filterBy.daysToMake) {
            queryParams.set('daysToMake', filterBy.daysToMake)
        } else {
            queryParams.delete('daysToMake')
        }

        navigate(`/gig?${queryParams.toString()}`, { replace: true }) //This prevents the filter updates from cluttering the browser history, making the back button behave as expected.

    }, [dispatch, navigate])


    useEffect(() => {
        function renderParams() {
            if (searchParams.getAll('categories').length != 0) {
                filterBy.categories = searchParams.getAll('categories')[0].split(',')
            }

            if (searchParams.get('minPrice')) {
                filterBy.minPrice = searchParams.get('minPrice')
            }

            if (searchParams.get('maxPrice')) {
                filterBy.maxPrice = searchParams.get('maxPrice')
            }

            if (searchParams.get('daysToMake')) {
                filterBy.daysToMake = searchParams.get('daysToMake')
            }
            onSetFilter(filterBy)
        }
        renderParams()
    }, [filterBy, onSetFilter, searchParams])

    useEffect(() => {
        loadGigs(filterBy)
    }, [filterBy])


    const categories = searchParams.get('categories')?.split(',')

    return (
        <section className="gig-index full ">
          <div className="sticky-toolbar main-layout">
            <GigCategoryToolBar onSetFilter={onSetFilter} />
        </div>
            <GigBreadcrumbs />
            <h1 className='headline-name'>
                {
                    searchParams.get('categories')
                        ? `Results for ${getCategoryName(categories).headline}`
                        : getCategoryName([])?.headline
                }
            </h1>
            <p className="topic-explain">
                {
                    searchParams.get('categories')
                        ? ` ${getCategoryName(categories).secondHeadline}`
                        : getCategoryName([])?.secondHeadline
                }
            </p>
            <div className={`${filterAndSort}`}>
                <div className="filter-sort-container">
                    <SortBudgetAndDelivery onSetFilter={onSetFilter} />
                </div>
            </div>

            {isLoading ? (
                <Loader src="https://fiverr-res.cloudinary.com/app_assets/fiverr_logo_loader.svg" alt="Thumbnail not available" />
            ) : gigs.length > 0 ? (
                <p>{gigs.length}+ results</p>
            ) : (
                <p>No results found</p>
            )}

            {!isLoading && gigs.length > 0 && <GigList gigs={gigs} />}

        </section>
    )
}