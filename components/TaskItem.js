// components/TaskItem.js
import Link from 'next/link';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
    return (
        <div className="flex justify-between items-center p-4 border rounded mb-2">
            <div>
                <h3 className={`text-lg ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                <p>{task.description}</p>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => onToggleComplete(task.id, !task.completed)}
                    className={`mr-2 px-3 py-1 rounded ${task.completed ? 'bg-yellow-500' : 'bg-green-500'
                        } text-white`}
                >
                    {task.completed ? 'Mark as Pending' : 'Mark as Complete'}
                </button>
                <Link className="mr-2 px-3 py-1 bg-blue-500 text-white rounded" href={`/tasks/edit/${task.id}`}>
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
