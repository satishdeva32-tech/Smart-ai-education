import React from 'react';
import {
    Bot, Shield, Zap, Brain, MessageSquare, Terminal,
    Sparkles, Radio, Activity, Code, Cpu, Globe,
    ChevronRight, Fingerprint
} from 'lucide-react';
import { motion } from 'framer-motion';

const Agents = () => {
    const agents = [
        {
            id: 'master',
            name: 'Master Orchestrator',
            role: 'Primary Cognitive Engine',
            desc: 'The brain of EduGenie. Coordinates specialized agents for complex multi-step reasoning and academic deep-dives.',
            status: 'Optimal',
            icon: Brain,
            color: 'text-primary'
        },
        {
            id: 'qa',
            name: 'Vector Analyst',
            role: 'Data & Accuracy Node',
            desc: 'Ensures factual integrity and high-fidelity output. Specializes in technical accuracy and source verification.',
            status: 'Active',
            icon: Shield,
            color: 'text-success'
        },
        {
            id: 'creative',
            name: 'Synthesizer AI',
            role: 'Concept Innovation',
            desc: 'Specializes in creative analogies, simplifying complex topics, and generating novel project ideas.',
            status: 'Standby',
            icon: Zap,
            color: 'text-accent'
        }
    ];

    const logs = [
        { time: 'T-Minus 2s', agent: 'Orchestrator', action: 'Initializing multi-agent handshake', status: 'Success' },
        { time: 'T-Minus 1s', agent: 'Vector Hub', action: 'Querying academic knowledge graph', status: 'Syncing' },
        { time: 'Live', agent: 'Neural Link', action: 'Optimal learning path synthesized', status: 'Ready' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16 max-w-7xl mx-auto px-4 py-8 font-inter pb-20"
        >
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-[var(--color-border)] pb-16">
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[var(--color-bg-base)] border border-[var(--color-border)] shadow-premium-sm text-primary text-[10px] font-black uppercase tracking-[0.25em]"
                    >
                        <Radio size={14} className="animate-pulse" /> Neural Network Standby
                    </motion.div>
                    <h1 className="text-7xl font-black text-[var(--color-text-main)] uppercase tracking-tighter leading-[0.9]">
                        Agentic <br />
                        <span className="text-gradient-ai">Core</span>
                    </h1>
                </div>
                <div className="pro-card !p-8 !rounded-[2.5rem] bg-[var(--color-bg-subtle)] border-[var(--color-border)] flex items-center gap-8 group">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Active Nodes</span>
                        <span className="text-3xl font-black text-[var(--color-text-main)] tracking-tighter leading-none mt-2">12/12</span>
                    </div>
                    <div className="w-[1px] h-10 bg-[var(--color-border)]" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Latency</span>
                        <span className="text-3xl font-black text-primary tracking-tighter leading-none mt-2">15ms</span>
                    </div>
                </div>
            </header>

            {/* Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {agents.map((agent, index) => (
                    <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -15 }}
                        className="pro-card !p-12 !rounded-[4.5rem] group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-[2s] -z-10 text-[var(--color-text-main)]">
                            <Fingerprint size={160} />
                        </div>
                        <div className={`w-20 h-20 rounded-[2.5rem] ${agent.color} bg-[var(--color-bg-base)] shadow-premium-md border-2 border-[var(--color-border)] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            <agent.icon size={36} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <h3 className="text-3xl font-black text-[var(--color-text-main)] uppercase tracking-tighter leading-none">{agent.name}</h3>
                                <div className="flex items-center gap-2 px-3 py-1 bg-[var(--color-bg-subtle)] rounded-lg text-[9px] font-black uppercase tracking-widest text-[var(--color-text-dim)] shrink-0 border border-[var(--color-border)]">
                                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> {agent.status}
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest italic">{agent.role}</p>
                            <p className="text-sm font-bold text-[var(--color-text-dim)] leading-relaxed pt-4 border-t border-[var(--color-border)]">
                                {agent.desc}
                            </p>
                            <button className="w-full h-16 bg-[var(--color-bg-subtle)] border-2 border-[var(--color-border)] rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest text-[var(--color-text-dim)] hover:bg-[var(--color-text-main)] hover:text-[var(--color-bg-base)] hover:border-transparent transition-all shadow-sm mt-8 flex items-center justify-center gap-3 cursor-pointer">
                                Test Node <ChevronRight size={14} strokeWidth={3} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* System Visualizer Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 pro-card !p-12 !rounded-[4.5rem] bg-slate-950 text-white border-none relative overflow-hidden group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-125 transition-transform duration-[2s]">
                        <Terminal size={200} className="text-primary" strokeWidth={0.5} />
                    </div>
                    <div className="flex items-center gap-6 mb-12 relative z-10">
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-3xl border border-white/10 ring-1 ring-white/20">
                            <Code size={28} className="text-primary" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Neural Reasoning Stream</h3>
                    </div>
                    <div className="space-y-6 relative z-10 font-mono">
                        {logs.map((log, i) => (
                            <div key={i} className="flex items-center gap-8 py-4 border-b border-white/5 last:border-none group/log cursor-pointer hover:bg-white/5 px-4 rounded-xl transition-colors">
                                <span className="text-[10px] text-primary/60 w-20">{log.time}</span>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest w-24">[{log.agent}]</span>
                                <span className="text-sm text-slate-100 flex-1">{log.action}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${log.status === 'Success' ? 'bg-success/10 border-success/20 text-success' : 'bg-primary/10 border-primary/20 text-primary'}`}>
                                    {log.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 pt-12 border-t border-white/5 relative z-10 grid grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest italic">Global Mastery</p>
                            <p className="text-2xl font-black tracking-tighter text-white">4.5k nodes</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest italic">Synapse Count</p>
                            <p className="text-2xl font-black tracking-tighter text-white">82% Sync</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest italic">Node Reliability</p>
                            <p className="text-2xl font-black tracking-tighter text-success">99.8%</p>
                        </div>
                    </div>
                </div>

                <div className="pro-card !p-12 !rounded-[4.5rem] space-y-12 flex flex-col justify-between group">
                    <div className="space-y-10">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center border-2 border-[var(--color-border)] shadow-premium-md group-hover:rotate-12 transition-transform">
                                <Globe size={28} />
                            </div>
                            <h4 className="text-xl font-black uppercase tracking-tighter italic text-[var(--color-text-main)]">Global Mesh</h4>
                        </div>
                        <p className="text-sm font-bold text-[var(--color-text-dim)] leading-relaxed border-l-4 border-primary pl-6">
                            Agentic nodes are distributed across cross-continental knowledge clusters for maximized synthesis velocity.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-text-dim)] px-2">
                            <span>Network Load</span>
                            <span className="text-primary">42%</span>
                        </div>
                        <div className="progress-bar-container">
                            <motion.div initial={{ width: 0 }} animate={{ width: '42%' }} className="progress-bar-fill" />
                        </div>
                    </div>
                    <button className="btn-premium w-full text-center cursor-pointer">Re-Calibrate</button>
                </div>
            </div>
        </motion.div>
    );
};

export default Agents;
