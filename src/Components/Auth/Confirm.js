import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import Logo from "../Logo";
import axios from "axios";

function Confirm({ title, history }) {
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    document.title = title || "Acoount Confirmed | CampusTalk";
  }, [title]);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      axios
        .put(`/api/users/confirm/${user._id}`)
        .then((res) => {
          setUser({ ...user, active: true });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <main className="w-full bg-bubble flex relative h-full overflow-auto flex-col items-center">
      <div className="my-4">
        <Logo width="250" height="100" />
      </div>

      <section className="text-center bg-white dark:bg-darkSecondary rounded p-3 py-4 shadow-base w-[90%] md:w-2/3 lg:w-[30%] 2xl:w-[25%]">
        <h1 className="text-lg md:text-xl lg:text-2xl text-primary dark:text-primary-light mt-2">
          Account Confirmed
        </h1>

        <div className="bg-green-300 p-3 w-[90%] my-4 rounded mx-auto">
          <p className="text-green-700 text-sm">
            Your CampusTalk account has been confirmed successfully! You're all
            set to go now! Click on the button below to get started.
          </p>
        </div>

        <Link to="/join-forum">
          <button className="px-2 md:px-3 py-1.5 lg:py-2 ml-1 my-2 text-xs md:text-sm lg:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
}

export default withRouter(Confirm);
