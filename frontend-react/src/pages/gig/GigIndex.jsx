import { useEffect, useState,useCallback  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GigBreadcrumbs } from '../../cmps/GigBreadcrumbs'
import { GigList } from '../../cmps/gig/GigList'
import { TopFilterBar } from '../../cmps/gig/listfilterBar'
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
    }, [filterBy,onSetFilter,searchParams ])

    useEffect(() => {
        loadGigs(filterBy)
    }, [filterBy])

    const onSetFilter = useCallback((filterBy) => {
        dispatch({ type: SET_FILTER, filterBy })
        let queryStringParams = `?categories=${filterBy.categories}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
        navigate(`/gig${queryStringParams}`)
    }, [dispatch, navigate]) 

    function getCategoryName(categories) {
        switch (categories) {
            case ['graphic-design', 'design', 'logo-design', 'logo']:
                return <h1>Graphic & Design</h1>
            case ['digital-marketing', 'digital']:
                return <h1>Digital & Marketing</h1>
            case ['writing-translation', 'translation']:
                return <h1>Writing & Translation</h1>
            case ['video-animation', 'animation']:
                return <h1>Video & Animation</h1>
            case ['music-audio', 'audio']:
                return <h1>Music & Audio</h1>
            case ['programming-tech', 'tech']:
                return <h1>Programming & Tech</h1>
            case ['business']:
                return <h1>Business</h1>
            case ['lifestyle']:
                return <h1>Lifestyle</h1>
            case ['trending']:
                return <h1>Trending</h1>
            default: return
        }
    }

    if (!gigs.length && isLoading) return <div> loading...</div>


    return (
        <section className="gig-index full ">
            <GigBreadcrumbs />
            <h1 className='headline-name'>
                {
                    searchParams.get('categories') && searchParams.get('categories') !== ''
                        ? `Results for "${searchParams.get('categories')}"`
                        : searchParams.get('categories')
                            ? getCategoryName(searchParams.get('categories'))
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
            ) : (
                <div className="loader-container">
                    <img src={loader} className="thloader" />
                </div>
            )}

            {gigs && <GigList gigs={gigs} />}
        </section>
    )
}