import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Profile from './modules/core/pages/Profile';
import LeaderboardPage from './modules/pool/pages/LeaderboardPage';
import MatchEntryPage from './modules/pool/pages/MatchEntryPage';
import LandingPage from './modules/core/pages/LandingPage';
import DockNavigation from './modules/core/components/landing/DockNavigation';
import './App.css';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'landing' | 'profile' | 'leaderboard' | 'match'>('landing');
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setCurrentPage('landing');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'landing': return <LandingPage />;
            case 'profile': return <Profile onLogout={handleLogout} />;
            case 'leaderboard': return <LeaderboardPage />;
            case 'match': return <MatchEntryPage />;
            default: return <LandingPage />;
        }
    };

    return (
        <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
            <div className="min-h-screen bg-slate-900 text-white font-sans relative">
                {/* Render the current page */}
                {renderPage()}

                {/* Global Dock Navigation */}
                <DockNavigation
                    currentPage={currentPage}
                    onNavigate={setCurrentPage}
                    isAuthenticated={!!token}
                    setToken={setToken}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;
