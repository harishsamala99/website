
import React, { useState, useEffect, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from '../services/databaseService';
import { PageWrapper } from '../components/helpers';
import { SERVICES_DATA } from '../constants';
import type { Booking, BookingStatus } from '../types';

const StatusPage: React.FC = () => {
    const [bookingNumber, setBookingNumber] = useState('');
    const [booking, setBooking] = useState<Booking | null>(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleCheckStatus = async (bn: string) => {
        if (!bn.trim()) {
            setError('Please enter a booking number.');
            return;
        }
        setIsLoading(true);
        setError('');
        setBooking(null);

        const result = await api.getBookingByNumber(bn);

        if (result) {
            setBooking(result);
            navigate(`/status?bookingNumber=${bn}`, { replace: true });
        } else {
            setError(`No booking found with number "${bn}".`);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const bnFromUrl = params.get('bookingNumber');
        if (bnFromUrl) {
            setBookingNumber(bnFromUrl);
            handleCheckStatus(bnFromUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleCheckStatus(bookingNumber);
    };

    const getStatusChip = (status: BookingStatus) => {
        const baseClasses = 'px-4 py-1.5 text-lg font-bold rounded-full inline-block';
        switch (status) {
            case 'Approved': return `${baseClasses} bg-green-100 text-green-800`;
            case 'Pending': return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'Rejected': return `${baseClasses} bg-red-100 text-red-800`;
            default: return '';
        }
    };

    return (
        <PageWrapper>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Check Your Booking Status</h1>
            <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">Enter the booking number you received after submitting your request to see the current status of your appointment.</p>

            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
                <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={bookingNumber}
                        onChange={(e) => setBookingNumber(e.target.value)}
                        placeholder="Enter your booking number (e.g., SPK...)"
                        className="flex-grow block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                        aria-label="Booking Number"
                    />
                    <button type="submit" disabled={isLoading} className="bg-sky-500 text-white px-6 py-3 rounded-md hover:bg-sky-600 disabled:bg-gray-400">
                        {isLoading ? 'Checking...' : 'Check'}
                    </button>
                </form>
            </div>

            <div className="mt-12 max-w-2xl mx-auto">
                {error && <p className="text-center text-red-500 text-lg">{error}</p>}
                {booking && (
                    <div className="bg-white p-8 rounded-lg shadow-lg animate-fadeIn text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Details</h2>
                        <p className="text-gray-600 mb-2">Booking Number:</p>
                        <p className="text-2xl font-mono font-bold text-sky-600 mb-6">{booking.bookingNumber}</p>
                        <div className={getStatusChip(booking.status)}>{booking.status}</div>
                        <div className="mt-6 text-left border-t pt-6 space-y-4">
                            <div>
                                <p className="font-medium text-gray-800">Service</p>
                                <p className="text-gray-600">
                                    {SERVICES_DATA.find(s => s.id === booking.service)?.title} ({booking.bedrooms} bed, {booking.bathrooms} bath)
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Date & Time</p>
                                <p className="text-gray-600">{new Date(`${booking.date}T00:00:00`).toLocaleDateString()} at {booking.time}</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">Address</p>
                                <p className="text-gray-600">{booking.address}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default StatusPage;
