import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(form.username, form.password);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <h2 className="text-2xl mb-4">Login</h2>
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
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account?{' '}
                <Link className="text-blue-600" href="/signup">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;
