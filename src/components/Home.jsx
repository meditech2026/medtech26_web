import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png';
import CountdownTimer from './CountdownTimer';

const Home = () => {
    const navigate = useNavigate();

    const handleRegister = (type) => {
        navigate('/coming-soon');
        // navigate(`/register?type=${type}`);
    };

    return (
        <div className="home-container">
            {/* HERO */}
            <div className="hero">
                {/* Logo Image - User must ensure src/assets/logo.png exists */}
                <img src={logo} alt="Meditech 2k26 Logo" className="hero-logo" />

                <h1>MEDITECH 2k26</h1>
                <div className="date">
                    12<sup>th</sup> &amp; 13<sup>th</sup> March 2026
                </div>

                {/* Dynamic Elements */}
                <CountdownTimer />


            </div>

            {/* OPTIONS */}
            <div className="section">
                <h2 className="section-title">Academic Presentation Categories</h2>
                <div className="container">

                    <div className="card">
                        <h2>Paper Presentation</h2>
                        <p>Submit your innovative research work</p>
                        <button className="btn" onClick={() => handleRegister('Paper')}>Register Now</button>
                    </div>

                    <div className="card">
                        <h2>Poster Presentation</h2>
                        <p>Present ideas visually & creatively</p>
                        <button className="btn" onClick={() => handleRegister('Poster')}>Register Now</button>
                    </div>

                    <div className="card">
                        <h2>Model Presentation</h2>
                        <p>Demonstrate your working models</p>
                        <button className="btn" onClick={() => handleRegister('Model')}>Register Now</button>
                    </div>

                </div>
            </div>

            {/* Information Density Footer */}
            <div className="footer">
                Venue: Dept. of Biomedical Engineering, OU
            </div>
        </div>
    );
};

export default Home;
