import React from 'react';
import './ComingSoon.css';
import logo from '../assets/logo.png';
import CountdownTimer from './CountdownTimer';

const ComingSoon = () => {
    return (
        <div className="coming-soon-container">
            {/* Background Animation Layer */}
            <div className="dna-animation">
                <div className="strand strand1"></div>
                <div className="strand strand2"></div>
            </div>

            <div className="content-wrapper">
                <img src={logo} alt="Meditech 2k26 Logo" className="cs-logo" />

                <h1 className="cs-title">Registration Opening Soon</h1>

                <p className="cs-subtitle">
                    We are finalizing the details. Check back shortly to secure your spot for the Paper, Poster, or Model Presentations.
                </p>

                <div className="cs-timer-wrapper">
                    <CountdownTimer />
                </div>

                <div className="cs-footer">
                    MEDITECH 2k26 | Department of Biomedical Engineering, OU
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
