// pages/tasks/add.js
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            toast.success('Task created');
            router.push('/tasks');
        } catch (error) {
            console.error(error);
            toast.error('Failed to create task');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <h2 className="text-2xl mb-4">Add New Task</h2>
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
                <label className="block mb-4">
                    Description:
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded mt-1"
                    ></textarea>
                </label>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default ProtectedRoute(AddTask);
