import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, Zap, Bot, ChevronLeft, LayoutGrid, Wand2, BookOpen, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import useAIStore from '../store/useAIStore';
import useAuthStore from '../store/useAuthStore';
import { API_URL } from '../config';
import AgentSelector, { AGENTS } from './AgentSelector';

const QUICK_ACTIONS = [
    { label: "📚 Explain Topic", action: "explain" },
    { label: "📝 Generate Notes", action: "notes" },
    { label: "💻 Write Code", action: "code" },
    { label: "🐞 Debug Code", action: "debug" },
    { label: "📄 Summarize PDF", action: "pdf" },
    { label: "❓ Quiz Me", action: "quiz" },
    { label: "🧠 AI Tutor", action: "tutor" },
    { label: "🎯 Study Plan", action: "mission" },
    { label: "📊 Progress Report", action: "progress" },
    { label: "🚀 Build Project", action: "project" },
    { label: "🎤 Voice Tutor", action: "voice" },
    { label: "💼 Career Coach", action: "career" },
    { label: "🔍 Research Paper", action: "research" },
    { label: "🌐 Translate", action: "translate" },
    { label: "⚡ Quick Revision", action: "revision" },
    { label: "📈 Learning Roadmap", action: "roadmap" }
];

const parseInlineFormatting = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-black text-primary">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, index) => {
        if (line.trim().startsWith('━━━') || line.trim() === '---') {
            return <div key={index} className="border-t border-[var(--color-border)] my-3 w-full opacity-60" />;
        }
        if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
            const content = line.replace(/^[\*\-]\s*/, '');
            return (
                <ul key={index} className="list-disc pl-5 my-1 text-inherit">
                    <li className="text-sm font-semibold leading-relaxed">{parseInlineFormatting(content)}</li>
                </ul>
            );
        }
        if (line.trim().startsWith('###')) {
            return <h4 key={index} className="text-sm font-black uppercase tracking-tight mt-3 mb-1 text-primary">{parseInlineFormatting(line.replace('###', '').trim())}</h4>;
        }
        if (line.trim().startsWith('##')) {
            return <h3 key={index} className="text-base font-black uppercase tracking-tight mt-4 mb-2 text-primary">{parseInlineFormatting(line.replace('##', '').trim())}</h3>;
        }
        return <p key={index} className="my-1 leading-relaxed text-sm font-semibold">{parseInlineFormatting(line)}</p>;
    });
};

