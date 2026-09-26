import React, { useState } from 'react';
import {
    Terminal, Zap, Sparkles, Code, Cpu, Activity,
    FlaskConical, ArrowRight, ArrowLeft, Play, Database, Search,
    Layers, Fingerprint, Box
} from 'lucide-react';
import { motion } from 'framer-motion';

const PromptSandbox = () => {
    const [isSynthesizing, setIsSynthesizing] = useState(false);
    const [output, setOutput] = useState("> Awaiting synthesis execution...");

    const handleSynthesize = () => {
        if (isSynthesizing) return;
        setIsSynthesizing(true);
        setOutput("> Analyzing context and neural parameters...\\n> Initializing inference model...\\n> Generating response...");

        setTimeout(() => {
            setOutput("> Analyzing context and neural parameters...\\n> Initializing inference model...\\n> \\n[RESPONSE]:\\nQuantum entanglement implies that particles can be strongly correlated in ways that violate classical local realism. This suggests that either quantum information influences states instantaneously across distances, or physical properties are not strictly localized prior to measurement, fundamentally challenging our classical intuition of a deterministic universe.");
            setIsSynthesizing(false);
        }, 2500);
    };

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2 space-y-6">
                <div className="pro-card !p-8 !rounded-[3rem] space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">System Prompt</h3>
                    <textarea 
                        className="w-full h-32 bg-slate-50 rounded-2xl p-6 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 border-2 border-slate-100 resize-none shadow-inner"
                        placeholder="Enter the system behavior guidelines..."
                        defaultValue="You are an advanced neural learning assistant. Analyze the user's cognitive patterns and provide optimized responses."
                    />
                    <h3 className="text-2xl font-black uppercase tracking-tighter pt-4 border-t border-slate-100">User Context</h3>
                    <textarea 
                        className="w-full h-32 bg-slate-50 rounded-2xl p-6 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 border-2 border-slate-100 resize-none shadow-inner"
                        placeholder="Enter the prompt to test..."
                        defaultValue="Explain the implications of quantum entanglement on local realism."
                    />
                    <button 
                        onClick={handleSynthesize}
                        disabled={isSynthesizing}
                        className={`w-full py-5 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 ${isSynthesizing ? 'bg-primary/50 cursor-not-allowed' : 'bg-primary hover:shadow-primary/40 shadow-xl'}`}
                    >
                        {isSynthesizing ? <Activity size={20} className="animate-spin" /> : <Zap size={20} fill="currentColor" />} 
                        {isSynthesizing ? 'Synthesizing...' : 'Synthesize Response'}
                    </button>
                </div>
                
                <div className="pro-card !p-8 !rounded-[3rem] bg-slate-900 text-white border-none shadow-premium-lg space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-primary flex items-center gap-3">
                        <Terminal size={24} /> Output Stream
                    </h3>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm text-slate-300 leading-relaxed min-h-[150px] whitespace-pre-wrap">
                        <span className="text-slate-400">{output}</span>
                    </div>
                </div>
            </div>
            
            <div className="space-y-6">
                <div className="pro-card !p-8 !rounded-[3rem] space-y-8 h-full">
                    <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <Activity className="text-accent" /> Node Config
                    </h3>
                    
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Temperature</span>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-900">0.7</span>
                            </div>
                            <input type="range" className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" min="0" max="1" step="0.1" defaultValue="0.7" />
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Top P</span>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-900">0.9</span>
                            </div>
                            <input type="range" className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" min="0" max="1" step="0.1" defaultValue="0.9" />
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Max Tokens</span>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-900">2048</span>
                            </div>
                            <input type="range" className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" min="256" max="4096" step="256" defaultValue="2048" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const NeuralVisualizer = () => {
    const [isRendering, setIsRendering] = useState(false);
    
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2 pro-card !p-8 !rounded-[3rem] bg-slate-950 text-white border-none shadow-premium-lg relative overflow-hidden min-h-[500px] flex flex-col">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-secondary flex items-center gap-3 relative z-10">
                    <Box size={24} /> Architecture View
                </h3>
                
                <div className="flex-1 flex items-center justify-center relative mt-8 z-10">
                    {isRendering ? (
                        <div className="relative w-64 h-64">
                            <motion.div 
                                animate={{ rotateX: [0, 360], rotateY: [0, 360] }} 
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full border-4 border-secondary/30 rounded-3xl absolute top-0 left-0"
                                style={{ transformStyle: 'preserve-3d' }}
                            />
                            <motion.div 
                                animate={{ rotateX: [360, 0], rotateY: [0, 360] }} 
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full border-4 border-primary/30 rounded-full absolute top-0 left-0"
                                style={{ transformStyle: 'preserve-3d' }}
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 bg-secondary rounded-full shadow-[0_0_20px_rgba(var(--secondary),0.8)]" />
                                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.8)]" />
                                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} className="w-4 h-4 bg-accent rounded-full shadow-[0_0_20px_rgba(var(--accent),0.8)]" />
                            </div>
                        </div>
                    ) : (
                        <div className="text-slate-500 font-mono text-sm text-center">
                            {`> Standby: Awaiting initialization sequence.`}<br/>
                            {`> Select parameters and click Render.`}
                        </div>
                    )}
                </div>
            </div>
            
            <div className="space-y-6">
                <div className="pro-card !p-8 !rounded-[3rem] space-y-8 h-full">
                    <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <Activity className="text-secondary" /> Projection Config
                    </h3>
                    
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Model Type</label>
                            <select className="w-full bg-slate-50 rounded-xl p-4 font-bold text-slate-700 outline-none border-2 border-slate-100">
                                <option>Transformer (GPT-4)</option>
                                <option>Diffusion (Stable)</option>
                                <option>Convolutional (ResNet)</option>
                            </select>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Layer Depth</span>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-900">48</span>
                            </div>
                            <input type="range" className="w-full accent-secondary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" min="12" max="96" step="12" defaultValue="48" />
                        </div>
                        
                        <button 
                            onClick={() => setIsRendering(!isRendering)}
                            className={`w-full py-5 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 ${isRendering ? 'bg-secondary/80 hover:bg-secondary' : 'bg-secondary hover:shadow-secondary/40'}`}
                        >
                            <Box size={20} /> {isRendering ? 'Halt Rendering' : 'Render Network'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DatasetForge = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleGenerate = () => {
        if (isGenerating) return;
        setIsGenerating(true);
        setProgress(0);
        
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 15;
            if (current >= 100) {
                setProgress(100);
                setIsGenerating(false);
                clearInterval(interval);
            } else {
                setProgress(current);
            }
        }, 300);
    };

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2 space-y-6">
                <div className="pro-card !p-8 !rounded-[3rem] space-y-8 h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <Database className="text-accent" size={28} /> Synthesis Pipeline
                    </h3>
                    
                    <div className="space-y-8 mt-8">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Target Domain</label>
                                <select className="w-full bg-slate-50 rounded-xl p-4 font-bold text-slate-700 outline-none border-2 border-slate-100">
                                    <option>Medical Diagnostics</option>
                                    <option>Financial Modeling</option>
                                    <option>Legal Contracts</option>
                                    <option>Code Generation</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Output Format</label>
                                <select className="w-full bg-slate-50 rounded-xl p-4 font-bold text-slate-700 outline-none border-2 border-slate-100">
                                    <option>JSONL</option>
                                    <option>CSV</option>
                                    <option>Parquet</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <span>Volume (Samples)</span>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-900">10,000</span>
                            </div>
                            <input type="range" className="w-full accent-accent h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" min="1000" max="100000" step="1000" defaultValue="10000" />
                        </div>

                        <button 
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`w-full py-5 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 ${isGenerating ? 'bg-accent/50 cursor-not-allowed' : 'bg-accent hover:shadow-accent/40'}`}
                        >
                            {isGenerating ? <Activity size={20} className="animate-spin" /> : <Sparkles size={20} />} 
                            {isGenerating ? 'Synthesizing Data...' : 'Generate Dataset'}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="space-y-6">
                <div className="pro-card !p-8 !rounded-[3rem] bg-slate-900 text-white border-none shadow-premium-lg space-y-8 h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tighter text-accent flex items-center gap-3">
                            <Terminal size={24} /> Compilation Status
                        </h3>
                        <div className="mt-8 space-y-6">
                            <div className="flex justify-between text-sm font-mono text-slate-400">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-accent"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ ease: "easeOut" }}
                                />
                            </div>
                            
                            <div className="font-mono text-xs text-slate-500 space-y-2 min-h-[100px]">
                                {progress > 10 && <p>{`> Extrapolating baseline vectors...`}</p>}
                                {progress > 40 && <p>{`> Applying domain constraints...`}</p>}
                                {progress > 70 && <p>{`> Formatting to JSONL structure...`}</p>}
                                {progress === 100 && <p className="text-accent">{`> Synthesis complete. Ready for download.`}</p>}
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        disabled={progress < 100}
                        className={`w-full py-4 font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 ${progress === 100 ? 'bg-white text-slate-900 hover:scale-105 shadow-xl cursor-pointer' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
                    >
                        Download Asset
                    </button>
                </div>
            </div>
        </div>
    );
};

const Lab = () => {
    const [selectedExperiment, setSelectedExperiment] = useState(null);
    const [isSyncingAssets, setIsSyncingAssets] = useState(false);
    const [isInitiatingCycle, setIsInitiatingCycle] = useState(false);

    const handleSyncAssets = () => {
        setIsSyncingAssets(true);
        setTimeout(() => setIsSyncingAssets(false), 2000);
    };

    const handleInitiateCycle = () => {
        setIsInitiatingCycle(true);
        setTimeout(() => setIsInitiatingCycle(false), 2500);
    };

    const experiments = [
        {
            title: 'Prompt Sandbox',
            desc: 'Test LLM responses with multi-vector system prompts and context injection.',
            icon: MessageSquareIcon,
            color: 'text-primary',
            bg: 'bg-primary/5',
            status: 'Ready'
        },
        {
            title: 'Neural Visualizer',
            desc: '3D rendering of model weight distributions and attention head activations.',
            icon: Box,
            color: 'text-secondary',
            bg: 'bg-secondary/5',
            status: 'Internal Beta'
        },
        {
            title: 'Dataset Forge',
            desc: 'Generate high-fidelity synthetic data for specific domain fine-tuning.',
            icon: Database,
            color: 'text-accent',
            bg: 'bg-accent/5',
            status: 'Alpha'
        }
    ];

    const logs = [
        { node: 'Head-12', event: 'Attention Divergence', status: 'Stable', latency: '2ms' },
        { node: 'Layer-4', event: 'Gradient Synthesis', status: 'Optimizing', latency: '15ms' },
        { node: 'Output-X', event: 'Vector Collapse', status: 'Safeguarded', latency: '1ms' }
    ];

    if (selectedExperiment) {
        const Icon = selectedExperiment.icon;
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-7xl mx-auto space-y-12 pb-20 px-4"
            >
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setSelectedExperiment(null)}
                        className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm group"
                    >
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Experiment Active</p>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{selectedExperiment.title}</h2>
                    </div>
                </div>

                {selectedExperiment.title === 'Prompt Sandbox' ? (
                    <PromptSandbox />
                ) : selectedExperiment.title === 'Neural Visualizer' ? (
                    <NeuralVisualizer />
                ) : selectedExperiment.title === 'Dataset Forge' ? (
                    <DatasetForge />
                ) : (
                    <div className="pro-card !p-12 !rounded-[4rem] min-h-[500px] flex flex-col items-center justify-center text-center space-y-6">
                        <div className={`w-24 h-24 rounded-[2rem] ${selectedExperiment.bg} ${selectedExperiment.color} border-2 border-white shadow-premium-md flex items-center justify-center mb-4`}>
                            <Icon size={48} />
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900">Module Initializing...</h3>
                        <p className="text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
                            The <span className="font-bold text-slate-900">{selectedExperiment.title}</span> environment is currently being provisioned. Please wait while the neural pathways and necessary dependencies are established.
                        </p>
                        <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden mt-8 relative">
                            <motion.div 
                                className={`absolute top-0 bottom-0 left-0 w-1/3 bg-current ${selectedExperiment.color}`}
                                animate={{ x: [-100, 300] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                        </div>
                    </div>
                )}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16 max-w-7xl mx-auto px-4 py-8 font-inter pb-20"
        >
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-slate-100 pb-16">
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-100 shadow-premium-sm text-primary text-[10px] font-black uppercase tracking-[0.25em]"
                    >
                        <FlaskConical size={14} className="animate-pulse" /> Neural Prototype Lab
                    </motion.div>
                    <h1 className="text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
                        Academic <br />
                        <span className="text-gradient-ai">Forge</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={handleSyncAssets}
                        disabled={isSyncingAssets}
                        className="h-16 px-8 bg-slate-50 border-2 border-white rounded-[1.8rem] flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-slate-200 transition-all shadow-sm"
                    >
                        {isSyncingAssets ? <Activity size={18} className="animate-spin" /> : <Database size={18} />} 
                        {isSyncingAssets ? 'Syncing...' : 'Node Assets'}
                    </button>
                    <button 
                        onClick={handleInitiateCycle}
                        disabled={isInitiatingCycle}
                        className="h-16 px-8 bg-primary rounded-[1.8rem] flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white hover:shadow-primary/40 transition-all shadow-xl"
                    >
                        {isInitiatingCycle ? <Activity size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />} 
                        {isInitiatingCycle ? 'Initiating...' : 'Initiate Multi-Cycle'}
                    </button>
                </div>
            </header>

            {/* Experiment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {experiments.map((exp, index) => {
                    const Icon = exp.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -15, scale: 1.02 }}
                            onClick={() => setSelectedExperiment(exp)}
                            className="pro-card group cursor-pointer overflow-hidden border-none !rounded-[4rem] flex flex-col justify-between"
                        >
                            <div className="p-12 space-y-10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-[2s] -z-10 text-slate-900">
                                    <Fingerprint size={140} />
                                </div>
                                <div className={`w-18 h-18 rounded-[2rem] ${exp.bg} ${exp.color} border-2 border-white shadow-premium-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                    <Icon size={32} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none">{exp.title}</h3>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed">
                                        {exp.desc}
                                    </p>
                                </div>
                            </div>
                            <div className="px-12 pb-12">
                                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border-2 border-white shadow-inner group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 group-hover:text-primary">{exp.status}</span>
                                    <ArrowRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} strokeWidth={3} />
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Neural Visualizer Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 pro-card !p-12 !rounded-[4.5rem] bg-slate-950 text-white border-none relative overflow-hidden group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-30 group-hover:scale-125 transition-transform duration-[4s]" />
                    <div className="flex justify-between items-center mb-16 relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-primary">
                                <Activity size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black uppercase tracking-tighter">Neural Stream</h3>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time weight activation telemetry</p>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                            Filter Nodes
                        </button>
                    </div>

                    <div className="space-y-8 relative z-10">
                        {logs.map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl group/log cursor-pointer hover:bg-white/5 transition-all">
                                <div className="flex items-center gap-10">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest w-20">{log.node}</span>
                                    <div className="w-[1px] h-6 bg-white/10" />
                                    <span className="text-sm font-bold text-slate-100">{log.event}</span>
                                </div>
                                <div className="flex items-center gap-10">
                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{log.latency}</span>
                                    <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${log.status === 'Optimizing' ? 'bg-primary/20 border-primary/40 text-primary animate-pulse' : 'bg-success/10 border-success/30 text-success'}`}>
                                        {log.status}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-12 border-t border-white/5 relative z-10 flex items-center justify-between">
                        <div className="flex gap-16">
                            <div className="space-y-1">
                                <p className="text-[32px] font-black tracking-tighter text-white">4.2 TFlops</p>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Neural Compute Velocity</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[32px] font-black tracking-tighter text-secondary">82%</p>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Efficiency Overclock</p>
                            </div>
                        </div>
                        <button className="h-16 px-12 bg-white text-slate-900 rounded-[1.8rem] font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl">
                            Overclock Core
                        </button>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="pro-card !p-12 !rounded-[4.5rem] bg-white border-slate-100 flex flex-col justify-between group h-fit min-h-[400px]">
                        <div className="space-y-10">
                            <div className="w-16 h-16 rounded-[1.8rem] bg-primary/5 text-primary border-2 border-white shadow-premium-md flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <Layers size={32} />
                            </div>
                            <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">Multi-Layer <br /> Synthesis</h4>
                            <p className="text-sm font-bold text-slate-500 leading-relaxed border-l-4 border-primary pl-6">
                                Experiments here directly influence your neural digital twin's strategic performance algorithms.
                            </p>
                        </div>
                        <button className="btn-premium w-full mt-10">Sync Results</button>
                    </div>

                    <div className="pro-card !p-12 !rounded-[4rem] bg-slate-50 border-slate-100 group relative overflow-hidden">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                <Cpu size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Status</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                                <span className="text-slate-900">Lab Sync</span>
                                <span className="text-primary">Live</span>
                            </div>
                            <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                                <motion.div animate={{ x: [-100, 300] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Mock for missing icon in my snippet
const MessageSquareIcon = ({ size }) => <MessageSquare size={size} />;
import { MessageSquare } from 'lucide-react';

export default Lab;
