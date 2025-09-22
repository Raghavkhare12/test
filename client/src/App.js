import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import './App.css'; // Your awesome UI styles

// API base URL
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// A simple Login component (you can move this to its own file)
const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        const res = await fetch(API_BASE + '/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.token) {
            setToken(data.token);
            navigate('/');
        } else {
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" onChange={onChange} required placeholder="Email" />
                <input type="password" name="password" onChange={onChange} required placeholder="Password" />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
};

// A simple Register component (you can move this to its own file)
const Register = ({ setToken }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        const res = await fetch(API_BASE + '/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.token) {
            setToken(data.token);
            navigate('/');
        } else {
            alert('User already exists or server error');
        }
    };

    return (
        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" onChange={onChange} required placeholder="Email" />
                <input type="password" name="password" onChange={onChange} required placeholder="Password" />
                <button type="submit">Register</button>
                 <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};


// The main ToDoList component
const TodoList = ({ token, logout }) => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchTasks();
    }, [token, navigate]);

    const fetchTasks = async () => {
        const res = await fetch(API_BASE + '/api/tasks', {
            headers: { 'x-auth-token': token }
        });
        const data = await res.json();
        setTasks(data);
    };

    const addTask = async () => {
        if (input.trim() === '') return;
        await fetch(API_BASE + '/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
            body: JSON.stringify({ text: input })
        });
        setInput('');
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await fetch(API_BASE + '/api/tasks/' + id, {
            method: 'DELETE',
            headers: { 'x-auth-token': token }
        });
        fetchTasks();
    };

    return (
        <div className="app-container">
            <button onClick={logout} className="logout-btn">Logout</button>
            <div className="header">
                <span className="icon">📝</span>
                <h1>My To-Do List</h1>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    className="task-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a new task..."
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button className="add-btn" onClick={addTask}>Add</button>
            </div>
            <ul className="task-list">
                {tasks.map(task => (
                    <li className="task-item" key={task._id}>
                        <span>{task.text}</span>
                        <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};


// The main App component that handles routing
function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleSetToken = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<TodoList token={token} logout={handleLogout} />} />
                <Route path="/login" element={<Login setToken={handleSetToken} />} />
                <Route path="/register" element={<Register setToken={handleSetToken} />} />
            </Routes>
            <ul className="background-animations">
                <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
            </ul>
        </>
    );
}

export default App;