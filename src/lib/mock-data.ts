export const FIELDS = [
  "Biology",
  "Physics",
  "Chemistry",
  "Computer Science",
  "Engineering",
  "Medicine",
  "Mathematics",
  "Environmental Science",
  "Psychology",
  "Economics",
];

export type Researcher = {
  id: string;
  name: string;
  title: string;
  institution: string;
  field: string;
  citations: number;
  hIndex: number;
  verified: "Student" | "Researcher" | "Professor" | "PhD";
  skills: string[];
  openTo: string[];
  match: number;
};

export const researchers: Researcher[] = [
  {
    id: "r1",
    name: "Dr. Amara Osei",
    title: "Professor of Molecular Biology",
    institution: "ETH Zürich",
    field: "Biology",
    citations: 12480,
    hIndex: 48,
    verified: "Professor",
    skills: ["CRISPR", "Proteomics", "Confocal Imaging"],
    openTo: ["Mentorship", "Co-authorship"],
    match: 94,
  },
  {
    id: "r2",
    name: "Kenji Watanabe",
    title: "PhD Candidate, Quantum Optics",
    institution: "University of Tokyo",
    field: "Physics",
    citations: 860,
    hIndex: 12,
    verified: "PhD",
    skills: ["Cryogenics", "Python", "Qiskit"],
    openTo: ["Collaboration"],
    match: 88,
  },
  {
    id: "r3",
    name: "Lucia Ferrari",
    title: "Research Fellow, Climate Modelling",
    institution: "MIT",
    field: "Environmental Science",
    citations: 3120,
    hIndex: 24,
    verified: "Researcher",
    skills: ["CMIP6", "R", "Geospatial Analysis"],
    openTo: ["Collaboration", "Mentorship"],
    match: 82,
  },
  {
    id: "r4",
    name: "Samuel Adeyemi",
    title: "MSc Student, Machine Learning",
    institution: "University of Cape Town",
    field: "Computer Science",
    citations: 140,
    hIndex: 5,
    verified: "Student",
    skills: ["PyTorch", "NLP", "Graph Networks"],
    openTo: ["Internships", "Co-authorship"],
    match: 79,
  },
  {
    id: "r5",
    name: "Prof. Elena Volkova",
    title: "Chair of Medicinal Chemistry",
    institution: "Karolinska Institute",
    field: "Chemistry",
    citations: 20110,
    hIndex: 61,
    verified: "Professor",
    skills: ["Drug Design", "NMR", "Molecular Docking"],
    openTo: ["Mentorship", "Thesis Guidance"],
    match: 76,
  },
  {
    id: "r6",
    name: "Dr. Priya Nair",
    title: "Neuroscience Postdoc",
    institution: "Oxford",
    field: "Medicine",
    citations: 2410,
    hIndex: 19,
    verified: "Researcher",
    skills: ["fMRI", "MATLAB", "EEG"],
    openTo: ["Collaboration"],
    match: 71,
  },
];

export type Paper = {
  id: string;
  title: string;
  authors: string[];
  field: string;
  abstract: string;
  year: number;
  citations: number;
  reads: number;
  status: "Pre-print" | "Community Reviewed" | "Under Review";
  openAccess: boolean;
  doi: string;
  keywords: string[];
};

