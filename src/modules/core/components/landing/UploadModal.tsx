import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Check, Trash2, Eye, EyeOff } from 'lucide-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/canvasUtils';
import type { HeroImage } from './HeroCarousel';

type Point = { x: number; y: number };
type Area = { x: number; y: number; width: number; height: number };

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    uploadEndpoint: string;
    onUploadSuccess: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, uploadEndpoint, onUploadSuccess }) => {
    const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
    const [images, setImages] = useState<HeroImage[]>([]);

    // Upload State
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrlInput, setImageUrlInput] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (activeTab === 'manage') {
                fetchImages();
            }
            // Reset upload state on open
            setImageSrc(null);
            setTitle('');
            setSubtitle('');
            setImageUrlInput('');
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    }, [isOpen, activeTab, uploadEndpoint]);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${uploadEndpoint}/all`);
            if (response.ok) {
                const data = await response.json();
                setImages(data);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || null));
            reader.readAsDataURL(file);
        }
    };

    const handleUrlSubmit = () => {
        if (imageUrlInput) {
            setImageSrc(imageUrlInput);
        }
    };

    const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        setIsUploading(true);
        try {
            const croppedImageBase64 = await getCroppedImg(imageSrc, croppedAreaPixels);

            const response = await fetch(uploadEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: croppedImageBase64,
                    title,
                    subtitle,
                    alt: title,
                    is_active: true
                })
            });

            if (response.ok) {
                onUploadSuccess();
                onClose();
            } else {
                const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
                console.error('Upload failed', errorData);
                alert(`Upload failed: ${errorData.detail || response.statusText}`);
            }
        } catch (e: any) {
            console.error(e);
            alert(`Upload error: ${e.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const toggleImageStatus = async (id: number, currentStatus: boolean) => {
        try {
            const response = await fetch(`${uploadEndpoint}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_active: !currentStatus })
            });
            if (response.ok) {
                fetchImages(); // Refresh list
                onUploadSuccess(); // Refresh carousel
            }
        } catch (error) {
            console.error('Error toggling image:', error);
        }
    };

    const deleteImage = async (id: number) => {
        if (!confirm('Are you sure you want to delete this image?')) return;
        try {
            const response = await fetch(`${uploadEndpoint}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchImages();
                onUploadSuccess();
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white">Manage Hero Images</h2>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-white/10">
                        <button
                            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'upload' ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:bg-white/5'}`}
                            onClick={() => setActiveTab('upload')}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Upload size={18} /> Upload New
                            </div>
                        </button>
                        <button
                            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'manage' ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-500' : 'text-slate-400 hover:bg-white/5'}`}
                            onClick={() => setActiveTab('manage')}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <ImageIcon size={18} /> Manage Existing
                            </div>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {activeTab === 'upload' ? (
                            <div className="p-6 space-y-6">
                                {!imageSrc ? (
                                    <div className="grid gap-6">
                                        <div
                                            className="border-2 border-dashed border-white/20 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all text-center"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload size={48} className="text-slate-400 mb-4" />
                                            <p className="text-lg font-medium text-white mb-2">Click to upload from device</p>
                                            <p className="text-slate-400 text-sm">JPG, PNG, GIF</p>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                        <div className="border-t border-white/10 pt-6">
                                            <label className="block text-sm font-medium text-slate-400 mb-2">Or import from URL</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="https://example.com/image.jpg"
                                                    className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                                    value={imageUrlInput}
                                                    onChange={(e) => setImageUrlInput(e.target.value)}
                                                />
                                                <button
                                                    onClick={handleUrlSubmit}
                                                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                                >
                                                    Import
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="relative h-80 bg-black/50 rounded-xl overflow-hidden border border-white/10">
                                            <Cropper
                                                image={imageSrc}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={21 / 9}
                                                onCropChange={setCrop}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm text-slate-400">Zoom</span>
                                            <input
                                                type="range"
                                                value={zoom}
                                                min={1}
                                                max={3}
                                                step={0.1}
                                                aria-labelledby="Zoom"
                                                onChange={(e) => setZoom(Number(e.target.value))}
                                                className="flex-1 accent-blue-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    placeholder="Main Headline"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Subtitle</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                                    value={subtitle}
                                                    onChange={(e) => setSubtitle(e.target.value)}
                                                    placeholder="Short description"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                            <button
                                                onClick={() => {
                                                    setImageSrc(null);
                                                    setImageUrlInput('');
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }}
                                                className="px-6 py-3 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Replace Image
                                            </button>
                                            <button
                                                onClick={onClose}
                                                className="px-6 py-3 rounded-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleUpload}
                                                disabled={isUploading || !title}
                                                className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                                            >
                                                {isUploading ? 'Uploading...' : <><Check size={18} /> Save Image</>}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="p-6">
                                {images.length === 0 ? (
                                    <div className="text-center py-12 text-slate-400">
                                        No images found. Switch to the Upload tab to add one.
                                    </div>
                                ) : (
                                    <div className="grid gap-4">
                                        {images.map((img) => (
                                            <div key={img.id} className="flex items-center gap-4 bg-slate-800/50 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-all group">
                                                <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-900 border border-white/10 relative">
                                                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                                    {!img.is_active && (
                                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                            <EyeOff size={16} className="text-slate-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-white truncate">{img.title}</h4>
                                                    <p className="text-sm text-slate-400 truncate">{img.subtitle}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => toggleImageStatus(img.id, img.is_active || false)}
                                                        className={`p-2 rounded-lg transition-colors ${img.is_active ? 'text-blue-400 hover:bg-blue-500/10' : 'text-slate-500 hover:bg-white/10'}`}
                                                        title={img.is_active ? "Hide Image" : "Show Image"}
                                                    >
                                                        {img.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                                                    </button>
                                                    <button
                                                        onClick={() => deleteImage(img.id)}
                                                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                                                        title="Delete Image"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UploadModal;
