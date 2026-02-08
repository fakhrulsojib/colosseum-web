import React from 'react';
import { Home, Trophy, User, LogIn, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DockNavigationProps {
    currentPage: string;
    onNavigate: (page: 'landing' | 'leaderboard' | 'profile' | 'login') => void;
    isAuthenticated: boolean;
}

const DockNavigation: React.FC<DockNavigationProps> = ({ currentPage, onNavigate, isAuthenticated }) => {
    const navItems = [
        { id: 'landing', icon: Home, label: 'Home' },
        { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
        { id: 'match', icon: PlusCircle, label: 'Record' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <motion.div
                layout
                className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl"
            >
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id as any)}
                        className={`p-3 rounded-full transition-all duration-300 relative group ${currentPage === item.id
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                            }`}
                        aria-label={item.label}
                    >
                        <item.icon size={20} />
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {item.label}
                        </span>
                    </button>
                ))}

                <div className="w-px h-6 bg-white/20 mx-2" />

                <button
                    onClick={() => onNavigate('login')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${isAuthenticated
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-white text-black hover:bg-gray-200'
                        }`}
                >
                    {isAuthenticated ? (
                        <span>Account</span>
                    ) : (
                        <>
                            <LogIn size={18} />
                            <span>Login</span>
                        </>
                    )}
                </button>
            </motion.div>
        </div>
    );
};

export default DockNavigation;