export const papers: Paper[] = [
  {
    id: "p1",
    title: "Sub-nanometer Imaging of Ribosomal Assembly Under Thermal Stress",
    authors: ["Amara Osei", "Jonas Weber"],
    field: "Biology",
    abstract:
      "We report cryo-EM reconstructions of ribosomal intermediates showing a previously unobserved chaperone-bound state that stabilises assembly at elevated temperatures.",
    year: 2025,
    citations: 143,
    reads: 8420,
    status: "Community Reviewed",
    openAccess: true,
    doi: "10.55921/lablink.2025.0143",
    keywords: ["cryo-EM", "ribosome", "thermal stress"],
  },
  {
    id: "p2",
    title: "Error-Mitigated Variational Eigensolvers on Noisy Photonic Hardware",
    authors: ["Kenji Watanabe"],
    field: "Physics",
    abstract:
      "A hybrid error-mitigation scheme reduces estimator bias by 41% on a 12-mode photonic processor without additional circuit depth.",
    year: 2026,
    citations: 27,
    reads: 3110,
    status: "Pre-print",
    openAccess: true,
    doi: "10.55921/lablink.2026.0027",
    keywords: ["quantum computing", "VQE", "photonics"],
  },
  {
    id: "p3",
    title: "Regional Downscaling of Monsoon Variability Using Transformer Ensembles",
    authors: ["Lucia Ferrari", "Samuel Adeyemi"],
    field: "Environmental Science",
    abstract:
      "Transformer-based downscaling outperforms classical statistical methods across 38 South Asian catchments in extreme-precipitation skill scores.",
    year: 2025,
    citations: 61,
    reads: 5290,
    status: "Under Review",
    openAccess: false,
    doi: "10.55921/lablink.2025.0061",
    keywords: ["climate", "deep learning", "monsoon"],
  },
  {
    id: "p4",
    title: "Selective Kinase Inhibitors Derived from Marine Alkaloid Scaffolds",
    authors: ["Elena Volkova", "Priya Nair"],
    field: "Chemistry",
    abstract:
      "Twelve novel scaffolds were docked and synthesised; three show sub-micromolar selectivity against JAK2 with favourable ADME profiles.",
    year: 2024,
    citations: 208,
    reads: 11040,
    status: "Community Reviewed",
    openAccess: true,
    doi: "10.55921/lablink.2024.0208",
    keywords: ["drug discovery", "kinase", "docking"],
  },
  {
    id: "p5",
    title: "Graph Neural Priors for Low-Resource Scientific Literature Retrieval",
    authors: ["Samuel Adeyemi"],
    field: "Computer Science",
    abstract:
      "We introduce a citation-graph prior that improves recall@20 by 17 points for under-indexed regional journals.",
    year: 2026,
    citations: 9,
    reads: 1480,
    status: "Pre-print",
    openAccess: true,
    doi: "10.55921/lablink.2026.0009",
    keywords: ["retrieval", "GNN", "open science"],
  },
  {
    id: "p6",
    title: "Longitudinal EEG Markers of Cognitive Fatigue in Shift Workers",
    authors: ["Priya Nair"],
    field: "Medicine",
    abstract:
      "Theta/alpha ratio drift predicts subjective fatigue scores with an AUC of 0.83 across a 14-week cohort study.",
    year: 2025,
    citations: 44,
    reads: 3980,
    status: "Community Reviewed",
    openAccess: true,
    doi: "10.55921/lablink.2025.0044",
    keywords: ["EEG", "fatigue", "cohort study"],
  },
];

export type FeedPost = {
  id: string;
  author: string;
  role: string;
  time: string;
  type: "Research Post" | "Lab Update" | "Hypothesis" | "Article" | "Poll";
  body: string;
  tags: string[];
  reactions: Record<string, number>;
  comments: { author: string; text: string }[];
  poll?: { question: string; options: { label: string; votes: number }[] };
};

export const REACTIONS = ["Insightful", "Groundbreaking", "Needs Review", "Agree", "Disagree"] as const;

