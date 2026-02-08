import React from 'react';
import { motion } from 'framer-motion';

type Sport = 'Pool' | 'Cricket' | 'FIFA';

interface SportSwitcherProps {
    currentSport: Sport;
    onSportChange: (sport: Sport) => void;
}

const sports: Sport[] = ['Pool', 'Cricket', 'FIFA'];

const SportSwitcher: React.FC<SportSwitcherProps> = ({ currentSport, onSportChange }) => {
    return (
        <div className="flex justify-center mb-8">
            <div className="flex bg-slate-800/50 backdrop-blur-sm p-1 rounded-full border border-slate-700/50">
                {sports.map((sport) => (
                    <button
                        key={sport}
                        onClick={() => onSportChange(sport)}
                        className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${currentSport === sport ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        {currentSport === sport && (
                            <motion.div
                                layoutId="activeSport"
                                className="absolute inset-0 bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{sport}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SportSwitcher;
