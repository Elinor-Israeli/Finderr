import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { loadOrdersBuyer } from '../../store/actions/order.actions'
import { Loader } from '../Loader'

export function UserBuyerGig() {
  let orders = useSelector((storeState) => storeState.orderModule.buyerOrders)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)

  useEffect(() => {
    loadOrdersBuyer()
  }, [])

  if (isLoading) {
    return (
        <div className="buy-order-list">
            <Loader src="https://fiverr-res.cloudinary.com/app_assets/fiverr_logo_loader.svg" alt="Loading..." />
        </div>
    )
}

if (!isLoading && orders.length === 0) {
    return (
        <h3 className="msg-order" style={{ padding: "20px", fontSize: "18px", color: "gray" }}>
            No Orders Yet
        </h3>
    )
}


  

  return (
    <div className="buy-order-list">
      {orders.reverse().map(order => (
        <div className="order-container" key={order._id}>
          <img className="buy-order-img" src={order.gig.imgUrl[0]} alt="order" />
          <div className="buy-order-info">
            <div>{order.gig.title}</div>
            <div className="buy-order-date" style={{ color: '#45b3e7',fontSize:'15px' }}>
              {moment(order.createdAt).format('MMM Do YYYY')}
            </div>
            <div className="buy-order-seller-status">
              <div className="buy-order-seller-name">{order.seller.fullname}</div>
              <div className={order.status}>{order.status}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
