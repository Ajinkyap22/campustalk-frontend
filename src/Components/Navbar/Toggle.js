import { useState, useContext, useEffect } from "react";
import { ModeContext } from "../../Contexts/ModeContext";

function Toggle() {
  const [toggle, setToggle] = useState(true);
  const [mode, setMode] = useContext(ModeContext);

  useEffect(() => {
    if (mode === "dark") {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, []);

  function toggleMode() {
    setToggle(!toggle);
    if (mode === "light") {
      setMode("dark");
      localStorage.setItem("mode", "dark");
    } else {
      setMode("light");
      localStorage.setItem("mode", "light");
    }
  }

  return (
    <button
      aria-label={
        mode === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      className="mb-1.5 md:mb-2 lg:mb-0 mx-1.5 md:mx-3 hover:scale-110 transition-transform"
      onClick={toggleMode}
    >
      {mode === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 stroke-[#818181]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 stroke-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
}

export default Toggle;
