import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollPercent(scrolled);
      setVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollPercent / 100) * circumference;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="relative w-16 h-16 flex items-center justify-center rounded-full bg-transparent group"
        aria-label="Back to top"
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          className="absolute top-0 left-0 transform rotate-[-90deg]"
        >
          <circle
            cx="30"
            cy="30"
            r={radius}
            stroke="#C6A15C"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        <span className="text-luxeGold text-xl">↑</span>
      </button>
    </div>
  );
};

export default BackToTopButton;