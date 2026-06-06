import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowJobs.css";

function SeekerJobs() {
    const [skill, setSkill] = useState("");
    const [jobs, setJobs] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [seekerName, setSeekerName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const seeker = localStorage.getItem('seeker');
        if (!seeker) {
            navigate('/seeker/login');
            return;
        }
        const seekerData = JSON.parse(seeker);
        setSeekerName(seekerData.name || seekerData.email || 'Job Seeker');
    }, [navigate]);

    // Note: don't load jobs on mount — wait for seeker to search

    const handleSearch = async (e) => {
        e && e.preventDefault();
        setHasSearched(true);
        const query = (skill || '').trim();
        if (!query) {
            setJobs([]);
            setMessageType('error');
            setMessage('Please enter a skill to search');
            return;
        }
        setLoading(true);
        setMessage('');
        try {
            const res = await axios.get(`http://localhost:5000/api/seeker/jobs/search?skill=${encodeURIComponent(query)}`);
            setJobs(res.data.data || []);
        } catch (err) {
            console.error(err);
            setMessage('Search failed');
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId) => {
        const seeker = JSON.parse(localStorage.getItem('seeker') || '{}');
        if (!seeker || !seeker._id) {
            navigate('/seeker/login');
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/api/seeker/applications/apply', { seekerId: seeker._id, jobId });
            if (res.data.success) {
                setMessageType('success');
                setMessage('Applied successfully');
            } else {
                setMessageType('error');
                setMessage(res.data.message || 'Apply failed');
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || err.message || 'Apply failed';
            setMessageType('error');
            setMessage(errorMessage);
        } finally {
            setTimeout(() => setMessage(''), 1500);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('seeker');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1>Search Jobs</h1>
                    {seekerName && <p className="welcome-text">Welcome, {seekerName}!</p>}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="text" placeholder="Skill (e.g. React)" value={skill} onChange={(e) => setSkill(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                    <button onClick={() => navigate('/seeker/applied')}>My Applications</button>
                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {loading && <p className="loading-message">Loading...</p>}

            {hasSearched && (
              <table className="jobs-table" border="1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Salary</th>
                        <th>Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <tr key={job._id}>
                                <td>{job.title}</td>
                                <td>{job.companyName}</td>
                                <td>{job.location}</td>
                                <td>{job.salary}</td>
                                <td>{Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}</td>
                                <td>
                                    <button onClick={() => handleApply(job._id)}>Apply</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>{loading ? '' : 'No Data Found'}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            )}
            {message && (
                <div className={`message ${messageType === 'success' ? 'success' : 'error'}`} style={{ marginTop: '20px' }}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default SeekerJobs;
