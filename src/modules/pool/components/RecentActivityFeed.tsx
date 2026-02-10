import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { matchService } from '../services/matchService';
import type { Match } from '../services/matchService';
import { userService } from '../../core/services/userService';
import type { User } from '../../core/types/user';

interface MatchWithUsers extends Match {
    winner?: User;
    loser?: User;
}

interface RecentActivityFeedProps {
    className?: string;
    limit?: number;
}

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ className = "", limit = 5 }) => {
    const [matches, setMatches] = useState<MatchWithUsers[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMatches = async () => {
            try {
                const recentMatches = await matchService.fetchMatches(0, limit);
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
    }, [limit]);

    if (loading) {
        return <div className={`animate-pulse h-64 bg-slate-800/50 rounded-3xl ${className}`} />;
    }

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={`h-full bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col relative overflow-hidden group ${className}`}
        >
            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Clock size={20} className="text-blue-400" />
                    Recent Activity
                </h3>
                <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View All</button>
            </div>

            <div className="space-y-4 relative z-10 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {matches.length === 0 ? (
                    <div className="text-center text-slate-500 py-8">No recent matches found.</div>
                ) : (
                    matches.map((match) => (
                        <div key={match.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group/item cursor-default border border-transparent hover:border-white/5">
                            <div className="text-[10px] font-mono text-slate-500 w-12 text-center bg-slate-800/50 py-1 rounded">
                                {new Date(match.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            
                            <div className="flex-1 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 overflow-hidden">
                                     <span className="font-bold text-green-400 truncate">{match.winner?.full_name || 'Unknown'}</span>
                                     <span className="text-xs text-slate-600 font-bold">VS</span>
                                     <span className="font-bold text-red-400 truncate">{match.loser?.full_name || 'Unknown'}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default RecentActivityFeed;
