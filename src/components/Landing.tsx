import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              BHAVISHAY
              <br />
              <span>KUMAR</span>
            </h1>
            <div className="landing-sub-badges">
              <span className="skill-pill">Python</span>
              <span className="skill-pill">Java</span>
              <span className="skill-pill">HTML &amp; CSS</span>
            </div>
          </div>
          <div className="landing-info">
            <h3>A Passionate</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Software</div>
              <div className="landing-h2-2">Full-Stack</div>
            </h2>
            <h2 className="landing-h2-developer">
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Engineer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
