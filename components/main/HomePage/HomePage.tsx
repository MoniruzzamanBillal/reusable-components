"use client";

import { useTheme } from "next-themes";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useGSAP(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  const cursorEnter = (text = "") => {
    gsap.to(cursorRef.current, {
      scale: 5,
      duration: 0.3,
      ease: "power3.out",
    });

    textRef.current!.textContent = text;
  };

  const cursorLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });

    textRef.current!.textContent = "";
  };

  return (
    <div className=" px-10 " ref={mainContainerRef}>
      {/*  */}
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 size-5 rounded-full bg-white pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      >
        <span ref={textRef} className="text-[4px] font-bold text-black"></span>
      </div>

      {/*  */}
      <div className=" py-6 ">
        <button
          onMouseEnter={() => cursorEnter("")}
          onMouseLeave={cursorLeave}
          onClick={toggleTheme}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/*  */}

      <button
        onMouseEnter={() => cursorEnter("View")}
        onMouseLeave={cursorLeave}
        className="px-8 py-4 bg-white text-black rounded-xl"
      >
        Button One
      </button>

      <button
        onMouseEnter={() => cursorEnter("Open")}
        onMouseLeave={cursorLeave}
        className="px-8 py-4 bg-blue-500 rounded-xl"
      >
        Button Two
      </button>

      {/*  */}

      {/*  */}

      <div
        onMouseEnter={() => cursorEnter("Read")}
        onMouseLeave={cursorLeave}
        className="w-80 h-52 bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-6"
      >
        Hover Card
      </div>

      {/*  */}
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
    </div>
  );
}
