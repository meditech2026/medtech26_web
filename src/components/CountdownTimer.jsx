import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const eventDate = new Date('2026-03-12T00:00:00');
        const difference = eventDate - new Date();

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval} style={{ margin: '0 10px', textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', display: 'block', color: '#67e8f9', textShadow: '0 0 10px rgba(103, 232, 249, 0.5)' }}>
                    {timeLeft[interval]}
                </span>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#a78bfa' }}>
                    {interval}
                </span>
            </span>
        );
    });

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '30px',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '15px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            backdropFilter: 'blur(5px)'
        }}>
            {timerComponents.length ? timerComponents : <span>Event Started!</span>}
        </div>
    );
};

export default CountdownTimer;
