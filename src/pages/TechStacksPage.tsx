import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { SectionId } from '../types';
import {
  BackNavIcon,
  ForwardNavIcon,
  UpFolderIcon,
  PropertiesNavIcon,
  DetailsViewIcon,
  ListViewIcon,
  LargeIconsViewIcon,
  FoldersToggleIcon,
} from '../components/Icons';
import './TechStacksPage.css';

export type SkillClassification = 'Demonstrated' | 'Learning / Coursework';

export interface SkillItem {
  id: string;
  name: string;
  classification: SkillClassification;
  type: string;
  usedIn: string;
  evidence: string;
  projectTitle?: string;
  projectSectionId?: SectionId;
}

export interface SkillCategory {
  id: string;
  name: string;
  path: string;
  classification: SkillClassification;
  description: string;
  items: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages',
    path: 'C:\\Technical Skills\\Languages',
    classification: 'Demonstrated',
    description: 'Demonstrated programming, querying, and markup languages backed by repository projects and internships.',
    items: [
      {
        id: 'python',
        name: 'Python',
        classification: 'Demonstrated',
        type: 'Programming Language',
        usedIn: 'CogniFocus (video capture & facial mesh tracking), Startup Valuation Engine (stacking pipelines), CNN Image Authenticity Detection, Intelligent Email Triage',
        evidence: 'Primary implementation language across CogniFocus, TS-ML-Contest notebook, ai_image_detector.keras, and email triage environment.',
        projectTitle: 'CogniFocus',
        projectSectionId: 'projects/cognifocus',
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        classification: 'Demonstrated',
        type: 'Strongly-Typed Language',
        usedIn: 'LOGESH_OS retro operating system simulation, state machine routing, component models, and Supabase database client typing',
        evidence: 'Strict tsconfig.json compiler target, types.ts interfaces, and complete frontend desktop application code.',
        projectTitle: 'LOGESH_OS',
        projectSectionId: 'about',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        classification: 'Demonstrated',
        type: 'Scripting Language',
        usedIn: 'Interactive browser event handling, Web Audio API synthesis for Snake arcade audio, and headless Chrome verification suites',
        evidence: 'src/components/SnakeApp.tsx Web Audio synthesizer and scratch/*.mjs test runners.',
        projectTitle: 'Snake Arcade',
        projectSectionId: 'about',
      },
      {
        id: 'sql',
        name: 'SQL',
        classification: 'Demonstrated',
        type: 'Relational Query Language',
        usedIn: 'Retech Data Analytics internship: relational queries on sales and customer transaction databases',
        evidence: 'Formulated relational filtering, table joins, aggregation queries, and reporting across 500+ records.',
        projectTitle: 'Retech Internship',
      },
      {
        id: 'html',
        name: 'HTML',
        classification: 'Demonstrated',
        type: 'Markup Language',
        usedIn: 'LOGESH_OS semantic DOM structure, accessibility ARIA dialog roles, form controls, and retro audio integration',
        evidence: 'index.html entry document and accessible component JSX trees across all OS windows.',
        projectTitle: 'LOGESH_OS',
        projectSectionId: 'about',
      },
      {
        id: 'css',
        name: 'CSS',
        classification: 'Demonstrated',
        type: 'Style Sheet Language',
        usedIn: 'Authentic Windows 95/98/2000 beveled styling, CRT pixel rendering, custom scrollbars, and mobile layout engine',
        evidence: 'src/styles/global.css, App.css, BrowserWindow.css, and responsive CSS architecture with 0px overflow.',
        projectTitle: 'LOGESH_OS',
        projectSectionId: 'about',
      },
    ],
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    path: 'C:\\Technical Skills\\Machine Learning',
    classification: 'Demonstrated',
    description: 'Supervised regression and classification architectures, gradient boosting, and out-of-fold validation.',
    items: [
      {
        id: 'stacking-ensemble',
        name: 'Stacking Ensemble Regression',
        classification: 'Demonstrated',
        type: 'ML Architecture',
        usedIn: 'Startup Valuation Prediction Engine: combining diverse inductive biases from LightGBM, XGBoost, and CatBoost with RidgeCV (OOF R² 0.70708)',
        evidence: 'TS-ML-Contest notebook: out-of-fold prediction blending and RidgeCV meta-estimator training.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'gradient-boosting',
        name: 'Gradient Boosted Decision Trees',
        classification: 'Demonstrated',
        type: 'ML Algorithm',
        usedIn: 'Startup Valuation Prediction Engine: sequential boosting base estimators modeling complex non-linear funding patterns',
        evidence: 'Evaluated LightGBM, XGBoost, and CatBoost models with up to 1,500 estimators per model.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'feature-engineering',
        name: 'Feature Engineering & Domain Ratios',
        classification: 'Demonstrated',
        type: 'ML Methodology',
        usedIn: 'Startup Valuation Engine: operational startup age, capital velocity, investment-per-investor, and log1p investment transforms',
        evidence: 'Engineered 5 mathematical domain features to reduce skewness and improve model variance.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'cross-validation',
        name: 'Stratified & K-Fold Cross-Validation',
        classification: 'Demonstrated',
        type: 'Validation Technique',
        usedIn: 'Startup Valuation Engine (5-fold shuffled CV across 10 random seeds) & Leave-One-Subject-Out in CogniFocus',
        evidence: 'Out-of-fold matrix generation preventing data leakage across training iterations.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'text-classification',
        name: 'Text Classification (TF-IDF + Naive Bayes)',
        classification: 'Demonstrated',
        type: 'ML Methodology',
        usedIn: 'Intelligent Email Triage: probabilistic multinomial classification of messages into urgency and category classes',
        evidence: 'TF-IDF vectorizer matrix and MultinomialNB classifier pipeline.',
        projectTitle: 'Intelligent Email Triage',
        projectSectionId: 'projects/email-triage',
      },
      {
        id: 'model-evaluation',
        name: 'Classification & Model Evaluation',
        classification: 'Demonstrated',
        type: 'Validation Methodology',
        usedIn: 'Technohacks Edutech internship: logistic regression, decision trees, confusion matrix, precision, recall, and accuracy benchmarks',
        evidence: 'Internship benchmarking reports comparing baseline classifier performance.',
        projectTitle: 'Technohacks Internship',
      },
    ],
  },
  {
    id: 'deep-learning-cv',
    name: 'Deep Learning & Computer Vision',
    path: 'C:\\Technical Skills\\Deep Learning & Computer Vision',
    classification: 'Demonstrated',
    description: 'Convolutional neural networks, real-time facial mesh tracking, and computer vision preprocessing pipelines.',
    items: [
      {
        id: 'cnn',
        name: 'Convolutional Neural Networks (CNN)',
        classification: 'Demonstrated',
        type: 'Deep Learning Architecture',
        usedIn: 'CNN-Based Image Authenticity Detection: Conv2D, MaxPooling2D, Flatten, and Dense layers distinguishing real from AI images',
        evidence: 'Trained neural network compiled with binary cross-entropy, saved as ai_image_detector.keras.',
        projectTitle: 'Image Authenticity Detection',
        projectSectionId: 'projects/image-authenticity',
      },
      {
        id: 'mediapipe',
        name: 'MediaPipe',
        classification: 'Demonstrated',
        type: 'Vision / ML Framework',
        usedIn: 'CogniFocus: real-time detection and 3D geometric tracking of 468 facial mesh coordinate points per video frame',
        evidence: 'Real-time Face Mesh landmark detection loop extracting eye coordinate streams.',
        projectTitle: 'CogniFocus',
        projectSectionId: 'projects/cognifocus',
      },
      {
        id: 'opencv',
        name: 'OpenCV',
        classification: 'Demonstrated',
        type: 'Computer Vision Library',
        usedIn: 'Real-time webcam video stream capture, color space conversion (BGR to RGB), spatial resizing, and image normalization',
        evidence: 'Webcam capture loop in CogniFocus and spatial preprocessing in Image Authenticity Detection.',
        projectTitle: 'CogniFocus',
        projectSectionId: 'projects/cognifocus',
      },
      {
        id: 'tensorflow-keras',
        name: 'TensorFlow & Keras',
        classification: 'Demonstrated',
        type: 'Deep Learning Framework',
        usedIn: 'CNN architecture specification, layer compilation, backpropagation training loops, and model export',
        evidence: 'Model artifact ai_image_detector.keras and Google Colab training notebook.',
        projectTitle: 'Image Authenticity Detection',
        projectSectionId: 'projects/image-authenticity',
      },
      {
        id: 'image-preprocessing',
        name: 'Image Preprocessing & Normalization',
        classification: 'Demonstrated',
        type: 'Computer Vision Technique',
        usedIn: 'Standardizing arbitrary input dimensions, scaling RGB pixel values to [0, 1] floating-point tensors, and label encoding',
        evidence: 'Vectorized preprocessing pipeline producing consistent input tensors for neural inference.',
        projectTitle: 'Image Authenticity Detection',
        projectSectionId: 'projects/image-authenticity',
      },
    ],
  },
  {
    id: 'libraries-frameworks',
    name: 'ML Libraries & Frameworks',
    path: 'C:\\Technical Skills\\ML Libraries & Frameworks',
    classification: 'Demonstrated',
    description: 'Open-source gradient boosting, tabular manipulation, and numerical computing frameworks.',
    items: [
      {
        id: 'scikit-learn',
        name: 'scikit-learn',
        classification: 'Demonstrated',
        type: 'Machine Learning Library',
        usedIn: 'RidgeCV meta-regressor, train_test_split(), CountVectorizer/TF-IDF, MultinomialNB, and Leave-One-Subject-Out cross-validation',
        evidence: 'Core ML utility across Startup Valuation Engine, Image Authenticity, and Email Triage.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'lightgbm',
        name: 'LightGBM',
        classification: 'Demonstrated',
        type: 'Gradient Boosting Library',
        usedIn: 'Fast histogram-based gradient boosted decision tree base model for startup valuation prediction',
        evidence: 'Trained up to 1,500 estimators with 0.03 learning rate in TS-ML-Contest ensemble.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'xgboost',
        name: 'XGBoost',
        classification: 'Demonstrated',
        type: 'Gradient Boosting Library',
        usedIn: 'Exact and histogram-based gradient boosted tree base model with max depth 6 for startup valuation prediction',
        evidence: 'Trained 1,500 estimators with learning rate 0.03 in TS-ML-Contest ensemble.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'catboost',
        name: 'CatBoost',
        classification: 'Demonstrated',
        type: 'Gradient Boosting Library',
        usedIn: 'Gradient boosting algorithm with native handling for categorical variables (Industry, Country) in startup valuations',
        evidence: 'Trained 1,500 iterations with 0.03 learning rate in TS-ML-Contest ensemble.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'pandas',
        name: 'Pandas',
        classification: 'Demonstrated',
        type: 'Data Manipulation Library',
        usedIn: 'Tabular dataframe cleaning, missing value imputation, one-hot categorical encoding, and out-of-fold prediction matrices',
        evidence: 'Data processing workflows across Startup Valuation, CogniFocus, and Retech internship.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'numpy',
        name: 'NumPy',
        classification: 'Demonstrated',
        type: 'Numerical Computing Library',
        usedIn: 'Vectorized Euclidean norm calculations for Eye Aspect Ratio, multidimensional tensor conversion, and log1p transforms',
        evidence: 'Geometric calculations in CogniFocus and array math in TS-ML-Contest.',
        projectTitle: 'CogniFocus',
        projectSectionId: 'projects/cognifocus',
      },
      {
        id: 'nltk',
        name: 'NLTK',
        classification: 'Demonstrated',
        type: 'Natural Language Toolkit',
        usedIn: 'Lexical processing: tokenizing raw email texts, removing English stopwords, and normalizing punctuation',
        evidence: 'Text preprocessing pipeline in Intelligent Email Triage.',
        projectTitle: 'Intelligent Email Triage',
        projectSectionId: 'projects/email-triage',
      },
    ],
  },
  {
    id: 'web-platforms',
    name: 'Web & Cloud Platforms',
    path: 'C:\\Technical Skills\\Web & Cloud Platforms',
    classification: 'Demonstrated',
    description: 'Modern frontend tooling, cloud backend infrastructure, containerization, and interactive analytics apps.',
    items: [
      {
        id: 'react',
        name: 'React (v19)',
        classification: 'Demonstrated',
        type: 'Frontend UI Library',
        usedIn: 'LOGESH_OS: Window management state machines, custom retro hook abstractions, Start Menu, and modal dialog system',
        evidence: 'App.tsx, BrowserWindow.tsx, and modular component hierarchy running React 19.',
        projectTitle: 'LOGESH_OS',
        projectSectionId: 'about',
      },
      {
        id: 'vite',
        name: 'Vite',
        classification: 'Demonstrated',
        type: 'Build Tool & Dev Server',
        usedIn: 'Fast Hot Module Replacement, TypeScript transpilation, and optimized production bundling for LOGESH_OS',
        evidence: 'vite.config.ts with React plugin and GitHub Pages base path configuration.',
        projectTitle: 'LOGESH_OS',
        projectSectionId: 'about',
      },
      {
        id: 'supabase',
        name: 'Supabase',
        classification: 'Demonstrated',
        type: 'Backend-as-a-Service & Edge Functions',
        usedIn: 'PostgreSQL database storing verified Snake Hall of Fame arcade records, Row-Level Security policies, and Deno Edge Function',
        evidence: '@supabase/supabase-js client in src/utils/supabase.ts and submit-score Edge Function.',
        projectTitle: 'Snake Arcade Game',
        projectSectionId: 'about',
      },
      {
        id: 'streamlit',
        name: 'Streamlit',
        classification: 'Demonstrated',
        type: 'Interactive Application Framework',
        usedIn: 'Real-time local dashboard for CogniFocus engagement curves and interactive upload demo for Image Authenticity Detection',
        evidence: 'Local Streamlit application interfaces with real-time UI components.',
        projectTitle: 'CogniFocus',
        projectSectionId: 'projects/cognifocus',
      },
      {
        id: 'fastapi',
        name: 'FastAPI & Uvicorn',
        classification: 'Demonstrated',
        type: 'Asynchronous REST API',
        usedIn: 'OpenEnv-based email triage application server providing asynchronous classification and priority endpoints',
        evidence: 'app.py FastAPI implementation and openenv.yaml specification.',
        projectTitle: 'Intelligent Email Triage',
        projectSectionId: 'projects/email-triage',
      },
      {
        id: 'docker',
        name: 'Docker',
        classification: 'Demonstrated',
        type: 'Containerization Platform',
        usedIn: 'Reproducible container environment configuration (Dockerfile) for isolated OpenEnv email triage system execution',
        evidence: 'Dockerfile defining base python environment, dependencies, and entrypoint server.',
        projectTitle: 'Intelligent Email Triage',
        projectSectionId: 'projects/email-triage',
      },
      {
        id: 'git-github',
        name: 'Git & GitHub',
        classification: 'Demonstrated',
        type: 'Version Control & CI/CD',
        usedIn: 'Source control, branch management, automated GitHub Actions deployment pipelines, and public repositories',
        evidence: '.github/workflows/deploy.yml and active commit history at github.com/Logesh051.',
        projectTitle: 'LOGESH_OS',
        projectSectionId: 'about',
      },
      {
        id: 'jupyter-colab',
        name: 'Jupyter Notebook & Google Colab',
        classification: 'Demonstrated',
        type: 'Interactive Prototyping Environments',
        usedIn: 'Exploratory data analysis, baseline model experiments, and GPU-accelerated CNN training',
        evidence: 'Notebook workflows for TS-ML-Contest and Google Colab GPU training sessions.',
        projectTitle: 'Startup Valuation Engine',
        projectSectionId: 'projects/startup-valuation',
      },
      {
        id: 'excel',
        name: 'Microsoft Excel',
        classification: 'Demonstrated',
        type: 'Spreadsheet Software',
        usedIn: 'Retech Data Analytics internship: data cleaning, formula auditing, and pivot-table visualizations across 500+ records',
        evidence: 'Cleaned sales and customer transaction datasets for corporate reporting.',
        projectTitle: 'Retech Internship',
      },
    ],
  },
  {
    id: 'learning-coursework',
    name: 'Learning & Coursework',
    path: 'C:\\Technical Skills\\Learning & Coursework',
    classification: 'Learning / Coursework',
    description: 'Competencies acquired through academic degree coursework, professional certifications, and industry simulations.',
    items: [
      {
        id: 'reinforcement-learning',
        name: 'Reinforcement Learning',
        classification: 'Learning / Coursework',
        type: 'Academic Coursework',
        usedIn: 'Saveetha Engineering College B.Tech AIML core coursework: Markov Decision Processes (MDP), Bellman equations, and Q-learning concepts',
        evidence: 'B.Tech AIML Curriculum syllabus: evaluated reward functions and discrete state-action transitions.',
        projectTitle: 'Saveetha Engineering College',
      },
      {
        id: 'prompt-engineering',
        name: 'Prompt Engineering',
        classification: 'Learning / Coursework',
        type: 'Practical Learning & Coursework',
        usedIn: 'Saveetha Engineering College coursework: structured system prompts, few-shot conditioning, chain-of-thought, and output constraints',
        evidence: 'B.Tech AIML Curriculum lab experiments: structured prompting patterns and LLM evaluation.',
        projectTitle: 'Saveetha Engineering College',
      },
      {
        id: 'applied-ai',
        name: 'Applied Artificial Intelligence',
        classification: 'Learning / Coursework',
        type: 'Academic Coursework',
        usedIn: 'Saveetha Engineering College coursework: heuristic state-space search (A* search, minimax with alpha-beta pruning), and knowledge graphs',
        evidence: 'B.Tech AIML Curriculum syllabus: implemented classical graph search and logic agents.',
        projectTitle: 'Saveetha Engineering College',
      },
      {
        id: 'object-detection-cv',
        name: 'Object Detection & Segmentation',
        classification: 'Learning / Coursework',
        type: 'Certification Coursework',
        usedIn: 'Infosys Springboard professional certification: studied bounding box localization, contours, sliding windows, and semantic segmentation principles using OpenCV',
        evidence: 'Infosys Springboard Certificate: "Image Segmentation and Object Detection in OpenCV".',
        projectTitle: 'Infosys Springboard',
      },
      {
        id: 'data-analytics-simulations',
        name: 'Enterprise Data Science Simulations',
        classification: 'Learning / Coursework',
        type: 'Job Simulations',
        usedIn: 'Forage virtual job simulations (Commonwealth Bank Intro to Data Science & Vista AI in Action): exploratory data framing and predictive problem modeling',
        evidence: 'Completed Forage simulation certificates (July 2026, August 2026).',
        projectTitle: 'Forage Virtual Simulations',
      },
      {
        id: 'game-development',
        name: 'Game Design & Interactive Media',
        classification: 'Learning / Coursework',
        type: 'Certification Coursework',
        usedIn: 'Epic Games Game Design Professional Certificate: studied game loops, tick rate timing, state persistence, and player feedback loops',
        evidence: 'Epic Games Professional Certification & interactive implementation in LOGESH_OS Snake arcade.',
        projectTitle: 'Epic Games Certification',
      },
    ],
  },
];

