
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { AppLayout } from './components/layout';
import { ScrollToTop } from './components/helpers';
import { ProtectedRoute } from './components/auth';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BookingPage from './pages/BookingPage';
import StatusPage from './pages/StatusPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminBookingsPage from './pages/admin/AdminBookingsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/status" element={<StatusPage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
                        <Route path="/admin/settings" element={<AdminSettingsPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}
