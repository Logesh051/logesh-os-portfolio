import React, { useState } from 'react';
import {
  AboutIcon,
  TechStacksIcon,
  ProjectsIcon,
  ContactIcon,
  CameraIcon,
  SnakeIcon,
  BrowserIcon,
} from './Icons';
import type { TaskItem } from './Taskbar';
import './TaskManagerDialog.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tasks: TaskItem[];
  onSwitchTo: (taskId: string) => void;
  onEndTask: (taskId: string) => void;
  onNewTask: () => void;
}

const iconComponents = {
  about: AboutIcon,
  techstacks: TechStacksIcon,
  projects: ProjectsIcon,
  contact: ContactIcon,
  camera: CameraIcon,
  snake: SnakeIcon,
};

export const TaskManagerDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  tasks,
  onSwitchTo,
  onEndTask,
  onNewTask,
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(() => {
    return tasks.length > 0 ? tasks[0].id : null;
  });
  const [activeTab, setActiveTab] = useState<'applications' | 'processes'>('applications');

  if (!isOpen) return null;

  const currentSelected = selectedTaskId || (tasks.length > 0 ? tasks[0].id : null);

  const handleSwitch = () => {
    if (currentSelected) {
      onSwitchTo(currentSelected);
      onClose();
    }
  };

  const handleEnd = () => {
    if (currentSelected) {
      onEndTask(currentSelected);
      // Select next available task
      const remaining = tasks.filter(t => t.id !== currentSelected);
      setSelectedTaskId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  return (
    <div className="task-manager-overlay" onClick={onClose}>
      <div
        className="task-manager win-raised"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Windows Task Manager"
      >
        {/* Title Bar */}
        <div className="task-manager__titlebar">
          <div className="task-manager__titlebar-text">
            <span>Windows Task Manager</span>
          </div>
          <button
            className="task-manager__close-btn"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Tab Bar */}
        <div className="task-manager__tabs">
          <button
            className={`task-manager__tab ${activeTab === 'applications' ? 'task-manager__tab--active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            Applications ({tasks.length})
          </button>
          <button
            className={`task-manager__tab ${activeTab === 'processes' ? 'task-manager__tab--active' : ''}`}
            onClick={() => setActiveTab('processes')}
          >
            Processes
          </button>
        </div>

        {/* Tab Content */}
        <div className="task-manager__body">
          {activeTab === 'applications' ? (
            <div className="task-manager__task-list win-sunken">
              <div className="task-manager__list-header">
                <span className="task-manager__col-task">Task</span>
                <span className="task-manager__col-status">Status</span>
              </div>
              <div className="task-manager__list-content">
                {tasks.length === 0 ? (
                  <div className="task-manager__empty">No running applications.</div>
                ) : (
                  tasks.map(task => {
                    const IconComp = iconComponents[task.iconType] || BrowserIcon;
                    const isSelected = task.id === currentSelected;
                    return (
                      <div
                        key={task.id}
                        className={`task-manager__task-row ${isSelected ? 'task-manager__task-row--selected' : ''}`}
                        onClick={() => setSelectedTaskId(task.id)}
                        onDoubleClick={() => {
                          onSwitchTo(task.id);
                          onClose();
                        }}
                      >
                        <span className="task-manager__task-name">
                          <IconComp size={16} />
                          <span>{task.title}</span>
                        </span>
                        <span className="task-manager__task-status">Running</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <div className="task-manager__task-list win-sunken">
              <div className="task-manager__list-header">
                <span className="task-manager__col-task">Image Name</span>
                <span className="task-manager__col-status">Memory</span>
              </div>
              <div className="task-manager__list-content">
                <div className="task-manager__task-row">
                  <span className="task-manager__task-name">System</span>
                  <span className="task-manager__task-status">212 KB</span>
                </div>
                <div className="task-manager__task-row">
                  <span className="task-manager__task-name">Explorer.exe</span>
                  <span className="task-manager__task-status">3,840 KB</span>
                </div>
                <div className="task-manager__task-row">
                  <span className="task-manager__task-name">Snake.exe</span>
                  <span className="task-manager__task-status">1,480 KB</span>
                </div>
                <div className="task-manager__task-row">
                  <span className="task-manager__task-name">Portfolio.exe</span>
                  <span className="task-manager__task-status">4,120 KB</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="task-manager__footer">
          <div className="task-manager__buttons">
            <button
              className="task-manager__btn win-raised"
              onClick={handleEnd}
              disabled={!currentSelected || tasks.length === 0}
            >
              End Task
            </button>
            <button
              className="task-manager__btn win-raised"
              onClick={handleSwitch}
              disabled={!currentSelected || tasks.length === 0}
            >
              Switch To
            </button>
            <button
              className="task-manager__btn win-raised"
              onClick={() => {
                onNewTask();
                onClose();
              }}
            >
              New Task...
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="task-manager__statusbar">
          <div className="task-manager__status-cell">Processes: {tasks.length + 8}</div>
          <div className="task-manager__status-cell">CPU Usage: 2%</div>
          <div className="task-manager__status-cell">Mem Usage: 32 / 128 MB</div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerDialog;
