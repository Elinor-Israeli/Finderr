import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { updateOrder } from '../../store/actions/order.actions'
import { socketService, SOCKET_EVENT_ORDER_UPDATED } from '../../services/socket.service'; 
import { ProgressChart2 } from '../ProgressChart2'
import { loadOrders } from '../../store/actions/order.actions'
import { MonthlyRevenue } from '../MonthlyRevenue '

export default function UserSellerTable() {

  let orders = useSelector((storeState) => storeState.orderModule.orders)
  const [setIsModal] = useState({ id: '', status: false })
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    loadOrders('seller')
  }, [])


  useEffect(() => {
    if (!orders) return
    const completedOrdersTotal = orders
      .filter(order => order.status === 'Completed')
      .reduce((acc, order) => acc + (order.gig.price || 0), 0)
    setMonthlyRevenue(completedOrdersTotal)
  }, [orders])

  

  function updateStatus(status, order) {
    order.status = status
    updateOrder(order)
    socketService.emit(SOCKET_EVENT_ORDER_UPDATED,
      {
        sellerName: order.seller.fullname,
        status: order.status,
        buyerId: order.buyer._id
      })
      setIsModal({ id: '', status: false })
    }

  function renderStatusButtons(order) {
    if (order.status === 'pending') {
      return (
        <div className="status-buttons">
          <button className='approved'onClick={() => updateStatus('Approved', order)}>Approve</button>
          <button  className="declined" onClick={() => updateStatus('Declined', order)}>Decline</button>
        </div>
      );
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


  // function updateStatus(status, order) {
  //   const updatedOrder = { ...order, status }
  //   updateOrder(updatedOrder)
  //   setIsModal({ id: '', status: false })
  // }

 function getTxtToShow(txt, length)  {
    return txt.length < length ? txt : `${txt.substring(0, length)}...`
}

  const pendingOrdersCount = orders.filter(order => order.status === 'pending').length
  const completedOrdersCount = orders.filter(order => order.status === 'Completed').length
  const totalOrders = orders.length
  const completedOrderPercent = orders.length > 0 ? completedOrdersCount / orders.length : 0;
  const pendingOrderPercent = orders.length > 0 ? pendingOrdersCount / orders.length : 0;
  
  const monthlyRevenueGoal = 600

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
        <ProgressChart2
          percent={completedOrderPercent / totalOrders}
          count={completedOrderPercent}
          total={totalOrders}
          className="progress-chart-completed"
          bgc="green"
          label="Completed Orders"
        />
      </div>
      <div className="dashboard-item">
        <span>Pending Orders</span>
        <h3>{pendingOrdersCount}</h3>
        <ProgressChart2
          count={pendingOrderPercent}
          total={totalOrders}
          bgc="orange"
          label="Pending Orders"
          className="progress-chart-pending"
        />
      </div>

    </div>
    <h2 className='table-dec' > Manage Orders</h2>

    <ul className="orders-dashboard">

      {orders.map(order =>
        <li key={order._id}>
          <div className="img-container"><img src={order.seller.imgUrl} alt="" onClick={() => navigate(`/gig/${order.gig._id}`)} /></div>
          <div className="gig-title">{getTxtToShow(order.gig.title, 55)}</div>
          <div>{order.buyer.fullname}</div>
          <div>${order.gig.price}</div>
          <div className="date-created-time">
          {moment(order.createdAt).format('MMM Do YY')} 
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
    <div>
    <MonthlyRevenue monthlyRevenue={monthlyRevenue} monthlyRevenueGoal={monthlyRevenueGoal} />
    </div>
  </section>
}

