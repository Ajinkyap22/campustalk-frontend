import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { withRouter, Link } from "react-router-dom";
import Logo from "../Logo";
import Password from "../FormControl/Password";
import axios from "axios";
import Overlay from "../Overlay";

function Reset({ title, history, match }) {
  const [formData, setFormData] = useState({
    resetPasswordToken: match.params.id,
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({});
  const [changed, setChanged] = useState(false);
  const [user] = useContext(UserContext);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    document.title = title || "Reset Password | CampusTalk";
  }, [title]);

  useEffect(() => {
    if (user) history.push("/feed");
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    setShowOverlay(true);

    axios
      .post("/api/users/reset-password", formData)
      .then((res) => {
        console.log(res.data);
        setChanged(true);
        history.push("/login");
        showOverlay(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setStatus({ code: 404 });
        } else if (err.response?.status === 401) {
          setStatus({ code: 401, message: err.response.data.error });
        } else {
          console.error(err);
        }
      });
  }

  const handleChange = function (e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <main className="w-full bg-bubble flex relative h-full overflow-auto flex-col items-center">
      <div className="my-4">
        <Logo width="250" height="100" />
      </div>

      <section className="bg-white dark:bg-darkSecondary rounded p-3 shadow-base w-[90%] md:w-2/3 lg:w-[30%] 2xl:w-[25%]">
        <h1 className="text-lg md:text-xl lg:text-2xl text-primary text-center mt-2">
          Reset Password
        </h1>

        {changed ? (
          <div className="text-center">
            <div className="bg-green-300 p-3 w-[90%] my-4 rounded mx-auto">
              <p className="text-green-700 text-sm">
                You have successfully reset your password. You can now login
                with your new password.
              </p>
            </div>

            <Link to="/login">
              <button className="px-2 md:px-3 py-1.5 lg:py-2 ml-1 my-2 text-xs md:text-sm lg:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <form className="my-2 mt-6 px-2" onSubmit={handleSubmit}>
            {/* Password */}
            <Password
              name="newPassword"
              placeholder="Minimum 8 characters"
              label="New Password"
              minLength={8}
              required={true}
              callback={handleChange}
              setState={false}
            />

            {/* Confirm password */}
            <Password
              name="confirmPassword"
              placeholder="Minimum 8 characters"
              label="Confirm Password"
              minLength={8}
              required={true}
              callback={handleChange}
              setState={false}
            />

            <p
              className="mt-3 text-mxs dark:bg-darkError bg-red-200 text-error dark:text-darkLight border border-red-300 dark:border-red-500 rounded p-1 px-2"
              hidden={status.code === 401 ? false : true}
            >
              {status.message}
            </p>

            <p
              className="mt-3 text-mxs dark:bg-darkError bg-red-200 text-error dark:text-darkLight border border-red-300 dark:border-red-500 rounded p-1 px-2"
              hidden={status.code === 404 ? false : true}
            >
              User not found. Please check your email and try again.
            </p>

            <div className="text-center py-2">
              <button className="px-2 md:px-3 py-1.5 lg:py-2 text-xs md:text-sm 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
                Reset Password
              </button>
            </div>
          </form>
        )}
      </section>

      {/* overlay */}
      <Overlay text="Resetting password..." showOverlay={showOverlay} />
    </main>
  );
}

export default withRouter(Reset);
