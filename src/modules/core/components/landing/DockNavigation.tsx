import React from 'react';
import { Home, Trophy, User, LogIn, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

interface DockNavigationProps {
    currentPage: string;
    onNavigate: (page: 'landing' | 'leaderboard' | 'profile' | 'match') => void;
    isAuthenticated: boolean;
    setToken: (token: string | null) => void;
}

const DockNavigation: React.FC<DockNavigationProps> = ({ currentPage, onNavigate, isAuthenticated, setToken }) => {
    const navItems = [
        { id: 'landing', icon: Home, label: 'Home' },
        { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
        { id: 'match', icon: PlusCircle, label: 'Record' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ access_token: tokenResponse.access_token }),
                });

                if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem('token', data.access_token);
                    setToken(data.access_token);
                    onNavigate('profile');
                } else {
                    console.error('Login failed');
                }
            } catch (err) {
                console.error('Login error', err);
            }
        },
        onError: () => console.log('Login Failed'),
    });

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

                {!isAuthenticated && (
                    <>
                        <div className="w-px h-6 bg-white/20 mx-2" />

                        <button
                            onClick={() => googleLogin()}
                            className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all bg-white text-black hover:bg-gray-200"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </button>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default DockNavigation;
