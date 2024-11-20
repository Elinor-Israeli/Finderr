import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updateOrder } from '../../store/actions/order.actions'

// import { socketService, SOCKET_EVENT_ORDER_UPDATED } from '../../services/socket.service'
import { ProgressChart } from '../ProgressChart'
import { ProgressChart2 } from '../ProgressChart2'
import { orderService } from '../../services/order.service.local'
import { loadOrders } from '../../store/actions/order.actions'
import { userService } from '../../services/user/user.service.local'


export default function UserSellerTable() {

  let orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = useSelector((storeState) => storeState.userModule.user)

  const [isModal, setIsModal] = useState({ id: '', status: false })
  // const [totalSum, setTotalSum] = useState(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    loadOrders()
  }, [])

  const sellerOrders = orders.filter(order => order.seller._id === user._id)

  

  // useEffect(() => {
  //   if (!orders) return
  //   orders.forEach(order => {
  //     const price = order.gig.price ? order.gig.price : 0
  //     setTotalSum(prev => prev + price)
  //   })
  // }, [])

  useEffect(() => {
    if (!orders) return
    const completedOrdersTotal = orders
      .filter(order => order.status === 'Completed')
      .reduce((acc, order) => acc + (order.gig.price || 0), 0)
    setMonthlyRevenue(completedOrdersTotal)
  }, [orders])




  // function toggleStatusModal(orderId) {
  //   setIsModal(prevModal => ({ ...prevModal, id: orderId, status: !prevModal.status }))
  // }

  function toggleStatusModal(orderId) {

    setIsModal(prevModal => ({
      ...prevModal,
      id: orderId,
      status: prevModal.id !== orderId ? true : !prevModal.status
    }))
  }
 
  function updateStatus(status, order) {
    const updatedOrder = { ...order, status }
    updateOrder(updatedOrder)
    setIsModal({ id: '', status: false })
  }

  const pendingOrdersCount = orders.filter(order => order.status === 'pending').length
  const completedOrdersCount = orders.filter(order => order.status === 'Completed').length
  const totalOrders = orders.length
  const completedOrderPercent = orders.length > 0 ? completedOrdersCount / orders.length : 0;
  const pendingOrderPercent = orders.length > 0 ? pendingOrdersCount / orders.length : 0;

  // if (!orders) return 
  // <div className="loader-container">
  //   <div className="loader"></div>
  // </div>
  if (!orders || orders.length === 0) return <div className="loader-container"><div className="loader"></div></div>


  return <section className=' dashboard '>
    
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
    </div>
    <div className="dashboard-item">
        <span>Pending Orders</span>
        <h3>{pendingOrdersCount}</h3>
        <ProgressChart2
          count={pendingOrdersCount}
          total={totalOrders}
          bgc="orange"
          label="Pending Orders"
        />
    </div>

</div>
<h2 className='table-dec' > Manage Orders</h2>
    
    <ul className="orders-dashboard">

      {orders.map(order =>
        <li key={order._id}>
          <div className="img-container"><img src={order.seller.imgUrl} alt="" onClick={() => navigate(`/gig/${order.gig._id}`)} /></div>
          <div className="gig-title">{order.gig.title}</div>
          <div>{order.buyer.fullname}</div>
          <div>${order.gig.price}</div>
          <div className="status-container">
          <span className={order.status} onClick={() => toggleStatusModal(order._id)}>{order.status} </span>
          {user && user._id === order.seller._id && isModal.status && isModal.id === order._id && (
              <div className="status-options">
                <span className="approved" onClick={() => updateStatus("Approved", order)}>Approved</span>
                <span className="completed" onClick={() => updateStatus("Completed", order)}>Completed</span>
                <span className="declined" onClick={() => updateStatus("Declined", order)}>Declined</span>
              </div>
              )}
            </div>
        </li>)}
      <li className='table-header'>
        <div className='seller-col'>Seller</div>
        <div className='gig-col'>Gig</div>
        <div className='date-col'>Buyer</div>
        <div className='price-col'>Price</div>
        <div className='status-col'>Status</div>
      </li>
    </ul>
  </section>
}