export const feedPosts: FeedPost[] = [
  {
    id: "f1",
    author: "Dr. Amara Osei",
    role: "Professor · ETH Zürich",
    time: "2h",
    type: "Lab Update",
    body: "Day 41 of the thermal-stress run: chaperone-bound intermediates are reproducible across three independent preps. Raw micrographs are going open-access tonight.",
    tags: ["cryo-EM", "OpenData"],
    reactions: { Insightful: 84, Groundbreaking: 31, "Needs Review": 4, Agree: 22, Disagree: 1 },
    comments: [
      { author: "Kenji Watanabe", text: "Any chance you'll share the motion-correction parameters?" },
    ],
  },
  {
    id: "f2",
    author: "Samuel Adeyemi",
    role: "MSc Student · UCT",
    time: "6h",
    type: "Hypothesis",
    body: "Hypothesis: citation-graph priors will help most where indexing is sparsest, meaning regional journals should see the largest recall gains. Looking for critique before I commit the compute budget.",
    tags: ["Hypothesis Board", "Retrieval"],
    reactions: { Insightful: 46, Groundbreaking: 7, "Needs Review": 12, Agree: 19, Disagree: 5 },
    comments: [{ author: "Lucia Ferrari", text: "Control for journal age too — it confounds indexing depth." }],
  },
  {
    id: "f3",
    author: "Prof. Elena Volkova",
    role: "Professor · Karolinska",
    time: "1d",
    type: "Poll",
    body: "For early-stage screening in academic labs, which approach gives the best cost-to-signal ratio right now?",
    tags: ["Poll", "Drug Discovery"],
    reactions: { Insightful: 55, Groundbreaking: 3, "Needs Review": 2, Agree: 30, Disagree: 8 },
    comments: [],
    poll: {
      question: "Best early-stage screening approach",
      options: [
        { label: "Virtual docking first", votes: 142 },
        { label: "Fragment-based screening", votes: 98 },
        { label: "DEL libraries", votes: 51 },
        { label: "Phenotypic assays", votes: 77 },
      ],
    },
  },
  {
    id: "f4",
    author: "Lucia Ferrari",
    role: "Research Fellow · MIT",
    time: "2d",
    type: "Article",
    body: "Wrote a long-form piece on why downscaling benchmarks quietly reward overfitting, and what a fair evaluation protocol would look like for regional climate models.",
    tags: ["Climate", "Methodology"],
    reactions: { Insightful: 121, Groundbreaking: 14, "Needs Review": 6, Agree: 63, Disagree: 9 },
    comments: [{ author: "Dr. Priya Nair", text: "The leakage section should be required reading." }],
  },
];

export const professors = researchers.filter((r) => r.verified === "Professor");

export const courses = [
  {
    id: "c1",
    title: "Research Methodology from Question to Publication",
    level: "Beginner",
    lessons: 24,
    hours: 9,
    instructor: "Dr. Amara Osei",
    progress: 64,
    field: "General",
  },
  {
    id: "c2",
    title: "Scientific Writing: Abstracts, Papers, Literature Reviews",
    level: "Intermediate",
    lessons: 18,
    hours: 7,
    instructor: "Prof. Elena Volkova",
    progress: 30,
    field: "General",
  },
  {
    id: "c3",
    title: "Statistics for Experimentalists in R",
    level: "Intermediate",
    lessons: 32,
    hours: 14,
    instructor: "Lucia Ferrari",
    progress: 0,
    field: "Mathematics",
  },
  {
    id: "c4",
    title: "Python for Scientific Computing",
    level: "Beginner",
    lessons: 28,
    hours: 11,
    instructor: "Samuel Adeyemi",
    progress: 88,
    field: "Computer Science",
  },
  {
    id: "c5",
    title: "Advanced Lab Techniques: Cell Culture & Imaging",
    level: "Advanced",
    lessons: 21,
    hours: 12,
    instructor: "Dr. Priya Nair",
    progress: 12,
    field: "Biology",
  },
  {
    id: "c6",
    title: "Quantum Algorithms for Researchers",
    level: "Expert",
    lessons: 26,
    hours: 16,
    instructor: "Kenji Watanabe",
    progress: 0,
    field: "Physics",
  },
];

export const grants = [
  {
    id: "g1",
    name: "Horizon Open Science Fellowship",
    funder: "European Commission",
    amount: "€180,000",
    deadline: "2026-09-15",
    field: "All fields",
    stage: "Postdoc",
  },
  {
    id: "g2",
    name: "Undergraduate Research Seed Grant",
    funder: "LabLink Foundation",
    amount: "$8,000",
    deadline: "2026-08-30",
    field: "All fields",
    stage: "Undergraduate",
  },
  {
    id: "g3",
    name: "Climate Resilience Data Award",
    funder: "Global Climate Trust",
    amount: "$120,000",
    deadline: "2026-10-02",
    field: "Environmental Science",
    stage: "PhD+",
  },
  {
    id: "g4",
    name: "AI for Health Discovery Fund",
    funder: "Wellcome / DeepMind",
    amount: "£250,000",
    deadline: "2026-11-20",
    field: "Medicine",
    stage: "Any",
  },
  {
    id: "g5",
    name: "Quantum Hardware Travel Scholarship",
    funder: "IEEE Quantum",
    amount: "$4,500",
    deadline: "2026-08-11",
    field: "Physics",
    stage: "Student",
  },
];

