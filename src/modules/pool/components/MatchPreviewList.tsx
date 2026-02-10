import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';
import { matchService } from '../services/matchService';
import type { Match } from '../services/matchService';
import { userService } from '../../core/services/userService';
import type { User } from '../../core/types/user';

interface MatchWithUsers extends Match {
    winner?: User;
    loser?: User;
}

interface MatchPreviewListProps {
    onSeeAll: () => void;
}

const MatchPreviewList: React.FC<MatchPreviewListProps> = ({ onSeeAll }) => {
    const [matches, setMatches] = useState<MatchWithUsers[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMatches = async () => {
            try {
                const recentMatches = await matchService.fetchMatches(0, 5);
                const userIds = new Set<string>();
                recentMatches.forEach(m => {
                    userIds.add(String(m.winner_id));
                    userIds.add(String(m.loser_id));
                });

                await userService.fetchUsersBatch(Array.from(userIds));

                const enrichedMatches = recentMatches.map(m => ({
                    ...m,
                    winner: userService.getUser(String(m.winner_id)),
                    loser: userService.getUser(String(m.loser_id))
                }));

                setMatches(enrichedMatches);
            } catch (error) {
                console.error("Failed to load matches", error);
            } finally {
                setLoading(false);
            }
        };

        loadMatches();
    }, []);

    if (loading) {
        return <div className="animate-pulse h-64 bg-slate-800/50 rounded-3xl" />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden mb-12"
        >
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Trophy className="text-yellow-500" size={20} />
                    Last 5 Matches
                </h3>
                <button
                    onClick={onSeeAll}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors font-semibold"
                >
                    See All <ArrowRight size={14} />
                </button>
            </div>
            <div className="divide-y divide-white/5">
                {matches.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">No matches recorded yet.</div>
                ) : (
                    matches.map((match) => (
                        <div key={match.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4 flex-1">
                                {/* Winner */}
                                <div className="flex items-center gap-3 text-right flex-1 justify-end">
                                    <span className="font-bold text-white hidden md:block">{match.winner?.full_name || 'Unknown'}</span>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20 ring-2 ring-yellow-500/30">
                                        {match.winner?.full_name?.[0] || '?'}
                                    </div>
                                </div>

                                <div className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-bold text-slate-400">VS</div>

                                {/* Loser */}
                                <div className="flex items-center gap-3 text-left flex-1 justify-start">
                                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold border border-white/10">
                                        {match.loser?.full_name?.[0] || '?'}
                                    </div>
                                    <span className="text-slate-400 hidden md:block">{match.loser?.full_name || 'Unknown'}</span>
                                </div>
                            </div>
                            <div className="text-xs text-slate-500 font-mono ml-4 hidden sm:block">
                                {new Date(match.timestamp).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default MatchPreviewList;
