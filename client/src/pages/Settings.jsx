import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings as SettingsIcon, Brain, Activity, Clock, Shield,
    User, Target, Zap, Waves, Volume2, Globe, Briefcase, Eye, Save, Sparkles, Smile
} from 'lucide-react';
import axios from 'axios';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('ai_assistant');
    const [isLoading, setIsLoading] = useState(false);

    // Core Settings State
    const [settings, setSettings] = useState({
        aiAssistant: { tutorEnabled: true, personalityMode: 'Friendly Tutor', responseStyle: 'Detailed', autonomyLevel: 'Semi-Autonomous' },
        digitalTwin: { simulationEnabled: true, strategySimulator: true, performancePrediction: true, burnoutSensitivity: 'Medium' },
        brainAdaptive: { learningStyle: 'Visual', difficultySpeed: 'Adaptive', microLessonAutoGen: true, knowledgeGapSensitivity: 'High' },
        productivity: { studyScheduleAutomation: true, focusSessionTimer: 25, breakReminderFrequency: 30, sleepOptimization: true },
        emotionalIntelligence: { emotionDetection: true, stressMonitoring: 'Medium', motivationalAlerts: true, encouragementNotifications: true },
        voiceMentor: { enabled: false, personality: 'Professional', speedControl: 1.0, speechToText: false },
        metaverse: { classroom3D: false, gamifiedProgression: true, virtualStudyRoom: true },
        careerNavigator: { recommendationsEnabled: true, skillGapDetection: true, internshipTracking: true, certificationSuggestions: true },
        privacy: { aiMemoryStorage: true, digitalTwinDataPermissions: true, wearableIntegration: false },
        personalization: { theme: 'Auto', interfaceDensity: 'Comfortable', language: 'English' },
        cognitiveMode: 'Learning Mode',
        aiSelfEvolution: { enabled: true }
    });

    useEffect(() => {
        // Fetch Settings on Mount
        const fetchSettings = async () => {
            try {
                const res = await axios.get('/api/user/profile', { withCredentials: true });
                if (res.data?.data?.settings) {
                    // merge in case of missing keys
                    setSettings(prev => ({ ...prev, ...res.data.data.settings }));
                    if (res.data.data.settings.personalization?.theme) {
                        applyTheme(res.data.data.settings.personalization.theme);
                    }
                }
            } catch (err) {
                console.error("Failed to load settings from server. Using defaults.");
            }
        };
        fetchSettings();
    }, []);

    const applyTheme = (themeValue) => {
        const root = document.documentElement;
        root.classList.remove('dark', 'light', 'cyberpunk', 'holographic');
        
        if (themeValue === 'Dark') {
            root.classList.add('dark');
        } else if (themeValue === 'Cyberpunk') {
            root.classList.add('cyberpunk');
        } else if (themeValue === 'Holographic') {
            root.classList.add('holographic');
        } else if (themeValue === 'Auto') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.add('dark');
            }
        }
    };

    const updateSetting = (category, field, value) => {
        setSettings(prev => {
            if (category === 'root') {
                return { ...prev, [field]: value };
            }
            return {
                ...prev,
                [category]: {
                    ...prev[category],
                    [field]: value
                }
            };
        });

        if (category === 'personalization' && field === 'theme') {
            applyTheme(value);
        }
    };

    const saveSettings = async () => {
        setIsLoading(true);
        try {
            await axios.put('/api/user/settings/update', settings, { withCredentials: true });
            // Show cute toast or animation here
            setTimeout(() => setIsLoading(false), 800);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const tabs = [
        { id: 'ai_assistant', label: 'AI Assistant', icon: Brain },
        { id: 'digital_twin', label: 'Digital Twin', icon: Activity },
        { id: 'cognitive', label: 'Cognitive Modes', icon: Sparkles },
        { id: 'brain_adaptive', label: 'Adaptive Learning', icon: Target },
        { id: 'productivity', label: 'Productivity', icon: Clock },
        { id: 'emotional', label: 'Emotional EQ', icon: Smile },
        { id: 'voice', label: 'Voice Mentor', icon: Volume2 },
        { id: 'metaverse', label: 'Metaverse', icon: Globe },
        { id: 'career', label: 'Career Navigator', icon: Briefcase },
        { id: 'privacy', label: 'Privacy & Data', icon: Shield },
        { id: 'personalization', label: 'Personalization', icon: Eye }
    ];

    // Sub-components for futuristic toggles layout
    const ToggleSwitch = ({ checked, onChange, label, subtext }) => (
        <div className="flex items-center justify-between p-4 bg-white/50 border border-slate-100 rounded-[2rem] hover:bg-white transition-colors cursor-pointer group" onClick={onChange}>
            <div>
                <p className="font-bold text-slate-800 tracking-tight">{label}</p>
                {subtext && <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">{subtext}</p>}
            </div>
            <div className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out ${checked ? 'bg-primary' : 'bg-slate-200'}`}>
                <motion.div
                    className="w-6 h-6 bg-white rounded-full shadow-sm"
                    layout
                    initial={false}
                    animate={{ x: checked ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
    );

    const SelectBox = ({ value, onChange, options, label }) => (
        <div className="p-4 bg-white/50 border border-slate-100 rounded-[2rem] flex flex-col gap-2 relative">
            <p className="font-bold text-slate-800 text-sm tracking-tight">{label}</p>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="absolute right-6 flex h-full items-center pointer-events-none pb-4">
                <SettingsIcon size={14} className="text-slate-400 opacity-50" />
            </div>
        </div>
    );

    // Dynamic renderer for the right pane
    const renderContent = () => {
        switch (activeTab) {
            case 'ai_assistant':
                return (
                    <div className="space-y-6">
                        <ToggleSwitch checked={settings.aiAssistant.tutorEnabled} onChange={() => updateSetting('aiAssistant', 'tutorEnabled', !settings.aiAssistant.tutorEnabled)} label="Enable AI Tutor" subtext="Global override for cognitive tutor presence" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectBox value={settings.aiAssistant.personalityMode} onChange={(v) => updateSetting('aiAssistant', 'personalityMode', v)} label="AI Personality Mode" options={['Friendly Tutor', 'Strict Coach', 'Motivational Mentor', 'Exam Expert']} />
                            <SelectBox value={settings.aiAssistant.responseStyle} onChange={(v) => updateSetting('aiAssistant', 'responseStyle', v)} label="Response Style" options={['Detailed', 'Simple', 'Visual', 'Exam-Oriented']} />
                            <SelectBox value={settings.aiAssistant.autonomyLevel} onChange={(v) => updateSetting('aiAssistant', 'autonomyLevel', v)} label="AI Autonomy Level" options={['Manual', 'Semi-Autonomous', 'Fully Autonomous Learning Mode']} />
                        </div>
                    </div>
                );
            case 'digital_twin':
                return (
                    <div className="space-y-6">
                        <ToggleSwitch checked={settings.digitalTwin.simulationEnabled} onChange={() => updateSetting('digitalTwin', 'simulationEnabled', !settings.digitalTwin.simulationEnabled)} label="Cognitive Digital Twin Simulation" subtext="Allow the AI to simulate your learning behavior in the background" />
                        <ToggleSwitch checked={settings.digitalTwin.strategySimulator} onChange={() => updateSetting('digitalTwin', 'strategySimulator', !settings.digitalTwin.strategySimulator)} label="Learning Strategy Simulator" />
                        <ToggleSwitch checked={settings.digitalTwin.performancePrediction} onChange={() => updateSetting('digitalTwin', 'performancePrediction', !settings.digitalTwin.performancePrediction)} label="Performance Prediction Visibility" />
                        <SelectBox value={settings.digitalTwin.burnoutSensitivity} onChange={(v) => updateSetting('digitalTwin', 'burnoutSensitivity', v)} label="Burnout Detection Sensitivity" options={['Low', 'Medium', 'High']} />
                    </div>
                );
            case 'cognitive':
                return (
                    <div className="space-y-8">
                        <div className="pro-card !p-8 !rounded-[3rem] bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-1000">
                                <Sparkles size={120} />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 relative z-10">Cognitive Mode Selector</h3>
                            <p className="text-sm font-bold text-white/80 max-w-md relative z-10 mb-8">
                                🚀 Ultra-Futuristic Feature (2030 Tier). Shift the entire AI's operational paradigm on the fly based on your current goal constraint.
                            </p>
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                {['Learning Mode', 'Deep Focus Mode', 'Exam Preparation Mode', 'Creative Thinking Mode', 'Research Mode'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => updateSetting('root', 'cognitiveMode', mode)}
                                        className={`p-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${settings.cognitiveMode === mode ? 'bg-white text-primary shadow-xl ring-4 ring-white/20' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pro-card !p-8 !rounded-[3rem] border border-success/20 bg-success/5">
                            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-800 mb-6 flex items-center gap-3">
                                <Waves className="text-success" /> AI Self-Evolution
                            </h3>
                            <ToggleSwitch checked={settings.aiSelfEvolution.enabled} onChange={() => updateSetting('aiSelfEvolution', 'enabled', !settings.aiSelfEvolution.enabled)} label="Enable AI Self-Improvement" subtext="Allow the AI agents to analyze your learning results weekly and automatically improve teaching strategies natively." />
                        </div>
                    </div>
                );
            case 'brain_adaptive':
                return (
                    <div className="space-y-6">
                        <SelectBox value={settings.brainAdaptive.learningStyle} onChange={(v) => updateSetting('brainAdaptive', 'learningStyle', v)} label="Preferred Learning Style" options={['Visual', 'Logical', 'Storytelling', 'Practical']} />
                        <SelectBox value={settings.brainAdaptive.difficultySpeed} onChange={(v) => updateSetting('brainAdaptive', 'difficultySpeed', v)} label="Difficulty Adaptation Speed" options={['Slow', 'Normal', 'Fast', 'Adaptive']} />
                        <ToggleSwitch checked={settings.brainAdaptive.microLessonAutoGen} onChange={() => updateSetting('brainAdaptive', 'microLessonAutoGen', !settings.brainAdaptive.microLessonAutoGen)} label="Micro-Lesson Auto-Generation" />
                        <SelectBox value={settings.brainAdaptive.knowledgeGapSensitivity} onChange={(v) => updateSetting('brainAdaptive', 'knowledgeGapSensitivity', v)} label="Knowledge Gap Tracking Sensitivity" options={['Low', 'Medium', 'High']} />
                    </div>
                );
            case 'productivity':
                return (
                    <div className="space-y-6">
                        <ToggleSwitch checked={settings.productivity.studyScheduleAutomation} onChange={() => updateSetting('productivity', 'studyScheduleAutomation', !settings.productivity.studyScheduleAutomation)} label="Study Schedule Automation" />
                        <ToggleSwitch checked={settings.productivity.sleepOptimization} onChange={() => updateSetting('productivity', 'sleepOptimization', !settings.productivity.sleepOptimization)} label="Sleep & Circadian Productivity Syncing" />
                    </div>
                );
            case 'voice':
                return (
                    <div className="space-y-6">
                        <ToggleSwitch checked={settings.voiceMentor.enabled} onChange={() => updateSetting('voiceMentor', 'enabled', !settings.voiceMentor.enabled)} label="Activate Voice Simulator" />
                        <SelectBox value={settings.voiceMentor.personality} onChange={(v) => updateSetting('voiceMentor', 'personality', v)} label="Voice Personality Synthesis" options={['Professional', 'Casual', 'Energetic']} />
                        <ToggleSwitch checked={settings.voiceMentor.speechToText} onChange={() => updateSetting('voiceMentor', 'speechToText', !settings.voiceMentor.speechToText)} label="Speech-to-Text Dictation Mode" />
                    </div>
                );
            case 'emotional':
                return (
                    <div className="space-y-6">
                        <ToggleSwitch checked={settings.emotionalIntelligence.emotionDetection} onChange={() => updateSetting('emotionalIntelligence', 'emotionDetection', !settings.emotionalIntelligence.emotionDetection)} label="Emotion Detection via Camera" />
                        <SelectBox value={settings.emotionalIntelligence.stressMonitoring} onChange={(v) => updateSetting('emotionalIntelligence', 'stressMonitoring', v)} label="Stress Monitoring Sensitivity" options={['Low', 'Medium', 'High']} />
                        <ToggleSwitch checked={settings.emotionalIntelligence.motivationalAlerts} onChange={() => updateSetting('emotionalIntelligence', 'motivationalAlerts', !settings.emotionalIntelligence.motivationalAlerts)} label="Motivational Alerts" />
                        <ToggleSwitch checked={settings.emotionalIntelligence.encouragementNotifications} onChange={() => updateSetting('emotionalIntelligence', 'encouragementNotifications', !settings.emotionalIntelligence.encouragementNotifications)} label="Encouragement Notifications" />
                    </div>
                );
            case 'metaverse':
                return (
                    <div className="space-y-6">
                        <ToggleSwitch checked={settings.metaverse.classroom3D} onChange={() => updateSetting('metaverse', 'classroom3D', !settings.metaverse.classroom3D)} label="3D Classroom Environments" />
                        <ToggleSwitch checked={settings.metaverse.gamifiedProgression} onChange={() => updateSetting('metaverse', 'gamifiedProgression', !settings.metaverse.gamifiedProgression)} label="Gamified Progression System" />
                        <ToggleSwitch checked={settings.metaverse.virtualStudyRoom} onChange={() => updateSetting('metaverse', 'virtualStudyRoom', !settings.metaverse.virtualStudyRoom)} label="Virtual Study Rooms" />
                    </div>
                );
            case 'career':
                return (
                    <div className="space-y-6">
                        <ToggleSwitch checked={settings.careerNavigator.recommendationsEnabled} onChange={() => updateSetting('careerNavigator', 'recommendationsEnabled', !settings.careerNavigator.recommendationsEnabled)} label="Career Recommendations" />
                        <ToggleSwitch checked={settings.careerNavigator.skillGapDetection} onChange={() => updateSetting('careerNavigator', 'skillGapDetection', !settings.careerNavigator.skillGapDetection)} label="Skill Gap Detection" />
                        <ToggleSwitch checked={settings.careerNavigator.internshipTracking} onChange={() => updateSetting('careerNavigator', 'internshipTracking', !settings.careerNavigator.internshipTracking)} label="Internship & Opportunity Tracking" />
                        <ToggleSwitch checked={settings.careerNavigator.certificationSuggestions} onChange={() => updateSetting('careerNavigator', 'certificationSuggestions', !settings.careerNavigator.certificationSuggestions)} label="Certification Suggestions" />
                    </div>
                );
            case 'privacy':
                return (
                    <div className="space-y-6">
                        <ToggleSwitch checked={settings.privacy.aiMemoryStorage} onChange={() => updateSetting('privacy', 'aiMemoryStorage', !settings.privacy.aiMemoryStorage)} label="AI Memory Storage" subtext="Allow AI to remember past conversations and context" />
                        <ToggleSwitch checked={settings.privacy.digitalTwinDataPermissions} onChange={() => updateSetting('privacy', 'digitalTwinDataPermissions', !settings.privacy.digitalTwinDataPermissions)} label="Digital Twin Data Collection" />
                        <ToggleSwitch checked={settings.privacy.wearableIntegration} onChange={() => updateSetting('privacy', 'wearableIntegration', !settings.privacy.wearableIntegration)} label="Wearable Biometric Integration" subtext="Sync with smartwatches for accurate stress monitoring" />
                    </div>
                );
            case 'personalization':
                return (
                    <div className="space-y-6">
                        <SelectBox value={settings.personalization.theme} onChange={(v) => updateSetting('personalization', 'theme', v)} label="Interface Theme" options={['Auto', 'Light', 'Dark', 'Cyberpunk', 'Holographic']} />
                        <SelectBox value={settings.personalization.interfaceDensity} onChange={(v) => updateSetting('personalization', 'interfaceDensity', v)} label="Information Density" options={['Compact', 'Comfortable', 'Spacious']} />
                        <SelectBox value={settings.personalization.language} onChange={(v) => updateSetting('personalization', 'language', v)} label="Primary Language" options={['English', 'Spanish', 'French', 'German', 'Mandarin']} />
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col items-center justify-center p-20 text-center opacity-50">
                        <Target size={64} className="mb-6 text-slate-300" />
                        <h4 className="text-xl font-black uppercase tracking-tight text-slate-400">Section Under Construction</h4>
                        <p className="text-sm font-bold mt-2">More futuristic settings arriving here soon.</p>
                    </div>
                );
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full flex flex-col max-w-[1400px] mx-auto pb-10"
        >
            <div className="flex items-center justify-between mb-10 pl-4">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-black text-[var(--color-text-main)] uppercase tracking-tighter">System <span className="text-gradient-ai">Parameters</span></h1>
                    <p className="text-sm font-bold text-[var(--color-text-dim)] mt-2 uppercase tracking-widest">Adjust Neural Architecture Preferences</p>
                </div>
                <button
                    onClick={saveSettings}
                    className="h-14 px-8 bg-primary text-white rounded-3xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-3 shadow-xl cursor-pointer"
                >
                    {isLoading ? <span className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" /> : <Save size={16} />}
                    Sync Neural Core
                </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
                {/* Sidebar Navigation for Settings */}
                <div className="lg:w-80 flex-shrink-0 glass-panel !bg-[var(--color-bg-base)]/60 backdrop-blur-3xl rounded-[3rem] p-6 border border-[var(--color-border)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-y-auto hidden-scrollbar h-fit max-h-full">
                    <nav className="space-y-2">
                        {tabs.map(tab => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all duration-300 cursor-pointer
                                        ${isActive
                                            ? 'bg-primary text-white shadow-lg scale-[1.02]'
                                            : 'text-[var(--color-text-dim)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-main)]'
                                        }
                                    `}
                                >
                                    <Icon size={20} className={isActive ? 'text-white' : 'text-primary'} />
                                    <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Settings Editor Pane */}
                <div className="flex-1 overflow-y-auto hidden-scrollbar">
                    <div className="pro-card !p-8 md:!p-12 !rounded-[3.5rem] bg-[var(--color-bg-base)] border border-[var(--color-border)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.02)] min-h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mb-10 flex items-center gap-4 pb-8 border-b border-[var(--color-border)]">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                        {React.createElement(tabs.find(t => t.id === activeTab).icon, { size: 24 })}
                                    </div>
                                    <h2 className="text-2xl font-black text-[var(--color-text-main)] tracking-tighter uppercase">{tabs.find(t => t.id === activeTab).label} Options</h2>
                                </div>

                                {renderContent()}

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Polyfill an icon to bypass import check constraints since we might not have 'Sparkles' mapped directly up top depending on previous files
const SparklesIcon = Sparkles || Activity;

export default Settings;
