import React from 'react';

const Login: React.FC = () => {
    const handleLogin = () => {
        window.location.href = '/api/v1/auth/login';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8">Login to Colosseum</h1>
            <button 
                onClick={handleLogin}
                className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold flex items-center gap-3 hover:bg-gray-100 transition-colors shadow-xl"
            >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Sign in with Google
            </button>
        </div>
    );
};

export default Login;
