import React from 'react';
import { Outlet } from 'react-router-dom';
import DockNavigation from '../components/DockNavigation';

interface MainLayoutProps {
    isAuthenticated: boolean;
    setToken: (token: string | null) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ isAuthenticated, setToken }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans relative">
            <Outlet context={{ isAuthenticated }} />
            <DockNavigation
                isAuthenticated={isAuthenticated}
                setToken={setToken}
            />
        </div>
    );
};

export default MainLayout;
