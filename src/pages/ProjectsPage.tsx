import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { SectionId } from '../types';
import {
  BackNavIcon,
  ForwardNavIcon,
  UpFolderIcon,
  PropertiesNavIcon,
  FoldersToggleIcon,
} from '../components/Icons';
import './ProjectsPage.css';

export interface TechRole {
  technology: string;
  role: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  desc: string;
}

export interface KeyFile {
  file: string;
  role: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  tagline: string;
  folder: 'Machine Learning' | 'AI Applications';
  type: string;
  status: 'Completed' | 'In Development' | 'Prototype';
  isFeatured?: boolean;
  featuredBadge?: string;

  // Overview Tab
  whatItDoes: string;
  whyBuilt: string;
  keyFeatures: string[];
  technologiesUsed: TechRole[];

  // How It Works Tab
  workflowSteps: WorkflowStep[];
  engineeringDecisions: string[];

  // Code & Setup Tab
  repoUrl: string;
  repoLabel: string;
  setupCommands: string[];
  keyFiles: KeyFile[];
}

export const PROJECTS_DATA: ProjectEntry[] = [
  {
    id: 'cognifocus',
    name: 'CogniFocus',
    tagline: 'Webcam-based study focus tracker that monitors attention and drowsiness in real time.',
    folder: 'Machine Learning',
    type: 'Computer Vision / Edge AI',
    status: 'In Development',
    isFeatured: true,
    featuredBadge: '★ PRIMARY PROJECT',

    whatItDoes:
      'CogniFocus is a local computer vision tool that monitors study engagement through your webcam at 30 FPS. It tracks 468 facial mesh landmarks in real time, measures eye aspect ratio and blink dynamics to detect fatigue, and estimates head orientation to detect when you are distracted. An interactive Streamlit dashboard shows live focus scores and a session engagement timeline.',
    whyBuilt:
      "When studying or working remotely for long hours, it's easy to zone out, get distracted by a phone, or push through when you're too exhausted to retain anything. Traditional timers only count clock intervals without knowing if you're actually paying attention. I wanted to build a lightweight, privacy-preserving tool that runs entirely on a laptop CPU to help track real, high-quality focus hours.",
    keyFeatures: [
      'Real-Time 3D Face Tracking: Extracts 468 canonical facial landmarks on CPU at native 30 FPS without needing an external GPU.',
      'Drowsiness & Fatigue Detection: Computes Eye Aspect Ratio (EAR) to detect prolonged eye closure, drooping eyelids, and abnormal blink bursts.',
      'Head Pose & Gaze Estimation: Estimates 3D pitch, yaw, and roll to detect when the user looks away from the monitor or tilts down toward their phone.',
      'Temporal Noise Smoothing: Applies moving-average window filters to prevent momentary micro-expressions from causing jittery focus scores.',
      'Interactive Telemetry Dashboard: Displays real-time focus percentage, focus vs. distraction duration, and session summary curves via Streamlit.',
      '100% Private & Local: Video frames are processed in memory and never leave your machine — zero video streams or images are sent to the cloud.',
    ],
    technologiesUsed: [
      { technology: 'Python', role: 'Core application logic, signal processing loop, and data aggregation.' },
      { technology: 'OpenCV', role: 'Real-time webcam video stream ingestion, color conversion, and frame buffering.' },
      { technology: 'MediaPipe', role: 'Sub-millisecond inference of 468 3D facial landmarks on standard CPU.' },
      { technology: 'NumPy & Pandas', role: 'Vectorized Euclidean distance calculations, rolling temporal windows, and statistics.' },
      { technology: 'scikit-learn', role: 'Baseline supervised engagement classification and cross-validation pipelines.' },
      { technology: 'Streamlit', role: 'Local interactive web application displaying real-time focus telemetry.' },
    ],

    workflowSteps: [
      {
        step: 1,
        title: 'Video Ingestion',
        desc: 'Captures continuous 640×480 webcam frames via OpenCV and converts color spaces from BGR to RGB.',
      },
      {
        step: 2,
        title: 'Facial Landmark Extraction',
        desc: 'MediaPipe Face Mesh tracks 468 3D coordinates representing ocular boundaries, irises, and facial contours.',
      },
      {
        step: 3,
        title: 'Geometric Signal Processing',
        desc: 'Calculates the scalar Eye Aspect Ratio (EAR) for blink dynamics and Perspective-n-Point (PnP) angles for head orientation.',
      },
      {
        step: 4,
        title: 'Smoothing & Live Telemetry',
        desc: 'A rolling window filter aggregates frame measurements to eliminate flicker and renders live engagement curves on Streamlit.',
      },
    ],
    engineeringDecisions: [
      'Edge-First Privacy: Running 100% locally on consumer CPU ensures students do not have to worry about private camera feeds being transmitted over the network.',
      'Geometric Landmarks over Heavy Video Models: Explicit mathematical landmark features (EAR, head angles) are dramatically lighter and more interpretable than black-box deep video networks.',
      'Temporal Window Smoothing: Instantaneous single-frame classifications fluctuate from natural blinks; rolling-window smoothing creates stable, readable session trends.',
    ],

    repoUrl: 'https://github.com/Logesh051',
    repoLabel: 'github.com/Logesh051/CogniFocus',
    setupCommands: [
      'git clone https://github.com/Logesh051/CogniFocus.git',
      'cd CogniFocus',
      'pip install -r requirements.txt',
      'streamlit run app.py',
    ],
    keyFiles: [
      { file: 'app.py', role: 'Streamlit web interface, telemetry charts, and live session stats.' },
      { file: 'tracker.py', role: 'OpenCV capture loop and MediaPipe 3D face mesh extraction engine.' },
      { file: 'features.py', role: 'Eye Aspect Ratio (EAR), blink velocity, and head-pose calculation functions.' },
      { file: 'requirements.txt', role: 'Project dependencies (opencv-python, mediapipe, streamlit, numpy).' },
    ],
  },
  {
    id: 'startup-valuation',
    name: 'Startup Valuation Predictor',
    tagline: 'Machine learning regression ensemble for estimating startup funding valuations.',
    folder: 'Machine Learning',
    type: 'Tabular ML / Contest Project',
    status: 'Completed',
    isFeatured: true,
    featuredBadge: '★ ML ENSEMBLE',

    whatItDoes:
      'A machine learning pipeline that predicts venture-backed startup valuations from operational, funding, and industry metrics. It cleans noisy tabular investment datasets, engineers domain-specific financial features, and combines multiple gradient boosted decision tree models into a stacking ensemble with a cross-validated meta-regressor.',
    whyBuilt:
      'Early-stage startup valuations often feel subjective and unpredictable, influenced by market cycles, investment round counts, and sector hype. During a machine learning competitive challenge, I wanted to investigate whether a rigorously engineered tabular ensemble could identify meaningful non-linear valuation patterns using historical funding velocity and operational data.',
    keyFeatures: [
      'Stacking Ensemble Architecture: Combines predictions from LightGBM, XGBoost, and CatBoost to blend different tree-splitting strategies.',
      'Domain Feature Engineering: Created custom financial indicators including startup age, funding velocity (capital raised per year), and investment per investor.',
      'Out-of-Fold Cross-Validation: Evaluates base models across 5-fold cross-validation to generate clean meta-features without target leakage.',
      'Skewed Target Transformation: Applied log1p transformations to highly skewed monetary numbers, preventing extreme outlier valuations from destabilizing gradients.',
      'Categorical Encoding: Handled high-cardinality industry sectors and geographic countries using targeted encoding and CatBoost native handling.',
    ],
    technologiesUsed: [
      { technology: 'Python', role: 'Core pipeline scripting, exploratory data analysis, and feature transforms.' },
      { technology: 'LightGBM', role: 'Fast histogram-based gradient boosted decision tree base model.' },
      { technology: 'XGBoost', role: 'Exact and histogram gradient boosted tree base estimator with depth regularization.' },
      { technology: 'CatBoost', role: 'Gradient boosting model with native categorical handling for industry and country fields.' },
      { technology: 'Scikit-Learn', role: 'Cross-validation splits, RidgeCV meta-estimator, and preprocessing transformers.' },
      { technology: 'Pandas & NumPy', role: 'Tabular data cleaning, missing value imputation, and matrix operations.' },
    ],

    workflowSteps: [
      {
        step: 1,
        title: 'Data Cleaning & Preprocessing',
        desc: 'Handles missing values, standardizes date formats, and applies log1p transforms to stabilize skewed financial figures.',
      },
      {
        step: 2,
        title: 'Feature Engineering',
        desc: 'Derives domain indicators including company operational age, capital velocity per round, and investor distribution ratios.',
      },
      {
        step: 3,
        title: 'Base Model Cross-Validation',
        desc: 'Trains LightGBM, XGBoost, and CatBoost models across 5 cross-validation folds, collecting out-of-fold predictions.',
      },
      {
        step: 4,
        title: 'Stacking Meta-Regression',
        desc: 'Feeds blended out-of-fold predictions into a RidgeCV meta-regressor to compute the final valuation estimate.',
      },
    ],
    engineeringDecisions: [
      'Ensemble Diversity over Single Models: LightGBM, XGBoost, and CatBoost use different tree-growth strategies (leaf-wise vs. depth-wise); combining them consistently outperforms any single model.',
      'Leakage-Free Meta-Training: Training the Ridge meta-regressor strictly on out-of-fold predictions ensures it learns true generalization weights rather than overfitting on training artifacts.',
      'Domain Ratios over Raw Counts: Funding velocity (capital divided by age) proved far more predictive than total capital raised alone.',
    ],

    repoUrl: 'https://github.com/Logesh051',
    repoLabel: 'github.com/Logesh051/startup-valuation',
    setupCommands: [
      'git clone https://github.com/Logesh051/startup-valuation.git',
      'cd startup-valuation',
      'pip install -r requirements.txt',
      'python train_ensemble.py',
    ],
    keyFiles: [
      { file: 'train_ensemble.py', role: 'Full stacking pipeline: data loading, 5-fold CV, and Ridge meta-learner training.' },
      { file: 'feature_engineering.py', role: 'Domain ratio calculations (capital velocity, age, investor distributions).' },
      { file: 'models.py', role: 'Hyperparameter configurations for LightGBM, XGBoost, and CatBoost estimators.' },
      { file: 'requirements.txt', role: 'Dependencies (lightgbm, xgboost, catboost, scikit-learn, pandas).' },
    ],
  },
  {
    id: 'image-authenticity',
    name: 'AI vs Real Image Detector',
    tagline: 'Deep learning CNN app to classify images as human-shot photographs or AI-generated.',
    folder: 'AI Applications',
    type: 'Deep Learning / Computer Vision',
    status: 'Completed',
    isFeatured: false,

    whatItDoes:
      'An end-to-end computer vision web app that distinguishes authentic photographic images from synthetic AI-generated pictures (such as Midjourney, DALL-E, or Stable Diffusion outputs). Users can upload any image to receive an immediate authenticity classification and a model confidence score.',
    whyBuilt:
      'With generative image tools becoming mainstream, synthetic images are increasingly difficult to identify with the naked eye. I built this deep learning classifier to explore how convolutional neural networks learn subtle frequency artifacts, edge textures, and pixel distributions that distinguish generative diffusion outputs from genuine camera sensors.',
    keyFeatures: [
      'Custom Convolutional Neural Network (CNN): Multi-layer architecture with Conv2D filters, MaxPooling, Dropout regularization, and Dense layers.',
      'Interactive Streamlit Interface: Drag-and-drop web UI allowing users to upload JPG/PNG images and view classification outcomes instantly.',
      'Automated Image Preprocessing: Automatically resizes incoming images to model dimensions, standardizes aspect ratios, and scales pixel tensors to [0, 1].',
      'Precompiled Model Deployment: Saves the trained network in standard .keras / .h5 formats for fast local CPU inference without retraining.',
    ],
    technologiesUsed: [
      { technology: 'Python', role: 'Development language for data preparation, model training, and web UI.' },
      { technology: 'TensorFlow & Keras', role: 'Convolutional neural network architecture, compilation, and training loops.' },
      { technology: 'OpenCV & Pillow', role: 'Image ingestion, spatial resizing, tensor normalization, and color adjustments.' },
      { technology: 'Streamlit', role: 'Interactive user interface for image uploads and visual confidence display.' },
      { technology: 'NumPy', role: 'Multidimensional array reshaping and batch tensor preprocessing.' },
    ],

    workflowSteps: [
      {
        step: 1,
        title: 'Image Upload',
        desc: 'User uploads an arbitrary photo (JPG, PNG) via the drag-and-drop Streamlit interface.',
      },
      {
        step: 2,
        title: 'Preprocessing & Tensor Scaling',
        desc: 'The image is resized to standard dimensions (e.g. 224×224), RGB-converted, and normalized to [0, 1].',
      },
      {
        step: 3,
        title: 'CNN Forward Pass',
        desc: 'Tensor flows through sequential Conv2D and MaxPooling layers to extract localized visual patterns.',
      },
      {
        step: 4,
        title: 'Classification & Confidence',
        desc: 'A sigmoid output layer generates the final probability score: Real Photograph vs. AI-Generated.',
      },
    ],
    engineeringDecisions: [
      'Conv2D Layers for Texture Artifacts: CNNs naturally capture spatial hierarchies of edges and micro-textures where synthetic diffusion models often introduce subtle boundary artifacts.',
      'Lightweight Streamlit UI: Using Streamlit allows non-technical users to test the model interactively without installing Python or command-line tools.',
      'Standardized Input Scaling: Consistent tensor normalization ensures the classifier performs reliably on varying camera resolutions and aspect ratios.',
    ],

    repoUrl: 'https://github.com/Logesh051/cnn-image-authenticity-detection',
    repoLabel: 'github.com/Logesh051/cnn-image-authenticity-detection',
    setupCommands: [
      'git clone https://github.com/Logesh051/cnn-image-authenticity-detection.git',
      'cd cnn-image-authenticity-detection',
      'pip install -r requirements.txt',
      'streamlit run app.py',
    ],
    keyFiles: [
      { file: 'app.py', role: 'Streamlit upload application, image preview, and prediction gauge.' },
      { file: 'model.py', role: 'Keras sequential CNN architecture definition and layer configuration.' },
      { file: 'ai_image_detector.keras', role: 'Trained model weights ready for immediate inference.' },
      { file: 'requirements.txt', role: 'Dependencies (tensorflow, opencv-python, streamlit, pillow).' },
    ],
  },
  {
    id: 'email-triage',
    name: 'Smart Email Triage',
    tagline: 'Automated email categorization and urgency routing API built with FastAPI and NLP.',
    folder: 'AI Applications',
    type: 'NLP / Backend Service',
    status: 'Completed',
    isFeatured: false,

    whatItDoes:
      'A containerized backend service that automatically categorizes incoming customer support and team inbox messages. It processes raw email text through an NLP pipeline, classifies the message into actionable intent buckets (e.g., Technical Support, Billing, Account Inquiry), and assigns an urgency priority over an asynchronous REST API.',
    whyBuilt:
      'Shared support inboxes and corporate desks receive hundreds of emails daily. Sorting through them manually creates response bottlenecks and risks critical emergencies getting buried under routine inquiries. I built this service to automatically classify messages in real time so teams can prioritize urgent issues and automate routing.',
    keyFeatures: [
      'FastAPI Asynchronous Backend: High-throughput async endpoints capable of handling both single message evaluation and batch email workloads.',
      'NLP Text Preprocessing: Cleans raw email headers, strips punctuation, normalizes capitalization, and eliminates common English stopwords.',
      'TF-IDF Feature Extraction: Vectorizes cleaned message text into statistical word importance representations.',
      'Multi-Class Category & Urgency Routing: Predicts primary department routing and flags messages requiring immediate human intervention.',
      'Dockerized Environment: Packaged in a containerized Docker configuration for reproducible deployment across cloud and local servers.',
    ],
    technologiesUsed: [
      { technology: 'Python', role: 'Core backend service, pipeline orchestration, and NLP workflows.' },
      { technology: 'FastAPI & Uvicorn', role: 'High-speed asynchronous REST API endpoints with automatic OpenAPI documentation.' },
      { technology: 'Scikit-Learn', role: 'TF-IDF text vectorization and probabilistic classification models.' },
      { technology: 'NLTK', role: 'Lexical text tokenization and stopword filtering.' },
      { technology: 'Docker', role: 'Reproducible container environment configuration with isolated dependencies.' },
    ],

    workflowSteps: [
      {
        step: 1,
        title: 'API Request Ingestion',
        desc: 'Client sends incoming email subject and body JSON payload to the /classify REST endpoint.',
      },
      {
        step: 2,
        title: 'NLP Text Normalization',
        desc: 'NLTK pipeline removes header noise, punctuation, and common stopwords, producing clean lexical tokens.',
      },
      {
        step: 3,
        title: 'TF-IDF Vectorization',
        desc: 'Transforms normalized tokens into numerical term-frequency inverse-document-frequency feature vectors.',
      },
      {
        step: 4,
        title: 'Routing & Priority Response',
        desc: 'Returns JSON response with assigned department category, urgency flag, and confidence score in <25ms.',
      },
    ],
    engineeringDecisions: [
      'FastAPI for Low-Latency Ingestion: Asynchronous request handling ensures the triage service can process incoming mail webhooks concurrently without blocking the main event loop.',
      'Interpretable TF-IDF Baseline: TF-IDF with linear/probabilistic classification is extremely fast, computationally lightweight, and easily deployable inside small container instances.',
      'Containerized Portability: Docker packaging ensures that dependencies and NLP models run identically across development and production environments.',
    ],

    repoUrl: 'https://github.com/Logesh051/email-env',
    repoLabel: 'github.com/Logesh051/email-env',
    setupCommands: [
      'git clone https://github.com/Logesh051/email-env.git',
      'cd email-env',
      'pip install -r requirements.txt',
      'uvicorn app:app --reload',
    ],
    keyFiles: [
      { file: 'app.py', role: 'FastAPI application server with /classify and /health endpoints.' },
      { file: 'classifier.py', role: 'NLP text preprocessing, TF-IDF vectorizer, and inference engine.' },
      { file: 'Dockerfile', role: 'Container build definition for isolated server execution.' },
      { file: 'requirements.txt', role: 'Dependencies (fastapi, uvicorn, scikit-learn, nltk).' },
    ],
  },
];

