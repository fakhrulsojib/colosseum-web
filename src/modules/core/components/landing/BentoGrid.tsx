import React from 'react';
import Ticker from './Ticker';
import UpsetBox from './UpsetBox';
import OnFireBox from './OnFireBox';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BentoGrid: React.FC = () => {
    return (
        <div className="w-full pb-24">
            {/* Ticker Section - Full Width */}
            <div className="w-full mb-8">
                <Ticker />
            </div>

            <div className="w-full max-w-[95%] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Large Featured Item (Placeholder for now, or just spanning cols) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 bg-slate-800/50 rounded-3xl p-8 border border-white/5 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors duration-500"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold mb-2">Tournament Finals</h3>
                        <p className="text-slate-400 mb-6">Watch the highlights from yesterdays intense grand finale between the top 2 seeds.</p>
                        <button className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all">
                            Watch Replay <ArrowRight size={16} />
                        </button>
                    </div>
                    {/* Abstract visual */}
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
                </motion.div>

                {/* Upset Box */}
                <UpsetBox />

                {/* On Fire Box */}
                <OnFireBox />

                {/* More Grid Items can go here */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 bg-slate-800/50 rounded-3xl p-8 border border-white/5 flex items-center justify-between group cursor-pointer"
                >
                    <div>
                        <h3 className="text-xl font-bold mb-1">Weekly Loaderboard</h3>
                        <p className="text-slate-400 text-sm">Top 3 players receive exclusive badges</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <ArrowRight size={20} className="text-slate-300" />
                    </div>
                </motion.div>
            </div>
        </div>
        </div >
    );
};

export default BentoGrid;
