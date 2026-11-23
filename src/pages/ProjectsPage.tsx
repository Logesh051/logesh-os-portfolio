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
  category: string;
  purpose: string;
}

export interface PipelineStage {
  step: string;
  name: string;
  desc: string;
  algorithms: string;
}

export interface ArchitectureComponent {
  component: string;
  role: string;
  details: string;
}

export interface TechnicalFormulation {
  name: string;
  formula: string;
  explanation: string;
}

export interface ProjectDeliverable {
  name: string;
  type: string;
  description: string;
}

export interface KeyFile {
  file: string;
  role: string;
}

export interface Dependency {
  package: string;
  purpose: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  tagline: string;
  fullTitle: string;
  folder: 'Machine Learning' | 'AI Applications';
  type: string;
  status: 'Completed' | 'In Development' | 'Experimental Prototype';
  statusNote: string;
  isFeatured: boolean;
  featuredBadge: string;

  // Overview
  whatItDoes: string;
  problemSolved: string;
  objectives: string[];
  technologiesUsed: TechRole[];

  // Architecture
  asciiArchitecture: string;
  architectureComponents: ArchitectureComponent[];
  architecturalDecisions: string[];

  // Pipeline
  asciiPipeline: string;
  pipelineStages: PipelineStage[];
  technicalFormulations: TechnicalFormulation[];

  // Results / Status
  evaluationMethodology: {
    protocol: string;
    datasetOrSubjects: string;
    metricsPolicy: string;
    notes: string;
  };
  deliverables: ProjectDeliverable[];
  limitationsAndNextSteps: string[];

  // Source Code & Verification
  sourceCode: {
    repoUrl: string;
    repoLabel: string;
    repoNote: string;
    keyFiles: KeyFile[];
    sampleSnippetTitle: string;
    sampleSnippet: string;
    dependencies: Dependency[];
  };
}

