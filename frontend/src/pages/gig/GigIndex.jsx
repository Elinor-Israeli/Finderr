import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GigBreadcrumbs } from '../../cmps/GigBreadcrumbs'
import { GigList } from '../../cmps/gig/GigList'
import { TopFilterBar } from '../../cmps/gig/ListFilterBar'
import { loadGigs } from '../../store/actions/gig.actions'
import { SET_FILTER } from '../../store/reducers/gig.reducer'
import loader from '/img/thloader.svg'

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
            queryParams.append('categories', filterBy.categories.join(','))
        }
        if (filterBy.minPrice) {
            queryParams.append('minPrice', filterBy.minPrice)
        }
        if (filterBy.maxPrice) {
            queryParams.append('maxPrice', filterBy.maxPrice)
        }
        if (filterBy.daysToMake) {
            queryParams.append('daysToMake', filterBy.daysToMake)
        }
            navigate(`/gig?${queryParams.toString()}`)    
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


    function getCategoryName(categories) {
        const categoryList = categories.split(',')
        switch (true) {
            case categoryList.includes('graphic-design') || categoryList.includes('design') || categoryList.includes('logo-design') || categoryList.includes('logo'):
                return 'Graphic & Design'
            case categoryList.includes('digital-marketing') || categoryList.includes('digital'):
                return 'Digital & Marketing'
            case categoryList.includes('writing-translation') || categoryList.includes('translation'):
                return 'Writing & Translation'
            case categoryList.includes('video-animation') || categoryList.includes('animation'):
                return 'Video & Animation'
            case categoryList.includes('music-audio') || categoryList.includes('audio'):
                return 'Music & Audio'
            case categoryList.includes('programming-tech') || categoryList.includes('tech'):
                return 'Programming & Tech'
            case categoryList.includes('business'):
                return 'Business'
            case categoryList.includes('lifestyle'):
                return 'Lifestyle'
            case categoryList.includes('trending'):
                return 'Trending'
            default:
                return 'Unknown Category'
        }
    }


    if (!gigs.length && isLoading) return <div> loading...</div>

    return (
        <section className="gig-index full ">
            <GigBreadcrumbs />
            <h1 className='headline-name'>
                {
                    searchParams.get('categories')
                        ? `Results for ${getCategoryName(searchParams.get('categories'))}`
                        : 'Brand Style Guides'
                }
            </h1>
            <p className="topic-explain">Let us help you give your brand the best minimalist logo design by hiring an expert minimalist logo designer.
            </p>
            <div className={`${filterAndSort}`}>
                <div className="filter-sort-container">
                    <TopFilterBar onSetFilter={onSetFilter} />
                </div>
            </div>

            {gigs.length > 0 ? (
                <p>{gigs.length}+ results</p>
            ) : gigs.length === 0 ? (
                <p>No results found</p>
            ) : (
                <div className="loader-container">
                    <img src={loader} className="theloader" />
                </div>
            )}

            {gigs && gigs.length > 0 && <GigList gigs={gigs} />}
        </section>
    )
}