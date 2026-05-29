import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
            setTimeout(() => navigate('/jobs'), 800);
        } catch (err) {
            console.error(err);
            setMessage('Operation failed');
        }
    };

    const cardStyle = {
        border: '2px solid #ccc',
        padding: '24px',
        width: '600px',
        maxWidth: '95%',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        background: '#fff'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        boxSizing: 'border-box',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const buttonStyle = {
        padding: '10px 18px',
        borderRadius: '4px',
        border: 'none',
        background: '#1976d2',
        color: '#fff',
        cursor: 'pointer'
    };

    return (
        <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f7fb' }}>
            <div style={cardStyle}>
                <h2 style={{ textAlign: 'center', marginTop: 0 }}>{id ? 'Edit Job' : 'Create Job'}</h2>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', alignItems: 'center' }}>
                    <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" />
                    <input style={inputStyle} value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
                    <input style={inputStyle} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                    <input style={inputStyle} value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salary" />
                    <input style={inputStyle} value={jobType} onChange={(e) => setJobType(e.target.value)} placeholder="Job Type" />
                    <input style={inputStyle} value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" />
                    <textarea style={{ ...inputStyle, resize: 'vertical' }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={4} />
                    <input style={inputStyle} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills (comma separated)" />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '6px' }}>
                        <button style={buttonStyle} type="submit">{id ? 'Update Job' : 'Create Job'}</button>
                    </div>
                </form>
                <div style={{ marginTop: '12px', textAlign: 'center', color: message.includes('success') ? 'green' : 'red' }}>{message}</div>
            </div>
        </div>
    );
}

export default JobForm;
