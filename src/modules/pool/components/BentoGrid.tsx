import React from 'react';
import Ticker from '../../core/components/landing/Ticker';
import UpsetBox from '../../core/components/landing/UpsetBox';
import OnFireBox from '../../core/components/landing/OnFireBox';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';

const BentoGrid: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="w-full pb-24">
            {/* Ticker Section */}
            <div className="w-full mb-12 -mx-4 md:mx-0">
                <Ticker />
            </div>

            <motion.div 
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Large Featured Item - Tournament Finals */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-2 bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Featured
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Tournament Finals</h3>
                        <p className="text-slate-400 text-base md:text-lg mb-8 max-w-xl leading-relaxed">Watch the highlights from yesterday's intense grand finale between the top 2 seeds.</p>
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl group-hover:gap-3 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                            Watch Replay <ArrowRight size={18} />
                        </button>
                    </div>
                    {/* Enhanced abstract visuals */}
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-gradient-to-br from-blue-500/30 to-purple-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute top-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                </motion.div>

                {/* Upset Box */}
                <motion.div variants={itemVariants}>
                    <UpsetBox />
                </motion.div>

                {/* On Fire Box */}
                <motion.div variants={itemVariants}>
                    <OnFireBox />
                </motion.div>

                {/* Weekly Leaderboard Card */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="md:col-span-2 bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-sm rounded-3xl p-8 border border-white/10 flex items-center justify-between group cursor-pointer relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative z-10 flex items-center gap-4">
                        <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-500/30 group-hover:scale-110 transition-transform">
                            <Trophy size={32} className="text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Weekly Leaderboard</h3>
                            <p className="text-slate-400 text-sm">Top 3 players receive exclusive badges</p>
                        </div>
                    </div>
                    <div className="relative z-10 w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all border border-white/10">
                        <ArrowRight size={24} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-full blur-3xl"></div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default BentoGrid;
