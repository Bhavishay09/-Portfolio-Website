import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanups: (() => void)[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      let mouseX = 25;
      let mouseY = 25;
      let currentX = 25;
      let currentY = 25;
      let animId: number;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 45 && x > 5 && y < 45 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      animId = requestAnimationFrame(updatePosition);

      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animId);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/bhavishay09"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub - @bhavishay09"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/bhavishay-kumar-48595333a/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn - Bhavishay Kumar"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a
            href="https://x.com/bk81919"
            target="_blank"
            rel="noopener noreferrer"
            title="X (Twitter) - @bk81919"
            aria-label="X (Twitter) Profile"
          >
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a
            href="https://www.instagram.com/bk78277/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram - @bk78277"
            aria-label="Instagram Profile"
          >
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="mailto:bhavishaykumar09@gmail.com" title="Contact for Resume">
        <HoverLinks text="CONTACT" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
