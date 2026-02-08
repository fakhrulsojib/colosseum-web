import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Users } from 'lucide-react';

const HeadlinerCard: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[95%] mx-auto mb-12 relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Zap size={200} />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    {/* Player 1 */}
                    <div className="text-center md:text-left">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mx-auto md:mx-0 mb-3 shadow-lg shadow-blue-500/30 flex items-center justify-center text-3xl font-bold">
                            S
                        </div>
                        <h3 className="text-2xl font-bold">Sarah</h3>
                        <p className="text-blue-400 font-mono">1450 ELO</p>
                    </div>

                    {/* VS & Hype */}
                    <div className="flex-1 flex flex-col items-center">
                        <div className="text-sm font-bold text-red-400 uppercase tracking-widest mb-2">The Rematch</div>
                        <div className="text-4xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6">VS</div>

                        {/* Hype Meter */}
                        <div className="w-full max-w-xs bg-slate-700/50 h-2 rounded-full overflow-hidden mb-2 relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '85%' }}
                                transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-500"
                            />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Users size={12} />
                            <span>85% Hype</span>
                        </div>
                    </div>

                    {/* Player 2 */}
                    <div className="text-center md:text-right">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 mx-auto md:mx-0 md:ml-auto mb-3 shadow-lg shadow-purple-500/30 flex items-center justify-center text-3xl font-bold">
                            J
                        </div>
                        <h3 className="text-2xl font-bold">John</h3>
                        <p className="text-purple-400 font-mono">1425 ELO</p>
                    </div>
                </div>

                {/* Countdown */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-4 text-slate-300">
                    <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-lg">
                        <Clock size={16} className="text-blue-400" />
                        <span className="font-mono text-lg">Starts in 04:30</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HeadlinerCard;
