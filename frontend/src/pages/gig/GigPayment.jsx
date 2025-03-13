import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { gigService } from '../../services/gig/gig.service.remote'
import { userService } from '../../services/user/user.service.remote'
import { addOrderBuyer } from '../../store/actions/order.actions'
import credit from '/img/credit.svg'
import paypal from '/img/paypal.svg'

export function GigPayment() {
    const [isChecked, setIsChecked] = useState(false)
    const user = userService.getLoggedinUser()
    const [gig, setGig] = useState(null)
    const navigate = useNavigate()
    const { gigId } = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const price = parseFloat(queryParams.get('price')) || 0
    const selectedPackage  = queryParams.get('selectedPackage')  || ''
    console.log('queryParams', queryParams);
    
   
    useEffect(() => {
        async function loadGig() {
            try {
                const gig = await gigService.getById(gigId)
                setGig(gig)
            } catch (err) {
                console.log('Error loading gig details', err)
                showErrorMsg('Cannot load gig')
                navigate('/gig')
            }
        }
        loadGig()
    }, [gigId, navigate])

    function toggleCheck() {
        setIsChecked(prev => !prev)
    }

    async function onSubmitPayment(ev) {
        ev.preventDefault()

        if (!user) {
            showErrorMsg('Please login before continuing to order')
            return
        }

        if (!gig) {
            showErrorMsg('Unable to load gig details')
            return
        }

        const order = {
            buyer: {
                _id: user._id,
                fullname: user.fullname,
            },
            seller: {
                _id: gig.owner_id,
                fullname: gig.owner_id.fullname,
                imgUrl: gig.owner_id.imgUrl,
            },
            gig: {
                _id: gig._id,
                title: gig.title,
                price,
                imgUrl: gig.imgUrl
            },
            status: "pending",
            createdAt: Date.now(),
        }

        try {
            await addOrderBuyer(order)
            showSuccessMsg('Your order has been sent')
            console.log('Order sent successfully')
            navigate('/')
        } catch (err) {
            showErrorMsg('Something went wrong')
            console.log("Can't add order", err)
        }
    }

    if (!gig) return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
    )

    return (
        <section className="gig-payment">
            <div className="main-content">
                <header>Payment Options</header>

                <form id="payment-form" onSubmit={onSubmitPayment}>
                    <div className="payment-option">
                        <input name="credit" type="radio" defaultChecked />
                        <label htmlFor="credit">Credit & Debit Cards</label>
                        <img src={credit} alt="credit" />
                    </div>

                    <div className="payment-container">
                        <label htmlFor="card" className="card-left-max">
                            <span className="card-logo"></span>
                            <span>Card number</span>
                            <input type="text" name="card" value="044-2345356-455656-54560" />
                        </label>
                        <div className="card-details">
                            <label htmlFor="date" className="date card-left-max">
                                <span>Expiration Date</span>
                                <input type="text" name="date" autoComplete="cc-exp" value="03/28" />
                            </label>
                            <label htmlFor="code" className="code card-left-max">
                                <span>Security Code</span>
                                <input type="number" name="code" value="345" />
                            </label>
                        </div>
                        <label htmlFor="firstname" className="card-left-max">
                            <span>Cardholder's name</span>
                            <input type="text" name="firstname" value={user?.fullname} />
                            <p>As written on card</p>
                        </label>
                        <div className="checkmark-container">
                            <div
                                className={`checkmark-box ${isChecked ? 'checked' : ''}`}
                                onClick={toggleCheck}
                            >
                                <svg className="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M9 16.2L4.8 12.4l-1.4 1.4L9 19 20.6 7.4l-1.4-1.4z" />
                                </svg>
                            </div>
                            <span>Save this card for future payments</span>
                        </div>
                    </div>

                    <div className="paypal">
                        <input name="credit" type="radio" />
                        <img src={paypal} alt="paypal" />
                    </div>
                </form>
            </div>

            <aside className="side-content">
                <div className="order-details">
                    <header>
                        <img src={gig?.imgUrl[0]} alt="gig-img" />
                        <div>{gig.title}</div>
                    </header>
                    <div className="basic-and-price">
                        <span className="basic">{selectedPackage}</span>
                        <span className="price">${price}</span>
                    </div>
                    <ul>
                        <li><span className="green-check"></span> <span>1 page</span></li>
                        <li><span className="green-check"></span> <span>Source code</span></li>
                        <li><span className="green-check"></span> <span>8 revisions</span></li>
                    </ul>
                </div>

                <div className="payment-summary">
                    <div className="payment-taxes">
                        <div><span>VAT</span><span>${(price * 0.18).toFixed(2)}</span></div>
                    </div>
                    <div className="payment-total">
                        <div>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', paddingBottom: '0.5em' }}>Total</span>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', paddingBottom: '0.5em' }}>${(price * 1.18).toFixed(2)}</span>
                        </div>
                        <div><span>Total delivery time</span><span>3 days</span></div>
                    </div>
                    <button className="payment-btn" type="submit" form="payment-form" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Confirm & Pay
                    </button>
                    <div className="payment-ssl">
                        <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 7C12.9062 7 13.25 7.15625 13.5625 7.4375C13.8438 7.75 14 8.09375 14 8.5V14.5C14 14.9375 13.8438 15.2812 13.5625 15.5625C13.25 15.875 12.9062 16 12.5 16H1.5C1.0625 16 0.71875 15.875 0.4375 15.5625C0.125 15.2812 0 14.9375 0 14.5V8.5C0 8.09375 0.125 7.75 0.4375 7.4375C0.71875 7.15625 1.0625 7 1.5 7H2.25V4.75C2.25 3.90625 2.4375 3.125 2.875 2.375C3.3125 1.65625 3.875 1.09375 4.625 0.65625C5.34375 0.21875 6.125 0 7 0C7.84375 0 8.625 0.21875 9.375 0.65625C10.0938 1.09375 10.6562 1.65625 11.0938 2.375C11.5312 3.125 11.75 3.90625 11.75 4.75V7H12.5Z"></path>
                        </svg>
                        SSL Secure Payment
                    </div>
                </div>
            </aside>
        </section>
    )
}
