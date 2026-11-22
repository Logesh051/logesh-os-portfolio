import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  BackNavIcon,
  ForwardNavIcon,
  UpFolderIcon,
  PropertiesNavIcon,
  DetailsViewIcon,
  ListViewIcon,
  LargeIconsViewIcon,
} from '../components/Icons';
import './TechStacksPage.css';

export interface SkillItem {
  id: string;
  name: string;
  type: string;
  usedIn: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  path: string;
  items: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages',
    path: 'C:\\Technical Skills\\Languages',
    items: [
      {
        id: 'python',
        name: 'Python',
        type: 'Programming Language',
        usedIn: 'CogniFocus, Startup Valuation Prediction, Image Authenticity Detection, Email Triage',
      },
      {
        id: 'sql',
        name: 'SQL',
        type: 'Database Query Language',
        usedIn: 'Retech Data Analytics internship (querying sales & customer database)',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        type: 'Scripting Language',
        usedIn: 'Interactive UI components for LOGESH_OS portfolio',
      },
      {
        id: 'html',
        name: 'HTML',
        type: 'Markup Language',
        usedIn: 'Web page structuring for LOGESH_OS & project interfaces',
      },
      {
        id: 'css',
        name: 'CSS',
        type: 'Style Sheet Language',
        usedIn: 'Retro Windows 95 styling & responsive layout system',
      },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    path: 'C:\\Technical Skills\\AI & Machine Learning',
    items: [
      {
        id: 'regression',
        name: 'Regression',
        type: 'ML Methodology',
        usedIn: 'Startup Valuation Prediction Engine (RidgeCV meta-learner, R² 0.707)',
      },
      {
        id: 'classification',
        name: 'Classification',
        type: 'ML Methodology',
        usedIn: 'CNN Image Authenticity Detection, Intelligent Email Triage',
      },
      {
        id: 'ensemble-learning',
        name: 'Ensemble Learning',
        type: 'ML Architecture',
        usedIn: 'Startup Valuation Prediction Engine (Stacked LightGBM, XGBoost, CatBoost)',
      },
      {
        id: 'feature-engineering',
        name: 'Feature Engineering',
        type: 'Data Transformation',
        usedIn: 'Startup Valuation Engine (out-of-fold feature generation pipelines)',
      },
      {
        id: 'cross-validation',
        name: 'Cross-Validation',
        type: 'Validation Technique',
        usedIn: 'Startup Valuation Prediction Engine (K-fold cross-validation)',
      },
      {
        id: 'model-evaluation',
        name: 'Model Evaluation',
        type: 'Performance Analysis',
        usedIn: 'Evaluation metrics across projects (R², RMSE, precision, recall, F1)',
      },
    ],
  },
  {
    id: 'deep-learning-cv',
    name: 'Deep Learning & Computer Vision',
    path: 'C:\\Technical Skills\\Deep Learning & Computer Vision',
    items: [
      {
        id: 'cnn',
        name: 'CNN',
        type: 'Neural Network Architecture',
        usedIn: 'CNN-Based Image Authenticity Detection, CogniFocus',
      },
      {
        id: 'image-preprocessing',
        name: 'Image Preprocessing',
        type: 'Computer Vision Technique',
        usedIn: 'CNN-Based Image Authenticity Detection (resizing, normalization)',
      },
      {
        id: 'data-augmentation',
        name: 'Data Augmentation',
        type: 'Training Enhancement',
        usedIn: 'CNN-Based Image Authenticity Detection (rotation, contrast tuning)',
      },
      {
        id: 'opencv',
        name: 'OpenCV',
        type: 'Computer Vision Library',
        usedIn: 'CNN-Based Image Authenticity Detection (image loading & manipulation)',
      },
      {
        id: 'mediapipe',
        name: 'MediaPipe',
        type: 'Vision / ML Framework',
        usedIn: 'CogniFocus (real-time facial landmark & attention tracking)',
      },
      {
        id: 'tensorflow',
        name: 'TensorFlow',
        type: 'Deep Learning Framework',
        usedIn: 'CNN-Based Image Authenticity Detection (deep learning pipeline)',
      },
      {
        id: 'keras',
        name: 'Keras',
        type: 'Deep Learning API',
        usedIn: 'CNN-Based Image Authenticity Detection (model architecture & layers)',
      },
    ],
  },
  {
    id: 'nlp',
    name: 'NLP',
    path: 'C:\\Technical Skills\\NLP',
    items: [
      {
        id: 'nltk',
        name: 'NLTK',
        type: 'NLP Toolkit',
        usedIn: 'Intelligent Email Triage (tokenization & stopword removal)',
      },
      {
        id: 'tfidf',
        name: 'TF-IDF',
        type: 'Text Feature Extraction',
        usedIn: 'Intelligent Email Triage (text vectorization for classification)',
      },
      {
        id: 'naive-bayes',
        name: 'Naive Bayes',
        type: 'Probabilistic Classifier',
        usedIn: 'Intelligent Email Triage (multinomial text classification)',
      },
      {
        id: 'text-classification',
        name: 'Text Classification',
        type: 'NLP Task',
        usedIn: 'Intelligent Email Triage & Prioritization Engine',
      },
      {
        id: 'text-preprocessing',
        name: 'Text Preprocessing',
        type: 'NLP Technique',
        usedIn: 'Intelligent Email Triage (text cleaning, normalization)',
      },
    ],
  },
  {
    id: 'libraries-tools',
    name: 'Libraries & Tools',
    path: 'C:\\Technical Skills\\Libraries & Tools',
    items: [
      {
        id: 'numpy',
        name: 'NumPy',
        type: 'Numerical Computing',
        usedIn: 'Numerical arrays across ML pipelines & Retech internship',
      },
      {
        id: 'pandas',
        name: 'Pandas',
        type: 'Data Manipulation',
        usedIn: 'Startup Valuation Prediction Engine & Retech internship',
      },
      {
        id: 'scikit-learn',
        name: 'scikit-learn',
        type: 'Machine Learning Library',
        usedIn: 'Startup Valuation Prediction, Email Triage, Technohacks internship',
      },
      {
        id: 'lightgbm',
        name: 'LightGBM',
        type: 'Gradient Boosting Library',
        usedIn: 'Startup Valuation Prediction Engine (gradient boosting base model)',
      },
      {
        id: 'xgboost',
        name: 'XGBoost',
        type: 'Gradient Boosting Library',
        usedIn: 'Startup Valuation Prediction Engine (gradient boosting base model)',
      },
      {
        id: 'catboost',
        name: 'CatBoost',
        type: 'Gradient Boosting Library',
        usedIn: 'Startup Valuation Prediction Engine (gradient boosting base model)',
      },
      {
        id: 'streamlit',
        name: 'Streamlit',
        type: 'Application Framework',
        usedIn: 'CogniFocus (local real-time interactive analytics dashboard)',
      },
      {
        id: 'git-github',
        name: 'Git/GitHub',
        type: 'Version Control',
        usedIn: 'Source code management across all repositories (github.com/Logesh051)',
      },
      {
        id: 'jupyter-notebook',
        name: 'Jupyter Notebook',
        type: 'Development Environment',
        usedIn: 'Exploratory data analysis & baseline model experimentation',
      },
      {
        id: 'google-colab',
        name: 'Google Colab',
        type: 'Cloud Notebook',
        usedIn: 'Model training & GPU experimentation',
      },
      {
        id: 'excel',
        name: 'Excel',
        type: 'Spreadsheet Software',
        usedIn: 'Retech Data Analytics internship (cleaning & analysis across 500+ records)',
      },
    ],
  },
];

