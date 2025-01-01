import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize user from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
        } catch (error) {
            console.error(error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                formData.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            console.log(res);

            localStorage.setItem('token', res.data.access_token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
            await fetchUser(res.data.access_token);
            toast.success('Logged in successfully!');
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Invalid credentials');
        }
    };


    const signup = async (username, email, password) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
                username,
                email,
                password,
            });
            toast.success('Account created successfully! Please log in.');
            router.push('/login');
        } catch (error) {
            console.error(error);
            toast.error('Error creating account');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        router.push('/login');
        toast.info('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
