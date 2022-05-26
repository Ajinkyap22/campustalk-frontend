import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../Logo";
import axios from "axios";
import Overlay from "../Overlay";

function Forget({ title, history }) {
  const [user] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    document.title = title || "Forgot Password | CampusTalk";
  }, [title]);

  useEffect(() => {
    if (user) history.push("/feed");
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) return;

    setShowOverlay(true);

    axios
      .post("/api/mail/reset-password", { email })
      .then(() => {
        setSent(true);
        setShowOverlay(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="w-full bg-bubble flex relative h-full overflow-auto flex-col items-center">
      <div className="my-4">
        <Logo width="250" height="100" />
      </div>

      <section className="bg-white dark:bg-darkSecondary rounded p-3 shadow-base w-[90%] md:w-2/3 lg:w-[30%] 2xl:w-[25%]">
        <h1 className="text-lg md:text-xl lg:text-2xl text-primary text-center mt-2">
          Forgot Password
        </h1>

        {sent ? (
          <div className="bg-green-300 p-3 w-[90%] my-4 rounded text-center mx-auto">
            <p className="text-green-700 text-sm">
              A link has been sent to you. Please check your email to reset your
              CampusTalk password. You can now close this tab.
            </p>
          </div>
        ) : (
          <form
            className="flex flex-col my-2 mt-6 px-2 relative"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="email"
              className="text-xs px-1 dark:text-darkLight lg:text-sm 2xl:text-lg"
            >
              Enter your email address
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-2 block w-full px-3 py-1.5 border dark:text-darkLight dark:border-[#3e3d3d] dark:bg-[#3e3d3d] border-gray-300 bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
              placeholder="Your registered email address"
              required
            />

            <button className="self-center relative px-2 md:px-3 py-1.5 lg:py-2 ml-1 my-2 mt-6 text-xs md:text-sm 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
              Reset Password
            </button>
          </form>
        )}
      </section>

      {/* overlay */}
      <Overlay text="Sending email..." showOverlay={showOverlay} />
    </main>
  );
}

export default withRouter(Forget);
