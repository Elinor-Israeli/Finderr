import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import moment from 'moment'
import { getActionAddOrderBuyer } from '../../store/actions/order.actions'
import { loadOrdersBuyer } from '../../store/actions/order.actions'
import { Loader } from '../Loader'
import { socketService , SOCKET_EVENT_ORDER_UPDATED} from '../../services/socket.service'


export function OrderDropdown() {
  let orders = useSelector((storeState) => storeState.orderModule.buyerOrders)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    loadOrdersBuyer()
  }, [])

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ORDER_UPDATED, (order) =>  {
      dispatch(getActionAddOrderBuyer(order))
    })

    return () => {
      socketService.off(SOCKET_EVENT_ORDER_UPDATED)
    }
  }, [dispatch])

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
          <img className="buy-order-img" src={order.gig.imgUrl[0]} alt="order" onClick={() => navigate(`/gig/${order.gig._id}`)}  style={{ cursor: 'pointer' }}/>
          <div className="buy-order-info">
            <div>{order.gig.title}</div>
            <div className="buy-order-date" style={{ color: '#45b3e7', fontSize: '15px' }}>
              {moment(order.createdAt).format('MMM Do YYYY')}
            </div>
            <div className="buy-order-seller-status">
              <div className={order.status}>{order.status}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
