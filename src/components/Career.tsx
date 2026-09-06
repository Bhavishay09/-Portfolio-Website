import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Core Programming &amp; Logic</h4>
                <h5>Python &amp; Java Architecture</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Mastered foundational computer science, object-oriented programming in Java, and Python automation. Built algorithmic problem solvers, modular CLI tools, and data structure engines.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend &amp; Web Engineering</h4>
                <h5>HTML5, CSS3 &amp; JavaScript</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Engineered responsive, accessible web interfaces utilizing semantic HTML5, modern CSS3 animations, and interactive client-side logic. Focused on performance, design fidelity, and fluid layouts.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack &amp; Project Builder</h4>
                <h5>GitHub: bhavishay09</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Developing end-to-end web applications and software tools combining Python &amp; Java backends with modern responsive interfaces. Actively building open-source projects on GitHub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
