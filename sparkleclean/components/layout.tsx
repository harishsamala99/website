
import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import { SparkleIcon } from './icons';

export const AppLayout: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow"><Outlet /></main>
        <Footer />
    </div>
);

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAdmin, logout } = useAuth();

    const navLinks = [
        { path: '/', name: 'Home' },
        { path: '/services', name: 'Services' },
        { path: '/about', name: 'About' },
        { path: '/contact', name: 'Contact' },
        { path: '/status', name: 'Check Status' },
    ];

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    useEffect(() => { setIsOpen(false); }, [location]);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center text-2xl font-bold text-sky-600">
                        <SparkleIcon className="h-8 w-8 text-sky-500 mr-2" />
                        SparkleClean
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                                `text-gray-600 hover:text-sky-600 transition duration-300 ${isActive ? 'text-sky-600 font-semibold' : ''}`
                            }>{link.name}</NavLink>
                        ))}
                        {isAdmin ? (
                            <>
                                <NavLink to="/admin/bookings" className={({ isActive }) => `text-gray-600 hover:text-sky-600 transition duration-300 ${isActive ? 'text-sky-600 font-semibold' : ''}`}>Dashboard</NavLink>
                                <NavLink to="/admin/settings" className={({ isActive }) => `text-gray-600 hover:text-sky-600 transition duration-300 ${isActive ? 'text-sky-600 font-semibold' : ''}`}>Settings</NavLink>
                                <button onClick={handleLogout} className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow-sm">Logout</button>
                            </>
                        ) : (
                            <Link to="/booking" className="bg-sky-500 text-white px-5 py-2 rounded-full hover:bg-sky-600 transition duration-300 shadow-sm">Book Now</Link>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-sky-600 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden pb-4 flex flex-col items-start space-y-2">
                        {navLinks.map(link => (
                            <NavLink key={link.name} to={link.path} className={({ isActive }) =>
                                `block w-full text-left px-2 py-1 text-gray-600 hover:text-sky-600 transition duration-300 ${isActive ? 'text-sky-600 font-semibold' : ''}`
                            }>{link.name}</NavLink>
                        ))}
                        {isAdmin ? (
                            <>
                                <NavLink to="/admin/bookings" className={({ isActive }) => `block w-full text-left px-2 py-1 text-gray-600 hover:text-sky-600 transition duration-300 ${isActive ? 'text-sky-600 font-semibold' : ''}`}>Dashboard</NavLink>
                                <NavLink to="/admin/settings" className={({ isActive }) => `block w-full text-left px-2 py-1 text-gray-600 hover:text-sky-600 transition duration-300 ${isActive ? 'text-sky-600 font-semibold' : ''}`}>Settings</NavLink>
                                <button onClick={handleLogout} className="mt-2 w-full text-center bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow-sm">Logout</button>
                            </>
                        ) : (
                            <Link to="/booking" className="mt-2 w-full text-center bg-sky-500 text-white px-5 py-2 rounded-full hover:bg-sky-600 transition duration-300 shadow-sm">Book Now</Link>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
};

const Footer = () => (
    <footer className="bg-gray-800 text-white">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} SparkleClean. All Rights Reserved.</p>
        </div>
    </footer>
);
