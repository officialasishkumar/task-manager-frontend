// components/Navbar.js
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <Link className="font-bold text-xl" href="/">
                    Task Manager
                </Link>
                <div>
                    {user ? (
                        <>
                            <Link className="mr-4" href="/dashboard">
                                Dashboard
                            </Link>
                            <Link className="mr-4" href="/tasks">
                                Tasks
                            </Link>
                            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="mr-4" href="/login">
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
