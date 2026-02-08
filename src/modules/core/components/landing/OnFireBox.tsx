import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const OnFireBox: React.FC = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden"
        >
            <div className="absolute -bottom-4 -right-4 text-orange-500/20">
                <Flame size={120} />
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-500">
                    <Flame size={20} className="animate-pulse" />
                </div>
                <h4 className="font-bold text-lg">On Fire</h4>
            </div>

            <div className="relative z-10 text-center py-2">
                <div className="w-16 h-16 rounded-full bg-slate-700 mx-auto mb-3 border-2 border-orange-500 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full" />
                </div>
                <h3 className="font-bold text-xl mb-1">Felix</h3>
                <div className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-orange-500/20">
                    <span>12 WINS</span>
                </div>
            </div>
        </motion.div>
    );
};

export default OnFireBox;
