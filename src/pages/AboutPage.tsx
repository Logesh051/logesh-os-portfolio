import React from 'react';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      {/* 1. Page Heading and Introduction */}
      <div className="about-page__header">
        <h1 className="about-page__title">Hey, I'm Logesh!</h1>
        <p className="about-page__subtitle">
          AI &amp; ML Student | Creative Thinker | Curious Learner
        </p>
      </div>

      <hr className="about-page__hr" />

      {/* 2. Personal Biography */}
      <div className="about-page__section" aria-label="Personal Biography">
        <p className="about-page__p">
          I'm an Artificial Intelligence and Machine Learning student at Saveetha Engineering College, Chennai. I enjoy exploring ideas, understanding how things work, and turning what I learn into something practical.
        </p>
        <p className="about-page__p">
          My curiosity about AI comes from wanting to understand how machines learn, make decisions, and perform tasks that seem human-like. I'm exploring machine learning, data science, analytics, and generative AI through hands-on learning and projects.
        </p>
        <p className="about-page__p">
          Beyond technology, I enjoy photography, videography, content creation, Hollywood films, web series, and anime. I like staying organised, preserving memories, working with others, and finding creative ways to express my ideas.
        </p>
        <p className="about-page__p">
          I learn best by experimenting, building, and learning from the process. I'm always looking for opportunities to improve my skills and put them to practical use.
        </p>
        <p className="about-page__closing">
          Still learning. Still experimenting. Always curious about what's possible.
        </p>
      </div>

      <hr className="about-page__hr" />

      {/* 3. Education Section */}
      <div className="about-page__section" aria-label="Education">
        <h2 className="about-page__heading">Education</h2>
        <p className="about-page__p">
          B.Tech in Artificial Intelligence and Machine Learning<br />
          Saveetha Engineering College, Chennai<br />
          2023–2027 (Expected)<br />
          Cumulative GPA: 7.8 / 10
        </p>
      </div>

      <hr className="about-page__hr" />

      {/* 4. Connect With Me Section */}
      <div className="about-page__section" aria-label="Connect With Me">
        <h2 className="about-page__heading">Connect With Me</h2>
        <ul className="about-page__link-list">
          <li>
            GitHub:{' '}
            <a
              href="https://github.com/Logesh051"
              target="_blank"
              rel="noopener noreferrer"
              className="about-page__link"
            >
              https://github.com/Logesh051
            </a>
          </li>
          <li>
            LinkedIn:{' '}
            <a
              href="https://linkedin.com/in/logesh-na"
              target="_blank"
              rel="noopener noreferrer"
              className="about-page__link"
            >
              https://linkedin.com/in/logesh-na
            </a>
          </li>
          <li>
            Email:{' '}
            <a
              href="mailto:logeshna5@gmail.com"
              className="about-page__link"
            >
              logeshna5@gmail.com
            </a>
          </li>
        </ul>
      </div>

      <hr className="about-page__hr" />

      {/* 5. Resume Section - Authentic Classic HTML Fieldset / Group Box */}
      <div className="about-page__section" aria-label="Resume">
        <fieldset className="about-page__fieldset">
          <legend className="about-page__legend">Curriculum Vitae / Resume</legend>
          <p className="about-page__resume-desc">
            You can view or download my resume in PDF format below.
          </p>
          <div className="about-page__resume-actions">
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="about-page__btn"
            >
              View My Resume
            </a>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download="Logesh_NA_Resume.pdf"
              className="about-page__btn"
            >
              Download My Resume
            </a>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default AboutPage;
