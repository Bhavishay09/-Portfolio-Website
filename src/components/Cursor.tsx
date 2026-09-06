import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!hover) {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement;
      if (!target) return;

      const rect = target.getBoundingClientRect();

      if (target.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.2, ease: "power2.out" });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (target.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]") as HTMLElement;
      if (!target) return;

      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
