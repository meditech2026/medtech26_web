import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';
import { GOOGLE_SCRIPT_URL } from '../config';

const Admin = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin2026') {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect Password");
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchData = async () => {
            try {
                // Try fetching from Google Sheet
                if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_WEB_APP_URL_HERE") {
                    const response = await fetch(GOOGLE_SCRIPT_URL);
                    const data = await response.json();
                    setRegistrations(data.reverse()); // Show newest first
                } else {
                    // Fallback to LocalStorage if URL not set
                    console.warn("Google Script URL not set, falling back to LocalStorage");
                    const localData = JSON.parse(localStorage.getItem('registrations') || '[]');
                    setRegistrations(localData.reverse());
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Fallback on error
                const localData = JSON.parse(localStorage.getItem('registrations') || '[]');
                setRegistrations(localData.reverse());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated]);

    const clearData = () => {
        if (window.confirm('Are you sure you want to delete all registration data?')) {
            localStorage.removeItem('registrations');
            setRegistrations([]);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="form-box" style={{ width: '350px', textAlign: 'center' }}>
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn">Login</button>
                    </form>
                    <Link to="/" className="back" style={{ marginTop: '20px' }}>Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="actions">
                    <Link to="/" className="btn home-btn">Home</Link>
                    <button onClick={clearData} className="btn clear-btn">Clear Data</button>
                </div>
            </div>

            <div className="table-container">
                {registrations.length === 0 ? (
                    <p className="no-data">No registrations found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>College</th>
                                <th>Course</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Abstract</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg) => (
                                <tr key={reg.id}>
                                    <td><span className={`tag ${reg.type}`}>{reg.type}</span></td>
                                    <td>{reg.name}</td>
                                    <td>{reg.college}</td>
                                    <td>{reg.course}</td>
                                    <td>{reg.phone}</td>
                                    <td>{reg.email}</td>
                                    <td>{reg.title}</td>
                                    <td className="abstract-cell" title={reg.abstract}>
                                        {reg.abstract ? (reg.abstract.length > 30 ? reg.abstract.substring(0, 30) + '...' : reg.abstract) : '-'}
                                    </td>
                                    <td>{new Date(reg.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Admin;
