import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment';

import { loadOrders } from '../../store/actions/order.actions'

import { userService } from '../../services/user/user.service.local'

export function UserBuyGig() {
  let orders = useSelector((storeState) => storeState.orderModule.orders)
  const user = userService.getLoggedinUser()

  useEffect(() => {
    loadOrders(user._id)
  }, [])

  orders = orders.filter(order => order.buyer._id === user._id)

  return (
    <div className="buy-order-list">
      {orders.reverse().map(order => <div className="order-container" key={order._id}>
        <img className="buy-order-img" src={order.gig.imgUrl[0]} />
        <div className="buy-order-info">
          <div>{order.gig.title}</div>
          <div className="buy-order-date" style={{ color: 'blue', fontStyle: 'italic' }}>
         {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
          <div className="buy-order-seller-status">
            <div className="buy-order-sellername">{order.seller.fullname}</div>
            <div className={order.status}>{order.status}</div>
          </div>
        </div>

      </div>)}
      {!orders.length && <><span className="svg-wrap"><svg viewBox="0 0 65 43"><g id="02H_XXS_Overview_empty_state_Admin" stroke="none" stroke-width="1" fill="none" fillRule="evenodd" transform="translate(-127.000000, -235.000000)"><g id="Page-1-Copy" transform="translate(127.500000, 235.130859)" fill="#555555" stroke="#555555"><path d="M61.4734762,36.4188379 C61.4734762,38.444238 59.8252552,40.0937507 57.7985634,40.0937507 L6.25807293,40.0937507 C4.23267284,40.0937507 2.58316014,38.444238 2.58316014,36.4188379 L2.58316014,16.4761389 L19.4360906,16.4761389 L19.4360906,20.8356576 C19.4360906,24.023596 22.0298428,26.6186399 25.2177812,26.6186399 L38.8388551,26.6186399 C42.0267935,26.6186399 44.6218374,24.023596 44.6218374,20.8356576 L44.6218374,16.4761389 L61.4734762,16.4761389 L61.4734762,36.4188379 Z M13.4864779,2.583806 L50.5701585,2.583806 L60.0048028,13.8927204 L43.3301282,13.8927204 C42.615813,13.8927204 42.0384189,14.4701144 42.0384189,15.1844296 L42.0384189,20.8356576 C42.0384189,22.6001324 40.60333,24.0352214 38.8388551,24.0352214 L25.2177812,24.0352214 C23.4533064,24.0352214 22.0195091,22.6001324 22.0195091,20.8356576 L22.0195091,15.1844296 C22.0195091,14.4701144 21.4408234,13.8927204 20.7277999,13.8927204 L4.05183355,13.8927204 L13.4864779,2.583806 Z M64.0220185,15.0126323 C64.0103931,14.9222127 64.0000595,14.8343764 63.9690584,14.7465402 C63.9380574,14.6612874 63.8889725,14.5889517 63.8411792,14.5114491 C63.8101782,14.4610725 63.7959694,14.4042373 63.7572181,14.356444 L52.1667111,0.464111131 C51.9199946,0.170893133 51.5570243,0.000387512773 51.1746784,0.000387512773 L12.8819579,0.000387512773 C12.499612,0.000387512773 12.1366417,0.170893133 11.8899252,0.464111131 L0.299418202,14.356444 C0.260666925,14.4042373 0.247749833,14.4610725 0.215457102,14.5114491 C0.16766386,14.5889517 0.118578908,14.6612874 0.0888695958,14.7465402 C0.0565768648,14.8343764 0.0462431909,14.9222127 0.0346178077,15.0126323 C0.0268675522,15.0707592 -0.000258341848,15.1237193 -0.000258341848,15.1844296 L-0.000258341848,36.4188379 C-0.000258341848,39.870285 2.80791755,42.6771691 6.25807293,42.6771691 L57.7985634,42.6771691 C61.2500105,42.6771691 64.0568947,39.870285 64.0568947,36.4188379 L64.0568947,15.1844296 C64.0568947,15.1237193 64.0297688,15.0707592 64.0220185,15.0126323 Z" id="Fill-1"></path></g></g></svg></span>
        <h3>No Orders Yet</h3>
        <p></p>
      </>
      }
    </div>
  )
}
