import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { gigService } from '../../services/gig/gig.service.remote'

export function TopFilterBar({ onSetFilter }) {
    const filterByFromStore = useSelector((storeState) => storeState.gigModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isPriceFilterShown, setIsPriceFilterShown] = useState(false)
    const [isDeliveryShow, setIsDeliveryShow] = useState(false)
    const ref = useRef()
    const deliveryRef = useRef()
    const checkedDelivery = filterByFromStore.daysToMake
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const categories = queryParams.get('categories')?.split(',') || []
        const minPrice = queryParams.get('minPrice') || ''
        const maxPrice = queryParams.get('maxPrice') || ''
        const daysToMake = queryParams.get('daysToMake') || ''

        setFilterByToEdit({ categories, minPrice, maxPrice, daysToMake })
    }, [location.search])

    const handleChange = (ev) => {
        const { target } = ev;
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        let newFilterBy = { ...filterByToEdit, [field]: value }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

        if (field === 'daysToMake') {
            setIsDeliveryShow(false)
            onSetFilter(newFilterBy)
        }
    };

    const onSubmit = () => {
        onSetFilter(filterByToEdit)
        setIsPriceFilterShown(false)
        setIsDeliveryShow(false)

        const queryParams = new URLSearchParams(location.search)
        queryParams.set('minPrice', filterByToEdit.minPrice || '')
        queryParams.set('maxPrice', filterByToEdit.maxPrice || '')
        queryParams.set('daysToMake', filterByToEdit.daysToMake || '')
        
        queryParams.set('categories', filterByToEdit.categories.join(','))

        navigate({ search: queryParams.toString() })
    }

    const onClear = () => {
        setFilterByToEdit(gigService.getDefaultFilter())
        setIsDeliveryShow(false);
        setIsPriceFilterShown(false);

        const queryParams = new URLSearchParams(location.search)
        queryParams.set('categories', filterByToEdit.categories.join(','))
        navigate({ search: queryParams.toString() })
    };

    const handleClickDelivery = () => {
        setIsDeliveryShow(!isDeliveryShow)
    };

    const handleClickPrice = () => {
        setIsPriceFilterShown(!isPriceFilterShown)
    };

    return (
        <div className="top-filter-bar">
            {/* Delivery Time Filter */}
            <div
                className={`top-filter-bar__filter-menu top-filter-bar__filter-delivery ${checkedDelivery !== '' ? 'top-filter-bar__active-filter' : ''}`}
                ref={deliveryRef}
            >
                <span onClick={handleClickDelivery}>Delivery Time</span>
                <svg
                    className="top-filter-bar__svg-icon-adjusted"
                    width="13"
                    height="13"
                    viewBox="0 0 11 7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    onClick={handleClickDelivery}
                >
                    <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path>
                </svg>
                <span className="fa-solid angle-down"></span>

                {isDeliveryShow && (
                    <div className="top-filter-bar__delivery-filter-options">
                        <div className="top-filter-bar__delivery-option">
                            <input
                                type="radio"
                                id="daysToMake1"
                                name="daysToMake"
                                value="1"
                                onChange={handleChange}
                                checked={checkedDelivery === '1'}
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
                                onChange={handleChange}
                                checked={checkedDelivery === '3'}
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
                                onChange={handleChange}
                                checked={checkedDelivery === '7'}
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
                                onChange={handleChange}
                                checked={checkedDelivery === ''}
                            />
                            <label htmlFor="daysToMake">
                                <span>
                                    <div className="top-filter-bar__checked-input"></div>
                                </span>
                                Anytime
                            </label>
                        </div>

                        <div className="top-filter-bar__filter-price-btns">
                            <div className="top-filter-bar__clear-all" onClick={onClear}>
                                Clear All
                            </div>
                            <button type="button" onClick={onSubmit}>
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
                <span onClick={handleClickPrice}>Budget</span>
                <svg
                    className="top-filter-bar__svg-icon-adjusted"
                    width="13"
                    height="13"
                    viewBox="0 0 11 7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    onClick={handleClickPrice}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    value={filterByToEdit.maxPrice}
                                    type="number"
                                    className="top-filter-bar__max-price"
                                    name="maxPrice"
                                    placeholder="your max price"
                                />
                            </div>
                        </div>

                        <div className="top-filter-bar__filter-price-btns">
                            <div className="top-filter-bar__clear-all" onClick={onClear}>
                                Clear All
                            </div>
                            <button type="button" onClick={onSubmit}>
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
