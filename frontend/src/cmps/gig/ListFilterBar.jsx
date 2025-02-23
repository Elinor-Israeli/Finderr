import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { gigService } from '../../services/gig/gig.service.remote'

export function TopFilterBar({ onSetFilter ,filterBy}) {
    const filterByFromStore = useSelector((storeState) => storeState.gigModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isPriceFilterShown, setIsPriceFilterShown] = useState(false)
    const [isDeliveryShown, setIsDeliveryShown] = useState(false)
    const [selectedDelivery, setSelectedDelivery] = useState(filterBy?.daysToMake || null)  

    const ref = useRef()
    const deliveryRef = useRef()
    const checkedDelivery = filterByFromStore.daysToMake
    const navigate = useNavigate()
    const location = useLocation()    

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const categories = queryParams.get('categories')
            ? queryParams.get('categories').split(',').filter(cat => cat.trim() !== '')
            : []      
        const minPrice = queryParams.get('minPrice') || ''
        const maxPrice = queryParams.get('maxPrice') || ''
        const daysToMake = queryParams.get('daysToMake') || ''

        setFilterByToEdit({ categories, minPrice, maxPrice, daysToMake })        
    }, [location.search])

    const handleChangePrice = (ev) => {
        const { target } = ev
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const handleChangeDelivery = (ev) => {
        const { name, value } = ev.target
        setSelectedDelivery(value) 
    }

    const handleApplyDelivery = () => {
        setFilterByToEdit((prev) => {
            const updatedFilter = { ...prev, daysToMake: selectedDelivery }
            onSetFilter(updatedFilter) 
            setIsDeliveryShown(false)
            return updatedFilter
        })
    }

    const handleApplyPrice  = () => {
        onSetFilter(filterByToEdit)
        setIsPriceFilterShown(false)
    
        const queryParams = new URLSearchParams(location.search)
            filterByToEdit.daysToMake ? queryParams.set('daysToMake', filterByToEdit.daysToMake) : queryParams.delete('daysToMake')

        const validCategories = filterByToEdit.categories.filter(cat => cat.trim() !== '')
        validCategories.length > 0 ? queryParams.set('categories', validCategories.join(',')) : queryParams.delete('categories')
    
        navigate({ search: queryParams.toString() })
    }
    
    const onClearDelivery = () => {
       const newFilterByToEdit = {
            ...filterByToEdit,
            daysToMake: ''
        }
        setFilterByToEdit(newFilterByToEdit)
        onSetFilter(newFilterByToEdit)
        
        setIsDeliveryShown(false)
        const queryParams = new URLSearchParams(location.search)
        queryParams.delete('daysToMake')
    }

     const onClearBudget = () => {
        const newFilterByToEdit ={
            ...filterByToEdit,
            minPrice: '',
            maxPrice: ''
        }
        setFilterByToEdit(newFilterByToEdit)
        onSetFilter(newFilterByToEdit)
        setIsPriceFilterShown(false)
        const queryParams = new URLSearchParams(location.search)
    
        queryParams.delete('minPrice')
        queryParams.delete('maxPrice')
    }
    
    const toggleDelivery = () => setIsDeliveryShown(prev => !prev)
    const togglePrice = () => setIsPriceFilterShown(prev => !prev)

    return (
        <div className="top-filter-bar">
            {/* Delivery Time Filter */}
            <div
                className={`top-filter-bar__filter-menu top-filter-bar__filter-delivery ${checkedDelivery !== '' ? 'top-filter-bar__active-filter' : ''}`}
                ref={deliveryRef}
            >
                <span onClick={toggleDelivery}>Delivery Time</span>
                <svg
                    className="top-filter-bar__svg-icon-adjusted"
                    width="13"
                    height="13"
                    viewBox="0 0 11 7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    onClick={toggleDelivery}
                >
                    <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path>
                </svg>
                <span className="fa-solid angle-down"></span>

                {isDeliveryShown && (
                    <div className="top-filter-bar__delivery-filter-options">
                        <div className="top-filter-bar__delivery-option">
                            <input
                                type="radio"
                                id="daysToMake1"
                                name="daysToMake"
                                value="1"
                                onChange={handleChangeDelivery}
                                checked={selectedDelivery === '1'}
                            />
                            <label htmlFor="daysToMake1">
                                <span>
                                    <div className="top-filter-bar__checked-input"></div>
                                </span>
                                Express 24H
                            </label>
                        </div>
                        <div className="top-filter-bar__delivery-option">
                            <input
                                type="radio"
                                id="daysToMake3"
                                name="daysToMake"
                                value="3"
                                onChange={handleChangeDelivery}
                                checked={selectedDelivery === '3'}
                            />
                            <label htmlFor="daysToMake3">
                                <span>
                                    <div className="top-filter-bar__checked-input"></div>
                                </span>
                                Up to 3 days
                            </label>
                        </div>
                        <div className="top-filter-bar__delivery-option">
                            <input
                                type="radio"
                                id="daysToMake7"
                                name="daysToMake"
                                value="7"
                                onChange={handleChangeDelivery}
                                checked={selectedDelivery === '7'}
                            />
                            <label htmlFor="daysToMake7">
                                <span>
                                    <div className="top-filter-bar__checked-input"></div>
                                </span>
                                Up to 7 days
                            </label>
                        </div>
                        <div className="top-filter-bar__delivery-option">
                            <input
                                type="radio"
                                id="daysToMake"
                                name="daysToMake"
                                value=""
                                onChange={handleChangeDelivery}
                                checked={selectedDelivery === ''}
                            />
                            <label htmlFor="daysToMake">
                                <span>
                                    <div className="top-filter-bar__checked-input"></div>
                                </span>
                                Anytime
                            </label>
                        </div>
                        <div className="top-filter-bar__filter-price-btns">
                            <div className="top-filter-bar__clear-all" onClick={onClearDelivery}>
                                Clear All
                            </div>
                            <button type="button" onClick={handleApplyDelivery}>
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Budget Filter */}
            <div
                className={`top-filter-bar__filter-menu top-filter-bar__filter-price ${filterByFromStore.minPrice !== '' || filterByFromStore.maxPrice !== '' ? 'top-filter-bar__active-filter' : ''}`}
                ref={ref}
            >
                <span onClick={togglePrice}>Budget</span>
                <svg
                    className="top-filter-bar__svg-icon-adjusted"
                    width="13"
                    height="13"
                    viewBox="0 0 11 7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    onClick={togglePrice}
                >
                    <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path>
                </svg>
                <span className="fa-solid angle-down"></span>

                {isPriceFilterShown && (
                    <div className="top-filter-bar__price-filter-scroll">
                        <div className="top-filter-bar__price-filter-inputs">
                            <div>
                                <label htmlFor="minPrice">MIN</label>
                                <input
                                    onChange={handleChangePrice}
                                    value={filterByToEdit.minPrice}
                                    type="number"
                                    className="top-filter-bar__min-price"
                                    name="minPrice"
                                    placeholder="your min price"
                                />
                            </div>
                            <div>
                                <label htmlFor="maxPrice">MAX</label>
                                <input
                                    onChange={handleChangePrice}
                                    value={filterByToEdit.maxPrice}
                                    type="number"
                                    className="top-filter-bar__max-price"
                                    name="maxPrice"
                                    placeholder="your max price"
                                />
                            </div>
                        </div>

                        <div className="top-filter-bar__filter-price-btns">
                            <div className="top-filter-bar__clear-all" onClick={onClearBudget}>
                                Clear All
                            </div>
                            <button type="button" onClick={handleApplyPrice}>
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
