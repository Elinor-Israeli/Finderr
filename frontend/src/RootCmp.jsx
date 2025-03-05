import { Routes, Route, useLocation } from 'react-router'

import { HomePage } from './pages/HomePage'
import { GigIndex } from './pages/gig/GigIndex'
import { GigDetails } from './pages/gig/GigDetails'
import { AppFooter } from './cmps/AppFooter'
import { IndexHeader} from './cmps/IndexHeader'
import { GigEdit } from './cmps/gig/GigEdit'
import { GigPayment } from './pages/gig/GigPayment'
import { UserIndex } from './pages/UserIndex'
import UserWishList from './pages/UserWishList'
import { UserMsg } from './cmps/UserMsg'
import Dashboard from './cmps/user/Dashboard'

export function RootCmp() {
    const { pathname } = useLocation()
    const isPaymentPage = pathname.startsWith('/payment')
    const isDashboard = pathname.startsWith('/dashboard')
    return (
        
        <div className="main-container main-layout ">
             <IndexHeader />
            <UserMsg />
            <main>
                <Routes>
                    <Route path="" element={<HomePage/>} />
                    <Route path="/dashboard" element={<Dashboard />}/>
                    <Route path="/gig" element={<GigIndex />} />
                    <Route path="/gig/:gigId" element={<GigDetails />} />
                    <Route path="/gig/edit/:gigId" element={<GigEdit />} />
                    <Route path="/gig/edit" element={<GigEdit />} />
                    <Route path="/payment/:gigId" element={<GigPayment />} />
                    <Route path="/wishlist" element={<UserWishList />} />
                    <Route path="/user/:userId" element={<UserIndex />} />
                </Routes>
            </main>
            {!isPaymentPage && !isDashboard && <AppFooter />}
        </div>
    )
}

