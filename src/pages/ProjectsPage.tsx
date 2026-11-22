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
} from '../components/Icons';
import './ProjectsPage.css';

export interface ProjectEntry {
  id: string;
  name: string;
  fullTitle: string;
  folder: 'Machine Learning' | 'AI Applications';
  type: string;
  status: string;
  technologies: string[];
  techDisplay: string;
  techRoles: { technology: string; purpose: string }[];
  
  // Overview
  overviewText: string[];
  problemStatement: string;
  objectives?: string[];
  coreFeatures?: { title: string; desc: string }[];
  personalizationNote?: string;
  
  // Implementation
  myImplementation: string;
  pipelineDiagram: string[];
  architectureDiagram?: string[];
  pipelineStages?: { stage: string; desc: string }[];
  datasetInfo?: { source: string; details: string[] };
  featureEngineering?: { name: string; formula: string; explanation: string }[];
  implementationDetails: string[];
  modelDetails?: string[];
  components?: { name: string; desc: string }[];
  apiEndpoints?: { endpoint: string; function: string }[];
  modelFilename?: string;
  outputFilename?: string;
  
  // Results
  resultsSummary: { label: string; value: string }[];
  resultsExplanation: string;
  rewardScale?: { score: string; meaning: string }[];
  exampleTable?: { col1: string; col2: string; col3: string }[];
  developmentNote: string;
  futureEnhancements: string[];
}

