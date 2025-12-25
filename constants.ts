import { ChecklistCategory, AIActionType } from './types';

export const INITIAL_CHECKLIST: ChecklistCategory[] = [
  {
    id: 'strategy',
    title: 'Phase 1: Strategy & Alignment',
    items: [
      {
        id: 'audience-persona',
        text: 'Define Target Audience & Pain Points',
        description: 'Who are you writing for? What keeps them up at night?',
        isCompleted: false,
        expertTip: 'Focus on the "Job to be Done". People do not buy a drill; they buy a hole in the wall. What is the specific outcome they want?'
      },
      {
        id: 'keyword-research',
        text: 'Identify High-Value Keywords',
        description: 'Find 3-5 keywords with good volume and low competition.',
        isCompleted: false,
        aiAction: AIActionType.SEO_KEYWORDS,
        expertTip: 'Target "long-tail" keywords (4+ words). They often convert 2.5x better than broad terms because the intent is clearer.'
      },
      {
        id: 'content-goal',
        text: 'Set a Specific Content Goal',
        description: 'Is this for brand awareness, leads, or direct sales?',
        isCompleted: false,
        expertTip: 'Pick ONE metric to measure success. If you try to optimize for shares, clicks, and reads simultaneously, you will fail at all of them.'
      }
    ]
  },
  {
    id: 'ideation',
    title: 'Phase 2: AI-Assisted Ideation',
    items: [
      {
        id: 'brainstorm-topics',
        text: 'Generate 10 Topic Ideas',
        description: 'Use AI to diverge and find angles you hadn\'t thought of.',
        isCompleted: false,
        aiAction: AIActionType.GENERATE_IDEAS,
        expertTip: 'Look for "Polarizing" topics. Agreeing with everyone gets you ignored. What is a common industry belief you disagree with?'
      },
      {
        id: 'select-format',
        text: 'Choose Best Format',
        description: 'Blog post, LinkedIn carousel, Twitter thread, or Video script?',
        isCompleted: false,
        expertTip: 'Match format to intent. "How-to" works best for search (Blog/Video). "Thought Leadership" works best for social (LinkedIn/Twitter).'
      },
      {
        id: 'craft-hooks',
        text: 'Write 3 "Scroll-Stopping" Hooks',
        description: 'The first sentence is 80% of the success.',
        isCompleted: false,
        aiAction: AIActionType.GENERATE_HOOKS,
        expertTip: 'Use the "Curiosity Gap". Tell them enough to be interested, but leave enough out that they MUST click to satisfy the itch.'
      }
    ]
  },
  {
    id: 'creation',
    title: 'Phase 3: Drafting & Assembly',
    items: [
      {
        id: 'outline-structure',
        text: 'Create a Detailed Outline',
        description: 'Don\'t let AI ramble. Give it a skeleton to put meat on.',
        isCompleted: false,
        expertTip: 'Ensure every section header delivers a mini-promise. Headers should be skimmable and intriguing on their own.'
      },
      {
        id: 'generate-draft',
        text: 'Generate First Draft',
        description: 'Run your prompt. Focus on "Input quality = Output quality".',
        isCompleted: false,
        expertTip: 'Treat AI as a junior copywriter. It produces the raw clay; you are the sculptor. Never copy-paste directly without reading aloud.'
      },
      {
        id: 'fact-check',
        text: 'Human Fact-Check & Verification',
        description: 'Verify all statistics, quotes, and claims. AI hallucinates.',
        isCompleted: false,
        expertTip: 'Link to primary sources. It boosts SEO authority and builds trust with your human readers.'
      }
    ]
  },
  {
    id: 'refinement',
    title: 'Phase 4: Human Polish (The "Secret Sauce")',
    items: [
      {
        id: 'inject-personality',
        text: 'Inject Personal Stories/Voice',
        description: 'This is why people hire experts. Add your unique perspective.',
        isCompleted: false,
        aiAction: AIActionType.POLISH_CONTENT,
        expertTip: 'People buy from people. Share a specific failure or lesson you learned related to this topic. Vulnerability builds connection.'
      },
      {
        id: 'formatting',
        text: 'Format for Skimmability',
        description: 'Use bolding, bullet points, and short paragraphs.',
        isCompleted: false,
        expertTip: 'Wall of text = Death. Keep paragraphs under 3 lines. Use bold text to guide the "scanner" eye down the page.'
      },
      {
        id: 'cta-check',
        text: 'Add a Clear Call-to-Action',
        description: 'What should the reader do next?',
        isCompleted: false,
        expertTip: 'Don\'t be shy. If you provided value, you earned the right to ask. "Join 5,000+ others" is better than "Subscribe".'
      }
    ]
  },
  {
    id: 'distribution',
    title: 'Phase 5: Distribution & Repurposing',
    items: [
      {
        id: 'repurpose-social',
        text: 'Repurpose for LinkedIn/Twitter',
        description: 'Turn your long-form content into native social posts.',
        isCompleted: false,
        aiAction: AIActionType.REPURPOSE_CONTENT,
        expertTip: 'Don\'t just drop a link. Rewrite the core insight as a standalone post. Platforms penalize posts that send users away.'
      },
      {
        id: 'repurpose-video',
        text: 'Create Short-Form Video Script',
        description: 'Convert your main points into a 60-second vertical video script (TikTok/Reels).',
        isCompleted: false,
        aiAction: AIActionType.REPURPOSE_CONTENT,
        expertTip: 'Focus on a visual hook in the first 3 seconds. Use the "Problem-Agitation-Solution" framework compressed into 150 words.'
      },
      {
        id: 'create-visuals',
        text: 'Create Visual Assets',
        description: 'Design a thumbnail, carousel slides, or a chart.',
        isCompleted: false,
        aiAction: AIActionType.GENERATE_IMAGE,
        expertTip: 'Visuals stop the scroll. A simple bar chart or "tweet screenshot" often outperforms stock photography by 300%.'
      },
      {
        id: 'engage-community',
        text: 'Schedule & Community Engagement',
        description: 'Post when your audience is awake and reply to comments.',
        isCompleted: false,
        expertTip: 'The first hour is critical. Reply to every comment with a question to double your reach via the algorithm.'
      }
    ]
  }
];

export const INITIAL_CHART_DATA = [
  { name: 'Strategy', value: 20 },
  { name: 'Ideation', value: 20 },
  { name: 'Creation', value: 20 },
  { name: 'Polish', value: 20 },
  { name: 'Distrib', value: 20 },
];