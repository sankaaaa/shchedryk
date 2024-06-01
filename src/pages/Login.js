import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import supabase from "../config/supabaseClient";
import "../styles/login.css";

const Login = ({setAuthenticated, setUserRole}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data: directorData} = await supabase
                .from('director')
                .select('id_dir, login, password, role')
                .eq('login', username)
                .eq('password', password)
                .single();

            if (directorData) {
                setAuthenticated(true);
                setUserRole(directorData.role);
                localStorage.setItem('userRole', directorData.role);
                localStorage.setItem('userData', JSON.stringify(directorData));
                navigate('/main');
                return;
            }

            const {data: adminData} = await supabase
                .from('administrator')
                .select('id_admin, login, password')
                .eq('login', username)
                .eq('password', password)
                .single();

            if (adminData) {
                setAuthenticated(true);
                setUserRole(adminData.login);
                localStorage.setItem('userRole', adminData.login);
                localStorage.setItem('userData', JSON.stringify(adminData));
                navigate('/main');
                return;
            }

            setError('Invalid username or password');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
