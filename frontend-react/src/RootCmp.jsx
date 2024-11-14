import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { GigIndex } from './pages/gig/GigIndex'
import { GigDetails } from './pages/gig/GigDetails'
import { AppFooter } from './cmps/AppFooter'
// import { AppHeader} from './cmps/AppHeader'
import { IndexHeader} from './cmps/IndexHeader'
// import { GigBreadcrumbs } from './cmps/gig/GigBreadcrumbs'


export function RootCmp() {
    
    return (
        <div className="main-container  main-layout">
           
            <IndexHeader />
            {/* <AppHeader /> */}
            {/* <GigBreadcrumbs /> */}
            {/* <UserMsg /> */}

            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/gig" element={<GigIndex />} />
                    <Route path="/gig/:gigId" element={<GigDetails />} />
                    {/* <Route path="/payment/:gigId" element={<GigPayment />} />
                    <Route path="/user/:userId" element={<UserIndex />} /> */}

                </Routes>
            </main>
            <AppFooter />
            {/* <AppFooter /> */}
        </div>
    )
}


