import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const UpsetBox: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-7 relative overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-0 right-0 p-3 opacity-5 text-yellow-500 group-hover:opacity-10 transition-opacity">
                <AlertTriangle size={120} />
            </div>

            <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl text-yellow-400 border border-yellow-500/30 group-hover:scale-110 transition-transform">
                    <TrendingUp size={22} />
                </div>
                <h4 className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">The Upset</h4>
            </div>

            <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-900/40 rounded-lg border border-white/5">
                    <span className="text-slate-400 text-sm font-medium">Winner</span>
                    <span className="font-bold text-white text-lg">Rookie12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-900/40 rounded-lg border border-white/5">
                    <span className="text-slate-400 text-sm font-medium">Defeated</span>
                    <span className="font-bold text-slate-300 text-lg line-through opacity-60">ProMaster</span>
                </div>

                <div className="bg-gradient-to-br from-slate-900/60 to-slate-900/40 rounded-xl p-4 border border-white/5 mt-4">
                    <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-slate-400 font-semibold uppercase tracking-wider">Win Probability</span>
                        <span className="text-green-400 font-mono text-sm font-bold">20%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 h-2 rounded-full overflow-hidden border border-slate-600/50">
                        <motion.div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-lg shadow-green-500/50"
                            initial={{ width: 0 }}
                            whileInView={{ width: '20%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                    </div>
                </div>
            </div>

            {/* Decorative gradient blob */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        </motion.div>
    );
};

export default UpsetBox;
