import React, { useState } from 'react';
import './ContactPage.css';

export interface ContactData {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  education: string;
  githubUrl: string;
  githubLabel: string;
  linkedinUrl: string;
  linkedinLabel: string;
}

export const VERIFIED_CONTACT: ContactData = {
  fullName: 'Logesh N A',
  firstName: 'Logesh',
  lastName: 'N A',
  email: 'logeshna5@gmail.com',
  location: 'Chennai, Tamil Nadu, India',
  education: 'B.Tech Artificial Intelligence and Machine Learning, Saveetha Engineering College, expected 2027',
  githubUrl: 'https://github.com/Logesh051',
  githubLabel: 'github.com/Logesh051',
  linkedinUrl: 'https://linkedin.com/in/logesh-na',
  linkedinLabel: 'linkedin.com/in/logesh-na',
};

type MenuKey = 'file' | 'edit' | 'view' | 'tools' | 'help' | null;
type PropertiesTab = 'general' | 'personal' | 'internet';

const ContactPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activePropTab, setActivePropTab] = useState<PropertiesTab>('general');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Composer fields
  const [mailSubject, setMailSubject] = useState('');
  const [mailBody, setMailBody] = useState('');

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage(null);
    }, 3500);
  };

  const handleCopyDetails = () => {
    const text = `Contact Information:
Full Name: ${VERIFIED_CONTACT.fullName}
Email: ${VERIFIED_CONTACT.email}
Location: ${VERIFIED_CONTACT.location}
Education: ${VERIFIED_CONTACT.education}
GitHub: ${VERIFIED_CONTACT.githubUrl}
LinkedIn: ${VERIFIED_CONTACT.linkedinUrl}`;

    navigator.clipboard?.writeText(text);
    showNotification('Contact details copied to clipboard');
    setActiveMenu(null);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(VERIFIED_CONTACT.email);
    showNotification(`Copied ${VERIFIED_CONTACT.email}`);
    setActiveMenu(null);
  };

  const handleSendMail = () => {
    const mailtoUrl = `mailto:${VERIFIED_CONTACT.email}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailtoUrl;
    showNotification('Opening default email client...');
    setIsComposerOpen(false);
  };

  return (
    <div className="wab-app" onClick={() => activeMenu && setActiveMenu(null)}>
      {/* 1. Address Book Menu Bar */}
      <div className="wab-menubar" onClick={(e) => e.stopPropagation()}>
        <div className="wab-menu-item">
          <button
            className={`wab-menu-btn ${activeMenu === 'file' ? 'wab-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'file' ? null : 'file'))}
          >
            <u>F</u>ile
          </button>
          {activeMenu === 'file' && (
            <div className="wab-dropdown win-raised">
              <div
                className="wab-dropdown-item"
                onClick={() => {
                  setIsComposerOpen(true);
                  setActiveMenu(null);
                }}
              >
                <span>New Message...</span>
                <span className="wab-dropdown-shortcut">Ctrl+M</span>
              </div>
              <div
                className="wab-dropdown-item"
                onClick={() => {
                  setIsPropertiesOpen(true);
                  setActiveMenu(null);
                }}
              >
                <span>Properties</span>
                <span className="wab-dropdown-shortcut">Alt+Enter</span>
              </div>
              <div className="wab-dropdown-separator" />
              <div
                className="wab-dropdown-item"
                onClick={() => {
                  window.open(`${import.meta.env.BASE_URL}resume.pdf`, '_blank');
                  setActiveMenu(null);
                }}
              >
                <span>View Resume (PDF)</span>
              </div>
            </div>
          )}
        </div>

        <div className="wab-menu-item">
          <button
            className={`wab-menu-btn ${activeMenu === 'edit' ? 'wab-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'edit' ? null : 'edit'))}
          >
            <u>E</u>dit
          </button>
          {activeMenu === 'edit' && (
            <div className="wab-dropdown win-raised">
              <div className="wab-dropdown-item" onClick={handleCopyDetails}>
                <span>Copy All Details</span>
                <span className="wab-dropdown-shortcut">Ctrl+C</span>
              </div>
              <div className="wab-dropdown-item" onClick={handleCopyEmail}>
                <span>Copy Email Address</span>
              </div>
            </div>
          )}
        </div>

        <div className="wab-menu-item">
          <button
            className={`wab-menu-btn ${activeMenu === 'view' ? 'wab-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'view' ? null : 'view'))}
          >
            <u>V</u>iew
          </button>
          {activeMenu === 'view' && (
            <div className="wab-dropdown win-raised">
              <div className="wab-dropdown-item wab-dropdown-item--checked">
                <span className="wab-dropdown-check">✓</span>
                <span>Toolbar</span>
              </div>
              <div className="wab-dropdown-item wab-dropdown-item--checked">
                <span className="wab-dropdown-check">✓</span>
                <span>Status Bar</span>
              </div>
              <div className="wab-dropdown-separator" />
              <div className="wab-dropdown-item wab-dropdown-item--checked">
                <span className="wab-dropdown-check">✓</span>
                <span>Details View</span>
              </div>
            </div>
          )}
        </div>

        <div className="wab-menu-item">
          <button
            className={`wab-menu-btn ${activeMenu === 'tools' ? 'wab-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'tools' ? null : 'tools'))}
          >
            <u>T</u>ools
          </button>
          {activeMenu === 'tools' && (
            <div className="wab-dropdown win-raised">
              <div
                className="wab-dropdown-item"
                onClick={() => {
                  window.location.href = `mailto:${VERIFIED_CONTACT.email}`;
                  setActiveMenu(null);
                }}
              >
                <span>Send Mail ({VERIFIED_CONTACT.email})</span>
              </div>
              <div className="wab-dropdown-separator" />
              <div
                className="wab-dropdown-item"
                onClick={() => {
                  window.open(VERIFIED_CONTACT.githubUrl, '_blank');
                  setActiveMenu(null);
                }}
              >
                <span>Open GitHub Profile</span>
              </div>
              <div
                className="wab-dropdown-item"
                onClick={() => {
                  window.open(VERIFIED_CONTACT.linkedinUrl, '_blank');
                  setActiveMenu(null);
                }}
              >
                <span>Open LinkedIn Profile</span>
              </div>
            </div>
          )}
        </div>

        <div className="wab-menu-item">
          <button
            className={`wab-menu-btn ${activeMenu === 'help' ? 'wab-menu-btn--active' : ''}`}
            onClick={() => setActiveMenu((prev) => (prev === 'help' ? null : 'help'))}
          >
            <u>H</u>elp
          </button>
          {activeMenu === 'help' && (
            <div className="wab-dropdown win-raised">
              <div
                className="wab-dropdown-item"
                onClick={() => {
                  setIsHelpOpen(true);
                  setActiveMenu(null);
                }}
              >
                <span>About Address Book...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Address Book Toolbar */}
      <div className="wab-toolbar">
        <div className="wab-toolbar-group">
          <button
            className="wab-tool-btn win-raised"
            title="Create new message to Logesh N A"
            onClick={() => setIsComposerOpen(true)}
          >
            <svg width="16" height="14" viewBox="0 0 16 14" className="wab-tool-icon">
              <rect x="1" y="1" width="14" height="11" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <path d="M1 2l7 6 7-6" stroke="#000080" strokeWidth="1.2" fill="none" />
              <polygon points="12,1 15,1 15,4" fill="#ff0000" />
            </svg>
            <span className="wab-tool-label">New Message</span>
          </button>

          <button
            className="wab-tool-btn win-raised"
            title="View contact properties"
            onClick={() => setIsPropertiesOpen(true)}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" className="wab-tool-icon">
              <rect x="2" y="2" width="12" height="12" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <rect x="4" y="4" width="8" height="2" fill="#000080" />
              <line x1="4" y1="8" x2="12" y2="8" stroke="#808080" strokeWidth="1" />
              <line x1="4" y1="10" x2="12" y2="10" stroke="#808080" strokeWidth="1" />
              <line x1="4" y1="12" x2="9" y2="12" stroke="#808080" strokeWidth="1" />
            </svg>
            <span className="wab-tool-label">Properties</span>
          </button>

          <button
            className="wab-tool-btn win-raised"
            title="Copy contact information"
            onClick={handleCopyDetails}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" className="wab-tool-icon">
              <rect x="2" y="2" width="7" height="9" fill="#ffffff" stroke="#000000" strokeWidth="1" />
              <rect x="6" y="5" width="7" height="9" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            </svg>
            <span className="wab-tool-label">Copy</span>
          </button>

          <div className="wab-tool-separator" />

          <button
            className="wab-tool-btn win-raised"
            title="Delete (disabled)"
            disabled
          >
            <svg width="14" height="14" viewBox="0 0 16 16" className="wab-tool-icon">
              <line x1="3" y1="3" x2="13" y2="13" stroke="#808080" strokeWidth="1.5" />
              <line x1="13" y1="3" x2="3" y2="13" stroke="#808080" strokeWidth="1.5" />
            </svg>
            <span className="wab-tool-label">Delete</span>
          </button>
        </div>

        {/* Address Path */}
        <div className="wab-address-bar">
          <span className="wab-address-label">Address:</span>
          <div className="wab-address-field win-sunken">
            <svg width="14" height="14" viewBox="0 0 16 16" className="wab-address-icon">
              <rect x="1" y="2" width="14" height="12" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
              <rect x="3" y="4" width="10" height="8" fill="#ffffff" stroke="#808080" strokeWidth="1" />
              <circle cx="6" cy="7" r="1.5" fill="#000080" />
              <path d="M4 11c0-1.2 1-2 2-2s2 .8 2 2" stroke="#000080" strokeWidth="0.8" fill="none" />
              <line x1="9" y1="6" x2="12" y2="6" stroke="#000000" strokeWidth="0.8" />
              <line x1="9" y1="8" x2="12" y2="8" stroke="#000000" strokeWidth="0.8" />
            </svg>
            <span className="wab-address-text">
              C:\WINDOWS\Application Data\Microsoft\Address Book\Logesh.wab
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Address Book Split Layout */}
      <div className="wab-body">
        {/* Left Pane: Contacts List */}
        <div className="wab-left-pane">
          <div className="wab-pane-header">
            <span>Contacts</span>
          </div>
          <div className="wab-contacts-list win-sunken" role="listbox" aria-label="Address Book Contact List">
            {/* Tree Folder Root */}
            <div className="wab-tree-root">
              <span className="wab-tree-toggle">-</span>
              <svg width="16" height="14" viewBox="0 0 16 14" className="wab-folder-icon">
                <path d="M1 2h5l2 2h7v9H1V2z" fill="#f6d04d" stroke="#000000" strokeWidth="1" />
                <path d="M1 4h14v8H1V4z" fill="#ffeaa7" stroke="#000000" strokeWidth="1" />
              </svg>
              <span className="wab-tree-root-label">Main Identity's Contacts</span>
            </div>

            {/* Contact Entry */}
            <div className="wab-contact-items">
              <div
                className="wab-contact-row wab-contact-row--selected"
                role="option"
                aria-selected="true"
                tabIndex={0}
              >
                <span className="wab-tree-connector">└─</span>
                <svg width="14" height="14" viewBox="0 0 16 16" className="wab-contact-icon">
                  <rect x="2" y="2" width="12" height="12" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                  <circle cx="8" cy="6" r="2.5" fill="#000080" />
                  <path d="M4 13c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" fill="#000080" />
                </svg>
                <span className="wab-contact-name">{VERIFIED_CONTACT.fullName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Splitter */}
        <div className="wab-splitter" />

        {/* Right Pane: Contact Details / Property Sheet */}
        <div className="wab-right-pane">
          <div className="wab-details-scroll win-sunken" role="region" aria-label="Contact Details View">
            {/* Contact Header */}
            <div className="wab-details-header">
              <div className="wab-details-card-icon">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <rect x="2" y="4" width="28" height="24" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                  <rect x="5" y="7" width="22" height="4" fill="#000080" />
                  <circle cx="10" cy="18" r="3.5" fill="#000080" />
                  <path d="M5 26c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" fill="#000080" />
                  <line x1="18" y1="16" x2="26" y2="16" stroke="#000000" strokeWidth="1.5" />
                  <line x1="18" y1="20" x2="26" y2="20" stroke="#808080" strokeWidth="1.2" />
                  <line x1="18" y1="24" x2="24" y2="24" stroke="#808080" strokeWidth="1.2" />
                </svg>
              </div>
              <div className="wab-details-title-group">
                <h1 className="wab-details-name">{VERIFIED_CONTACT.fullName}</h1>
                <p className="wab-details-role">
                  B.Tech Artificial Intelligence &amp; Machine Learning · Saveetha Engineering College
                </p>
              </div>
            </div>

            {/* Section 1: Personal Information Group */}
            <fieldset className="wab-groupbox">
              <legend className="wab-groupbox-legend">Personal Information</legend>
              <table className="wab-table">
                <tbody>
                  <tr>
                    <td className="wab-label-col">Full Name:</td>
                    <td className="wab-value-col">{VERIFIED_CONTACT.fullName}</td>
                  </tr>
                  <tr>
                    <td className="wab-label-col">Location:</td>
                    <td className="wab-value-col">{VERIFIED_CONTACT.location}</td>
                  </tr>
                  <tr>
                    <td className="wab-label-col">Education:</td>
                    <td className="wab-value-col">{VERIFIED_CONTACT.education}</td>
                  </tr>
                </tbody>
              </table>
            </fieldset>

            {/* Section 2: Electronic Mail & Internet Group */}
            <fieldset className="wab-groupbox">
              <legend className="wab-groupbox-legend">Internet &amp; Electronic Mail</legend>
              <table className="wab-table">
                <tbody>
                  <tr>
                    <td className="wab-label-col">E-Mail Address:</td>
                    <td className="wab-value-col">
                      <a
                        href={`mailto:${VERIFIED_CONTACT.email}`}
                        className="wab-hyperlink"
                        title="Click to compose an email"
                      >
                        {VERIFIED_CONTACT.email}
                      </a>
                      <button
                        className="wab-inline-btn win-raised"
                        onClick={() => setIsComposerOpen(true)}
                        title="Open Quick Mail Composer"
                      >
                        Compose
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="wab-label-col">GitHub:</td>
                    <td className="wab-value-col">
                      <a
                        href={VERIFIED_CONTACT.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wab-hyperlink"
                        title="Open GitHub profile"
                      >
                        {VERIFIED_CONTACT.githubLabel}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="wab-label-col">LinkedIn:</td>
                    <td className="wab-value-col">
                      <a
                        href={VERIFIED_CONTACT.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wab-hyperlink"
                        title="Open LinkedIn profile"
                      >
                        {VERIFIED_CONTACT.linkedinLabel}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>

            {/* Actions Row at bottom of details */}
            <div className="wab-actions-row">
              <button
                className="wab-btn win-raised"
                onClick={() => setIsComposerOpen(true)}
              >
                New Message...
              </button>
              <button
                className="wab-btn win-raised"
                onClick={handleCopyDetails}
              >
                Copy Details
              </button>
              <button
                className="wab-btn win-raised"
                onClick={() => setIsPropertiesOpen(true)}
              >
                Properties...
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Address Book Status Bar */}
      <div className="wab-statusbar">
        <div className="wab-status-pane wab-status-pane--count win-sunken">
          <span>1 Contact(s)</span>
        </div>
        <div className="wab-status-pane wab-status-pane--selected win-sunken">
          {statusMessage ? (
            <span className="wab-status-notification">{statusMessage}</span>
          ) : (
            <span>Selected: {VERIFIED_CONTACT.fullName} ({VERIFIED_CONTACT.email})</span>
          )}
        </div>
        <div className="wab-status-pane wab-status-pane--zone win-sunken">
          <svg width="12" height="12" viewBox="0 0 16 16" className="wab-zone-icon">
            <rect x="2" y="3" width="12" height="8" fill="#ffffff" stroke="#000000" strokeWidth="1" />
            <rect x="4" y="5" width="8" height="4" fill="#000080" />
            <path d="M5 12h6v2H5z" fill="#808080" />
            <line x1="3" y1="14" x2="13" y2="14" stroke="#000000" strokeWidth="1" />
          </svg>
          <span>Windows Address Book</span>
        </div>
      </div>

      {/* 5. Quick Mail — Outlook Express Inspired Message Composer Modal */}
      {isComposerOpen && (
        <div className="wab-modal-overlay" onClick={() => setIsComposerOpen(false)}>
          <div
            className="wab-composer-window win-raised"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="New Message - Outlook Express"
          >
            {/* Composer Title Bar */}
            <div className="wab-composer-titlebar">
              <div className="wab-composer-title-left">
                <svg width="14" height="12" viewBox="0 0 16 14">
                  <rect x="1" y="1" width="14" height="11" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                  <path d="M1 2l7 6 7-6" stroke="#000080" strokeWidth="1.2" fill="none" />
                </svg>
                <span>New Message: {VERIFIED_CONTACT.fullName}</span>
              </div>
              <button
                className="wab-composer-close-btn win-raised"
                onClick={() => setIsComposerOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Composer Menu Bar */}
            <div className="wab-composer-menubar">
              <span><u>F</u>ile</span>
              <span><u>E</u>dit</span>
              <span><u>V</u>iew</span>
              <span><u>I</u>nsert</span>
              <span><u>F</u>ormat</span>
              <span><u>T</u>ools</span>
              <span><u>M</u>essage</span>
              <span><u>H</u>elp</span>
            </div>

            {/* Composer Toolbar */}
            <div className="wab-composer-toolbar">
              <button
                className="wab-composer-tool-btn win-raised"
                onClick={handleSendMail}
                title="Send message via default mail client"
              >
                <svg width="16" height="14" viewBox="0 0 16 14">
                  <rect x="1" y="1" width="14" height="11" fill="#ffffff" stroke="#000000" strokeWidth="1" />
                  <path d="M1 2l7 6 7-6" stroke="#000080" strokeWidth="1.2" fill="none" />
                  <polygon points="11,1 15,1 15,5" fill="#008000" />
                </svg>
                <span>Send</span>
              </button>

              <div className="wab-tool-separator" />

              <button
                className="wab-composer-tool-btn win-raised"
                onClick={() => {
                  setMailSubject('');
                  setMailBody('');
                }}
                title="Clear fields"
              >
                <span>Clear</span>
              </button>

              <button
                className="wab-composer-tool-btn win-raised"
                onClick={() => setIsComposerOpen(false)}
                title="Cancel and close"
              >
                <span>Cancel</span>
              </button>
            </div>

            {/* Composer Header Fields */}
            <div className="wab-composer-fields">
              <div className="wab-field-row">
                <label className="wab-field-label">To:</label>
                <div className="wab-field-input-box win-sunken">
                  <span className="wab-field-pill">
                    {VERIFIED_CONTACT.fullName} &lt;{VERIFIED_CONTACT.email}&gt;
                  </span>
                </div>
              </div>

              <div className="wab-field-row">
                <label htmlFor="comp-subject" className="wab-field-label">Subject:</label>
                <input
                  id="comp-subject"
                  type="text"
                  className="wab-field-input win-sunken"
                  placeholder="e.g. Internship Inquiry / Opportunity"
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            {/* Notice / Handoff Explanation */}
            <div className="wab-composer-notice">
              <svg width="12" height="12" viewBox="0 0 16 16" className="wab-notice-icon">
                <circle cx="8" cy="8" r="7" fill="#000080" />
                <rect x="7" y="3" width="2" height="2" fill="#ffffff" />
                <rect x="7" y="6" width="2" height="6" fill="#ffffff" />
              </svg>
              <span>
                Clicking <strong>Send</strong> formats a properly encoded <code>mailto:</code> request and hands off the message to your system's configured email application (e.g. Outlook, Thunderbird, Mail, or default webmail handler).
              </span>
            </div>

            {/* Composer Message Body */}
            <div className="wab-composer-body">
              <textarea
                className="wab-composer-textarea win-sunken"
                rows={7}
                placeholder="Type your message here..."
                value={mailBody}
                onChange={(e) => setMailBody(e.target.value)}
              />
            </div>

            {/* Composer Footer Actions */}
            <div className="wab-composer-footer">
              <button
                className="wab-btn win-raised"
                onClick={handleSendMail}
              >
                Send Message
              </button>
              <button
                className="wab-btn win-raised"
                onClick={() => setIsComposerOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Contact Properties Modal Dialog */}
      {isPropertiesOpen && (
        <div className="wab-modal-overlay" onClick={() => setIsPropertiesOpen(false)}>
          <div
            className="wab-props-dialog win-raised"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Properties: Logesh N A"
          >
            {/* Title Bar */}
            <div className="wab-props-titlebar">
              <span>{VERIFIED_CONTACT.fullName} Properties</span>
              <button
                className="wab-composer-close-btn win-raised"
                onClick={() => setIsPropertiesOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Tab Strip */}
            <div className="wab-props-tabs">
              <button
                className={`wab-props-tab ${activePropTab === 'general' ? 'wab-props-tab--active' : ''}`}
                onClick={() => setActivePropTab('general')}
              >
                General
              </button>
              <button
                className={`wab-props-tab ${activePropTab === 'personal' ? 'wab-props-tab--active' : ''}`}
                onClick={() => setActivePropTab('personal')}
              >
                Personal
              </button>
              <button
                className={`wab-props-tab ${activePropTab === 'internet' ? 'wab-props-tab--active' : ''}`}
                onClick={() => setActivePropTab('internet')}
              >
                Internet
              </button>
            </div>

            {/* Tab Body */}
            <div className="wab-props-tab-body">
              {activePropTab === 'general' && (
                <div className="wab-props-tab-content">
                  <div className="wab-props-general-header">
                    <svg width="32" height="32" viewBox="0 0 32 32">
                      <rect x="2" y="4" width="28" height="24" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
                      <circle cx="16" cy="14" r="5" fill="#000080" />
                      <path d="M8 26c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="#000080" />
                    </svg>
                    <div>
                      <div className="wab-props-title-text">{VERIFIED_CONTACT.fullName}</div>
                      <div className="wab-props-sub-text">{VERIFIED_CONTACT.email}</div>
                    </div>
                  </div>
                  <hr className="wab-dialog-hr" />
                  <p>
                    <strong>Summary:</strong> Verified contact identity in Windows Address Book.
                  </p>
                  <p>
                    <strong>Primary E-Mail:</strong> {VERIFIED_CONTACT.email}
                  </p>
                  <p>
                    <strong>Residence:</strong> {VERIFIED_CONTACT.location}
                  </p>
                  <p>
                    <strong>Academic Program:</strong> {VERIFIED_CONTACT.education}
                  </p>
                </div>
              )}

              {activePropTab === 'personal' && (
                <div className="wab-props-tab-content">
                  <p>
                    <strong>First Name:</strong> {VERIFIED_CONTACT.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {VERIFIED_CONTACT.lastName}
                  </p>
                  <p>
                    <strong>Display Name:</strong> {VERIFIED_CONTACT.fullName}
                  </p>
                  <p>
                    <strong>Academic Institution:</strong> Saveetha Engineering College, Chennai
                  </p>
                  <p>
                    <strong>Degree Program:</strong> B.Tech in Artificial Intelligence &amp; Machine Learning
                  </p>
                  <p>
                    <strong>Expected Graduation:</strong> Class of 2027
                  </p>
                </div>
              )}

              {activePropTab === 'internet' && (
                <div className="wab-props-tab-content">
                  <p>
                    <strong>E-Mail Address:</strong>{' '}
                    <a href={`mailto:${VERIFIED_CONTACT.email}`} className="wab-hyperlink">
                      {VERIFIED_CONTACT.email}
                    </a>
                  </p>
                  <p>
                    <strong>GitHub Repository Profile:</strong>{' '}
                    <a
                      href={VERIFIED_CONTACT.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wab-hyperlink"
                    >
                      {VERIFIED_CONTACT.githubLabel}
                    </a>
                  </p>
                  <p>
                    <strong>LinkedIn Professional Network:</strong>{' '}
                    <a
                      href={VERIFIED_CONTACT.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wab-hyperlink"
                    >
                      {VERIFIED_CONTACT.linkedinLabel}
                    </a>
                  </p>
                </div>
              )}
            </div>

            {/* Dialog Footer Actions */}
            <div className="wab-props-footer">
              <button
                className="wab-btn win-raised"
                onClick={() => setIsPropertiesOpen(false)}
              >
                OK
              </button>
              <button
                className="wab-btn win-raised"
                onClick={() => setIsPropertiesOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Help Modal Dialog */}
      {isHelpOpen && (
        <div className="wab-modal-overlay" onClick={() => setIsHelpOpen(false)}>
          <div
            className="wab-props-dialog win-raised"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="About Windows Address Book"
          >
            <div className="wab-props-titlebar">
              <span>About Windows Address Book</span>
              <button
                className="wab-composer-close-btn win-raised"
                onClick={() => setIsHelpOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="wab-props-tab-content" style={{ padding: '16px' }}>
              <p>
                <strong>Windows Address Book (WAB.EXE)</strong>
              </p>
              <p>
                Version 5.0 — LOGESH_OS Personal Edition
              </p>
              <p>
                Provides verified contact channels and direct email composition for Logesh N A.
              </p>
              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="wab-btn win-raised"
                  onClick={() => setIsHelpOpen(false)}
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

export default ContactPage;
