
import React, { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
};

export const PageWrapper: React.FC<{ children: ReactNode, className?: string }> = ({ children, className = '' }) => (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fadeIn ${className}`}>
        {children}
    </div>
);
