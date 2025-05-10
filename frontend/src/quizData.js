// quizData.js
export const quizData = {
  title: "Are You Secretly Falling Behind in Your Research?",
  description:
    "Discover what 87% of Master's & PhD students don't realize until it's too late.",
  introText:
    "Most research students are falling behind — but they don't realize it until it's too late. This quick diagnostic quiz will show you where you stand in just 60 seconds. Be warned: the results might hit hard — but they could save your academic life.",
  questions: [
    {
      id: 1,
      text: "How many hours a week do you currently spend on research-related tasks?",
      options: [
        {
          id: 1,
          text: "1–5 hours (I'm overwhelmed or procrastinating)",
          trigger: "Time pressure, feeling behind, overwhelm",
        },
        {
          id: 2,
          text: "6–10 hours (I'm trying, but it's not enough)",
          trigger: "Time pressure, feeling behind, overwhelm",
        },
        {
          id: 3,
          text: "10–15 hours (still behind)",
          trigger: "Time pressure, feeling behind, overwhelm",
        },
        {
          id: 4,
          text: "15+ hours (still barely keeping up)",
          trigger: "Time pressure, feeling behind, overwhelm",
        },
      ],
    },
    {
      id: 2,
      text: "How confident are you that you'll finish your thesis/dissertation on time?",
      options: [
        {
          id: 1,
          text: "100% (I'm ahead)",
          trigger: "Self-doubt, forecasting failure",
        },
        {
          id: 2,
          text: "75% (I might be okay)",
          trigger: "Self-doubt, forecasting failure",
        },
        {
          id: 3,
          text: "50% (Unsure)",
          trigger: "Self-doubt, forecasting failure",
        },
        {
          id: 4,
          text: "Below 50% (I'm worried)",
          trigger: "Self-doubt, forecasting failure",
        },
      ],
    },
    {
      id: 3,
      text: "Are you currently using AI tools or automation to speed up writing, literature review, or referencing?",
      options: [
        {
          id: 1,
          text: "Yes, but it's overwhelming",
          trigger: "Fear of missing out (others have tools, I don't)",
        },
        {
          id: 2,
          text: "No, I don't know how",
          trigger: "Fear of missing out (others have tools, I don't)",
        },
        {
          id: 3,
          text: "I've tried, but it's confusing",
          trigger: "Fear of missing out (others have tools, I don't)",
        },
        {
          id: 4,
          text: "No, I'm doing everything manually",
          trigger: "Fear of missing out (others have tools, I don't)",
        },
      ],
    },
    {
      id: 4,
      text: "Have you ever considered paying someone to write or assist with your thesis/dissertation?",
      options: [
        {
          id: 1,
          text: "Yes (already spent money)",
          trigger: "Ethics + vulnerability exposure",
        },
        {
          id: 2,
          text: "Yes (but scared of plagiarism)",
          trigger: "Ethics + vulnerability exposure",
        },
        {
          id: 3,
          text: "No, but I feel desperate sometimes",
          trigger: "Ethics + vulnerability exposure",
        },
        { id: 4, text: "Never", trigger: "Ethics + vulnerability exposure" },
      ],
    },
    {
      id: 5,
      text: "How do you organize your references and research materials?",
      options: [
        {
          id: 1,
          text: "All over the place",
          trigger: "Chaos and inefficiency = frustration trigger",
        },
        {
          id: 2,
          text: "Manually, very slowly",
          trigger: "Chaos and inefficiency = frustration trigger",
        },
        {
          id: 3,
          text: "Using some tools, still messy",
          trigger: "Chaos and inefficiency = frustration trigger",
        },
        {
          id: 4,
          text: "Perfectly optimized (rare)",
          trigger: "Chaos and inefficiency = frustration trigger",
        },
      ],
    },
    {
      id: 6,
      text: "What would finishing your research 10x faster mean to you?",
      options: [
        { id: 1, text: "Less stress & anxiety", trigger: "Emotional payoff" },
        {
          id: 2,
          text: "Better grades & supervisor trust",
          trigger: "Emotional payoff",
        },
        {
          id: 3,
          text: "Free time and mental clarity",
          trigger: "Emotional payoff",
        },
        { id: 4, text: "All of the above", trigger: "Emotional payoff" },
      ],
    },
    {
      id: 7,
      text: "Did you know most students spend $500–$2,000+ on ghostwriters, editors, or AI tools during their research?",
      options: [
        {
          id: 1,
          text: "Yes, I've done it",
          trigger: "Anchoring the value of your $49.99 eBook",
        },
        {
          id: 2,
          text: "Yes, and it's insane",
          trigger: "Anchoring the value of your $49.99 eBook",
        },
        {
          id: 3,
          text: "No, that's shocking",
          trigger: "Anchoring the value of your $49.99 eBook",
        },
        {
          id: 4,
          text: "I don't want to do that",
          trigger: "Anchoring the value of your $49.99 eBook",
        },
      ],
    },
    {
      id: 8,
      text: "What if there was a step-by-step eBook to help you do your research 10x faster — ethically, affordably, and in control — for just $49.99?",
      options: [
        {
          id: 1,
          text: "That would be a total lifesaver",
          trigger: "Clear value contrast, emotional relief",
        },
        {
          id: 2,
          text: "I need that right now",
          trigger: "Clear value contrast, emotional relief",
        },
        {
          id: 3,
          text: "Why didn't I hear about this earlier?",
          trigger: "Clear value contrast, emotional relief",
        },
        {
          id: 4,
          text: "I'm ready to get it",
          trigger: "Clear value contrast, emotional relief",
        },
      ],
    },
  ],
  result: {
    headline:
      "You're Likely Losing Time, Energy, and Control — Every Single Day",
    subheadline:
      "Based on your answers, you're either already behind or dangerously close. And the truth is, most students in your shoes never finish — or pay thousands trying to catch up.",
    solutionText:
      "But now you have an edge: WritePlus is the tool thousands of students are using to reverse years of struggle — in just days. You can either keep grinding... or start winning.",
    ctaText: "Get WritePlus for Just $49.99 — Stop Falling Behind Today",
    ctaSubtext: "Skip the burnout, keep your ethics, and finish with clarity.",
  },
};
