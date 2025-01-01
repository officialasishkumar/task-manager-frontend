// pages/tasks/edit/[id].js
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../../context/AuthContext';
import ProtectedRoute from '../../../components/ProtectedRoute';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditTask = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const { id } = router.query;
    const [form, setForm] = useState({
        title: '',
        description: '',
        completed: false,
    });

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const res = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                    setForm({
                        title: res.data.title,
                        description: res.data.description || '',
                        completed: res.data.completed,
                    });
                } catch (error) {
                    console.error(error);
                    toast.error('Failed to fetch task');
                }
            };
            fetchTask();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            toast.success('Task updated');
            router.push('/tasks');
        } catch (error) {
            console.error(error);
            toast.error('Failed to update task');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <h2 className="text-2xl mb-4">Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded mt-1"
                    />
                </label>
                <label className="block mb-2">
                    Description:
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                    ></textarea>
                </label>
                <label className="block mb-4 flex items-center">
                    <input
                        type="checkbox"
                        name="completed"
                        checked={form.completed}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Completed
                </label>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default ProtectedRoute(EditTask);
