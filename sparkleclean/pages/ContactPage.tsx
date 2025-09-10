
import React from 'react';
import { PageWrapper } from '../components/helpers';
import { HOUSE_CLEANER } from '../constants';

const ContactPage = () => (
    <PageWrapper>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h1>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl text-center">
            <p className="text-gray-600">Have questions? We'd love to hear from you.</p>
            <p className="text-lg font-semibold text-sky-600 mt-4">{HOUSE_CLEANER.contact}</p>
        </div>
    </PageWrapper>
);

export default ContactPage;
