import type React from 'react';

export type BookingStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Booking {
    id: number;
    bookingNumber: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    service: string;
    date: string;
    time: string;
    bedrooms: number;
    bathrooms: number;
    status: BookingStatus;
}

export type BookingDetails = Omit<Booking, 'id' | 'bookingNumber' | 'status'>;

export interface Password {
    id: number;
    password: string;
}

export interface ServiceType {
    id: string;
    title: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    price: string;
}

export interface Cleaner {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    contact: string;
}

export interface AuthContextType {
    isAdmin: boolean;
    passwords: { id: number; password: string }[];
    login: (password: string) => boolean;
    logout: () => void;
    addPassword: (password: string) => Promise<boolean>;
    deletePassword: (id: number) => Promise<boolean>;
}