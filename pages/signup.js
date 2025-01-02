import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(form.username, form.email, form.password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
            <h2 className="text-2xl mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {/* Username Field */}
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="password">
                        Password:
                    </label>
                    <div className="flex items-center border rounded">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="flex-grow p-3 border-none rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="p-3 text-gray-600 hover:text-gray-800 focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors"
                >
                    Sign Up
                </button>
            </form>

            {/* Sign-In Link */}
            <p className="mt-6 text-center">
                Already have an account?{' '}
                <Link className="text-blue-600 hover:underline" href="/login">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Signup;
