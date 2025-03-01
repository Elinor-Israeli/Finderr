import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { GigBreadcrumbs } from '../../cmps/GigBreadcrumbs'
import { GigList } from '../../cmps/gig/GigList'
import { TopFilterBar } from '../../cmps/gig/ListFilterBar'
import { loadGigs } from '../../store/actions/gig.actions'
import { SET_FILTER } from '../../store/reducers/gig.reducer'
import { Loader } from '../../cmps/Loader'
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


    function getCategoryName(categories) {
        const categoryList = categories.split(',')
        switch (true) {
            case categoryList.includes('graphic-design') || categoryList.includes('design') || categoryList.includes('logo-design') || categoryList.includes('logo'):
                return {
                    headline: 'Graphic & Design',
                    secondHeadline: 'Let us help you create stunning visuals for your brand with expert graphic design.'
                }
            case categoryList.includes('digital-marketing') || categoryList.includes('digital'):
                return {
                    headline: 'Digital & Marketing',
                    secondHeadline: 'Maximize your online presence and grow your business with digital marketing experts.'
                }
            case categoryList.includes('writing-translation') || categoryList.includes('translation'):
                return {
                    headline: 'Writing & Translation',
                    secondHeadline: 'Communicate clearly with professional writing and translation services.'
                }
            case categoryList.includes('video-animation') || categoryList.includes('animation'):
                return {
                    headline: 'Video & Animation',
                    secondHeadline: 'Bring your ideas to life with high-quality video production and animation services.'
                }
            case categoryList.includes('music-audio') || categoryList.includes('audio'):
                return {
                    headline: 'Music & Audio',
                    secondHeadline: 'Enhance your project with top-quality music and audio production.'
                }
            case categoryList.includes('programming-tech') || categoryList.includes('tech'):
                return {
                    headline: 'Programming & Tech',
                    secondHeadline: 'Get the best tech solutions and custom programming to power your business.'
                }
            case categoryList.includes('business'):
                return {
                    headline: 'Business',
                    secondHeadline: 'Grow your business with expert strategies and solutions.'
                }
            case categoryList.includes('lifestyle'):
                return {
                    headline: 'Lifestyle',
                    secondHeadline: 'Enhance your lifestyle with expert services and personal growth solutions.'
                }
            case categoryList.includes('trending'):
                return {
                    headline: 'Trending',
                    secondHeadline: 'Stay ahead of the curve with the latest trending services.'
                }
            default:

        }
    }

    return (
        <section className="gig-index full ">
            <GigBreadcrumbs />
            <h1 className='headline-name'>
                {
                    searchParams.get('categories')
                        ? `Results for ${getCategoryName(searchParams.get('categories')).headline}`
                        : 'Browse, Hire, and Get Things Done'
                }
            </h1>
            <p className="topic-explain">
                {
                    searchParams.get('categories')
                        ? ` ${getCategoryName(searchParams.get('categories')).secondHeadline}`
                        : 'Hire experts in design, writing, marketing, tech, and more - all in one place!'
                }
            </p>
            <div className={`${filterAndSort}`}>
                <div className="filter-sort-container">
                    <TopFilterBar onSetFilter={onSetFilter} />
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