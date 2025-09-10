
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PageWrapper } from '../components/helpers';
import { SERVICES_DATA } from '../constants';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="bg-sky-100 text-center py-20 md:py-32">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Pristine Clean for a Sparkling Home</h1>
                <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">Reliable, professional, and thorough cleaning services tailored to your needs.</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={() => navigate('/booking')} className="bg-sky-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-sky-600 transition duration-300 shadow-lg transform hover:scale-105">
                        Book a Cleaning
                    </button>
                    <button onClick={() => navigate('/status')} className="bg-white text-sky-600 border border-sky-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-sky-50 transition duration-300 shadow-lg transform hover:scale-105">
                        Check Booking Status
                    </button>
                </div>
            </div>
            <PageWrapper>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES_DATA.slice(0, 6).map(service => (
                        <div key={service.id} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
                            <div className="flex justify-center items-center mb-4 text-sky-500"><service.icon className="h-12 w-12" /></div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{service.title}</h3>
                            <p className="text-gray-600">{service.description.substring(0, 80)}...</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12"><Link to="/services" className="text-sky-600 font-semibold hover:underline">View All Services &rarr;</Link></div>
            </PageWrapper>
        </div>
    );
};

export default HomePage;
