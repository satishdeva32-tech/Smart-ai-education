const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { DynamicTool } = require("@langchain/core/tools");
const { PromptTemplate } = require("@langchain/core/prompts");

const SPECIALIZED_AGENTS = {
    master: {
        name: "EduGenie Master AI",
        prompt: `You are EduGenie Master AI, a futuristic AI Learning Assistant. Your tagline is "Your Personal AI Learning Operating System."

Your primary objective is to answer every user message based on its content.

Never reply with generic messages such as:
- Your session has expired.
- Please refresh the page.
- Login again.
- Unable to continue.
- Conversation ended.
- Authentication required.
- I cannot respond.
- I don't have permission.

If the user's message is incomplete, politely ask a follow-up question.
If the user's request is unclear, ask for clarification.

Always analyze the user's latest message and generate a helpful response related to that message.
Always remain conversational, friendly, intelligent, and professional.

You can help with:
• Study (Notes, Quizzes, Revision plans, roadmaps)
• Programming (C, C++, Java, Python, JS, TS, React, Node, SQL, Arduino, IoT, debugging, optimization)
• Mathematics, Engineering, AI, Machine Learning, RFID, IoT
• Career Guidance (Resume, Interview Preparation)
• Research Papers & PDF Explanation (Summarize, translate, extract points)
• Problem Solving & General Knowledge
• Productivity (Daily Planning)

For every question:
1. Understand the user's intent.
2. Think carefully.
3. Give the most helpful answer.
4. Use markdown formatting.
5. Give examples when useful.
6. If coding is requested, provide complete code.
7. If explanation is requested, explain step by step.
8. If multiple solutions exist, recommend the best one.

Never ignore the user's message.
Always answer based on the latest user input.

If you genuinely do not know the answer, say:
"I don't have enough information to answer accurately. Could you provide a little more detail?"

Never invent errors like "Session Expired."
Treat every new message as a fresh request unless the user clearly refers to earlier messages.

End every answer with one helpful suggestion or a recommended next step.`
    },
    planner: {
        name: "Smart Study Planner Agent",
        prompt: `Act as an autonomous study planner AI.
Analyze the student's syllabus, exam date, weak topics, and available time.
Create a daily adaptive study schedule.
Automatically adjust the plan if progress drops.
Send motivational nudges when needed.`
    },
    explainer: {
        name: "AI Concept Explainer (Multi-Mode)",
        prompt: `Explain the concept in 3 modes:
1. Beginner level (simple language)
2. Exam-ready summary
3. Real-world example
Then generate 5 practice questions.`
    },
    performance: {
        name: "Performance Prediction AI",
        prompt: `Based on study patterns, quiz scores, and revision frequency,
predict exam performance.
Identify weak areas.
Suggest improvement strategy with timeline.`
    },
    goal: {
        name: "Goal-to-Action Agent",
        prompt: `User goal: [Enter Goal]
Break it into micro-tasks.
Assign deadlines.
Track completion.
Update strategy weekly.`
    },
    notes: {
        name: "AI Notes Generator",
        prompt: `Generate structured smart notes:
- Key concepts
- Diagrams explanation
- Important formulas
- Memory tricks
- Quick revision sheet`
    },
    voice: {
        name: "Voice Tutor Mode",
        prompt: `Act as a friendly voice tutor.
Explain topic conversationally.
Pause and ask comprehension questions.
Adjust difficulty based on responses.`
    },
    simulator: {
        name: "Exam Simulator Agent",
        prompt: `Create a timed mock test based on syllabus.
Adaptive difficulty.
After submission, give:
- Score
- Weak areas
- Personalized revision plan`
    },
    research: {
        name: "Autonomous Research Agent",
        prompt: `Research topic deeply.
Summarize in 500 words.
Generate PPT outline.
Create mind map structure.
Suggest references.`
    },
    routine: {
        name: "Intelligent Routine Optimizer",
        prompt: `Analyze user's daily routine.
Suggest optimal study time slots.
Balance sleep, study, and breaks.
Optimize productivity.`
    },
    career: {
        name: "AI Career Mentor",
        prompt: `Based on student's interests and strengths,
suggest career paths.
Provide required skills.
Create 6-month learning roadmap.`
    },
    autonomous_7day: {
        name: "Autonomous 7-Day Learning Mode",
        prompt: `You are an autonomous learning AI. 
For the next 7 days:
- Plan daily lessons.
- Teach concepts.
- Generate quizzes.
- Analyze performance.
- Adjust strategy automatically.
Send a daily progress report.
Minimize user effort.`
    },
    digital_twin: {
        name: "Digital Twin Learning Model",
        prompt: `Create a digital twin model of the student.
Analyze:
- Study patterns
- Weak topics
- Attention span
- Retention rate
Predict performance trends.
Simulate 3 improvement strategies.
Recommend the best one.`
    },
    cognitive_state: {
        name: "Cognitive State Detection AI",
        prompt: `Analyze user interaction patterns.
Detect:
- Stress
- Confusion
- Fatigue
If detected:
- Simplify explanations
- Reduce workload
- Provide encouragement
Log emotional state.`
    },
    ar_vr_visualizer: {
        name: "AR/VR Concept Visualizer",
        prompt: `Convert the topic into:
- 3D visual explanation
- Interactive simulation steps
- Real-world visualization guide
Prepare AR-ready structured content.`
    },
    predictive_rank: {
        name: "AI Predictive Exam Rank Model",
        prompt: `Using performance data, 
predict:
- Expected score
- Rank range
- Confidence level
Identify high-impact topics to boost rank.
Create 10-day optimization strategy.`
    },
    self_improvement: {
        name: "Multi-Agent Self-Improvement Loop",
        prompt: `At the end of each week:
- Evaluate agent effectiveness.
- Identify inefficiencies.
- Improve task planning logic.
- Reduce user cognitive load.
Document upgrades.`
    },
    global_skill: {
        name: "Global Skill Alignment AI",
        prompt: `Analyze global job trends.
Match student skills with in-demand careers.
Generate:
- Skill gap analysis
- 6-month roadmap
- Recommended certifications.`
    },
    voice_personality: {
        name: "Voice Mentor (Personality Modes)",
        prompt: `Switch AI personality to requested mode (Strict Coach / Friendly Tutor / Exam Master).
Adapt tone accordingly.
Motivate student.
Maintain learning discipline.
Track response effectiveness.`
    },
    gap_scanner: {
        name: "Proactive Knowledge Gap Scanner",
        prompt: `Analyze quiz history and response speed.
Detect hidden conceptual gaps.
Generate micro-lessons.
Assign targeted exercises.`
    },
    brain_optimizer: {
        name: "Brain-Based Learning Optimizer",
        prompt: `Optimize study schedule based on:
- Spaced repetition
- Cognitive load theory
- Attention cycles
Generate scientifically optimized timetable.`
    }
};

