import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const OnFireBox: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-orange-500/15 to-red-500/15 border border-orange-500/30 rounded-2xl p-6 md:p-7 relative overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute -bottom-6 -right-6 text-orange-500/20 group-hover:text-orange-500/30 transition-colors group-hover:scale-110 duration-700">
                <Flame size={140} />
            </div>

            <div className="flex items-center gap-3 mb-6">
                <motion.div 
                    className="p-2.5 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-xl text-orange-400 border border-orange-500/40"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Flame size={22} className="animate-pulse" />
                </motion.div>
                <h4 className="font-bold text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">On Fire</h4>
            </div>

            <div className="relative z-10 text-center py-3">
                <motion.div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-700 mx-auto mb-4 border-4 border-orange-500 overflow-hidden shadow-2xl shadow-orange-500/40"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                >
                    <img src="https://ui-avatars.com/api/?name=Felix&background=random" alt="Avatar" className="w-full h-full" />
                </motion.div>
                <h3 className="font-black text-2xl md:text-3xl mb-3 bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text text-transparent">Felix</h3>
                <motion.div 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-5 py-2 rounded-full shadow-2xl shadow-orange-500/40 border border-orange-400/50"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Flame size={16} />
                    <span>12 WIN STREAK</span>
                </motion.div>
            </div>

            {/* Decorative gradient blob */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-orange-500/20 to-red-500/10 rounded-full blur-3xl"></div>
        </motion.div>
    );
};

export default OnFireBox;
