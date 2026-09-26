import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Brain, CheckCircle, Lock, Play, X, Zap, Award, Sparkles, 
    BookOpen, Users, Clock, Star, PlayCircle, Eye, ArrowRight
} from 'lucide-react';

// Custom Node Component
const CustomNode = ({ data }) => {
    const { label, status, icon: Icon, desc } = data;
    const isCompleted = status === 'completed';
    const isInProgress = status === 'in-progress';
    const isLocked = status === 'locked';

    return (
        <div className={`p-5 rounded-[2rem] border backdrop-blur-md w-64 shadow-lg text-left transition-all duration-300 relative group cursor-pointer ${
            isCompleted 
                ? 'bg-success/5 border-success/30 shadow-success/5 hover:border-success/50' 
                : isInProgress
                ? 'bg-primary/5 border-primary/30 shadow-[0_0_30px_rgba(108,99,255,0.15)] hover:border-primary/50'
                : 'bg-white/5 border-white/10 opacity-50 hover:opacity-75'
        }`}>
            {/* Glowing Orb for Active Node */}
            {isInProgress && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary"></span>
                </span>
            )}
            
            <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 ${
                    isCompleted ? 'bg-success/15 border-success/30 text-success' :
                    isInProgress ? 'bg-primary/15 border-primary/30 text-primary' :
                    'bg-white/5 border-white/10 text-[var(--color-text-dim)]'
                }`}>
                    {isCompleted ? <CheckCircle size={20} /> : 
                     isLocked ? <Lock size={20} /> : 
                     Icon ? <Icon size={20} /> : <Brain size={20} />}
                </div>
                <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-[var(--color-text-main)] group-hover:text-primary transition-colors">{label}</h4>
                    <span className={`text-[9px] font-black uppercase tracking-widest block mt-0.5 ${
                        isCompleted ? 'text-success' :
                        isInProgress ? 'text-primary animate-pulse' :
                        'text-[var(--color-text-dim)]'
                    }`}>{status}</span>
                </div>
            </div>
            <p className="text-[10px] text-[var(--color-text-dim)] font-semibold leading-relaxed mt-4 border-t border-[var(--color-border)] pt-4">
                {desc}
            </p>
        </div>
    );
};

const nodeTypes = {
    custom: CustomNode,
};

const LearningGalaxy = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [activeVideo, setActiveVideo] = useState(null);

    const initialNodes = [
        {
            id: '1',
            type: 'custom',
            data: { 
                label: 'React Architecture', 
                status: 'completed', 
                icon: BookOpen,
                desc: 'Component hierarchies, optimization layers, and architectural patterns.',
                detailedDesc: 'Dive deep into structural patterns for scaling large-scale React systems. Learn container/presentational, compound components, rendering patterns (SSR, SSG, ISR), code-splitting strategies, and dependency decoupling.',
                playlist: 'https://www.youtube.com/embed/Tn6-PIqc4UM?autoplay=1',
                stats: { time: '8 Hours', rating: '4.9', difficulty: 'Intermediate' }
            },
            position: { x: 100, y: 150 },
        },
        {
            id: '2',
            type: 'custom',
            data: { 
                label: 'Advanced State Systems', 
                status: 'in-progress', 
                icon: Zap,
                desc: 'Zustand, Jotai, Redux Toolkit, and context performance optimization.',
                detailedDesc: 'Explore advanced state orchestration, reactive state, context selector optimizations, atomic state models, and persistent offline client caching layers.',
                playlist: 'https://www.youtube.com/embed/sVcwVQRHIc8?autoplay=1',
                stats: { time: '12 Hours', rating: '5.0', difficulty: 'Advanced' }
            },
            position: { x: 450, y: 150 },
        },
        {
            id: '3',
            type: 'custom',
            data: { 
                label: 'Vector Synthesis', 
                status: 'locked', 
                icon: Brain,
                desc: 'Integrating AI agents, custom vector databases, and semantic search layers.',
                detailedDesc: 'Build local knowledge retrievers using FAISS/ChromaDB. Design agent toolkits, prompt pipelines, and multi-agent workflow managers using LangGraph.',
                playlist: 'https://www.youtube.com/embed/c9Wg6Cb_YlU?autoplay=1',
                stats: { time: '15 Hours', rating: '4.8', difficulty: 'Expert' }
            },
            position: { x: 450, y: 400 },
        },
        {
            id: '4',
            type: 'custom',
            data: { 
                label: 'Neural UI Design', 
                status: 'locked', 
                icon: Star,
                desc: 'Futuristic animations, WebGL shader interactions, and glassmorphism styling.',
                detailedDesc: 'Master dynamic CSS design tokens, three.js canvas overlays, high-performance canvas performance, and immersive OS-style interface patterns.',
                playlist: 'https://www.youtube.com/embed/c9Wg6Cb_YlU?autoplay=1',
                stats: { time: '10 Hours', rating: '4.9', difficulty: 'Advanced' }
            },
            position: { x: 800, y: 150 },
        },
    ];

    const initialEdges = [
        { 
            id: 'e1-2', 
            source: '1', 
            target: '2',
            animated: true,
            style: { 
                stroke: 'var(--color-primary)', 
                strokeWidth: 4, 
                filter: 'drop-shadow(0 0 8px var(--color-primary))' 
            }
        },
        { 
            id: 'e2-3', 
            source: '2', 
            target: '3',
            style: { 
                stroke: 'var(--color-border)', 
                strokeWidth: 3, 
                strokeDasharray: '5,5'
            }
        },
        { 
            id: 'e2-4', 
            source: '2', 
            target: '4',
            style: { 
                stroke: 'var(--color-border)', 
                strokeWidth: 3, 
                strokeDasharray: '5,5'
            }
        },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node.data);
    }, []);

    return (
        <div className="h-[calc(100vh-8rem)] w-full relative flex">
            {/* React Flow Workspace */}
            <div className="flex-1 h-full rounded-[3rem] overflow-hidden glass-panel relative border border-[var(--color-border)]">
                {/* Visual Header */}
                <div className="absolute top-8 left-8 z-10 space-y-1 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">
                        <Sparkles size={12} className="animate-pulse" /> Neural Constellation Sync
                    </div>
                    <h2 className="text-3xl font-black text-[var(--color-text-main)] uppercase tracking-tighter">Learning Galaxy</h2>
                    <p className="text-[10px] font-black text-[var(--color-text-dim)] uppercase tracking-widest">Double click canvas to explore or drag nodes</p>
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    onNodeClick={onNodeClick}
                    fitView
                    minZoom={0.5}
                    maxZoom={1.5}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background color="var(--color-border)" gap={20} size={1.5} />
                    <Controls className="!bg-[var(--color-bg-base)] !border-[var(--color-border)] !rounded-2xl !p-1 !shadow-lg" />
                </ReactFlow>
            </div>

            {/* Slide-out details panel */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="w-96 h-full ml-6 glass-panel !rounded-[3rem] p-8 flex flex-col justify-between border border-[var(--color-border)] shadow-2xl relative overflow-hidden"
                    >
                        <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide">
                            <div className="flex justify-between items-start">
                                <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                                    selectedNode.status === 'completed' ? 'bg-success/10 text-success border-success/20' :
                                    selectedNode.status === 'in-progress' ? 'bg-primary/10 text-primary border-primary/20 animate-pulse' :
                                    'bg-[var(--color-bg-subtle)] text-[var(--color-text-dim)] border-[var(--color-border)]'
                                }`}>
                                    {selectedNode.status}
                                </span>
                                <button 
                                    onClick={() => setSelectedNode(null)}
                                    className="p-2 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:bg-rose-500/10 hover:text-rose-500 transition-colors text-[var(--color-text-dim)]"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-[var(--color-text-main)] uppercase tracking-tight leading-tight">{selectedNode.label}</h3>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Active Learning Node</p>
                            </div>

                            <p className="text-sm font-semibold text-[var(--color-text-dim)] leading-relaxed pt-4 border-t border-[var(--color-border)]">
                                {selectedNode.detailedDesc}
                            </p>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-[var(--color-bg-subtle)] p-3 rounded-2xl border border-[var(--color-border)] text-center">
                                    <Clock size={16} className="text-primary mx-auto mb-1" />
                                    <span className="text-[9px] font-black uppercase tracking-wider text-[var(--color-text-dim)] block">Time</span>
                                    <span className="text-xs font-black text-[var(--color-text-main)]">{selectedNode.stats.time}</span>
                                </div>
                                <div className="bg-[var(--color-bg-subtle)] p-3 rounded-2xl border border-[var(--color-border)] text-center">
                                    <Star size={16} className="text-amber-500 mx-auto mb-1" />
                                    <span className="text-[9px] font-black uppercase tracking-wider text-[var(--color-text-dim)] block">Rating</span>
                                    <span className="text-xs font-black text-[var(--color-text-main)]">{selectedNode.stats.rating}</span>
                                </div>
                                <div className="bg-[var(--color-bg-subtle)] p-3 rounded-2xl border border-[var(--color-border)] text-center">
                                    <Award size={16} className="text-secondary mx-auto mb-1" />
                                    <span className="text-[9px] font-black uppercase tracking-wider text-[var(--color-text-dim)] block">Tier</span>
                                    <span className="text-xs font-black text-[var(--color-text-main)]">{selectedNode.stats.difficulty}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[var(--color-border)] space-y-4">
                            {selectedNode.status !== 'locked' ? (
                                <button
                                    onClick={() => setActiveVideo(selectedNode.playlist)}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:opacity-90 shadow-lg shadow-primary/20 group"
                                >
                                    <PlayCircle size={18} className="group-hover:scale-110 transition-transform" /> Play Node Stream
                                </button>
                            ) : (
                                <button
                                    disabled
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[var(--color-text-dim)] rounded-2xl font-black uppercase text-xs tracking-widest cursor-not-allowed"
                                >
                                    <Lock size={18} /> Node Currently Locked
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Direct In-App YouTube Video Player Modal */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-4xl bg-[var(--color-bg-base)] border border-white/20 rounded-[3rem] overflow-hidden shadow-2xl p-6 relative flex flex-col gap-6"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <PlayCircle className="text-primary" size={24} />
                                    <h4 className="text-lg font-black text-[var(--color-text-main)] uppercase tracking-tight">Active Neural Stream</h4>
                                </div>
                                <button
                                    onClick={() => setActiveVideo(null)}
                                    className="p-3 rounded-2xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:bg-rose-500/10 hover:text-rose-500 text-[var(--color-text-dim)] transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            
                            <div className="aspect-video bg-slate-950 rounded-[2rem] overflow-hidden border border-[var(--color-border)]">
                                <iframe 
                                    className="w-full h-full" 
                                    src={activeVideo} 
                                    title="Node stream video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LearningGalaxy;
