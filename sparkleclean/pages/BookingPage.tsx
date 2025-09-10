
import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as api from '../services/databaseService';
import { PageWrapper } from '../components/helpers';
import { SERVICES_DATA } from '../constants';

const BookingPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', service: '', date: '', time: '', bedrooms: '1', bathrooms: '1' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { search } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(search);
        const serviceId = params.get('service');
        if (serviceId) {
            setFormData(prev => ({ ...prev, service: serviceId }));
        }
    }, [search]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const submissionData = {
            ...formData,
            bedrooms: parseInt(formData.bedrooms, 10) || 1,
            bathrooms: parseInt(formData.bathrooms, 10) || 1,
        };
        const newBooking = await api.createBooking(submissionData);
        setIsSubmitting(false);
        if(newBooking) {
            navigate(`/status?bookingNumber=${newBooking.bookingNumber}`);
        }
    };

    return (
        <PageWrapper>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Book Your Cleaning</h1>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.name} />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.email} />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="phone" id="phone" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.phone} />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Full Address</label>
                        <input type="text" name="address" id="address" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.address} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Number of Bedrooms</label>
                            <input type="number" name="bedrooms" id="bedrooms" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.bedrooms} min="1" />
                        </div>
                        <div>
                            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Number of Bathrooms</label>
                            <input type="number" name="bathrooms" id="bathrooms" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.bathrooms} min="1" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service</label>
                        <select name="service" id="service" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.service}>
                            <option value="">-- Please choose a service --</option>
                            {SERVICES_DATA.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                            <input type="date" name="date" id="date" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.date} />
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                            <input type="time" name="time" id="time" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" onChange={handleChange} value={formData.time} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-sky-500 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-sky-600 disabled:bg-gray-400">
                            {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                        </button>
                    </div>
                </form>
            </div>
        </PageWrapper>
    );
};

export default BookingPage;
