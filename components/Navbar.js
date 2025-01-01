import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="font-bold text-xl" href="/">
                    Task Manager
                </Link>
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
                <div className="hidden md:flex space-x-4">
                    {user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/tasks"
                                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Tasks
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {/* Dropdown for Mobile */}
            {isMenuOpen && (
                <div className="md:hidden mt-2 bg-blue-500 rounded shadow-lg">
                    {user ? (
                        <>
                            <Link
                                className="block px-4 py-2 hover:bg-blue-600"
                                href="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                className="block px-4 py-2 hover:bg-blue-600"
                                href="/tasks"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Tasks
                            </Link>
                            <button
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                className="block px-4 py-2 hover:bg-blue-600"
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                className="block px-4 py-2 hover:bg-blue-600"
                                href="/signup"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
