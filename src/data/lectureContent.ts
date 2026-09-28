export interface LectureChapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: 'Overview' | 'Skills & Types' | 'Supervision & Time' | 'Assessment & Matrix';
  durationEst: string;
  summary: string;
  keyPoints: string[];
  transcript: string;
  teacherTip?: string;
}

export const LECTURE_CHAPTERS: LectureChapter[] = [
  {
    id: 'intro-ib-core',
    number: 1,
    title: 'The IB DP & The Central Core',
    subtitle: 'Location of the EE within the International Baccalaureate',
    category: 'Overview',
    durationEst: '1:45',
    summary: 'The IB comprises 4 programmes (PYP, MYP, DP, CP). Within the Diploma Programme (ages 16-19), the mandatory Central Core consists of the Extended Essay (EE), Theory of Knowledge (TOK), and CAS.',
    keyPoints: [
      'Four IB Levels: PYP (3–11), MYP (11–16), DP & CP (16–19).',
      'The DP Central Core is mandatory: Extended Essay, TOK, and CAS.',
      'EE and TOK are numerically assessed; CAS has qualitative learning outcomes.',
      'Students take 6 subject courses from 6 subject groups alongside the Core (up to 42 points).',
    ],
    transcript: `Hello everyone. Today's lecture is about the Extended Essay. The Extended Essay is the main part of the IB Diploma Programme. Part one will be an introduction about the location of the Extended Essay, the role of the Extended Essay, general expectations, types of Extended Essays, how it is supervised, and how it is assessed. Later, from part two onward, I will go for more explanation about different modules of the Extended Essay and more detail.

So let's start by introducing the International Baccalaureate, or IB. It's a global leader in international education and comprises four different levels. Level one is PYP, or Primary Years Programme, which covers the ages of 3 to 11. MYP, Middle Years Programme, covers the ages of 11 to 16. DP, Diploma Programme, and CP, Career-related Programme, cover the ages of 16 to 19.

Our focus today is on DP. DP, or Diploma Programme, has a central mandatory part comprising three different modules: Extended Essay, TOK, and CAS. The Extended Essay is the topic of today; I will go into more detail about that. TOK is Theory of Knowledge, and CAS is Creativity, Activity, Service. The Extended Essay and TOK are numerically assessed. CAS has its own special criteria for assessment—they are not numerical. Alongside the core, the students will take six different subjects from six different subject groups, like Math, Science, and so forth.`,
    teacherTip: 'Remember: 42 maximum points come from your 6 subjects (7 × 6), and 3 bonus points come from the EE + TOK matrix, totaling 45 points.',
  },
  {
    id: 'what-is-ee',
    number: 2,
    title: 'What the Extended Essay Is',
    subtitle: 'Scope, word count, and personal exploration',
    category: 'Overview',
    durationEst: '1:30',
    summary: 'The Extended Essay is an independent research project culminating in up to 4,000 words. It gives students ages 16–19 hands-on university-level research experience in a topic of genuine personal passion.',
    keyPoints: [
      'Independent research paper of up to 4,000 words (usually 3,000–4,000 words).',
      'Freedom of choice in scholarly resources and topic direction.',
      'Practical preparation for undergraduate university research.',
      'Opportunity to investigate an authentic personal interest beyond syllabus confines.',
    ],
    transcript: `Okay, today I will concentrate on the Extended Essay. Let's see what the Extended Essay is. The Extended Essay is an independent piece of research—independent because, regardless of the subject, you can go for an independent choice of resources—and it will culminate in up to 4,000 words. It could be between 3,000 to 4,000, but mostly students use the full capacity to fulfill the job.

What the Extended Essay provides:
Number one is practical preparation for undergraduate research for ages 16 to 19. Students really and practically experience how to do real research.
Number two is an opportunity for students to investigate a topic of personal interest. This is very important because, rather than mandatory topics, you can go for your personal field of interest and learn something about it.`,
    teacherTip: 'Do not choose a topic just because it sounds impressive; pick something you genuinely care about because you will be spending dozens of hours exploring it.',
  },
  {
    id: 'skills-developed',
    number: 3,
    title: 'Which Skills Are Grown',
    subtitle: 'Research questions, exploration, and structured argument',
    category: 'Skills & Types',
    durationEst: '1:25',
    summary: 'The Extended Essay develops four foundational academic capabilities: formulating cause-and-effect research questions, engaging in personal inquiry, communicating ideas, and defending a thesis statement.',
    keyPoints: [
      'Formulating a focused cause-and-effect Research Question.',
      'Engaging in an individual, self-driven inquiry.',
      'Synthesizing and communicating intricate academic concepts.',
      'Developing and defending a reasoned argument/thesis statement.',
    ],
    transcript: `Which skills are grown in the Extended Essay:
Number one is formulating an appropriate research question. You will learn how to make a research question from a topic. A research question generally has a format of cause and effect; from a topic, you will learn how to make a cause-and-effect research question.
Number two is engaging in a personal exploration of the topic. As I told you, it is a totally personal and individual research.
Number three is communicating ideas. In the workflow of your Extended Essay, you learn how to connect ideas and communicate them.
And at last, you will learn how to develop an argument. Argumentation is a main part of your research, so you will learn how to advocate for the general idea or thesis statement you have made. So in this research, you will learn different skills.`,
    teacherTip: 'A good research question is not descriptive; it must investigate a relationship between cause and effect with clear independent and dependent variables.',
  },
  {
    id: 'pathways-types',
    number: 4,
    title: 'Pathways & Types of EE',
    subtitle: 'Subject-focused vs. Interdisciplinary / World Studies',
    category: 'Skills & Types',
    durationEst: '1:10',
    summary: 'Students can take a subject-focused pathway within a single discipline (e.g., Physics, Chemistry, Math) or choose an interdisciplinary route combining two subjects (e.g., Digital Society + Psychology).',
    keyPoints: [
      'Subject-focused: Grounded in one specific IB discipline (Group 1 to Group 6).',
      'Interdisciplinary / World Studies: Connecting two or more fields.',
      'Examples: Digital Society + Psychology, or Computer Science + Physics.',
      'Must satisfy the specific subject methodological guides of the chosen discipline.',
    ],
    transcript: `Pathways of the Extended Essay, or different types of Extended Essays:
The Extended Essay could be subject-focused—for example, if you take it from Subject Group 4 (like Physics or Chemistry) or Group 5 (Mathematics), and so forth. It could also be interdisciplinary, where you combine two or more subjects. For example, you may take a project in Digital Society and Psychology, or you may combine Computer Science with Physics. It's up to you.`,
    teacherTip: 'Interdisciplinary World Studies essays must address an issue of contemporary global significance seen through a local manifestation.',
  },
  {
    id: 'supervisors-sessions',
    number: 5,
    title: 'Who Supervised & How It Works',
    subtitle: 'The 3-5 hours contact model and supervisor regulations',
    category: 'Supervision & Time',
    durationEst: '1:50',
    summary: 'Your supervisor must be a suitably qualified teacher at your school. You can consult external specialists or family, but only your school supervisor holds institutional accountability across the 3 to 5 hours of meetings.',
    keyPoints: [
      'Supervisor MUST be a suitably qualified teacher at your school.',
      'External specialists and parents may be consulted, but CANNOT be your official supervisor.',
      'Cycle: Informal introductory meeting → 1st Formal session → 2nd Formal session → Final Viva Voce.',
      'Total contact time is expected to be between 3 to 5 hours.',
    ],
    transcript: `Who can supervise your Extended Essay? Your Extended Essay supervisor will usually be a teacher at your school. But not just any teacher—he or she must be suitably qualified in the subject you have chosen for your Extended Essay. That's a very important property of the teacher you select as your supervisor. Lastly, you are allowed to consult with subject specialists—even your dad, your mom, or anybody else—as well as your supervisor. But they cannot take on the responsibility and role of your supervisor. So pay attention: a supervisor cannot be your dad or mom, unless they happen to be your teacher. If they are not, you can get a lot of help from them, but ultimately the responsibility lies with the supervisor, who is a teacher at your school.

How the Extended Essay is supervised:
First, you are supposed to have an informal meeting with your teacher. You will talk about the nature of your research, your research question, your topic, and so forth. Then you will prepare your first draft and go for the first formal session, then the second one, and then the last one, which is finalizing your paper (mostly oral rather than written), and then it is finished. It is generally expected to take between 3 to 5 hours.`,
    teacherTip: 'The concluding Viva Voce is a 20-30 minute oral interview where your supervisor verifies the authenticity of your work and assesses Criterion E (Engagement).',
  },
  {
    id: 'time-spent-reality',
    number: 6,
    title: 'How Much Time Is Spent',
    subtitle: 'The 40-hour IB guideline vs. the 70-80 hour Lab Reality',
    category: 'Supervision & Time',
    durationEst: '1:35',
    summary: 'The official IB recommendation is approximately 40 hours. However, as an IB Physics teacher, practical laboratory subjects (Physics, Chemistry, Biology) demand 70 to 80 hours due to experimental setups, data collection, and troubleshooting.',
    keyPoints: [
      'IB official recommendation: ~40 hours spread across IB studies.',
      'Theoretical & database subjects: 40 hours can be adequate.',
      'Experimental science subjects (Physics, Chemistry, Biology): 40h is NOT enough!',
      'Plan for 70 to 80 hours if conducting empirical school laboratory experiments.',
    ],
    transcript: `How much time is spent by a student on the Extended Essay? The IB recommends that you spend approximately 40 hours spread out over the course of your IB studies. But according to my experience as a Physics teacher, 40 hours for practical subjects like Physics, Chemistry, and Biology is not enough. As the nature of these subjects involves experiments in the school lab, you may need more than 40 hours—maybe 70, maybe 80. It depends on the nature of your research, so be careful about that. For theoretical or database-driven subjects, 40 hours could be enough.`,
    teacherTip: 'Lab experiments fail, equipment breaks, and calibrations take time. Factor in a 50% time contingency buffer for Group 4 experimental essays!',
  },
  {
    id: 'assessment-criteria',
    number: 7,
    title: 'The 34-Mark Assessment Criteria',
    subtitle: 'Focus, Knowledge, Critical Thinking, Presentation & Engagement',
    category: 'Assessment & Matrix',
    durationEst: '1:40',
    summary: 'The Extended Essay is marked out of 34 total points across five criteria. Critical Thinking (Criterion C) carries 12 marks—over 35% of the total essay weight.',
    keyPoints: [
      'Criterion A: Focus and Method (Max 6 marks)',
      'Criterion B: Knowledge and Understanding (Max 6 marks)',
      'Criterion C: Critical Thinking (Max 12 marks - 35% of total score!)',
      'Criterion D: Presentation (Max 4 marks)',
      'Criterion E: Engagement (Max 6 marks)',
      'Total: 34 Marks evaluated by external IB examiners.',
    ],
    transcript: `Assessment criteria: I will give you a list of criteria here, and later I will discuss them one by one in detail in coming videos. So let's just have a look at the criteria:
Focus and Method: Maximum 6 marks
Knowledge and Understanding: Maximum 6 marks
Critical Thinking: Very important—I will tell you what critical thinking is—it has a maximum of 12 marks
Presentation: Maximum 4 marks
Engagement: Maximum 6 marks
In total, an excellent Extended Essay will get 34 marks.`,
    teacherTip: 'Students often neglect Criterion C (12 marks). Description alone earns low marks; you must evaluate sources, discuss uncertainties, and critique your methodology.',
  },
  {
    id: 'grade-boundaries',
    number: 8,
    title: 'Grade Boundaries & The Failing Condition',
    subtitle: 'From Grade E (0-6) to Grade A (27-34)',
    category: 'Assessment & Matrix',
    durationEst: '1:45',
    summary: 'Extended Essays are marked externally on a scale of 0 to 34. Marks 0 to 6 result in an E (Elementary), which is a failing condition. 27 to 34 marks yield a prestigious Grade A.',
    keyPoints: [
      'External assessment: Evaluated by examiners outside your school.',
      'Grade A (Excellent): 27 to 34 marks',
      'Grade B (Good): 21 to 26 marks',
      'Grade C (Satisfactory): 14 to 20 marks',
      'Grade D (Mediocre): 7 to 13 marks',
      'Grade E (Elementary): 0 to 6 marks -> FAILING CONDITION (Diploma denied)!',
    ],
    transcript: `Look at how the Extended Essay is assessed: All Extended Essays are externally assessed. "Externally" means the examiner is not a teacher at your school; they are outside of your school. Look at this number line here between 0 and 34:
If you get 0 to a maximum of 6, it is regarded as an E (Elementary) and is a failing condition—it is not accepted, so you must get 7 or more.
7 to 13 is regarded as a D (Mediocre).
14 to 20 is regarded as a C (Satisfactory).
21 to a maximum of 26 is regarded as a B (Good).
27 to 34 is an A (Excellent).
So you have a target interval to get an A as an excellent student.`,
    teacherTip: 'Never leave an essay half-finished or submit unformatted drafts. Crossing from 6 to 7 marks is the difference between passing and failing the entire IB Diploma.',
  },
  {
    id: 'dp-core-matrix',
    number: 9,
    title: 'The DP Matrix: EE + TOK Bonus Points',
    subtitle: 'The 3 core points combination and the fatal Grade E rule',
    category: 'Assessment & Matrix',
    durationEst: '2:15',
    summary: 'The combination of EE and TOK awards up to 3 bonus points to reach the maximum 45 points. However, receiving an E in either EE or TOK is a failing condition that denies the diploma, even if you scored 42 in your subjects.',
    keyPoints: [
      '42 subject points (6 × 7) + 3 Core points = 45 maximum total score.',
      'A + A = 3 pts; A + B = 3 pts; B + B = 2 pts; A + C = 2 pts; B + C = 2 pts; A + D = 2 pts; B + D = 1 pt; C + C = 1 pt.',
      'D + C = 0 pts; D + D = 0 pts (diploma can still be awarded if points threshold met).',
      'CRITICAL: An E in either EE or TOK is a FAILING CONDITION. The IB Diploma will NOT be awarded!',
    ],
    transcript: `Let's have a look at DP grading. I told you we have six subject groups. These are the subjects you have taken from the first group, second group, third group, and so forth. As an excellent student, you might get 7 out of 7 from the first subject, the second, third, fourth, fifth, and sixth. Generally, an excellent student is expected to get 42 out of all six subjects.

What about TOK and the Extended Essay as part of the core? I told you the core of the IB comprises three modules: Extended Essay, TOK, and CAS. CAS is not numerically assessed, but the Extended Essay and TOK are combined together to provide an additional 3 points for you, bringing the maximum total mark to 45.

How are TOK and the Extended Essay combined together to provide those 3 points for you? Look at the combination:
If you get an A in the Extended Essay and an A in TOK simultaneously, you will get 3 points out of this combination.
An A and a B in either combination will also provide 3 points for you.
A combination of B and B will give you 2 points.
C and A will combine to provide 2 points.
B and C will give you 2 points.
C and C will give you 1 point.
D and C will give you 0 points.
D and D will give you 0 points.
D and B will provide 1 point.
D and A will give you 2 points.

So suppose that you get a D and a C, resulting in 0 points from the core. What happens? Nothing—you just lose the points from the core, but you can still get the diploma.

What about an E? If you get an E, it is very bad—an E is a failing condition. An E in either component will result in the diploma not being awarded. So you must be careful to avoid a failing condition. Rarely, students might end up with an E, but if it happens, it is a failing condition.`,
    teacherTip: 'Notice the nuance: getting D + D gives 0 bonus points, but does NOT fail you. Getting an E, however, blocks your diploma entirely!',
  },
  {
    id: 'deadlines-ns',
    number: 10,
    title: 'Submission Deadlines & Non-Submission (NS)',
    subtitle: 'The ultimate caution and concluding remarks',
    category: 'Assessment & Matrix',
    durationEst: '1:15',
    summary: 'Missing the final IB submission deadline results in NS (Not Submitted). Just like an E, failing to submit either the EE or TOK means the IB Diploma is automatically not awarded.',
    keyPoints: [
      'Missing the upload deadline leads to NS (Not Submitted).',
      'NS in either EE or TOK prevents the awarding of the IB Diploma.',
      'Core components are mandatory; subject scores cannot compensate for an unsubmitted Core paper.',
      'Upcoming video modules will delve into individual criteria and step-by-step drafting.',
    ],
    transcript: `The last thing I should remind you of is that if you do not submit your Extended Essay on time, it is regarded as NS (Not Submitted). If you do not submit your TOK essay on time, you will not be awarded your IB diploma. So on-time submission is very important; failure to submit either will result in a failure to receive the diploma. The core is mandatory, so you should take care of both.

Thank you for watching this video. In coming videos, I will cover all the details of the Extended Essay and its modules. See you!`,
    teacherTip: 'School internal deadlines are set several weeks ahead of the official IB portal upload to allow supervisor checks and RPPF completion. Respect them!',
  },
];

