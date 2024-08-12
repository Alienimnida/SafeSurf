import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        document.querySelector('.hero').classList.add('fade-in');
        document.querySelectorAll('.feature-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-in');
            }, 200 * index);
        });
    }, []);

    const handleSurfSafely = () => {
        navigate('/search');
    };

    return (
        <div className="container">
            <div className="wave"></div>
            <nav className="nav">
                <div className="logo">SafeSurf</div>
                <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <main className="main">
                <section className="hero">
                    <h1 className="title">Ride the Safe Wave with SafeSurf</h1>
                    <p className="description">
                        Advanced AI-powered protection against fraudulent websites and online scams.
                    </p>
                    <button className="cta" onClick={handleSurfSafely}>Surf Safely Now</button>
                </section>

                <section id="features" className="features">
                    <h2>Key Features</h2>
                    <div className="feature-grid">
                        <div className="feature-card">
                            <h3>Real-Time Scanning</h3>
                            <p>Instant analysis of URLs to detect potential threats.</p>
                        </div>
                        <div className="feature-card">
                            <h3>AI-Powered Detection</h3>
                            <p>Utilizes machine learning to identify new and evolving threats.</p>
                        </div>
                        <div className="feature-card">
                            <h3>User-Friendly Interface</h3>
                            <p>Simple and intuitive design for easy threat assessment.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>Made by a duck 🦆</p>
            </footer>
        </div>
    );
}

export default LandingPage;