import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../../store/actions/order.actions'
import { userService } from '../../services/user/user.service.local'

export function UserBuyGig() {
  const [user, setUser] = useState(null)
  let orders = useSelector((storeState) => storeState.orderModule.orders)

  useEffect(() => {
    const loggedInUser = userService.getLoggedinUser()
    if (loggedInUser) {
      setUser(loggedInUser)
      loadOrders(loggedInUser._id)
    }
  }, []);

  if (!user) {
    return (
      <section className="no-orders">
        <h3>Please log in to see your orders</h3>
      </section>
    )
  }

  orders = orders.filter(order => order.buyer._id === user._id)

  return (
    <div className="buy-order-list">
      {orders.length > 0 ? (
        orders.reverse().map(order => (
          <div className="order-container" key={order._id}>
            <img
              className="buy-order-img"
              src={order.gig.imgUrl[0]}
              alt={order.gig.title}
            />
            <div className="buy-order-info">
              <div className="buy-order-title">{order.gig.title}</div>
              <div className="buy-order-seller-status">
                <div className="buy-order-sellername">{order.seller.fullname}</div>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <section className="no-orders">
          <div className="no-orders-icon">
            {/* Empty state SVG */}
          </div>
          <h3>No Orders Yet</h3>
          <p className="no-orders-message">
            You haven’t made any purchases yet. Start browsing and buying now!
          </p>
        </section>
      )}
    </div>
  )
}