export interface CriterionInfo {
  code: 'A' | 'B' | 'C' | 'D' | 'E';
  name: string;
  maxMarks: number;
  weightPercent: string;
  summary: string;
  keyRequirements: string[];
  examinerAdvice: string;
}

export const ASSESSMENT_CRITERIA: CriterionInfo[] = [
  {
    code: 'A',
    name: 'Focus and Method',
    maxMarks: 6,
    weightPercent: '17.6%',
    summary: 'The topic, research question, and methodology must be clear, well-focused, and suitable for the chosen subject.',
    keyRequirements: [
      'Clear, stated research question in cause-and-effect format.',
      'Methodology appropriately outlined (primary experiment, secondary database, literary critique).',
      'Contextualized within the subject and contemporary academic discourse.',
    ],
    examinerAdvice: 'State your research question early in the introduction. Ensure it is narrow and measurable rather than broad.',
  },
  {
    code: 'B',
    name: 'Knowledge and Understanding',
    maxMarks: 6,
    weightPercent: '17.6%',
    summary: 'Demonstration of deep subject-specific terminology, foundational concepts, and relevant academic background.',
    keyRequirements: [
      'Appropriate use of disciplinary vocabulary and symbols.',
      'Accurate application of academic theories and models.',
      'Integration of credible primary and peer-reviewed sources.',
    ],
    examinerAdvice: 'Avoid generic explanations; integrate authoritative academic terminology native to your subject guide.',
  },
  {
    code: 'C',
    name: 'Critical Thinking',
    maxMarks: 12,
    weightPercent: '35.3%',
    summary: 'The largest single criterion (12 marks). Encompasses research analysis, critical discussion, source evaluation, and synthesis.',
    keyRequirements: [
      'Rigorous analysis of data, evidence, or texts.',
      'Consistent, reasoned argumentation advocating for the thesis.',
      'Evaluation of uncertainties, limitations, and alternative perspectives.',
      'Conclusion explicitly grounded in the presented findings.',
    ],
    examinerAdvice: 'Never merely report findings. Analyze why anomalies occurred, evaluate measurement uncertainties, and discuss counter-arguments.',
  },
  {
    code: 'D',
    name: 'Presentation',
    maxMarks: 4,
    weightPercent: '11.8%',
    summary: 'Formal academic layout, structure, table of contents, word count compliance (under 4,000 words), and consistent citation style.',
    keyRequirements: [
      'Title page, contents page, numbered pages, clear headings.',
      'Word count under 4,000 words (excluding bibliography, equations, tables).',
      'Consistent academic referencing style (APA, MLA, Chicago, etc.).',
    ],
    examinerAdvice: 'Exceeding 4,000 words is heavily penalized and examiners stop reading at 4,000 words.',
  },
  {
    code: 'E',
    name: 'Engagement',
    maxMarks: 6,
    weightPercent: '17.6%',
    summary: 'Student intellectual engagement and reflective thinking captured through the Reflections on Planning and Progress Form (RPPF) and Viva Voce.',
    keyPoints: [
      'Three written reflections on RPPF (~500 words total across 3 entries).',
      'Evidence of decision-making, resilience, overcoming research obstacles, and intellectual growth.',
      'Supervisor comments submitted alongside the RPPF.',
    ],
    examinerAdvice: 'Do not write simple diary logs ("today I wrote 500 words"). Reflect on intellectual breakthroughs, unexpected challenges, and how your thinking evolved.',
  } as any,
];

