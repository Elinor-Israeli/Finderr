import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'


export function RootCmp() {
    return (
        <div className="main-container">
            {/* <AppHeader /> */}
            {/* <UserMsg /> */}

            <main>
                <Routes>
                    <Route path="" element={<HomePage />} />
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