const ROOT_PATH = 'C:\\Technical Skills';

type FolderId = 'root' | string;
type ViewMode = 'details' | 'list' | 'large-icons';
type SortColumn = 'name' | 'type' | 'usedIn' | null;
type SortDirection = 'asc' | 'desc';
type MenuKey = 'file' | 'edit' | 'view' | 'tools' | 'help' | null;
type PropsTab = 'general' | 'evidence';

const TechStacksPage: React.FC = () => {
  // Navigation stack state
  const [currentFolderId, setCurrentFolderId] = useState<FolderId>('languages');
  const [history, setHistory] = useState<FolderId[]>(['languages']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Selection & View state
  const [selectedItemId, setSelectedItemId] = useState<string | null>('python');
  const [viewMode, setViewMode] = useState<ViewMode>('details');
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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

    if (raw === 'c:\\technical skills' || raw === 'technical skills' || raw === 'c:') {
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
        const valA = a.name.toLowerCase();
        const valB = b.name.toLowerCase();
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

  const handleSort = (column: 'name' | 'type' | 'usedIn') => {
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
        // Prevent browser back if focused outside input
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
                <span>Copy</span>
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
                  handleSort('type');
                  setActiveMenu(null);
                }}
              >
                <span className="explorer-dropdown-check">{sortColumn === 'type' ? '✓' : ''}</span>
                <span>Sort by Type</span>
              </div>
              {!isRoot && (
                <div
                  className="explorer-dropdown-item"
                  onClick={() => {
                    handleSort('usedIn');
                    setActiveMenu(null);
                  }}
                >
                  <span className="explorer-dropdown-check">{sortColumn === 'usedIn' ? '✓' : ''}</span>
                  <span>Sort by Used In</span>
                </div>
              )}
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
        {/* Left Folders Tree */}
        <div className="explorer-left-pane">
          <div className="explorer-pane-header">
            <span>Folders</span>
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
                return (
                  <div
                    key={cat.id}
                    className="explorer-tree-item"
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
                        <path d="M1 3h5l2 2h7v3H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                        <path d="M0 7h12l3 7H3L0 7z" fill="#fff2a8" stroke="#000000" strokeWidth="1" />
                      </svg>
                    ) : (
                      <svg className="explorer-tree-icon" width="16" height="16" viewBox="0 0 16 16">
                        <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                        <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
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

        {/* Splitter */}
        <div className="explorer-splitter" />

        {/* Right Content Pane */}
        <div className="explorer-right-pane">
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
                      title={isRoot ? 'Total Items' : 'Sort by Used In'}
                    >
                      <div className="explorer-th-content">
                        <span>{isRoot ? 'Contents' : 'Used In'}</span>
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
                              <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                              <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                            </svg>
                            <span className="explorer-item-name">{cat.name}</span>
                          </td>
                          <td className="explorer-td explorer-td--type">File Folder</td>
                          <td className="explorer-td explorer-td--usedin">{cat.items.length} skills</td>
                        </tr>
                      );
                    }

                    const skill = entry as SkillItem;
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
                        <td className="explorer-td explorer-td--type">{skill.type}</td>
                        <td className="explorer-td explorer-td--usedin">{skill.usedIn}</td>
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
                          <path d="M1 3h5l2 2h7v9H1V3z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                          <path d="M1 5h14v8H1V5z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
                        </svg>
                      ) : (
                        <svg className="explorer-row-icon" width="16" height="16" viewBox="0 0 16 16">
                          <path d="M3 1h7l4 4v10H3V1z" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                          <path d="M10 1v4h4" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                        </svg>
                      )}
                      <span className="explorer-list-item-name">{entry.name}</span>
                      <span className="explorer-list-item-type">
                        {isCat ? 'Folder' : (entry as SkillItem).type}
                      </span>
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
                            <path d="M2 6h10l4 4h14v18H2V6z" fill="#f6d04d" stroke="#000000" strokeWidth="1.2" />
                            <path d="M2 10h28v16H2V10z" fill="#ffeaa7" stroke="#000000" strokeWidth="1.2" />
                          </svg>
                        ) : (
                          <svg width="32" height="32" viewBox="0 0 32 32">
                            <rect x="6" y="2" width="20" height="28" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                            <path d="M18 2v8h8" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                            <rect x="10" y="14" width="12" height="2" fill="#000080" />
                            <rect x="10" y="18" width="12" height="2" fill="#808080" />
                            <rect x="10" y="22" width="8" height="2" fill="#808080" />
                          </svg>
                        )}
                      </div>
                      <span className="explorer-icon-label">{entry.name}</span>
                      <span className="explorer-icon-type">
                        {isCat ? '[Folder]' : (entry as SkillItem).type}
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
              Selected: {selectedItemObj.name} ({isRoot ? 'File Folder' : (selectedItemObj as SkillItem).type})
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
            </div>

            {/* Body */}
            <div className="explorer-props-body">
              {propertiesTab === 'general' ? (
                <div>
                  <div className="explorer-props-header">
                    <svg width="32" height="32" viewBox="0 0 32 32">
                      <rect x="6" y="2" width="20" height="28" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                      <path d="M18 2v8h8" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
                      <rect x="10" y="14" width="12" height="2" fill="#000080" />
                    </svg>
                    <div>
                      <div className="explorer-props-title">{propertiesSkill.name}</div>
                      <div style={{ color: '#555', fontSize: '10px' }}>{propertiesSkill.type}</div>
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
                    <span className="explorer-props-label">Location:</span>
                    <span className="explorer-props-value">
                      {currentCategory.path}\{propertiesSkill.name}
                    </span>
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Status:</span>
                    <span className="explorer-props-value">Verified Practical Experience</span>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    Application in Portfolio Projects & Internships:
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Applied In:</span>
                    <span className="explorer-props-value">{propertiesSkill.usedIn}</span>
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Verification:</span>
                    <span className="explorer-props-value">
                      Tested across active source repositories, model evaluations, and data pipelines.
                    </span>
                  </div>
                  <div className="explorer-props-row">
                    <span className="explorer-props-label">Author:</span>
                    <span className="explorer-props-value">Logesh N A</span>
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
                This utility displays verified technical competencies organized into five categories:
                Languages, AI & Machine Learning, Deep Learning & Computer Vision, NLP, and Libraries & Tools.
              </p>
              <p>
                Supports authentic Windows Explorer navigation: Back, Forward, Up to Root, Address bar path input, Details, List, and Large Icons view modes.
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

export default TechStacksPage;
