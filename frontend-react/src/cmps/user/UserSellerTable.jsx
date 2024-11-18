import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'

import { updateOrder } from '../../store/actions/order.actions'

// import { socketService, SOCKET_EVENT_ORDER_UPDATED } from '../../services/socket.service'
// import { ProgressChart } from '../ProgressChart'
import { orderService } from '../../services/order.service.local'
import { loadOrders } from '../../store/actions/order.actions'
import { userService } from '../../services/user/user.service.local'


export default function UserSellerTable() {
//   const user = userService.getLoggedinUser()
//   console.log(user);
  

//   const [order, setOrder] = useState()

//   useEffect(() => {
//     loadOrders(user._Id)
// }, [])

// async function loadOrders() {
//   try {
//       const order = await gigService.getById(user._Id)
//       setOrder(order)
//   }
//   catch (err) {
//       console.log('had issue in gig details', err)
//       showErrorMsg('cannot load gig')
//       navigate('/gig')
//   }
// }



//   return(
//    <p> {order.gig.title}</p>
//   )
// }

  
  let orders = useSelector((storeState) => storeState.orderModule.orders)

  const [isModal, setIsModal] = useState({ id: '', status: false })
  const [totalSum, settotalSum] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
      loadOrders()
  }, [])

  useEffect(() => {
    if (!orders) return
    orders.forEach(order => {
      const price = order.gig.price ? order.gig.price : 0
      settotalSum(prev => prev + price)
    })
  }, [])

  console.log(orders)
  

  function toggleStatusModal(orderId) {
    setIsModal(prevModal => ({ ...prevModal, id: orderId, status: !prevModal.status }))
  }
  let statistic
  orders && calcAnalysis()

  function calcAnalysis() {
    statistic = orders.reduce((acc, val) => {
      acc[val.status] = acc[val.status] ? ++acc[val.status] : 1
      return acc
    }, {})
  }

  // function updateStatus(status, order) {
  //   order.status = status
  //   updateOrder(order)
  //   socketService.emit(SOCKET_EVENT_ORDER_UPDATED,
  //     {
  //       sellerName: order.seller.fullname,
  //       status: order.status,
  //       buyerId: order.buyer._id
  //     })
  //   setIsModal(!isModal)
  // }

  const pending = statistic.pending ? statistic.pending : 0
  const approved = statistic.approved ? statistic.approved : 0
  const declined = statistic.declined ? statistic.declined : 0

  if (!orders) return <div className="loader-container">
        <div className="loader"></div>
    </div>

  return <section>
      {/* {statistic && <ul className="statstic-dashboard">
      <li>
        <h4>Active orders</h4>
        <span className="orders-num">{orders.length ? orders.length : 0}</span>
        <span>{`($${totalSum})`}</span>
      </li>
      <li>
        <h4>Pending</h4>
        <ProgressChart percent={pending / orders.length} bgc={"#feb849"} />
      </li>
      <li>
        <h4>Approved</h4>
        <ProgressChart percent={approved / orders.length} bgc={"#21ca79"} />
      </li>
      <li>
        <h4>Declined</h4>
        <ProgressChart percent={declined / orders.length} bgc={"#f46875"} />
      </li>
    </ul>
    } */}
     <ul className="orders-dashboard">
     {orders.map(order =>
        <li key={order._id}>
          <div className="img-container"><img src={order.imgUrl[0]} alt="" onClick={() => navigate(`/gig/${order.gig._id}`)} /></div>
          <div className="gig-title"><small>Gig</small>{order.title}</div>
          <div><small>Buyer</small>{order.fullname}</div>
          <div><small>Price</small>${order.price}</div>
          <div>
            <small>Status</small>
            <span className={order.status} onClick={() => toggleStatusModal(order._id)}></span>
            <div className="status-container">
              {(isModal.status && isModal.id === order._id) && <div className="status-options">
                <span className="approved" onClick={() => updateStatus("approved", order)}>Approved</span>
                <span className="completed" onClick={() => updateStatus("completed", order)}>Completed</span>
                <span className="declined" onClick={() => updateStatus("declined", order)}>Declined</span>
              </div>}
            </div>
          </div>
        </li>)}
    </ul>
  </section>
}