const BASE_PROJECTS_PATH = 'C:\\My Projects';

type FolderSelection = 'all' | 'Machine Learning' | 'AI Applications';
type TabKey = 'overview' | 'workflow' | 'code';
type MenuKey = 'file' | 'view' | 'tools' | 'help' | null;

interface Props {
  activeSection?: SectionId;
  onNavigate?: (section: SectionId) => void;
}

const ProjectsPage: React.FC<Props> = ({ activeSection, onNavigate }) => {
  // Navigation stack state
  const [selectedFolder, setSelectedFolder] = useState<FolderSelection>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('cognifocus');
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [isFoldersPaneVisible, setIsFoldersPaneVisible] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768;
    }
    return true;
  });

  // History stack for Back/Forward
  const [history, setHistory] = useState<string[]>(['cognifocus']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Address Bar state
  const [addressInput, setAddressInput] = useState<string>(
    `${BASE_PROJECTS_PATH}\\Machine Learning\\CogniFocus`
  );
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);

  // Menus & Modals
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [propertiesModalOpen, setPropertiesModalOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const addressDropdownRef = useRef<HTMLDivElement>(null);

  // Active Project resolution
  const selectedProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.id === selectedProjectId) || PROJECTS_DATA[0];
  }, [selectedProjectId]);

  // Sync Address Input when project or folder changes
  useEffect(() => {
    const fullPath = `${BASE_PROJECTS_PATH}\\${selectedProject.folder}\\${selectedProject.name}`;
    setAddressInput(fullPath);
  }, [selectedProject]);

  // Handle direct SectionId routing (e.g. projects/cognifocus)
  useEffect(() => {
    if (activeSection && activeSection.startsWith('projects/')) {
      const projId = activeSection.replace('projects/', '');
      const match = PROJECTS_DATA.find((p) => p.id === projId);
      if (match) {
        setSelectedProjectId(match.id);
        setSelectedFolder(match.folder);
      }
    }
  }, [activeSection]);

  // Close folders sidebar automatically on mobile screens
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        setIsFoldersPaneVisible(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Selection handler with routing synchronization
  const handleSelectProject = (projectId: string) => {
    const proj = PROJECTS_DATA.find((p) => p.id === projectId);
    if (!proj) return;

    if (projectId !== selectedProjectId) {
      const newHistory = [...history.slice(0, historyIndex + 1), projectId];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setSelectedProjectId(projectId);
      setSelectedFolder(proj.folder);
      if (onNavigate) {
        onNavigate(`projects/${projectId}` as SectionId);
      }
    }
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setIsFoldersPaneVisible(false);
    }
    setActiveMenu(null);
  };

  const handleSelectFolder = (folder: FolderSelection) => {
    setSelectedFolder(folder);
    if (folder !== 'all') {
      const firstInFolder = PROJECTS_DATA.find((p) => p.folder === folder);
      if (firstInFolder) {
        handleSelectProject(firstInFolder.id);
      }
    }
    setActiveMenu(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      const prevProjId = history[prevIdx];
      setSelectedProjectId(prevProjId);
      const proj = PROJECTS_DATA.find((p) => p.id === prevProjId);
      if (proj) {
        setSelectedFolder(proj.folder);
        if (onNavigate) {
          onNavigate(`projects/${prevProjId}` as SectionId);
        }
      }
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      const nextProjId = history[nextIdx];
      setSelectedProjectId(nextProjId);
      const proj = PROJECTS_DATA.find((p) => p.id === nextProjId);
      if (proj) {
        setSelectedFolder(proj.folder);
        if (onNavigate) {
          onNavigate(`projects/${nextProjId}` as SectionId);
        }
      }
    }
  };

  const goUp = () => {
    if (selectedFolder !== 'all') {
      setSelectedFolder('all');
    }
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  // Address Bar navigation
  const handleAddressSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = addressInput.trim().toLowerCase().replace(/[\\/]+$/, '');

    // Check direct project names
    const matchedProj = PROJECTS_DATA.find(
      (p) =>
        p.name.toLowerCase() === clean ||
        p.id.toLowerCase() === clean ||
        `${BASE_PROJECTS_PATH}\\${p.folder}\\${p.name}`.toLowerCase() === clean ||
        `${p.folder}\\${p.name}`.toLowerCase() === clean
    );

    if (matchedProj) {
      handleSelectProject(matchedProj.id);
      return;
    }

    if (clean.includes('machine learning')) {
      handleSelectFolder('Machine Learning');
      return;
    }

    if (clean.includes('ai applications') || clean.includes('ai apps')) {
      handleSelectFolder('AI Applications');
      return;
    }

    if (clean === 'c:\\my projects' || clean === 'my projects' || clean === 'c:') {
      handleSelectFolder('all');
      return;
    }

    setErrorModal({
      open: true,
      message: `Cannot find '${addressInput}'. Please ensure the path name is spelled correctly.`,
    });
    setAddressInput(`${BASE_PROJECTS_PATH}\\${selectedProject.folder}\\${selectedProject.name}`);
  };

  const handleCopySummary = () => {
    const text = `Project: ${selectedProject.name}
Tagline: ${selectedProject.tagline}
Status: ${selectedProject.status}
Category: ${selectedProject.folder}
Summary: ${selectedProject.whatItDoes}
Technologies: ${selectedProject.technologiesUsed.map((t) => t.technology).join(', ')}
Repository: ${selectedProject.repoUrl}`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyFeedback('Copied to clipboard!');
        setTimeout(() => setCopyFeedback(null), 2500);
      })
      .catch(() => {
        setCopyFeedback('Copy failed');
        setTimeout(() => setCopyFeedback(null), 2500);
      });
  };

  const handleCopySetup = () => {
    const text = selectedProject.setupCommands.join('\n');
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyFeedback('Setup commands copied!');
        setTimeout(() => setCopyFeedback(null), 2500);
      })
      .catch(() => {
        setCopyFeedback('Copy failed');
        setTimeout(() => setCopyFeedback(null), 2500);
      });
  };

  return (
    <div className="proj-app" onClick={() => activeMenu && setActiveMenu(null)}>
      {/* 1. Menu Bar */}
      <div className="proj-menubar" onClick={(e) => e.stopPropagation()}>
        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'file' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'file' ? null : 'file'))}
          >
            <u>F</u>ile
          </button>
          {activeMenu === 'file' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  window.open(selectedProject.repoUrl, '_blank', 'noopener,noreferrer');
                  setActiveMenu(null);
                }}
              >
                <span>Open Project Repository</span>
                <span className="proj-dropdown-shortcut">↗</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  setPropertiesModalOpen(true);
                  setActiveMenu(null);
                }}
              >
                <span>Properties</span>
              </div>
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'view' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'view' ? null : 'view'))}
          >
            <u>V</u>iew
          </button>
          {activeMenu === 'view' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  setIsFoldersPaneVisible((prev) => !prev);
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{isFoldersPaneVisible ? '✓' : ''}</span>
                <span>Folders Bar</span>
              </div>
              <div className="proj-dropdown-separator" />
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSelectFolder('all');
                  setActiveMenu(null);
                }}
              >
                <span>All Projects</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSelectFolder('Machine Learning');
                  setActiveMenu(null);
                }}
              >
                <span>Machine Learning Folder</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSelectFolder('AI Applications');
                  setActiveMenu(null);
                }}
              >
                <span>AI Applications Folder</span>
              </div>
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'tools' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'tools' ? null : 'tools'))}
          >
            <u>T</u>ools
          </button>
          {activeMenu === 'tools' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  window.open('https://github.com/Logesh051', '_blank', 'noopener,noreferrer');
                  setActiveMenu(null);
                }}
              >
                <span>Logesh NA GitHub Profile</span>
              </div>
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'help' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'help' ? null : 'help'))}
          >
            <u>H</u>elp
          </button>
          {activeMenu === 'help' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  setShowHelpModal(true);
                  setActiveMenu(null);
                }}
              >
                <span>About Projects Explorer...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="proj-toolbar">
        <div className="proj-toolbar-group">
          <button
            className="proj-tool-btn"
            onClick={goBack}
            disabled={!canGoBack}
            title="Back to previous project (Alt+Left)"
          >
            <BackNavIcon />
            <span className="proj-tool-label">Back</span>
          </button>
          <button
            className="proj-tool-btn"
            onClick={goForward}
            disabled={!canGoForward}
            title="Forward (Alt+Right)"
          >
            <ForwardNavIcon />
            <span className="proj-tool-label">Forward</span>
          </button>
          <button
            className="proj-tool-btn"
            onClick={goUp}
            disabled={selectedFolder === 'all'}
            title="Up to All Projects"
          >
            <UpFolderIcon />
            <span className="proj-tool-label">Up</span>
          </button>
        </div>

        <div className="proj-tool-separator" />

        <div className="proj-toolbar-group">
          <button
            className={`proj-tool-btn ${isFoldersPaneVisible ? 'proj-tool-btn--pressed' : ''}`}
            onClick={() => setIsFoldersPaneVisible((prev) => !prev)}
            title="Toggle Folders Sidebar Pane"
          >
            <FoldersToggleIcon />
            <span className="proj-tool-label">Folders</span>
          </button>
          <button
            className="proj-tool-btn"
            onClick={() => setPropertiesModalOpen(true)}
            title="Open Project Properties"
          >
            <PropertiesNavIcon />
            <span className="proj-tool-label">Properties</span>
          </button>
        </div>

        <div className="proj-tool-separator" />

        {/* Quick Launch Switcher Pills */}
        <div className="proj-quick-pills">
          {PROJECTS_DATA.map((p) => {
            const isActive = p.id === selectedProjectId;
            return (
              <button
                key={p.id}
                className={`proj-quick-btn ${isActive ? 'proj-quick-btn--active' : ''}`}
                onClick={() => handleSelectProject(p.id)}
                title={p.tagline}
              >
                {p.isFeatured && <span className="proj-quick-star">★</span>}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Address Bar */}
      <div className="proj-address-bar" ref={addressDropdownRef}>
        <span className="proj-address-label">Address</span>
        <form onSubmit={handleAddressSubmit} className="proj-address-form">
          <div className="proj-address-field win-sunken">
            <svg width="14" height="14" viewBox="0 0 16 16" className="proj-folder-svg">
              <path d="M1 2h5l2 2h7v9H1V2z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
              <path d="M1 4h14v8H1V4z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
            </svg>
            <input
              type="text"
              className="proj-address-input"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onFocus={() => setAddressDropdownOpen(true)}
              aria-label="Current Address"
            />
            <button
              type="button"
              className="proj-address-arrow"
              onClick={() => setAddressDropdownOpen((prev) => !prev)}
              aria-label="Show Path Suggestions"
            >
              ▼
            </button>
          </div>
        </form>

        {addressDropdownOpen && (
          <div className="proj-address-dropdown win-raised">
            <div
              className="proj-address-option"
              onClick={() => {
                handleSelectFolder('all');
                setAddressDropdownOpen(false);
              }}
            >
              <span>{BASE_PROJECTS_PATH}</span>
            </div>
            {PROJECTS_DATA.map((p) => (
              <div
                key={p.id}
                className="proj-address-option"
                onClick={() => {
                  handleSelectProject(p.id);
                  setAddressDropdownOpen(false);
                }}
              >
                <span>
                  {BASE_PROJECTS_PATH}\{p.folder}\{p.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Body Area: Two-Pane Explorer View */}
      <div className="proj-body">
        {/* Left Tree Pane */}
        {isFoldersPaneVisible && (
          <div className="proj-left-pane" role="region" aria-label="Folders Sidebar">
            <div className="proj-pane-titlebar">
              <span className="proj-pane-title">Folders</span>
              <button
                className="proj-pane-close"
                title="Close Folders Bar"
                onClick={() => setIsFoldersPaneVisible(false)}
              >
                ✕
              </button>
            </div>

            <div className="proj-tree win-sunken" role="tree" aria-label="Projects Hierarchy Tree">
              {/* Root Node: My Projects */}
              <div
                className={`proj-tree-node ${selectedFolder === 'all' ? 'proj-tree-node--selected' : ''}`}
                onClick={() => handleSelectFolder('all')}
                tabIndex={0}
                role="treeitem"
                aria-selected={selectedFolder === 'all'}
              >
                <span className="proj-tree-toggle">-</span>
                <svg width="16" height="14" viewBox="0 0 16 14" className="proj-folder-svg">
                  <path d="M1 2h5l2 2h7v9H1V2z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                  <path d="M1 4h14v8H1V4z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                </svg>
                <span className="proj-tree-label">My Projects</span>
              </div>

              {/* Branch 1: Machine Learning */}
              <div className="proj-tree-branch">
                <div
                  className={`proj-tree-node ${selectedFolder === 'Machine Learning' ? 'proj-tree-node--selected' : ''}`}
                  onClick={() => handleSelectFolder('Machine Learning')}
                  tabIndex={0}
                  role="treeitem"
                  aria-selected={selectedFolder === 'Machine Learning'}
                >
                  <span className="proj-tree-connector">├─</span>
                  <svg width="16" height="14" viewBox="0 0 16 14" className="proj-folder-svg">
                    <path d="M1 2h5l2 2h7v9H1V2z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                    <path d="M1 4h14v8H1V4z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                  </svg>
                  <span className="proj-tree-label">Machine Learning</span>
                </div>

                <div className="proj-tree-subbranch">
                  {PROJECTS_DATA.filter((p) => p.folder === 'Machine Learning').map((p, idx, arr) => {
                    const isSelected = selectedProjectId === p.id;
                    const isLast = idx === arr.length - 1;
                    return (
                      <div
                        key={p.id}
                        className={`proj-tree-subitem ${isSelected ? 'proj-tree-subitem--active' : ''} ${p.isFeatured ? 'proj-tree-subitem--featured' : ''}`}
                        onClick={() => handleSelectProject(p.id)}
                        tabIndex={0}
                        role="treeitem"
                        aria-selected={isSelected}
                      >
                        <span className="proj-tree-subconnector">{isLast ? '└─' : '├─'}</span>
                        <div className="proj-tree-icon-wrapper">
                          <svg width="13" height="13" viewBox="0 0 16 16" className="proj-file-svg">
                            <rect x="2" y="1" width="12" height="14" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                            <path d="M10 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8" />
                            <rect x="4" y="6" width="8" height="2" fill={isSelected ? '#ffffff' : '#000080'} />
                          </svg>
                          {p.isFeatured && <span className="proj-tree-star-badge">★</span>}
                        </div>
                        <span className="proj-tree-sublabel">{p.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Branch 2: AI Applications */}
                <div
                  className={`proj-tree-node ${selectedFolder === 'AI Applications' ? 'proj-tree-node--selected' : ''}`}
                  onClick={() => handleSelectFolder('AI Applications')}
                  tabIndex={0}
                  role="treeitem"
                  aria-selected={selectedFolder === 'AI Applications'}
                >
                  <span className="proj-tree-connector">└─</span>
                  <svg width="16" height="14" viewBox="0 0 16 14" className="proj-folder-svg">
                    <path d="M1 2h5l2 2h7v9H1V2z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                    <path d="M1 4h14v8H1V4z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                  </svg>
                  <span className="proj-tree-label">AI Applications</span>
                </div>

                <div className="proj-tree-subbranch">
                  {PROJECTS_DATA.filter((p) => p.folder === 'AI Applications').map((p, idx, arr) => {
                    const isSelected = selectedProjectId === p.id;
                    const isLast = idx === arr.length - 1;
                    return (
                      <div
                        key={p.id}
                        className={`proj-tree-subitem ${isSelected ? 'proj-tree-subitem--active' : ''}`}
                        onClick={() => handleSelectProject(p.id)}
                        tabIndex={0}
                        role="treeitem"
                        aria-selected={isSelected}
                      >
                        <span className="proj-tree-subconnector">{isLast ? '└─' : '├─'}</span>
                        <svg width="13" height="13" viewBox="0 0 16 16" className="proj-file-svg">
                          <rect x="2" y="1" width="12" height="14" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                          <path d="M10 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8" />
                          <rect x="4" y="6" width="8" height="2" fill={isSelected ? '#ffffff' : '#000080'} />
                        </svg>
                        <span className="proj-tree-sublabel">{p.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tree Summary Footer */}
            <div className="proj-tree-summary win-sunken">
              <div className="proj-tree-summary-row">
                <span className="proj-tree-summary-label">Selected:</span>
                <span className="proj-tree-summary-val">{selectedProject.name}</span>
              </div>
              <div className="proj-tree-summary-row">
                <span className="proj-tree-summary-label">Status:</span>
                <span className="proj-tree-summary-val">[{selectedProject.status}]</span>
              </div>
            </div>
          </div>
        )}

        {isFoldersPaneVisible && <div className="proj-splitter" />}

        {/* Right Details Pane */}
        <div className="proj-right-pane" role="main" aria-label="Project Details View">
          {/* Top Project Banner */}
          <div className="proj-detail-header win-raised">
            <div className="proj-detail-header-left">
              <div className="proj-detail-icon-frame">
                <svg width="36" height="36" viewBox="0 0 32 32">
                  <rect x="4" y="2" width="24" height="28" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                  <path d="M18 2v8h8" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                  <rect x="8" y="13" width="16" height="3" fill="#000080" />
                  <line x1="8" y1="19" x2="24" y2="19" stroke="#808080" strokeWidth="1.5" />
                  <line x1="8" y1="23" x2="18" y2="23" stroke="#808080" strokeWidth="1.5" />
                </svg>
                {selectedProject.isFeatured && (
                  <span className="proj-detail-icon-star" title="Primary Featured Project">
                    ★
                  </span>
                )}
              </div>

              <div className="proj-detail-header-text">
                <div className="proj-detail-title-line">
                  <h1 className="proj-detail-name">{selectedProject.name}</h1>
                  <span
                    className={`proj-status-badge proj-status-badge--${selectedProject.status.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    [{selectedProject.status}]
                  </span>
                  {selectedProject.isFeatured && (
                    <span className="proj-featured-ribbon">{selectedProject.featuredBadge}</span>
                  )}
                </div>
                <p className="proj-detail-tagline">{selectedProject.tagline}</p>
                <div className="proj-detail-submeta">
                  <span className="proj-submeta-item">
                    <strong>Category:</strong> {selectedProject.folder}
                  </span>
                  <span className="proj-submeta-sep">·</span>
                  <span className="proj-submeta-item">
                    <strong>Type:</strong> {selectedProject.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="proj-detail-header-actions">
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn proj-btn--primary win-raised"
                title={`Open repository on GitHub (${selectedProject.repoUrl})`}
              >
                <span>↗ View on GitHub</span>
              </a>
              <button
                className="proj-btn win-raised"
                onClick={handleCopySummary}
                title="Copy project summary to clipboard"
              >
                <span>📋 Copy Summary</span>
              </button>
              {copyFeedback && <span className="proj-copy-toast">{copyFeedback}</span>}
            </div>
          </div>

          {/* Clean 3 Retro Tabs */}
          <div className="proj-tabs" role="tablist">
            <button
              className={`proj-tab ${activeTab === 'overview' ? 'proj-tab--active' : ''}`}
              onClick={() => setActiveTab('overview')}
              role="tab"
              aria-selected={activeTab === 'overview'}
            >
              Overview
            </button>
            <button
              className={`proj-tab ${activeTab === 'workflow' ? 'proj-tab--active' : ''}`}
              onClick={() => setActiveTab('workflow')}
              role="tab"
              aria-selected={activeTab === 'workflow'}
            >
              How It Works
            </button>
            <button
              className={`proj-tab ${activeTab === 'code' ? 'proj-tab--active' : ''}`}
              onClick={() => setActiveTab('code')}
              role="tab"
              aria-selected={activeTab === 'code'}
            >
              Code &amp; Setup
            </button>
          </div>

          {/* Retro Tab Content Pane */}
          <div className="proj-tab-pane win-sunken" role="tabpanel">
            {/* ========================================================== */}
            {/* TAB 1: OVERVIEW                                            */}
            {/* ========================================================== */}
            {activeTab === 'overview' && (
              <div className="proj-content-section">
                {/* What It Does */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">What It Does</legend>
                  <p className="proj-paragraph">{selectedProject.whatItDoes}</p>
                </fieldset>

                {/* Why I Built It */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Why I Built It</legend>
                  <p className="proj-paragraph">{selectedProject.whyBuilt}</p>
                </fieldset>

                {/* Key Features */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Key Features</legend>
                  <ul className="proj-bullet-list">
                    {selectedProject.keyFeatures.map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </fieldset>

                {/* Technologies Used */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Technologies Used</legend>
                  <div className="proj-table-wrapper win-sunken">
                    <table className="proj-sunken-table">
                      <thead>
                        <tr>
                          <th style={{ width: '160px' }}>Technology</th>
                          <th>Role in this Project</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.technologiesUsed.map((t, idx) => (
                          <tr key={idx} className={idx % 2 === 1 ? 'proj-tr-alt' : ''}>
                            <td>
                              <span className="proj-tech-pill">{t.technology}</span>
                            </td>
                            <td>{t.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </fieldset>
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 2: HOW IT WORKS                                        */}
            {/* ========================================================== */}
            {activeTab === 'workflow' && (
              <div className="proj-content-section">
                {/* System Workflow Steps */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">System Workflow</legend>
                  <div className="proj-workflow-list">
                    {selectedProject.workflowSteps.map((ws) => (
                      <div key={ws.step} className="proj-workflow-step">
                        <div className="proj-step-num">{ws.step}</div>
                        <div className="proj-step-content">
                          <div className="proj-step-title">{ws.title}</div>
                          <p className="proj-step-desc">{ws.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Engineering Decisions */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Key Engineering Decisions</legend>
                  <ul className="proj-bullet-list">
                    {selectedProject.engineeringDecisions.map((decision, i) => (
                      <li key={i}>{decision}</li>
                    ))}
                  </ul>
                </fieldset>
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 3: CODE & SETUP                                        */}
            {/* ========================================================== */}
            {activeTab === 'code' && (
              <div className="proj-content-section">
                {/* Quick Setup Command Box */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Quick Setup &amp; Run</legend>
                  <p className="proj-table-intro">
                    Run these commands locally in your terminal to clone and start the project:
                  </p>
                  <div className="proj-terminal-box">
                    {selectedProject.setupCommands.map((cmd, i) => (
                      <div key={i}>
                        <span style={{ color: '#888888' }}>C:\Projects&gt; </span>
                        {cmd}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="proj-btn win-raised" onClick={handleCopySetup}>
                      <span>📋 Copy Run Commands</span>
                    </button>
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-btn proj-btn--primary win-raised"
                    >
                      <span>↗ Open GitHub Repository</span>
                    </a>
                  </div>
                </fieldset>

                {/* Key Files */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Key Files</legend>
                  <div className="proj-table-wrapper win-sunken">
                    <table className="proj-sunken-table">
                      <thead>
                        <tr>
                          <th style={{ width: '220px' }}>File</th>
                          <th>Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.keyFiles.map((kf, idx) => (
                          <tr key={idx} className={idx % 2 === 1 ? 'proj-tr-alt' : ''}>
                            <td>
                              <span className="proj-mono-code">{kf.file}</span>
                            </td>
                            <td>{kf.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </fieldset>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Status Bar */}
      <div className="proj-statusbar">
        <div className="proj-status-pane proj-status-pane--left">
          <span>{PROJECTS_DATA.length} Projects in catalog</span>
        </div>
        <div className="proj-status-pane">
          <span>Active: {selectedProject.name}</span>
        </div>
        <div className="proj-status-pane proj-status-pane--right">
          <span>Status: [{selectedProject.status}]</span>
        </div>
      </div>

      {/* Properties Modal */}
      {propertiesModalOpen && (
        <div className="proj-modal-overlay">
          <div className="proj-modal-dialog win-raised">
            <div className="proj-modal-titlebar">
              <span className="proj-modal-title">{selectedProject.name} Properties</span>
              <button
                className="proj-modal-close"
                onClick={() => setPropertiesModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="proj-modal-body">
              <div className="proj-props-content">
                <div className="proj-props-row">
                  <strong>Project Name:</strong>
                  <span>{selectedProject.name}</span>
                </div>
                <div className="proj-props-row">
                  <strong>Category:</strong>
                  <span>{selectedProject.folder}</span>
                </div>
                <div className="proj-props-row">
                  <strong>Type:</strong>
                  <span>{selectedProject.type}</span>
                </div>
                <div className="proj-props-row">
                  <strong>Status:</strong>
                  <span>[{selectedProject.status}]</span>
                </div>
                <div className="proj-props-row">
                  <strong>Repository:</strong>
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-inline-link"
                  >
                    {selectedProject.repoLabel}
                  </a>
                </div>
              </div>
              <div className="proj-modal-actions">
                <button
                  className="proj-btn win-raised"
                  onClick={() => setPropertiesModalOpen(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="proj-modal-overlay">
          <div className="proj-modal-dialog win-raised">
            <div className="proj-modal-titlebar">
              <span className="proj-modal-title">About Projects Explorer</span>
              <button className="proj-modal-close" onClick={() => setShowHelpModal(false)}>
                ✕
              </button>
            </div>
            <div className="proj-modal-body">
              <p style={{ margin: '0 0 8px 0', fontSize: '11px', lineHeight: 1.4 }}>
                <strong>Logesh NA — Technical Projects Explorer</strong>
              </p>
              <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: '#444444' }}>
                Browse machine learning, computer vision, and backend systems built with Python, OpenCV, MediaPipe, TensorFlow, and FastAPI.
              </p>
              <div className="proj-modal-actions">
                <button className="proj-btn win-raised" onClick={() => setShowHelpModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal.open && (
        <div className="proj-modal-overlay">
          <div className="proj-modal-dialog win-raised">
            <div className="proj-modal-titlebar">
              <span className="proj-modal-title">Address Error</span>
              <button
                className="proj-modal-close"
                onClick={() => setErrorModal({ open: false, message: '' })}
              >
                ✕
              </button>
            </div>
            <div className="proj-modal-body">
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px', color: '#cc0000' }}>⚠️</span>
                <p style={{ margin: 0, fontSize: '11px' }}>{errorModal.message}</p>
              </div>
              <div className="proj-modal-actions" style={{ marginTop: '12px' }}>
                <button
                  className="proj-btn win-raised"
                  onClick={() => setErrorModal({ open: false, message: '' })}
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

export default ProjectsPage;
