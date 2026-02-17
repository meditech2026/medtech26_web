import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './Registration.css';
import { GOOGLE_SCRIPT_URL } from '../config';

const Registration = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") || "Presentation";

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        course: '',
        college: '',
        phone: '',
        email: '',
        title: '',
        abstract: ''
    });

    const isPaper = type === "Paper";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const dataToSubmit = new FormData();
        dataToSubmit.append("name", formData.name);
        dataToSubmit.append("course", formData.course);
        dataToSubmit.append("college", formData.college);
        dataToSubmit.append("phone", formData.phone);
        dataToSubmit.append("email", formData.email);
        dataToSubmit.append("title", formData.title);
        dataToSubmit.append("abstract", formData.abstract);
        dataToSubmit.append("type", type);
        dataToSubmit.append("timestamp", new Date().toISOString());

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                body: dataToSubmit,
                mode: "no-cors" // Google Scripts require no-cors for simple POSTs from browser
            });

            // Optimistically save to local storage for backup/admin view until sheet fetch works perfectly
            // Or purely rely on Sheet? Let's rely on Sheet but maybe keep local as successful backup?
            // Actually, for "no-cors", we can't see the response content, so we assume success if no error.

            // Also save to LocalStorage as a fallback/immediate view for now
            const existingData = JSON.parse(localStorage.getItem('registrations') || '[]');
            const newEntry = {
                ...formData,
                id: Date.now(),
                type: type,
                timestamp: new Date().toISOString()
            };
            existingData.push(newEntry);
            localStorage.setItem('registrations', JSON.stringify(existingData));

            alert("Registration Successful!");
            setFormData({
                name: '',
                course: '',
                college: '',
                phone: '',
                email: '',
                title: '',
                abstract: ''
            });

        } catch (error) {
            console.error("Error submitting to Google Sheet", error);
            alert("There was an error submitting the form. Please try again.");
        }
    };

    return (
        <div className="registration-page">
            <div className="form-box">
                <h2 id="formTitle">{type} Registration</h2>

                <form id="regForm" onSubmit={handleSubmit} noValidate>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="course"
                        placeholder="Course"
                        required
                        value={formData.course}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="college"
                        placeholder="College Name"
                        required
                        value={formData.college}
                        onChange={handleChange}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Presentation Title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <textarea
                        id="abstract"
                        name="abstract"
                        placeholder={isPaper ? "Abstract (Required)" : "Abstract (Optional)"}
                        required={isPaper}
                        value={formData.abstract}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit" className="btn">Submit Registration</button>
                </form>

                <Link to="/" className="back">← Back to Categories</Link>
            </div>
        </div>
    );
};

export default Registration;
