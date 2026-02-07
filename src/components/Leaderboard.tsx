import React from 'react';

const Leaderboard: React.FC = () => {
    return (
        <div>
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>ELO</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Rows will go here */}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
