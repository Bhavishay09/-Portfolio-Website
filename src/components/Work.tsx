import { useState, useRef, useEffect, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { getAssetPath } from "../utils/assets";

const projects = [
  {
    num: "01",
    title: "Python Automation & AI Pipeline",
    category: "Python / Backend Automation",
    tools: "Python, AsyncIO, REST APIs, Automation Scripts",
    image: getAssetPath("images/project-1.png"),
    link: "https://github.com/bhavishay09",
  },
  {
    num: "02",
    title: "Java Core Enterprise Engine",
    category: "Java / OOP Architecture",
    tools: "Java, Multithreading, OOP Principles, Data Pipelines",
    image: getAssetPath("images/project-2.png"),
    link: "https://github.com/bhavishay09",
  },
  {
    num: "03",
    title: "Ultra-Smooth Responsive Web UI",
    category: "Frontend Web Engineering",
    tools: "HTML5, Modern CSS3, Responsive Design, Micro-animations",
    image: getAssetPath("images/project-3.png"),
    link: "https://github.com/bhavishay09",
  },
  {
    num: "04",
    title: "Algorithm & DSA Visualizer",
    category: "Algorithms & Logic",
    tools: "Java, Python, Graph & Sorting Algorithms, Canvas",
    image: getAssetPath("images/project-4.png"),
    link: "https://github.com/bhavishay09",
  },
  {
    num: "05",
    title: "Full-Stack Data Platform",
    category: "Full Stack Development",
    tools: "Python, React, MySQL, REST Services, Clean UI",
    image: getAssetPath("images/project-5.png"),
    link: "https://github.com/bhavishay09",
  },
  {
    num: "06",
    title: "Interactive 3D Portfolio Experience",
    category: "Creative Web Graphics",
    tools: "React, Three.js, Rapier Physics, Smooth Scrolling",
    image: getAssetPath("images/project-6.png"),
    link: "https://github.com/bhavishay09",
  },
];

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeProject, setActiveProject] = useState(1);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Check scroll bounds and active visible card
  const checkScrollBounds = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cards = el.querySelectorAll<HTMLElement>(".work-box");
    if (cards.length > 0) {
      const containerCenter = scrollLeft + clientWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(containerCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveProject(closestIdx + 1);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    checkScrollBounds();
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);

    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [checkScrollBounds]);

  // Global mousemove and mouseup listeners for continuous drag
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const el = containerRef.current;
      if (!el) return;
      const x = e.pageX - el.offsetLeft;
      const walk = x - startXRef.current;
      dragDistanceRef.current = Math.abs(walk);
      el.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleGlobalMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      containerRef.current?.classList.remove("is-dragging");
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const targetScrollLeftRef = useRef<number | null>(null);

  // Arrow button navigation
  const scroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".work-box");
    const scrollAmount = card ? card.offsetWidth + 32 : 480;
    const maxScroll = el.scrollWidth - el.clientWidth;

    const base =
      targetScrollLeftRef.current !== null &&
      Math.abs(targetScrollLeftRef.current - el.scrollLeft) < scrollAmount * 2
        ? targetScrollLeftRef.current
        : el.scrollLeft;

    let target = direction === "right" ? base + scrollAmount : base - scrollAmount;
    target = Math.max(0, Math.min(maxScroll, target));
    targetScrollLeftRef.current = target;

    el.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  // Mouse drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    el.classList.add("is-dragging");
  };

  // Prevent link click when dragging
  const handleCardClick = (e: React.MouseEvent) => {
    if (dragDistanceRef.current > 6) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        dragDistanceRef.current = 0;
      }, 50);
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            Featured <span>Projects</span>
          </h2>
          <div className="carousel-controls">
            <span className="carousel-counter">
              <span className="carousel-counter-current">
                {String(activeProject).padStart(2, "0")}
              </span>
              <span className="carousel-counter-divider"> / </span>
              <span className="carousel-counter-total">
                {String(projects.length).padStart(2, "0")}
              </span>
            </span>
            <div className="carousel-buttons">
              <button
                type="button"
                className={`carousel-btn prev-btn ${!canScrollLeft ? "disabled" : ""}`}
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous projects"
                data-cursor="disable"
              >
                <MdChevronLeft />
              </button>
              <button
                type="button"
                className={`carousel-btn next-btn ${!canScrollRight ? "disabled" : ""}`}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Next projects"
                data-cursor="disable"
              >
                <MdChevronRight />
              </button>
            </div>
          </div>
        </div>

        <div
          className="carousel-viewport"
          ref={containerRef}
          onMouseDown={handleMouseDown}
        >
          <div className="work-flex">
            {projects.map((project, index) => (
              <div
                className="work-box"
                key={index}
                onClickCapture={handleCardClick}
              >
                <div className="work-info">
                  <div className="work-title">
                    <h3>{project.num}</h3>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-github-link"
                    data-cursor="disable"
                    onClick={handleCardClick}
                  >
                    View on GitHub &rarr;
                  </a>
                </div>
                <WorkImage image={project.image} alt={project.title} />
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-indicator-bar">
          <div
            className="carousel-indicator-progress"
            style={{
              width: `${(activeProject / projects.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Work;
