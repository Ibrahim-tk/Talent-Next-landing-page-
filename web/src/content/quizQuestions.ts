import type { PillChoice } from "@gridline";

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  options: PillChoice[];
}

/* Supplied copy, reproduced verbatim from the What's Next quiz. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "own-business",
    question: "Have you ever thought about running your own business instead of just working for someone else?",
    options: [
      { value: "yes", label: "Yes. I'm ready to see what might fit my skills." },
      { value: "maybe", label: "Maybe. I'm interested in learning more about what it takes to be a leader." },
      { value: "no", label: "No. I'm strictly looking for a traditional role where I can grow." },
    ],
  },
  {
    id: "first-instinct",
    question: "You're part of a team that's been given a challenge with almost no instructions. What's your first instinct?",
    options: [
      { value: "ask-questions", label: "Ask a few questions so you understand the bigger picture first." },
      { value: "start-progress", label: "Start making progress and figure it out as you go." },
      { value: "watch-then-help", label: "Watch how everyone else approaches it, then jump in where you can help most." },
      { value: "align-team", label: "Get everyone together and decide the best approach before jumping in." },
    ],
  },
  {
    id: "timeline",
    question: "If the right opportunity was in front of you, what is your timeline for a change?",
    options: [
      { value: "now", label: "I'm ready right now." },
      { value: "3-6-months", label: "I'm looking in the next 3–6 months." },
      { value: "exploring", label: "I'm just exploring for the future." },
    ],
  },
  {
    id: "truest-today",
    question: "Which statement feels the truest today?",
    options: [
      { value: "more-control", label: "I want more control over my future." },
      { value: "finding-fit", label: "I'm still figuring out where I fit best." },
      { value: "bigger-impact", label: "I want to make a bigger impact." },
    ],
  },
  {
    id: "challenge-energy",
    question: "Which type of challenge gives you the most energy?",
    options: [
      { value: "group-goal", label: "Helping a group accomplish something together." },
      { value: "learn-new", label: "Learning something you've never done before." },
      { value: "improve-existing", label: "Improving something that's already working." },
      { value: "hard-problems", label: "Solving problems nobody else wants to solve." },
    ],
  },
  {
    id: "free-month",
    question: "If you suddenly had one completely free month, what sounds the most exciting?",
    options: [
      { value: "try-projects", label: "Try several different projects before deciding what's next." },
      { value: "build-business", label: "Build something that could make money." },
      { value: "travel-learn", label: "Travel, learn, and experience new things." },
      { value: "bring-people", label: "Bring people together to create something meaningful." },
    ],
  },
  {
    id: "friends-describe",
    question: "Your friends would probably describe you as…",
    options: [
      { value: "curious", label: "Curious—You're eager to learn and explore new ideas." },
      { value: "reliable", label: "Reliable—You're someone people can count on." },
      { value: "motivated", label: "Motivated—You're energized and lead by example." },
      { value: "strategic", label: "Strategic—The one who makes plans happen." },
    ],
  },
  {
    id: "off-plan",
    question: "When things don't go according to plan, you're the person who...",
    options: [
      { value: "new-way", label: "Finds a different way forward." },
      { value: "rally", label: "Gets everyone moving in the same direction." },
      { value: "diagnose", label: "Figures out why things went wrong." },
      { value: "fix", label: "Starts fixing the problem." },
    ],
  },
  {
    id: "fulfilling-path",
    question: "Which type of career path, regardless of pay, sounds the most fulfilling to you?",
    options: [
      { value: "growth", label: "Working somewhere with endless opportunities to grow." },
      { value: "explore-passion", label: "Exploring different opportunities until you find your passion." },
      { value: "create-own", label: "Creating something that's yours." },
      { value: "change-lives", label: "Growing an organization that changes lives." },
    ],
  },
  {
    id: "new-organization",
    question: "You're joining a brand-new organization. Which opportunity sounds the most exciting?",
    options: [
      { value: "learn-everything", label: "Learning every part of how the organization works." },
      { value: "shape-culture", label: "Helping shape the culture and direction." },
      { value: "talented-people", label: "Working with talented people who challenge you." },
      { value: "build-from-ground", label: "Helping build something from the ground up." },
    ],
  },
  {
    id: "compliment",
    question: "Which compliment would mean the most to you?",
    options: [
      { value: "judgement", label: "People trust your judgement." },
      { value: "make-happen", label: "You make ideas happen." },
      { value: "always-learning", label: "You're always learning." },
      { value: "think-bigger", label: "You think bigger than most." },
    ],
  },
  {
    id: "successful-week",
    question: "You finish a long week feeling successful because...",
    options: [
      { value: "comfort-zone", label: "You stepped outside your comfort zone." },
      { value: "helped-others", label: "You helped other people succeed." },
      { value: "accomplished", label: "You accomplished a lot." },
      { value: "discovered-self", label: "You discovered something new about yourself." },
    ],
  },
];
