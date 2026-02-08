import React, { useState } from 'react';
import Login from './modules/core/pages/Login';
import Profile from './modules/core/pages/Profile';
import LeaderboardPage from './modules/pool/pages/LeaderboardPage';
import MatchEntryPage from './modules/pool/pages/MatchEntryPage';
import './App.css';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'login' | 'profile' | 'leaderboard' | 'match'>('leaderboard');
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setCurrentPage('login');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'login': return <Login />;
            case 'profile': return <Profile />;
            case 'leaderboard': return <LeaderboardPage />;
            case 'match': return <MatchEntryPage />;
            default: return <LeaderboardPage />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans">
            <nav className="p-4 bg-slate-800 flex gap-4 justify-center shadow-lg">
                <button
                    onClick={() => setCurrentPage('leaderboard')}
                    className={`px-4 py-2 rounded ${currentPage === 'leaderboard' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
                >
                    Leaderboard
                </button>
                <button
                    onClick={() => setCurrentPage('match')}
                    className={`px-4 py-2 rounded ${currentPage === 'match' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
                >
                    Record Match
                </button>
                <button
                    onClick={() => setCurrentPage('profile')}
                    className={`px-4 py-2 rounded ${currentPage === 'profile' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setCurrentPage('login')}
                    className={`px-4 py-2 rounded ${currentPage === 'login' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
                >
                    {token ? 'Account' : 'Login'}
                </button>
                {token && (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    >
                        Logout
                    </button>
                )}
            </nav>

            <main className="p-8">
                {renderPage()}
            </main>
        </div>
    );
};

export default App;
