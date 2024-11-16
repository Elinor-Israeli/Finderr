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
// import { GigBreadcrumbs } from './cmps/gig/GigBreadcrumbs'


export function RootCmp() {
    const { pathname } = useLocation();
    
    return (
        <div className="main-container  main-layout full">
            {pathname !== '/' && <IndexHeader />} 
           
            {/* <IndexHeader /> */}
            {/* <AppHeader /> */}
            {/* <GigBreadcrumbs /> */}
            {/* <UserMsg /> */}

            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/gig" element={<GigIndex />} />
                    <Route path="/gig/:gigId" element={<GigDetails />} />
                    <Route path="/gig/edit/:gigId" element={<GigEdit />} />
                    <Route path="/gig/edit" element={<GigEdit />} />
                    <Route path="/payment/:gigId" element={<GigPayment />} />
                    <Route path="/wishlist" element={<UserWishList />} />
                    <Route path="/user/:userId" element={<UserIndex />} />
                </Routes>
            </main>
            <AppFooter />
            {/* <UserMsg/> */}
            {/* <AppFooter /> */}
        </div>
    )
}


