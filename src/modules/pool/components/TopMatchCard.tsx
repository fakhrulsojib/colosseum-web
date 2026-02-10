import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Users, Flame } from 'lucide-react';

export interface TopMatchPlayer {
    name: string;
    elo: number;
    role: string;
    avatarLetter: string;
    colorClasses: {
        avatar: string;
        name: string;
        elo: string;
        border: string;
        shadow: string;
    };
}

interface TopMatchCardProps {
    title?: string;
    player1: TopMatchPlayer;
    player2: TopMatchPlayer;
    communityHype: number;
    viewersCount: string;
    countdown: string;
    className?: string;
}

const TopMatchCard: React.FC<TopMatchCardProps> = ({
    title = "Top Match",
    player1,
    player2,
    communityHype,
    viewersCount,
    countdown,
    className = ""
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`w-full relative group ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-12 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Zap size={240} />
                </div>
                <div className="absolute bottom-0 left-0 p-4 opacity-5 pointer-events-none">
                    <Flame size={200} />
                </div>

                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-400 text-sm font-bold uppercase tracking-widest shadow-lg shadow-red-500/10">
                        <Flame size={16} className="animate-pulse" />
                        {title}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 relative z-10">
                    <motion.div
                        className="text-center md:text-left flex-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full ${player1.colorClasses.avatar} mx-auto md:mx-0 mb-4 shadow-2xl ${player1.colorClasses.shadow} flex items-center justify-center text-4xl md:text-5xl font-bold border-4 ${player1.colorClasses.border} transition-all`}>
                            {player1.avatarLetter}
                        </div>
                        <h3 className={`text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r ${player1.colorClasses.name} bg-clip-text text-transparent`}>{player1.name}</h3>
                        <p className={`${player1.colorClasses.elo} font-mono text-lg font-bold`}>{player1.elo} ELO</p>
                        <div className="mt-2 text-xs text-slate-500 uppercase tracking-wider">{player1.role}</div>
                    </motion.div>

                    <div className="flex-1 flex flex-col items-center max-w-md">
                        <motion.div
                            className="text-5xl md:text-6xl font-black italic mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            VS
                        </motion.div>

                        <div className="w-full">
                            <div className="flex items-center justify-between mb-2 px-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Community Hype</span>
                                <span className="text-sm font-bold text-orange-400">{communityHype}%</span>
                            </div>
                            <div className="w-full bg-slate-700/50 h-3 rounded-full overflow-hidden mb-3 relative border border-slate-600/50">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${communityHype}%` }}
                                    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-lg shadow-orange-500/50"
                                />
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                                <Users size={16} className="text-orange-400" />
                                <span>{viewersCount} watching</span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="text-center md:text-right flex-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full ${player2.colorClasses.avatar} mx-auto md:mx-0 md:ml-auto mb-4 shadow-2xl ${player2.colorClasses.shadow} flex items-center justify-center text-4xl md:text-5xl font-bold border-4 ${player2.colorClasses.border} transition-all`}>
                            {player2.avatarLetter}
                        </div>
                        <h3 className={`text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r ${player2.colorClasses.name} bg-clip-text text-transparent`}>{player2.name}</h3>
                        <p className={`${player2.colorClasses.elo} font-mono text-lg font-bold`}>{player2.elo} ELO</p>
                        <div className="mt-2 text-xs text-slate-500 uppercase tracking-wider">{player2.role}</div>
                    </motion.div>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-center gap-4 text-slate-300">
                    <motion.div
                        className="flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 px-6 py-3 rounded-xl backdrop-blur-sm shadow-lg"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Clock size={20} className="text-blue-400" />
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Starts in</span>
                            <span className="font-mono text-2xl font-bold text-white">{countdown}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default TopMatchCard;
