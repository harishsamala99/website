import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/auth';
import { PageWrapper } from '../../components/helpers';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (login(password)) {
            navigate('/admin/bookings', { replace: true });
        } else {
            setError('Invalid password. Please try again.');
        }
    };

    return (
        <PageWrapper>
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl mt-16">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            aria-describedby="password-error"
                        />
                    </div>
                    {error && <p id="password-error" className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <button type="submit" className="w-full bg-sky-500 text-white py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium hover:bg-sky-600">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </PageWrapper>
    );
};

export default AdminLoginPage;