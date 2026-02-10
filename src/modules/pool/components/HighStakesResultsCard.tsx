import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface HighStakesMatch {
    id: string;
    player1: { name: string; elo: number; avatar: string };
    player2: { name: string; elo: number; avatar: string };
    combinedElo: number;
    winnerId?: string;
    timeAgo: string;
}

const mockHighStakes: HighStakesMatch[] = [
    {
        id: '1',
        player1: { name: 'Sarah', elo: 1450, avatar: 'S' },
        player2: { name: 'Alex', elo: 1410, avatar: 'A' },
        combinedElo: 2860,
        timeAgo: '2h ago'
    },
    {
        id: '2',
        player1: { name: 'John', elo: 1425, avatar: 'J' },
        player2: { name: 'Mike', elo: 1390, avatar: 'M' },
        combinedElo: 2815,
        timeAgo: '5h ago'
    }
];

const HighStakesResultsCard: React.FC = () => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="h-full bg-slate-900/50 backdrop-blur-md rounded-3xl border border-red-500/20 relative overflow-hidden group p-6 flex flex-col"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Flame size={20} className="text-red-500 fill-red-500/20" />
                    High Stakes
                    <span className="hidden md:inline-flex px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 uppercase tracking-wide">
                        Top Rated
                    </span>
                </h3>
            </div>

            <div className="flex-1 flex flex-col gap-4 relative z-10">
                {mockHighStakes.map((match) => (
                    <div key={match.id} className="relative p-4 rounded-2xl bg-slate-800/40 border border-white/5 hover:bg-slate-800/60 transition-colors group/match">
                        <div className="flex items-center justify-between gap-4">
                            {/* Player 1 */}
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 border border-white/10 group-hover/match:border-red-500/30 transition-colors">
                                    {match.player1.avatar}
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-sm font-bold text-white">{match.player1.name}</div>
                                    <div className="text-xs text-slate-500">{match.player1.elo}</div>
                                </div>
                            </div>

                            {/* VS */}
                            <div className="flex flex-col items-center">
                                <div className="text-xs font-bold text-red-500/50 font-mono mb-1">VS</div>
                                <div className="px-2 py-1 rounded bg-slate-900/50 border border-white/5 text-[10px] text-slate-400 font-mono">
                                    Avg {Math.round(match.combinedElo / 2)}
                                </div>
                            </div>

                            {/* Player 2 */}
                            <div className="flex items-center gap-3 flex-1 flex-row-reverse text-right">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 border border-white/10 group-hover/match:border-red-500/30 transition-colors">
                                    {match.player2.avatar}
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-sm font-bold text-white">{match.player2.name}</div>
                                    <div className="text-xs text-slate-500">{match.player2.elo}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default HighStakesResultsCard;
