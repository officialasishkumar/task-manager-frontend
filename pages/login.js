import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(form.username, form.password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
            <h2 className="text-2xl mb-6 text-center">Login</h2>
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
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Password Field Using Flexbox */}
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
                            className="flex-grow p-3 border-none rounded-l focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition-colors"
                >
                    Login
                </button>
            </form>

            {/* Sign-Up Link */}
            <p className="mt-6 text-center">
                Don't have an account?{' '}
                <Link className="text-blue-600 hover:underline" href="/signup">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;