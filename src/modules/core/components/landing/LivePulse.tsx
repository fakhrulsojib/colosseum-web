import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const LivePulse: React.FC = () => {
    return (
        <div className="flex items-center justify-center gap-2 mb-6">
            <div className="relative flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                    <motion.span
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                    ></motion.span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Live Action
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
                <Activity size={14} />
                <span>3 Matches currently played</span>
            </div>
        </div>
    );
};

export default LivePulse;