export const TOK_EE_MATRIX: { [key: string]: { [key: string]: { points: number; failing: boolean; label: string } } } = {
  A: {
    A: { points: 3, failing: false, label: '3 Points (Maximum)' },
    B: { points: 3, failing: false, label: '3 Points' },
    C: { points: 2, failing: false, label: '2 Points' },
    D: { points: 2, failing: false, label: '2 Points' },
    E: { points: 0, failing: true, label: 'FAILING CONDITION' },
  },
  B: {
    A: { points: 3, failing: false, label: '3 Points' },
    B: { points: 2, failing: false, label: '2 Points' },
    C: { points: 2, failing: false, label: '2 Points' },
    D: { points: 1, failing: false, label: '1 Point' },
    E: { points: 0, failing: true, label: 'FAILING CONDITION' },
  },
  C: {
    A: { points: 2, failing: false, label: '2 Points' },
    B: { points: 2, failing: false, label: '2 Points' },
    C: { points: 1, failing: false, label: '1 Point' },
    D: { points: 0, failing: false, label: '0 Points (Passing)' },
    E: { points: 0, failing: true, label: 'FAILING CONDITION' },
  },
  D: {
    A: { points: 2, failing: false, label: '2 Points' },
    B: { points: 1, failing: false, label: '1 Point' },
    C: { points: 0, failing: false, label: '0 Points (Passing)' },
    D: { points: 0, failing: false, label: '0 Points (Passing)' },
    E: { points: 0, failing: true, label: 'FAILING CONDITION' },
  },
  E: {
    A: { points: 0, failing: true, label: 'FAILING CONDITION' },
    B: { points: 0, failing: true, label: 'FAILING CONDITION' },
    C: { points: 0, failing: true, label: 'FAILING CONDITION' },
    D: { points: 0, failing: true, label: 'FAILING CONDITION' },
    E: { points: 0, failing: true, label: 'FAILING CONDITION' },
  },
};

