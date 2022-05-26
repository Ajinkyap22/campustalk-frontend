import LogoCropped from "../LogoCropped";
import axios from "axios";
import Loading from "../Loading";

function JoinRequests({
  forum,
  forums,
  setForums,
  joinRequests,
  setJoinRequests,
  joinRequestLoading,
}) {
  function acceptRequest(request) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .put(
        `/api/forums/${forum._id}/approve_join`,
        { id: request._id },
        headers
      )
      .then((res) => {
        // update forums
        let newForums = forums.map((f) => (f._id === forum._id ? res.data : f));

        setForums(newForums);

        // update join requests
        let newJoinRequests = joinRequests.filter(
          (rq) => rq._id !== request._id
        );

        setJoinRequests(newJoinRequests);

        sendNotification(request._id, forum._id);

        sendMail(request.email, request.firstName, forum.forumName, forum._id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function rejectRequest(request) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .put(`/api/forums/${forum._id}/reject_join`, { id: request._id }, headers)
      .then((res) => {
        // update join requests
        let newJoinRequests = joinRequests.filter(
          (rq) => rq._id !== request._id
        );

        setJoinRequests(newJoinRequests);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function sendNotification(author, forum) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    let body = {
      type: "requestApproved",
      forum,
      to: author,
    };

    axios
      .post("/api/notifications/join-request-approved", body, headers)
      .catch((err) => {
        console.error(err);
      });
  }

  function sendMail(email, name, forumName, forumId) {
    let body = {
      email,
      name,
      forumName,
      forumId,
    };

    axios.post("/api/mail/join-request-approved", body).catch((err) => {
      console.error(err);
    });
  }

  return (
    <div>
      {joinRequestLoading ? (
        <div className="mx-auto text-center mt-8">
          <Loading />
        </div>
      ) : (
        <div>
          <div className="text-center my-4" hidden={joinRequests.length}>
            <LogoCropped color="rgba(98,98,98,0.9)" width="80" />
            <p className="text-secondary dark:text-gray-300 2xl:text-lg 2xl:mt-2 3xl:text-xl">
              There no new join requests.
            </p>
          </div>

          {/* if not empty */}
          <div className="bg-white dark:bg-darkSecondary shadow-base lg:min-w-[28rem] xl:min-w-[32rem] rounded">
            {joinRequests.map((joinRequest, i) => (
              <div
                className={`flex border-b justify-between items-center w-full p-2 md:p-2.5 ${
                  i === joinRequests.length - 1 ? "border-none" : ""
                }`}
                key={i}
              >
                {/* user info */}
                <div className="flex items-center">
                  {/* image */}
                  {joinRequest.picture ? (
                    <img
                      src={
                        joinRequest.picture.includes("googleusercontent")
                          ? joinRequest.picture
                          : `/uploads/images/${joinRequest.picture}`
                      }
                      className="rounded-full object-cover w-8 md:w-10 h-auto inline mx-1 md:mx-2"
                      alt=""
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline mx-1 md:mx-2 w-8 md:w-10 align-middle fill-[#818181] dark:fill-darkLight"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />
                    </svg>
                  )}

                  {/* name */}
                  <span className="text-sm md:text-base text-justify mx-1 dark:text-darkLight">
                    {joinRequest.firstName} {joinRequest.lastName}
                  </span>
                </div>

                {/* actions */}
                <div className="flex items-center">
                  <button
                    className="bg-green-500 rounded-full mx-1 px-2 md:px-3 py-1.5 text-xs md:text-sm text-white hover:bg-green-600 hover:scale-105 transition-all"
                    onClick={() => acceptRequest(joinRequest)}
                  >
                    Accpet
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      className="inline ml-1 w-4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                  </button>

                  <button
                    className="bg-red-500 rounded-full mx-1 px-2 md:px-3 py-1.5 text-xs md:text-sm text-white hover:bg-red-600 hover:scale-105 transition-all"
                    onClick={() => rejectRequest(joinRequest)}
                  >
                    Reject
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      className="inline mx-1 w-3 md:w-3.5"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JoinRequests;
