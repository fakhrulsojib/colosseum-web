import React, { useState } from 'react';
import Login from './modules/core/pages/Login';
import Profile from './modules/core/pages/Profile';
import LeaderboardPage from './modules/pool/pages/LeaderboardPage';
import MatchEntryPage from './modules/pool/pages/MatchEntryPage';
import LandingPage from './modules/core/pages/LandingPage';
import DockNavigation from './modules/core/components/landing/DockNavigation';
import './App.css';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'profile' | 'leaderboard' | 'match'>('landing');
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    React.useEffect(() => {
        // Handle OAuth success redirect
        if (window.location.pathname === '/auth/success') {
            const params = new URLSearchParams(window.location.search);
            const tokenFromUrl = params.get('token');
            if (tokenFromUrl) {
                localStorage.setItem('token', tokenFromUrl);
                setToken(tokenFromUrl);
                setCurrentPage('profile');
                // Clean up URL
                window.history.replaceState({}, document.title, "/");
            }
        }
    }, []);

    /*
    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setCurrentPage('login');
    };
    */

    const renderPage = () => {
        switch (currentPage) {
            case 'landing': return <LandingPage />;
            case 'login': return <Login />;
            case 'profile': return <Profile />;
            case 'leaderboard': return <LeaderboardPage />;
            case 'match': return <MatchEntryPage />;
            default: return <LandingPage />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans relative">
            {/* Render the current page */}
            {renderPage()}

            {/* Global Dock Navigation (Visible on all pages, or maybe hide on Login?) */}
            {currentPage !== 'login' && (
                <DockNavigation
                    currentPage={currentPage}
                    onNavigate={setCurrentPage}
                    isAuthenticated={!!token}
                />
            )}
        </div>
    );
};

export default App;
