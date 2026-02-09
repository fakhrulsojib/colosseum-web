import React from 'react';
import { motion } from 'framer-motion';
import LivePulse from './LivePulse';

interface PageHeroProps {
    title: string;
    subtitle: string;
    titleClassName?: string;
    subtitleClassName?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
    title,
    subtitle,
    titleClassName = "text-6xl md:text-7xl lg:text-9xl mb-4",
    subtitleClassName = "text-lg md:text-2xl max-w-3xl"
}) => {
    return (
        <div className="text-center mb-12">
            <LivePulse />
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`${titleClassName} font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-400`}
            >
                {title}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-slate-400 mx-auto leading-relaxed ${subtitleClassName}`}
            >
                {subtitle}
            </motion.p>
        </div>
    );
};

export default PageHero;
