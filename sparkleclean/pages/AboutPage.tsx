
import React from 'react';
import { PageWrapper } from '../components/helpers';
import { HOUSE_CLEANER } from '../constants';

const AboutPage = () => (
    <PageWrapper>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">About SparkleClean</h1>
        <div className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-16">
            <p>Founded on the principle that a clean home is a happy home, SparkleClean has been dedicated to providing top-tier cleaning services. Our mission is to create pristine environments that allow our clients to focus on what matters most.</p>
        </div>
        <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <img src={HOUSE_CLEANER.imageUrl} alt={HOUSE_CLEANER.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-sky-100" />
            <h3 className="text-xl font-semibold text-gray-800">{HOUSE_CLEANER.name}</h3>
            <p className="text-sky-600 font-medium mb-2">{HOUSE_CLEANER.role}</p>
            <p className="text-gray-600 text-sm">{HOUSE_CLEANER.bio}</p>
            <p className="mt-3 text-gray-700">📞 {HOUSE_CLEANER.contact}</p>
        </div>
    </PageWrapper>
);

export default AboutPage;