export const PROJECTS_DATA: ProjectEntry[] = [
  {
    id: 'cognifocus',
    name: 'CogniFocus',
    tagline: 'Real-time webcam computer vision pipeline extracting 468 3D facial landmarks to estimate focus states during study sessions.',
    fullTitle: 'CogniFocus: Real-Time Multimodal Gaze and Facial Engagement Analytics for Adaptive Learning Environments',
    folder: 'Machine Learning',
    type: 'Computer Vision / Machine Learning',
    status: 'In Development',
    statusNote: 'Core pipeline implemented; evaluation in progress. Frame ingestion, landmark extraction, geometric feature calculations, temporal windowing, smoothing, and Streamlit telemetry dashboard are fully implemented. Benchmark cross-subject evaluation is currently ongoing.',
    isFeatured: true,
    featuredBadge: '★ PRIMARY ML SHOWCASE',

    whatItDoes:
      'CogniFocus is a local computer vision pipeline that estimates study engagement from standard webcam video streams. It captures video frames in real time, tracks 468 canonical 3D facial landmarks via MediaPipe Face Mesh, computes mathematical eye openness (Eye Aspect Ratio), gaze displacement vectors, and Perspective-n-Point head-pose angles, structures them into rolling temporal windows, and applies windowed exponential smoothing to render engagement curves on a local Streamlit dashboard.',
    problemSolved:
      'Standard study timers and productivity tools track only clock duration and completed intervals. They cannot assess whether a learner is actively looking at the screen, glancing away, or experiencing drowsiness. CogniFocus addresses this blind spot through non-intrusive, privacy-preserving local vision processing without requiring wearable sensors or cloud video streaming.',
    objectives: [
      'Ingest real-time webcam video at native 30 FPS using OpenCV frame buffers.',
      'Extract 468 high-density 3D facial mesh coordinates per frame without hardware accelerators.',
      'Compute geometric features: Eye Aspect Ratio (EAR), relative iris displacement, and Perspective-n-Point head pose.',
      'Structure continuous frame measurements into rolling temporal window vectors.',
      'Train supervised classification pipelines evaluated with Leave-One-Subject-Out (LOSO) cross-validation.',
      'Apply moving-average temporal smoothing to eliminate high-frequency prediction flickering.',
      'Present live engagement telemetry and session curve analytics via a local Streamlit dashboard.',
      'Explore personalized baseline calibration to accommodate natural individual variance in blink rates and resting head angles.'
    ],
    technologiesUsed: [
      {
        technology: 'Python',
        category: 'Core Language',
        purpose: 'End-to-end implementation of frame capture loops, geometric algorithms, temporal windowing, and machine learning.'
      },
      {
        technology: 'OpenCV',
        category: 'Computer Vision',
        purpose: 'Real-time webcam ingestion, color space conversion (BGR to RGB), frame buffer management, and PnP pose solving.'
      },
      {
        technology: 'MediaPipe Face Mesh',
        category: 'Facial Landmark Tracking',
        purpose: 'Sub-millisecond inference of 468 canonical 3D facial mesh landmarks on CPU without dedicated GPU hardware.'
      },
      {
        technology: 'NumPy',
        category: 'Vectorized Mathematics',
        purpose: 'Euclidean distance calculations between eye landmark coordinates, scalar EAR computation, and matrix geometry.'
      },
      {
        technology: 'Pandas',
        category: 'Time-Series Data',
        purpose: 'Structuring per-frame geometric signals into rolling temporal windows and aggregating session telemetry statistics.'
      },
      {
        technology: 'scikit-learn',
        category: 'Machine Learning',
        purpose: 'Supervised classification model training, hyperparameter evaluation, and Leave-One-Subject-Out cross-validation.'
      },
      {
        technology: 'Streamlit',
        category: 'Telemetry Interface',
        purpose: 'Local interactive web application displaying real-time focus states, distraction intervals, and engagement curves.'
      }
    ],

    asciiArchitecture: `+-------------------------------------------------------------------------+
|                  COGNIFOCUS SYSTEM ARCHITECTURE                         |
+-------------------------------------------------------------------------+
|                                                                         |
|  [ WEBCAM INPUT ]  --> OpenCV Video Ingestion (RGB Frame Buffer)        |
|                                |                                        |
|                                v                                        |
|  [ GEOMETRIC MESH ] --> MediaPipe Face Mesh Tracker                     |
|                         * 468 3D Canonical Landmark Extraction          |
|                                |                                        |
|                                v                                        |
|  [ FEATURE EXTRACTION PIPELINE ]                                        |
|   +-----------------------+---------------------+--------------------+  |
|   | Eye Aspect Ratio (EAR)| Gaze Vector Offset  | Head Pose (PnP)    |  |
|   | Blink Duration & Freq | Iris-to-Corner Dist | Pitch, Yaw, Roll   |  |
|   +-----------------------+---------------------+--------------------+  |
|                                |                                        |
|                                v                                        |
|  [ TEMPORAL PROCESSING ] --> Rolling Window Accumulator (N Frames)      |
|                                |                                        |
|                                v                                        |
|  [ INFERENCE ENGINE ]   --> Supervised Classifier (scikit-learn)        |
|                                |                                        |
|                                v                                        |
|  [ POST-PROCESSING ]   --> Moving Average & Exponential Smoothing Filter|
|                                |                                        |
|                                v                                        |
|  [ PRESENTATION ]      --> Streamlit Local Interactive Analytics UI     |
|                                                                         |
+-------------------------------------------------------------------------+`,

    architectureComponents: [
      {
        component: 'Frame Acquisition Engine',
        role: 'Hardware Ingestion',
        details: 'OpenCV capture loop pulling 640x480 webcam frames, buffering images in memory, and converting color spaces to RGB for neural inference.'
      },
      {
        component: 'MediaPipe Face Mesh Detector',
        role: 'Geometric Localization',
        details: 'Extracts 468 high-precision 3D coordinates (x, y, z normalized) representing ocular boundaries, irises, lips, nose bridge, and facial contours.'
      },
      {
        component: 'Geometric Signal Calculator',
        role: 'Biometric Signal Processing',
        details: 'Derives scalar Eye Aspect Ratio (EAR) for blink dynamics, iris Euclidean horizontal/vertical displacement for gaze deviation, and Perspective-n-Point head rotations.'
      },
      {
        component: 'Rolling Window Generator',
        role: 'Temporal Aggregation',
        details: 'Segments continuous frame measurements into fixed-duration temporal windows (e.g., 5-second spans) computing mean, standard deviation, and signal velocity.'
      },
      {
        component: 'Supervised Engagement Estimator',
        role: 'State Classification',
        details: 'Evaluates engagement states (Focused, Distracted, Drowsy) trained on feature window distributions.'
      },
      {
        component: 'Temporal Noise Smoothing Filter',
        role: 'Hysteresis & Stabilization',
        details: 'Exponential moving average and majority voting across consecutive frames to suppress momentary landmark jitter and rapid prediction flicker.'
      },
      {
        component: 'Streamlit Telemetry Dashboard',
        role: 'Local Visualization',
        details: 'Presents real-time focus percentage, temporal focus timeline, blink rate charts, and post-session analytical summaries.'
      }
    ],

    architecturalDecisions: [
      'Edge / Local Computation: Runs entirely locally on consumer CPU hardware without sending video frames over the internet, preserving student privacy.',
      'Geometric Landmark Features over Raw Video Embeddings: Explicit geometric metrics (EAR, PnP head pose, gaze ratios) ensure complete mathematical interpretability compared to black-box video representations.',
      'Leave-One-Subject-Out (LOSO) Validation Protocol: Subjects exhibit distinct baseline blink rates and physical facial proportions; LOSO rigorously evaluates generalization to completely unseen participants.',
      'Temporal Window Smoothing: Instantaneous single-frame classifications fluctuate from natural micro-expressions; rolling temporal aggregation delivers clinically stable session engagement curves.'
    ],

    asciiPipeline: `+-------------------------------------------------------------------------+
|                    COGNIFOCUS DATA & SIGNAL PIPELINE                    |
+-------------------------------------------------------------------------+
|                                                                         |
|  Raw Frame Ingestion (640x480 RGB Video Stream)                         |
|         │                                                               |
|         ▼                                                               |
|  Facial Mesh Coordinate Extraction (468 3D Landmarks: x, y, z)          |
|         │                                                               |
|         ▼                                                               |
|  Geometric Feature Calculation:                                         |
|    • EAR = (||p2 - p6|| + ||p3 - p5||) / (2 * ||p1 - p4||)               |
|    • Gaze Ratio = ||iris_center - eye_inner|| / ||eye_outer - eye_inner|||
|    • Head Pose = cv2.solvePnP(3D_model_points, 2D_landmarks, K, dist)  |
|         │                                                               |
|         ▼                                                               |
|  Rolling Temporal Windowing (Aggregate mean, std, velocity over window)  |
|         │                                                               |
|         ▼                                                               |
|  Supervised Classification & Engagement State Prediction                |
|         │                                                               |
|         ▼                                                               |
|  Temporal Noise Smoothing (Exponential moving average to remove jitter) |
|         │                                                               |
|         ▼                                                               |
|  Session Time-Series Telemetry & Analytics Dashboard Output             |
|                                                                         |
+-------------------------------------------------------------------------+`,

    pipelineStages: [
      {
        step: 'Stage 1',
        name: 'Webcam Ingestion & Buffer Management',
        desc: 'OpenCV captures raw 30 FPS frames from the local webcam, formats pixel memory arrays, and converts BGR channels to RGB format.',
        algorithms: 'cv2.VideoCapture, cv2.cvtColor(BGR2RGB), thread-safe frame buffer'
      },
      {
        step: 'Stage 2',
        name: 'Facial Landmark Mesh Inference',
        desc: 'MediaPipe Face Mesh processes RGB frames to localize 468 3D canonical landmark points with normalized screen and depth coordinates.',
        algorithms: 'BlazeFace detector + 3D facial mesh regression network'
      },
      {
        step: 'Stage 3',
        name: 'Biometric Signal & Geometric Feature Extraction',
        desc: 'Computes Eye Aspect Ratio across vertical/horizontal eye contours, calculates iris displacement from ocular corners, and solves head orientation.',
        algorithms: 'Soukupová & Čech EAR formulation, cv2.solvePnP (Levenberg-Marquardt)'
      },
      {
        step: 'Stage 4',
        name: 'Temporal Window Feature Vector Assembly',
        desc: 'Aggregates frame-by-frame geometric signals across sliding temporal windows, computing statistical dispersion, mean, and rate-of-change.',
        algorithms: 'Rolling window statistical aggregation (Mean, Variance, Min, Max, Slope)'
      },
      {
        step: 'Stage 5',
        name: 'State Classification & Engagement Inference',
        desc: 'Evaluates feature vectors against trained supervised classifiers to estimate categorical focus states (Focused, Distracted, Inattentive).',
        algorithms: 'Supervised classifiers with stratified feature scaling'
      },
      {
        step: 'Stage 6',
        name: 'Temporal Noise Filtering & Hysteresis',
        desc: 'Applies an exponential decay smoothing filter across consecutive window predictions to suppress transient blinks and sensor noise.',
        algorithms: 'Exponential Moving Average (EMA) + minimum duration thresholding'
      },
      {
        step: 'Stage 7',
        name: 'Local Analytics & Session Reporting',
        desc: 'Streamlit renders interactive session analytics, visual attention timelines, cumulative engagement percentages, and break alerts.',
        algorithms: 'Streamlit reactive state rendering, Altair / Plotly time-series graphing'
      }
    ],

    technicalFormulations: [
      {
        name: 'Eye Aspect Ratio (EAR)',
        formula: 'EAR = (||p2 - p6|| + ||p3 - p5||) / (2.0 * ||p1 - p4||)',
        explanation:
          'Measures eye openness by dividing the vertical distance between upper/lower eyelid landmarks by the horizontal distance between lateral and medial corners. Decreases sharply during blinks and prolonged eyelid droop.'
      },
      {
        name: 'Perspective-n-Point Head Pose (PnP)',
        formula: 's * [u, v, 1]^T = K * [R | T] * [X, Y, Z, 1]^T',
        explanation:
          'Projects 3D canonical facial model points onto observed 2D image coordinates to estimate the rotation matrix R (pitch, yaw, roll) and translation vector T using intrinsic camera matrix K.'
      },
      {
        name: 'Iris Gaze Displacement Ratio',
        formula: 'Gaze_X = ||Iris_Center - Inner_Canthus|| / ||Outer_Canthus - Inner_Canthus||',
        explanation:
          'Measures horizontal gaze angle relative to the ocular frame, determining whether the user is fixated on the screen or looking away laterally.'
      },
      {
        name: 'Exponential Moving Average Smoothing',
        formula: 'S_t = α * Y_t + (1 - α) * S_{t-1}',
        explanation:
          'Applies decay factor α (e.g., 0.3) to smooth raw window predictions, preventing flickering between focus states during normal micro-movements.'
      }
    ],

    evaluationMethodology: {
      protocol: 'Leave-One-Subject-Out (LOSO) Cross-Validation',
      datasetOrSubjects: '9 Exploratory Participant Study Sessions (yielding 207 temporal feature windows)',
      metricsPolicy: 'Strict adherence to verified engineering facts. Definitive benchmark precision/recall/F1 claims are reserved pending standardized multi-lighting validation experiments.',
      notes:
        'Leave-One-Subject-Out validation ensures the model is never tested on data from participants used in training. This exposes true inter-subject variability, as facial geometry and blink behaviors differ naturally between individuals.'
    },

    deliverables: [
      {
        name: 'Real-Time Vision Pipeline',
        type: 'Python Implementation',
        description: 'OpenCV and MediaPipe capture script processing 468 landmarks at native 30 FPS.'
      },
      {
        name: 'Geometric Feature Extraction Module',
        type: 'Python Module',
        description: 'Vectorized algorithms computing EAR, gaze displacement ratios, and Perspective-n-Point head orientation.'
      },
      {
        name: 'Temporal Windowing Dataset',
        type: 'Tabular Dataset',
        description: '207 windowed feature vectors extracted across 9 exploratory participant recording sessions.'
      },
      {
        name: 'Streamlit Telemetry Application',
        type: 'Interactive Dashboard',
        description: 'Local web UI presenting real-time engagement telemetry, session curves, and study duration breakdowns.'
      }
    ],

    limitationsAndNextSteps: [
      'Personal Baseline Calibration: Active work to implement a 30-second resting calibration routine to establish individual blink baseline thresholds.',
      'Extreme Lighting & Occlusion Robustness: Evaluating low-light performance and testing landmark tracking with prescription eyewear.',
      'Off-Axis Monitor Geometries: Improving gaze estimation when the user works with multiple monitors or an offset webcam.',
      'Longitudinal Validation: Expanding multi-subject data collection across longer study sessions.'
    ],

    sourceCode: {
      repoUrl: 'https://github.com/Logesh051',
      repoLabel: 'github.com/Logesh051',
      repoNote: 'Academic R&D project; repository showcased on Logesh NA GitHub profile.',
      keyFiles: [
        { file: 'capture.py', role: 'Real-time webcam frame acquisition and MediaPipe Face Mesh landmark inference.' },
        { file: 'geometry.py', role: 'Vectorized EAR calculation, iris gaze displacement, and solvePnP head-pose estimation.' },
        { file: 'windowing.py', role: 'Sliding temporal window accumulator generating statistical feature vectors.' },
        { file: 'smoothing.py', role: 'Exponential moving average and majority voting noise filter.' },
        { file: 'app.py', role: 'Streamlit dashboard rendering real-time focus curves and session analytics.' }
      ],
      sampleSnippetTitle: 'Eye Aspect Ratio & Landmark Geometry Implementation',
      sampleSnippet: `import numpy as np

def calculate_ear(eye_landmarks: np.ndarray) -> float:
    """
    Computes Eye Aspect Ratio (EAR) from 6 2D/3D ocular coordinates:
    p1: lateral corner, p4: medial corner
    p2, p3: upper eyelid; p5, p6: lower eyelid
    """
    # Vertical euclidean distances
    dist_v1 = np.linalg.norm(eye_landmarks[1] - eye_landmarks[5])
    dist_v2 = np.linalg.norm(eye_landmarks[2] - eye_landmarks[4])
    
    # Horizontal euclidean distance
    dist_h = np.linalg.norm(eye_landmarks[0] - eye_landmarks[3])
    
    if dist_h == 0.0:
        return 0.0
        
    ear = (dist_v1 + dist_v2) / (2.0 * dist_h)
    return float(ear)`,
      dependencies: [
        { package: 'python >= 3.10', purpose: 'Core language runtime' },
        { package: 'opencv-python >= 4.8.0', purpose: 'Video ingestion and image geometry' },
        { package: 'mediapipe >= 0.10.0', purpose: '468 3D facial mesh landmark inference' },
        { package: 'numpy >= 1.24.0', purpose: 'Vectorized Euclidean math and matrix calculations' },
        { package: 'pandas >= 2.0.0', purpose: 'Rolling temporal dataframe aggregation' },
        { package: 'scikit-learn >= 1.3.0', purpose: 'Classifier modeling and cross-validation' },
        { package: 'streamlit >= 1.28.0', purpose: 'Local interactive telemetry dashboard' }
      ]
    }
  },

  {
    id: 'startup-valuation',
    name: 'Startup Valuation Engine',
    tagline: 'Multi-seed stacking ensemble regression combining LightGBM, XGBoost, and CatBoost with RidgeCV meta-estimator.',
    fullTitle: 'Startup Valuation Prediction Engine: Stacking Ensemble Regression with Out-of-Fold Cross-Validation',
    folder: 'Machine Learning',
    type: 'Machine Learning / Tabular Regression',
    status: 'In Development',
    statusNote: 'Core pipeline implemented; evaluation in progress. Multi-model gradient boosting stacking ensemble with 5-fold cross-validation across 10 random seeds on TS-ML-Contest tabular dataset. Cross-validation and submission export workflows are fully implemented.',
    isFeatured: true,
    featuredBadge: '★ PRIMARY ML SHOWCASE',

    whatItDoes:
      'The Startup Valuation Prediction Engine is a machine learning regression pipeline developed for the TS-ML-Contest competition. It predicts venture market valuations from tabular company and funding characteristics by combining three diverse gradient-boosted decision tree architectures (LightGBM, XGBoost, and CatBoost) via out-of-fold prediction blending and an L2-regularized RidgeCV meta-estimator.',
    problemSolved:
      'Predicting startup market valuation is challenging due to extreme skewness in funding capital distributions, high-cardinality categorical variables (industry, country), and complex non-linear interactions between investor syndicate size, funding frequency, and operational age. Single regression models frequently overfit or fail to capture asymmetric capital distributions.',
    objectives: [
      'Ingest and clean heterogeneous venture tabular datasets from TS-ML-Contest.',
      'Eliminate data leakage by removing non-predictive identifiers, company names, and founding years from feature inputs.',
      'Engineer 5 mathematical domain features capturing capital velocity, investor check sizes, and operational startup age.',
      'Normalize extreme skewness in total investment using logarithmic log1p transforms.',
      'Train three diverse gradient-boosted base regressors: LightGBM, XGBoost, and CatBoost with 1,500 estimators each.',
      'Execute a strict 5-fold cross-validation scheme iterated across 10 random seeds to suppress seed-level variance.',
      'Construct an out-of-fold (OOF) prediction blending matrix feeding an L2-regularized RidgeCV meta-estimator.',
      'Enforce target clipping to historical minimum and maximum bounds and export verified submission deliverables.'
    ],
    technologiesUsed: [
      {
        technology: 'Python',
        category: 'Core Language',
        purpose: 'End-to-end data pipeline orchestration, feature engineering, and cross-validation workflows.'
      },
      {
        technology: 'Pandas',
        category: 'Tabular Data',
        purpose: 'Dataset ingestion, categorical encoding, handling missing capital values, and tabular feature derivations.'
      },
      {
        technology: 'NumPy',
        category: 'Vectorized Calculations',
        purpose: 'Array manipulation, vectorized ratio math, logarithmic log1p transforms, and target boundary clipping.'
      },
      {
        technology: 'LightGBM',
        category: 'Gradient Boosting',
        purpose: 'Fast histogram-based gradient-boosted decision trees modeling non-linear tabular interactions efficiently.'
      },
      {
        technology: 'XGBoost',
        category: 'Gradient Boosting',
        purpose: 'Exact and histogram gradient boosting with depth-bounded trees (max depth 6) for robust feature splits.'
      },
      {
        technology: 'CatBoost',
        category: 'Gradient Boosting',
        purpose: 'Gradient boosted decision trees with native categorical variable split optimization for Industry and Country.'
      },
      {
        technology: 'scikit-learn',
        category: 'Ensemble & Validation',
        purpose: '5-fold cross-validation fold generation, RidgeCV meta-regressor training, and regression metrics.'
      },
      {
        technology: 'Kaggle / Jupyter',
        category: 'Prototyping Environment',
        purpose: 'Reproducible notebook experimentation, exploratory data analysis, and submission generation.'
      }
    ],

    asciiArchitecture: `+-------------------------------------------------------------------------+
|           STARTUP VALUATION ENGINE: STACKING ARCHITECTURE               |
+-------------------------------------------------------------------------+
|                                                                         |
|  [ TABULAR INPUT DATASET ]                                              |
|   • Capital, Funding Rounds, Investors, Founding Year, Industry, Country|
|                                |                                        |
|                                v                                        |
|  [ PREPROCESSING & FEATURE ENGINEERING ]                                |
|   • Startup Operational Age = Funding Year - Founding Year              |
|   • Capital Velocity = Total Investment / Funding Rounds                |
|   • Average Investor Check = Total Investment / Investor Count          |
|   • Investor Syndicate Density = Investor Count / Funding Rounds        |
|   • Skewness Normalization = log1p(Investment Amount)                   |
|                                |                                        |
|                                v                                        |
|  [ 5-FOLD CROSS-VALIDATION x 10 RANDOM SEEDS ]                          |
|   +-------------------+  +-------------------+  +--------------------+  |
|   | LightGBM Regressor|  | XGBoost Regressor |  | CatBoost Regressor |  |
|   | (Histogram Trees) |  | (Depth-Bounded)   |  | (Native Categoric) |  |
|   +-------------------+  +-------------------+  +--------------------+  |
|             \\                      |                     /              |
|              \\                     |                    /               |
|               v                    v                   v                |
|  [ OUT-OF-FOLD (OOF) PREDICTION MATRIX BLENDING (M x 3) ]               |
|                                |                                        |
|                                v                                        |
|  [ META-LEARNER REGRESSION ] --> RidgeCV (L2 Regularized Meta-Regressor)|
|                                |                                        |
|                                v                                        |
|  [ POST-PROCESSING ]        --> Target Boundary Minimum/Maximum Clipping|
|                                |                                        |
|                                v                                        |
|  [ EXPORT ARTIFACT ]        --> submission_final_defense.csv            |
|                                                                         |
+-------------------------------------------------------------------------+`,

    architectureComponents: [
      {
        component: 'Tabular Preprocessing & Leakage Guard',
        role: 'Data Sanitization',
        details: 'Filters out primary keys, company names, and raw founding dates to prevent memorization and ensure models generalize strictly on structural business metrics.'
      },
      {
        component: 'Domain Ratio Feature Generator',
        role: 'Feature Engineering',
        details: 'Constructs 5 interaction ratios capturing capital intensity, investor check sizes, capital velocity per round, and company operational lifespan.'
      },
      {
        component: 'LightGBM Base Estimator',
        role: 'Fast Histogram Tree Learner',
        details: 'Trains up to 1,500 trees at learning rate 0.03, utilizing leaf-wise tree growth to model complex non-linear capital interactions.'
      },
      {
        component: 'XGBoost Base Estimator',
        role: 'Depth-Bounded Tree Learner',
        details: 'Trains up to 1,500 trees at learning rate 0.03 with maximum depth constrained to 6 to guard against variance spikes on noisy samples.'
      },
      {
        component: 'CatBoost Base Estimator',
        role: 'Categorical Boosting Learner',
        details: 'Trains up to 1,500 iterations at learning rate 0.03, leveraging native target encoding algorithms for high-cardinality industry and geography features.'
      },
      {
        component: 'Multi-Seed Cross-Validation Loop',
        role: 'Variance Reduction',
        details: 'Executes 5-fold cross-validation across 10 random seeds, stabilizing out-of-fold prediction matrices against single-split noise.'
      },
      {
        component: 'RidgeCV Stacking Meta-Regressor',
        role: 'Ensemble Meta-Learner',
        details: 'Fits an L2-regularized Ridge regression model with internal cross-validation across out-of-fold predictions to find optimal blending weights.'
      },
      {
        component: 'Target Boundary Post-Processor',
        role: 'Extrapolation Guard',
        details: 'Clips final regression predictions to historical target minimum and maximum values, preventing aberrant negative or extreme unbounded valuations.'
      }
    ],

    architecturalDecisions: [
      'Stacking Ensemble over Single Model: Combining three distinct gradient boosting implementations (LightGBM, XGBoost, CatBoost) leverages differing algorithmic splitting heuristics and tree growth paradigms.',
      'Multi-Seed Iteration (10 Seeds): Evaluates cross-validation splits repeatedly to prevent overfitting blending weights to an idiosyncratic fold split.',
      'Logarithmic Transformation (log1p): Venture funding data exhibits high right-skewness spanning multiple orders of magnitude; log1p stabilizes residual errors during gradient descent.',
      'Target Boundary Clipping: Ensures exported predictions stay within historically observed domain bounds, preventing catastrophic prediction spikes.'
    ],

    asciiPipeline: `+-------------------------------------------------------------------------+
|                  STARTUP VALUATION EXECUTION PIPELINE                   |
+-------------------------------------------------------------------------+
|                                                                         |
|  Raw Tabular Data Ingestion (TS-ML-Contest Dataset)                     |
|         │                                                               |
|         ▼                                                               |
|  Data Cleaning & Leakage Prevention (Drop ID, Startup Name, Founding Yr)|
|         │                                                               |
|         ▼                                                               |
|  Feature Engineering: Derive 5 Mathematical Capital & Age Ratios        |
|         │                                                               |
|         ▼                                                               |
|  Logarithmic Scaling: Apply log1p transform to skewed investment sums   |
|         │                                                               |
|         ▼                                                               |
|  K-Fold Partitioning: 5-Fold Stratified Split across 10 Random Seeds    |
|         │                                                               |
|         ▼                                                               |
|  Parallel Base Model Fitting (LightGBM, XGBoost, CatBoost)              |
|         │                                                               |
|         ▼                                                               |
|  Out-of-Fold (OOF) Ensembling via RidgeCV Meta-Regression               |
|         │                                                               |
|         ▼                                                               |
|  Target Value Range Clipping & Export (submission_final_defense.csv)    |
|                                                                         |
+-------------------------------------------------------------------------+`,

    pipelineStages: [
      {
        step: 'Stage 1',
        name: 'Dataset Ingestion & Sanitization',
        desc: 'Loads competition tabular records, imputes missing values, and drops identifiers (Startup Name, ID, Founding Year) to prevent data leakage.',
        algorithms: 'Pandas DataFrame loading, column drop sanitization, missing value imputation'
      },
      {
        step: 'Stage 2',
        name: 'Domain Feature Engineering',
        desc: 'Derives 5 mathematical features: operational company age, capital velocity per round, capital per investor, and investor count per round.',
        algorithms: 'Vectorized ratio transformations, datetime year subtraction'
      },
      {
        step: 'Stage 3',
        name: 'Capital Skewness Normalization',
        desc: 'Applies natural logarithmic transform log1p to total investment amounts to compress long-tailed venture capital distributions.',
        algorithms: 'NumPy log1p vectorized transform: log(1 + x)'
      },
      {
        step: 'Stage 4',
        name: 'Multi-Seed K-Fold Stratification',
        desc: 'Configures 5-fold cross-validation shuffled across 10 distinct random seeds (50 total fold iterations) for unbiased evaluation.',
        algorithms: 'scikit-learn KFold(n_splits=5, shuffle=True, random_state=seed)'
      },
      {
        step: 'Stage 5',
        name: 'Base Estimator Parallel Fitting',
        desc: 'Fits LightGBM, XGBoost, and CatBoost models on training folds, recording out-of-fold prediction vectors on validation subsets.',
        algorithms: 'LightGBM Regressor (1500 trees), XGBoost Regressor (1500 trees), CatBoost Regressor (1500 trees)'
      },
      {
        step: 'Stage 6',
        name: 'RidgeCV Stacking Meta-Regression',
        desc: 'Constructs an M x 3 out-of-fold prediction matrix and fits an L2-regularized RidgeCV meta-estimator to derive optimal ensembling weights.',
        algorithms: 'scikit-learn RidgeCV(alphas=np.logspace(-3, 3, 20), cv=5)'
      },
      {
        step: 'Stage 7',
        name: 'Target Boundary Clipping & Submission Export',
        desc: 'Clips final continuous predictions to historical target bounds [y_min, y_max] and exports the competition submission file.',
        algorithms: 'np.clip(predictions, target_min, target_max), Pandas to_csv'
      }
    ],

    technicalFormulations: [
      {
        name: 'Operational Startup Age',
        formula: 'Age = Funding_Year - Founding_Year',
        explanation: 'Measures how many years the startup operated prior to the recorded funding round.'
      },
      {
        name: 'Capital Velocity per Round',
        formula: 'Capital_Velocity = Total_Investment / Funding_Rounds_Count',
        explanation: 'Measures capital intensity per round, distinguishing capital-heavy ventures from bootstrapped models.'
      },
      {
        name: 'Average Investor Commitment',
        formula: 'Commitment_Per_Investor = Total_Investment / Investor_Count',
        explanation: 'Average capital contributed per participating investor, reflecting syndicate conviction and check size.'
      },
      {
        name: 'Investor Syndicate Density',
        formula: 'Syndicate_Density = Investor_Count / Funding_Rounds_Count',
        explanation: 'Reflects average syndicate size per funding event.'
      },
      {
        name: 'Logarithmic Capital Scaling',
        formula: 'Scaled_Investment = log(1.0 + Total_Investment)',
        explanation: 'Compacts multi-million dollar venture capital right-skewness into normal distributions suitable for gradient boosting.'
      }
    ],

    evaluationMethodology: {
      protocol: '5-Fold Shuffled Cross-Validation across 10 Random Seeds',
      datasetOrSubjects: 'TS-ML-Contest Venture Tabular Dataset',
      metricsPolicy: 'Strict adherence to verified engineering facts. Definitive benchmark scores are reserved pending final evaluation on the official test set.',
      notes:
        'Multi-seed cross-validation guarantees that out-of-fold blending weights learned by the RidgeCV meta-estimator are not artifacts of a single lucky random seed. All predictions are generated strictly through out-of-fold blending.'
    },

    deliverables: [
      {
        name: 'Competition ML Pipeline Notebook',
        type: 'Jupyter / Kaggle Notebook',
        description: 'Complete Python workflow covering data cleaning, feature engineering, multi-seed CV, stacking, and export.'
      },
      {
        name: '5 Engineered Domain Features',
        type: 'Feature Engineering Pipeline',
        description: 'Mathematical ratio derivations for capital velocity, investor commitment, syndicate density, age, and log1p investment.'
      },
      {
        name: 'Stacking Ensemble Model',
        type: 'Trained Model Ensemble',
        description: 'Combined LightGBM, XGBoost, and CatBoost models with RidgeCV meta-estimator weights.'
      },
      {
        name: 'submission_final_defense.csv',
        type: 'Export Deliverable',
        description: 'Verified competition submission artifact containing bounded valuation predictions.'
      }
    ],

    limitationsAndNextSteps: [
      'Additional Tabular Architectures: Exploring TabNet and neural tabular architectures to introduce deeper non-tree model diversity.',
      'Macroeconomic Indicators: Integrating interest rate and VC climate temporal indexes into feature representations.',
      'Hyperparameter Optimization: Conducting systematic Bayesian optimization via Optuna across tree depth and regularization parameters.',
      'Sub-Sector Embedding: Developing embeddings for specific niche industry descriptions.'
    ],

    sourceCode: {
      repoUrl: 'https://github.com/Logesh051',
      repoLabel: 'github.com/Logesh051',
      repoNote: 'Competition ML project; notebook pipeline showcased on Logesh NA GitHub profile.',
      keyFiles: [
        { file: 'preprocessing.py', role: 'Tabular cleaning, leakage column dropping, and missing value imputation.' },
        { file: 'feature_engineering.py', role: '5 domain ratio calculations, age derivation, and log1p transformation.' },
        { file: 'models.py', role: 'LightGBM, XGBoost, and CatBoost base estimator definitions.' },
        { file: 'stacking.py', role: '5-fold cross-validation loop across 10 random seeds and RidgeCV meta-model fitting.' },
        { file: 'submission_final_defense.csv', role: 'Exported submission deliverable with target boundary clipping.' }
      ],
      sampleSnippetTitle: 'Multi-Seed Stacking Ensemble & RidgeCV Formulation',
      sampleSnippet: `import numpy as np
from sklearn.linear_model import RidgeCV
from sklearn.model_selection import KFold

def train_stacking_ensemble(X, y, base_models, n_seeds=10, n_splits=5):
    """
    Trains base models across n_seeds of 5-fold CV to generate
    an out-of-fold (OOF) prediction matrix for RidgeCV meta-learning.
    """
    n_samples = len(X)
    n_models = len(base_models)
    oof_predictions = np.zeros((n_samples, n_models))
    
    for seed in range(n_seeds):
        kf = KFold(n_splits=n_splits, shuffle=True, random_state=42 + seed)
        for train_idx, val_idx in kf.split(X, y):
            X_tr, y_tr = X.iloc[train_idx], y.iloc[train_idx]
            X_val = X.iloc[val_idx]
            
            for m_idx, (name, model) in enumerate(base_models):
                model.fit(X_tr, y_tr)
                oof_predictions[val_idx, m_idx] += model.predict(X_val) / n_seeds
                
    # Fit RidgeCV meta-regressor on combined OOF predictions
    meta_model = RidgeCV(alphas=np.logspace(-3, 3, 20), cv=5)
    meta_model.fit(oof_predictions, y)
    return meta_model, oof_predictions`,
      dependencies: [
        { package: 'python >= 3.10', purpose: 'Core language runtime' },
        { package: 'pandas >= 2.0.0', purpose: 'Tabular data processing' },
        { package: 'numpy >= 1.24.0', purpose: 'Vectorized mathematical array transformations' },
        { package: 'scikit-learn >= 1.3.0', purpose: 'RidgeCV meta-regressor and K-Fold CV splits' },
        { package: 'lightgbm >= 4.0.0', purpose: 'Histogram-based gradient boosted decision trees' },
        { package: 'xgboost >= 2.0.0', purpose: 'Depth-bounded sequential gradient boosting' },
        { package: 'catboost >= 1.2.0', purpose: 'Categorical feature gradient boosting' }
      ]
    }
  },

  {
    id: 'image-authenticity',
    name: 'CNN Image Authenticity Detection',
    tagline: 'Deep convolutional neural network for binary photographic classification between authentic and AI-generated images.',
    fullTitle: 'CNN-Based Image Authenticity Detection: Deep Learning Pipeline for Synthetic Image Classification',
    folder: 'AI Applications',
    type: 'Deep Learning / Computer Vision',
    status: 'Experimental Prototype',
    statusNote: 'Experimental Prototype. Image preprocessing pipeline, sequential CNN layer architecture, model serialization, and interactive Streamlit testing interface are implemented. Formal evaluation metrics (accuracy, precision, recall) are intentionally omitted pending standardized multi-generator benchmark testing.',
    isFeatured: false,
    featuredBadge: 'EXPERIMENTAL PROTOTYPE',

    whatItDoes:
      'A deep learning computer vision pipeline that classifies digital images into binary categories: Real Photographic Image versus AI-Generated Synthetic Image. Implemented with TensorFlow and Keras, the system processes images through multi-stage 2D convolutions, max-pooling spatial reduction, dense representation layers, and exports the serialized model for interactive inference in Streamlit.',
    problemSolved:
      'Modern generative models (diffusion models, GANs) produce highly convincing synthetic imagery that is difficult to distinguish from genuine photography through human visual inspection alone. This prototype explores how hierarchical convolutional filters can learn low-level texture inconsistencies, pixel gradient anomalies, and high-level structural artifacts characteristic of AI synthesis.',
    objectives: [
      'Ingest binary photographic archives containing real and AI-generated images from Kaggle.',
      'Implement image preprocessing: uniform spatial dimension resizing and pixel normalization.',
      'Construct a sequential Convolutional Neural Network (CNN) in TensorFlow and Keras.',
      'Train convolutional feature extraction filters paired with max-pooling dimensionality reduction.',
      'Serialize model topology, learned weights, and optimizer state to ai_image_detector.keras.',
      'Deploy a local interactive Streamlit inference interface with Ngrok tunneling for testing.'
    ],
    technologiesUsed: [
      {
        technology: 'Python',
        category: 'Core Language',
        purpose: 'Data preprocessing, neural network compilation, training loops, and inference logic.'
      },
      {
        technology: 'TensorFlow',
        category: 'Deep Learning Backend',
        purpose: 'Executing tensor computations, GPU gradient calculations, and backpropagation.'
      },
      {
        technology: 'Keras',
        category: 'Neural Network API',
        purpose: 'Constructing sequential CNN layers (Conv2D, MaxPooling2D, Dense, Dropout) and model serialization.'
      },
      {
        technology: 'OpenCV',
        category: 'Image Processing',
        purpose: 'Image loading, spatial dimension resizing, and BGR to RGB channel formatting.'
      },
      {
        technology: 'NumPy',
        category: 'Tensor Operations',
        purpose: 'Multidimensional array reshaping and pixel intensity normalization to [0.0, 1.0].'
      },
      {
        technology: 'scikit-learn',
        category: 'Dataset Partitioning',
        purpose: 'Splitting image datasets into training and testing partitions using train_test_split.'
      },
      {
        technology: 'Google Colab',
        category: 'Execution Environment',
        purpose: 'Cloud GPU acceleration environment for training deep convolutional layers.'
      },
      {
        technology: 'Streamlit & Ngrok',
        category: 'Inference Interface',
        purpose: 'Interactive web UI allowing users to upload unseen images and inspect predicted class probabilities.'
      }
    ],

    asciiArchitecture: `+-------------------------------------------------------------------------+
|                CNN IMAGE AUTHENTICITY DETECTION: ARCHITECTURE           |
+-------------------------------------------------------------------------+
|                                                                         |
|  [ INPUT TENSOR ]           --> Preprocessed RGB Image (Normalized [0,1])|
|                                      │                                  |
|                                      ▼                                  |
|  [ CONV2D LAYER 1 ]         --> Conv2D(Filters=32, Kernel=3x3, ReLU)    |
|  [ MAXPOOLING2D LAYER 1 ]   --> MaxPooling2D(Pool=2x2)                  |
|                                      │                                  |
|                                      ▼                                  |
|  [ CONV2D LAYER 2 ]         --> Conv2D(Filters=64, Kernel=3x3, ReLU)    |
|  [ MAXPOOLING2D LAYER 2 ]   --> MaxPooling2D(Pool=2x2)                  |
|                                      │                                  |
|                                      ▼                                  |
|  [ CONV2D LAYER 3 ]         --> Conv2D(Filters=128, Kernel=3x3, ReLU)   |
|  [ MAXPOOLING2D LAYER 3 ]   --> MaxPooling2D(Pool=2x2)                  |
|                                      │                                  |
|                                      ▼                                  |
|  [ FLATTEN LAYER ]          --> 1D Feature Representation Reshape       |
|  [ DENSE PROJECTION ]       --> Dense(128 Units, ReLU) + Dropout        |
|  [ OUTPUT CLASSIFIER ]      --> Dense(1 Unit, Sigmoid Activation)       |
|                                      │                                  |
|                                      ▼                                  |
|  [ BINARY INFERENCE ]       --> Real Image (0) vs. AI-Generated (1)     |
|                                      │                                  |
|                                      ▼                                  |
|  [ PERSISTENCE & UI ]       --> ai_image_detector.keras + Streamlit UI  |
|                                                                         |
+-------------------------------------------------------------------------+`,

    architectureComponents: [
      {
        component: 'Spatial Resizing & Preprocessing',
        role: 'Input Normalization',
        details: 'Resizes heterogeneous image inputs to uniform dimensions (e.g., 128x128) and scales uint8 [0, 255] pixels to float32 [0.0, 1.0].'
      },
      {
        component: 'Hierarchical Convolutional Layers',
        role: 'Feature Extraction',
        details: 'Sequential 3x3 Conv2D kernels learning edge gradients, micro-textures, and high-frequency synthesis patterns.'
      },
      {
        component: 'MaxPooling Downsamplers',
        role: 'Spatial Reduction',
        details: '2x2 max-pooling layers reducing spatial grid dimensions while retaining dominant activation signals and translational invariance.'
      },
      {
        component: 'Dense Projection Network',
        role: 'Representation Aggregation',
        details: 'Flattens 2D feature maps into a 1D vector followed by a 128-unit dense layer with ReLU activation and dropout regularization.'
      },
      {
        component: 'Sigmoid Output Classifier',
        role: 'Binary Probability Output',
        details: 'Single output neuron with sigmoid activation computing the posterior probability P(AI-Generated | Image).'
      },
      {
        component: 'Model Artifact Serializer',
        role: 'Persistence',
        details: 'Saves model architecture, learned weights, and Adam optimizer state into standard ai_image_detector.keras.'
      },
      {
        component: 'Streamlit + Ngrok Interface',
        role: 'Interactive Testing',
        details: 'Web application interface providing file upload, real-time image preview, tensor transformation, and class prediction display.'
      }
    ],

    architecturalDecisions: [
      'Convolutional Topology over Classical Vision: Convolutional kernels autonomously learn discriminative visual filter weights directly from raw pixel matrices rather than relying on manual feature crafting.',
      'Pixel Range Scaling to [0, 1]: Normalizing pixel intensities accelerates gradient descent convergence and avoids numerical instability in early training epochs.',
      'Keras Standard Serialization: Exporting to standard .keras format ensures portability across evaluation scripts and web inference wrappers.',
      'Omission of Unverified Accuracy Claims: Unverified accuracy figures are excluded in favor of documenting verified preprocessing, model architecture, and inference code.'
    ],

    asciiPipeline: `+-------------------------------------------------------------------------+
|             IMAGE AUTHENTICITY DETECTION: PROCESSING PIPELINE           |
+-------------------------------------------------------------------------+
|                                                                         |
|  Kaggle Binary Dataset Ingestion (Real & Synthetic Image Archives)      |
|         │                                                               |
|         ▼                                                               |
|  Spatial Normalization: OpenCV Resize to Standard Target Dimension      |
|         │                                                               |
|         ▼                                                               |
|  Pixel Scaling: Map 8-bit integer RGB [0, 255] to Float32 Tensor [0, 1] |
|         │                                                               |
|         ▼                                                               |
|  Dataset Partitioning: Train / Test Split via scikit-learn              |
|         │                                                               |
|         ▼                                                               |
|  Forward Pass Feature Extraction via Hierarchical Convolution Layers    |
|         │                                                               |
|         ▼                                                               |
|  Binary Cross-Entropy Loss Optimization & Backpropagation               |
|         │                                                               |
|         ▼                                                               |
|  Model Serialization: Save Graph & Weights to ai_image_detector.keras   |
|         │                                                               |
|         ▼                                                               |
|  Streamlit + Ngrok Inference Demo: File Upload & Authenticity Prediction|
|                                                                         |
+-------------------------------------------------------------------------+`,

    pipelineStages: [
      {
        step: 'Stage 1',
        name: 'Dataset Ingestion & Labeling',
        desc: 'Loads photographic authentic images and synthetic generative images from Kaggle archives, mapping folder classes to binary integer targets.',
        algorithms: 'OpenCV image reader, binary integer encoding (0: Real, 1: AI-Generated)'
      },
      {
        step: 'Stage 2',
        name: 'Spatial Resizing & Color Verification',
        desc: 'Resizes all input images to uniform dimensions and ensures 3-channel RGB representation across all instances.',
        algorithms: 'cv2.resize with bilinear interpolation, cv2.cvtColor(BGR2RGB)'
      },
      {
        step: 'Stage 3',
        name: 'Pixel Tensor Normalization',
        desc: 'Converts uint8 pixel values [0, 255] into float32 arrays scaled to [0.0, 1.0] for stable gradient computation.',
        algorithms: 'NumPy array division: image_array.astype("float32") / 255.0'
      },
      {
        step: 'Stage 4',
        name: 'Train / Test Partitioning',
        desc: 'Splits preprocessed image arrays into training and testing partitions with stratified class representation.',
        algorithms: 'scikit-learn train_test_split(test_size=0.2, random_state=42)'
      },
      {
        step: 'Stage 5',
        name: 'Hierarchical Convolutional Training',
        desc: 'Trains progressive 32 -> 64 -> 128 filter convolution layers with max-pooling, dense projection, and dropout.',
        algorithms: 'Keras Sequential model, Adam optimizer, Binary Cross-Entropy loss'
      },
      {
        step: 'Stage 6',
        name: 'Model Weights Serialization',
        desc: 'Saves the complete neural network architecture and trained parameters to ai_image_detector.keras.',
        algorithms: 'model.save("ai_image_detector.keras")'
      },
      {
        step: 'Stage 7',
        name: 'Streamlit Local Inference Demo',
        desc: 'Web application allows testing on unseen images with real-time prediction feedback.',
        algorithms: 'Streamlit file_uploader, model.predict(expanded_tensor)'
      }
    ],

    technicalFormulations: [
      {
        name: '2D Convolution Operation',
        formula: 'S(i, j) = (I * K)(i, j) = Σ Σ I(i - m, j - n) * K(m, n)',
        explanation: 'Slides learnable 3x3 kernel K over input tensor I to detect edges, frequency anomalies, and generative artifacts.'
      },
      {
        name: 'Binary Cross-Entropy Loss',
        formula: 'L = - [y * log(p) + (1 - y) * log(1 - p)]',
        explanation: 'Penalizes probabilistic divergence between ground truth binary class y and predicted synthetic probability p.'
      },
      {
        name: 'Sigmoid Activation Function',
        formula: 'σ(z) = 1.0 / (1.0 + e^(-z))',
        explanation: 'Maps real-valued logit z from the final dense neuron into a bounded probability interval [0.0, 1.0].'
      }
    ],

    evaluationMethodology: {
      protocol: 'Train / Validation Split Partitioning',
      datasetOrSubjects: 'Kaggle Binary Image Dataset (Real vs. AI-Generated)',
      metricsPolicy: 'Strict adherence to verified engineering facts. Numerical accuracy/precision/recall figures are intentionally omitted rather than fabricated without benchmark verification.',
      notes:
        'Generalization across different generative architectures (e.g., Stable Diffusion, Midjourney, DALL-E) requires systematic cross-generator testing. This project documents the complete prototype implementation.'
    },

    deliverables: [
      {
        name: 'CNN Training Pipeline',
        type: 'Python / Colab Script',
        description: 'Complete script covering image ingestion, normalization, CNN compilation, and training loops.'
      },
      {
        name: 'ai_image_detector.keras',
        type: 'Serialized Model File',
        description: 'Trained model weights and architecture file ready for standalone inference.'
      },
      {
        name: 'Interactive Streamlit Application',
        type: 'Web Interface',
        description: 'Streamlit testing UI with file uploader and live probability classification.'
      }
    ],

    limitationsAndNextSteps: [
      'Multi-Generator Benchmark: Testing classification generalization across images generated by Flux, Midjourney, and Stable Diffusion models.',
      'Frequency-Domain Features: Exploring Discrete Fourier Transform (DFT) and Discrete Cosine Transform (DCT) inputs to detect synthetic grid artifacts.',
      'Explainability Integration: Implementing Grad-CAM visual heatmaps to highlight image regions driving classification decisions.',
      'Dataset Expansion: Incorporating diverse photographic resolutions and real-world compression levels.'
    ],

    sourceCode: {
      repoUrl: 'https://github.com/Logesh051/cnn-image-authenticity-detection',
      repoLabel: 'github.com/Logesh051/cnn-image-authenticity-detection',
      repoNote: 'Verified live repository on Logesh NA GitHub profile.',
      keyFiles: [
        { file: 'train.py', role: 'Data loading, preprocessing, CNN model assembly, and training loop.' },
        { file: 'ai_image_detector.keras', role: 'Serialized trained neural network weights and architecture.' },
        { file: 'app.py', role: 'Streamlit inference web application with image upload and classification.' }
      ],
      sampleSnippetTitle: 'CNN Layer Architecture & Model Compilation',
      sampleSnippet: `import tensorflow as tf
from tensorflow.keras import layers, models

def build_authenticity_detector(input_shape=(128, 128, 3)) -> models.Sequential:
    """
    Constructs a sequential CNN for binary image authenticity detection.
    """
    model = models.Sequential([
        layers.Input(shape=input_shape),
        
        # Block 1
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        
        # Block 2
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        
        # Block 3
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        
        # Dense Classification Head
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return model`,
      dependencies: [
        { package: 'python >= 3.9', purpose: 'Core language runtime' },
        { package: 'tensorflow >= 2.12.0', purpose: 'Deep learning backend and gradient execution' },
        { package: 'opencv-python >= 4.7.0', purpose: 'Image resizing and channel conversion' },
        { package: 'numpy >= 1.23.0', purpose: 'Pixel normalization and array operations' },
        { package: 'scikit-learn >= 1.2.0', purpose: 'Dataset splitting' },
        { package: 'streamlit >= 1.25.0', purpose: 'Interactive inference application' }
      ]
    }
  },

  {
    id: 'email-triage',
    name: 'Intelligent Email Triage',
    tagline: 'OpenEnv-based task environment and asynchronous REST API for simulated email categorization and triage prioritization.',
    fullTitle: 'Intelligent Email Triage: OpenEnv-Based Task Environment with Asynchronous REST API',
    folder: 'AI Applications',
    type: 'AI Application / Environment Architecture',
    status: 'Experimental Prototype',
    statusNote: 'Experimental Prototype. Exploratory prototype exploring OpenEnv environment design and FastAPI endpoints. Task definitions, state machine transitions, and rule-based reward grading are implemented. No trained machine learning model or production accuracy claims.',
    isFeatured: false,
    featuredBadge: 'EXPERIMENTAL PROTOTYPE',

    whatItDoes:
      'An experimental environment prototype designed to structure automated email processing workflows. Built on the OpenEnv specification with a FastAPI backend, the system simulates an interactive triage agent environment where incoming messages are parsed, classified (Important, Normal, Spam), assigned priority levels (High, Medium, Low), and scored using an internal rule-based grading harness.',
    problemSolved:
      'Information overload from unstructured inbox feeds (newsletters, transactional notifications, urgent communications) demands intelligent message categorization. Developing automated triage agents requires standardized environments with formal observation spaces, discrete action definitions, and deterministic evaluation reward mechanisms.',
    objectives: [
      'Implement an OpenEnv environment specification standardizing agent-inbox interactions.',
      'Structure incoming email payloads into structured observation states (Sender, Subject, Body).',
      'Provide discrete action interfaces for category tagging (Important, Normal, Spam) and priority ranking.',
      'Build a rule-based reward evaluation grader (grader.py) calculating scalar step rewards from 0.0 to 1.0.',
      'Expose asynchronous REST endpoints (/reset, /step, /state, /tasks) using FastAPI and Uvicorn.',
      'Package the environment with Docker container specifications for reproducible deployment.'
    ],
    technologiesUsed: [
      {
        technology: 'Python',
        category: 'Core Language',
        purpose: 'Implementing environment logic, task queues, and state machine dynamics.'
      },
      {
        technology: 'FastAPI',
        category: 'REST Framework',
        purpose: 'Providing high-performance asynchronous API endpoints for environment interaction.'
      },
      {
        technology: 'OpenEnv',
        category: 'Environment Standard',
        purpose: 'Formalizing state transitions, observation formats, and discrete agent actions.'
      },
      {
        technology: 'Uvicorn',
        category: 'ASGI Server',
        purpose: 'Executing the FastAPI asynchronous application engine.'
      },
      {
        technology: 'Docker',
        category: 'Containerization',
        purpose: 'Providing isolated, reproducible container specifications (Dockerfile) for deployment.'
      }
    ],

    asciiArchitecture: `+-------------------------------------------------------------------------+
|               INTELLIGENT EMAIL TRIAGE SYSTEM ARCHITECTURE              |
+-------------------------------------------------------------------------+
|                                                                         |
|  [ INCOMING EMAIL STREAM ] --> Multiple Ingestion Formats (Raw Text/JSON)|
|                                      │                                  |
|                                      ▼                                  |
|  [ FASTAPI WEB SERVICE ]   --> Asynchronous ASGI Engine (Uvicorn Server)|
|                                      │                                  |
|                                      ▼                                  |
|  [ OPENENV ENVIRONMENT ]   --> Task State Machine (environment.py)      |
|   • Observation Space: Current email payload, sender, subject, body     |
|   • Action Space: Assign Class (Important/Normal/Spam) & Priority (H/M/L|
|                                      │                                  |
|                                      ▼                                  |
|  [ TASK QUEUE CONTROLLER ] --> tasks.py (Manages message task lifecycle)|
|                                      │                                  |
|                                      ▼                                  |
|  [ RULE REWARD GRADER ]    --> grader.py (Computes scalar reward 0.0-1.0|
|                                      │                                  |
|                                      ▼                                  |
|  [ EXECUTION CONTROLLER ]  --> inference.py (START -> STEP -> END Loop) |
|                                      │                                  |
|                                      ▼                                  |
|  [ DEPLOYMENT CONTAINER ]  --> Dockerfile (Containerized Environment)   |
|                                                                         |
+-------------------------------------------------------------------------+`,

    architectureComponents: [
      {
        component: 'FastAPI REST Application (app.py)',
        role: 'Web Service Engine',
        details: 'Exposes HTTP routes (/reset, /step, /state, /tasks) orchestrating asynchronous environment interaction.'
      },
      {
        component: 'OpenEnv Environment Engine (environment.py)',
        role: 'State Machine Controller',
        details: 'Governs discrete observation states, transitions, step counters, and episode termination criteria.'
      },
      {
        component: 'Task Queue Manager (tasks.py)',
        role: 'Task Definition',
        details: 'Structures email queues with metadata (sender, subject line, body text, ground-truth triage criteria).'
      },
      {
        component: 'Rule-Based Grader (grader.py)',
        role: 'Reward Calculation',
        details: 'Evaluates agent categorization decisions against reference definitions to compute step rewards (0.0 to 1.0).'
      },
      {
        component: 'Automated Inference Runner (inference.py)',
        role: 'Execution Loop',
        details: 'Coordinates lifecycle stages: START environment, submit triage actions via STEP, and conclude with END.'
      },
      {
        component: 'OpenEnv Specification (openenv.yaml)',
        role: 'Schema Definition',
        details: 'Documents observation space schemas, action space payloads, and endpoint contracts.'
      },
      {
        component: 'Docker Container (Dockerfile)',
        role: 'Containerization',
        details: 'Defines Python runtime dependencies and launch commands for isolated execution.'
      }
    ],

    architecturalDecisions: [
      'OpenEnv Interface Standard: Adopting an environment abstraction decouples the decision-making logic from the email ingestion pipeline, facilitating reproducible evaluations.',
      'Asynchronous REST Service: Using FastAPI enables non-blocking task submission and concurrent status queries.',
      'Explicit Rule-Based Grading: grader.py computes rewards based on deterministic rule matching rather than opaque heuristics.',
      'Transparent Model Stance: The README documents dummy-model exploration; no proprietary LLM or production classification model is fabricated.'
    ],

    asciiPipeline: `+-------------------------------------------------------------------------+
|                  EMAIL TRIAGE TASK EXECUTION PIPELINE                   |
+-------------------------------------------------------------------------+
|                                                                         |
|  Email Ingestion via REST Endpoint (/step payload)                      |
|         │                                                               |
|         ▼                                                               |
|  Text Parsing: Extract Subject Line, Sender Domain, Body Text           |
|         │                                                               |
|         ▼                                                               |
|  State Initialization: OpenEnv Reset (/reset) & Task Setup              |
|         │                                                               |
|         ▼                                                               |
|  Classification Step: Assign Important / Normal / Spam Category         |
|         │                                                               |
|         ▼                                                               |
|  Urgency Assignment: Assign High / Medium / Low Urgency Priority Level  |
|         │                                                               |
|         ▼                                                               |
|  Reward Computation: grader.py computes step transition reward (0 to 1) |
|         │                                                               |
|         ▼                                                               |
|  Environment State Response: Output next state observation & summaries  |
|                                                                         |
+-------------------------------------------------------------------------+`,

    pipelineStages: [
      {
        step: 'Stage 1',
        name: 'Task Ingestion & State Reset',
        desc: 'Client initiates an episode via /reset, initializing environment state and loading message task queues.',
        algorithms: 'OpenEnv reset lifecycle, tasks.py queue initialization'
      },
      {
        step: 'Stage 2',
        name: 'Observation Payload Delivery',
        desc: 'Delivers active observation: sender header, subject line, body text, and step metadata.',
        algorithms: 'JSON observation serialization'
      },
      {
        step: 'Stage 3',
        name: 'Action Dispatch & Triage Assignment',
        desc: 'Agent submits an action payload specifying predicted Category (Important, Normal, Spam) and Priority.',
        algorithms: 'POST /step action payload validation'
      },
      {
        step: 'Stage 4',
        name: 'Reward Computation & Evaluation',
        desc: 'grader.py computes a scalar reward between 0.0 and 1.0 comparing submitted classification with reference criteria.',
        algorithms: 'Multi-criteria matching rule logic in grader.py'
      },
      {
        step: 'Stage 5',
        name: 'State Transition & Episode Conclusion',
        desc: 'Environment updates observation buffer, increments step counter, and checks completion criteria.',
        algorithms: 'OpenEnv step transition handler, termination check'
      }
    ],

    technicalFormulations: [
      {
        name: 'Observation State Vector',
        formula: 'O_t = { message_id, sender_domain, subject_tokens, body_tokens, step_idx }',
        explanation: 'Structured observation dictionary delivered to the agent at each discrete evaluation step.'
      },
      {
        name: 'Rule-Based Step Reward',
        formula: 'R_t = w1 * I(Category_Correct) + w2 * I(Priority_Correct)',
        explanation: 'grader.py calculates dynamic scalar reward score between 0.0 and 1.0 based on categorization correctness.'
      }
    ],

    evaluationMethodology: {
      protocol: 'Discrete Task Environment Step-Reward Evaluation',
      datasetOrSubjects: 'Structured Synthetic Email Tasks in tasks.py',
      metricsPolicy: 'Strict adherence to verified engineering facts. Example reward scores (e.g., 0.6) represent sample step outputs, not general model performance metrics.',
      notes:
        'The grading rubric in grader.py awards 1.0 for perfect classification and lower scores for mismatched categories. This project documents environment architecture and API contracts.'
    },

    deliverables: [
      {
        name: 'FastAPI Environment Service',
        type: 'Python Application (app.py)',
        description: 'Asynchronous web application serving environment endpoints.'
      },
      {
        name: 'OpenEnv Environment Logic',
        type: 'Python Module (environment.py)',
        description: 'State machine implementation governing task transitions.'
      },
      {
        name: 'Rule-Based Reward Grader',
        type: 'Python Module (grader.py)',
        description: 'Evaluation harness scoring classification accuracy and priority alignment.'
      },
      {
        name: 'Docker Environment Specification',
        type: 'Container Specification (Dockerfile)',
        description: 'Containerized deployment setup.'
      }
    ],

    limitationsAndNextSteps: [
      'Model Integration: Connecting production NLP classification pipelines or distilled transformer models.',
      'Summarization Capabilities: Implementing abstractive text summarization for long message threads.',
      'Multi-Turn Email Threads: Supporting conversational message history across extended threads.',
      'Live IMAP/OAuth Ingestion: Integrating authentic email provider connectivity for live inbox testing.'
    ],

    sourceCode: {
      repoUrl: 'https://github.com/Logesh051/email-env',
      repoLabel: 'github.com/Logesh051/email-env',
      repoNote: 'Verified live repository on Logesh NA GitHub profile.',
      keyFiles: [
        { file: 'app.py', role: 'FastAPI application server exposing REST endpoints.' },
        { file: 'environment.py', role: 'OpenEnv state machine and step logic.' },
        { file: 'tasks.py', role: 'Email task queue definitions and metadata.' },
        { file: 'grader.py', role: 'Reward computation logic scoring triage decisions.' },
        { file: 'inference.py', role: 'Evaluation script running the automated START/STEP/END loop.' },
        { file: 'openenv.yaml', role: 'OpenEnv environment specification and schema.' },
        { file: 'Dockerfile', role: 'Container build configuration for isolated execution.' }
      ],
      sampleSnippetTitle: 'FastAPI Endpoint & OpenEnv Step Dispatch',
      sampleSnippet: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

app = FastAPI(title="Email Triage OpenEnv Service")

class ActionPayload(BaseModel):
    category: str  # "Important" | "Normal" | "Spam"
    priority: str  # "High" | "Medium" | "Low"

@app.post("/step")
async def take_step(action: ActionPayload) -> Dict[str, Any]:
    """
    Submits a triage classification action to the OpenEnv environment,
    evaluating category correctness and returning the step reward.
    """
    try:
        observation, reward, done, info = env.step(
            category=action.category,
            priority=action.priority
        )
        return {
            "observation": observation,
            "reward": reward,
            "done": done,
            "info": info
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))`,
      dependencies: [
        { package: 'python >= 3.9', purpose: 'Core language runtime' },
        { package: 'fastapi >= 0.100.0', purpose: 'Asynchronous web framework' },
        { package: 'uvicorn >= 0.22.0', purpose: 'ASGI application server' },
        { package: 'pydantic >= 2.0.0', purpose: 'Data validation and schema parsing' },
        { package: 'pyyaml >= 6.0', purpose: 'openenv.yaml specification parsing' }
      ]
    }
  }
];

type FolderSelection = 'all' | 'Machine Learning' | 'AI Applications';
type TabKey = 'overview' | 'architecture' | 'pipeline' | 'results' | 'source';
type MenuKey = 'file' | 'edit' | 'view' | 'favorites' | 'tools' | 'help' | null;

const BASE_PROJECTS_PATH = 'C:\\Documents and Settings\\Logesh\\My Documents\\My Projects';

const FOLDER_SUBPATHS: Record<FolderSelection, string> = {
  all: BASE_PROJECTS_PATH,
  'Machine Learning': `${BASE_PROJECTS_PATH}\\Machine Learning`,
  'AI Applications': `${BASE_PROJECTS_PATH}\\AI Applications`,
};

interface Props {
  activeSection?: SectionId;
  onNavigate?: (section: SectionId) => void;
}

const ProjectsPage: React.FC<Props> = ({ activeSection, onNavigate }) => {
  // Navigation stack state
  const [selectedFolder, setSelectedFolder] = useState<FolderSelection>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('cognifocus');
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [isFoldersPaneVisible, setIsFoldersPaneVisible] = useState<boolean>(true);

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
        onNavigate(`projects/${proj.id}` as SectionId);
      }
    }
  };

  const handleSelectFolder = (folder: FolderSelection) => {
    setSelectedFolder(folder);
    if (folder !== 'all') {
      const firstInFolder = PROJECTS_DATA.find((p) => p.folder === folder);
      if (firstInFolder) {
        handleSelectProject(firstInFolder.id);
      }
    }
  };

  // Back / Forward navigation
  const goBack = () => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    const targetProjId = history[newIndex];
    setSelectedProjectId(targetProjId);
    const proj = PROJECTS_DATA.find((p) => p.id === targetProjId);
    if (proj) {
      setSelectedFolder(proj.folder);
      if (onNavigate) {
        onNavigate(`projects/${proj.id}` as SectionId);
      }
    }
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    const targetProjId = history[newIndex];
    setSelectedProjectId(targetProjId);
    const proj = PROJECTS_DATA.find((p) => p.id === targetProjId);
    if (proj) {
      setSelectedFolder(proj.folder);
      if (onNavigate) {
        onNavigate(`projects/${proj.id}` as SectionId);
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
  const canGoUp = selectedFolder !== 'all';

  // Address Bar submission & validation
  const handleAddressSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = addressInput.trim().replace(/[\\/]+$/, '').toLowerCase();

    // Check project names
    for (const p of PROJECTS_DATA) {
      const fullPath = `${BASE_PROJECTS_PATH}\\${p.folder}\\${p.name}`.toLowerCase();
      const directPath = `${BASE_PROJECTS_PATH}\\${p.name}`.toLowerCase();
      if (
        raw === fullPath ||
        raw === directPath ||
        raw === p.name.toLowerCase() ||
        raw === p.id.toLowerCase()
      ) {
        handleSelectProject(p.id);
        setAddressDropdownOpen(false);
        return;
      }
    }

    if (
      raw === BASE_PROJECTS_PATH.toLowerCase() ||
      raw === 'my projects' ||
      raw === 'projects' ||
      raw === 'c:\\projects'
    ) {
      setSelectedFolder('all');
      setAddressDropdownOpen(false);
      return;
    }

    if (
      raw === FOLDER_SUBPATHS['Machine Learning'].toLowerCase() ||
      raw === 'machine learning' ||
      raw === 'ml'
    ) {
      handleSelectFolder('Machine Learning');
      setAddressDropdownOpen(false);
      return;
    }

    if (
      raw === FOLDER_SUBPATHS['AI Applications'].toLowerCase() ||
      raw === 'ai applications' ||
      raw === 'ai'
    ) {
      handleSelectFolder('AI Applications');
      setAddressDropdownOpen(false);
      return;
    }

    // Invalid path -> classic Windows Error Dialog
    setErrorModal({
      open: true,
      message: `Cannot find '${addressInput}'. Make sure the path or project name is correct.`,
    });
    setAddressInput(`${BASE_PROJECTS_PATH}\\${selectedProject.folder}\\${selectedProject.name}`);
  };

  const handleCopyDetails = () => {
    const text = `${selectedProject.fullTitle}\nType: ${selectedProject.type}\nStatus: ${selectedProject.status}\nTagline: ${selectedProject.tagline}\nRepository: ${selectedProject.sourceCode.repoUrl}`;
    navigator.clipboard?.writeText(text);
    setCopyFeedback('Project details copied to clipboard!');
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  return (
    <div className="explorer-app proj-app" onClick={() => activeMenu && setActiveMenu(null)}>
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
                  setPropertiesModalOpen(true);
                  setActiveMenu(null);
                }}
              >
                <span>Properties</span>
                <span className="proj-dropdown-shortcut">Alt+Enter</span>
              </div>
              <div className="proj-dropdown-separator" />
              {PROJECTS_DATA.map((p) => (
                <div
                  key={p.id}
                  className="proj-dropdown-item"
                  onClick={() => {
                    handleSelectProject(p.id);
                    setActiveMenu(null);
                  }}
                >
                  <span>Select {p.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'edit' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'edit' ? null : 'edit'))}
          >
            <u>E</u>dit
          </button>
          {activeMenu === 'edit' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleCopyDetails();
                  setActiveMenu(null);
                }}
              >
                <span>Copy Project Details</span>
                <span className="proj-dropdown-shortcut">Ctrl+C</span>
              </div>
              <div className="proj-dropdown-separator" />
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSelectProject('cognifocus');
                  setActiveMenu(null);
                }}
              >
                <span>Select CogniFocus (★ Primary)</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSelectProject('startup-valuation');
                  setActiveMenu(null);
                }}
              >
                <span>Select Startup Valuation (★ Primary)</span>
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
                className={`proj-dropdown-item ${activeTab === 'overview' ? 'proj-dropdown-item--checked' : ''}`}
                onClick={() => {
                  setActiveTab('overview');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{activeTab === 'overview' ? '✓' : ''}</span>
                <span>Overview Tab</span>
              </div>
              <div
                className={`proj-dropdown-item ${activeTab === 'architecture' ? 'proj-dropdown-item--checked' : ''}`}
                onClick={() => {
                  setActiveTab('architecture');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{activeTab === 'architecture' ? '✓' : ''}</span>
                <span>Architecture Tab</span>
              </div>
              <div
                className={`proj-dropdown-item ${activeTab === 'pipeline' ? 'proj-dropdown-item--checked' : ''}`}
                onClick={() => {
                  setActiveTab('pipeline');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{activeTab === 'pipeline' ? '✓' : ''}</span>
                <span>Pipeline Tab</span>
              </div>
              <div
                className={`proj-dropdown-item ${activeTab === 'results' ? 'proj-dropdown-item--checked' : ''}`}
                onClick={() => {
                  setActiveTab('results');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{activeTab === 'results' ? '✓' : ''}</span>
                <span>Results / Status Tab</span>
              </div>
              <div
                className={`proj-dropdown-item ${activeTab === 'source' ? 'proj-dropdown-item--checked' : ''}`}
                onClick={() => {
                  setActiveTab('source');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{activeTab === 'source' ? '✓' : ''}</span>
                <span>Source Code Tab</span>
              </div>
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'favorites' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'favorites' ? null : 'favorites'))}
          >
            Fa<u>v</u>orites
          </button>
          {activeMenu === 'favorites' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSelectProject('cognifocus');
                  setActiveMenu(null);
                }}
              >
                <span>★ CogniFocus</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSelectProject('startup-valuation');
                  setActiveMenu(null);
                }}
              >
                <span>★ Startup Valuation Engine</span>
              </div>
              <div className="proj-dropdown-separator" />
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
                  window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank', 'noopener,noreferrer');
                  setActiveMenu(null);
                }}
              >
                <span>Verify Project Evidence in Resume (PDF)</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  window.open('https://github.com/Logesh051', '_blank', 'noopener,noreferrer');
                  setActiveMenu(null);
                }}
              >
                <span>Visit Logesh NA GitHub Profile</span>
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
                <span>About My Projects Explorer...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Toolbar & Address Bar */}
      <div className="proj-toolbar">
        <div className="proj-toolbar-group">
          <button
            className="proj-tool-btn win-raised"
            title="Back (Alt+Left)"
            onClick={goBack}
            disabled={!canGoBack}
          >
            <BackNavIcon size={14} />
            <span className="proj-tool-label">Back</span>
          </button>

          <button
            className="proj-tool-btn win-raised"
            title="Forward (Alt+Right)"
            onClick={goForward}
            disabled={!canGoForward}
          >
            <ForwardNavIcon size={14} />
            <span className="proj-tool-label">Forward</span>
          </button>

          <button
            className="proj-tool-btn win-raised"
            title="Up to Parent Folder"
            onClick={goUp}
            disabled={!canGoUp}
          >
            <UpFolderIcon size={14} />
            <span className="proj-tool-label">Up</span>
          </button>

          <div className="proj-tool-separator" />

          <button
            className={`proj-tool-btn ${isFoldersPaneVisible ? 'proj-tool-btn--pressed win-sunken' : 'win-raised'}`}
            title="Toggle Folders Sidebar Pane"
            onClick={() => setIsFoldersPaneVisible((prev) => !prev)}
          >
            <FoldersToggleIcon size={14} />
            <span className="proj-tool-label">Folders</span>
          </button>

          <button
            className="proj-tool-btn win-raised"
            title="View properties dialog of selected project"
            onClick={() => setPropertiesModalOpen(true)}
          >
            <PropertiesNavIcon size={14} />
            <span className="proj-tool-label">Properties</span>
          </button>
        </div>

        {/* Quick Project Selectors on Toolbar */}
        <div className="proj-quick-pills">
          <button
            className={`proj-quick-btn ${selectedProjectId === 'cognifocus' ? 'proj-quick-btn--active win-sunken' : 'win-raised'}`}
            onClick={() => handleSelectProject('cognifocus')}
            title="CogniFocus — Multimodal Engagement Analytics"
          >
            <span className="proj-quick-star">★</span> CogniFocus
          </button>
          <button
            className={`proj-quick-btn ${selectedProjectId === 'startup-valuation' ? 'proj-quick-btn--active win-sunken' : 'win-raised'}`}
            onClick={() => handleSelectProject('startup-valuation')}
            title="Startup Valuation Engine — Stacking Regression"
          >
            <span className="proj-quick-star">★</span> Startup Valuation
          </button>
          <button
            className={`proj-quick-btn ${selectedProjectId === 'image-authenticity' ? 'proj-quick-btn--active win-sunken' : 'win-raised'}`}
            onClick={() => handleSelectProject('image-authenticity')}
            title="CNN Image Authenticity Detection"
          >
            Image Authenticity
          </button>
          <button
            className={`proj-quick-btn ${selectedProjectId === 'email-triage' ? 'proj-quick-btn--active win-sunken' : 'win-raised'}`}
            onClick={() => handleSelectProject('email-triage')}
            title="Intelligent Email Triage Prototype"
          >
            Email Triage
          </button>
        </div>

        {/* Address Bar */}
        <div className="proj-address-bar" ref={addressDropdownRef}>
          <span className="proj-address-label">Address</span>
          <div className="proj-address-field win-sunken">
            <svg width="14" height="14" viewBox="0 0 16 16" className="proj-folder-svg">
              <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
              <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
            </svg>
            <input
              type="text"
              className="proj-address-input-field"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddressSubmit();
              }}
              spellCheck={false}
              aria-label="Address bar input"
            />
            <button
              className="proj-address-dropdown-btn"
              onClick={() => setAddressDropdownOpen((prev) => !prev)}
              title="Show Address Jump Menu"
              type="button"
            >
              ▼
            </button>
          </div>
          <button
            className="proj-address-go-btn win-raised"
            onClick={() => handleAddressSubmit()}
            title="Go to Address"
            type="button"
          >
            <span>Go</span>
          </button>

          {/* Address Dropdown */}
          {addressDropdownOpen && (
            <div className="proj-address-dropdown-menu win-raised">
              <div
                className="proj-address-dropdown-option"
                onClick={() => {
                  setSelectedFolder('all');
                  setAddressDropdownOpen(false);
                }}
              >
                <span>📁 {BASE_PROJECTS_PATH}</span>
              </div>
              <div
                className="proj-address-dropdown-option"
                onClick={() => {
                  handleSelectFolder('Machine Learning');
                  setAddressDropdownOpen(false);
                }}
              >
                <span>📁 {FOLDER_SUBPATHS['Machine Learning']}</span>
              </div>
              <div
                className="proj-address-dropdown-option"
                onClick={() => {
                  handleSelectFolder('AI Applications');
                  setAddressDropdownOpen(false);
                }}
              >
                <span>📁 {FOLDER_SUBPATHS['AI Applications']}</span>
              </div>
              <div className="proj-dropdown-separator" />
              {PROJECTS_DATA.map((p) => (
                <div
                  key={p.id}
                  className="proj-address-dropdown-option"
                  onClick={() => {
                    handleSelectProject(p.id);
                    setAddressDropdownOpen(false);
                  }}
                >
                  <span>
                    📄 {p.name} {p.isFeatured ? '★' : ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Copy Notification Toast */}
      {copyFeedback && <div className="proj-toast-alert win-sunken">{copyFeedback}</div>}

      {/* 3. Main Split Body: Explorer Left Sidebar + Right Details View Pane */}
      <div className="proj-body">
        {/* Left Sidebar Pane: Folder Hierarchy & Project Tree */}
        {isFoldersPaneVisible && (
          <div className="proj-left-pane">
            <div className="proj-pane-header">
              <span>Folders</span>
              <button
                className="proj-pane-close-btn"
                title="Hide Folders Pane"
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

                {/* Sub-items under Machine Learning */}
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
                        <span className="proj-tree-sublabel">
                          {p.name}
                        </span>
                        {p.isFeatured && (
                          <span className="proj-tree-pill-featured">[Primary]</span>
                        )}
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

                {/* Sub-items under AI Applications */}
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

            {/* Tree Footer Info Box */}
            <div className="proj-tree-summary win-sunken">
              <div className="proj-tree-summary-row">
                <span className="proj-tree-summary-label">Active Project:</span>
                <span className="proj-tree-summary-val">{selectedProject.name}</span>
              </div>
              <div className="proj-tree-summary-row">
                <span className="proj-tree-summary-label">Category:</span>
                <span className="proj-tree-summary-val">{selectedProject.folder}</span>
              </div>
              <div className="proj-tree-summary-row">
                <span className="proj-tree-summary-label">Status:</span>
                <span className="proj-tree-summary-val">[{selectedProject.status}]</span>
              </div>
            </div>
          </div>
        )}

        {/* Vertical Splitter */}
        {isFoldersPaneVisible && <div className="proj-splitter" />}

        {/* Right View Pane: Displays Project Details Directly with Retro Tabs */}
        <div className="proj-right-pane" role="main" aria-label="Project Details View">
          {/* Top Project Banner / Header Card */}
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
                  <span className="proj-detail-icon-star" title="Primary Technical Work">
                    ★
                  </span>
                )}
              </div>

              <div className="proj-detail-header-text">
                <div className="proj-detail-title-line">
                  <h1 className="proj-detail-name">{selectedProject.name}</h1>
                  <span className={`proj-status-badge proj-status-badge--${selectedProject.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    [{selectedProject.status}]
                  </span>
                  {selectedProject.isFeatured && (
                    <span className="proj-featured-ribbon">
                      {selectedProject.featuredBadge}
                    </span>
                  )}
                </div>
                <p className="proj-detail-tagline">{selectedProject.tagline}</p>
                <div className="proj-detail-submeta">
                  <span className="proj-submeta-item">
                    <strong>Path:</strong> {selectedProject.folder} \ {selectedProject.name}.prj
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
                href={selectedProject.sourceCode.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-btn proj-btn--primary win-raised"
                title={`Open genuine repository (${selectedProject.sourceCode.repoUrl})`}
              >
                <span>↗ View Repository</span>
              </a>
              <button
                className="proj-btn win-raised"
                onClick={handleCopyDetails}
                title="Copy project specifications to clipboard"
              >
                <span>📋 Copy Specs</span>
              </button>
            </div>
          </div>

          {/* Retro Tabs Strip */}
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
              className={`proj-tab ${activeTab === 'architecture' ? 'proj-tab--active' : ''}`}
              onClick={() => setActiveTab('architecture')}
              role="tab"
              aria-selected={activeTab === 'architecture'}
            >
              Architecture
            </button>
            <button
              className={`proj-tab ${activeTab === 'pipeline' ? 'proj-tab--active' : ''}`}
              onClick={() => setActiveTab('pipeline')}
              role="tab"
              aria-selected={activeTab === 'pipeline'}
            >
              Pipeline
            </button>
            <button
              className={`proj-tab ${activeTab === 'results' ? 'proj-tab--active' : ''}`}
              onClick={() => setActiveTab('results')}
              role="tab"
              aria-selected={activeTab === 'results'}
            >
              Results / Status
            </button>
            <button
              className={`proj-tab ${activeTab === 'source' ? 'proj-tab--active' : ''}`}
              onClick={() => setActiveTab('source')}
              role="tab"
              aria-selected={activeTab === 'source'}
            >
              Source Code
            </button>
          </div>

          {/* Retro Tab Body Content Pane */}
          <div className="proj-tab-pane win-sunken" role="tabpanel">
            {/* ========================================================== */}
            {/* TAB 1: OVERVIEW                                            */}
            {/* ========================================================== */}
            {activeTab === 'overview' && (
              <div className="proj-content-section">
                {/* Visual Emphasis Banner for CogniFocus & Startup Valuation */}
                {selectedProject.isFeatured && (
                  <div className="proj-featured-callout win-raised">
                    <div className="proj-callout-header">
                      <span className="proj-callout-star">★</span>
                      <strong>PRIMARY ENGINEERING SHOWCASE — RIGOROUS SYSTEM DESIGN</strong>
                    </div>
                    <p className="proj-callout-body">
                      This project represents a core technical focus area in Logesh NA's portfolio. It emphasizes rigorous feature engineering, verified signal/tabular pipeline design, and strict validation schemes over exaggerated claims.
                    </p>
                  </div>
                )}

                {/* What it does */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">What It Does</legend>
                  <p className="proj-paragraph">{selectedProject.whatItDoes}</p>
                </fieldset>

                {/* Problem it solves */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Problem It Solves</legend>
                  <p className="proj-paragraph">{selectedProject.problemSolved}</p>
                </fieldset>

                {/* Core Objectives */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Core Engineering Objectives</legend>
                  <ul className="proj-bullet-list">
                    {selectedProject.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </fieldset>

                {/* Technologies Actually Used & Specific Purpose */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Technologies Actually Used &amp; Implementation Roles</legend>
                  <p className="proj-table-intro">
                    Every library listed below serves an explicit engineering function within the implemented pipeline:
                  </p>
                  <div className="proj-table-wrapper win-sunken">
                    <table className="proj-sunken-table">
                      <thead>
                        <tr>
                          <th style={{ width: '130px' }}>Technology</th>
                          <th style={{ width: '150px' }}>Category / Stack</th>
                          <th>Specific Implementation Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.technologiesUsed.map((tech, idx) => (
                          <tr key={idx}>
                            <td className="proj-code-cell">
                              <code>{tech.technology}</code>
                            </td>
                            <td>{tech.category}</td>
                            <td>{tech.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </fieldset>

                {/* Status Notice */}
                <div className="proj-status-notice win-sunken">
                  <strong>Current Engineering Status:</strong> {selectedProject.statusNote}
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 2: ARCHITECTURE                                        */}
            {/* ========================================================== */}
            {activeTab === 'architecture' && (
              <div className="proj-content-section">
                {/* Monospace ASCII Architecture Diagram */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">System Architecture Diagram (ASCII Monospace)</legend>
                  <div className="proj-ascii-terminal win-sunken">
                    <pre className="proj-ascii-pre">{selectedProject.asciiArchitecture}</pre>
                  </div>
                </fieldset>

                {/* Architecture Subsystem Breakdown */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Subsystem &amp; Architectural Components</legend>
                  <div className="proj-table-wrapper win-sunken">
                    <table className="proj-sunken-table">
                      <thead>
                        <tr>
                          <th style={{ width: '180px' }}>Component</th>
                          <th style={{ width: '160px' }}>Architectural Role</th>
                          <th>Technical Implementation Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.architectureComponents.map((comp, idx) => (
                          <tr key={idx}>
                            <td className="proj-code-cell">
                              <strong>{comp.component}</strong>
                            </td>
                            <td>{comp.role}</td>
                            <td>{comp.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </fieldset>

                {/* Architectural Rationale & Trade-Offs */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Architectural Decisions &amp; Design Trade-Offs</legend>
                  <ul className="proj-bullet-list">
                    {selectedProject.architecturalDecisions.map((dec, idx) => (
                      <li key={idx}>{dec}</li>
                    ))}
                  </ul>
                </fieldset>
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 3: PIPELINE                                            */}
            {/* ========================================================== */}
            {activeTab === 'pipeline' && (
              <div className="proj-content-section">
                {/* Monospace ASCII Pipeline Diagram */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Processing &amp; Dataflow Pipeline (ASCII Monospace)</legend>
                  <div className="proj-ascii-terminal win-sunken">
                    <pre className="proj-ascii-pre">{selectedProject.asciiPipeline}</pre>
                  </div>
                </fieldset>

                {/* Pipeline Stages Breakdown */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Sequential Pipeline Stages &amp; Algorithmic Details</legend>
                  <div className="proj-table-wrapper win-sunken">
                    <table className="proj-sunken-table">
                      <thead>
                        <tr>
                          <th style={{ width: '70px' }}>Stage</th>
                          <th style={{ width: '180px' }}>Process Name</th>
                          <th>Data Transformation &amp; Algorithmic Operation</th>
                          <th style={{ width: '180px' }}>Algorithms / Libraries</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.pipelineStages.map((stg, idx) => (
                          <tr key={idx}>
                            <td className="proj-code-cell">
                              <code>{stg.step}</code>
                            </td>
                            <td>
                              <strong>{stg.name}</strong>
                            </td>
                            <td>{stg.desc}</td>
                            <td className="proj-code-cell">
                              <code>{stg.algorithms}</code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </fieldset>

                {/* Mathematical Formulations & Domain Ratios */}
                {selectedProject.technicalFormulations && selectedProject.technicalFormulations.length > 0 && (
                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Mathematical Formulations &amp; Engineered Feature Ratios</legend>
                    <div className="proj-formulas-grid">
                      {selectedProject.technicalFormulations.map((feat, idx) => (
                        <div key={idx} className="proj-formula-card win-raised">
                          <div className="proj-formula-header">{feat.name}</div>
                          <div className="proj-formula-box win-sunken">
                            <code>{feat.formula}</code>
                          </div>
                          <p className="proj-formula-explanation">{feat.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 4: RESULTS / STATUS                                    */}
            {/* ========================================================== */}
            {activeTab === 'results' && (
              <div className="proj-content-section">
                {/* Honest Engineering Status Callout */}
                <div className="proj-status-callout win-raised">
                  <div className="proj-status-callout-header">
                    <span className="proj-status-icon">ℹ</span>
                    <strong>STATUS &amp; METRICS VERIFICATION POLICY</strong>
                  </div>
                  <div className="proj-status-callout-body">
                    <p>
                      <strong>Current Status:</strong> [{selectedProject.status}] — {selectedProject.statusNote}
                    </p>
                    <p style={{ marginTop: '6px' }}>
                      <strong>Evaluation Policy:</strong> {selectedProject.evaluationMethodology.metricsPolicy}
                    </p>
                  </div>
                </div>

                {/* Evaluation Methodology */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Evaluation Methodology &amp; Protocol</legend>
                  <table className="proj-props-table">
                    <tbody>
                      <tr>
                        <td className="proj-props-label" style={{ width: '160px' }}>
                          Validation Scheme:
                        </td>
                        <td className="proj-props-value">
                          <strong>{selectedProject.evaluationMethodology.protocol}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td className="proj-props-label">Evaluation Data:</td>
                        <td className="proj-props-value">
                          {selectedProject.evaluationMethodology.datasetOrSubjects}
                        </td>
                      </tr>
                      <tr>
                        <td className="proj-props-label">Validation Rigor:</td>
                        <td className="proj-props-value">
                          {selectedProject.evaluationMethodology.notes}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </fieldset>

                {/* Verified Deliverables & Artifacts */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Verified Deliverables &amp; Engineering Artifacts</legend>
                  <div className="proj-table-wrapper win-sunken">
                    <table className="proj-sunken-table">
                      <thead>
                        <tr>
                          <th style={{ width: '180px' }}>Deliverable / Artifact</th>
                          <th style={{ width: '160px' }}>Type</th>
                          <th>Verification Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.deliverables.map((item, idx) => (
                          <tr key={idx}>
                            <td className="proj-code-cell">
                              <code>{item.name}</code>
                            </td>
                            <td>{item.type}</td>
                            <td>{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </fieldset>

                {/* Engineering Limitations & Ongoing Work */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Engineering Limitations &amp; Next Milestones</legend>
                  <ul className="proj-bullet-list">
                    {selectedProject.limitationsAndNextSteps.map((lim, idx) => (
                      <li key={idx}>{lim}</li>
                    ))}
                  </ul>
                </fieldset>
              </div>
            )}

            {/* ========================================================== */}
            {/* TAB 5: SOURCE CODE & VERIFICATION                          */}
            {/* ========================================================== */}
            {activeTab === 'source' && (
              <div className="proj-content-section">
                {/* Genuine Repository Link Banner */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Genuine Repository &amp; Code Access</legend>
                  <div className="proj-repo-card win-raised">
                    <div className="proj-repo-left">
                      <svg width="24" height="24" viewBox="0 0 16 16" className="proj-repo-icon">
                        <path
                          fillRule="evenodd"
                          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                          fill="#000000"
                        />
                      </svg>
                      <div>
                        <div className="proj-repo-name">
                          <strong>{selectedProject.sourceCode.repoLabel}</strong>
                        </div>
                        <div className="proj-repo-note">{selectedProject.sourceCode.repoNote}</div>
                      </div>
                    </div>
                    <a
                      href={selectedProject.sourceCode.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-btn proj-btn--primary win-raised"
                    >
                      <span>↗ Open GitHub Repository</span>
                    </a>
                  </div>
                </fieldset>

                {/* Key Files Manifest */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Key Files &amp; Implementation Modules</legend>
                  <div className="proj-table-wrapper win-sunken">
                    <table className="proj-sunken-table">
                      <thead>
                        <tr>
                          <th style={{ width: '180px' }}>File / Artifact Name</th>
                          <th>Role &amp; Implementation Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.sourceCode.keyFiles.map((kf, idx) => (
                          <tr key={idx}>
                            <td className="proj-code-cell">
                              <code>{kf.file}</code>
                            </td>
                            <td>{kf.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </fieldset>

                {/* Core Implementation Code Excerpt */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">
                    Core Implementation Excerpt: {selectedProject.sourceCode.sampleSnippetTitle}
                  </legend>
                  <div className="proj-code-editor win-sunken">
                    <div className="proj-code-header">
                      <span>Python 3 Source</span>
                      <button
                        className="proj-code-copy-btn"
                        onClick={() => {
                          navigator.clipboard?.writeText(selectedProject.sourceCode.sampleSnippet);
                          setCopyFeedback('Snippet copied to clipboard!');
                          setTimeout(() => setCopyFeedback(null), 3000);
                        }}
                      >
                        Copy Snippet
                      </button>
                    </div>
                    <pre className="proj-code-pre">
                      <code>{selectedProject.sourceCode.sampleSnippet}</code>
                    </pre>
                  </div>
                </fieldset>

                {/* Dependencies & Environment */}
                <fieldset className="proj-groupbox">
                  <legend className="proj-groupbox-legend">Package Dependencies &amp; Runtime Environment</legend>
                  <div className="proj-table-wrapper win-sunken">
                    <table className="proj-sunken-table">
                      <thead>
                        <tr>
                          <th style={{ width: '200px' }}>Package / Runtime</th>
                          <th>Specific Purpose in Implementation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.sourceCode.dependencies.map((dep, idx) => (
                          <tr key={idx}>
                            <td className="proj-code-cell">
                              <code>{dep.package}</code>
                            </td>
                            <td>{dep.purpose}</td>
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

      {/* 4. Windows 98 Status Bar */}
      <div className="proj-statusbar">
        <div className="proj-status-pane proj-status-pane--count win-sunken">
          <span>{PROJECTS_DATA.length} Project Object(s)</span>
        </div>
        <div className="proj-status-pane proj-status-pane--selected win-sunken">
          <span>
            Selected: {selectedProject.name} — [{selectedProject.status}] {selectedProject.isFeatured ? '★' : ''}
          </span>
        </div>
        <div className="proj-status-pane proj-status-pane--zone win-sunken">
          <svg width="12" height="12" viewBox="0 0 16 16" className="proj-zone-icon">
            <rect x="2" y="3" width="12" height="8" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <rect x="4" y="5" width="8" height="4" fill="#000080" />
            <path d="M5 12h6v2H5z" fill="#808080" />
            <line x1="3" y1="14" x2="13" y2="14" stroke="#000000" strokeWidth="1" />
          </svg>
          <span>My Computer</span>
        </div>
      </div>

      {/* 5. Error Alert Modal */}
      {errorModal.open && (
        <div className="proj-modal-overlay" onClick={() => setErrorModal({ open: false, message: '' })}>
          <div
            className="proj-error-box win-raised"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-label="Windows Explorer"
          >
            <div className="proj-error-titlebar">
              <span>Windows Explorer</span>
              <button
                className="proj-props-close-btn win-raised"
                onClick={() => setErrorModal({ open: false, message: '' })}
              >
                ✕
              </button>
            </div>
            <div className="proj-error-content">
              <svg className="proj-error-icon" width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="#cc0000" />
                <line x1="10" y1="10" x2="22" y2="22" stroke="#ffffff" strokeWidth="3" />
                <line x1="22" y1="10" x2="10" y2="22" stroke="#ffffff" strokeWidth="3" />
              </svg>
              <span>{errorModal.message}</span>
            </div>
            <div className="proj-error-actions">
              <button
                className="proj-btn win-raised"
                onClick={() => setErrorModal({ open: false, message: '' })}
                autoFocus
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Windows Properties Sheet Dialog */}
      {propertiesModalOpen && (
        <div className="proj-modal-overlay" onClick={() => setPropertiesModalOpen(false)}>
          <div
            className="proj-props-window win-raised"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={`${selectedProject.name} Properties`}
          >
            <div className="proj-props-titlebar">
              <div className="proj-props-title-left">
                <svg width="14" height="14" viewBox="0 0 16 16">
                  <rect x="2" y="1" width="12" height="14" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                  <path d="M9 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8" />
                  <rect x="4" y="6" width="8" height="2" fill="#000080" />
                </svg>
                <span>{selectedProject.name} Properties</span>
              </div>
              <button
                className="proj-props-close-btn win-raised"
                onClick={() => setPropertiesModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="proj-props-header">
              <div className="proj-props-header-icon">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <rect x="4" y="2" width="24" height="28" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                  <path d="M18 2v8h8" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                  <rect x="8" y="13" width="16" height="3" fill="#000080" />
                  <line x1="8" y1="19" x2="24" y2="19" stroke="#808080" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="proj-props-header-text">
                <div className="proj-props-name">
                  {selectedProject.name} {selectedProject.isFeatured ? '★' : ''}
                </div>
                <div className="proj-props-meta">
                  <span>Type: {selectedProject.type}</span> ·{' '}
                  <span className="proj-props-status">[{selectedProject.status}]</span>
                </div>
              </div>
            </div>

            <div className="proj-props-tab-body">
              <fieldset className="proj-groupbox">
                <legend className="proj-groupbox-legend">Identification &amp; Status</legend>
                <table className="proj-props-table">
                  <tbody>
                    <tr>
                      <td className="proj-props-label">Full Title:</td>
                      <td className="proj-props-value">
                        <strong>{selectedProject.fullTitle}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="proj-props-label">Category:</td>
                      <td className="proj-props-value">{selectedProject.folder}</td>
                    </tr>
                    <tr>
                      <td className="proj-props-label">Status:</td>
                      <td className="proj-props-value">
                        <span className="proj-props-status-tag">[{selectedProject.status}]</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="proj-props-label">Tagline:</td>
                      <td className="proj-props-value">{selectedProject.tagline}</td>
                    </tr>
                    <tr>
                      <td className="proj-props-label">Repository:</td>
                      <td className="proj-props-value">
                        <a
                          href={selectedProject.sourceCode.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="proj-link"
                        >
                          {selectedProject.sourceCode.repoUrl}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>

              <fieldset className="proj-groupbox">
                <legend className="proj-groupbox-legend">Implementation Summary</legend>
                <p className="proj-paragraph">{selectedProject.whatItDoes}</p>
              </fieldset>

              <div className="proj-note-callout">
                <span>Verified technical engineering portfolio of Logesh NA (Saveetha Engineering College, Chennai).</span>
              </div>
            </div>

            <div className="proj-props-footer">
              <button className="proj-btn win-raised" onClick={() => setPropertiesModalOpen(false)}>
                OK
              </button>
              <button className="proj-btn win-raised" onClick={() => setPropertiesModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Help About Modal */}
      {showHelpModal && (
        <div className="proj-modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div
            className="proj-props-window win-raised"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 'min(440px, 94vw)' }}
            role="dialog"
            aria-label="About My Projects Explorer"
          >
            <div className="proj-props-titlebar">
              <span>About My Projects Explorer</span>
              <button className="proj-props-close-btn win-raised" onClick={() => setShowHelpModal(false)}>
                ✕
              </button>
            </div>
            <div className="proj-tab-content" style={{ padding: '16px' }}>
              <p className="proj-paragraph">
                <strong>My Projects Explorer — Engineering Edition</strong>
              </p>
              <p className="proj-paragraph">
                Showcases Logesh NA's technical work in machine learning, computer vision, and systems architecture.
              </p>
              <p className="proj-paragraph">
                Navigate the folder hierarchy on the left or use the toolbar tabs to inspect detailed architecture diagrams, mathematical formulations, pipeline stages, verified deliverables, and source code excerpts.
              </p>
              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="proj-btn win-raised" onClick={() => setShowHelpModal(false)}>
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
