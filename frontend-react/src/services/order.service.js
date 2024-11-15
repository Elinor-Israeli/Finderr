// import { httpService } from './http.service'

// export const orderService = {
//     query,
//     save,
// }

// async function query(userId) {
//     return httpService.get('order', { params: userId })
// }

// async function save(order) {
//     var savedOrder
//     if (order._id) {
//         savedOrder = await httpService.put(`order/${order._id}`, order)
//     } else {
//         savedOrder = await httpService.post('order', order)
//     }
//     return savedOrder
// }