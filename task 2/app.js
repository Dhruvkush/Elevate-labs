const { useState } = React;

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const addTask = () => {
        if (newTask.trim() === '') return;
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask('');
    };

    const completeTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        if (editIndex === index) {
            setEditIndex(null);
            setEditText('');
        }
    };

    const startEdit = (index) => {
        setEditIndex(index);
        setEditText(tasks[index].text);
    };

    const saveEdit = (index) => {
        if (editText.trim() === '') return;
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: editText } : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditText('');
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button className="add-task" onClick={addTask}>
                Add Task
            </button>
            <ul>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`task-item ${task.completed ? 'completed' : ''}`}
                    >
                        {editIndex === index ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="edit-input"
                            />
                        ) : (
                            <span onClick={() => completeTask(index)}>{task.text}</span>
                        )}
                        <div className="button-group">
                            {editIndex === index ? (
                                <button  onClick={() => saveEdit(index)}>Save</button>
                            ) : (
                                <button onClick={() => startEdit(index)}>Edit</button>
                            )}
                            <button onClick={() => deleteTask(index)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

ReactDOM.render(<ToDoList />, document.getElementById('root'));