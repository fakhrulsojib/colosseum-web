import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const UpsetBox: React.FC = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-3 opacity-5 text-yellow-500">
                <AlertTriangle size={100} />
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                    <TrendingUp size={20} />
                </div>
                <h4 className="font-bold text-lg">The Upset</h4>
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Winner</span>
                    <span className="font-bold text-white">Rookie12</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400 text-sm">Defeated</span>
                    <span className="font-bold text-slate-300">ProMaster</span>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-500">Win Probability</span>
                        <span className="text-green-400 font-mono">20%</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[20%]"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default UpsetBox;
