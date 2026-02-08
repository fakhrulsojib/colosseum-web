import React from 'react';
import { LogOut } from 'lucide-react';

interface ProfileProps {
    onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold mb-8">User Profile</h1>
            <p className="text-gray-400 mb-8">Stats go here...</p>
            
            <button
                onClick={onLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20 transition-all border border-red-500/50"
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Profile;
