import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MatchForm from './MatchForm';

interface MatchEntryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MatchEntryModal: React.FC<MatchEntryModalProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-[70] pointer-events-none"
                    >
                        <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl relative pointer-events-auto max-h-[90vh] overflow-y-auto">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                                Record Match Result
                            </h2>

                            <MatchForm />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MatchEntryModal;