const ROOT_PATH = 'C:\\Technical Skills';

type FolderId = 'root' | string;
type ViewMode = 'details' | 'list' | 'large-icons';
type SortColumn = 'name' | 'classification' | 'type' | 'usedIn' | null;
type SortDirection = 'asc' | 'desc';
type MenuKey = 'file' | 'edit' | 'view' | 'tools' | 'help' | null;
type PropsTab = 'general' | 'evidence' | 'policy';

interface TechStacksPageProps {
  onNavigate?: (section: SectionId) => void;
}

const TechStacksPage: React.FC<TechStacksPageProps> = ({ onNavigate }) => {
  // Navigation stack state
  const [currentFolderId, setCurrentFolderId] = useState<FolderId>('languages');
  const [history, setHistory] = useState<FolderId[]>(['languages']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Selection & View state
  const [selectedItemId, setSelectedItemId] = useState<string | null>('python');
  const [viewMode, setViewMode] = useState<ViewMode>('details');
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [isFoldersPaneVisible, setIsFoldersPaneVisible] = useState<boolean>(true);

  // Address Bar state
  const [addressInput, setAddressInput] = useState<string>('C:\\Technical Skills\\Languages');
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);

  // Modals & Menu
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [propertiesModalOpen, setPropertiesModalOpen] = useState(false);
  const [propertiesSkill, setPropertiesSkill] = useState<SkillItem | null>(null);
  const [propertiesTab, setPropertiesTab] = useState<PropsTab>('general');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const addressDropdownRef = useRef<HTMLDivElement>(null);

  // Current folder and items resolution
  const isRoot = currentFolderId === 'root';
  const currentCategory = useMemo(() => {
    return SKILL_CATEGORIES.find((cat) => cat.id === currentFolderId) || SKILL_CATEGORIES[0];
  }, [currentFolderId]);

  const currentAddress = useMemo(() => {
    if (isRoot) return ROOT_PATH;
    return currentCategory.path;
  }, [isRoot, currentCategory]);

  // Keep addressInput in sync with navigation
  useEffect(() => {
    setAddressInput(currentAddress);
  }, [currentAddress]);

  // Close address dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addressDropdownRef.current && !addressDropdownRef.current.contains(e.target as Node)) {
        setAddressDropdownOpen(false);
      }
    };
    if (addressDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [addressDropdownOpen]);

  // Navigation handlers
  const navigateToFolder = (folderId: FolderId) => {
    if (folderId === currentFolderId) return;

    const newHistory = [...history.slice(0, historyIndex + 1), folderId];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFolderId(folderId);

    // Set default selected item
    if (folderId === 'root') {
      setSelectedItemId('languages');
    } else {
      const cat = SKILL_CATEGORIES.find((c) => c.id === folderId);
      setSelectedItemId(cat && cat.items.length > 0 ? cat.items[0].id : null);
    }
    setAddressDropdownOpen(false);
    setActiveMenu(null);
  };

  const goBack = () => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    const targetFolder = history[newIndex];
    setCurrentFolderId(targetFolder);

    if (targetFolder === 'root') {
      setSelectedItemId('languages');
    } else {
      const cat = SKILL_CATEGORIES.find((c) => c.id === targetFolder);
      setSelectedItemId(cat && cat.items.length > 0 ? cat.items[0].id : null);
    }
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    const targetFolder = history[newIndex];
    setCurrentFolderId(targetFolder);

    if (targetFolder === 'root') {
      setSelectedItemId('languages');
    } else {
      const cat = SKILL_CATEGORIES.find((c) => c.id === targetFolder);
      setSelectedItemId(cat && cat.items.length > 0 ? cat.items[0].id : null);
    }
  };

  const goUp = () => {
    if (!isRoot) {
      navigateToFolder('root');
    }
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;
  const canGoUp = !isRoot;

  // Address Bar submission & validation
  const handleAddressSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = addressInput.trim().replace(/[\\/]+$/, '').toLowerCase();

    if (
      raw === 'c:\\technical skills' ||
      raw === 'technical skills' ||
      raw === 'c:' ||
      raw === 'c:\\'
    ) {
      navigateToFolder('root');
      return;
    }

    const matchedCat = SKILL_CATEGORIES.find(
      (c) =>
        c.path.toLowerCase() === raw ||
        c.name.toLowerCase() === raw ||
        c.id.toLowerCase() === raw ||
        `c:\\technical skills\\${c.name}`.toLowerCase() === raw ||
        `c:\\technical skills\\${c.id}`.toLowerCase() === raw
    );

    if (matchedCat) {
      navigateToFolder(matchedCat.id);
      return;
    }

    // Check if user entered a specific skill path
    for (const cat of SKILL_CATEGORIES) {
      const matchedSkill = cat.items.find(
        (s) =>
          `${cat.path}\\${s.name}`.toLowerCase() === raw ||
          `${cat.path}\\${s.id}`.toLowerCase() === raw
      );
      if (matchedSkill) {
        navigateToFolder(cat.id);
        setSelectedItemId(matchedSkill.id);
        setPropertiesSkill(matchedSkill);
        setPropertiesModalOpen(true);
        return;
      }
    }

    // Invalid path -> classic Windows Error Dialog
    setErrorModal({
      open: true,
      message: `Cannot find '${addressInput}'. Make sure the path or Internet address is correct.`,
    });
    setAddressInput(currentAddress);
  };

  // Sorting
  const sortedItems = useMemo(() => {
    if (isRoot) {
      const cats = [...SKILL_CATEGORIES];
      if (!sortColumn) return cats;
      cats.sort((a, b) => {
        const valA = (a[sortColumn === 'classification' ? 'classification' : 'name'] || '').toLowerCase();
        const valB = (b[sortColumn === 'classification' ? 'classification' : 'name'] || '').toLowerCase();
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
      return cats;
    }

    const list = [...currentCategory.items];
    if (!sortColumn) return list;
    list.sort((a, b) => {
      const valA = (a[sortColumn] || '').toLowerCase();
      const valB = (b[sortColumn] || '').toLowerCase();
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [isRoot, currentCategory, sortColumn, sortDirection]);

  const handleSort = (column: SortColumn) => {
    if (!column) return;
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Open Skill Properties
  const handleOpenProperties = (skill?: SkillItem) => {
    const target =
      skill ||
      (!isRoot && selectedItemId
        ? currentCategory.items.find((i) => i.id === selectedItemId)
        : null);
    if (target) {
      setPropertiesSkill(target);
      setPropertiesTab('general');
      setPropertiesModalOpen(true);
    }
  };

  // Item click & double-click interactions
  const handleItemClick = (id: string) => {
    setSelectedItemId(id);
  };

  const handleItemDoubleClick = (item: SkillItem | SkillCategory) => {
    if (isRoot) {
      // Double click folder opens category
      navigateToFolder(item.id);
    } else {
      // Double click skill opens properties
      handleOpenProperties(item as SkillItem);
    }
  };

  const handleProjectClick = (e: React.MouseEvent, sectionId?: SectionId) => {
    e.stopPropagation();
    if (sectionId && onNavigate) {
      onNavigate(sectionId);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (propertiesModalOpen || showHelpModal || errorModal.open) {
        if (e.key === 'Escape') {
          setPropertiesModalOpen(false);
          setShowHelpModal(false);
          setErrorModal({ open: false, message: '' });
        }
        return;
      }

      if (e.key === 'Backspace') {
        if (!(e.target instanceof HTMLInputElement)) {
          e.preventDefault();
          goUp();
        }
      } else if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
      } else if (e.key === 'Enter') {
        if (e.target instanceof HTMLInputElement) return;
        if (isRoot && selectedItemId) {
          navigateToFolder(selectedItemId);
        } else if (!isRoot && selectedItemId) {
          const item = currentCategory.items.find((i) => i.id === selectedItemId);
          if (item) handleOpenProperties(item);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isRoot,
    selectedItemId,
    currentCategory,
    historyIndex,
    propertiesModalOpen,
    showHelpModal,
    errorModal.open,
  ]);

  const selectedItemObj = useMemo(() => {
    if (isRoot) {
      return SKILL_CATEGORIES.find((c) => c.id === selectedItemId) || null;
    }
    return currentCategory.items.find((i) => i.id === selectedItemId) || null;
  }, [isRoot, currentCategory, selectedItemId]);

  return (
    <div className="explorer-app" onClick={() => activeMenu && setActiveMenu(null)}>
      {/* 1. Menu Bar */}
      <div className="explorer-menubar" onClick={(e) => e.stopPropagation()}>
        {/* File Menu */}
        <div className="explorer-menu-item">
          <button
            className={`explorer-menu-btn ${activeMenu === 'file' ? 'explorer-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'file' ? null : 'file'))}
          >
            <u>F</u>ile
          </button>
          {activeMenu === 'file' && (
            <div className="explorer-dropdown win-raised">
              <div
                className={`explorer-dropdown-item ${!selectedItemId || isRoot ? 'explorer-dropdown-item--disabled' : ''}`}
                onClick={() => {
                  handleOpenProperties();
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check" />
                <span>Properties</span>
                <span className="explorer-dropdown-shortcut">Enter</span>
              </div>
              <div className="explorer-dropdown-separator" />
              <div
                className={`explorer-dropdown-item ${isRoot ? 'explorer-dropdown-item--active' : ''}`}
                onClick={() => navigateToFolder('root')}
              >
                <span className="explorer-dropdown-check">{isRoot ? '✓' : ''}</span>
                <span>Technical Skills (Root)</span>
              </div>
              {SKILL_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className={`explorer-dropdown-item ${currentFolderId === cat.id ? 'explorer-dropdown-item--active' : ''}`}
                  onClick={() => navigateToFolder(cat.id)}
                >
                  <span className="explorer-dropdown-check">
                    {currentFolderId === cat.id ? '✓' : ''}
                  </span>
                  <span>{cat.name}</span>
                </div>
              ))}
              <div className="explorer-dropdown-separator" />
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check" />
                <span>Open Resume (PDF)</span>
              </div>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div className="explorer-menu-item">
          <button
            className={`explorer-menu-btn ${activeMenu === 'edit' ? 'explorer-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'edit' ? null : 'edit'))}
          >
            <u>E</u>dit
          </button>
          {activeMenu === 'edit' && (
            <div className="explorer-dropdown win-raised">
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  if (selectedItemObj) {
                    const text = isRoot
                      ? `Category: ${(selectedItemObj as SkillCategory).name}`
                      : `${(selectedItemObj as SkillItem).name} (${(selectedItemObj as SkillItem).type}) - Used In: ${(selectedItemObj as SkillItem).usedIn}`;
                    navigator.clipboard?.writeText(text);
                  }
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check" />
                <span>Copy Description</span>
                <span className="explorer-dropdown-shortcut">Ctrl+C</span>
              </div>
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  if (sortedItems.length > 0) {
                    setSelectedItemId(sortedItems[0].id);
                  }
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check" />
                <span>Select First</span>
                <span className="explorer-dropdown-shortcut">Ctrl+A</span>
              </div>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div className="explorer-menu-item">
          <button
            className={`explorer-menu-btn ${activeMenu === 'view' ? 'explorer-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'view' ? null : 'view'))}
          >
            <u>V</u>iew
          </button>
          {activeMenu === 'view' && (
            <div className="explorer-dropdown win-raised">
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  setIsFoldersPaneVisible((prev) => !prev);
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check">{isFoldersPaneVisible ? '✓' : ''}</span>
                <span>Folders Bar</span>
              </div>
              <div className="explorer-dropdown-separator" />
              <div
                className={`explorer-dropdown-item ${viewMode === 'large-icons' ? 'explorer-dropdown-item--active' : ''}`}
                onClick={() => {
                  setViewMode('large-icons');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check">{viewMode === 'large-icons' ? '✓' : ''}</span>
                <span>Large Icons</span>
              </div>
              <div
                className={`explorer-dropdown-item ${viewMode === 'list' ? 'explorer-dropdown-item--active' : ''}`}
                onClick={() => {
                  setViewMode('list');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check">{viewMode === 'list' ? '✓' : ''}</span>
                <span>List</span>
              </div>
              <div
                className={`explorer-dropdown-item ${viewMode === 'details' ? 'explorer-dropdown-item--active' : ''}`}
                onClick={() => {
                  setViewMode('details');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check">{viewMode === 'details' ? '✓' : ''}</span>
                <span>Details</span>
              </div>
              <div className="explorer-dropdown-separator" />
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  handleSort('name');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check">{sortColumn === 'name' ? '✓' : ''}</span>
                <span>Sort by Name</span>
              </div>
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  handleSort('classification');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check">{sortColumn === 'classification' ? '✓' : ''}</span>
                <span>Sort by Classification</span>
              </div>
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  handleSort('type');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check">{sortColumn === 'type' ? '✓' : ''}</span>
                <span>Sort by Type</span>
              </div>
            </div>
          )}
        </div>

        {/* Tools Menu */}
        <div className="explorer-menu-item">
          <button
            className={`explorer-menu-btn ${activeMenu === 'tools' ? 'explorer-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'tools' ? null : 'tools'))}
          >
            <u>T</u>ools
          </button>
          {activeMenu === 'tools' && (
            <div className="explorer-dropdown win-raised">
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check" />
                <span>Verify with Resume (PDF)</span>
              </div>
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  setPropertiesSkill(SKILL_CATEGORIES[0].items[0]);
                  setPropertiesTab('policy');
                  setPropertiesModalOpen(true);
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check" />
                <span>Skill Verification Policy</span>
              </div>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div className="explorer-menu-item">
          <button
            className={`explorer-menu-btn ${activeMenu === 'help' ? 'explorer-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'help' ? null : 'help'))}
          >
            <u>H</u>elp
          </button>
          {activeMenu === 'help' && (
            <div className="explorer-dropdown win-raised">
              <div
                className="explorer-dropdown-item"
                onClick={() => {
                  setShowHelpModal(true);
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check" />
                <span>About Technical Skills...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Explorer Toolbar */}
      <div className="explorer-toolbar">
        <div className="explorer-toolbar-group">
          <button
            className="explorer-tool-btn win-raised"
            title="Back (Alt+Left)"
            onClick={goBack}
            disabled={!canGoBack}
          >
            <BackNavIcon size={14} />
            <span className="explorer-tool-label">Back</span>
          </button>

          <button
            className="explorer-tool-btn win-raised"
            title="Forward (Alt+Right)"
            onClick={goForward}
            disabled={!canGoForward}
          >
            <ForwardNavIcon size={14} />
            <span className="explorer-tool-label">Forward</span>
          </button>

          <button
            className="explorer-tool-btn win-raised"
            title="Up to Parent Folder (Backspace)"
            onClick={goUp}
            disabled={!canGoUp}
          >
            <UpFolderIcon size={14} />
            <span className="explorer-tool-label">Up</span>
          </button>

          <div className="explorer-tool-separator" />

          {/* Folders Toggle Button */}
          <button
            className={`explorer-tool-btn ${isFoldersPaneVisible ? 'explorer-tool-btn--pressed win-sunken' : 'win-raised'}`}
            title="Toggle Folders Pane"
            onClick={() => setIsFoldersPaneVisible((prev) => !prev)}
          >
            <FoldersToggleIcon size={14} />
            <span className="explorer-tool-label">Folders</span>
          </button>

          {/* Properties Button */}
          <button
            className="explorer-tool-btn win-raised"
            title="Properties of selected item (Enter)"
            onClick={() => handleOpenProperties()}
            disabled={!selectedItemId || isRoot}
          >
            <PropertiesNavIcon size={14} />
            <span className="explorer-tool-label">Properties</span>
          </button>

          <div className="explorer-tool-separator" />

          {/* View Mode Buttons */}
          <button
            className={`explorer-tool-btn ${viewMode === 'large-icons' ? 'explorer-tool-btn--pressed win-sunken' : 'win-raised'}`}
            title="Large Icons"
            onClick={() => setViewMode('large-icons')}
          >
            <LargeIconsViewIcon size={14} />
            <span className="explorer-tool-label">Icons</span>
          </button>

          <button
            className={`explorer-tool-btn ${viewMode === 'list' ? 'explorer-tool-btn--pressed win-sunken' : 'win-raised'}`}
            title="List View"
            onClick={() => setViewMode('list')}
          >
            <ListViewIcon size={14} />
            <span className="explorer-tool-label">List</span>
          </button>

          <button
            className={`explorer-tool-btn ${viewMode === 'details' ? 'explorer-tool-btn--pressed win-sunken' : 'win-raised'}`}
            title="Details View"
            onClick={() => setViewMode('details')}
          >
            <DetailsViewIcon size={14} />
            <span className="explorer-tool-label">Details</span>
          </button>
        </div>

        {/* Address Bar */}
        <div className="explorer-address-bar" ref={addressDropdownRef}>
          <span className="explorer-address-label">Address</span>
          <div className="explorer-address-input-wrapper">
            <svg className="explorer-address-icon" width="14" height="14" viewBox="0 0 16 16">
              <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
              <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
            </svg>
            <input
              type="text"
              className="explorer-address-input-field"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddressSubmit();
              }}
              spellCheck={false}
              aria-label="Explorer Address Bar"
            />
            <button
              className="explorer-address-dropdown-btn"
              onClick={() => setAddressDropdownOpen((prev) => !prev)}
              title="Show Address History"
              type="button"
            >
              ▼
            </button>
          </div>
          <button
            className="explorer-address-go-btn"
            onClick={() => handleAddressSubmit()}
            title="Go to Address"
            type="button"
          >
            <span>Go</span>
          </button>

          {/* Address Dropdown */}
          {addressDropdownOpen && (
            <div className="explorer-address-dropdown-menu">
              <div
                className="explorer-address-dropdown-option"
                onClick={() => navigateToFolder('root')}
              >
                <svg width="12" height="12" viewBox="0 0 16 16">
                  <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                </svg>
                <span>{ROOT_PATH}</span>
              </div>
              {SKILL_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="explorer-address-dropdown-option"
                  onClick={() => navigateToFolder(cat.id)}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16">
                    <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                  </svg>
                  <span>{cat.path}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Split Body */}
      <div className="explorer-body">
        {/* Left Folders Tree (Collapsible on Mobile and Desktop via toolbar) */}
        {isFoldersPaneVisible && (
          <div className="explorer-left-pane">
            <div className="explorer-pane-header">
              <span>Folders</span>
              <button
                className="explorer-pane-close-btn"
                onClick={() => setIsFoldersPaneVisible(false)}
                title="Hide Folders Pane"
              >
                ✕
              </button>
            </div>
            <div className="explorer-tree win-sunken" role="tree" aria-label="Skill Folders">
              {/* Root Node */}
              <div
                className={`explorer-tree-root ${isRoot ? 'explorer-tree-label--selected' : ''}`}
                onClick={() => navigateToFolder('root')}
                role="treeitem"
                aria-selected={isRoot}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigateToFolder('root');
                }}
              >
                <span className="explorer-tree-toggle">-</span>
                <svg className="explorer-tree-icon" width="16" height="16" viewBox="0 0 16 16">
                  <rect x="2" y="3" width="12" height="9" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                  <rect x="4" y="5" width="8" height="5" fill="#000080" />
                  <rect x="1" y="12" width="14" height="2" fill="#808080" stroke="#000000" strokeWidth="1" />
                </svg>
                <span className="explorer-tree-root-label">Technical Skills</span>
              </div>

              {/* Category Branch Nodes */}
              <div className="explorer-tree-branches">
                {SKILL_CATEGORIES.map((cat, idx) => {
                  const isSelected = !isRoot && cat.id === currentFolderId;
                  const isLast = idx === SKILL_CATEGORIES.length - 1;
                  const isLearning = cat.classification === 'Learning / Coursework';
                  return (
                    <div
                      key={cat.id}
                      className={`explorer-tree-item ${isLearning ? 'explorer-tree-item--learning' : ''}`}
                      onClick={() => navigateToFolder(cat.id)}
                      role="treeitem"
                      aria-selected={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigateToFolder(cat.id);
                        }
                      }}
                    >
                      <span className="explorer-tree-connector">{isLast ? '└─' : '├─'}</span>
                      {isSelected ? (
                        <svg className="explorer-tree-icon" width="16" height="16" viewBox="0 0 16 16">
                          <path d="M1 3h5l2 2h7v3H1V3z" fill={isLearning ? '#d8b4e2' : '#f6d04d'} stroke="#000000" strokeWidth="1" />
                          <path d="M0 7h12l3 7H3L0 7z" fill={isLearning ? '#f0d9f8' : '#fff2a8'} stroke="#000000" strokeWidth="1" />
                        </svg>
                      ) : (
                        <svg className="explorer-tree-icon" width="16" height="16" viewBox="0 0 16 16">
                          <path d="M1 3h5l2 2h7v9H1V3z" fill={isLearning ? '#d8b4e2' : '#f6d04d'} stroke="#000000" strokeWidth="1" />
                          <path d="M1 5h14v8H1V5z" fill={isLearning ? '#ebd4f3' : '#ffeaa7'} stroke="#000000" strokeWidth="1" />
                        </svg>
                      )}
                      <span
                        className={`explorer-tree-label ${isSelected ? 'explorer-tree-label--selected' : ''}`}
                      >
                        {cat.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Splitter */}
        {isFoldersPaneVisible && <div className="explorer-splitter" />}

        {/* Right Content Pane */}
        <div className="explorer-right-pane">
          {/* Category Banner for non-root */}
          {!isRoot && (
            <div className="explorer-category-header win-sunken">
              <div className="explorer-category-header-top">
                <span className="explorer-category-title">{currentCategory.name}</span>
                <span
                  className={`explorer-classification-badge ${
                    currentCategory.classification === 'Demonstrated'
                      ? 'explorer-classification-badge--demonstrated'
                      : 'explorer-classification-badge--learning'
                  }`}
                >
                  {currentCategory.classification}
                </span>
              </div>
              <div className="explorer-category-desc">{currentCategory.description}</div>
            </div>
          )}

          {/* Details View */}
          {viewMode === 'details' && (
            <div className="explorer-list-view win-sunken" role="region" aria-label="Details View">
              <table className="explorer-table">
                <thead>
                  <tr>
                    <th
                      className="explorer-th explorer-th--name win-raised"
                      onClick={() => handleSort('name')}
                      title="Sort by Name"
                    >
                      <div className="explorer-th-content">
                        <span>Name</span>
                        {sortColumn === 'name' && (
                          <span className="explorer-sort-arrow">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="explorer-th explorer-th--class win-raised"
                      onClick={() => handleSort('classification')}
                      title="Sort by Verification Classification"
                    >
                      <div className="explorer-th-content">
                        <span>Classification</span>
                        {sortColumn === 'classification' && (
                          <span className="explorer-sort-arrow">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="explorer-th explorer-th--type win-raised"
                      onClick={() => handleSort('type')}
                      title="Sort by Type"
                    >
                      <div className="explorer-th-content">
                        <span>Type</span>
                        {sortColumn === 'type' && (
                          <span className="explorer-sort-arrow">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="explorer-th explorer-th--usedin win-raised"
                      onClick={() => !isRoot && handleSort('usedIn')}
                      title={isRoot ? 'Contents' : 'Sort by Practical Application'}
                    >
                      <div className="explorer-th-content">
                        <span>{isRoot ? 'Contents' : 'Application & Evidence'}</span>
                        {!isRoot && sortColumn === 'usedIn' && (
                          <span className="explorer-sort-arrow">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedItems.map((entry) => {
                    const isSelected = entry.id === selectedItemId;
                    if (isRoot) {
                      const cat = entry as SkillCategory;
                      const isCatLearning = cat.classification === 'Learning / Coursework';
                      return (
                        <tr
                          key={cat.id}
                          className={`explorer-tr ${isSelected ? 'explorer-tr--selected' : ''}`}
                          onClick={() => handleItemClick(cat.id)}
                          onDoubleClick={() => handleItemDoubleClick(cat)}
                          tabIndex={0}
                        >
                          <td className="explorer-td explorer-td--name">
                            <svg className="explorer-row-icon" width="14" height="14" viewBox="0 0 16 16">
                              <path d="M1 3h5l2 2h7v9H1V3z" fill={isCatLearning ? '#d8b4e2' : '#f6d04d'} stroke="#000000" strokeWidth="1" />
                              <path d="M1 5h14v8H1V5z" fill={isCatLearning ? '#ebd4f3' : '#ffeaa7'} stroke="#000000" strokeWidth="1" />
                            </svg>
                            <span className="explorer-item-name">{cat.name}</span>
                          </td>
                          <td className="explorer-td explorer-td--class">
                            <span
                              className={`explorer-badge-cell ${
                                isCatLearning
                                  ? 'explorer-badge-cell--learning'
                                  : 'explorer-badge-cell--demonstrated'
                              }`}
                            >
                              {cat.classification}
                            </span>
                          </td>
                          <td className="explorer-td explorer-td--type">File Folder</td>
                          <td className="explorer-td explorer-td--usedin">{cat.items.length} verified items</td>
                        </tr>
                      );
                    }

                    const skill = entry as SkillItem;
                    const isSkillLearning = skill.classification === 'Learning / Coursework';
                    return (
                      <tr
                        key={skill.id}
                        className={`explorer-tr ${isSelected ? 'explorer-tr--selected' : ''}`}
                        onClick={() => handleItemClick(skill.id)}
                        onDoubleClick={() => handleItemDoubleClick(skill)}
                        tabIndex={0}
                      >
                        <td className="explorer-td explorer-td--name">
                          <svg className="explorer-row-icon" width="14" height="14" viewBox="0 0 16 16">
                            <path d="M3 1h7l4 4v10H3V1z" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                            <path d="M10 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                            <line x1="5" y1="6" x2="11" y2="6" stroke="#808080" strokeWidth="1" />
                            <line x1="5" y1="9" x2="11" y2="9" stroke="#808080" strokeWidth="1" />
                          </svg>
                          <span className="explorer-item-name">{skill.name}</span>
                        </td>
                        <td className="explorer-td explorer-td--class">
                          <span
                            className={`explorer-badge-cell ${
                              isSkillLearning
                                ? 'explorer-badge-cell--learning'
                                : 'explorer-badge-cell--demonstrated'
                            }`}
                          >
                            {skill.classification}
                          </span>
                        </td>
                        <td className="explorer-td explorer-td--type">{skill.type}</td>
                        <td className="explorer-td explorer-td--usedin">
                          <div className="explorer-usedin-container">
                            <span className="explorer-usedin-text">{skill.usedIn}</span>
                            {skill.projectSectionId && onNavigate && (
                              <button
                                className="explorer-project-link-btn"
                                onClick={(e) => handleProjectClick(e, skill.projectSectionId)}
                                title={`Navigate to ${skill.projectTitle || 'project'} detail`}
                              >
                                {skill.projectTitle || 'View Project'} ↗
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="explorer-list-mode win-sunken" role="region" aria-label="List View">
              <div className="explorer-list-grid">
                {sortedItems.map((entry) => {
                  const isSelected = entry.id === selectedItemId;
                  const isCat = isRoot;
                  const isLearning = entry.classification === 'Learning / Coursework';
                  return (
                    <div
                      key={entry.id}
                      className={`explorer-list-item ${isSelected ? 'explorer-list-item--selected' : ''}`}
                      onClick={() => handleItemClick(entry.id)}
                      onDoubleClick={() => handleItemDoubleClick(entry as any)}
                      tabIndex={0}
                    >
                      {isCat ? (
                        <svg className="explorer-row-icon" width="16" height="16" viewBox="0 0 16 16">
                          <path d="M1 3h5l2 2h7v9H1V3z" fill={isLearning ? '#d8b4e2' : '#f6d04d'} stroke="#000000" strokeWidth="1" />
                          <path d="M1 5h14v8H1V5z" fill={isLearning ? '#ebd4f3' : '#ffeaa7'} stroke="#000000" strokeWidth="1" />
                        </svg>
                      ) : (
                        <svg className="explorer-row-icon" width="16" height="16" viewBox="0 0 16 16">
                          <path d="M3 1h7l4 4v10H3V1z" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                          <path d="M10 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                        </svg>
                      )}
                      <div className="explorer-list-item-content">
                        <span className="explorer-list-item-name">{entry.name}</span>
                        <span
                          className={`explorer-list-item-badge ${
                            isLearning ? 'explorer-list-item-badge--learning' : ''
                          }`}
                        >
                          {entry.classification === 'Demonstrated' ? '[Demonstrated]' : '[Learning]'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Large Icons View */}
          {viewMode === 'large-icons' && (
            <div className="explorer-icons-mode win-sunken" role="region" aria-label="Icons View">
              <div className="explorer-icons-grid">
                {sortedItems.map((entry) => {
                  const isSelected = entry.id === selectedItemId;
                  const isCat = isRoot;
                  const isLearning = entry.classification === 'Learning / Coursework';
                  return (
                    <div
                      key={entry.id}
                      className={`explorer-icon-item ${isSelected ? 'explorer-icon-item--selected' : ''}`}
                      onClick={() => handleItemClick(entry.id)}
                      onDoubleClick={() => handleItemDoubleClick(entry as any)}
                      tabIndex={0}
                    >
                      <div className="explorer-icon-graphic">
                        {isCat ? (
                          <svg width="32" height="32" viewBox="0 0 32 32">
                            <path d="M2 6h10l4 4h14v18H2V6z" fill={isLearning ? '#d8b4e2' : '#f6d04d'} stroke="#000000" strokeWidth="1.2" />
                            <path d="M2 10h28v16H2V10z" fill={isLearning ? '#ebd4f3' : '#ffeaa7'} stroke="#000000" strokeWidth="1.2" />
                          </svg>
                        ) : (
                          <svg width="32" height="32" viewBox="0 0 32 32">
                            <rect x="6" y="2" width="20" height="28" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                            <path d="M18 2v8h8" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                            <rect x="10" y="14" width="12" height="2" fill={isLearning ? '#800080' : '#000080'} />
                            <rect x="10" y="18" width="12" height="2" fill="#808080" />
                            <rect x="10" y="22" width="8" height="2" fill="#808080" />
                          </svg>
                        )}
                      </div>
                      <span className="explorer-icon-label">{entry.name}</span>
                      <span
                        className={`explorer-icon-tag ${
                          isLearning ? 'explorer-icon-tag--learning' : ''
                        }`}
                      >
                        {isCat
                          ? `[${catCount(entry.id)} items]`
                          : entry.classification === 'Demonstrated'
                          ? '[Demonstrated]'
                          : '[Coursework]'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Explorer Status Bar */}
      <div className="explorer-statusbar">
        <div className="explorer-status-pane explorer-status-pane--count">
          <span>{sortedItems.length} object(s)</span>
        </div>
        <div className="explorer-status-pane explorer-status-pane--selected">
          {selectedItemObj ? (
            <span>
              Selected: {selectedItemObj.name} [{selectedItemObj.classification}] (
              {isRoot ? 'Category Folder' : (selectedItemObj as SkillItem).type})
            </span>
          ) : (
            <span>0 object(s) selected</span>
          )}
        </div>
        <div className="explorer-status-pane explorer-status-pane--zone">
          <svg className="explorer-zone-icon" width="12" height="12" viewBox="0 0 16 16">
            <rect x="2" y="3" width="12" height="8" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <rect x="4" y="5" width="8" height="4" fill="#000080" />
            <path d="M5 12h6v2H5z" fill="#808080" />
            <line x1="3" y1="14" x2="13" y2="14" stroke="#000000" strokeWidth="1" />
          </svg>
          <span>My Computer</span>
        </div>
      </div>

      {/* Skill Properties Modal */}
      {propertiesModalOpen && propertiesSkill && (
        <div
          className="explorer-modal-overlay"
          onClick={() => setPropertiesModalOpen(false)}
        >
          <div
            className="explorer-props-window win-raised"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={`${propertiesSkill.name} Properties`}
          >
            <div className="explorer-props-titlebar">
              <span>{propertiesSkill.name} Properties</span>
              <button
                className="explorer-modal-close win-raised"
                onClick={() => setPropertiesModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Tabs */}
            <div className="explorer-props-tabs">
              <button
                className={`explorer-props-tab-btn ${propertiesTab === 'general' ? 'explorer-props-tab-btn--active' : ''}`}
                onClick={() => setPropertiesTab('general')}
              >
                General
              </button>
              <button
                className={`explorer-props-tab-btn ${propertiesTab === 'evidence' ? 'explorer-props-tab-btn--active' : ''}`}
                onClick={() => setPropertiesTab('evidence')}
              >
                Project Evidence
              </button>
              <button
                className={`explorer-props-tab-btn ${propertiesTab === 'policy' ? 'explorer-props-tab-btn--active' : ''}`}
                onClick={() => setPropertiesTab('policy')}
              >
                Verification Rules
              </button>
            </div>

            {/* Body */}
            <div className="explorer-props-body">
              {propertiesTab === 'general' && (
                <div>
                  <div className="explorer-props-header">
                    <svg width="32" height="32" viewBox="0 0 32 32">
                      <rect x="6" y="2" width="20" height="28" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                      <path d="M18 2v8h8" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                      <rect x="10" y="14" width="12" height="2" fill="#000080" />
                    </svg>
                    <div>
                      <div className="explorer-props-title">{propertiesSkill.name}</div>
                      <div style={{ color: '#555', fontSize: '11px' }}>{propertiesSkill.type}</div>
                    </div>
                  </div>

                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Type:</span>
                    <span className="explorer-props-value">{propertiesSkill.type}</span>
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Category:</span>
                    <span className="explorer-props-value">{currentCategory.name}</span>
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Classification:</span>
                    <span
                      className={`explorer-badge-cell ${
                        propertiesSkill.classification === 'Demonstrated'
                          ? 'explorer-badge-cell--demonstrated'
                          : 'explorer-badge-cell--learning'
                      }`}
                    >
                      {propertiesSkill.classification}
                    </span>
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Location:</span>
                    <span className="explorer-props-value">
                      {currentCategory.path}\{propertiesSkill.name}
                    </span>
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Verification:</span>
                    <span className="explorer-props-value">
                      {propertiesSkill.classification === 'Demonstrated'
                        ? 'Verified Practical Implementation'
                        : 'Verified Academic Coursework / Simulation'}
                    </span>
                  </div>
                </div>
              )}

              {propertiesTab === 'evidence' && (
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    Application &amp; Implementation Evidence:
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Applied In:</span>
                    <span className="explorer-props-value">{propertiesSkill.usedIn}</span>
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Evidence:</span>
                    <span className="explorer-props-value">{propertiesSkill.evidence}</span>
                  </div>
                  {propertiesSkill.projectSectionId && (
                    <div className="explorer-props-row" style={{ marginTop: '10px' }}>
                      <span className="explorer-props-label">Project:</span>
                      <span className="explorer-props-value">
                        <button
                          className="win-raised explorer-modal-nav-btn"
                          onClick={() => {
                            setPropertiesModalOpen(false);
                            if (onNavigate && propertiesSkill.projectSectionId) {
                              onNavigate(propertiesSkill.projectSectionId);
                            }
                          }}
                        >
                          Open {propertiesSkill.projectTitle || 'Project'} in Browser ↗
                        </button>
                      </span>
                    </div>
                  )}
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Developer:</span>
                    <span className="explorer-props-value">Logesh N A</span>
                  </div>
                </div>
              )}

              {propertiesTab === 'policy' && (
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    Three-Tier Skill Verification Standards:
                  </div>
                  <div className="explorer-policy-box win-sunken">
                    <p>
                      <strong>1. Demonstrated:</strong> Clearly used and implemented in an active portfolio project, data analytics internship, or system architecture in the repository. Featured prominently in primary views.
                    </p>
                    <p>
                      <strong>2. Learning / Coursework:</strong> Practiced in accredited academic curriculum (Saveetha Engineering College), verified professional certifications, or industry simulations, without claimed production deployment.
                    </p>
                    <p>
                      <strong>3. Unverified:</strong> Excluded completely. No speculative technologies, percentage rating bars, or generic unevidenced buzzwords are ever published.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="explorer-props-actions">
              <button
                className="win-raised explorer-modal-ok-btn"
                onClick={() => setPropertiesModalOpen(false)}
              >
                OK
              </button>
              <button
                className="win-raised explorer-modal-ok-btn"
                onClick={() => setPropertiesModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explorer Error Alert Dialog */}
      {errorModal.open && (
        <div
          className="explorer-modal-overlay"
          onClick={() => setErrorModal({ open: false, message: '' })}
        >
          <div
            className="explorer-error-box win-raised"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-label="Windows Explorer"
          >
            <div className="explorer-error-titlebar">
              <span>Windows Explorer</span>
              <button
                className="explorer-modal-close win-raised"
                onClick={() => setErrorModal({ open: false, message: '' })}
              >
                ✕
              </button>
            </div>
            <div className="explorer-error-content">
              <svg className="explorer-error-icon" width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#cc0000" />
                <line x1="10" y1="10" x2="22" y2="22" stroke="#ffffff" strokeWidth="3" />
                <line x1="22" y1="10" x2="10" y2="22" stroke="#ffffff" strokeWidth="3" />
              </svg>
              <span>{errorModal.message}</span>
            </div>
            <div className="explorer-error-actions">
              <button
                className="win-raised explorer-modal-ok-btn"
                onClick={() => setErrorModal({ open: false, message: '' })}
                autoFocus
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="explorer-modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="explorer-modal win-raised" onClick={(e) => e.stopPropagation()}>
            <div className="explorer-modal-titlebar">
              <span>About Technical Skills</span>
              <button
                className="explorer-modal-close win-raised"
                onClick={() => setShowHelpModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="explorer-modal-body">
              <p>
                <strong>Logesh NA — Technical Skills Explorer</strong>
              </p>
              <p>
                Authentic Windows 98/2000 Explorer interface displaying evidence-based technical skills classified into Demonstrated practical applications and verified Learning &amp; Coursework.
              </p>
              <p>
                Strict safeguards: All unverified claims, fabricated percentages, and arbitrary ratings are completely excluded.
              </p>
              <div className="explorer-modal-actions">
                <button
                  className="win-raised explorer-modal-ok-btn"
                  onClick={() => setShowHelpModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper for category counts
function catCount(catId: string): number {
  const cat = SKILL_CATEGORIES.find((c) => c.id === catId);
  return cat ? cat.items.length : 0;
}

export default TechStacksPage;
