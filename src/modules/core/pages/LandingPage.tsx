import React, { useState } from 'react';
import SportSwitcher from '../components/landing/SportSwitcher';
import LivePulse from '../components/landing/LivePulse';
import HeroCarousel from '../components/landing/HeroCarousel';
import BentoGrid from '../components/landing/BentoGrid';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage: React.FC = () => {
    const [currentSport, setCurrentSport] = useState<'Pool' | 'Cricket' | 'FIFA'>('Pool');

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white font-sans selection:bg-blue-500/30">
            {/* Enhanced Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-[0%] left-[20%] w-[30%] h-[30%] bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <main className="relative z-10 pt-24 pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <LivePulse />
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400"
                    >
                        COLOSSEUM
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Where champions compete and legends are born
                    </motion.p>
                    <SportSwitcher
                        currentSport={currentSport}
                        onSportChange={setCurrentSport}
                    />
                </div>

                {/* Dynamic Content based on Sport */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSport}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <HeroCarousel />
                        <BentoGrid />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default LandingPage;
