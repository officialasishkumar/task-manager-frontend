import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import axios from 'axios';
import TaskItem from '../../components/TaskItem';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Tasks = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { filter } = router.query;

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            let filteredTasks = res.data;

            // Filter tasks based on query parameter
            if (filter === 'completed') {
                filteredTasks = filteredTasks.filter((task) => task.completed);
            } else if (filter === 'pending') {
                filteredTasks = filteredTasks.filter((task) => !task.completed);
            }

            setTasks(filteredTasks);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user, filter]);

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setTasks(tasks.filter((task) => task.id !== id));
            toast.success('Task deleted');
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete task');
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
                { completed },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setTasks(
                tasks.map((task) => (task.id === id ? { ...task, completed } : task))
            );
            toast.success('Task updated');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update task');
        }
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl">Your Tasks</h1>
                <Link className="bg-blue-600 text-white px-4 py-2 rounded" href="/tasks/add">
                    Add Task
                </Link>
            </div>
            {tasks.length === 0 ? (
                <p>No tasks found. Add some!</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={deleteTask}
                        onToggleComplete={toggleComplete}
                    />
                ))
            )}
        </div>
    );
};

export default ProtectedRoute(Tasks);