export const PROJECTS_DATA: ProjectEntry[] = [
  {
    id: 'cognifocus',
    name: 'CogniFocus',
    fullTitle: 'CogniFocus: Real-Time Multimodal Gaze and Facial Engagement Analytics for Adaptive Learning Environments',
    folder: 'Machine Learning',
    type: 'Computer Vision / ML',
    status: 'In Development',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Pandas', 'scikit-learn', 'Streamlit'],
    techDisplay: 'Python, OpenCV, MediaPipe, NumPy, Pandas, scikit-learn, Streamlit',
    techRoles: [
      { technology: 'Python', purpose: 'Core implementation of video capture, geometric algorithms, feature generation, and machine learning.' },
      { technology: 'OpenCV', purpose: 'Real-time webcam video stream capture, color space conversion, and frame-by-frame image processing.' },
      { technology: 'MediaPipe', purpose: 'Real-time 3D facial landmark detection, tracking 468 facial mesh coordinate points per video frame.' },
      { technology: 'NumPy', purpose: 'Numerical feature processing, Euclidean vector calculations, Eye Aspect Ratio computation, and coordinate math.' },
      { technology: 'Pandas', purpose: 'Structuring extracted facial features into rolling temporal windows and time-series dataframes.' },
      { technology: 'scikit-learn', purpose: 'Machine learning classifier training, hyperparameter evaluation, and Leave-One-Subject-Out (LOSO) cross-validation.' },
      { technology: 'Streamlit', purpose: 'Local web dashboard rendering real-time focus states, session engagement curves, and analytical summaries.' }
    ],
    overviewText: [
      'CogniFocus is a webcam-based computer vision and machine learning system designed to estimate learner engagement during personal study sessions.',
      'The system analyses facial and eye-related behavioural signals, including gaze direction, blinking patterns, eye movement and head orientation, to estimate engagement states.',
      'The main idea is to go beyond conventional study timers. Instead of simply measuring how long someone studies, CogniFocus explores how observable behavioural signals can provide additional insights into study engagement.',
      'It is designed as a personal self-monitoring system rather than a student surveillance or automated academic evaluation tool.'
    ],
    problemStatement: 'Traditional study applications mainly track study duration, break duration, completed study sessions, and productivity timers. However, they cannot estimate behavioural engagement. A learner may remain seated in front of a computer while becoming distracted, losing visual attention or feeling drowsy. Conventional timers record this as productive time regardless of actual mental presence. CogniFocus explores how real-time computer vision and machine learning can help identify these behavioural patterns non-intrusively using standard webcam hardware and provide useful session-level insights.',
    objectives: [
      'Capture webcam video during study sessions.',
      'Detect facial landmarks in real time.',
      'Extract eye, gaze and head-pose-related features.',
      'Identify behavioural patterns associated with engagement.',
      'Classify engagement states using machine learning.',
      'Apply temporal smoothing to reduce unstable predictions.',
      'Generate session-level engagement analytics.',
      'Explore personalized engagement calibration.'
    ],
    pipelineDiagram: [
      'Stage 1: Webcam Capture (OpenCV)',
      '→ Stage 2: Facial Landmark Detection (MediaPipe Face Mesh)',
      '→ Stage 3: Feature Extraction (EAR, Gaze, Head Pose)',
      '→ Stage 4: Feature Vector Generation (Temporal Windows)',
      '→ Stage 5: ML Engagement Classification (Supervised Classifier)',
      '→ Stage 6: Temporal Smoothing (Windowed Noise Filtering)',
      '→ Stage 7: Session Analytics (Streamlit Dashboard)'
    ],
    pipelineStages: [
      { stage: 'Stage 1 — Webcam Capture', desc: 'OpenCV captures video frames from the user\'s webcam in real time at native frame rates, converting frames into standard RGB format for vision processing.' },
      { stage: 'Stage 2 — Facial Landmark Detection', desc: 'MediaPipe Face Mesh detects 468 facial landmarks. These landmarks provide the geometric information required for eye-related and facial feature extraction.' },
      { stage: 'Stage 3 — Feature Extraction', desc: 'Extracts behavioural features such as Eye Aspect Ratio (EAR), blink-related measurements (blink duration, frequency), gaze-related features (iris position relative to eye corners), head-pose estimation (pitch, yaw, roll), and facial landmark-based measurements. These numerical features represent observable facial behaviour.' },
      { stage: 'Stage 4 — Feature Vector Generation', desc: 'Converts extracted measurements into structured numerical feature vectors that can be used by the machine learning pipeline across rolling temporal windows.' },
      { stage: 'Stage 5 — Engagement Classification', desc: 'Uses a machine learning classifier to estimate engagement states from extracted features.' },
      { stage: 'Stage 6 — Temporal Smoothing', desc: 'Applies temporal processing to reduce sudden fluctuations in individual predictions and produce more stable engagement estimates.' },
      { stage: 'Stage 7 — Session Analytics', desc: 'Aggregates predictions over time to generate session-level engagement information, focus percentages, and distraction intervals.' }
    ],
    implementationDetails: [
      'EAR — Eye Aspect Ratio: A scalar ratio calculated from vertical and horizontal eye landmark distances to estimate eye openness, accurately identifying blinks and prolonged eyelid closure (drowsiness).',
      'LOSO — Leave-One-Subject-Out: Validation strategy that evaluates model generalization by holding out all data from one participant at a time for testing.',
      'MediaPipe Face Mesh: Real-time 3D landmark detection inferring 468 canonical landmarks across eyes, brows, nose, and lips without requiring specialized hardware.',
      'Head-Pose Estimation: Solved via Perspective-n-Point (PnP) geometric mapping between 2D screen coordinates and a generic 3D head model to compute pitch, yaw, and roll rotation angles.',
      'Gaze Direction Modeling: Relative Euclidean displacement between iris centers and eye corners used to detect screen visual fixation versus lateral distraction.',
      'Temporal Smoothing: Moving average and rolling exponential smoothing filters to prevent rapid flickers between focus states.'
    ],
    myImplementation: 'I implemented the end-to-end Python pipeline for CogniFocus. Specifically, I engineered the real-time webcam frame ingestion loop with OpenCV; integrated MediaPipe Face Mesh to extract 468 3D facial coordinate landmarks per frame; authored the geometric algorithms for Eye Aspect Ratio (EAR) blink calculation, iris displacement gaze tracking, and perspective-n-point head-pose angle estimation (pitch, yaw, roll); structured the rolling temporal window generator yielding 207 analytical windows; designed and conducted the Leave-One-Subject-Out (LOSO) cross-validation experiments across 9 participants in scikit-learn, recording a 79.60% baseline experimental Macro-F1 score; coded the temporal smoothing filter; and built the local Streamlit dashboard to present session-level engagement curves.',
    resultsSummary: [
      { label: 'Participants', value: '9' },
      { label: 'Generated Data Windows', value: '207' },
      { label: 'Baseline Macro-F1', value: '79.60%' },
      { label: 'Evaluation Method', value: 'Leave-One-Subject-Out' }
    ],
    resultsExplanation: 'Leave-One-Subject-Out (LOSO) validation evaluates the model by keeping one participant out of training and testing on that participant. This helps examine generalization across individuals rather than only evaluating on familiar participants. The 79.60% score represents the baseline experimental Macro-F1 score recorded under LOSO validation across the 9 participants and 207 data windows. It is strictly an experimental benchmark score, not a production accuracy claim.',
    personalizationNote: 'The project explores personalized engagement estimation because facial behaviour can vary between individuals (natural blink rates, resting gaze angles, facial proportions). Personal calibration is intended to establish an individual\'s baseline behavioural patterns before estimating engagement. At the previously recorded development stage, additional participant calibration and personalization experiments were still pending. The personalization stage remains under active development.',
    developmentNote: 'In Development. Core feature extraction, data collection, window generation, baseline model evaluation and the initial analytics pipeline have been implemented. Personalization and further calibration experiments remain development areas.',
    futureEnhancements: [
      'Personalized calibration for individual baseline behavioural profiles.',
      'More participant data across diverse lighting conditions and environments.',
      'Improved cross-person generalization through domain adaptation.',
      'More robust gaze estimation across variable camera positions and off-axis monitors.',
      'Better engagement-state classification incorporating micro-expression dynamics.',
      'Expanded session analytics with actionable study break recommendations.'
    ]
  },
  {
    id: 'startup-valuation',
    name: 'Startup Valuation Engine',
    fullTitle: 'Startup Valuation Prediction Engine — Stacking Ensemble Regression',
    folder: 'Machine Learning',
    type: 'Machine Learning',
    status: 'Implemented ML Pipeline',
    technologies: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'LightGBM', 'XGBoost', 'CatBoost', 'Jupyter Notebook', 'Kaggle'],
    techDisplay: 'Python, Pandas, NumPy, scikit-learn, LightGBM, XGBoost, CatBoost',
    techRoles: [
      { technology: 'Python', purpose: 'Core language for feature engineering, cross-validation workflows, model training, and ensembling.' },
      { technology: 'Pandas', purpose: 'Tabular dataset manipulation, missing value handling, categorical encoding, and feature generation.' },
      { technology: 'NumPy', purpose: 'Numerical array operations, vectorized calculations, and logarithmic investment transformations.' },
      { technology: 'LightGBM', purpose: 'Gradient boosting framework used to model nonlinear relationships in structured tabular data efficiently.' },
      { technology: 'XGBoost', purpose: 'Gradient boosting algorithm that builds sequential decision trees to improve predictive performance.' },
      { technology: 'CatBoost', purpose: 'Gradient boosting algorithm designed to work effectively with categorical features.' },
      { technology: 'scikit-learn', purpose: 'RidgeCV meta-model implementation, 5-fold cross-validation generation, and evaluation metrics.' },
      { technology: 'Jupyter Notebook', purpose: 'Interactive prototyping, exploratory data analysis, and iterative feature experimentation.' },
      { technology: 'Kaggle', purpose: 'Competition execution environment for reproducible model training and final submission generation.' }
    ],
    overviewText: [
      'The Startup Valuation Prediction Engine is a machine learning regression project developed for the TS-ML-Contest competition.',
      'The objective is to predict startup valuations using company and funding-related information.',
      'Instead of relying on a single prediction algorithm, the implementation combines LightGBM, XGBoost and CatBoost through a stacking ensemble, using RidgeCV as the final meta-model.',
      'The project focuses on feature engineering, model diversity, cross-validation and ensemble learning.'
    ],
    problemStatement: 'Startup valuation is influenced by multiple factors, including investment amount, number of funding rounds, number of investors, startup industry, country, and startup age. These variables can have complex, non-linear relationships with valuation, accompanied by extreme skewness in funding capital. The project explores how machine learning regression and ensemble methods can model these relationships and generate valuation predictions.',
    datasetInfo: {
      source: 'TS-ML-Contest Competition Dataset',
      details: [
        'Cleaned categorical values in Startup Name, Industry and Country.',
        'Prepared numerical and categorical features for model inputs.',
        'Removed ID, Startup Name and Year Founded from model inputs to eliminate leakage.'
      ]
    },
    featureEngineering: [
      { name: 'Startup Age', formula: 'Age = Funding Year - Founding Year', explanation: 'Derived using the founding year to represent how long the startup has existed.' },
      { name: 'Investment per Funding Round', formula: 'Total Investment / Funding Rounds Count', explanation: 'Investment amount divided by funding rounds to capture capital velocity.' },
      { name: 'Investment per Investor', formula: 'Total Investment / Investor Count', explanation: 'Investment amount divided by investor count to represent average commitment size.' },
      { name: 'Investors per Funding Round', formula: 'Investor Count / Funding Rounds Count', explanation: 'Number of investors relative to funding rounds indicating syndicate participation.' },
      { name: 'Logarithmic Investment Transformation', formula: 'Log_Investment = log1p(Investment Amount)', explanation: 'Applied to investment amount to reduce the influence of highly skewed values.' }
    ],
    pipelineDiagram: [
      '1. Prepare the startup dataset',
      '↓ 2. Perform data cleaning and feature engineering',
      '↓ 3. Train LightGBM, XGBoost and CatBoost base models',
      '↓ 4. Generate out-of-fold predictions',
      '↓ 5. Repeat cross-validation across multiple random seeds',
      '↓ 6. Use the generated predictions as inputs to RidgeCV',
      '↓ 7. Generate final valuation predictions (clipped to target range)',
      '↓ 8. Export the resulting submission file (submission_final_defense.csv)'
    ],
    modelDetails: [
      'LightGBM: A gradient boosting framework used to model nonlinear relationships in structured tabular data efficiently (up to 1,500 estimators, learning rate 0.03).',
      'XGBoost: A gradient boosting algorithm that builds sequential decision trees to improve predictive performance (up to 1,500 estimators, learning rate 0.03, max depth 6).',
      'CatBoost: A gradient boosting algorithm designed to work effectively with categorical features (up to 1,500 iterations, learning rate 0.03).',
      'RidgeCV Meta-Model: A Ridge regression model with cross-validation used to combine predictions from the base models (5-fold cross-validation).',
      'Validation Configuration: 5-fold shuffled cross-validation across 10 random seeds for variance reduction.',
      'Target Clipping: Notebook clips final predictions to the minimum and maximum values of the training target to guard against extreme extrapolation.'
    ],
    implementationDetails: [
      'Stacking — An ensemble technique that combines predictions from multiple models using a meta-regressor.',
      'OOF — Out-of-Fold predictions generated from cross-validation folds, providing an unbiased training matrix for RidgeCV.',
      'Categorical Handling: Industry and Country were handled as categorical features using native gradient boosted categorical splits.',
      'Variance Reduction: 10 random seeds were evaluated to stabilize out-of-fold blending weights and suppress single-seed noise.',
      'Prediction Target Clipping: Ensures all final predicted valuations remain strictly bounded within recorded historical minimum and maximum targets.'
    ],
    myImplementation: 'I implemented the complete competition machine learning pipeline within a Kaggle/Jupyter notebook. Specifically, I performed data cleaning across categorical company names, industries, and countries; engineered 5 domain features including startup operational age, three capital ratio interactions, and logarithmic investment scaling; established a strict 5-fold shuffled cross-validation scheme iterated across 10 random seeds; trained and tuned LightGBM (1,500 estimators, lr=0.03), XGBoost (1,500 estimators, lr=0.03, max depth=6), and CatBoost (1,500 iterations, lr=0.03) base models; collected the out-of-fold (OOF) prediction matrices; trained a RidgeCV meta-estimator with 5-fold internal cross-validation to combine the predictions; applied target boundary clipping; and generated the competition submission file submission_final_defense.csv, achieving an OOF R² score of 0.70708.',
    outputFilename: 'submission_final_defense.csv',
    resultsSummary: [
      { label: 'OOF R² Score', value: '0.70708' },
      { label: 'Cross-Validation Scheme', value: '5-Fold Shuffled CV' },
      { label: 'Random Seeds', value: '10 Seeds' },
      { label: 'Meta-Learner', value: 'RidgeCV' }
    ],
    resultsExplanation: 'The recorded out-of-fold R² score was 0.70708. R² measures how much variation in the target variable is explained by the model relative to a baseline prediction. Stacking combines the distinct inductive biases of LightGBM, XGBoost, and CatBoost to achieve superior stability. This is strictly the recorded competition experiment result; no leaderboard position, RMSE, or MAE is fabricated.',
    developmentNote: 'Implemented ML Pipeline. The competition-oriented data processing, feature engineering, model training, cross-validation, stacking and prediction export workflow were implemented. Do not claim that this is a deployed valuation service.',
    futureEnhancements: [
      'More advanced feature engineering.',
      'Hyperparameter optimization.',
      'Additional model comparisons.',
      'Improved validation strategies.',
      'More robust performance evaluation.'
    ]
  },
  {
    id: 'image-authenticity',
    name: 'CNN Image Authenticity Detection',
    fullTitle: 'CNN-Based Image Authenticity Detection',
    folder: 'AI Applications',
    type: 'Deep Learning',
    status: 'Implemented Prototype',
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'scikit-learn', 'Google Colab', 'Jupyter Notebook', 'Streamlit', 'Ngrok'],
    techDisplay: 'Python, TensorFlow, Keras, OpenCV, NumPy, scikit-learn, Streamlit, Ngrok',
    techRoles: [
      { technology: 'Python', purpose: 'Core language for image preprocessing, neural network compilation, training loops, and inference.' },
      { technology: 'TensorFlow', purpose: 'Deep learning computation backend executing tensor operations and gradient calculations.' },
      { technology: 'Keras', purpose: 'High-level neural network API used to construct and assemble the CNN layer architecture.' },
      { technology: 'OpenCV', purpose: 'Image loading, spatial resizing to consistent input dimensions, and RGB channel color conversion.' },
      { technology: 'NumPy', purpose: 'Multidimensional array manipulation, tensor conversion, and pixel normalization math.' },
      { technology: 'scikit-learn', purpose: 'Dataset splitting into distinct training and testing partitions using train_test_split().' },
      { technology: 'Google Colab', purpose: 'Cloud execution environment providing GPU acceleration for training deep convolutional layers.' },
      { technology: 'Jupyter Notebook', purpose: 'Interactive prototyping, exploratory image visualization, and evaluation experiments.' },
      { technology: 'Streamlit', purpose: 'Interactive application interface allowing users to upload images and view real-time predictions.' },
      { technology: 'Ngrok', purpose: 'Tunnelling protocol exposing the local Streamlit application for temporary access during testing.' }
    ],
    overviewText: [
      'This is a deep learning-based computer vision project that classifies images into two categories: Real and AI-Generated.',
      'The system uses a Convolutional Neural Network developed using TensorFlow and Keras.',
      'It was trained on a publicly available Kaggle dataset containing real and AI-generated images.',
      'The objective is to explore how CNNs can learn visual patterns from image data and use those patterns to classify unseen images.'
    ],
    problemStatement: 'AI image generation tools can produce highly realistic images. As a result, distinguishing authentic images from synthetic images through manual inspection can be difficult. This project explores automated image authenticity classification using a CNN-based deep learning approach to identify visual and frequency-level synthesis patterns.',
    objectives: [
      'Build a CNN-based image classification model.',
      'Distinguish real images from AI-generated images.',
      'Implement image preprocessing.',
      'Train and evaluate a deep learning model.',
      'Save the trained model for reuse.',
      'Support predictions on unseen images.'
    ],
    datasetInfo: {
      source: 'Kaggle (Public Image Dataset)',
      details: [
        'The dataset contains two classes: Real Images and AI-Generated Images.',
        'Organized into two categories for binary image classification.',
        'Images encompass photographic authentic scenes and synthetic images from generative pipelines.'
      ]
    },
    pipelineDiagram: [
      '1. Prepare the training and testing datasets (Kaggle)',
      '↓ 2. Image Preprocessing: Resizing, Normalization & Label Encoding',
      '↓ 3. Feed training images into the CNN',
      '↓ 4. Learn visual patterns through convolution and pooling',
      '↓ 5. Train the dense classification layers',
      '↓ 6. Evaluate the trained model on unseen test images',
      '↓ 7. Save the trained model for future inference (ai_image_detector.keras)',
      '↓ 8. Interactive Streamlit Prediction Interface via Ngrok'
    ],
    architectureDiagram: [
      'Input Image (Normalized RGB Tensor)',
      '↓ Convolution Layer (Learns visual patterns and edge textures)',
      '↓ Max Pooling Layer (Reduces spatial dimensions while retaining features)',
      '↓ Convolution Layer (Learns higher-level compositional features)',
      '↓ Max Pooling Layer (Reduces spatial dimensions)',
      '↓ Flatten Layer (Converts feature maps into 1D representation)',
      '↓ Dense Layer (Learns relationships between extracted features)',
      '↓ Output Layer (Produces final binary classification: Real vs. AI-Generated)'
    ],
    pipelineStages: [
      { stage: 'Image Resizing', desc: 'Images are resized into a consistent input format before being passed to the CNN.' },
      { stage: 'Pixel Normalization', desc: 'Pixel values are normalized to make numerical inputs suitable for model training.' },
      { stage: 'Label Encoding', desc: 'The two image categories are converted into numerical labels (0: Real, 1: AI-Generated).' },
      { stage: 'NumPy Conversion', desc: 'Preprocessed image data is converted into NumPy arrays for model processing.' },
      { stage: 'Dataset Splitting', desc: 'The dataset is separated into training and testing sets using scikit-learn\'s train_test_split().' }
    ],
    implementationDetails: [
      'Convolution Layers: Learn visual patterns and image features directly from pixel grids.',
      'Max Pooling Layers: Reduce spatial dimensions while retaining important feature information.',
      'Flatten Layer: Convert extracted feature maps into a one-dimensional representation.',
      'Dense Layers: Learn relationships between the extracted features.',
      'Output Layer: Produces the final binary classification output (Real Image vs. AI-Generated Image).',
      'Model Persistence: Saves the trained weights, graph topology, and optimizer state into ai_image_detector.keras for production reuse.',
      'Streamlit + Ngrok Interface: Web UI allowing users to upload an image and view predicted authenticity classes.'
    ],
    myImplementation: 'I implemented the complete deep learning workflow for image authenticity detection. In Google Colab, I authored the OpenCV and NumPy image preprocessing pipeline to resize images into uniform formats, normalize pixel intensities to [0, 1], and encode binary labels; partitioned the dataset using scikit-learn\'s train_test_split(); constructed the CNN architecture using TensorFlow and Keras with sequential convolution, max pooling, flattening, and dense projection layers; trained the network on the training images and evaluated it against unseen test images; serialized the trained network to ai_image_detector.keras; and built an interactive Streamlit testing interface with Ngrok tunneling allowing users to upload unseen images and receive real-time classification predictions.',
    modelFilename: 'ai_image_detector.keras',
    resultsSummary: [
      { label: 'Target Classes', value: '2 (Real Image / AI-Generated Image)' },
      { label: 'Input Representation', value: 'Normalized RGB Array' },
      { label: 'Saved Model File', value: 'ai_image_detector.keras' },
      { label: 'Interactive Interface', value: 'Streamlit + Ngrok' }
    ],
    resultsExplanation: 'The trained model accepts an image and predicts one of two categories: Real Image or AI-Generated Image. The trained model is saved as ai_image_detector.keras and connected to Streamlit for interactive predictions. As specified by project requirements, unverified numerical scores (accuracy, precision, recall, F1) are intentionally omitted rather than fabricated.',
    developmentNote: 'Implemented Prototype. The CNN training, image preprocessing, model evaluation, saved-model workflow and prediction interface are documented. Cloud deployment and further improvements are future enhancements.',
    futureEnhancements: [
      'Increase dataset size.',
      'Improve model performance.',
      'Support images from multiple AI generators.',
      'Cloud deployment.',
      'Explainable AI integration.'
    ]
  },
  {
    id: 'email-triage',
    name: 'Intelligent Email Triage',
    fullTitle: 'AI Email Assistant — OpenEnv-Based Email Triage System',
    folder: 'AI Applications',
    type: 'AI Application',
    status: 'Experimental Prototype',
    technologies: ['Python', 'FastAPI', 'OpenEnv', 'Uvicorn', 'Docker'],
    techDisplay: 'Python, FastAPI, OpenEnv, REST API, Uvicorn, Docker',
    techRoles: [
      { technology: 'Python', purpose: 'Core implementation language for environment logic, task queues, and REST API.' },
      { technology: 'FastAPI', purpose: 'Application server and REST API providing high-performance asynchronous endpoints.' },
      { technology: 'OpenEnv', purpose: 'Environment structure standardizing task state machines, observation spaces, and agent actions.' },
      { technology: 'Uvicorn', purpose: 'Asynchronous Server Gateway Interface (ASGI) running the FastAPI application.' },
      { technology: 'Docker', purpose: 'Container configuration for reproducible environment deployment and isolated execution.' }
    ],
    overviewText: [
      'An experimental AI-powered email triage prototype designed to process multiple email inputs, classify messages, assign priority levels and generate summaries.',
      'The project uses an OpenEnv-based environment with a FastAPI application and REST API.',
      'The objective is to explore an automated workflow for organizing incoming emails and identifying messages that may require immediate attention.'
    ],
    problemStatement: 'People often receive emails from different sources, including job alerts, financial notifications, newsletters and general updates. Manually reviewing every message can be time-consuming. This prototype explores how an automated system can classify incoming emails, assign priority and provide summarized information.',
    coreFeatures: [
      { title: 'Multiple Email Input', desc: 'Accepts multiple email inputs for processing.' },
      { title: 'Email Classification', desc: 'Classifies messages into Important, Normal, and Spam.' },
      { title: 'Priority Assignment', desc: 'Assigns one of three priority levels: High, Medium, and Low.' },
      { title: 'Smart Summary', desc: 'Generates a summary of email content.' },
      { title: 'Reward Generation', desc: 'Produces a reward score between 0.0 and 1.0 through the documented grading component.' },
      { title: 'REST API', desc: 'Provides API endpoints for environment interaction.' },
      { title: 'Interactive Interface', desc: 'Provides an interface that displays processing results.' }
    ],
    pipelineDiagram: [
      'Multiple Email Inputs',
      '↓ FastAPI Application',
      '↓ OpenEnv Environment',
      '↓ Task Processing',
      '↓ Classification and Priority',
      '↓ Reward Grading',
      '↓ Output'
    ],
    components: [
      { name: 'app.py', desc: 'FastAPI server responsible for the application interface and API.' },
      { name: 'environment.py', desc: 'Contains the OpenEnv environment logic.' },
      { name: 'tasks.py', desc: 'Defines the email-processing tasks.' },
      { name: 'grader.py', desc: 'Calculates the reward score.' },
      { name: 'inference.py', desc: 'Provides an evaluation script.' },
      { name: 'openenv.yaml', desc: 'Contains the environment API specification.' },
      { name: 'Dockerfile', desc: 'Provides container configuration.' }
    ],
    implementationDetails: [
      'OpenEnv Environment Logic: Handles environment observation transitions and task state lifecycle.',
      'Inference Lifecycle: The evaluation script (inference.py) coordinates execution through discrete START, STEP and END stages.',
      'Reward Grading Logic: grader.py compares predicted triage decisions against task definitions to compute scalar reward signals.',
      'REST API Architecture: Endpoints powered by FastAPI and Uvicorn for asynchronous task submission and state inspection.',
      'Model Documentation Transparency: The README specifies a dummy-model environment variable, so no underlying machine learning model or LLM integration is fabricated.'
    ],
    myImplementation: 'I implemented the prototype architecture for the AI Email Assistant using OpenEnv and FastAPI. Specifically, I authored environment.py to govern the OpenEnv environment state machine and observation dynamics; implemented tasks.py to structure email ingestion and task queues; built grader.py to evaluate classification correctness and urgency priority alignment, producing reward scores between 0.0 and 1.0; developed app.py using FastAPI and Uvicorn to expose REST endpoints for /reset, /step, /state, and /tasks; created inference.py to orchestrate the automated START, STEP, and END execution loop; and authored the Dockerfile and openenv.yaml specifications for containerized deployment.',
    apiEndpoints: [
      { endpoint: '/reset', function: 'Reset the environment' },
      { endpoint: '/step', function: 'Submit an action' },
      { endpoint: '/state', function: 'Retrieve current environment state' },
      { endpoint: '/tasks', function: 'View available tasks' }
    ],
    exampleTable: [
      { col1: 'Sales Intern – Chennai', col2: 'Important', col3: 'High' },
      { col1: 'Bank alert – INR 3000 debited', col2: 'Important', col3: 'Medium' },
      { col1: 'Quora digest', col2: 'Normal', col3: 'Low' }
    ],
    rewardScale: [
      { score: '1.0', meaning: 'Perfect classification.' },
      { score: '0.5–0.8', meaning: 'Good.' },
      { score: 'Below 0.5', meaning: 'Needs improvement.' }
    ],
    resultsSummary: [
      { label: 'Triage Categories', value: 'Important / Normal / Spam' },
      { label: 'Priority Levels', value: 'High / Medium / Low' },
      { label: 'Example Reward Score', value: '0.6' },
      { label: 'API Framework', value: 'FastAPI / OpenEnv' }
    ],
    resultsExplanation: 'Example reward score: 0.6. This is a documented example output, not a general model performance metric. The reward scale documented in the README is: 1.0 — Perfect classification, 0.5–0.8 — Good, and Below 0.5 — Needs improvement. The grader generates a score based on the environment\'s evaluation logic (not model accuracy).',
    developmentNote: 'Experimental Prototype — Partially Completed. This was an earlier project that was not fully completed. Present it as an exploration of AI-assisted email classification and prioritization. Do not claim production readiness, a fully trained AI model or a deployed email assistant.',
    futureEnhancements: [
      'Complete the email-processing workflow.',
      'Improve classification reliability.',
      'Integrate and validate a real model.',
      'Improve summarization.',
      'Add more robust email prioritization.',
      'Complete end-to-end testing.'
    ]
  }
];

