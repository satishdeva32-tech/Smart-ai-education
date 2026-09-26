import React, { useState } from 'react';
import {
    Brain, Rocket, Target, Zap, Shield,
    ArrowRight, ChevronRight, CheckCircle2, Globe, Star,
    Layers, Cpu, Activity, Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import useAuthStore from '../store/useAuthStore';
import { API_URL } from '../config';

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { setUser } = useAuthStore();

    const [selections, setSelections] = useState({
        learningStyle: 'visual',
        careerGoal: 'Software Engineer',
        preferredLanguage: 'English'
    });

    const stepOptions = {
        1: {
            field: 'learningStyle',
            options: [
                { label: 'Visual (diagrams, videos)', value: 'visual' },
                { label: 'Auditory (podcasts, discussions)', value: 'auditory' },
                { label: 'Logical (problem solving, math)', value: 'logical' },
                { label: 'Practical (hands-on coding)', value: 'practical' }
            ]
        },
        2: {
            field: 'careerGoal',
            options: [
                { label: 'Software Engineer', value: 'Software Engineer' },
                { label: 'Data Scientist / AI', value: 'Data Scientist / AI Engineer' },
                { label: 'Product Manager', value: 'Product Manager' },
                { label: 'Academic Researcher', value: 'Academic Researcher' }
            ]
        },
        3: {
            field: 'preferredLanguage',
            options: [
                { label: 'English', value: 'English' },
                { label: 'Spanish', value: 'Spanish' },
                { label: 'French', value: 'French' },
                { label: 'German', value: 'German' }
            ]
        }
    };

    const handleFinalize = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.put(`${API_URL}/api/auth/profile`, selections);
            if (response.data.success) {
                if (response.data.user) {
                    setUser(response.data.user);
                }
                if (onComplete) {
                    onComplete();
                }
            } else {
                setError(response.data.error || 'Failed to complete onboarding');
            }
        } catch (err) {
            console.error('Onboarding finalization error:', err);
            setError(err.response?.data?.error || err.message || 'An error occurred during onboarding finalization');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        {
            title: 'Neural Profile',
            desc: 'Calibrate your cognitive baseline for personalized learning nodes.',
            icon: Brain,
            color: 'text-primary'
        },
        {
            title: 'Goal Vector',
            desc: 'Define your market alignment and career delta targets.',
            icon: Target,
            color: 'text-secondary'
        },
        {
            title: 'Mesh Sync',
            desc: 'Initialize your connection to the global academic knowledge web.',
            icon: Globe,
            color: 'text-accent'
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--color-bg)] font-inter flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[120px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl bg-white rounded-[5rem] shadow-premium-lg border-8 border-white p-16 md:p-24 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-20 opacity-5 -z-10">
                    <Fingerprint size={320} className="text-slate-900" />
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-6 mb-20">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-col items-center gap-3">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${step >= s ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/30' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                                {step > s ? <CheckCircle2 size={24} /> : <span className="text-sm font-black">{s}</span>}
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-widest ${step >= s ? 'text-primary' : 'text-slate-300'}`}>
                                Step {s}
                            </span>
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center space-y-12"
                    >
                        <div className="space-y-6">
                            <div className={`w-24 h-24 mx-auto rounded-[2.5rem] bg-white border-2 border-slate-50 shadow-premium-md flex items-center justify-center ${steps[step - 1].color}`}>
                                {React.createElement(steps[step - 1].icon, { size: 40 })}
                            </div>
                            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                                {steps[step - 1].title} <span className="text-primary italic">Sync</span>
                            </h2>
                            <p className="text-xl text-slate-500 font-bold max-w-lg mx-auto leading-relaxed">
                                {steps[step - 1].desc}
                            </p>
                        </div>

                        {error && (
                            <div className="bg-rose-50 border-2 border-rose-100 text-rose-600 rounded-[1.5rem] p-4 text-xs font-black uppercase tracking-wider pl-6 max-w-2xl mx-auto">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-8">
                            {stepOptions[step]?.options.map((opt) => {
                                const isSelected = selections[stepOptions[step].field] === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setSelections({
                                            ...selections,
                                            [stepOptions[step].field]: opt.value
                                        })}
                                        className={`p-8 rounded-[2.5rem] border-2 transition-all text-left group ${isSelected ? 'border-primary bg-primary/5 shadow-premium-lg' : 'bg-slate-50 border-white hover:border-primary/20 hover:bg-primary/5 hover:shadow-premium-lg'}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-black uppercase tracking-tight ${isSelected ? 'text-primary' : 'text-slate-900'}`}>{opt.label}</span>
                                            <ChevronRight size={18} className={`${isSelected ? 'text-primary' : 'text-slate-300'} group-hover:text-primary transition-colors`} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="pt-12 flex justify-center gap-6">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    disabled={loading}
                                    className="h-18 px-12 bg-white border-2 border-slate-100 rounded-3xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-slate-200 transition-all disabled:opacity-50"
                                >
                                    Previous Vector
                                </button>
                            )}
                            <button
                                onClick={() => step < 3 ? setStep(step + 1) : handleFinalize()}
                                disabled={loading}
                                className="h-18 px-12 bg-slate-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-2xl flex items-center gap-4 group disabled:opacity-50"
                            >
                                {loading ? 'Finalizing Sync...' : (step === 3 ? 'Finalize Neural Link' : 'Continue Calibration')}
                                {!loading && <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-20 pt-16 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <Shield size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encryption</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Star size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Global Academic Standard</span>
                        </div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest">EduGenie Protocol v4.0.2</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Onboarding;
