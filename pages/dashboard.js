import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [summary, setSummary] = useState({ completed: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/tasks/summary`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setSummary(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchSummary();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="mt-10">
            <h1 className="text-3xl mb-6">Dashboard</h1>
            <div className="flex space-x-4">
                <div className="p-6 bg-green-100 rounded shadow">
                    <h2 className="text-xl">Completed Tasks</h2>
                    <p className="text-2xl">{summary.completed}</p>
                </div>
                <div className="p-6 bg-yellow-100 rounded shadow">
                    <h2 className="text-xl">Pending Tasks</h2>
                    <p className="text-2xl">{summary.pending}</p>
                </div>
            </div>
        </div>
    );
};

export default ProtectedRoute(Dashboard);
