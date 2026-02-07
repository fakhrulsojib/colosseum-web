import React from 'react';
import Leaderboard from '../components/Leaderboard';

const LeaderboardPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Global Arena Leaderboard</h1>
            <Leaderboard />
        </div>
    );
};

export default LeaderboardPage;