type FolderSelection = 'all' | 'Machine Learning' | 'AI Applications';
type SortColumn = 'name' | 'type' | 'technologies' | 'status';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'details' | 'list' | 'large-icons';
type MenuKey = 'file' | 'edit' | 'view' | 'favorites' | 'tools' | 'help' | null;
type TabKey = 'general' | 'overview' | 'implementation' | 'results';

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
  const [folderHistory, setFolderHistory] = useState<FolderSelection[]>(['all']);
  const [folderHistoryIndex, setFolderHistoryIndex] = useState<number>(0);

  // Selection & View state
  const [selectedProjectId, setSelectedProjectId] = useState<string>('cognifocus');
  const [selectedFolderItem, setSelectedFolderItem] = useState<'Machine Learning' | 'AI Applications' | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('details');

  // Address Bar state
  const [addressInput, setAddressInput] = useState<string>(BASE_PROJECTS_PATH);
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);

  // Menus & Modals
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [propertiesModalOpen, setPropertiesModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const addressDropdownRef = useRef<HTMLDivElement>(null);

  const currentAddress = useMemo(() => {
    return FOLDER_SUBPATHS[selectedFolder];
  }, [selectedFolder]);

  // Keep addressInput in sync with folder navigation
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
  const navigateToFolder = (folder: FolderSelection) => {
    if (folder === selectedFolder) return;
    const newHistory = [...folderHistory.slice(0, folderHistoryIndex + 1), folder];
    setFolderHistory(newHistory);
    setFolderHistoryIndex(newHistory.length - 1);
    setSelectedFolder(folder);
    setSelectedFolderItem(null);
    setAddressDropdownOpen(false);
    setActiveMenu(null);
  };

  const goBack = () => {
    if (folderHistoryIndex <= 0) return;
    const newIndex = folderHistoryIndex - 1;
    setFolderHistoryIndex(newIndex);
    setSelectedFolder(folderHistory[newIndex]);
    setSelectedFolderItem(null);
  };

  const goForward = () => {
    if (folderHistoryIndex >= folderHistory.length - 1) return;
    const newIndex = folderHistoryIndex + 1;
    setFolderHistoryIndex(newIndex);
    setSelectedFolder(folderHistory[newIndex]);
    setSelectedFolderItem(null);
  };

  const goUp = () => {
    if (selectedFolder !== 'all') {
      navigateToFolder('all');
    }
  };

  const canGoBack = folderHistoryIndex > 0;
  const canGoForward = folderHistoryIndex < folderHistory.length - 1;
  const canGoUp = selectedFolder !== 'all';

  // Address Bar submission & validation
  const handleAddressSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = addressInput.trim().replace(/[\\/]+$/, '').toLowerCase();

    if (
      raw === BASE_PROJECTS_PATH.toLowerCase() ||
      raw === 'my projects' ||
      raw === 'c:\\projects' ||
      raw === 'projects'
    ) {
      navigateToFolder('all');
      return;
    }

    if (
      raw === FOLDER_SUBPATHS['Machine Learning'].toLowerCase() ||
      raw === 'machine learning' ||
      raw === 'ml'
    ) {
      navigateToFolder('Machine Learning');
      return;
    }

    if (
      raw === FOLDER_SUBPATHS['AI Applications'].toLowerCase() ||
      raw === 'ai applications' ||
      raw === 'ai'
    ) {
      navigateToFolder('AI Applications');
      return;
    }

    // Check individual project paths
    for (const p of PROJECTS_DATA) {
      const fullPath = `${BASE_PROJECTS_PATH}\\${p.folder}\\${p.name}`.toLowerCase();
      const directPath = `${BASE_PROJECTS_PATH}\\${p.name}`.toLowerCase();
      if (raw === fullPath || raw === directPath || raw === p.name.toLowerCase() || raw === p.id.toLowerCase()) {
        navigateToFolder(p.folder);
        setSelectedProjectId(p.id);
        setActiveTab('general');
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

  // Sync with activeSection if specified
  useEffect(() => {
    if (activeSection && activeSection.startsWith('projects/')) {
      const projId = activeSection.replace('projects/', '');
      const match = PROJECTS_DATA.find(p => p.id === projId);
      if (match) {
        setSelectedProjectId(match.id);
        setSelectedFolder(match.folder);
        setPropertiesModalOpen(true);
      }
    }
  }, [activeSection]);

  // Handle keyboard events (Enter to open, Escape to close, Backspace to go Up)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (propertiesModalOpen || showHelpModal || errorModal.open) {
        if (e.key === 'Escape') {
          setPropertiesModalOpen(false);
          setShowHelpModal(false);
          setErrorModal({ open: false, message: '' });
          setActiveMenu(null);
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
        if (selectedFolderItem) {
          navigateToFolder(selectedFolderItem);
        } else {
          setActiveTab('general');
          setPropertiesModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    propertiesModalOpen,
    showHelpModal,
    errorModal.open,
    selectedFolder,
    selectedFolderItem,
    folderHistoryIndex,
  ]);

  const filteredProjects = useMemo(() => {
    if (selectedFolder === 'all') return PROJECTS_DATA;
    return PROJECTS_DATA.filter(p => p.folder === selectedFolder);
  }, [selectedFolder]);

  const sortedProjects = useMemo(() => {
    const list = [...filteredProjects];
    list.sort((a, b) => {
      const rawA = a[sortColumn];
      const rawB = b[sortColumn];
      const valA = (Array.isArray(rawA) ? rawA.join(', ') : String(rawA)).toLowerCase();
      const valB = (Array.isArray(rawB) ? rawB.join(', ') : String(rawB)).toLowerCase();
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [filteredProjects, sortColumn, sortDirection]);

  const selectedProject = useMemo(() => {
    return PROJECTS_DATA.find(p => p.id === selectedProjectId) || PROJECTS_DATA[0];
  }, [selectedProjectId]);

  const handleSort = (col: SortColumn) => {
    if (sortColumn === col) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(col);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (project: ProjectEntry) => {
    setSelectedFolderItem(null);
    setSelectedProjectId(project.id);
  };

  const handleRowDoubleClick = (project: ProjectEntry) => {
    setSelectedFolderItem(null);
    setSelectedProjectId(project.id);
    setActiveTab('general');
    setPropertiesModalOpen(true);
  };

  const handleFolderClick = (folder: 'Machine Learning' | 'AI Applications') => {
    setSelectedFolderItem(folder);
  };

  const handleFolderDoubleClick = (folder: 'Machine Learning' | 'AI Applications') => {
    navigateToFolder(folder);
  };

  return (
    <div className="explorer-app proj-app" onClick={() => activeMenu && setActiveMenu(null)}>
      {/* 1. Menu Bar */}
      <div className="proj-menubar" onClick={(e) => e.stopPropagation()}>
        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'file' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu(prev => (prev === 'file' ? null : 'file'))}
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
                <span className="proj-dropdown-shortcut">Enter</span>
              </div>
              <div className="proj-dropdown-separator" />
              {PROJECTS_DATA.map(p => (
                <div
                  key={p.id}
                  className="proj-dropdown-item"
                  onClick={() => {
                    setSelectedProjectId(p.id);
                    setPropertiesModalOpen(true);
                    setActiveMenu(null);
                  }}
                >
                  <span>Open {p.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'edit' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu(prev => (prev === 'edit' ? null : 'edit'))}
          >
            <u>E</u>dit
          </button>
          {activeMenu === 'edit' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `${selectedProject.fullTitle}\nType: ${selectedProject.type}\nStatus: ${selectedProject.status}\nTech: ${selectedProject.techDisplay}`
                  );
                  setActiveMenu(null);
                }}
              >
                <span>Copy Project Details</span>
                <span className="proj-dropdown-shortcut">Ctrl+C</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  setSelectedProjectId(sortedProjects[0]?.id || 'cognifocus');
                  setActiveMenu(null);
                }}
              >
                <span>Select First</span>
              </div>
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'view' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu(prev => (prev === 'view' ? null : 'view'))}
          >
            <u>V</u>iew
          </button>
          {activeMenu === 'view' && (
            <div className="proj-dropdown win-raised">
              <div
                className={`proj-dropdown-item ${viewMode === 'large-icons' ? 'proj-dropdown-item--checked' : ''}`}
                onClick={() => {
                  setViewMode('large-icons');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{viewMode === 'large-icons' ? '✓' : ''}</span>
                <span>Large Icons</span>
              </div>
              <div
                className={`proj-dropdown-item ${viewMode === 'list' ? 'proj-dropdown-item--checked' : ''}`}
                onClick={() => {
                  setViewMode('list');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{viewMode === 'list' ? '✓' : ''}</span>
                <span>List</span>
              </div>
              <div
                className={`proj-dropdown-item ${viewMode === 'details' ? 'proj-dropdown-item--checked' : ''}`}
                onClick={() => {
                  setViewMode('details');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{viewMode === 'details' ? '✓' : ''}</span>
                <span>Details</span>
              </div>
              <div className="proj-dropdown-separator" />
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSort('name');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{sortColumn === 'name' ? '✓' : ''}</span>
                <span>Sort by Name</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSort('type');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{sortColumn === 'type' ? '✓' : ''}</span>
                <span>Sort by Type</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  handleSort('status');
                  setActiveMenu(null);
                }}
              >
                <span className="proj-dropdown-check">{sortColumn === 'status' ? '✓' : ''}</span>
                <span>Sort by Status</span>
              </div>
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'favorites' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu(prev => (prev === 'favorites' ? null : 'favorites'))}
          >
            Fa<u>v</u>orites
          </button>
          {activeMenu === 'favorites' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => navigateToFolder('all')}
              >
                <span>My Projects Root</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => navigateToFolder('Machine Learning')}
              >
                <span>Machine Learning Folder</span>
              </div>
              <div
                className="proj-dropdown-item"
                onClick={() => navigateToFolder('AI Applications')}
              >
                <span>AI Applications Folder</span>
              </div>
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'tools' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu(prev => (prev === 'tools' ? null : 'tools'))}
          >
            <u>T</u>ools
          </button>
          {activeMenu === 'tools' && (
            <div className="proj-dropdown win-raised">
              <div
                className="proj-dropdown-item"
                onClick={() => {
                  window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank');
                  setActiveMenu(null);
                }}
              >
                <span>Verify Project Evidence in Resume (PDF)</span>
              </div>
            </div>
          )}
        </div>

        <div className="proj-menu-item">
          <button
            className={`proj-menu-btn ${activeMenu === 'help' ? 'proj-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu(prev => (prev === 'help' ? null : 'help'))}
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

      {/* 2. Toolbar */}
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
            title="Up to Parent Folder (Backspace)"
            onClick={goUp}
            disabled={!canGoUp}
          >
            <UpFolderIcon size={14} />
            <span className="proj-tool-label">Up</span>
          </button>

          <div className="proj-tool-separator" />

          <button
            className="proj-tool-btn win-raised"
            title="View properties of selected project (Enter)"
            onClick={() => {
              setActiveTab('general');
              setPropertiesModalOpen(true);
            }}
          >
            <PropertiesNavIcon size={14} />
            <span className="proj-tool-label">Properties</span>
          </button>

          <div className="proj-tool-separator" />

          <button
            className={`proj-tool-btn ${viewMode === 'large-icons' ? 'proj-tool-btn--pressed win-sunken' : 'win-raised'}`}
            title="Switch to Large Icons View"
            onClick={() => setViewMode('large-icons')}
          >
            <LargeIconsViewIcon size={14} />
            <span className="proj-tool-label">Icons</span>
          </button>

          <button
            className={`proj-tool-btn ${viewMode === 'list' ? 'proj-tool-btn--pressed win-sunken' : 'win-raised'}`}
            title="Switch to List View"
            onClick={() => setViewMode('list')}
          >
            <ListViewIcon size={14} />
            <span className="proj-tool-label">List</span>
          </button>

          <button
            className={`proj-tool-btn ${viewMode === 'details' ? 'proj-tool-btn--pressed win-sunken' : 'win-raised'}`}
            title="Switch to Details View"
            onClick={() => setViewMode('details')}
          >
            <DetailsViewIcon size={14} />
            <span className="proj-tool-label">Details</span>
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
              title="Show Address History"
              type="button"
            >
              ▼
            </button>
          </div>
          <button
            className="proj-address-go-btn"
            onClick={() => handleAddressSubmit()}
            title="Go to Address"
            type="button"
          >
            <span>Go</span>
          </button>

          {/* Address Dropdown */}
          {addressDropdownOpen && (
            <div className="proj-address-dropdown-menu">
              <div
                className="proj-address-dropdown-option"
                onClick={() => navigateToFolder('all')}
              >
                <svg width="12" height="12" viewBox="0 0 16 16">
                  <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                </svg>
                <span>{FOLDER_SUBPATHS.all}</span>
              </div>
              <div
                className="proj-address-dropdown-option"
                onClick={() => navigateToFolder('Machine Learning')}
              >
                <svg width="12" height="12" viewBox="0 0 16 16">
                  <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                </svg>
                <span>{FOLDER_SUBPATHS['Machine Learning']}</span>
              </div>
              <div
                className="proj-address-dropdown-option"
                onClick={() => navigateToFolder('AI Applications')}
              >
                <svg width="12" height="12" viewBox="0 0 16 16">
                  <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                </svg>
                <span>{FOLDER_SUBPATHS['AI Applications']}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Split Body */}
      <div className="proj-body">
        {/* Left Pane: Folder Navigation Tree */}
        <div className="proj-left-pane">
          <div className="proj-pane-header">
            <span>Folders</span>
          </div>
          <div className="proj-tree win-sunken" role="tree" aria-label="Project Categories">
            {/* Root Node */}
            <div
              className={`proj-tree-node ${selectedFolder === 'all' ? 'proj-tree-node--selected' : ''}`}
              onClick={() => navigateToFolder('all')}
              tabIndex={0}
              role="treeitem"
              aria-selected={selectedFolder === 'all'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') navigateToFolder('all');
              }}
            >
              <span className="proj-tree-toggle">-</span>
              <svg width="16" height="14" viewBox="0 0 16 14" className="proj-folder-svg">
                <path d="M1 2h5l2 2h7v9H1V2z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                <path d="M1 4h14v8H1V4z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
              </svg>
              <span className="proj-tree-label">My Projects</span>
            </div>

            {/* Subfolders */}
            <div className="proj-tree-branch">
              {/* Machine Learning */}
              <div
                className={`proj-tree-node ${selectedFolder === 'Machine Learning' ? 'proj-tree-node--selected' : ''}`}
                onClick={() => navigateToFolder('Machine Learning')}
                tabIndex={0}
                role="treeitem"
                aria-selected={selectedFolder === 'Machine Learning'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigateToFolder('Machine Learning');
                }}
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
                {PROJECTS_DATA.filter(p => p.folder === 'Machine Learning').map((p, idx, arr) => (
                  <div
                    key={p.id}
                    className={`proj-tree-subitem ${selectedProjectId === p.id && !selectedFolderItem ? 'proj-tree-subitem--active' : ''}`}
                    onClick={() => {
                      setSelectedFolder('Machine Learning');
                      setSelectedFolderItem(null);
                      setSelectedProjectId(p.id);
                    }}
                    onDoubleClick={() => handleRowDoubleClick(p)}
                  >
                    <span className="proj-tree-subconnector">{idx === arr.length - 1 ? '└─' : '├─'}</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" className="proj-file-svg">
                      <rect x="2" y="1" width="12" height="14" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                      <path d="M10 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8" />
                      <rect x="4" y="6" width="8" height="2" fill="#000080" />
                    </svg>
                    <span className="proj-tree-sublabel">{p.name}</span>
                  </div>
                ))}
              </div>

              {/* AI Applications */}
              <div
                className={`proj-tree-node ${selectedFolder === 'AI Applications' ? 'proj-tree-node--selected' : ''}`}
                onClick={() => navigateToFolder('AI Applications')}
                tabIndex={0}
                role="treeitem"
                aria-selected={selectedFolder === 'AI Applications'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigateToFolder('AI Applications');
                }}
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
                {PROJECTS_DATA.filter(p => p.folder === 'AI Applications').map((p) => (
                  <div
                    key={p.id}
                    className={`proj-tree-subitem ${selectedProjectId === p.id && !selectedFolderItem ? 'proj-tree-subitem--active' : ''}`}
                    onClick={() => {
                      setSelectedFolder('AI Applications');
                      setSelectedFolderItem(null);
                      setSelectedProjectId(p.id);
                    }}
                    onDoubleClick={() => handleRowDoubleClick(p)}
                  >
                    <span className="proj-tree-subconnector">└─</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" className="proj-file-svg">
                      <rect x="2" y="1" width="12" height="14" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                      <path d="M10 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8" />
                      <rect x="4" y="6" width="8" height="2" fill="#000080" />
                    </svg>
                    <span className="proj-tree-sublabel">{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Splitter */}
        <div className="proj-splitter" />

        {/* Right Pane: Explorer Content */}
        <div className="proj-right-pane">
          {/* Readme Banner */}
          <div className="proj-readme-banner">
            <span className="proj-readme-title">Readme.txt:</span>
            <span className="proj-readme-text">
              Selected academic and personal engineering projects. Double-click any folder to navigate or project to view properties.
            </span>
          </div>

          {/* Details Table View */}
          {viewMode === 'details' && (
            <div className="proj-list-view win-sunken" role="region" aria-label="Project Details Table">
              <table className="proj-table">
                <thead>
                  <tr>
                    <th
                      className="proj-th proj-th--name win-raised"
                      onClick={() => handleSort('name')}
                      title="Sort by Project Name"
                    >
                      <div className="proj-th-content">
                        <span>Name</span>
                        {sortColumn === 'name' && (
                          <span className="proj-sort-arrow">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="proj-th proj-th--type win-raised"
                      onClick={() => handleSort('type')}
                      title="Sort by Technical Type"
                    >
                      <div className="proj-th-content">
                        <span>Type</span>
                        {sortColumn === 'type' && (
                          <span className="proj-sort-arrow">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="proj-th proj-th--tech win-raised"
                      onClick={() => handleSort('technologies')}
                      title="Sort by Technologies"
                    >
                      <div className="proj-th-content">
                        <span>Technologies</span>
                        {sortColumn === 'technologies' && (
                          <span className="proj-sort-arrow">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="proj-th proj-th--status win-raised"
                      onClick={() => handleSort('status')}
                      title="Sort by Status"
                    >
                      <div className="proj-th-content">
                        <span>Status</span>
                        {sortColumn === 'status' && (
                          <span className="proj-sort-arrow">
                            {sortDirection === 'asc' ? '▲' : '▼'}
                          </span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Folders shown when in root view */}
                  {selectedFolder === 'all' && (
                    <>
                      <tr
                        className={`proj-tr ${selectedFolderItem === 'Machine Learning' ? 'proj-tr--selected' : ''}`}
                        onClick={() => handleFolderClick('Machine Learning')}
                        onDoubleClick={() => handleFolderDoubleClick('Machine Learning')}
                        tabIndex={0}
                      >
                        <td className="proj-td proj-td--name">
                          <svg width="14" height="14" viewBox="0 0 16 16" className="proj-row-icon">
                            <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                            <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                          </svg>
                          <span className="proj-item-name">Machine Learning</span>
                        </td>
                        <td className="proj-td proj-td--type">File Folder</td>
                        <td className="proj-td proj-td--tech">3 Projects</td>
                        <td className="proj-td proj-td--status">
                          <span className="proj-status-badge">[Folder]</span>
                        </td>
                      </tr>
                      <tr
                        className={`proj-tr ${selectedFolderItem === 'AI Applications' ? 'proj-tr--selected' : ''}`}
                        onClick={() => handleFolderClick('AI Applications')}
                        onDoubleClick={() => handleFolderDoubleClick('AI Applications')}
                        tabIndex={0}
                      >
                        <td className="proj-td proj-td--name">
                          <svg width="14" height="14" viewBox="0 0 16 16" className="proj-row-icon">
                            <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                            <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                          </svg>
                          <span className="proj-item-name">AI Applications</span>
                        </td>
                        <td className="proj-td proj-td--type">File Folder</td>
                        <td className="proj-td proj-td--tech">1 Project</td>
                        <td className="proj-td proj-td--status">
                          <span className="proj-status-badge">[Folder]</span>
                        </td>
                      </tr>
                    </>
                  )}

                  {/* Project Items */}
                  {sortedProjects.map((project) => {
                    const isSelected = project.id === selectedProjectId && !selectedFolderItem;
                    return (
                      <tr
                        key={project.id}
                        className={`proj-tr ${isSelected ? 'proj-tr--selected' : ''}`}
                        onClick={() => handleRowClick(project)}
                        onDoubleClick={() => handleRowDoubleClick(project)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRowDoubleClick(project);
                        }}
                      >
                        <td className="proj-td proj-td--name">
                          <svg width="14" height="14" viewBox="0 0 16 16" className="proj-row-icon">
                            <rect x="2" y="1" width="12" height="14" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                            <path d="M9 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8" />
                            <rect x="4" y="6" width="8" height="2" fill="#000080" />
                            <line x1="4" y1="10" x2="12" y2="10" stroke="#808080" strokeWidth="1" />
                            <line x1="4" y1="12" x2="9" y2="12" stroke="#808080" strokeWidth="1" />
                          </svg>
                          <span className="proj-item-name">{project.name}</span>
                        </td>
                        <td className="proj-td proj-td--type">{project.type}</td>
                        <td className="proj-td proj-td--tech">{project.techDisplay}</td>
                        <td className="proj-td proj-td--status">
                          <span className="proj-status-badge">[{project.status}]</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Compact List View */}
          {viewMode === 'list' && (
            <div className="proj-compact-list-view win-sunken" role="region" aria-label="Compact List View">
              <div className="proj-compact-list-grid">
                {selectedFolder === 'all' && (
                  <>
                    <div
                      className={`proj-compact-list-item ${selectedFolderItem === 'Machine Learning' ? 'proj-compact-list-item--selected' : ''}`}
                      onClick={() => handleFolderClick('Machine Learning')}
                      onDoubleClick={() => handleFolderDoubleClick('Machine Learning')}
                      tabIndex={0}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                        <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                      </svg>
                      <span className="proj-compact-list-label">Machine Learning</span>
                      <span className="proj-compact-list-status">[Folder]</span>
                    </div>
                    <div
                      className={`proj-compact-list-item ${selectedFolderItem === 'AI Applications' ? 'proj-compact-list-item--selected' : ''}`}
                      onClick={() => handleFolderClick('AI Applications')}
                      onDoubleClick={() => handleFolderDoubleClick('AI Applications')}
                      tabIndex={0}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                        <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                      </svg>
                      <span className="proj-compact-list-label">AI Applications</span>
                      <span className="proj-compact-list-status">[Folder]</span>
                    </div>
                  </>
                )}

                {sortedProjects.map((project) => {
                  const isSelected = project.id === selectedProjectId && !selectedFolderItem;
                  return (
                    <div
                      key={project.id}
                      className={`proj-compact-list-item ${isSelected ? 'proj-compact-list-item--selected' : ''}`}
                      onClick={() => handleRowClick(project)}
                      onDoubleClick={() => handleRowDoubleClick(project)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRowDoubleClick(project);
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" className="proj-row-icon">
                        <rect x="2" y="1" width="12" height="14" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                        <path d="M9 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8" />
                        <rect x="4" y="6" width="8" height="2" fill="#000080" />
                      </svg>
                      <span className="proj-compact-list-label">{project.name}</span>
                      <span className="proj-compact-list-status">[{project.status}]</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Large Icons View */}
          {viewMode === 'large-icons' && (
            <div className="proj-grid-view win-sunken" role="region" aria-label="Large Icons View">
              <div className="proj-grid-container">
                {selectedFolder === 'all' && (
                  <>
                    <div
                      className={`proj-grid-item ${selectedFolderItem === 'Machine Learning' ? 'proj-grid-item--selected' : ''}`}
                      onClick={() => handleFolderClick('Machine Learning')}
                      onDoubleClick={() => handleFolderDoubleClick('Machine Learning')}
                      tabIndex={0}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" className="proj-grid-icon">
                        <path d="M2 6h10l4 4h14v18H2V6z" fill="#f6d04d" stroke="#000000" strokeWidth="1.2" />
                        <path d="M2 10h28v16H2V10z" fill="#ffeaa7" stroke="#000000" strokeWidth="1.2" />
                      </svg>
                      <span className="proj-grid-label">Machine Learning</span>
                      <span className="proj-grid-sublabel">[File Folder]</span>
                    </div>
                    <div
                      className={`proj-grid-item ${selectedFolderItem === 'AI Applications' ? 'proj-grid-item--selected' : ''}`}
                      onClick={() => handleFolderClick('AI Applications')}
                      onDoubleClick={() => handleFolderDoubleClick('AI Applications')}
                      tabIndex={0}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" className="proj-grid-icon">
                        <path d="M2 6h10l4 4h14v18H2V6z" fill="#f6d04d" stroke="#000000" strokeWidth="1.2" />
                        <path d="M2 10h28v16H2V10z" fill="#ffeaa7" stroke="#000000" strokeWidth="1.2" />
                      </svg>
                      <span className="proj-grid-label">AI Applications</span>
                      <span className="proj-grid-sublabel">[File Folder]</span>
                    </div>
                  </>
                )}

                {sortedProjects.map((project) => {
                  const isSelected = project.id === selectedProjectId && !selectedFolderItem;
                  return (
                    <div
                      key={project.id}
                      className={`proj-grid-item ${isSelected ? 'proj-grid-item--selected' : ''}`}
                      onClick={() => handleRowClick(project)}
                      onDoubleClick={() => handleRowDoubleClick(project)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRowDoubleClick(project);
                      }}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" className="proj-grid-icon">
                        <rect x="4" y="2" width="24" height="28" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                        <path d="M18 2v8h8" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                        <rect x="8" y="13" width="16" height="3" fill="#000080" />
                        <line x1="8" y1="19" x2="24" y2="19" stroke="#808080" strokeWidth="1.5" />
                        <line x1="8" y1="23" x2="18" y2="23" stroke="#808080" strokeWidth="1.5" />
                      </svg>
                      <span className="proj-grid-label">{project.name}</span>
                      <span className="proj-grid-sublabel">[{project.status}]</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. Status Bar */}
      <div className="proj-statusbar">
        <div className="proj-status-pane proj-status-pane--count win-sunken">
          <span>
            {selectedFolder === 'all'
              ? `${sortedProjects.length + 2} object(s)`
              : `${sortedProjects.length} object(s)`}
          </span>
        </div>
        <div className="proj-status-pane proj-status-pane--selected win-sunken">
          {selectedFolderItem ? (
            <span>Selected: {selectedFolderItem} (File Folder)</span>
          ) : (
            <span>Selected: {selectedProject.name} — [{selectedProject.status}]</span>
          )}
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

      {/* Explorer Error Alert Dialog */}
      {errorModal.open && (
        <div
          className="proj-modal-overlay"
          onClick={() => setErrorModal({ open: false, message: '' })}
        >
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

      {/* 5. Project Properties Dialog (Windows Properties Modal) */}
      {propertiesModalOpen && (
        <div className="proj-modal-overlay" onClick={() => setPropertiesModalOpen(false)}>
          <div
            className="proj-props-window win-raised"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={`${selectedProject.name} Properties`}
          >
            {/* Title Bar */}
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

            {/* Header info */}
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
                <div className="proj-props-name">{selectedProject.name}</div>
                <div className="proj-props-meta">
                  <span>Type: {selectedProject.type}</span> · <span className="proj-props-status">[{selectedProject.status}]</span>
                </div>
              </div>
            </div>

            {/* Tab Strip */}
            <div className="proj-props-tabs">
              <button
                className={`proj-props-tab ${activeTab === 'general' ? 'proj-props-tab--active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                General
              </button>
              <button
                className={`proj-props-tab ${activeTab === 'overview' ? 'proj-props-tab--active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`proj-props-tab ${activeTab === 'implementation' ? 'proj-props-tab--active' : ''}`}
                onClick={() => setActiveTab('implementation')}
              >
                Implementation
              </button>
              <button
                className={`proj-props-tab ${activeTab === 'results' ? 'proj-props-tab--active' : ''}`}
                onClick={() => setActiveTab('results')}
              >
                Results
              </button>
            </div>

            {/* Tab Body */}
            <div className="proj-props-tab-body">
              {/* TAB 1: GENERAL */}
              {activeTab === 'general' && (
                <div className="proj-tab-content">
                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Identification</legend>
                    <table className="proj-props-table">
                      <tbody>
                        <tr>
                          <td className="proj-props-label">Full Title:</td>
                          <td className="proj-props-value"><strong>{selectedProject.fullTitle}</strong></td>
                        </tr>
                        <tr>
                          <td className="proj-props-label">Folder:</td>
                          <td className="proj-props-value">{selectedProject.folder}</td>
                        </tr>
                        <tr>
                          <td className="proj-props-label">Project Type:</td>
                          <td className="proj-props-value">{selectedProject.type}</td>
                        </tr>
                        <tr>
                          <td className="proj-props-label">Status:</td>
                          <td className="proj-props-value">
                            <span className="proj-props-status-tag">[{selectedProject.status}]</span>
                          </td>
                        </tr>
                        {selectedProject.modelFilename && (
                          <tr>
                            <td className="proj-props-label">Model File:</td>
                            <td className="proj-props-value"><code>{selectedProject.modelFilename}</code></td>
                          </tr>
                        )}
                        {selectedProject.outputFilename && (
                          <tr>
                            <td className="proj-props-label">Export File:</td>
                            <td className="proj-props-value"><code>{selectedProject.outputFilename}</code></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </fieldset>

                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Technology Stack &amp; Implementation Roles</legend>
                    <table className="proj-tech-table win-sunken">
                      <thead>
                        <tr>
                          <th style={{ width: '100px' }}>Technology</th>
                          <th>Role &amp; Implementation Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProject.techRoles.map((tr, idx) => (
                          <tr key={idx}>
                            <td className="proj-tech-name"><code>{tr.technology}</code></td>
                            <td>{tr.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="proj-tech-badges">
                      {selectedProject.technologies.map((t) => (
                        <span key={t} className="proj-tech-chip win-raised">
                          {t}
                        </span>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">My Implementation</legend>
                    <div className="proj-my-impl">
                      {selectedProject.myImplementation}
                    </div>
                  </fieldset>

                  <div className="proj-note-callout">
                    <span>Note: This project is part of Logesh NA's engineering portfolio at Saveetha Engineering College, Chennai.</span>
                  </div>
                </div>
              )}

              {/* TAB 2: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="proj-tab-content">
                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">System Overview</legend>
                    {selectedProject.overviewText.map((p, i) => (
                      <p key={i} className="proj-paragraph">{p}</p>
                    ))}
                  </fieldset>

                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Problem Statement &amp; Motivation</legend>
                    <p className="proj-paragraph">{selectedProject.problemStatement}</p>
                  </fieldset>

                  {selectedProject.objectives && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Project Objectives</legend>
                      <ul className="proj-feature-list">
                        {selectedProject.objectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </fieldset>
                  )}

                  {selectedProject.coreFeatures && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Core Features &amp; Capabilities</legend>
                      <table className="proj-props-table">
                        <tbody>
                          {selectedProject.coreFeatures.map((feat, idx) => (
                            <tr key={idx}>
                              <td className="proj-props-label" style={{ width: '150px' }}><strong>{feat.title}</strong></td>
                              <td className="proj-props-value">{feat.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </fieldset>
                  )}

                  {selectedProject.personalizationNote && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Personalization &amp; Development Direction</legend>
                      <p className="proj-paragraph">{selectedProject.personalizationNote}</p>
                    </fieldset>
                  )}
                </div>
              )}

              {/* TAB 3: IMPLEMENTATION */}
              {activeTab === 'implementation' && (
                <div className="proj-tab-content">
                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Processing &amp; Architecture Pipeline</legend>
                    <div className="proj-pipeline-box win-sunken">
                      {selectedProject.pipelineDiagram.map((step, idx) => (
                        <div key={idx} className="proj-pipeline-step">
                          <span className="proj-pipeline-badge">{step}</span>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  {selectedProject.pipelineStages && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Pipeline Stages &amp; Flow</legend>
                      {selectedProject.pipelineStages.map((stg, idx) => (
                        <div key={idx} className="proj-stage-row">
                          <div className="proj-stage-title">{stg.stage}</div>
                          <p className="proj-stage-desc">{stg.desc}</p>
                        </div>
                      ))}
                    </fieldset>
                  )}

                  {selectedProject.architectureDiagram && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Layer Architecture Flow</legend>
                      <div className="proj-arch-flow win-sunken">
                        {selectedProject.architectureDiagram.map((layer, idx) => (
                          <div key={idx} className="proj-arch-node">
                            <span className="proj-arch-text">{layer}</span>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  )}

                  {selectedProject.datasetInfo && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Dataset &amp; Preprocessing</legend>
                      <p className="proj-paragraph"><strong>Source:</strong> {selectedProject.datasetInfo.source}</p>
                      <ul className="proj-feature-list">
                        {selectedProject.datasetInfo.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </fieldset>
                  )}

                  {selectedProject.featureEngineering && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Feature Engineering Breakdown</legend>
                      {selectedProject.featureEngineering.map((feat, idx) => (
                        <div key={idx} className="proj-feat-item">
                          <div className="proj-feat-name">{feat.name}</div>
                          <div className="proj-feat-formula">{feat.formula}</div>
                          <p className="proj-feat-desc">{feat.explanation}</p>
                        </div>
                      ))}
                    </fieldset>
                  )}

                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Technical Components &amp; Architecture Details</legend>
                    <ul className="proj-feature-list">
                      {selectedProject.implementationDetails.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </fieldset>

                  {selectedProject.modelDetails && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Ensemble &amp; Cross-Validation Specifications</legend>
                      <ul className="proj-feature-list">
                        {selectedProject.modelDetails.map((m, idx) => (
                          <li key={idx}><strong>{m.split(':')[0]}:</strong>{m.substring(m.indexOf(':') + 1)}</li>
                        ))}
                      </ul>
                    </fieldset>
                  )}

                  {selectedProject.components && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">System Components &amp; Files</legend>
                      <table className="proj-props-table">
                        <tbody>
                          {selectedProject.components.map((comp, idx) => (
                            <tr key={idx}>
                              <td className="proj-props-label" style={{ width: '130px' }}><code>{comp.name}</code></td>
                              <td className="proj-props-value">{comp.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </fieldset>
                  )}

                  {selectedProject.apiEndpoints && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">REST API Endpoints</legend>
                      <div className="proj-endpoints-box win-sunken">
                        {selectedProject.apiEndpoints.map((ep, idx) => (
                          <div key={idx} className="proj-endpoint-row">
                            <code><strong>{ep.endpoint}</strong> — {ep.function}</code>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  )}
                </div>
              )}

              {/* TAB 4: RESULTS */}
              {activeTab === 'results' && (
                <div className="proj-tab-content">
                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Experimental Results &amp; Verified Metrics</legend>
                    <div className="proj-metrics-grid">
                      {selectedProject.resultsSummary.map((metric, idx) => (
                        <div key={idx} className="proj-metric-card win-sunken">
                          <div className="proj-metric-label">{metric.label}</div>
                          <div className="proj-metric-val">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Evaluation Methodology</legend>
                    <p className="proj-paragraph">{selectedProject.resultsExplanation}</p>
                  </fieldset>

                  {selectedProject.rewardScale && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Reward Grading Scale</legend>
                      <table className="proj-props-table">
                        <tbody>
                          {selectedProject.rewardScale.map((rs, idx) => (
                            <tr key={idx}>
                              <td className="proj-props-label" style={{ width: '100px' }}><code>{rs.score}</code></td>
                              <td className="proj-props-value">{rs.meaning}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </fieldset>
                  )}

                  {selectedProject.exampleTable && (
                    <fieldset className="proj-groupbox">
                      <legend className="proj-groupbox-legend">Sample Evaluation Output</legend>
                      <table className="proj-eval-table win-sunken">
                        <thead>
                          <tr>
                            <th>Email Input</th>
                            <th>Classification</th>
                            <th>Priority</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProject.exampleTable.map((row, idx) => (
                            <tr key={idx}>
                              <td>{row.col1}</td>
                              <td><strong>{row.col2}</strong></td>
                              <td>{row.col3}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </fieldset>
                  )}

                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Development &amp; Engineering Status</legend>
                    <div className="proj-dev-status-box">
                      <p className="proj-paragraph" style={{ margin: 0 }}>
                        {selectedProject.developmentNote}
                      </p>
                    </div>
                  </fieldset>

                  <fieldset className="proj-groupbox">
                    <legend className="proj-groupbox-legend">Limitations &amp; Future Enhancements</legend>
                    <ul className="proj-feature-list">
                      {selectedProject.futureEnhancements.map((enh, idx) => (
                        <li key={idx}>{enh}</li>
                      ))}
                    </ul>
                  </fieldset>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="proj-props-footer">
              <button
                className="proj-btn win-raised"
                onClick={() => setPropertiesModalOpen(false)}
              >
                OK
              </button>
              <button
                className="proj-btn win-raised"
                onClick={() => setPropertiesModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Help Modal */}
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
              <button
                className="proj-props-close-btn win-raised"
                onClick={() => setShowHelpModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="proj-tab-content" style={{ padding: '16px' }}>
              <p className="proj-paragraph">
                <strong>My Projects Explorer — Version 5.0</strong>
              </p>
              <p className="proj-paragraph">
                Organizes Logesh NA's academic and competition engineering projects inside a Windows 98 File Explorer interface.
              </p>
              <p className="proj-paragraph">
                Double-click any project or press Enter to inspect its Properties sheet, processing architecture, experimental results, and technical documentation.
              </p>
              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="proj-btn win-raised"
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

export default ProjectsPage;
