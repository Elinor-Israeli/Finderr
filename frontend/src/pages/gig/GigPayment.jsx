import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { gigService } from '../../services/gig/gig.service.remote'
import { userService } from '../../services/user/user.service.remote'
import { addOrder } from '../../store/actions/order.actions'
import credit from '/img/credit.svg'
import paypal from '/img/paypal.svg'
import { socketService, SOCKET_EMIT_SET_TOPIC } from '../../services/socket.service'

export function GigPayment() {
    const [isChecked, setIsChecked] = useState(false)
    const user = userService.getLoggedinUser()
    const [gig, setGig] = useState(null)
    const navigate = useNavigate()
    const { gigId } = useParams()


    useEffect(() => {
        async function loadGig() {
            try {
                const gig = await gigService.getById(gigId)
                setGig(gig)
            }
            catch (err) {
                console.log('had issue in gig details', err)
                showErrorMsg('cannot load gig')
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
            showErrorMsg('Please login before continue ordering')
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
                price: gig.price,
                imgUrl: gig.imgUrl
            },
            status: "pending",
            createdAt: Date.now(),
        }

        try {
            await addOrder(order)
            showSuccessMsg('Your order has been sent')
            socketService.emit(SOCKET_EMIT_SET_TOPIC, order._id)
            console.log('Your order has been sent')

            navigate('/')
        }
        catch (err) {
            showErrorMsg('Something went wrong')
            console.log("cant add order", err)
        }
    }

    
    if (!gig) return <div className="loader-container">
        <div className="loader"></div>
    </div>
    return <section className="gig-payment ">
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
                        <input type="text"
                            name="card"
                            value='044-2345356-455656-54560'
                        />
                    </label>
                    <div className="card-details">

                        <label htmlFor="date" className="date card-left-max">
                            <span>Expiration Date</span>
                            <input type="text"
                                name="date"
                                autoComplete="cc-exp"
                                value="03/28"
                            />
                        </label>
                        <label htmlFor="code" className="code card-left-max">
                            <span>Security Code</span>
                            <input type="number"
                                name="code"
                                value='345'
                            />
                        </label>
                    </div>
                    <label htmlFor="firstname" className="card-left-max">
                        <span >Cardholder&apos;s name</span>
                        <input type="text"
                            name="firstname"
                            value='John Joe'
                        />
                        <p>As written on card</p></label>
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
                    <img src={paypal} alt="" />
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
                    <span className='basic'>Basic</span >
                    <span className="price">${gig.price}</span>
                </div>
                <ul>
                    <li ><span className="green-check "></span> <span>1 page</span></li>
                    <li> <span className="green-check "></span> <span><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z"></path></svg> Source code </span></li>

                    <li><span className="green-check "></span> <span><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z"></path></svg> 8 revisions</span></li>
                </ul>
            </div>
            <div className='promo'>
                <span style={{ fontSize: '16px' }}>Enter promo code</span>
            </div>
            <div className="payment-summary">
                <div className="payment-taxes">
                    <div><span style={{ paddingBottom: '0.25em' }}>Service</span><span style={{ paddingBottom: '0.25em' }}>$12.39</span></div>
                    <div><span>VAT</span><span></span></div>
                </div>
                <div className="payment-total">
                    <div><span style={{ fontSize: '16px', fontWeight: 'bold', paddingBottom: '0.5em' }}>Total</span><span style={{ fontSize: '16px', fontWeight: 'bold', paddingBottom: '0.5em' }}></span></div>
                    <div><span>Total delivery time</span><span>3 days</span></div>
                </div>
                <button className="payment-btn" type="submit" form="payment-form" style={{ fontSize: '16px', fontWeight: 'bold' }}>Confirm & Pay</button>
                <div className='payment-ssl'>
                    <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 7C12.9062 7 13.25 7.15625 13.5625 7.4375C13.8438 7.75 14 8.09375 14 8.5V14.5C14 14.9375 13.8438 15.2812 13.5625 15.5625C13.25 15.875 12.9062 16 12.5 16H1.5C1.0625 16 0.71875 15.875 0.4375 15.5625C0.125 15.2812 0 14.9375 0 14.5V8.5C0 8.09375 0.125 7.75 0.4375 7.4375C0.71875 7.15625 1.0625 7 1.5 7H2.25V4.75C2.25 3.90625 2.4375 3.125 2.875 2.375C3.3125 1.65625 3.875 1.09375 4.625 0.65625C5.34375 0.21875 6.125 0 7 0C7.84375 0 8.625 0.21875 9.375 0.65625C10.0938 1.09375 10.6562 1.65625 11.0938 2.375C11.5312 3.125 11.75 3.90625 11.75 4.75V7H12.5ZM8.25 12.25V10.75C8.25 10.4062 8.125 10.125 7.875 9.875C7.625 9.625 7.34375 9.5 7 9.5C6.625 9.5 6.34375 9.625 6.09375 9.875C5.84375 10.125 5.75 10.4062 5.75 10.75V12.25C5.75 12.625 5.84375 12.9062 6.09375 13.1562C6.34375 13.4062 6.625 13.5 7 13.5C7.34375 13.5 7.625 13.4062 7.875 13.1562C8.125 12.9062 8.25 12.625 8.25 12.25ZM9.25 7V4.75C9.25 4.125 9.03125 3.59375 8.59375 3.15625C8.15625 2.71875 7.625 2.5 7 2.5C6.375 2.5 5.84375 2.71875 5.40625 3.15625C4.96875 3.59375 4.75 4.125 4.75 4.75V7H9.25Z"></path>
                    </svg>
                    SSL Secure Payment
                </div>
                <div style={{ marginTop: '16px', fontSize: '14px', fontFamily: 'Macan' }}>
                    You will be charged <span></span>. Total amount includes currency conversion fees.
                </div>
            </div>
        </aside>
    </section>
}