export const events = [
  {
    id: "e1",
    title: "LabLink Global Symposium 2026",
    type: "Virtual Conference",
    date: "Aug 14–16, 2026",
    attendees: 4820,
    host: "LabLink",
  },
  {
    id: "e2",
    title: "Science Hackathon: Antibiotic Resistance",
    type: "Hackathon",
    date: "Aug 22, 2026",
    attendees: 940,
    host: "Karolinska Institute",
  },
  {
    id: "e3",
    title: "Journal Club: Transformer Downscaling",
    type: "Journal Club",
    date: "Weekly · Thursdays",
    attendees: 210,
    host: "Lucia Ferrari",
  },
  {
    id: "e4",
    title: "AMA with a NASA Exoplanet Team",
    type: "AMA",
    date: "Sep 03, 2026",
    attendees: 6100,
    host: "NASA Ames",
  },
  {
    id: "e5",
    title: "Virtual Poster Session: Undergraduate Research",
    type: "Poster Session",
    date: "Sep 19, 2026",
    attendees: 1380,
    host: "LabLink Students",
  },
];

export const projects = [
  {
    id: "pr1",
    name: "Thermal Ribosome Atlas",
    lead: "Dr. Amara Osei",
    members: 6,
    progress: 72,
    milestone: "Cryo-EM dataset 3 complete",
    open: true,
    needs: ["Image processing", "Python"],
  },
  {
    id: "pr2",
    name: "Monsoon Downscaling Benchmark",
    lead: "Lucia Ferrari",
    members: 4,
    progress: 45,
    milestone: "Baseline models trained",
    open: true,
    needs: ["Climate data", "PyTorch"],
  },
  {
    id: "pr3",
    name: "Open Kinase Inhibitor Library",
    lead: "Prof. Elena Volkova",
    members: 9,
    progress: 88,
    milestone: "Manuscript draft under internal review",
    open: false,
    needs: ["Medicinal chemistry"],
  },
];

export const reviewQueue = [
  {
    id: "rv1",
    title: "Error-Mitigated Variational Eigensolvers on Noisy Photonic Hardware",
    field: "Physics",
    due: "5 days",
    blind: true,
    matchReason: "Matches your keywords: quantum computing, error mitigation",
  },
  {
    id: "rv2",
    title: "Regional Downscaling of Monsoon Variability Using Transformer Ensembles",
    field: "Environmental Science",
    due: "9 days",
    blind: false,
    matchReason: "Matches your skills: deep learning, geospatial analysis",
  },
];

export const badges = [
  { name: "First Paper", earned: true },
  { name: "100 Citations", earned: true },
  { name: "Top Reviewer", earned: true },
  { name: "Mentor of the Month", earned: false },
  { name: "Open Data Champion", earned: true },
  { name: "1000 Citations", earned: false },
];

export const leaderboard = [
  { name: "Prof. Elena Volkova", field: "Chemistry", rp: 18420 },
  { name: "Dr. Amara Osei", field: "Biology", rp: 16110 },
  { name: "Lucia Ferrari", field: "Environmental Science", rp: 12980 },
  { name: "Dr. Priya Nair", field: "Medicine", rp: 9440 },
  { name: "Kenji Watanabe", field: "Physics", rp: 7320 },
];

export const citationTrend = [
  { year: "2021", citations: 42 },
  { year: "2022", citations: 118 },
  { year: "2023", citations: 246 },
  { year: "2024", citations: 431 },
  { year: "2025", citations: 688 },
  { year: "2026", citations: 902 },
];
