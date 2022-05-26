import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import ForumList from "./ForumList";
import AlertModal from "../AlertModal";

const JoinContext = React.createContext();

function JoinForum({ title, forums, setForums, ...props }) {
  const [loading, setLoading] = useState(true);
  const [joinList, setJoinList] = useState([]);
  const [user] = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    document.title = title || "Join Forum | CampusTalk";
  }, [title]);

  useEffect(() => {
    axios
      .get("/api/forums/")
      .then((res) => {
        setForums(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleNext = () => {
    // redirect to the next page
    props.history.push("/feed");
    // send all the join requests
    sendRequests();
  };

  const sendRequests = () => {
    if (!joinList.length) return;

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    let body = {
      id: user._id,
    };

    // send join requests to each selected forum after confirming rather than sending on selection & then cancelling
    joinList.forEach((forumId) => {
      axios
        .post(`/api/forums/${forumId}/join`, body, headers)
        .then(() => {
          sendMail(forumId);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };

  function sendMail(f) {
    let forum = forums.find((forum) => forum._id === f);

    let forumName = forum?.forumName;
    let forumId = forum?._id;

    let mods = forum?.moderators;

    mods = mods.map((moderator) => moderator.email);

    let body = {
      forumName,
      forumId,
      emails: mods,
      type: "join",
    };

    axios
      .post("/api/mail/requests", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div
      className={`flex justify-center items-center w-full relative ${
        showAlert ? "h-full" : "overflow-auto"
      }`}
    >
      {loading ? (
        <Loading />
      ) : (
        <div
          className={`w-full bg-bubble flex relative flex-col justify-start items-center h-full ${
            showAlert ? "overflow-hidden" : ""
          }`}
        >
          <h1 className="font-bold mb-1 mt-5 lg:mt-10 text-primary dark:text-primary-light text-xl xl:mt-10 lg:text-2xl xl:text-3xl 2xl:text-4xl">
            Join Forum
          </h1>
          <h2 className="my-1 text-sm lg:my-2 text-primary dark:text-primary-light lg:text-base 2xl:text-2xl">
            Select your institute's forum to join
          </h2>
          <p className="w-full dark:text-darkLight px-4 md:px-0 md:w-2/3 lg:w-1/2 2xl:w-1/3 mx-auto my-3 text-center text-xs lg:text-sm 2xl:my-5 2xl:text-base">
            You can join upto 3 forums. You will become a member of the forum
            once the moderators of the forums accept your request.
          </p>

          <section className="bg-white dark:bg-darkSecondary rounded shadow-base w-[90%] md:w-2/3 xl:w-1/2 my-5 mb-20 text-center 2xl:my-8">
            <JoinContext.Provider value={[joinList, setJoinList]}>
              <ForumList forums={forums} setShowAlert={setShowAlert} />
            </JoinContext.Provider>

            <button
              onClick={handleNext}
              hidden={forums.length ? false : true}
              className="bg-primary px-5 py-1.5 text-sm lg:text-sm xl:text-base 2xl:py-2 mb-4 text-white rounded-full hover:bg-blue-700 2xl:text-lg"
            >
              Next
            </button>

            <hr />

            <div className="my-4 mb-10 w-2/3 md:w-1/2 2xl:w-1/3 mx-auto text-center">
              <p
                className="text-center text-secondary dark:text-gray-300 m-auto pt-10 pb-5 2xl:text-lg"
                hidden={forums.length ? true : false}
              >
                Looks like we couldn't find any forums for you, why don't you
                create one?
              </p>

              <p
                className="text-secondary dark:text-gray-300 text-sm lg:text-base 2xl:text-lg"
                hidden={forums.length ? false : true}
              >
                Can't find your institute in ths list? Just create your
                institute's forum!
              </p>

              <button className="px-3 py-1.5 mt-5 text-sm xl:text-base 2xl:text-lg text-primary dark:text-primary-light bg-transparent border border-primary dark:border-primary-light rounded-full hover:bg-primary hover:text-white dark:hover:text-darkLight">
                <Link to="/create-forum">Create Forum</Link>
              </button>
            </div>
          </section>

          <div
            className={`absolute w-full h-full ${
              showAlert ? "flex" : ""
            } justify-center items-center bg-[rgba(0,0,0,0.7)]`}
            hidden={showAlert ? false : true}
          >
            <AlertModal
              text="You cannot join more than 3 forums."
              subtext="This limit is used to prevent you from missing any important updates by ensuring that your feed does not get overpopulated with posts from too many forums."
              showAlert={showAlert}
              setShowAlert={setShowAlert}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const Join = withRouter(JoinForum);

export { Join, JoinContext };
