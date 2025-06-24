const { useState } = React;

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

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
                        <span onClick={() => completeTask(index)}>{task.text}</span>
                        <button onClick={() => deleteTask(index)}>remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

ReactDOM.render(<ToDoList />, document.getElementById('root'));
