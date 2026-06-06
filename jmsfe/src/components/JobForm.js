import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../hooks/useForm';
import './JobForm.css';

function JobForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { values, handleChange, setValues } = useForm({
        title: '',
        companyName: '',
        location: '',
        salary: '',
        jobType: 'Full Time',
        experience: '',
        description: '',
        skills: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5000/api/jobs/${id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
                .then(res => {
                    const job = res.data.data;
                    setValues({
                        title: job.title || '',
                        companyName: job.companyName || '',
                        location: job.location || '',
                        salary: job.salary || '',
                        jobType: job.jobType || 'Full Time',
                        experience: job.experience || '',
                        description: job.description || '',
                        skills: (job.skills || []).join(', '),
                    });
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title: values.title,
            companyName: values.companyName,
            location: values.location,
            salary: values.salary,
            jobType: values.jobType,
            experience: values.experience,
            description: values.description,
            skills: values.skills.split(',').map(s => s.trim()).filter(Boolean),
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
                    <input className="form-input" name="title" value={values.title} onChange={handleChange} placeholder="Job Title" />
                    <input className="form-input" name="companyName" value={values.companyName} onChange={handleChange} placeholder="Company Name" />
                    <input className="form-input" name="location" value={values.location} onChange={handleChange} placeholder="Location" />
                    <input className="form-input" name="salary" value={values.salary} onChange={handleChange} placeholder="Salary" />
                    <input className="form-input" name="jobType" value={values.jobType} onChange={handleChange} placeholder="Job Type" />
                    <input className="form-input" name="experience" value={values.experience} onChange={handleChange} placeholder="Experience" />
                    <textarea className="form-textarea" name="description" value={values.description} onChange={handleChange} placeholder="Description" rows={4} />
                    <input className="form-input" name="skills" value={values.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
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
