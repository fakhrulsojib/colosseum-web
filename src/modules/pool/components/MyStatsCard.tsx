import React from 'react';
import { motion } from 'framer-motion';
import { User, TrendingUp, Target } from 'lucide-react';

interface MyStatsCardProps {
    isAuthenticated: boolean;
}

const MyStatsCard: React.FC<MyStatsCardProps> = ({ isAuthenticated }) => {
    // Mock user state - ideally from context
    const user = {
        name: "Sojib",
        rank: 12,
        elo: 1450,
        wins: 42,
        losses: 18
    };

    if (!isAuthenticated) {
        return (
            <div className="h-full bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col items-center justify-center text-center">
                <User size={32} className="text-slate-500 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">My Stats</h3>
                <p className="text-sm text-slate-400 mb-4">Log in to view your personalized stats and ranking.</p>
                <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors">
                    Log In
                </button>
            </div>
        );
    }

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="h-full bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-md rounded-3xl border border-blue-500/20 p-6 flex flex-col relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-blue-500/20">
                    {user.name[0]}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{user.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-blue-400 font-bold">#{user.rank} Ranked</span>
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span className="text-slate-400">{user.elo} ELO</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
                <div className="p-3 rounded-2xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <Target size={14} className="text-green-400" />
                        Win Rate
                    </div>
                    <div className="text-xl font-bold text-white">
                        {Math.round((user.wins / (user.wins + user.losses)) * 100)}%
                    </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <TrendingUp size={14} className="text-blue-400" />
                        Record
                    </div>
                    <div className="text-xl font-bold text-white">
                        {user.wins}W - {user.losses}L
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MyStatsCard;
