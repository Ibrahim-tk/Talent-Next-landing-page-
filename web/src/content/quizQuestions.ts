import type { PillChoice } from "@gridline";

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: PillChoice[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "situation",
    question: "Where are you currently at in your career or journey?",
    subtitle: "Select the option that best describes your present situation.",
    options: [
      { value: "in-school", label: "In University or College" },
      { value: "early-career", label: "Early Career Professional (1–3 yrs)" },
      { value: "mid-senior", label: "Mid to Senior Contributor (4+ yrs)" },
      { value: "founder-freelance", label: "Founder / Independent Creator" },
      { value: "in-transition", label: "Actively Exploring a Major Pivot" },
    ],
  },
  {
    id: "primary-goal",
    question: "What is your primary goal for taking this assessment?",
    subtitle: "What are you hoping to uncover most from this process?",
    options: [
      { value: "uncover-blindspots", label: "Uncover hidden strengths and blind spots" },
      { value: "clarify-direction", label: "Clarify my next career milestone or role" },
      { value: "executive-readiness", label: "Assess readiness for senior leadership" },
      { value: "pitch-myself", label: "Learn how to pitch and articulate my unique value" },
    ],
  },
  {
    id: "peak-environment",
    question: "Which environment brings out your peak focus and energy?",
    subtitle: "Think about the conditions where your best work flows effortlessly.",
    options: [
      { value: "high-velocity", label: "High-velocity, fast-changing startup pace" },
      { value: "deep-focus", label: "Structured, autonomous deep-work periods" },
      { value: "collaborative", label: "High-touch collaborative team brainstorming" },
      { value: "analytical", label: "Data-driven, rigorous problem-solving rooms" },
    ],
  },
  {
    id: "problem-instinct",
    question: "When faced with high ambiguity, what is your first instinct?",
    subtitle: "How you naturally orient yourself when there is no playbook.",
    options: [
      { value: "hypothesize-test", label: "Build a rapid prototype or test to see what breaks" },
      { value: "synthesize-data", label: "Map out the landscape and synthesize available signals" },
      { value: "rally-people", label: "Convene key stakeholders to align on shared ground truth" },
      { value: "first-principles", label: "Strip the problem down to bare first principles" },
    ],
  },
  {
    id: "perceived-asset",
    question: "How do your closest peers usually describe your biggest asset?",
    subtitle: "The distinct advantage people immediately count on you for.",
    options: [
      { value: "calm-under-pressure", label: "Unshakable calm and clarity under intense pressure" },
      { value: "pattern-recognition", label: "Exceptional pattern recognition and foresight" },
      { value: "bias-to-action", label: "Relentless execution velocity and follow-through" },
      { value: "empathy-resonance", label: "Deep empathy and ability to mobilize diverse teams" },
    ],
  },
  {
    id: "strategy-execution",
    question: "What balance of strategy versus execution feels most natural?",
    subtitle: "Where your attention creates disproportionate leverage.",
    options: [
      { value: "vision-heavy", label: "80% Strategy & Architecture / 20% Direct Execution" },
      { value: "balanced-hybrid", label: "50% Strategic Planning / 50% Hands-on Building" },
      { value: "execution-heavy", label: "20% High-level Strategy / 80% Flawless Tactical Craft" },
    ],
  },
  {
    id: "team-role",
    question: "In high-stakes team dynamics, which role do you default to?",
    subtitle: "The posture you take when the team must deliver an important outcome.",
    options: [
      { value: "pacesetter", label: "The Pacesetter: setting the standard and driving momentum" },
      { value: "synthesizer", label: "The Synthesizer: connecting disparate ideas into cohesive vision" },
      { value: "stabilizer", label: "The Stabilizer: de-risking edge cases and ensuring operational rigor" },
      { value: "catalyst", label: "The Catalyst: challenging assumptions and unlocking creative breakthroughs" },
    ],
  },
  {
    id: "decision-speed",
    question: "What is your natural pace when making irreversible decisions?",
    subtitle: "How you balance conviction, speed, and validation.",
    options: [
      { value: "swift-intuitive", label: "Rapid and intuitive — adjust course on the fly" },
      { value: "deliberate-framework", label: "Methodical and framework-driven with stress testing" },
      { value: "consensus-aligned", label: "Consensus-oriented through rigorous peer debate" },
    ],
  },
  {
    id: "impact-dimension",
    question: "Which dimension of impact matters most to you in your next horizon?",
    subtitle: "The primary scorecard by which you define personal fulfillment.",
    options: [
      { value: "technical-mastery", label: "Reaching absolute technical or domain mastery" },
      { value: "organizational-scale", label: "Scaling enterprise systems and high-performing teams" },
      { value: "societal-influence", label: "Creating products that reshape how millions live or work" },
      { value: "autonomy-sovereignty", label: "Maximizing creative autonomy and personal sovereignty" },
    ],
  },
  {
    id: "learning-curve",
    question: "How do you master complex, unfamiliar territories?",
    subtitle: "Your personal acceleration mechanism for new domains.",
    options: [
      { value: "immersion", label: "Total immersion: building real projects from day one" },
      { value: "expert-dialogue", label: "Finding top practitioners and conducting deep debriefs" },
      { value: "literature-synthesis", label: "Systematic review of foundational literature and case studies" },
    ],
  },
  {
    id: "communication-medium",
    question: "Which communication format showcases your thinking at its sharpest?",
    subtitle: "How your ideas resonate with the highest fidelity.",
    options: [
      { value: "live-dialogue", label: "Unscripted, dynamic dialogue and whiteboard jam sessions" },
      { value: "structured-memo", label: "Carefully reasoned, narrative-driven written memos" },
      { value: "visual-narrative", label: "Compelling visual presentations and keynote storytelling" },
      { value: "working-demo", label: "A functional demo or model that speaks for itself" },
    ],
  },
  {
    id: "transformation-timeline",
    question: "What is your target timeline for your next career transformation?",
    subtitle: "How soon are you prepared to initiate your 30-minute agent session?",
    options: [
      { value: "immediately", label: "Immediately — ready within the next 7 days" },
      { value: "within-month", label: "Within the next 30 days" },
      { value: "next-quarter", label: "Over the next 1–3 months" },
      { value: "passive-curious", label: "Just gathering intelligence for future readiness" },
    ],
  },
];
