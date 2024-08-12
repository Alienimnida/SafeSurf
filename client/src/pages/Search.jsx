import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setUrl(e.target.value);
        setError(null);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        let cleanedUrl = pastedText.trim();

        if (!cleanedUrl.startsWith('http://') && !cleanedUrl.startsWith('https://')) {
            cleanedUrl = 'https://' + cleanedUrl;
        }

        setUrl(cleanedUrl);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/api/scan', { url });
            console.log('Scan response:', response.data);
            const scanId = response.data.uuid;
            await new Promise(resolve => setTimeout(resolve, 10000));
            const scanResult = await axios.get(`http://localhost:3000/api/result/${scanId}`);
            console.log('Result response:', scanResult.data);
            setIsLoading(false);
            navigate('/result', { state: { result: scanResult.data } });
        } catch (error) {
            setIsLoading(false);
            console.error('Error details:', error.response || error);
            setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">Phishing and Fraud Detection</h1>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <input
                            ref={inputRef}
                            type="text"
                            value={url}
                            onChange={handleInputChange}
                            onPaste={handlePaste}
                            placeholder="Paste URL to check"
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-400 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                            disabled={isLoading || !url.trim()}
                        >
                            {isLoading ? 'Checking...' : 'Check URL'}
                        </button>
                    </div>
                </form>
                {isLoading && (
                    <div className="flex justify-center items-center h-24">
                        <div className="animate-bounce">
                            <svg className="w-16 h-16 text-cyan-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;