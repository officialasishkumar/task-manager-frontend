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
                <div className={`md:flex ${isMenuOpen ? '' : 'hidden'} flex-col md:flex-row`}>
                    {user ? (
                        <>
                            <Link className="mr-4 mt-2 md:mt-0" href="/dashboard">
                                Dashboard
                            </Link>
                            <Link className="mr-4 mt-2 md:mt-0" href="/tasks">
                                Tasks
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 px-3 py-1 rounded mt-2 md:mt-0"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="mr-4 mt-2 md:mt-0" href="/login">
                                Login
                            </Link>
                            <Link href="/signup">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
