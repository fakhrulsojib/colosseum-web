import React, { useState } from 'react';
import { Home, Trophy, User, LogIn, LogOut, PlusCircle, Gamepad2, CircleDot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import MatchEntryModal from '../../pool/components/MatchEntryModal';

interface DockNavigationProps {
    isAuthenticated: boolean;
    setToken: (token: string | null) => void;
}

const DockNavigation: React.FC<DockNavigationProps> = ({ isAuthenticated, setToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

    const isCurrentPage = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const navItems = [
        { id: '/', icon: Home, label: 'Home' },
        { id: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    ];

    const rightItems = [
        { id: 'match', icon: PlusCircle, label: 'Record' },
    ];

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        navigate('/');
        setIsProfileMenuOpen(false);
    };

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
                    navigate('/profile');
                    setIsProfileMenuOpen(false);
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
        <>
            <MatchEntryModal
                isOpen={isMatchModalOpen}
                onClose={() => setIsMatchModalOpen(false)}
            />

            <div
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
                style={{ marginLeft: 'calc(var(--scrollbar-width, 0px) * -0.5)' }}
            >
                <motion.div
                    layout
                    className="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-2xl relative"
                >

                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                navigate(item.id);
                                setIsGameMenuOpen(false);
                                setIsProfileMenuOpen(false);
                            }}
                            className={`p-3 rounded-full transition-all duration-300 relative group ${isCurrentPage(item.id)
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


                    <div className="relative">
                        <AnimatePresence>
                            {isGameMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.8, x: '-50%' }}
                                    animate={{ opacity: 1, y: -10, scale: 1, x: '-50%' }}
                                    exit={{ opacity: 0, y: 20, scale: 0.8, x: '-50%' }}
                                    className="absolute bottom-full left-1/2 mb-4 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl min-w-[140px]"
                                >
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() => {
                                                navigate('/pool');
                                                setIsGameMenuOpen(false);
                                            }}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:bg-white/10 group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                                <CircleDot size={18} />
                                            </div>
                                            <span className="text-sm font-medium text-white">Pool</span>
                                        </button>

                                        <button
                                            disabled
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl opacity-50 cursor-not-allowed group grayscale"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                                                <Gamepad2 size={18} />
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="text-sm font-medium text-white">Cricket</span>
                                                <span className="text-[10px] text-gray-400">Soon</span>
                                            </div>
                                        </button>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45 border-r border-b border-white/20" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => {
                                setIsGameMenuOpen(!isGameMenuOpen);
                                setIsProfileMenuOpen(false);
                            }}
                            className={`p-3 rounded-full transition-all duration-300 relative group ${(isGameMenuOpen || isCurrentPage('/pool'))
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            aria-label="Games"
                        >
                            <Gamepad2 size={24} />
                            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Games
                            </span>
                        </button>
                    </div>


                    {rightItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'match') {
                                    setIsMatchModalOpen(true);
                                }
                                setIsGameMenuOpen(false);
                                setIsProfileMenuOpen(false);
                            }}
                            className={`p-3 rounded-full transition-all duration-300 relative group ${isMatchModalOpen
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


                    <div className="relative">
                        <AnimatePresence>
                            {isProfileMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.8, x: '-50%' }}
                                    animate={{ opacity: 1, y: -10, scale: 1, x: '-50%' }}
                                    exit={{ opacity: 0, y: 20, scale: 0.8, x: '-50%' }}
                                    className="absolute bottom-full left-1/2 mb-4 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl min-w-[160px]"
                                >
                                    <div className="flex flex-col gap-1">
                                        {isAuthenticated ? (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        navigate('/profile');
                                                        setIsProfileMenuOpen(false);
                                                    }}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:bg-white/10 group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                                        <User size={18} />
                                                    </div>
                                                    <span className="text-sm font-medium text-white">Profile</span>
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:bg-red-500/10 group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                                                        <LogOut size={18} />
                                                    </div>
                                                    <span className="text-sm font-medium text-white group-hover:text-red-400 transition-colors">Logout</span>
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => googleLogin()}
                                                className="flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:bg-white/10 group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black shadow-lg shadow-white/20 group-hover:scale-110 transition-transform">
                                                    <LogIn size={18} />
                                                </div>
                                                <span className="text-sm font-medium text-white">Login</span>
                                            </button>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45 border-r border-b border-white/20" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => {
                                setIsProfileMenuOpen(!isProfileMenuOpen);
                                setIsGameMenuOpen(false);
                            }}
                            className={`p-3 rounded-full transition-all duration-300 relative group ${(isProfileMenuOpen || isCurrentPage('/profile'))
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            aria-label="Profile"
                        >
                            <User size={20} />
                            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Account
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default DockNavigation;
