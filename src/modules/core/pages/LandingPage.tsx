import React, { useState } from 'react';
import SportSwitcher from '../components/landing/SportSwitcher';
import LivePulse from '../components/landing/LivePulse';
import HeadlinerCard from '../components/landing/HeadlinerCard';
import BentoGrid from '../components/landing/BentoGrid';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage: React.FC = () => {
    const [currentSport, setCurrentSport] = useState<'Pool' | 'Cricket' | 'FIFA'>('Pool');

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 pt-12 pb-32">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <LivePulse />
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
                    >
                        COLOSSEUM
                    </motion.h1>
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
                        <HeadlinerCard />
                        <BentoGrid />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Navigation Dock */}
            {/* Note: DockNavigation is passed up to App usually, but if it stays here it's fine too. 
                However, requirements said "floating dock" available. 
                If the dock replaces the top nav, it should probably be in App.tsx. 
                For now, I'll place it here as requested in "Landing Page and its items", 
                but I will integrate it into App.tsx properly. 
            */}
        </div>
    );
};

export default LandingPage;
