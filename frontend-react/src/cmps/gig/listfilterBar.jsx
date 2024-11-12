import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { gigService } from '../../services/gig/gig.service.local'

// import { faHouse } from '@awesome.me/kit-KIT_CODE/icons/classic/solid'
export function TopFilterBar({ onSetFilter }) {
    const filterByFromStore = useSelector((storeState) => storeState.gigModule.filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState(gigService.getDefaultFilter())
    const [isPriceFilterShown, setIsPriceFilterShown] = useState(false)
    const [isDeliveryShow, setIsDeliveryShow] = useState(false)
    const ref = useRef()
    const deliveryRef = useRef()
    const checkedDelivery = filterByFromStore.daysToMake
    useEffect(() => {
        const checkIfClickedOutside = (ev) => {
            const { className } = ev.target

            // close the modal if clicked outside
            if (isPriceFilterShown && ref.current && !ref.current.contains(ev.target)) {
                setIsPriceFilterShown(false)
            }
            // same
            if (isDeliveryShow && deliveryRef.current && !deliveryRef.current.contains(ev.target)) {
                setIsDeliveryShow(false)
            }

            if (ev.target.closest('.apply-time') || ev.target.closest('.clear-all')) {
                return; // Prevent closing modal if clicked inside the apply or clear button
            }

            // includes maybe
            switch (className) {
                case "filter-menu filter-price ":
                case "filter-menu filter-price active-filter":
                    ev.preventDefault()
                    setIsPriceFilterShown(!isPriceFilterShown)
                    break

                case "filter-menu filter-delivery ":
                case "filter-menu filter-delivery active-filter":
                    ev.preventDefault()
                    setIsDeliveryShow(!isDeliveryShow)
                    break
                default:
                    break
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isPriceFilterShown, isDeliveryShow])


    function handleChange(ev) {
        const { target } = ev
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        let newFilterBy = ({ ...filterByToEdit, [field]: value })
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

        if (field === "daysToMake") {
            setIsDeliveryShow(false) //! here filter before apply
            onSetFilter(newFilterBy)
        }
    }

    function onSubmit() {
        onSetFilter(filterByToEdit)
        setIsPriceFilterShown(false)
        setIsDeliveryShow(false)
    }

    function onClear() {
        setFilterByToEdit(gigService.getDefaultFilter())
        setIsDeliveryShow(false)
        setIsPriceFilterShown(false)
    }

    function handleClickDelivery() {
        setIsDeliveryShow(!isDeliveryShow)
    }

    function handleClickPrice() {
        setIsPriceFilterShown(!isPriceFilterShown)
    }

    return (
        <div className="top-filter-bar">
            {/* Delivery Time Filter */}
            <div className={`filter-menu filter-delivery ${checkedDelivery !== '' ? 'active-filter' : ''}`} ref={deliveryRef}>
                <span onClick={handleClickDelivery}>Delivery Time</span>
                <svg
                    className="svg-icon-adjusted"
                    width="16"
                    height="16"
                    viewBox="0 0 11 7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    onClick={handleClickDelivery}
                >
                    <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path>
                </svg>
                <span className="fa-solid angle-down"></span>

                {isDeliveryShow && (

                    <div className="delivery-filter-options">

                        <div className="delivery-option">

                            <input
                                type="radio"
                                id="daysToMake1"
                                name="daysToMake"
                                value="1" //~
                                onChange={handleChange}
                                checked={checkedDelivery === '1'} //~
                            />
                            <label htmlFor="daysToMake1">
                                <span>
                                    <div className="checked-input"></div>
                                </span>
                                Express 24H
                            </label>
                        </div>
                        <div className="delivery-option">
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
                                    <div className="checked-input"></div>
                                </span>
                                Up to 3 days
                            </label>
                        </div>
                        <div className="delivery-option">
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
                                    <div className="checked-input"></div>
                                </span>
                                Up to 7 days
                            </label>
                        </div>
                        <div className="delivery-option">
                            <input
                                type="radio"
                                id="daysToMake"
                                name="daysToMake"
                                value=""
                                onChange={handleChange}
                                checked={checkedDelivery === ''}
                            // value={filterByToEdit.daysToMake}
                            />
                            <label htmlFor="daysToMake">
                                <span>
                                    <div className="checked-input"></div>
                                </span>
                                Anytime
                            </label>
                        </div>

                        {/* <div style={{padding:'0'}}> //! here padding 
                            <div className="filter-daysToMake-btns">
                                <div className="clear-all" onClick={onClear}>
                                    Clear All
                                </div>
                                <button className="apply-time" type="button" onClick={onSubmit}>
                                    Apply
                                </button>
                            </div>
                        </div> */}
                    </div>

                )}

            </div>

            {/* Budget Filter */}
            <div className={`filter-menu filter-price ${filterByFromStore.minPrice !== '' || filterByFromStore.maxPrice !== '' ? 'active-filter' : ''}`} ref={ref}>
                <span onClick={handleClickPrice}>Budget</span>
                <svg
                    className="svg-icon-adjusted"
                    width="16"
                    height="16"
                    viewBox="0 0 11 7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    onClick={handleClickPrice}
                >
                    <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path>
                </svg>
                <span className="fa-solid angle-down"></span>

                {isPriceFilterShown && (
                    <form className="price-filter-scroll">
                        <div className="price-filter-inputs">
                            <div>
                                <label htmlFor="minPrice">MIN.</label>
                                <input
                                    onChange={handleChange}
                                    value={filterByToEdit.minPrice}
                                    type="number"
                                    className="min-price"
                                    name="minPrice"
                                    placeholder="Any"
                                />
                            </div>
                            <div>
                                <label htmlFor="maxPrice">MAX.</label>
                                <input
                                    onChange={handleChange}
                                    value={filterByToEdit.maxPrice}
                                    type="number"
                                    className="max-price"
                                    name="maxPrice"
                                    placeholder="Any"
                                />
                            </div>
                        </div>

                        <div className="filter-price-btns">
                            <div className="clear-all" onClick={onClear}>
                                Clear All
                            </div>
                            <button type="button" onClick={onSubmit}>
                                Apply
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

