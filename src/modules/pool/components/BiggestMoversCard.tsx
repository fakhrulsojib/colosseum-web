import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowUp } from 'lucide-react';

interface Mover {
    id: string;
    name: string;
    change: number;
}

const mockGainers: Mover[] = [
    { id: '1', name: 'John', change: 32 },
    { id: '2', name: 'David', change: 24 },
    { id: '3', name: 'Lisa', change: 18 },
];

const mockLosers: Mover[] = [
    { id: '4', name: 'Mike', change: -28 },
    { id: '5', name: 'Sarah', change: -15 },
    { id: '6', name: 'Tom', change: -12 },
];

const BiggestMoversCard: React.FC = () => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="h-full bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col relative overflow-hidden group"
        >
            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity size={20} className="text-blue-400" />
                    Biggest Movers
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 relative z-10 h-full">
                {/* Gainers */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <ArrowUp size={14} /> Rising
                    </h4>
                    {mockGainers.map((mover) => (
                        <div key={mover.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/30 border border-white/5 hover:bg-slate-800/50 transition-colors">
                            <span className="font-bold text-slate-200">{mover.name}</span>
                            <div className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                                <span className="font-bold font-mono">+{mover.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Losers */}
                <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <ArrowUp size={14} className="rotate-180" /> Falling
                    </h4>
                    {mockLosers.map((mover) => (
                        <div key={mover.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/30 border border-white/5 hover:bg-slate-800/50 transition-colors">
                            <span className="font-bold text-slate-200">{mover.name}</span>
                            <div className="flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20">
                                <span className="font-bold font-mono">{mover.change}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default BiggestMoversCard;
