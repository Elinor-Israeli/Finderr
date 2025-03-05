import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch  } from 'react-redux'
import moment from 'moment'
import { updateOrder,getActionAddOrderSeller } from '../../store/actions/order.actions'
import { ProgressChart } from '../ProgressChart'
import { loadOrdersSeller } from '../../store/actions/order.actions'
import { Loader } from '../Loader'
import { socketService , SOCKET_EVENT_ORDER_ADDED} from '../../services/socket.service'

export default function UserSellerTable() {

  let orders = useSelector((storeState) => storeState.orderModule.sellerOrders)
  const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    loadOrdersSeller()
  }, [])

  useEffect(() => {
    if (!orders) return
    const completedOrdersTotal = orders
      .filter(order => order.status === 'Completed')
      .reduce((acc, order) => acc + (order.gig.price || 0), 0)
    setMonthlyRevenue(completedOrdersTotal)
  }, [orders])

  useEffect(() => {
    socketService.on(SOCKET_EVENT_ORDER_ADDED, (order) => {
      console.log("New order received:", order)
      dispatch(getActionAddOrderSeller(order))
    })

    return () => {
      socketService.off(SOCKET_EVENT_ORDER_ADDED)
    }
  }, [dispatch])  

  function updateStatus(status, order) {
    order.status = status
    updateOrder(order)
  }

  function renderStatusButtons(order) {
    if (order.status === 'pending') {
      return (
        <div className="status-buttons">
          <button className='approved' onClick={() => updateStatus('Approved', order)}>Approve</button>
          <button className="declined" onClick={() => updateStatus('Declined', order)}>Decline</button>
        </div>
      )
    }
    if (order.status === 'Approved') {
      return (
        <div className="status-buttons">
          <button className="completed" onClick={() => updateStatus('Completed', order)}>Complete</button>
        </div>
      )
    }
    if (order.status === 'Declined') {
      return (
        <div className="status-buttons">
          <button className="declined" disabled>Declined</button>
        </div>
      )
    }

    if (order.status === 'Completed') {
      return (
        <div className="status-buttons">
          <span className="done">Done!</span>
        </div>
      )
    }
    return null
  }

  function getTxtToShow(txt, length) {
    return txt.length < length ? txt : `${txt.substring(0, length)}...`
  }

  const pendingOrdersCount = orders.filter(order => order.status === 'pending').length
  const completedOrdersCount = orders.filter(order => order.status === 'Completed').length
  const totalOrders = orders.length

  if (isLoading) {
    return (
      <div className="orders-dashboard">
        <Loader src="https://fiverr-res.cloudinary.com/app_assets/fiverr_logo_loader.svg" alt="Loading..." />
      </div>
    )
  }

  if (!isLoading && orders.length === 0) {
    return (
      <h3 className="orders-dashboard" style={{ padding: "20px", fontSize: "18px", color: "gray" }}>
        No Orders Yet
      </h3>
    )
  }

  return <section className='dashboard'>

    <div className="income-order-dashboard">
      <div className="dashboard-item">
        <span>Annual Revenue</span>
        <h3>${monthlyRevenue}</h3>

      </div>
      <div className="dashboard-item">
        <span>Monthly Revenue</span>
        <h3>${monthlyRevenue}</h3>


      </div>
      <div className="dashboard-item">
        <span>Completed Orders</span>
        <h3>{completedOrdersCount}</h3>
        <ProgressChart
          count={completedOrdersCount}
          total={totalOrders}
          bgc="green"
        />
      </div>
      <div className="dashboard-item">
        <span>Pending Orders</span>
        <h3>{pendingOrdersCount}</h3>
        <ProgressChart
          count={pendingOrdersCount}
          total={totalOrders}
          bgc="orange"
        />
      </div>

    </div>
    <h2 className='table-dec' > Manage Orders</h2>
    <ul className="orders-dashboard">
      {orders.map(order =>
        <li key={order._id}>
          <div className="img-container"><img src={order.gig.imgUrl[0]} alt="" onClick={() => navigate(`/gig/${order.gig._id}`)} /></div>
          <div className="gig-title">{getTxtToShow(order.gig.title, 55)}</div>
          <div>{order.buyer.fullname}</div>
          <div>${order.gig.price}</div>
          <div className="date-created-time">
            {moment(order.createdAt).format('MMM Do YYYY')}
          </div>
          <div className="status-container">
            {renderStatusButtons(order)}
          </div>
        </li>)}
      <li className='table-header'>
        <div className='seller-col'>Seller</div>
        <div className='gig-col'>Gig</div>
        <div className='date-col'>Buyer</div>
        <div className='price-col'>Price</div>
        <div className='date-col-time'>time</div>
        <div className='status-col'>Status</div>
      </li>
    </ul>
  </section>
}

