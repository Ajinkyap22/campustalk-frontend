import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
// import NotFound from "../assets/404.svg";
import NotFound from "../assets/404Error.svg";
import Loading from "../Components/Loading";

function PageNotFound({ history }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "CampusTalk";
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  function handleBack() {
    history.goBack();
  }

  return (
    <div className="h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col lg:flex-row lg:items-center lg:justify-evenly bg-[#F0F2F5] dark:bg-dark overflow-auto">
          <img src={NotFound} alt="Page Not Found" className="lg:h-screen" />

          <div className="px-6 md:px-16 2xl:px-20 mb-5 lg:mb-0">
            <p className="md:text-2xl 2xl:text-4xl 3xl:text-5xl my-2 2xl:my-3 3xl:my-4 dark:text-darkLight">
              Sorry, we could not find the page you were looking for.
            </p>
            <p className="text-sm md:text-base 2xl:text-xl 3xl:text-2xl text-secondary dark:text-gray-300 my-1.5 2xl:my-3">
              No need to worry, You can always head over to one of our good 'ol
              pages to get back on track.
            </p>

            <ul className="mt-5">
              {/* home */}
              <li className="text-sm md:text-base 2xl:text-xl 3xl:text-2xl my-3 2xl:my-5 hover:translate-x-3 transition-all">
                <Link to="/" className="text-primary dark:text-primary-light">
                  Homepage →
                </Link>
              </li>
              {/* feed */}
              <li className="text-sm md:text-base 2xl:text-xl 3xl:text-2xl my-3 2xl:my-5 hover:translate-x-3 transition-all">
                <Link
                  className="text-primary dark:text-primary-light"
                  to="/feed"
                >
                  Feed →
                </Link>
              </li>
              {/* forums */}
              <li className="text-sm md:text-base 2xl:text-xl 3xl:text-2xl my-3 2xl:my-5 hover:translate-x-3 transition-all">
                <Link
                  className="text-primary dark:text-primary-light"
                  to="/forums"
                >
                  Forums →
                </Link>
              </li>
              {/* events */}
              <li className="text-sm md:text-base 2xl:text-xl 3xl:text-2xl my-3 2xl:my-5 hover:translate-x-3 transition-all">
                <Link
                  className="text-primary dark:text-primary-light"
                  to="/events"
                >
                  Events →
                </Link>
              </li>
              {/* chats */}
              <li className="text-sm md:text-base 2xl:text-xl 3xl:text-2xl my-3 2xl:my-5 hover:translate-x-3 transition-all">
                <Link
                  className="text-primary dark:text-primary-light"
                  to="/chats"
                >
                  Chats →
                </Link>
              </li>
            </ul>

            <button
              onClick={handleBack}
              className="px-2 md:px-3 py-1.5 lg:py-2 md:mt-4 text-xs md:text-sm md:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700 hover:scale-105 transition-all"
            >
              Take Me Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(PageNotFound);