export interface SampleResearchQuestion {
  subject: string;
  category: 'Experimental' | 'Theoretical' | 'Interdisciplinary';
  topic: string;
  cause: string;
  effect: string;
  scope: string;
  formulatedRQ: string;
}

export const SAMPLE_RESEARCH_QUESTIONS: SampleResearchQuestion[] = [
  {
    subject: 'Physics (Group 4)',
    category: 'Experimental',
    topic: 'Electrical resistivity & temperature in conductor alloys',
    cause: 'Temperature of Constantan alloy wire (20°C to 120°C)',
    effect: 'Electrical resistance and temperature coefficient of resistance (α)',
    scope: 'Constant cross-sectional diameter (0.28 mm) using a calibrated wheatstone bridge circuit',
    formulatedRQ: 'To what extent does temperature change between 20°C and 120°C affect the electrical resistance of Constantan alloy wire (0.28 mm diameter)?',
  },
  {
    subject: 'Chemistry (Group 4)',
    category: 'Experimental',
    topic: 'Enzyme kinetics & inhibitor concentration',
    cause: 'Concentration of copper(II) sulfate inhibitor (0.01M to 0.1M)',
    effect: 'Rate of hydrogen peroxide decomposition by catalase (V_max and K_m)',
    scope: 'Catalase extracted from Solanum tuberosum at standardized pH 7.0 and 25°C',
    formulatedRQ: 'How does the concentration of Cu²⁺ ions (0.01M to 0.10M) quantitatively affect the enzymatic reaction velocity of catalase in decomposing 3% H₂O₂?',
  },
  {
    subject: 'Mathematics (Group 5)',
    category: 'Theoretical',
    topic: 'Fractal dimension in epidemiological transmission models',
    cause: 'Spatial clustering coefficient in scale-free network graph',
    effect: 'Epidemic percolation threshold and reproduction number R₀',
    scope: 'Simulated SIR model across Barabási-Albert networks with N=10,000 nodes',
    formulatedRQ: 'How does varying the clustering coefficient of a Barabási–Albert scale-free network alter the epidemic percolation threshold in an SIR stochastic model?',
  },
  {
    subject: 'Interdisciplinary: Digital Society & Psychology',
    category: 'Interdisciplinary',
    topic: 'Algorithmic short-form video consumption & attention span',
    cause: 'Daily exposure duration to TikTok/Reels recommendation feeds (0h to 4h+)',
    effect: 'Sustained cognitive attention scores measured via the Continuous Performance Test (CPT-3)',
    scope: 'Adolescents aged 16–18 across a 4-week self-reported logging period',
    formulatedRQ: 'To what extent does daily duration of algorithmic short-form video consumption correlate with sustained attention performance among adolescents aged 16–18?',
  },
  {
    subject: 'Interdisciplinary: Computer Science & Physics',
    category: 'Interdisciplinary',
    topic: 'Numerical Runge-Kutta simulation of n-body gravitational orbits',
    cause: 'Integration step size (dt) in 4th-order Runge-Kutta (RK4) algorithm',
    effect: 'Orbital energy drift and conservation of angular momentum over 1,000 orbital periods',
    scope: 'Chaotic three-body Lagrange equilibrium point L4/L5 stability',
    formulatedRQ: 'How does the numerical step size in the RK4 integration algorithm affect total mechanical energy conservation during chaotic three-body gravitational simulation?',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the maximum word count permitted for the IB Extended Essay?',
    options: ['3,000 words', '3,500 words', '4,000 words', '5,000 words'],
    correctIndex: 2,
    explanation: 'The Extended Essay culminates in up to 4,000 words. Most students use the full 3,000 to 4,000 capacity.',
  },
  {
    id: 2,
    question: 'Which of the following describes the relationship between the 6 subjects and the Core points?',
    options: [
      '6 subjects provide 42 points; Core (EE + TOK) provides 3 points for a total of 45.',
      '6 subjects provide 40 points; Core provides 5 points for a total of 45.',
      'EE, TOK, and CAS each provide 1 point directly to the 42 subject points.',
      'The Core only serves as a tiebreaker for college admissions.',
    ],
    correctIndex: 0,
    explanation: 'Each of the 6 subjects is graded out of 7 (6 × 7 = 42 points). EE and TOK combine to provide up to 3 bonus points, making the maximum total 45.',
  },
  {
    id: 3,
    question: 'What happens if a student scores an E in either the Extended Essay or Theory of Knowledge (TOK)?',
    options: [
      'They receive 0 bonus points but still receive the IB Diploma if they have 24 points.',
      'They must pay an administrative fee to convert it to a D.',
      'It is an absolute FAILING CONDITION—the IB Diploma is not awarded regardless of total score.',
      'The supervisor can override it if CAS is completed.',
    ],
    correctIndex: 2,
    explanation: 'As emphasized by the teacher, receiving a Grade E in either the EE or TOK is a failing condition that denies the IB Diploma, even if the student scored 42 in subjects!',
  },
  {
    id: 4,
    question: 'Which assessment criterion carries the single largest mark weight in the Extended Essay?',
    options: [
      'Criterion A: Focus and Method (6 marks)',
      'Criterion B: Knowledge and Understanding (6 marks)',
      'Criterion C: Critical Thinking (12 marks)',
      'Criterion E: Engagement (6 marks)',
    ],
    correctIndex: 2,
    explanation: 'Criterion C (Critical Thinking) awards a maximum of 12 marks, which is over 35% of the total 34 marks.',
  },
  {
    id: 5,
    question: 'According to the physics teacher, how many hours should students anticipate for practical laboratory subjects (Physics, Chemistry, Biology)?',
    options: [
      'Exactly 40 hours as recommended by the IB',
      '15 to 25 hours',
      '70 to 80 hours due to experimental setups and lab trials',
      'Over 150 hours',
    ],
    correctIndex: 2,
    explanation: 'The teacher specifically highlights that while IB recommends ~40 hours, practical experimental science subjects require 70 to 80 hours because school lab experiments require setup, calibration, and trials.',
  },
  {
    id: 6,
    question: 'Who can officially serve as your Extended Essay supervisor?',
    options: [
      'Any family member who has a university degree in the field.',
      'An external university researcher or tutor.',
      'A teacher at your school suitably qualified in the chosen subject.',
      'Your peer review study group leader.',
    ],
    correctIndex: 2,
    explanation: 'Your supervisor must be a suitably qualified teacher at your school. You can consult external specialists or family, but they cannot assume supervisor accountability.',
  },
  {
    id: 7,
    question: 'What happens if you fail to submit your Extended Essay or TOK essay by the deadline?',
    options: [
      'You are marked as "NS" (Not Submitted) and will not be awarded the IB Diploma.',
      'Your score is automatically capped at a Grade C.',
      'You are granted an automatic 6-month extension with a 5-mark penalty.',
      'Your supervisor grades it internally instead of external IB examiners.',
    ],
    correctIndex: 0,
    explanation: 'Unsubmitted essays receive an "NS" (Not Submitted). Since both Core components are mandatory, an NS prevents the award of the IB Diploma.',
  },
  {
    id: 8,
    question: 'How many total marks are available for the Extended Essay, and what range constitutes a Grade A?',
    options: [
      'Total 30 marks; Grade A is 25-30',
      'Total 34 marks; Grade A is 27-34',
      'Total 36 marks; Grade A is 30-36',
      'Total 100 marks; Grade A is 85-100',
    ],
    correctIndex: 1,
    explanation: 'The Extended Essay is marked out of 34 total marks. The boundaries are: 0-6 (E), 7-13 (D), 14-20 (C), 21-26 (B), and 27-34 (A).',
  },
];
