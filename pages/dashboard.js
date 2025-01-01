import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import axios from 'axios';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [summary, setSummary] = useState({ completed: 0, pending: 0 });
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const redirectToTasks = (filter) => {
        router.push(`/tasks?filter=${filter}`);
    };

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
                <button
                    onClick={() => redirectToTasks('completed')}
                    className="p-6 bg-green-100 rounded shadow hover:bg-green-200"
                >
                    <h2 className="text-xl">Completed Tasks</h2>
                    <p className="text-2xl">{summary.completed}</p>
                </button>
                <button
                    onClick={() => redirectToTasks('pending')}
                    className="p-6 bg-yellow-100 rounded shadow hover:bg-yellow-200"
                >
                    <h2 className="text-xl">Pending Tasks</h2>
                    <p className="text-2xl">{summary.pending}</p>
                </button>
            </div>
        </div>
    );
};

export default ProtectedRoute(Dashboard);
