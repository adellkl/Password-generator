import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            setProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="progress-bar">
            <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default ProgressBar; 