import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './JobForm.css';

function JobForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [jobType, setJobType] = useState('Full Time');
    const [experience, setExperience] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5000/api/jobs/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
                .then(res => {
                    const job = res.data.data;
                    setTitle(job.title || '');
                    setCompanyName(job.companyName || '');
                    setLocation(job.location || '');
                    setSalary(job.salary || '');
                    setJobType(job.jobType || 'Full Time');
                    setExperience(job.experience || '');
                    setDescription(job.description || '');
                    setSkills((job.skills || []).join(', '));
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            companyName,
            location,
            salary,
            jobType,
            experience,
            description,
            skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        };
        try {
            const token = localStorage.getItem('token');
            if (id) {
                await axios.put(`http://localhost:5000/api/jobs/${id}`, payload, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
                setMessage('Job updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/jobs', payload, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
                setMessage('Job created successfully');
            }
            setTimeout(() => navigate('/dashboard'), 800);
        } catch (err) {
            console.error(err);
            setMessage('Operation failed');
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        const confirmDelete = window.confirm('Are you sure you want to delete this job?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/jobs/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
            setMessage('Job deleted successfully');
            setTimeout(() => navigate('/dashboard'), 800);
        } catch (err) {
            console.error(err);
            setMessage('Delete operation failed');
        }
    };

    return (
        <div className="jobform-container">
            <div className="job-card">
                <h2>{id ? 'Edit Job' : 'Create Job'}</h2>
                <form onSubmit={handleSubmit} className="job-form">
                    <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" />
                    <input className="form-input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
                    <input className="form-input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                    <input className="form-input" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" />
                    <input className="form-input" value={jobType} onChange={(e) => setJobType(e.target.value)} placeholder="Job Type" />
                    <input className="form-input" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" />
                    <textarea className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={4} />
                    <input className="form-input" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" />
                    <div className="button-group">
                        <button className="btn-primary" type="submit">
                            {id ? 'Update Job' : 'Create Job'}
                        </button>
                        {id && (
                            <button className="btn-danger" type="button" onClick={handleDelete}>
                                Delete Job
                            </button>
                        )}
                        <button className="btn-secondary" type="button" onClick={() => navigate('/dashboard')}>
                            Cancel
                        </button>
                    </div>
                </form>
                {message && (
                    <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobForm;
