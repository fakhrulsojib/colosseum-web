import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Crown } from 'lucide-react';

interface LeaderboardUser {
    id: string;
    name: string;
    elo: number;
    avatar: string;
    rank: number;
}

const mockLeaderboard: LeaderboardUser[] = [
    { id: '1', name: 'Sarah', elo: 1450, avatar: 'S', rank: 1 },
    { id: '2', name: 'John', elo: 1425, avatar: 'J', rank: 2 },
    { id: '3', name: 'Mike', elo: 1390, avatar: 'M', rank: 3 },
];

const SeasonLeaderboardCard: React.FC = () => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="h-full bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex justify-between items-center mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Crown size={20} className="text-yellow-400" />
                    Season Leaderboard
                </h3>
                <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                    View Full <ChevronRight size={12} />
                </button>
            </div>

            <div className="flex-1 flex items-end justify-center gap-4 relative z-10 pb-4">
                {/* Second Place */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center text-lg font-bold text-slate-300 shadow-lg shadow-slate-500/20">
                        {mockLeaderboard[1].avatar}
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-slate-200">{mockLeaderboard[1].name}</span>
                        <span className="text-xs text-slate-400 font-mono">{mockLeaderboard[1].elo}</span>
                    </div>
                    <div className="w-16 h-20 bg-gradient-to-t from-slate-700/50 to-slate-800/30 rounded-t-lg border-x border-t border-white/5 flex items-start justify-center pt-2">
                        <div className="text-4xl font-black text-slate-600/50">2</div>
                    </div>
                </div>

                {/* First Place */}
                <div className="flex flex-col items-center gap-2 -mt-4">
                    <div className="relative">
                        <Crown size={24} className="text-yellow-400 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" />
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-4 border-yellow-500/30 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-orange-500/40">
                            {mockLeaderboard[0].avatar}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-base font-bold text-white">{mockLeaderboard[0].name}</span>
                        <span className="text-xs text-yellow-500 font-mono font-bold">{mockLeaderboard[0].elo}</span>
                    </div>
                    <div className="w-20 h-28 bg-gradient-to-t from-yellow-500/20 to-orange-500/10 rounded-t-lg border-x border-t border-yellow-500/20 flex items-start justify-center pt-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-yellow-400/10 animate-pulse"></div>
                        <div className="text-5xl font-black text-yellow-500/50 relative z-10">1</div>
                    </div>
                </div>

                {/* Third Place */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-amber-900/50 border-2 border-amber-700 flex items-center justify-center text-lg font-bold text-amber-200 shadow-lg shadow-amber-900/20">
                        {mockLeaderboard[2].avatar}
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-slate-200">{mockLeaderboard[2].name}</span>
                        <span className="text-xs text-slate-400 font-mono">{mockLeaderboard[2].elo}</span>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-t from-amber-900/30 to-amber-800/20 rounded-t-lg border-x border-t border-white/5 flex items-start justify-center pt-2">
                        <div className="text-4xl font-black text-amber-900/50">3</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default SeasonLeaderboardCard;
