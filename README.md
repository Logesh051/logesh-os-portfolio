# LOGESH_OS (Version 1.0)
**Classic Windows 95 Personal Portfolio Website for Logesh NA**

> B.Tech Artificial Intelligence and Machine Learning (Class of 2027)

A nostalgic, retro desktop portfolio modeled after the classic Windows 95 operating system. Features authentic grey beveled windows, textured blue wallpaper, a single maximized browser window with simulated filesystem paths, retro taskbar, functional Start menu, live system clock, and honest presentation of AIML projects and technical stacks.

---

## 💻 Visual & Interactive Features

- **Initial State**: Starts directly on the retro desktop (wallpaper, left-aligned icons, taskbar, clock) — zero welcome dialogs or forced boot animations.
- **Single Browser Window (Critical Requirement)**: Exactly one browser window is instantiated. Clicking any desktop icon (`About_Me.exe`, `TechStacks.exe`, `My_Projects.exe`, `Contact.exe`) navigates inside the same window.
- **Window Controls**:
  - **Minimize**: Hides the browser window, leaving the taskbar button active; clicking the taskbar button restores it.
  - **Maximize / Restore**: Starts maximized above the taskbar; clicking the maximize button toggles to a restored centered window state.
  - **Close**: Hides the browser window, returning to the clean desktop state.
- **Browser Toolbar & Routing**:
  - History-aware **Back (◀)** and **Forward (▶)** buttons.
  - Working **Refresh (↻)** button.
  - Simulated retro address bar (`C:\LOGESH_OS\ABOUT.HTML`, `TECHSTACKS.HTML`, `PROJECTS.HTML`, `PROJECTS\COGNIFOCUS.HTML`, `CONTACT.HTML`).
- **Desktop Icons**:
  1. `About_Me.exe` — Personal introduction, student profile, interests, and quick navigation.
  2. `TechStacks.exe` — Retro System Information interface categorizing skills by honest proficiency levels (*Used in projects*, *Comfortable with*, *Currently learning*).
  3. `My_Projects.exe` — File explorer interface with genuine projects (`CogniFocus`, `Predictive Modelling Experiments`, `Banking Multi-Agent System`), supporting deep drill-down detail views.
  4. `Contact.exe` — Address Book utility with quick copy email action and pre-filled mail client composer.
  5. `Camera.exe` — Interactive Version 2 placeholder modal dialog ("Coming Soon") with no unnecessary webcam permissions.
- **Start Menu**: Bottom-left Start button with vertical `LOGESH_OS` banner, direct section shortcuts, and functional Shut Down dialog.
- **Desktop Context Menu**: Right-click on desktop to Refresh, quick launch sections, or toggle wallpaper theme (Retro Blue, Classic Teal, Dark Navy) and titlebar style (Classic Grey or Windows 95 Navy).
- **Responsive & Accessible**: Fully functional on desktop, tablet, and mobile screens (tested with viewport down to 375px width).

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18+)
- npm

### Installation
From the project directory:
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
logesh-os/
├── index.html                  # HTML entry point with retro typography
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Desktop environment orchestrator
│   ├── App.css                 # Desktop wallpaper, grid, shutdown styles
│   ├── types.ts                # TypeScript interfaces & section path constants
│   ├── components/
│   │   ├── BrowserWindow.tsx   # Single browser application window
│   │   ├── BrowserWindow.css
│   │   ├── DesktopIcon.tsx     # Desktop executable icon
│   │   ├── DesktopIcon.css
│   │   ├── Taskbar.tsx         # Fixed bottom taskbar with live clock
│   │   ├── Taskbar.css
│   │   ├── StartMenu.tsx       # Classic Windows 95 Start menu
│   │   ├── StartMenu.css
│   │   ├── ContextMenu.tsx     # Desktop right-click context menu
│   │   ├── ContextMenu.css
│   │   ├── ComingSoonDialog.tsx# Camera.exe Version 2 preview dialog
│   │   ├── ComingSoonDialog.css
│   │   └── Icons.tsx           # Pixel-crisp retro SVG icons
│   ├── pages/
│   │   ├── AboutPage.tsx       # Student introduction & focus areas
│   │   ├── AboutPage.css
│   │   ├── TechStacksPage.tsx  # System Information / Control Panel
│   │   ├── TechStacksPage.css
│   │   ├── ProjectsPage.tsx    # File explorer & project details
│   │   ├── ProjectsPage.css
│   │   ├── ContactPage.tsx     # Address Book & Mail composer
│   │   └── ContactPage.css
│   ├── hooks/
│   │   └── useBrowserState.ts  # Single-window history & routing state machine
│   └── styles/
│       └── global.css          # Win95 beveled border styles, custom scrollbars
```

---

## 📝 Customization & Placeholders to Update

When ready to update with your personal verified links:
1. **Email**: In [ContactPage.tsx](file:///C:/Users/Logesh/.gemini/antigravity/scratch/logesh-os/src/pages/ContactPage.tsx#L8), replace `logesh@example.com` with your real email address.
2. **GitHub Profile**: In [AboutPage.tsx](file:///C:/Users/Logesh/.gemini/antigravity/scratch/logesh-os/src/pages/AboutPage.tsx#L88) and [ContactPage.tsx](file:///C:/Users/Logesh/.gemini/antigravity/scratch/logesh-os/src/pages/ContactPage.tsx#L48), replace `https://github.com/logeshna` with your GitHub profile URL.
3. **LinkedIn Profile**: In [AboutPage.tsx](file:///C:/Users/Logesh/.gemini/antigravity/scratch/logesh-os/src/pages/AboutPage.tsx#L96) and [ContactPage.tsx](file:///C:/Users/Logesh/.gemini/antigravity/scratch/logesh-os/src/pages/ContactPage.tsx#L60), replace `https://linkedin.com/in/logeshna` with your LinkedIn profile URL.
4. **Project GitHub Repositories**: In [ProjectsPage.tsx](file:///C:/Users/Logesh/.gemini/antigravity/scratch/logesh-os/src/pages/ProjectsPage.tsx#L23), add `githubUrl: "https://github.com/..."` to project items when repositories are published.
5. **Resume**: Place your PDF resume in `public/resume.pdf` and link it in `AboutPage.tsx` and `ContactPage.tsx`.
