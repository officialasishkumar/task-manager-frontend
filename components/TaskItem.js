import Link from 'next/link';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border rounded mb-2 bg-gray-100 shadow">
            <div className="text-center md:text-left">
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>
                    {task.title}
                </h3>
                <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
                <button
                    onClick={() => onToggleComplete(task.id, !task.completed)}
                    className={`px-3 py-1 rounded text-white ${task.completed ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                >
                    {task.completed ? 'Mark as Pending' : 'Mark as Complete'}
                </button>
                <Link
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    href={`/tasks/edit/${task.id}`}
                >
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
