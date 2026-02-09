import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MainLayout from './modules/core/layouts/MainLayout';
import LandingPage from './modules/core/pages/LandingPage';
import PoolLandingPage from './modules/pool/pages/PoolLandingPage';
import ProfilePage from './modules/core/pages/Profile';
import LeaderboardPage from './modules/pool/pages/LeaderboardPage';
import './App.css';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    return (
        <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
            <Router>
                <Routes>
                    <Route element={<MainLayout isAuthenticated={!!token} setToken={setToken} />}>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/pool" element={<PoolLandingPage />} />
                        <Route path="/leaderboard" element={<LeaderboardPage />} />
                        <Route
                            path="/profile"
                            element={<ProfilePage onLogout={() => {
                                setToken(null);
                                localStorage.removeItem('token');
                            }} />}
                        />
                    </Route>
                </Routes>
            </Router>
        </GoogleOAuthProvider>
    );
};

export default App;