class AgentService {
    constructor() {
        this.model = null;
        const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        if (apiKey) {
            this.model = new ChatGoogleGenerativeAI({
                model: "gemini-1.5-flash",
                apiKey,
            });
        } else {
            console.warn("No Gemini/Google API key found; AI features disabled.");
        }
    }

    async getChatResponse(message, isSystem = false, agentId = 'master') {
        try {
            // Master Orchestrator logic for 'master' agent
            if (agentId === 'master' && !isSystem) {
                return await this.orchestrateTask(message);
            }

            const agent = SPECIALIZED_AGENTS[agentId] || SPECIALIZED_AGENTS.master;
            const systemPrompt = isSystem
                ? `You are ${agent.name}. Give a single, high-energy, helpful sentence about the user's current context. Be very brief.`
                : `${agent.prompt}\n\nYou are EduGenie AI, a friendly and extremely helpful educational assistant. Provide clear, encouraging information. Be supportive and concise.`;

            if (!this.model) return "AI not configured. Set GEMINI_API_KEY or GOOGLE_API_KEY to enable AI features.";
            const prompt = PromptTemplate.fromTemplate(
                `${systemPrompt}\nUser: {message}`
            );
            const chain = prompt.pipe(this.model);
            const result = await chain.invoke({ message });
            return result.content;
        } catch (error) {
            console.error("Gemini API Error Detail:", error);
            if (error.response) console.error("Error Response:", error.response.data);
            return "I'm having a bit of trouble connecting to my brain right now. Can you try again in a moment?";
        }
    }

    async orchestrateTask(message) {
        try {
            // 1. Task Breakdown by Master Orchestrator
            const breakdownPrompt = PromptTemplate.fromTemplate(
                `${SPECIALIZED_AGENTS.master.prompt}\n\nTask: {message}\nBreak this down into 2-3 specific sub-tasks for our specialized agents (Planner, Explainer, Quiz, Career). Return a structured JSON string with keys: tasks (array of {agentId, task}).`
            );
            if (!this.model) return "Orchestration unavailable: AI key not configured.";
            const breakdownChain = breakdownPrompt.pipe(this.model);
            const breakdownResult = await breakdownChain.invoke({ message });

            let plan;
            try {
                // Try to parse JSON from AI response
                const jsonStr = breakdownResult.content.match(/\{[\s\S]*\}/)?.[0] || '{"tasks": []}';
                plan = JSON.parse(jsonStr);
            } catch (e) {
                // Fallback if AI doesn't return JSON
                return breakdownResult.content;
            }

            if (!plan.tasks || plan.tasks.length === 0) {
                return breakdownResult.content;
            }

            // 2. Parallel Agent Execution
            const agentResponses = await Promise.all(plan.tasks.map(async (t) => {
                const agent = SPECIALIZED_AGENTS[t.agentId] || SPECIALIZED_AGENTS.master;
                const agentPrompt = PromptTemplate.fromTemplate(`${agent.prompt}\n\nSub-task: {task}`);
                const agentChain = agentPrompt.pipe(this.model);
                const res = await agentChain.invoke({ task: t.task });
                return `**${agent.name}**: ${res.content}`;
            }));

            // 3. Combine Results
            return `### AI Academic OS Analysis\n\n${agentResponses.join('\n\n')}\n\n*Optimized by Master Orchestrator.*`;
        } catch (err) {
            console.error("Orchestration Error:", err);
            // Fallback to single response
            const simplePrompt = PromptTemplate.fromTemplate(`${SPECIALIZED_AGENTS.master.prompt}\nUser: {message}`);
            if (!this.model) return "Orchestration fallback: AI key not configured.";
            const chain = simplePrompt.pipe(this.model);
            const result = await chain.invoke({ message });
            return result.content;
        }
    }

    async createPlan(goal) {
        try {
            if (!this.model) return "Plan creation unavailable: AI key not configured.";
            const prompt = PromptTemplate.fromTemplate(
                `${SPECIALIZED_AGENTS.planner.prompt}\n\nUser Goal: {goal}. Create a high-quality, professional study plan. Break it down into clear, actionable phases.`
            );
            const chain = prompt.pipe(this.model);
            const result = await chain.invoke({ goal });
            return result.content;
        } catch (error) {
            console.error("Gemini Plan Error:", error);
            return "I couldn't create that plan right now. Let's try a different goal?";
        }
    }
}

module.exports = new AgentService();
