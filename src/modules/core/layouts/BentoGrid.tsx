import React from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = "" }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div 
            className={`w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 ${className}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {children}
        </motion.div>
    );
};

interface BentoItemProps {
    children: React.ReactNode;
    colSpan?: 1 | 2 | 3;
    className?: string;
}

export const BentoItem: React.FC<BentoItemProps> = ({ children, colSpan = 1, className = "" }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const spanClasses = {
        1: "md:col-span-1",
        2: "md:col-span-2",
        3: "md:col-span-3"
    };

    return (
        <motion.div
            variants={itemVariants}
            className={`${spanClasses[colSpan]} ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default BentoGrid;
