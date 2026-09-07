import { SplitText } from "../../utils/gsapPlugins";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const TextProps = { type: "chars,lines", linesClass: "split-h2" };

  const landingTextSoftware = new SplitText(".landing-h2-1", TextProps);
  const landingTextDeveloper = new SplitText(".landing-h2-info", TextProps);
  const landingTextFullStack = new SplitText(".landing-h2-2", TextProps);
  const landingTextEngineer = new SplitText(".landing-h2-info-1", TextProps);

  // Immediately hide alternate text chars so they never bleed into primary text
  gsap.set(landingTextFullStack.chars, { opacity: 0, y: 50 });
  gsap.set(landingTextEngineer.chars, { opacity: 0, y: 50 });

  // Stagger entrance animation for "SOFTWARE" and "DEVELOPER"
  gsap.fromTo(
    [landingTextSoftware.chars, landingTextDeveloper.chars],
    { opacity: 0, y: 50, filter: "blur(5px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.02,
      delay: 0.4,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  LoopText(
    landingTextSoftware,
    landingTextDeveloper,
    landingTextFullStack,
    landingTextEngineer
  );
}

function LoopText(
  Text1Top: SplitText,
  Text1Bottom: SplitText,
  Text2Top: SplitText,
  Text2Bottom: SplitText
) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
  const displayDuration = 4.5;

  // Animate phrase 1 ("SOFTWARE DEVELOPER") out
  tl.to(
    [Text1Top.chars, Text1Bottom.chars],
    {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.02,
    },
    `+=${displayDuration}`
  )
  // Animate phrase 2 ("FULL-STACK ENGINEER") in
  .fromTo(
    [Text2Top.chars, Text2Bottom.chars],
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.02,
    },
    "-=0.1"
  )
  // Animate phrase 2 ("FULL-STACK ENGINEER") out
  .to(
    [Text2Top.chars, Text2Bottom.chars],
    {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.02,
    },
    `+=${displayDuration}`
  )
  // Animate phrase 1 ("SOFTWARE DEVELOPER") back in
  .fromTo(
    [Text1Top.chars, Text1Bottom.chars],
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.02,
    },
    "-=0.1"
  );
}
