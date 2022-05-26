import { useState, useContext, useEffect } from "react";
import { ModeContext } from "../../Contexts/ModeContext";

function Toggle() {
  const [toggle, setToggle] = useState(true);
  const [mode, setMode] = useContext(ModeContext);
  const toggleClass = " transform translate-x-3.5";

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
    <li className="p-2 2xl:p-2.5 text-sm 2xl:text-lg dark:text-darkLight">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 2xl:h-6 2xl:w-6 inline mr-1 stroke-[#818181] dark:stroke-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
      Dark Mode
      {/*   Switch Container */}
      <div
        className={`w-8 h-4 inline-flex items-center rounded-full p-0.5 ml-2 align-middle cursor-pointer ${
          toggle ? "bg-[#cfcdcd]" : "bg-primary"
        }`}
        onClick={toggleMode}
      >
        {" "}
        {/* Switch */}
        <div
          className={
            "bg-white h-3.5 w-3.5 rounded-full shadow-md transform duration-300 ease-in-out inline" +
            (toggle ? null : toggleClass)
          }
        ></div>
      </div>
    </li>
  );
}

export default Toggle;
