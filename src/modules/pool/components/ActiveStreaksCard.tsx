import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';

interface Streak {
    id: string;
    name: string;
    avatar: string;
    streak: number;
}

const mockStreaks: Streak[] = [
    { id: '1', name: 'Alex', avatar: 'A', streak: 7 },
    { id: '2', name: 'Sarah', avatar: 'S', streak: 4 },
    { id: '3', name: 'Mike', avatar: 'M', streak: 3 },
];

const ActiveStreaksCard: React.FC = () => {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="h-full bg-slate-800/40 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col relative overflow-hidden group"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap size={20} className="text-orange-400 fill-orange-400" />
                    Hot Streaks
                </h3>
            </div>

            <div className="space-y-4 relative z-10">
                {mockStreaks.map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between group/item">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                                index === 0 
                                    ? 'bg-gradient-to-br from-orange-400 to-red-500 shadow-orange-500/30' 
                                    : 'bg-slate-700 text-slate-300'
                            }`}>
                                {player.avatar}
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm">{player.name}</div>
                                {index === 0 && <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Unstoppable</div>}
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className={`text-xl font-black ${
                                index === 0 ? 'text-orange-400' : 'text-slate-500 group-hover/item:text-slate-300'
                            }`}>
                                {player.streak}
                            </span>
                            <TrendingUp size={14} className={index === 0 ? 'text-orange-500' : 'text-slate-600'} />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default ActiveStreaksCard;
