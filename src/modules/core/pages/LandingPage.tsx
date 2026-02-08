import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Trophy, Zap, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';
import LivePulse from '../components/landing/LivePulse';

// --- HeroCarousel Component Code ---
const heroImages = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop',
        alt: 'Pool Tournament Action',
        title: 'Pool Championship',
        subtitle: 'Watch the best compete for glory'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop',
        alt: 'Soccer Match',
        title: 'FIFA World League',
        subtitle: 'Experience the thrill of virtual football'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1200&h=600&fit=crop',
        alt: 'Cricket Match',
        title: 'Cricket T20 Series',
        subtitle: 'Big hits and massive sixes'
    }
];

const HeroCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-advance carousel every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full mb-16 relative group"
        >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            {/* Main carousel container */}
            <div className="relative bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl aspect-[21/9]">
                {/* Image slider */}
                <div className="relative w-full h-full">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(_e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    handleNext();
                                } else if (swipe > swipeConfidenceThreshold) {
                                    handlePrev();
                                }
                            }}
                            className="absolute inset-0"
                        >
                            {/* Image with overlay */}
                            <div className="relative w-full h-full">
                                <img
                                    src={heroImages[currentIndex].url}
                                    alt={heroImages[currentIndex].alt}
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                                
                                {/* Text content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                                    >
                                        {heroImages[currentIndex].title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-slate-300 text-lg md:text-xl max-w-2xl"
                                    >
                                        {heroImages[currentIndex].subtitle}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`transition-all ${
                                index === currentIndex
                                    ? 'w-8 h-2 bg-white'
                                    : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                            } rounded-full`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Slide counter */}
                <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-sm font-medium z-10">
                    {currentIndex + 1} / {heroImages.length}
                </div>
            </div>
        </motion.div>
    );
};
// ------------------------------------

interface LandingPageProps {
    onNavigate?: (page: string) => void;
}

const sports = [
    {
        id: 'pool-landing', // Maps to the route/state in App.tsx
        title: 'Pool',
        icon: Trophy,
        description: 'Master the break, sink the 8-ball, and compete in high-stakes tournaments.',
        color: 'from-blue-500 to-indigo-600',
        bgGlow: 'bg-blue-500/20'
    },
    {
        id: 'cricket-landing', // Future
        title: 'Cricket',
        icon: Zap,
        description: 'Experience the thrill of T20 matches and rise through the ranks.',
        color: 'from-green-500 to-emerald-600',
        bgGlow: 'bg-green-500/20',
        disabled: true // Coming soon
    },
    {
        id: 'fifa-landing', // Future
        title: 'FIFA',
        icon: Gamepad2,
        description: 'Build your ultimate team and dominate the virtual pitch.',
        color: 'from-purple-500 to-pink-600',
        bgGlow: 'bg-purple-500/20',
        disabled: true // Coming soon
    }
];

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>

            <main className="relative z-10 pt-24 pb-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section with Carousel */}
                <div className="mb-24">
                    <LivePulse />
                    <div className="text-center mb-12">
                         <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400"
                        >
                            COLOSSEUM
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed"
                        >
                            The ultimate competitive gaming platform.
                        </motion.p>
                    </div>

                     {/* The Moved HeroCarousel */}
                    <HeroCarousel />
                </div>

                {/* Sports Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {sports.map((sport, index) => (
                        <motion.button
                            key={sport.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            onClick={() => !sport.disabled && onNavigate && onNavigate(sport.id)}
                            disabled={sport.disabled}
                            className={`group relative text-left p-8 rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-300 ${
                                sport.disabled 
                                    ? 'opacity-50 cursor-not-allowed grayscale' 
                                    : 'hover:-translate-y-2 hover:shadow-2xl hover:border-white/20'
                            }`}
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${sport.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                            
                            {/* Glow Effect */}
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
