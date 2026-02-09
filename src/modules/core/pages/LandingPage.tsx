import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Zap, Gamepad2 } from 'lucide-react';
import HeroCarousel from '../components/landing/HeroCarousel';
import type { HeroImage } from '../components/landing/HeroCarousel';
import PageHero from '../components/landing/PageHero';



import { useNavigate } from 'react-router-dom';

const sports = [
    {
        id: '/pool',
        title: 'Pool',
        icon: Trophy,
        description: 'Master the break, sink the 8-ball, and compete in high-stakes tournaments.',
        color: 'from-blue-500 to-indigo-600',
        bgGlow: 'bg-blue-500/20'
    },
    {
        id: '/cricket',
        title: 'Cricket',
        icon: Zap,
        description: 'Experience the thrill of T20 matches and rise through the ranks.',
        color: 'from-green-500 to-emerald-600',
        bgGlow: 'bg-green-500/20',
        disabled: true
    },
    {
        id: '/fifa',
        title: 'FIFA',
        icon: Gamepad2,
        description: 'Build your ultimate team and dominate the virtual pitch.',
        color: 'from-purple-500 to-pink-600',
        bgGlow: 'bg-purple-500/20',
        disabled: true
    }
];

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [heroImages, setHeroImages] = useState<HeroImage[]>([]);

    useEffect(() => {
        const fetchHeroImages = async () => {
            try {
                const response = await fetch('/api/v1/hero-images');
                if (response.ok) {
                    const data = await response.json();
                    setHeroImages(data);
                } else {
                    console.error('Failed to fetch hero images');
                }
            } catch (error) {
                console.error('Error fetching hero images:', error);
            }
        };

        fetchHeroImages();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <main className="relative z-10 pt-12 pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-24">
                    <PageHero
                        title="COLOSSEUM"
                        subtitle="The ultimate competitive gaming platform."
                    />

                    <HeroCarousel images={heroImages} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {sports.map((sport, index) => (
                        <motion.button
                            key={sport.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            onClick={() => !sport.disabled && navigate(sport.id)}
                            disabled={sport.disabled}
                            className={`group relative text-left p-8 rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-300 ${sport.disabled
                                ? 'opacity-50 cursor-not-allowed grayscale'
                                : 'hover:-translate-y-2 hover:shadow-2xl hover:border-white/20'
                                }`}
                        >
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${sport.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                            <div className={`absolute -inset-1 rounded-3xl ${sport.bgGlow} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sport.color} p-4 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                                    <sport.icon size={32} className="text-white" />
                                </div>

                                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                                    {sport.title}
                                </h3>

                                <p className="text-slate-400 text-lg mb-8 leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {sport.description}
                                </p>

                                <div className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider ${sport.disabled ? 'text-slate-600' : 'text-blue-400 group-hover:text-blue-300'}`}>
                                    {sport.disabled ? 'Coming Soon' : (
                                        <>
                                            Enter Arena <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
