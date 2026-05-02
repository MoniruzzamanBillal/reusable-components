"use client";

import { useTheme } from "next-themes";

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className=" px-10 ">
      <div className=" py-6 ">
        <button
          onClick={toggleTheme}
          className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>
      <h1>HomePage</h1>

      {/*  */}
      <h1>HomePage new </h1>
      <h1>HomePage new </h1>
      <h1>HomePage new </h1>
    </div>
  );
}
