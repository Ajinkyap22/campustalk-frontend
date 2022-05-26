import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Logo from "../Logo";

function Verify({ title, history }) {
  const [user] = useContext(UserContext);

  useEffect(() => {
    document.title = title || "Account Created | CampusTalk";
  }, [title]);

  useEffect(() => {
    if (!user) history.push("/login");

    if (user && user.active !== false) history.push("/feed");
  }, []);

  return (
    <main className="w-full bg-bubble flex relative h-full overflow-auto flex-col items-center">
      <div className="my-4">
        <Logo width="250" height="100" />
      </div>

      <section className="bg-white dark:bg-darkSecondary rounded p-3 py-4 shadow-base w-[90%] md:w-2/3 lg:w-[30%] 2xl:w-[25%]">
        <h1 className="text-lg md:text-xl lg:text-2xl text-primary dark:text-primary-light text-center mt-2">
          Confirm Your Account
        </h1>

        <div className="bg-green-300 p-3 w-[90%] my-4 rounded text-center mx-auto">
          <p className="text-green-700 text-sm">
            Your CampusTalk account was created successfully! Please check your
            email to confirm your acoount. You can close this tab after
            confirming your account.
          </p>
        </div>
      </section>
    </main>
  );
}

export default withRouter(Verify);
