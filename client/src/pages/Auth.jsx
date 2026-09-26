import React, { useState, useEffect } from 'react';
import {
    Mail, Lock, User, ArrowRight, Github,
    Chrome, Sparkles, Shield, Zap, Brain, Rocket,
    ChevronRight, Eye, EyeOff, Database, Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import axios from 'axios';
import { API_URL } from '../config';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { login } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please provide email and password');
            return;
        }

        if (!isLogin && !name) {
            setError('Please provide a name');
            return;
        }

        try {
            setLoading(true);
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin 
                ? { email, password }
                : { name, email, password, role };

            const response = await axios.post(`${API_URL}${endpoint}`, payload);
            
            if (response.data.success) {
                login(response.data.user, response.data.token);
            } else {
                setError(response.data.error || 'Authentication failed');
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError(err.response?.data?.error || err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg-base)] font-inter flex items-center justify-center p-6 relative overflow-hidden">
            {/* Neural Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/40 rounded-full blur-[1px]"
                        animate={{
                            x: [Math.random() * dimensions.width, Math.random() * dimensions.width],
                            y: [Math.random() * dimensions.height, Math.random() * dimensions.height],
                            opacity: [0.1, 0.6, 0.1]
                        }}
                        transition={{
                            duration: Math.random() * 15 + 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 glass-panel !rounded-[3rem] overflow-hidden relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.1)]"
            >
                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-between p-20 relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border-r border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />

                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <div className="relative w-56 h-56 flex items-center justify-center mb-12">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-[3px] border-dashed border-primary/40 rounded-full"
                            />
                            <motion.div 
                                animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border-2 border-secondary/30 rounded-full"
                            />
                            <div className="relative w-28 h-28 bg-primary/20 backdrop-blur-2xl rounded-full flex items-center justify-center border border-primary/50 shadow-[0_0_40px_rgba(108,99,255,0.4)]">
                                <Fingerprint size={56} className="text-primary absolute opacity-20" />
                                <Brain size={48} className="text-primary z-10" />
                            </div>
                            {/* Scanning line */}
                            <motion.div 
                                animate={{ y: [-110, 110, -110] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 blur-[2px] z-20"
                            />
                        </div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-center leading-[0.9] text-[var(--color-text-main)] mb-6">
                            EduGenie <br /> <span className="text-primary italic text-6xl">AI OS</span>
                        </h2>
                        <p className="text-center text-[var(--color-text-dim)] font-bold max-w-sm">
                            Synchronize your cognitive potential with the global intelligence mesh.
                        </p>
                        
                        <div className="mt-16 w-full flex justify-center gap-6">
                            {[
                                { icon: Shield, text: 'Neural Auth' },
                                { icon: Database, text: 'Vector Core' },
                                { icon: Sparkles, text: 'AI Native' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl glass-panel !p-0 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-lg border border-primary/20">
                                        <item.icon size={20} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-text-dim)] group-hover:text-primary transition-colors">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-12 lg:p-20 flex flex-col justify-center bg-[var(--color-bg-base)]/80 backdrop-blur-md relative">
                    <div className="mb-12 text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 glass-panel !rounded-full !border-primary/20 mb-6 shadow-[0_0_15px_rgba(108,99,255,0.15)]">
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                                System Online
                            </span>
                        </div>
                        <h1 className="text-4xl font-black text-[var(--color-text-main)] uppercase tracking-tighter mb-3">
                            {isLogin ? 'Initialize' : 'Register'} <span className="text-primary">Session</span>
                        </h1>
                        <p className="text-[var(--color-text-dim)] font-bold text-sm">
                            {isLogin ? "Authenticate to access your neural workspace." : "Join the next generation of academic intelligence."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {error && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl p-4 text-xs font-black uppercase tracking-wider text-center backdrop-blur-md">
                                {error}
                            </div>
                        )}
                        {!isLogin && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-dim)] pl-4">Cognitive Alias</label>
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] group-focus-within:text-primary transition-colors" size={20} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your Name"
                                            className="w-full h-14 pl-14 pr-6 rounded-2xl glass-panel !bg-[var(--color-bg-subtle)]/50 focus:!bg-[var(--color-bg-base)] focus:!border-primary/50 focus:ring-4 focus:ring-primary/10 text-sm font-bold text-[var(--color-text-main)] placeholder:text-[var(--color-text-dim)] transition-all outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-dim)] pl-4">Core Role</label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setRole('student')}
                                            className={`flex-1 h-12 rounded-xl border flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all ${role === 'student' ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(108,99,255,0.2)]' : 'border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-text-dim)]'}`}
                                        >
                                            Student
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole('teacher')}
                                            className={`flex-1 h-12 rounded-xl border flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all ${role === 'teacher' ? 'border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(108,99,255,0.2)]' : 'border-[var(--color-border)] text-[var(--color-text-dim)] hover:border-[var(--color-text-dim)]'}`}
                                        >
                                            Teacher
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-dim)] pl-4">Neural Auth ID</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@address.com"
                                    className="w-full h-14 pl-14 pr-6 rounded-2xl glass-panel !bg-[var(--color-bg-subtle)]/50 focus:!bg-[var(--color-bg-base)] focus:!border-primary/50 focus:ring-4 focus:ring-primary/10 text-sm font-bold text-[var(--color-text-main)] placeholder:text-[var(--color-text-dim)] transition-all outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center pr-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-dim)] pl-4">Access Protocol</label>
                                {isLogin && <button type="button" className="text-[9px] font-black uppercase text-primary hover:underline hover:text-accent transition-colors">Reset Sync</button>}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full h-14 pl-14 pr-12 rounded-2xl glass-panel !bg-[var(--color-bg-subtle)]/50 focus:!bg-[var(--color-bg-base)] focus:!border-primary/50 focus:ring-4 focus:ring-primary/10 text-sm font-bold text-[var(--color-text-main)] placeholder:text-[var(--color-text-dim)] transition-all outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--color-text-dim)] hover:text-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-premium w-full text-center mt-4 py-5 text-xs flex items-center justify-center gap-3 group disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : (isLogin ? 'Initiate Link' : 'Generate Core')}
                            {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-10 space-y-8 relative z-10">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--color-border)]" /></div>
                            <div className="relative flex justify-center"><span className="bg-[var(--color-bg-base)] px-4 text-[9px] font-black text-[var(--color-text-dim)] uppercase tracking-widest italic">External Mesh</span></div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 h-14 glass-panel !bg-[var(--color-bg-subtle)]/50 !rounded-xl flex items-center justify-center gap-3 hover:border-primary/30 hover:bg-[var(--color-bg-base)] hover:text-primary transition-all group">
                                <Chrome size={18} className="text-[var(--color-text-dim)] group-hover:text-primary group-hover:scale-110 transition-all" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)] group-hover:text-primary transition-colors">Google</span>
                            </button>
                            <button className="flex-1 h-14 glass-panel !bg-[var(--color-bg-subtle)]/50 !rounded-xl flex items-center justify-center gap-3 hover:border-primary/30 hover:bg-[var(--color-bg-base)] hover:text-primary transition-all group">
                                <Github size={18} className="text-[var(--color-text-dim)] group-hover:text-primary group-hover:scale-110 transition-all" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)] group-hover:text-primary transition-colors">Github</span>
                            </button>
                        </div>

                        <p className="text-center text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">
                            {isLogin ? "New to the mesh?" : "Already synchronized?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary hover:text-accent hover:underline ml-1 transition-colors"
                            >
                                {isLogin ? 'Register Node' : 'Initialize Link'}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Auth;
