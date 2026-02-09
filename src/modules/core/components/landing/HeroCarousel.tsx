import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import UploadModal from './UploadModal';


export interface HeroImage {
    id: number;
    url: string;
    alt: string;
    title: string;
    subtitle: string;
    is_active?: boolean;
}

interface HeroCarouselProps {
    images: HeroImage[];
    uploadEndpoint?: string;
    onRefresh?: () => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images, uploadEndpoint, onRefresh }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // Filter active images locally if needed, though API should return appropriate ones
    const activeImages = images.filter(img => img.is_active !== false);

    useEffect(() => {
        if (activeImages.length === 0) return;

        // Reset index if out of bounds after filtering
        if (currentIndex >= activeImages.length) {
            setCurrentIndex(0);
        }

        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(timer);
    }, [currentIndex, activeImages.length]);

    const handleNext = () => {
        if (activeImages.length === 0) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % activeImages.length);
    };

    const handlePrev = () => {
        if (activeImages.length === 0) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
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
            {/* Upload Modal */}
            {uploadEndpoint && onRefresh && (
                <UploadModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setIsUploadModalOpen(false)}
                    uploadEndpoint={uploadEndpoint}
                    onUploadSuccess={onRefresh}
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

            <div className="relative bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl aspect-[21/9]">

                {/* Manage Button */}
                {uploadEndpoint && (
                    <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
                        title="Manage Images"
                    >
                        <Settings size={20} />
                    </button>
                )}

                <div className="relative w-full h-full">
                    {activeImages.length > 0 ? (
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
                                <div className="relative w-full h-full">
                                    <img
                                        src={activeImages[currentIndex].url}
                                        alt={activeImages[currentIndex].alt}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                                        >
                                            {activeImages[currentIndex].title}
                                        </motion.h2>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-slate-300 text-lg md:text-xl max-w-2xl"
                                        >
                                            {activeImages[currentIndex].subtitle}
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full text-slate-400">
                            <p className="mb-4">No active images</p>
                            {uploadEndpoint && (
                                <button
                                    onClick={() => setIsUploadModalOpen(true)}
                                    className="px-6 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition-colors"
                                >
                                    Upload Image
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {activeImages.length > 1 && (
                    <>
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

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {activeImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`transition-all ${index === currentIndex
                                        ? 'w-8 h-2 bg-white'
                                        : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                                        } rounded-full`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white text-sm font-medium z-10">
                            {currentIndex + 1} / {activeImages.length}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default HeroCarousel;
