/* eslint-disable react/prop-types --
   This is the only component in the codebase that takes props, and satisfying
   the rule would mean adding the `prop-types` package as a runtime dependency
   for dev-only validation. The prop contract is documented below instead. If
   POLISH-003 ever introduces TypeScript, delete this line. */
import { useEffect, useRef, useState } from "react";

// How far each direction travels before settling. The defaults reproduce the
// offsets the old framer-motion `initial` props used, so the animation reads
// the same to a sighted visitor; pass `distance` to override.
const OFFSET = {
  above: (distance) => ({ "--reveal-y": `-${distance}px` }),
  below: (distance) => ({ "--reveal-y": `${distance}px` }),
  left: (distance) => ({ "--reveal-x": `-${distance}px` }),
  right: (distance) => ({ "--reveal-x": `${distance}px` }),
  fade: () => ({}),
};

const DEFAULT_DISTANCE = {
  above: 40,
  below: 20,
  left: 100,
  right: 100,
  fade: 0,
};

/**
 * Scroll-triggered entry animation.
 *
 * Deliberately additive rather than subtractive: the element's base rendered
 * state is visible, and it is only offset and faded out once the inline script
 * in index.html has confirmed scripts are running. That keeps the content
 * readable in prerendered markup, with JavaScript disabled, and for anyone who
 * has asked for reduced motion — none of which framer-motion's inline
 * `initial={{ opacity: 0 }}` could do, because a CSS media query cannot
 * override an inline style. The rules live in src/index.css.
 *
 * Props:
 *   as        tag to render, default "div". Must not be a void element —
 *             wrap an <img> in a Reveal rather than rendering one as it.
 *   from      "above" | "below" | "left" | "right" | "fade", default "above".
 *   distance  travel in px, default per direction (see DEFAULT_DISTANCE).
 *   duration  transition length in seconds, default 0.5.
 *   delay     transition delay in seconds, default 0.
 * Any remaining props are spread onto the rendered element.
 *
 * The prose above is the contract; the typedef below is the same contract in a
 * form `yarn typecheck` can read. `as` is deliberately `any` — it is a
 * polymorphic tag, and narrowing it would make the `ref` below unassignable.
 *
 * @typedef {Object} RevealProps
 * @property {any} [as]
 * @property {"above" | "below" | "left" | "right" | "fade"} [from]
 * @property {number} [distance]
 * @property {number} [duration]
 * @property {number} [delay]
 * @property {string} [className]
 * @property {import("react").ReactNode} [children]
 *
 * @param {RevealProps & Record<string, any>} props
 */
const Reveal = ({
  as: Tag = "div",
  from = "above",
  distance,
  duration = 0.5,
  delay = 0,
  className = "",
  children,
  ...rest
}) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // With no observer there is nothing to wait on, and leaving the element
    // stranded at opacity 0 would be worse than skipping the animation.
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRevealed(true);
        observer.disconnect();
      },
      // Hold off until the element is a little way into the viewport, matching
      // the feel of framer-motion's default `whileInView` threshold.
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={["reveal", revealed && "is-visible", className]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--reveal-duration": `${duration}s`,
        "--reveal-delay": `${delay}s`,
        ...OFFSET[from](distance ?? DEFAULT_DISTANCE[from]),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
