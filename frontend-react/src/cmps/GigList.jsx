// import { userService } from '../services/user'
// import { CarPreview } from './CarPreview'

// export function CarList({ cars, onRemoveCar, onUpdateCar }) {
    
//     function shouldShowActionBtns(car) {
//         const user = userService.getLoggedinUser()
        
//         if (!user) return false
//         if (user.isAdmin) return true
//         return car.owner?._id === user._id
//     }

//     return <section>
//         <ul className="list">
//             {cars.map(car =>
//                 <li key={car._id}>
//                     <CarPreview car={car}/>
//                     {shouldShowActionBtns(car) && <div className="actions">
//                         <button onClick={() => onUpdateCar(car)}>Edit</button>
//                         <button onClick={() => onRemoveCar(car._id)}>x</button>
//                     </div>}
//                 </li>)
//             }
//         </ul>
//     </section>
// }