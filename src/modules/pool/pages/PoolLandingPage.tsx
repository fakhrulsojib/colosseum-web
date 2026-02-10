import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroCarousel from '../../core/components/landing/HeroCarousel';
import type { HeroImage } from '../../core/components/landing/HeroCarousel';
import PageHero from '../../core/components/landing/PageHero';
import BentoGrid from '../components/BentoGrid';
import TopMatchCard from '../components/TopMatchCard';
import type { TopMatchPlayer } from '../components/TopMatchCard';

const player1: TopMatchPlayer = {
    name: "Sarah",
    elo: 1450,
    role: "Challenger",
    avatarLetter: "S",
    colorClasses: {
        avatar: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
        name: "from-blue-300 to-blue-500",
        elo: "text-blue-400",
        border: "border-blue-400/30 group-hover:border-blue-400/50",
        shadow: "shadow-blue-500/50"
    }
};

const player2: TopMatchPlayer = {
    name: "John",
    elo: 1425,
    role: "Defender",
    avatarLetter: "J",
    colorClasses: {
        avatar: "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600",
        name: "from-purple-300 to-purple-500",
        elo: "text-purple-400",
        border: "border-purple-400/30 group-hover:border-purple-400/50",
        shadow: "shadow-purple-500/50"
    }
};

const PoolLandingPage: React.FC = () => {
    const [heroImages, setHeroImages] = useState<HeroImage[]>([]);

    const fetchHeroImages = React.useCallback(async () => {
        try {
            const response = await fetch('/api/pool/hero-images');
            if (response.ok) {
                const data = await response.json();
                setHeroImages(data);
            } else {
                console.error('Failed to fetch pool hero images');
            }
        } catch (error) {
            console.error('Error fetching pool hero images:', error);
        }
    }, []);

    useEffect(() => {
        fetchHeroImages();
    }, [fetchHeroImages]);

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-[0%] left-[20%] w-[30%] h-[30%] bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <main className="relative z-10 pt-12 pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <PageHero
                    title="POOL ARENA"
                    subtitle="Master the break, sink the 8-ball, and become a legend."
                    titleClassName="text-6xl md:text-7xl lg:text-8xl mb-8"
                    subtitleClassName="text-lg md:text-xl mb-10 max-w-2xl"
                />


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <HeroCarousel
                        images={heroImages}
                        uploadEndpoint="/api/pool/hero-images"
                        onRefresh={fetchHeroImages}
                    />
                    <TopMatchCard
                        title="The Rematch"
                        player1={player1}
                        player2={player2}
                        communityHype={85}
                        viewersCount="2,847"
                        countdown="04:30"
                    />
                    <BentoGrid />
                </motion.div>
            </main>
        </div>
    );
};

export default PoolLandingPage;
