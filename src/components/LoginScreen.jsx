import React, { useState, useEffect } from 'react';
import { User, XCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dinosaur = ({ delay = 0, size = 'medium', startSide = 'left', type = 'trex' }) => {
    const [position, setPosition] = useState({
        x: startSide === 'left' ? -150 : typeof window !== 'undefined' ? window.innerWidth + 150 : 1000,
        y: Math.random() * 300 + 150
    });

    const sizeClasses = {
        small: 'w-16 h-16',
        medium: 'w-24 h-24',
        large: 'w-32 h-32'
    };

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setPosition(prev => {
                const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
                const speed = type === 'pterodactyl' ? 1.2 : 0.8;
                const newX = startSide === 'left'
                    ? (prev.x > screenWidth + 150 ? -150 : prev.x + speed)
                    : (prev.x < -150 ? screenWidth + 150 : prev.x - speed);

                const bobAmount = type === 'pterodactyl' ? 1.5 : 0.5;
                const newY = prev.y + Math.sin(Date.now() / 1500 + delay) * bobAmount;
                return { x: newX, y: newY };
            });
        }, 50);

        return () => clearInterval(moveInterval);
    }, [delay, startSide, type]);

    const renderTRex = () => (
        <svg viewBox="0 0 120 100" className="w-full h-full">
            <defs>
                <linearGradient id={`trexGrad${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="50%" stopColor="#16a34a" />
                    <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
            </defs>
            {/* Body */}
            <ellipse cx="60" cy="60" rx="25" ry="18" fill={`url(#trexGrad${delay})`} />
            {/* Head */}
            <ellipse cx="85" cy="45" rx="18" ry="15" fill={`url(#trexGrad${delay})`} />
            {/* Snout */}
            <ellipse cx="100" cy="48" rx="12" ry="8" fill={`url(#trexGrad${delay})`} />
            {/* Eyes */}
            <circle cx="90" cy="40" r="3" fill="#fbbf24" className="animate-pulse" />
            <circle cx="88" cy="38" r="1.5" fill="#000" />
            {/* Teeth */}
            <polygon points="95,44 97,48 99,44" fill="white" />
            <polygon points="101,46 103,50 105,46" fill="white" />
            {/* Arms */}
            <ellipse cx="55" cy="55" rx="8" ry="4" fill={`url(#trexGrad${delay})`} />
            <ellipse cx="65" cy="55" rx="8" ry="4" fill={`url(#trexGrad${delay})`} />
            {/* Legs */}
            <ellipse cx="50" cy="75" rx="6" ry="12" fill={`url(#trexGrad${delay})`} />
            <ellipse cx="70" cy="75" rx="6" ry="12" fill={`url(#trexGrad${delay})`} />
            {/* Tail */}
            <path d="M35,65 Q20,60 10,55" stroke={`url(#trexGrad${delay})`} strokeWidth="8" fill="none" />
            {/* Spots */}
            <circle cx="65" cy="55" r="2" fill="#047857" opacity="0.7" />
            <circle cx="75" cy="50" r="1.5" fill="#047857" opacity="0.7" />
        </svg>
    );

    const renderPterodactyl = () => (
        <svg viewBox="0 0 140 80" className="w-full h-full">
            <defs>
                <linearGradient id={`pteroGrad${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
            </defs>
            {/* Wings */}
            <path d="M30,40 Q10,20 5,25 Q15,35 30,45 Z" fill={`url(#pteroGrad${delay})`} opacity="0.8" />
            <path d="M110,40 Q130,20 135,25 Q125,35 110,45 Z" fill={`url(#pteroGrad${delay})`} opacity="0.8" />
            {/* Body */}
            <ellipse cx="70" cy="45" rx="20" ry="8" fill={`url(#pteroGrad${delay})`} />
            {/* Head */}
            <ellipse cx="95" cy="42" rx="12" ry="10" fill={`url(#pteroGrad${delay})`} />
            {/* Beak */}
            <path d="M105,42 L115,40 L105,46 Z" fill="#fbbf24" />
            {/* Eye */}
            <circle cx="100" cy="38" r="2.5" fill="#fbbf24" className="animate-pulse" />
            <circle cx="99" cy="37" r="1" fill="#000" />
            {/* Crest */}
            <path d="M95,32 Q100,25 105,32" fill={`url(#pteroGrad${delay})`} />
            {/* Tail */}
            <path d="M50,45 Q30,48 25,50" stroke={`url(#pteroGrad${delay})`} strokeWidth="4" fill="none" />
        </svg>
    );

    const renderStegosaurus = () => (
        <svg viewBox="0 0 130 90" className="w-full h-full">
            <defs>
                <linearGradient id={`stegoGrad${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
            </defs>
            {/* Body */}
            <ellipse cx="65" cy="65" rx="30" ry="12" fill={`url(#stegoGrad${delay})`} />
            {/* Head */}
            <ellipse cx="105" cy="60" rx="12" ry="10" fill={`url(#stegoGrad${delay})`} />
            {/* Eye */}
            <circle cx="110" cy="55" r="2" fill="#fbbf24" className="animate-pulse" />
            <circle cx="109" cy="54" r="1" fill="#000" />
            {/* Back plates */}
            <polygon points="45,50 50,35 55,50" fill="#dc2626" />
            <polygon points="55,50 60,30 65,50" fill="#dc2626" />
            <polygon points="65,50 70,32 75,50" fill="#dc2626" />
            <polygon points="75,50 80,35 85,50" fill="#dc2626" />
            {/* Legs */}
            <ellipse cx="50" cy="75" rx="4" ry="8" fill={`url(#stegoGrad${delay})`} />
            <ellipse cx="60" cy="75" rx="4" ry="8" fill={`url(#stegoGrad${delay})`} />
            <ellipse cx="70" cy="75" rx="4" ry="8" fill={`url(#stegoGrad${delay})`} />
            <ellipse cx="80" cy="75" rx="4" ry="8" fill={`url(#stegoGrad${delay})`} />
            {/* Tail with spikes */}
            <path d="M35,65 Q20,68 15,70" stroke={`url(#stegoGrad${delay})`} strokeWidth="8" fill="none" />
            <polygon points="18,65 15,60 12,65" fill="#dc2626" />
            <polygon points="22,68 19,63 16,68" fill="#dc2626" />
        </svg>
    );

    const dinoTypes = {
        trex: renderTRex(),
        pterodactyl: renderPterodactyl(),
        stegosaurus: renderStegosaurus()
    };

    return (
        <div
            className={`absolute transition-all duration-100 ease-linear ${sizeClasses[size]} z-10 drop-shadow-lg`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `scale(${1 + Math.sin(Date.now() / 2000 + delay) * 0.05}) ${startSide === 'right' ? 'scaleX(-1)' : ''}`,
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
            }}
        >
            {dinoTypes[type]}
        </div>
    );
};

const JungleParticle = ({ delay = 0 }) => {
    const [position, setPosition] = useState({
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
        y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800
    });

    useEffect(() => {
        const floatInterval = setInterval(() => {
            setPosition(prev => {
                const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
                const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
                const newY = prev.y < -20 ? screenHeight + 20 : prev.y - 0.8;
                const newX = prev.x + Math.sin(Date.now() / 3000 + delay) * 0.5;
                return { x: Math.max(0, Math.min(screenWidth, newX)), y: newY };
            });
        }, 100);

        return () => clearInterval(floatInterval);
    }, [delay]);

    return (
        <div
            className="absolute w-2 h-2 bg-green-300 rounded-full opacity-40 animate-pulse"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        />
    );
};

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(username, password);

        if (!result.success) {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0 animate-pulse"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                />
            </div>

            {/* Floating Dinosaurs */}
            <Dinosaur delay={0} size="large" startSide="left" type="trex" />
            <Dinosaur delay={1} size="medium" startSide="right" type="pterodactyl" />
            <Dinosaur delay={2} size="medium" startSide="left" type="stegosaurus" />
            <Dinosaur delay={3} size="small" startSide="right" type="trex" />
            <Dinosaur delay={4} size="large" startSide="left" type="pterodactyl" />
            <Dinosaur delay={5} size="medium" startSide="right" type="stegosaurus" />
            <Dinosaur delay={6} size="small" startSide="left" type="pterodactyl" />
            <Dinosaur delay={7} size="medium" startSide="right" type="trex" />

            {/* Jungle Particles */}
            {[...Array(15)].map((_, i) => (
                <JungleParticle key={i} delay={i * 0.5} />
            ))}

            {/* Animated Vines */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <svg className="absolute top-0 left-10 w-20 h-40 text-green-600 opacity-30" viewBox="0 0 20 40"
                     style={{ animation: 'sway 4s ease-in-out infinite' }}>
                    <path d="M10,0 Q15,10 10,20 Q5,30 10,40" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="8" r="2" fill="currentColor" />
                    <circle cx="8" cy="15" r="1.5" fill="currentColor" />
                    <circle cx="11" cy="25" r="2" fill="currentColor" />
                </svg>

                <svg className="absolute top-0 right-10 w-20 h-40 text-green-500 opacity-40" viewBox="0 0 20 40"
                     style={{ animation: 'sway-reverse 4s ease-in-out infinite' }}>
                    <path d="M10,0 Q5,10 10,20 Q15,30 10,40" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="8" cy="8" r="2" fill="currentColor" />
                    <circle cx="12" cy="15" r="1.5" fill="currentColor" />
                    <circle cx="9" cy="25" r="2" fill="currentColor" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full space-y-8">
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-emerald-200">
                        <div className="text-center mb-8">
                            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <RefreshCw className="h-10 w-10 text-white" style={{ animation: 'spin 3s linear infinite' }} />
                            </div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                                Avni - Camp Console
                            </h2>
                            <p className="mt-3 text-gray-600 font-medium">Enter the mystical jungle realm</p>
                        </div>

                        <div className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center shadow-sm">
                                    <XCircle className="h-5 w-5 mr-2" />
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 pl-12 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white bg-opacity-90"
                                        placeholder="Enter your username"
                                    />
                                    <User className="h-5 w-5 text-emerald-500 absolute left-4 top-3.5" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white bg-opacity-90"
                                    placeholder="Enter your password"
                                />
                            </div>

                            <form onSubmit={handleSubmit}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
                                >
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    ) : (
                                        'Enter the Jungle'
                                    )}
                                </button>
                            </form>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                🦕 Dinosaurs roam this ancient jungle
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes sway {
                    0%, 100% { transform: rotate(-5deg); }
                    50% { transform: rotate(5deg); }
                }
                @keyframes sway-reverse {
                    0%, 100% { transform: rotate(5deg); }
                    50% { transform: rotate(-5deg); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoginScreen;