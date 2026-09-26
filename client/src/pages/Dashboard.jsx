import React from 'react';
import {
    TrendingUp, CheckCircle, Clock, Sparkles, ChevronRight, Users,
    Trophy, Brain, Fingerprint, Activity, Star, Zap, ArrowUpRight,
    Search, Layout, User, BookOpen, Code, Target, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const AIOrb = () => (
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center mx-auto lg:mx-0 shrink-0">
        <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-accent to-secondary opacity-30 blur-2xl"
        />
        <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 rounded-full border border-primary/30"
        />
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_50px_rgba(108,99,255,0.6)] flex items-center justify-center backdrop-blur-3xl overflow-hidden border border-white/20"
        >
            <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
            <Brain size={48} className="text-white relative z-10 drop-shadow-md" />
        </motion.div>
    </div>
);

const CircularProgress = ({ progress, color }) => {
    const circumference = 2 * Math.PI * 24; // r=24
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="transform -rotate-90 w-16 h-16">
                <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-[var(--color-border)]" />
                <circle
                    cx="32" cy="32" r="24"
                    stroke="currentColor" strokeWidth="4" fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className={`transition-all duration-1000 ease-out ${color}`}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute text-[10px] font-black text-[var(--color-text-main)]">{progress}%</span>
        </div>
    );
};


