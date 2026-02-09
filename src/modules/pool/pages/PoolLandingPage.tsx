import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Users, Flame } from 'lucide-react';
import PageHero from '../../core/components/landing/PageHero';
import BentoGrid from '../../core/components/landing/BentoGrid';

// --- HeadlinerCard Component Code ---
const HeadlinerCard: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full mb-16 relative group"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-10 md:p-12 overflow-hidden shadow-2xl">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Zap size={240} />
                </div>
                <div className="absolute bottom-0 left-0 p-4 opacity-5 pointer-events-none">
                    <Flame size={200} />
                </div>

                {/* Match Type Badge */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-400 text-sm font-bold uppercase tracking-widest shadow-lg shadow-red-500/10">
                        <Flame size={16} className="animate-pulse" />
                        The Rematch
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 relative z-10">
                    {/* Player 1 */}
                    <motion.div
                        className="text-center md:text-left flex-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 mx-auto md:mx-0 mb-4 shadow-2xl shadow-blue-500/50 flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-blue-400/30 group-hover:border-blue-400/50 transition-all">
                            S
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">Sarah</h3>
                        <p className="text-blue-400 font-mono text-lg font-bold">1450 ELO</p>
                        <div className="mt-2 text-xs text-slate-500 uppercase tracking-wider">Challenger</div>
                    </motion.div>

                    {/* VS & Hype */}
                    <div className="flex-1 flex flex-col items-center max-w-md">
                        <motion.div
                            className="text-5xl md:text-6xl font-black italic mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            VS
                        </motion.div>

                        {/* Hype Meter */}
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-2 px-1">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Community Hype</span>
                                <span className="text-sm font-bold text-orange-400">85%</span>
                            </div>
                            <div className="w-full bg-slate-700/50 h-3 rounded-full overflow-hidden mb-3 relative border border-slate-600/50">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-lg shadow-orange-500/50"
                                />
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                                <Users size={16} className="text-orange-400" />
                                <span>2,847 watching</span>
                            </div>
                        </div>
                    </div>

                    {/* Player 2 */}
                    <motion.div
                        className="text-center md:text-right flex-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 mx-auto md:mx-0 md:ml-auto mb-4 shadow-2xl shadow-purple-500/50 flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-purple-400/30 group-hover:border-purple-400/50 transition-all">
                            J
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">John</h3>
                        <p className="text-purple-400 font-mono text-lg font-bold">1425 ELO</p>
                        <div className="mt-2 text-xs text-slate-500 uppercase tracking-wider">Defender</div>
                    </motion.div>
                </div>

                {/* Countdown */}
                <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-center gap-4 text-slate-300">
                    <motion.div
                        className="flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 px-6 py-3 rounded-xl backdrop-blur-sm shadow-lg"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Clock size={20} className="text-blue-400" />
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-slate-400 uppercase tracking-wider">Starts in</span>
                            <span className="font-mono text-2xl font-bold text-white">04:30</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};
// ---------------------------------------

const PoolLandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">
            {/* Enhanced Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-[0%] left-[20%] w-[30%] h-[30%] bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <main className="relative z-10 pt-12 pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <PageHero
                    title="POOL ARENA"
                    subtitle="Master the break, sink the 8-ball, and become a legend."
                    titleClassName="text-6xl md:text-7xl lg:text-8xl mb-8"
                    subtitleClassName="text-lg md:text-xl mb-10 max-w-2xl"
                />

                {/* Pool Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Replaced HeroCarousel with HeadlinerCard */}
                    <HeadlinerCard />
                    <BentoGrid />
                </motion.div>
            </main>
        </div>
    );
};

export default PoolLandingPage;
