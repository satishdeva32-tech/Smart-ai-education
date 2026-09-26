import React, { useState } from 'react';
import {
    Play, Clock, Star, BookOpen, ChevronRight, Search,
    Filter, Award, Brain, Zap, ArrowLeft, Trophy, Activity,
    Layout, Maximize2, Volume2, Settings, Users, Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const courses = [
        {
            title: "Advanced React Architecture",
            videoUrl: "https://www.youtube.com/embed/Tn6-PIqc4UM?autoplay=1",
            instructor: "Jack Herrington",
            duration: "12h 45m",
            rating: 4.9,
            students: 1240,
            level: "Advanced",
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
            progress: 65,
            desc: 'Master professional patterns: Compound components, Render props, and State Machines.'
        },
        {
            title: "AI Synthesis Systems",
            videoUrl: "https://www.youtube.com/embed/sVcwVQRHIc8?autoplay=1",
            instructor: "LangChain",
            duration: "8h 20m",
            rating: 5.0,
            students: 850,
            level: "Expert",
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
            progress: 30,
            desc: 'Building agentic workflows with LangGraph and Vector Databases.'
        },
        {
            title: "Neural UI Design",
            videoUrl: "https://www.youtube.com/embed/c9Wg6Cb_YlU?autoplay=1",
            instructor: "DesignCourse",
            duration: "6h 15m",
            rating: 4.8,
            students: 2100,
            level: "Intermediate",
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
            progress: 0,
            desc: 'Advanced aesthetics: Glassmorphism, 3D CSS, and Motion Orchestration.'
        }
    ];

    if (selectedCourse) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-7xl mx-auto space-y-12 pb-20"
            >
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => {
                            setSelectedCourse(null);
                            setIsPlaying(false);
                        }}
                        className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-sm group"
                    >
                        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-1">Active Cycle</p>
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{selectedCourse.title}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                    <div className="xl:col-span-2 space-y-10">
                        {/* Video Player */}
                        <div className="aspect-video bg-slate-900 rounded-[3.5rem] relative overflow-hidden group shadow-premium-lg border-4 border-white flex items-center justify-center">
                            {isPlaying ? (
                                <iframe 
                                    className="w-full h-full rounded-[3rem]" 
                                    src={selectedCourse.videoUrl} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <>
                                    <img src={selectedCourse.image} alt="" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3s]" />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                                        <motion.button
                                            onClick={() => setIsPlaying(true)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-24 h-24 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-2xl shadow-[#FF0000]/40 group/btn relative cursor-pointer border-4 border-white/20 hover:border-white transition-colors"
                                        >
                                            <div className="absolute inset-0 rounded-full bg-[#FF0000] animate-ping opacity-20" />
                                            <Youtube size={40} className="relative z-10" fill="currentColor" />
                                        </motion.button>
                                        <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-white font-bold tracking-widest uppercase text-sm shadow-xl pointer-events-none">
                                            Play Course
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Description & Insights */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="pro-card !p-10 !rounded-[3.5rem] space-y-8">
                                <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4">
                                    <BookOpen className="text-primary" /> Curated Syllabus
                                </h3>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div 
                                            key={i} 
                                            onClick={() => setIsPlaying(true)}
                                            className="flex items-center gap-6 p-5 rounded-3xl hover:bg-slate-50 transition-all group cursor-pointer border-2 border-transparent hover:border-slate-100"
                                        >
                                            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-xs font-black text-slate-400 group-hover:text-primary group-hover:border-primary/20 shadow-sm">
                                                0{i}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-black text-slate-900">Module Optimization {i}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">14:20 • Active Cycle</p>
                                            </div>
                                            <Play size={16} className="text-slate-200 group-hover:text-primary transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pro-card !p-10 !rounded-[3.5rem] bg-slate-900 text-white border-none relative overflow-hidden group shadow-2xl shadow-slate-900/40">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-[2s]">
                                    <Brain size={160} />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 relative z-10 text-primary">
                                    <Zap size={24} fill="currentColor" /> AI Assistant Node
                                </h3>
                                <p className="text-slate-300 text-lg font-medium leading-relaxed mb-10 relative z-10 italic">
                                    "Deep synthesis detected in pattern matching. Recommend reinforcing with <span className="text-white font-black underline decoration-primary decoration-4 underline-offset-8">Neural Hydration</span> exercises."
                                </p>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                        <span className="text-slate-400">Mastery Sync</span>
                                        <span className="text-primary">65% Optimal</span>
                                    </div>
                                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[65%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructor & Stats */}
                    <div className="space-y-10">
                        <div className="pro-card !p-10 !rounded-[4.5rem] space-y-10 group">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-[2.5rem] bg-slate-50 p-1 border-4 border-white shadow-premium-md relative overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="" className="w-full h-full object-cover rounded-[2.2rem]" />
                                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary border-4 border-white rounded-full" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{selectedCourse.instructor}</h4>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Faculty Elite</p>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed border-l-4 border-primary pl-6">
                                Specializing in high-frequency architectural patterns and cognitive UI synchronization protocols.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-50">
                                <div className="space-y-1">
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">4.9k</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Students</p>
                                </div>
                                <div className="space-y-1 text-right">
                                    <p className="text-2xl font-black text-primary tracking-tighter">124</p>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Authored Labs</p>
                                </div>
                            </div>
                        </div>

                        <div className="pro-card !p-10 !rounded-[4.5rem] space-y-8 bg-slate-50 border-slate-100 group">
                            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-4">
                                <Trophy className="text-accent" /> Course Legacy
                            </h3>
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Certificate Sync</span>
                                    <span className="text-slate-900 font-bold">Lvl 12 Ready</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {[1, 1, 1, 0, 0].map((star, i) => (
                                        <Star key={i} size={24} className={star ? 'text-accent' : 'text-slate-200'} fill={star ? 'currentColor' : 'none'} strokeWidth={2.5} />
                                    ))}
                                </div>
                            </div>
                            <button className="w-full h-18 bg-white border-2 border-slate-200 rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                                Download Assets
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16 max-w-7xl mx-auto px-4 py-8 font-inter pb-20"
        >
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-slate-100 pb-16">
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-100 shadow-premium-sm text-primary text-[10px] font-black uppercase tracking-[0.25em]"
                    >
                        <Layout size={14} className="animate-pulse" /> Curriculum Library Expanded
                    </motion.div>
                    <h1 className="text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
                        Learning <br />
                        <span className="text-gradient-ai">Matrix</span>
                    </h1>
                </div>
                <div className="flex-1 max-w-2xl w-full">
                    <div className="search-wrapper group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Search high-frequency courses..."
                            className="search-input !h-20 !pl-16 !text-lg !font-bold"
                        />
                    </div>
                </div>
            </header>

            {/* Course Catalog */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {courses.map((course, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -15, scale: 1.02 }}
                        onClick={() => setSelectedCourse(course)}
                        className="pro-card group cursor-pointer overflow-hidden border-none !rounded-[4rem]"
                    >
                        <div className="h-72 w-full relative overflow-hidden">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                            <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                                {course.level}
                            </div>
                            <div className="absolute bottom-6 left-6 right-6">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-2">{course.title}</h3>
                                <p className="text-[10px] font-black text-white/70 uppercase tracking-widest">{course.instructor}</p>
                            </div>
                        </div>
                        <div className="p-10 space-y-8 bg-white">
                            <p className="text-sm font-bold text-slate-500 leading-relaxed line-clamp-2">
                                {course.desc}
                            </p>
                            <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] pt-8 border-t border-slate-50">
                                <span className="flex items-center gap-2"><Clock size={16} /> {course.duration}</span>
                                <span className="flex items-center gap-2 text-primary"><Star size={16} fill="currentColor" /> {course.rating}</span>
                                <span className="flex items-center gap-2"><Users size={16} /> {course.students}</span>
                            </div>
                            <div className="progress-bar-container">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${course.progress}%` }}
                                    transition={{ duration: 1.5 }}
                                    className="progress-bar-fill"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Courses;