const AIAssistant = () => {
    const isAssistantOpen = useAIStore(state => state.isAssistantOpen);
    const setAssistantOpen = useAIStore(state => state.setAssistantOpen);
    const [view, setView] = useState('chat'); // 'chat' or 'agents'
    const [activeAgent, setActiveAgent] = useState('master');
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const recognitionRef = useRef(null);
    const scrollRef = useRef(null);
    const { token, user } = useAuthStore();

    useEffect(() => {
        const userName = user?.name?.split(' ')[0] || 'Deva';
        setChat([
            {
                sender: 'ai',
                text: `🧠 **EduGenie Master AI**

━━━━━━━━━━━━━━━━━━━━━━

Good Afternoon, ${userName}.

**Neural Scan Complete.**

**Today's Learning Potential:** 96%

**Recommended Mission:**
* [ ] Complete 3 Lessons
* [ ] Finish 2 Coding Challenges
* [ ] Review DBMS
* [ ] Practice Aptitude

**Estimated XP Gain:** +185 XP

━━━━━━━━━━━━━━━━━━━━━━

How can I assist you today?`
            }
        ]);
    }, [user]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setMessage(transcript);
                handleSend(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, [isSpeaking]);

    const activeLesson = useAIStore(state => state.activeLesson);
    const lastActiveLessonRef = useRef(null);

    useEffect(() => {
        if (activeLesson && activeLesson !== lastActiveLessonRef.current) {
            lastActiveLessonRef.current = activeLesson;
            // If the assistant isn't open, open it
            if (!isAssistantOpen) setAssistantOpen(true);

            // Auto-send the context if it's a nudge
            if (activeLesson.aiInfo) {
                handleSend(`Regarding "${activeLesson.title}": ${activeLesson.aiInfo}`);
            }
        }
    }, [activeLesson, isAssistantOpen, setAssistantOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chat]);

    const handleSend = async (textToSend = message) => {
        if (textToSend.trim() && !isLoading) {
            const userMsg = { sender: 'user', text: textToSend };
            setChat((prev) => [...prev, userMsg]);
            setMessage("");
            setIsLoading(true);

            try {
                const response = await axios.post(`${API_URL}/api/agent/chat`,
                    { message: textToSend, agentId: activeAgent },
                    { 
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true 
                    }
                );

                const aiMsg = { sender: 'ai', text: response.data.data };
                setChat((prev) => [...prev, aiMsg]);
                if (isSpeaking) speak(aiMsg.text);
            } catch (error) {
                console.error("AI Assistant Error:", error);

                let errorText = "I couldn't process that request at this instant. Could you tell me more about what you're trying to learn?";

                setChat((prev) => [...prev, {
                    sender: 'ai',
                    text: errorText
                }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleQuickAction = (action) => {
        let text = "";
        switch (action) {
            case 'explain': text = "Explain this concept in a very simple way."; break;
            case 'notes': text = "Generate structured smart notes for this topic."; break;
            case 'code': text = "Write code to solve my programming question."; break;
            case 'debug': text = "Can you help me debug this code?"; break;
            case 'pdf': text = "Summarize the uploaded PDF document."; break;
            case 'quiz': text = "Create a 5-question practice quiz for me."; break;
            case 'tutor': text = "Act as my personal AI Tutor. What should I learn next?"; break;
            case 'mission': text = "What is today's mission and how should I start?"; break;
            case 'progress': text = "Analyze my study progress and performance."; break;
            case 'project': text = "Suggest a web development project to build."; break;
            case 'voice': text = "Start Voice Tutor Mode and teach me step-by-step."; break;
            case 'career': text = "Act as my Career Coach and review my path."; break;
            case 'research': text = "Extract findings and summarize a research paper topic."; break;
            case 'translate': text = "Translate this text or document for me."; break;
            case 'revision': text = "Give me a quick revision sheet for my exams."; break;
            case 'roadmap': text = "Recommend a detailed learning roadmap for my goals."; break;
            default: return;
        }
        handleSend(text);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    const speak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    const currentAgentData = AGENTS.find(a => a.id === activeAgent) || { name: 'EduGenie Master AI', icon: <Bot size={28} /> };

    return (
        <>
            <AnimatePresence>
                {isAssistantOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                        className="fixed bottom-0 right-0 md:bottom-24 md:right-10 w-full h-[100dvh] md:w-[450px] md:h-[700px] z-50 overflow-hidden flex flex-col md:rounded-[2.5rem] bg-[var(--color-bg-base)]/90 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-[var(--color-border)] p-6 flex justify-between items-center relative overflow-hidden">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                className="absolute -top-10 -right-10 opacity-10 text-primary"
                            >
                                <Sparkles size={120} />
                            </motion.div>
                            <div className="flex items-center gap-4 relative z-10">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setView(view === 'chat' ? 'agents' : 'chat')}
                                    className="w-12 h-12 rounded-[1.25rem] bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group text-[var(--color-text-main)] hover:bg-[var(--color-bg-subtle)]"
                                >
                                    {view === 'chat' ? <LayoutGrid size={24} className="group-hover:rotate-90 transition-transform" /> : <ChevronLeft size={24} />}
                                </motion.button>
                                <div>
                                    <h3 className="font-black tracking-tight leading-tight flex items-center gap-2 text-[var(--color-text-main)]">
                                        {view === 'chat' ? currentAgentData.name : 'Choose Your Specialist'}
                                    </h3>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-1.5 mt-1">
                                        <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                                        {view === 'chat' ? 'Active AI Session' : 'Multi-Agent Suite'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 relative z-10">
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsSpeaking(!isSpeaking)}
                                    className="p-2.5 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:bg-primary/10 hover:text-primary transition-colors text-[var(--color-text-dim)]"
                                >
                                    {isSpeaking ? <Volume2 size={16} /> : <VolumeX size={16} />}
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setAssistantOpen(false)}
                                    className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-500 transition-colors"
                                >
                                    <X size={16} strokeWidth={3} />
                                </motion.button>
                            </div>
                        </div>

                        {view === 'chat' ? (
                            <>
                                {/* Chat Body */}
                                <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide">
                                    {chat.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`p-4 rounded-[1.5rem] text-sm font-medium max-w-[85%] leading-relaxed shadow-sm ${msg.sender === 'user'
                                                ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-tr-none shadow-[0_10px_20px_rgba(108,99,255,0.2)]'
                                                : 'glass-panel !rounded-[1.5rem] !rounded-tl-none border-[var(--color-border)] text-[var(--color-text-main)] shadow-sm'
                                                }`}>
                                                {msg.sender === 'user' ? msg.text : renderFormattedText(msg.text)}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex justify-start"
                                        >
                                            <div className="glass-panel !rounded-[1.5rem] !rounded-tl-none border-[var(--color-border)] p-4 flex gap-1 items-center h-12">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Quick Actions */}
                                <div className="px-6 py-3 overflow-x-auto scrollbar-hide flex gap-2 border-t border-[var(--color-border)] bg-[var(--color-bg-base)] max-w-full">
                                    {QUICK_ACTIONS.map((btn) => (
                                        <button 
                                            key={btn.action} 
                                            onClick={() => handleQuickAction(btn.action)} 
                                            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[10px] font-black uppercase tracking-wider text-[var(--color-text-dim)] hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                                        >
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Input Area */}
                                <div className="p-6 bg-[var(--color-bg-subtle)]/50 backdrop-blur-xl border-t border-[var(--color-border)] relative">
                                    <div className="relative flex items-center gap-3">
                                        <motion.input
                                            whileFocus={{ scale: 1.01 }}
                                            type="text"
                                            placeholder={`Message ${currentAgentData.name}...`}
                                            className="w-full bg-[var(--color-bg-base)] border-2 border-[var(--color-border)] focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-[1.5rem] pl-5 pr-20 py-4 text-sm font-semibold outline-none transition-all shadow-inner text-[var(--color-text-main)] placeholder:text-[var(--color-text-dim)]"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        />
                                        <div className="absolute right-2 flex items-center gap-1">
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={toggleListening}
                                                className={`p-2.5 rounded-xl transition-all ${isListening ? 'bg-rose-500 text-white shadow-lg animate-pulse' : 'text-[var(--color-text-dim)] hover:text-primary hover:bg-primary/10'}`}
                                            >
                                                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                                            </motion.button>
                                            <motion.button
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleSend()}
                                                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-[1rem] p-3 shadow-lg shadow-primary/20"
                                            >
                                                <Send size={16} strokeWidth={3} className="-ml-0.5" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6 pb-0">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Select Specialist Neural Net</p>
                                </div>
                                <AgentSelector
                                    activeAgent={activeAgent}
                                    onSelect={(id) => {
                                        setActiveAgent(id);
                                        setView('chat');
                                        const agent = AGENTS.find(a => a.id === id);
                                        setChat(prev => [...prev, { sender: 'ai', text: `Agent ${agent.name} is now active. How can I help you with ${agent.desc.toLowerCase()}?` }]);
                                    }}
                                />
                                <div className="p-6">
                                    <div className="glass-panel !rounded-[1.5rem] p-5 border border-primary/20 flex items-center gap-4 bg-gradient-to-r from-primary/5 to-transparent">
                                        <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(108,99,255,0.2)]">
                                            <BarChart2 size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-[var(--color-text-main)]">Deep Learning Analytics</h4>
                                            <p className="text-[10px] font-bold text-[var(--color-text-dim)] mt-1 uppercase tracking-wider">Predictive scoring active</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60]">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAssistantOpen(!isAssistantOpen)}
                    className="glass-panel !rounded-full !px-5 !py-3 flex items-center gap-3 relative group border-2 border-white/20 hover:border-primary/50 shadow-[0_0_20px_rgba(108,99,255,0.3)] transition-all bg-[var(--color-bg-base)]/80 backdrop-blur-xl"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-20 blur-md rounded-full -z-10"
                    />
                    <div className="relative w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors border border-primary/20">
                        <Sparkles size={18} />
                    </div>
                    <span className="text-sm font-black tracking-widest uppercase text-[var(--color-text-main)] pr-2">Edu AI</span>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-success border-2 border-[var(--color-bg-base)]"></span>
                    </span>
                </motion.button>
            </div>
        </>
    );
};

export default AIAssistant;
