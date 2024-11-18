import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { GigIndex } from './pages/gig/GigIndex'
import { GigDetails } from './pages/gig/GigDetails'
import { AppFooter } from './cmps/AppFooter'
// import { AppHeader} from './cmps/AppHeader'
import { IndexHeader} from './cmps/IndexHeader'
import { GigEdit } from './cmps/gig/GigEdit'
import { GigPayment } from './pages/gig/GigPayment'
import { UserIndex } from './pages/UserIndex'
import UserWishList from './pages/UserWishList'
import { UserMsg } from './cmps/UserMsg'
import UserSellerTable from './cmps/user/UserSellerTable'
// import { GigOrderIndex } from './pages/GigOrderIndex'

// import { GigBreadcrumbs } from './cmps/gig/GigBreadcrumbs'
// import { GigCategoryMenu } from './cmps/gig/GigCategoryMenu'


export function RootCmp() {
    const { pathname } = useLocation();
    
    return (
        <div className="main-container  main-layout full">
            {pathname !== '/' && <IndexHeader />} 
            {/* <GigCategoryMenu/> */}
          
           
            {/* <IndexHeader /> */}
            {/* <AppHeader /> */}
            {/* <GigBreadcrumbs /> */}
            <UserMsg />

            <main>
                <Routes>
                    <Route path="" element={<HomePage/>} />
                    <Route path="/user-seller" element={<UserSellerTable />}/>
                    <Route path="/gig" element={<GigIndex />} />
                    <Route path="/gig/:gigId" element={<GigDetails />} />
                    <Route path="/gig/edit/:gigId" element={<GigEdit />} />
                    <Route path="/gig/edit" element={<GigEdit />} />
                    <Route path="/payment/:gigId" element={<GigPayment />} />
                    <Route path="/wishlist" element={<UserWishList />} />
                    <Route path="/user/:userId" element={<UserIndex />} />
                    {/* <Route path="/order" element={<GigOrderIndex isSeller={false} />} />
                    <Route path="/dashboard" element={<GigOrderIndex isSeller={true} />} /> */}
                </Routes>
            </main>
            <AppFooter />
            {/* <UserMsg/> */}
            {/* <AppFooter /> */}
        </div>
    )
}

// import React from 'react'
// import { Routes, Route, useLocation } from 'react-router'

// import { HomePage } from './pages/HomePage'
// import { GigIndex } from './pages/gig/GigIndex'
// import { GigDetails } from './pages/gig/GigDetails'
// import { AppFooter } from './cmps/AppFooter'
// import { IndexHeader } from './cmps/IndexHeader'
// import { GigEdit } from './cmps/gig/GigEdit'
// import { GigPayment } from './pages/gig/GigPayment'
// import { UserIndex } from './pages/UserIndex'
// import UserWishList from './pages/UserWishList'

// export function RootCmp() {
//     const { pathname } = useLocation();
    
//     const isHomePage = pathname === '/'; // Toggle for homepage, otherwise regular

//     return (
//         <div className="main-container main-layout full">
//             {/* Conditionally apply fixed header only on homepage */}
//             {isHomePage ? <IndexHeader fixed={true} /> : <IndexHeader fixed={false} />}
            
//             <main>
//                 <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/gig" element={<GigIndex />} />
//                     <Route path="/gig/:gigId" element={<GigDetails />} />
//                     <Route path="/gig/edit/:gigId" element={<GigEdit />} />
//                     <Route path="/gig/edit" element={<GigEdit />} />
//                     <Route path="/payment/:gigId" element={<GigPayment />} />
//                     <Route path="/wishlist" element={<UserWishList />} />
//                     <Route path="/user/:userId" element={<UserIndex />} />
//                 </Routes>
//             </main>
//             <AppFooter />
//         </div>
//     );
// }