const Dashboard = ({ setActivePage }) => {
    const { user } = useAuthStore();
    const [profileData, setProfileData] = React.useState(null);
    const [isViewingMatrix, setIsViewingMatrix] = React.useState(false);
    const [acceptingVector, setAcceptingVector] = React.useState(false);
    const [activeModuleAction, setActiveModuleAction] = React.useState(null);

    const handleViewMatrix = () => {
        setIsViewingMatrix(true);
        setTimeout(() => setIsViewingMatrix(false), 2000);
    };
    
    const handleAcceptVector = () => {
        setAcceptingVector(true);
        setTimeout(() => {
            setAcceptingVector(false);
            setActivePage('courses');
        }, 1500);
    };

    const handleModuleAction = (index) => {
        if (roadmap[index].progress === 0) return;
        setActiveModuleAction(index);
        setTimeout(() => {
            setActiveModuleAction(null);
            setActivePage('courses');
        }, 1500);
    };

    React.useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await axios.get('/api/user/profile', { withCredentials: true });
                if (res.data?.success) {
                    setProfileData({ ...res.data.data.user, ...res.data.data.studentProfile });
                }
            } catch (err) {
                console.error("Failed to fetch profile on dashboard");
            }
        };
        fetchProfileData();
    }, []);

    const stats = [
        { label: 'Course Progress', value: '78%', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10 border-primary/20', detail: '+5% this week' },
        { label: 'Tasks Completed', value: '24/30', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10 border-success/20', detail: '2 left today' },
        { label: 'Study Time', value: '12.5h', icon: Clock, color: 'text-secondary', bg: 'bg-secondary/10 border-secondary/20', detail: 'On track' },
        { label: 'Active Mentors', value: '3', icon: Users, color: 'text-accent', bg: 'bg-accent/10 border-accent/20', detail: 'Online now' },
    ];

    const roadmap = [
        { title: 'React Architecture', progress: 100, time: 'Completed', difficulty: 'Intermediate', icon: Layout },
        { title: 'Advanced State Systems', progress: 65, time: '2h left', difficulty: 'Advanced', icon: Zap },
        { title: 'Neural Vector Mapping', progress: 0, time: 'Locked', difficulty: 'Expert', icon: Brain },
    ];

    const weeklyData = [
        { day: 'Mon', score: 60 },
        { day: 'Tue', score: 85 },
        { day: 'Wed', score: 45 },
        { day: 'Thu', score: 95 },
        { day: 'Fri', score: 70 },
        { day: 'Sat', score: 40 },
        { day: 'Sun', score: 90 },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12 max-w-7xl mx-auto px-4 py-8 font-inter pb-20 relative"
        >
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-1/3 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/2 left-0 w-1/4 h-64 bg-accent/10 blur-[100px] rounded-full -translate-x-1/2 pointer-events-none" />

            {/* Hero Section */}
            <section className="flex flex-col lg:flex-row items-center justify-between gap-12 py-10 relative overflow-hidden z-10 glass-panel !rounded-[3rem] p-8 lg:p-12 mb-12 shadow-[0_0_40px_rgba(0,0,0,0.05)] border-[var(--color-border)]">
                <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-10 text-center lg:text-left w-full">
                    <AIOrb />
                    
                    <div className="space-y-6 pt-4 w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-bg-base)] border border-[var(--color-border)] text-primary text-[10px] font-black uppercase tracking-widest shadow-sm"
                        >
                            <Sparkles size={14} className="animate-pulse" /> EduGenie AI
                        </motion.div>

                        <div className="space-y-2">
                            <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text-main)] tracking-tighter">
                                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, <br />
                                <span className="text-gradient-ai">{profileData?.name?.split(' ')[0] || user?.name?.split(' ')[0] || 'Student'}</span>.
                            </h1>
                            <p className="text-[var(--color-text-dim)] font-bold text-lg">Today you will:</p>
                        </div>

                        <motion.ul 
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.15 }
                                }
                            }}
                            className="space-y-3 text-left inline-block w-full max-w-sm"
                        >
                            {[
                                { icon: BookOpen, text: "Complete 3 lessons" },
                                { icon: Code, text: "Finish 2 coding challenges" },
                                { icon: Target, text: "Increase your Neural Score by 7%" }
                            ].map((item, i) => (
                                <motion.li 
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, x: -10 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex items-center gap-4 text-[var(--color-text-main)] font-semibold bg-[var(--color-bg-base)]/50 p-3 rounded-2xl border border-[var(--color-border)] shadow-sm backdrop-blur-md"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center text-primary">
                                        <item.icon size={14} />
                                    </div>
                                    <span className="text-sm">{item.text}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
                            <button
                                onClick={() => setActivePage('courses')}
                                className="btn-premium py-3 px-8 text-xs flex items-center gap-3 group shadow-lg shadow-primary/20"
                            >
                                Initiate Sequence <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-xs glass-panel !bg-[var(--color-bg-base)]/80 p-8 flex flex-col items-center text-center relative group hidden lg:flex mt-8 lg:mt-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
                    <div className="w-24 h-24 rounded-[2rem] overflow-hidden bg-[var(--color-bg-subtle)] border border-[var(--color-border)] shadow-inner mb-6 relative group-hover:scale-105 transition-all duration-500">
                        {profileData?.profilePicture ? (
                            <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User size={40} className="text-[var(--color-text-dim)] absolute inset-0 m-auto" />
                        )}
                    </div>
                    <h2 className="text-lg font-black text-[var(--color-text-main)] tracking-tighter uppercase">{profileData?.name || user?.name || 'Student'}</h2>
                    <p className="text-[10px] font-black text-[var(--color-text-dim)] mt-1 uppercase tracking-widest">{profileData?.email || user?.email}</p>
                    <div className="w-full h-px bg-[var(--color-border)] my-6"></div>
                    <div className="flex justify-between w-full text-left gap-4">
                        <div className="bg-[var(--color-bg-subtle)] p-3 rounded-xl flex-1 border border-[var(--color-border)]">
                            <p className="text-[8px] font-black text-[var(--color-text-dim)] uppercase tracking-widest mb-1">Neural Score</p>
                            <p className="text-lg font-black text-primary">8,240</p>
                        </div>
                        <div className="bg-[var(--color-bg-subtle)] p-3 rounded-xl flex-1 border border-[var(--color-border)] text-right">
                            <p className="text-[8px] font-black text-[var(--color-text-dim)] uppercase tracking-widest mb-1">Global Rank</p>
                            <p className="text-lg font-black text-secondary">#42</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Draggable Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                        whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
                        className="glass-panel !rounded-[2.5rem] p-6 group cursor-grab hover:border-primary/30 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-4 rounded-[1.5rem] ${stat.bg} ${stat.color} border shadow-sm ring-1 ring-current/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                <stat.icon size={24} strokeWidth={2.5} />
                            </div>
                            <span className="text-[9px] font-black text-[var(--color-text-main)] uppercase tracking-widest bg-[var(--color-bg-subtle)] px-2 py-1 rounded-md border border-[var(--color-border)]">{stat.detail}</span>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-[var(--color-text-main)] tracking-tighter leading-none">{stat.value}</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-dim)] pt-2">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                {/* Learning Roadmap */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black text-[var(--color-text-main)] uppercase tracking-tighter">Active Roadmap</h2>
                            <p className="text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Your synchronized learning nodes</p>
                        </div>
                        <button
                            onClick={() => setActivePage('courses')}
                            className="h-10 px-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 shadow-sm group"
                        >
                            Catalog <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {roadmap.map((module, i) => (
                            <motion.div
                                key={i}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.05}
                                whileDrag={{ scale: 1.02, zIndex: 10, cursor: 'grabbing' }}
                                className="glass-panel !rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-6 group cursor-grab hover:border-primary/20 transition-colors"
                            >
                                <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--color-bg-subtle)] border border-[var(--color-border)] shadow-sm flex items-center justify-center text-[var(--color-text-dim)] group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500">
                                    <module.icon size={28} strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                                    <div className="flex flex-col sm:flex-row items-center gap-3">
                                        <h3 className="text-xl font-black text-[var(--color-text-main)] uppercase tracking-tight">{module.title}</h3>
                                        <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${module.difficulty === 'Intermediate' ? 'bg-primary/10 text-primary border-primary/20' :
                                            module.difficulty === 'Advanced' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                                                'bg-[var(--color-text-main)] text-[var(--color-bg-base)] border-transparent'
                                            }`}>
                                            {module.difficulty}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-[0.1em]">
                                        <span className="flex items-center gap-1.5"><Clock size={14} /> {module.time}</span>
                                        <span className="flex items-center gap-1.5 text-primary"><Star size={14} fill="currentColor" /> 120 XP Core</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <CircularProgress progress={module.progress} color={module.progress === 100 ? 'text-success' : 'text-primary'} />
                                    <button 
                                        onClick={() => handleModuleAction(i)}
                                        disabled={module.progress === 0 || activeModuleAction === i}
                                        className={`
                                        w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm group-hover:shadow-md
                                        ${module.progress === 100
                                            ? 'bg-success/10 text-success border border-success/20 hover:bg-success hover:text-white'
                                            : module.progress > 0
                                                ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white'
                                                : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-dim)] cursor-not-allowed border border-[var(--color-border)]'}
                                    `}>
                                        {activeModuleAction === i ? (
                                            <Activity size={18} className="animate-spin"/>
                                        ) : (
                                            <ChevronRight size={20} strokeWidth={3} />
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* AI Insights & Gamification */}
                <div className="space-y-6">
                    {/* Glowing AI Insight Card */}
                    <motion.div 
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.1}
                        whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
                        className="glass-panel !rounded-[2.5rem] !bg-gradient-to-br from-[var(--color-bg-base)] to-primary/5 border border-primary/20 relative overflow-hidden group p-8 cursor-grab"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none">
                            <Brain size={120} className="text-primary" strokeWidth={1} />
                        </div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 ring-1 ring-primary/30">
                                <Activity size={20} className="text-primary animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-[var(--color-text-main)] uppercase tracking-tight">Edu AI Insight</h3>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-primary mt-1">Live Analysis</p>
                            </div>
                        </div>
                        <p className="text-[var(--color-text-dim)] text-sm font-semibold leading-relaxed mb-8 relative z-10 italic border-l-2 border-primary/30 pl-4">
                            "Optimal learning pulse detected. Elevate <span className="text-[var(--color-text-main)] font-black">State Architecture</span> mastery via SSR patterns."
                        </p>
                        <button 
                            onClick={handleAcceptVector}
                            disabled={acceptingVector}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-text-main)] text-[var(--color-bg-base)] rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                        >
                            {acceptingVector ? <Activity size={16} className="animate-spin" /> : <Sparkles size={16} />}
                            {acceptingVector ? 'Integrating...' : 'Accept Vector'}
                        </button>
                    </motion.div>

                    {/* Gamification */}
                    <div className="glass-panel !rounded-[2.5rem] p-8 group relative overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black flex items-center gap-3 uppercase tracking-tighter text-[var(--color-text-main)]">
                                <div className="p-2 bg-accent/10 rounded-lg text-accent ring-1 ring-accent/20">
                                    <Trophy size={16} />
                                </div>
                                Neural Rank
                            </h3>
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-500/20">Top 5%</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--color-bg-subtle)] flex items-center justify-center text-accent shadow-inner border border-[var(--color-border)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                                <Zap size={32} strokeWidth={2.5} fill="currentColor" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-2xl font-black text-[var(--color-text-main)] uppercase tracking-tighter leading-none">Master</p>
                                <p className="text-[9px] font-black text-[var(--color-text-dim)] uppercase tracking-widest mt-1">Level 12 • 4,500 XP Legacy</p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-6 mt-6 border-t border-[var(--color-border)]">
                            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                                <span className="text-[var(--color-text-dim)]">Node Sync</span>
                                <span className="text-primary">85%</span>
                            </div>
                            <div className="h-2 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden border border-[var(--color-border)]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    transition={{ duration: 2 }}
                                    className="h-full bg-gradient-to-r from-primary to-accent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Weekly Performance with Recharts */}
            <div className="glass-panel !rounded-[3rem] p-8 lg:p-12 mt-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/5 blur-[120px] rounded-full translate-x-1/4 -z-10 pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 rounded-full text-[9px] font-black text-secondary uppercase tracking-widest border border-secondary/20">
                            <Activity size={12} className="animate-pulse" /> Neural Audit Mode
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-black text-[var(--color-text-main)] uppercase tracking-tighter leading-none">
                            Cognitive Activity
                        </h3>
                    </div>
                    <div className="px-4 py-2 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-xl text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)] shadow-sm">
                        Past 7 Micro-Cycles Sync
                    </div>
                </div>

                <div className="h-[300px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
                                    <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fontWeight: 800, fill: 'var(--color-text-dim)', dy: 10 }}
                                interval={0}
                            />
                            <YAxis hide />
                            <Tooltip
                                cursor={{ fill: 'var(--color-bg-subtle)', radius: 12, opacity: 0.5 }}
                                contentStyle={{
                                    borderRadius: '16px',
                                    border: '1px solid var(--color-border)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                    padding: '16px',
                                    background: 'var(--color-bg-base)',
                                }}
                                itemStyle={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-text-main)' }}
                                labelStyle={{ display: 'none' }}
                            />
                            <Bar
                                dataKey="score"
                                radius={[12, 12, 4, 4]}
                                barSize={40}
                            >
                                {weeklyData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.score > 80 ? 'url(#barGradient)' : 'var(--color-border)'}
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>
    );
};

export default Dashboard;

