import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const result = location.state?.result;

    if (!result) {
        navigate('/search');
        return null;
    }

    const isPhishing = result.verdicts?.overall?.malicious;
    const reputation = result.verdicts?.overall?.score;

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">Analysis Result</h1>
                <div className={`bg-white shadow-md rounded-lg p-4 sm:p-6 ${isPhishing ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}`}>
                    <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${isPhishing ? 'text-red-600' : 'text-green-600'}`}>
                        {isPhishing ? 'Warning: Potential Phishing Site' : 'Safe to Browse'}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700 mb-2">Reputation Score: {reputation}</p>
                    <p className="text-base sm:text-lg text-gray-700">
                        Verdict: {isPhishing ? 'This website may be fraudulent.' : 'This website appears to be legitimate.'}
                    </p>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate('/search')}
                        className="w-full sm:w-auto bg-cyan-400 text-white px-6 py-3 rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        Check Another URL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Result;