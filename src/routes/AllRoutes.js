import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import CheckAuth from './CheckAuth';
import MainRoutes from './MainRoutes';
import DefaultLoader from '../components/loaders/DefaultLoader';
import Login from '../pages/Login';
import Dashboard from "../pages/Dashboard"
import Novels from '../pages/Novels';

const AllRoutes = () => {
    return (
        <Router>
            <Suspense fallback={<DefaultLoader />}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/novels" element={<Novels />} />

                    <Route path="*" element={<CheckAuth><MainRoutes /></CheckAuth>} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default AllRoutes