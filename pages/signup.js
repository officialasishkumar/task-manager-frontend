import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(form.username, form.email, form.password);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded mt-1"
                    />
                </label>
                <label className="block mb-2">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded mt-1"
                    />
                </label>
                <label className="block mb-4">
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded mt-1"
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{' '}
                <Link className="text-blue-600" href="/login">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Signup;
