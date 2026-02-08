import React from 'react';
import { motion } from 'framer-motion';

const Ticker: React.FC = () => {
    const results = [
        "Alex beat Sam (2-0) +25 Elo",
        "Mike beat Jenny (2-1) +15 Elo",
        "Chris beat Pat (2-0) +30 Elo",
        "Sarah beat Tom (2-1) +10 Elo",
        "John beat Doe (2-0) +20 Elo",
    ];

    return (
        <div className="w-full bg-slate-800/30 border-y border-white/5 overflow-hidden py-3 mb-10">
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {[...results, ...results, ...results].map((result, i) => (
                    <span key={i} className="text-sm font-medium text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {result}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Ticker;
