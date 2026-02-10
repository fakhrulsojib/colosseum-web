import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, AlertCircle } from 'lucide-react';
import { matchService } from '../services/matchService';
import type { Match } from '../services/matchService';
import { userService } from '../../core/services/userService';
import type { User } from '../../core/types/user';

interface MatchWithUsers extends Match {
    winner?: User;
    loser?: User;
}

interface MatchListModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MatchListModal: React.FC<MatchListModalProps> = ({ isOpen, onClose }) => {
    const [matches, setMatches] = useState<MatchWithUsers[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const LIMIT = 10;

    const loadMoreMatches = useCallback(async (reset = false) => {
        if (loading) return;
        setLoading(true);
        try {
            const currentPage = reset ? 0 : page;
            const newMatches = await matchService.fetchMatches(currentPage * LIMIT, LIMIT);

            if (newMatches.length < LIMIT) {
                setHasMore(false);
            }

            const userIds = new Set<string>();
            newMatches.forEach(m => {
                userIds.add(String(m.winner_id));
                userIds.add(String(m.loser_id));
            });

            await userService.fetchUsersBatch(Array.from(userIds));

            const enrichedMatches = newMatches.map(m => ({
                ...m,
                winner: userService.getUser(String(m.winner_id)),
                loser: userService.getUser(String(m.loser_id))
            }));

            setMatches(prev => reset ? enrichedMatches : [...prev, ...enrichedMatches]);
            setPage(prev => reset ? 1 : prev + 1);
        } catch (error) {
            console.error("Failed to load matches", error);
        } finally {
            setLoading(false);
        }
    }, [page, loading]);

    useEffect(() => {
        if (isOpen && matches.length === 0) {
            loadMoreMatches(true);
        }
    }, [isOpen, loadMoreMatches, matches.length]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
                >
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-slate-800/50">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            <Trophy className="text-blue-500" />
                            All Match History
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="overflow-y-auto p-6 space-y-4 flex-1 custom-scrollbar">
                        {matches.length === 0 && !loading ? (
                            <div className="text-center py-12 text-slate-500 flex flex-col items-center gap-4">
                                <AlertCircle size={48} className="opacity-50" />
                                <p>No match history found.</p>
                            </div>
                        ) : (
                            matches.map((match) => (
                                <div key={match.id} className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className="flex items-center gap-3 text-right flex-1 justify-end">
                                            <span className="font-bold text-white">{match.winner?.full_name || 'Unknown'}</span>
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                                {match.winner?.full_name?.[0] || 'W'}
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col items-center px-4">
                                            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full mb-1">WIN</span>
                                            <span className="text-slate-600 text-xs">VS</span>
                                        </div>

                                        <div className="flex items-center gap-3 text-left flex-1 justify-start">
                                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm">
                                                {match.loser?.full_name?.[0] || 'L'}
                                            </div>
                                            <span className="text-slate-400">{match.loser?.full_name || 'Unknown'}</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-slate-600 font-mono ml-4 w-20 text-right">
                                        {new Date(match.timestamp).toLocaleDateString()}
                                    </div>
                                </div>
                            ))
                        )}
                        
                        {hasMore && (
                            <div className="pt-4 text-center">
                                <button
                                    onClick={() => loadMoreMatches(false)}
                                    disabled={loading}
                                    className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Loading...' : 'Load More Matches'}
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default MatchListModal;
