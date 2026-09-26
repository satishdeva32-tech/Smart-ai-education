import React, { useState, useRef, useEffect } from 'react';
import {
    Home, BookOpen, Brain, BarChart2, User, LogOut, Menu, X, Bell,
    Search, Settings, FlaskConical, Maximize2, Minimize2, ChevronDown,
    Clock, Sparkles, Target, Edit3
} from 'lucide-react';
import AIAssistant from './components/AIAssistant';
import useAuthStore from './store/useAuthStore';
import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = ({ children, activePage, setActivePage }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const { logout, user } = useAuthStore();
    const { theme, setTheme } = useTheme();
    const [searchPlaceholder, setSearchPlaceholder] = useState('Ask EduGenie anything...');

    useEffect(() => {
        const placeholders = [
            'Ask EduGenie anything...',
            'Explain Binary Trees',
            'Generate Notes',
            'Teach Calculus',
            'Summarize this PDF',
            'Create Practice Quiz'
        ];
        let idx = 0;
        const interval = setInterval(() => {
            idx = (idx + 1) % placeholders.length;
            setSearchPlaceholder(placeholders[idx]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const menuItems = [
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'courses', icon: BookOpen, label: 'My Courses' },
        { id: 'mentors', icon: Brain, label: 'AI Mentors' },
        { id: 'lab', icon: FlaskConical, label: 'Practice Lab' },
        { id: 'performance', icon: BarChart2, label: 'Performance' },
        { id: 'roadmap', icon: Target, label: 'Learning Roadmap' },
        { id: 'profile', icon: User, label: 'My Profile' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-base)] flex text-[var(--color-text-main)] font-sans">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-80 bg-white/70 backdrop-blur-2xl border-r border-slate-100/50
                transition-all duration-500 ease-in-out lg:translate-x-0 lg:static
                ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'}
            `}>
                <div className="h-full flex flex-col p-8">
                    <div className="flex items-center gap-4 mb-12 px-2 group cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.7 }}
                            className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/25"
                        >
                            <Brain size={28} strokeWidth={2.5} />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">EduGenie</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-1">Academix OS</span>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = activePage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActivePage(item.id);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`
                                        w-full group relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300
                                        ${isActive
                                            ? 'bg-white text-primary shadow-[0_20px_40px_-12px_rgba(108,99,255,0.12)] ring-1 ring-primary/5'
                                            : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}
                                    `}
                                >
                                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="transition-transform group-hover:scale-110" />
                                    <span className={`text-sm font-bold tracking-tight ${isActive ? 'text-slate-900' : ''}`}>{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute left-0 w-1.5 h-6 bg-primary rounded-r-full"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="pt-8 space-y-6">
                        <div className="glass-panel !p-6 flex flex-col items-center gap-4 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative">
                                <motion.div 
                                    animate={{ rotate: 360 }} 
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-secondary opacity-70 blur-sm"
                                />
                                <div className="relative w-16 h-16 rounded-full bg-white overflow-hidden border-2 border-white flex items-center justify-center text-slate-400 z-10 shadow-xl">
                                    {user?.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <User size={28} className="text-primary" />}
                                </div>
                            </div>
                            
                            <div className="text-center w-full z-10">
                                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-2 border border-white/20 shadow-sm">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">Level 12</p>
                                </div>
                                <p className="text-sm font-black truncate text-[var(--color-text-main)]">{user?.name || 'Deva'}</p>
                                
                                <div className="mt-4 space-y-1.5">
                                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)]">
                                        <span>580 / 700 XP</span>
                                        <span className="text-primary">Next Level</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden border border-[var(--color-border)] shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '82%' }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-primary to-secondary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[1.5rem] text-rose-500 font-black hover:bg-rose-500/10 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] border border-transparent hover:border-rose-500/20 transition-all uppercase text-[10px] tracking-[0.2em] group"
                        >
                            <LogOut size={16} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
                            Disconnect Session
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Nav */}
                <header className="h-24 bg-white/50 backdrop-blur-xl border-b border-slate-100/50 flex items-center justify-between px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-8 flex-1">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-3 hover:bg-slate-100 rounded-2xl text-slate-500 transition-colors"
                        >
                            <Menu size={22} />
                        </motion.button>

                        <div className="hidden md:flex items-center gap-4 px-6 h-14 glass-panel !rounded-[1.5rem] w-full max-w-xl group focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.02)]">
                            <motion.div 
                                animate={ { scale: [1, 1.2, 1] } } 
                                transition={ { repeat: Infinity, duration: 2, ease: "easeInOut" } }
                                className="text-primary"
                            >
                                <Sparkles size={18} />
                            </motion.div>
                            <AnimatePresence mode="wait">
                                <motion.input
                                    key={searchPlaceholder}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    className="bg-transparent border-none text-sm font-bold w-full focus:outline-none text-[var(--color-text-main)] placeholder:text-[var(--color-text-dim)]"
                                />
                            </AnimatePresence>
                            <div className="flex items-center gap-1 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-[9px] font-black text-[var(--color-text-dim)] group-hover:border-primary/30 group-hover:text-primary group-hover:shadow-[0_0_10px_rgba(108,99,255,0.2)] transition-all cursor-pointer">
                                CMD K
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden xl:flex items-center gap-6 pr-6 border-r border-slate-100">
                            <div className="flex flex-col items-end">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Load</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '42%' }}
                                            className="h-full bg-primary"
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-900">42%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative group/theme">
                                <button className="p-3 text-[var(--color-text-dim)] hover:text-primary hover:bg-primary/5 rounded-2xl transition-all relative">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse-soft"></div>
                                </button>
                                <div className="absolute right-0 top-full mt-2 w-48 glass-panel !p-2 opacity-0 invisible group-hover/theme:opacity-100 group-hover/theme:visible transition-all duration-300 z-50">
                                    <div className="text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-widest px-3 py-2">Select OS Theme</div>
                                    <div className="space-y-1">
                                        {['light', 'cyber-neon', 'purple-ai', 'dark-matrix', 'sunset', 'hacker'].map(t => (
                                            <button 
                                                key={t}
                                                onClick={() => setTheme(t)}
                                                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${theme === t ? 'bg-primary/10 text-primary' : 'text-[var(--color-text-dim)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-main)]'} uppercase tracking-wider`}
                                            >
                                                {t.replace('-', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <button className="p-3 text-[var(--color-text-dim)] hover:text-primary hover:bg-primary/5 rounded-2xl transition-all relative group">
                                <Bell size={22} />
                                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[var(--color-bg-base)] group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(108,99,255,0.6)]"></span>
                            </button>
                            <button onClick={toggleFullscreen} className="p-3 text-[var(--color-text-dim)] hover:text-primary hover:bg-primary/5 rounded-2xl transition-all">
                                {isFullscreen ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
                            </button>
                        </div>

                        <div className="relative">
                            <div
                                className="flex items-center gap-4 pl-4 group cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-colors"
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-indigo-500 to-secondary p-[2px] shadow-lg shadow-primary/20">
                                        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
                                            {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <User size={24} className="text-primary" />}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-white rounded-full"></div>
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-sm font-black text-slate-900 leading-none mb-1">{user?.name || 'Neural Architect'}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Lvl 12 (85%)</span>
                                    </div>
                                </div>
                                <ChevronDown size={16} className={`text-slate-300 group-hover:text-primary transition-transform duration-300 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                            </div>

                            <AnimatePresence>
                                {isProfileMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-4 w-60 bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-50 p-2"
                                    >
                                        <div className="p-4 border-b border-slate-100/50 mb-2">
                                            <p className="text-sm font-black text-slate-900 truncate">{user?.name || 'Student'}</p>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 truncate">{user?.email}</p>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <button onClick={() => { setActivePage('profile'); setIsProfileMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:text-primary transition-all">
                                                <User size={16} /> View Profile
                                            </button>
                                            <button onClick={() => { setActivePage('profile'); setIsProfileMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:text-primary transition-all">
                                                <Edit3 size={16} /> Edit Profile
                                            </button>
                                            <button onClick={() => { setActivePage('settings'); setIsProfileMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:text-primary transition-all">
                                                <Settings size={16} /> Settings
                                            </button>
                                            <div className="h-px w-full bg-slate-100/50 my-1"></div>
                                            <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-rose-50 rounded-2xl text-xs font-black uppercase tracking-widest text-rose-500 transition-all">
                                                <LogOut size={16} /> Disconnect
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto bg-[var(--color-bg-subtle)] p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            <AIAssistant />
        </div>
    );
};

export default MainLayout;
