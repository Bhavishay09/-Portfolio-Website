export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private elements: HTMLElement[] = [];
  private originals: string[] = [];

  constructor(target: any, options: any = {}) {
    let rawElements: HTMLElement[] = [];
    if (typeof target === "string") {
      rawElements = Array.from(document.querySelectorAll(target));
    } else if (Array.isArray(target)) {
      target.forEach((item) => {
        if (typeof item === "string") {
          rawElements.push(
            ...Array.from(document.querySelectorAll<HTMLElement>(item))
          );
        } else if (item instanceof HTMLElement) {
          rawElements.push(item);
        }
      });
    } else if (target instanceof HTMLElement) {
      rawElements = [target];
    } else if (target && target.length) {
      rawElements = Array.from(target);
    }

    this.elements = rawElements;
    const type = options.type || "chars,words,lines";
    const linesClass = options.linesClass || "";

    this.elements.forEach((el) => {
      this.originals.push(el.innerHTML);
      const text = el.innerText || el.textContent || "";
      el.innerHTML = "";

      const wordsArray = text.split(" ");
      wordsArray.forEach((w, wIdx) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.position = "relative";
        wordSpan.style.whiteSpace = "nowrap";

        if (type.includes("chars")) {
          for (let i = 0; i < w.length; i++) {
            const charSpan = document.createElement("span");
            charSpan.style.display = "inline-block";
            charSpan.style.position = "relative";
            charSpan.textContent = w[i];
            wordSpan.appendChild(charSpan);
            this.chars.push(charSpan);
          }
        } else {
          wordSpan.textContent = w;
        }

        if (linesClass) {
          wordSpan.classList.add(linesClass);
        }

        el.appendChild(wordSpan);
        this.words.push(wordSpan);

        if (wIdx < wordsArray.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });
      this.lines.push(el);
    });
  }

  revert() {
    this.elements.forEach((el, i) => {
      if (this.originals[i] !== undefined) {
        el.innerHTML = this.originals[i];
      }
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

export class ScrollSmoother {
  private static instance: ScrollSmoother | null = null;
  private isPaused = false;

  static create(_options: any = {}) {
    if (!ScrollSmoother.instance) {
      ScrollSmoother.instance = new ScrollSmoother();
    }
    return ScrollSmoother.instance;
  }

  static get() {
    return ScrollSmoother.instance;
  }

  static refresh(_safe?: boolean) {}

  scrollTop(val?: number) {
    if (val !== undefined) {
      window.scrollTo({ top: val, behavior: "instant" as ScrollBehavior });
    }
    return window.scrollY;
  }

  paused(state?: boolean) {
    if (state !== undefined) {
      this.isPaused = state;
      document.body.style.overflowY = state ? "hidden" : "auto";
    }
    return this.isPaused;
  }

  scrollTo(target: any, smooth = true, _position?: string) {
    let el: HTMLElement | null = null;
    if (typeof target === "string") {
      el = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      el = target;
    }
    if (el) {
      el.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
    }
  }
}
