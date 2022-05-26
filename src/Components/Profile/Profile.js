import { UserContext } from "../../Contexts/UserContext";
import { TabContext } from "../../Contexts/TabContext";
import { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import ForumBox from "../Feed/ForumBox";
import Filter from "../Feed/Filter";
import Post from "../Post/Post";
import Loading from "../Loading";
import LogoCropped from "../LogoCropped";
import axios from "axios";
import Nav from "../Navbar/Nav";

function Profile({ ...props }) {
  const [user] = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [dateRange, setDateRange] = useState("Today");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useContext(TabContext);

  useEffect(() => {
    if (!user) {
      props.history.push("/feed");
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;

    if (mounted) setTab("profile");

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    axios.get(`/api/users/${user?._id}/posts`).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="w-full min-h-full overflow-auto bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      <section className="flex flex-col items-center lg:flex-row lg:items-start 2xl:justify-evenly relative p-2 mt-4">
        <div className="lg:ml-12 w-[80%] lg:w-auto">
          <div className="bg-white dark:bg-darkSecondary p-2 rounded shadow-base mt-2 relative text-center">
            {/* user picture */}
            {user && user?.picture ? (
              <img
                src={
                  user?.picture.includes("googleusercontent")
                    ? user?.picture
                    : `/uploads/images/${user?.picture}`
                }
                alt=""
                className="rounded-full inline h-28 2xl:h-32 3xl:h-36 w-auto mt-4 my-2"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline my-2 mt-4 w-28 2xl:w-32 3xl:w-36 fill-[#818181] dark:fill-darkLight"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            )}
            {/* user name */}
            <h1 className="text-lg 2xl:text-xl 3xl:text-2xl text-center mt-2 2xl:mt-3 dark:text-darkLight">
              {user?.firstName} {user?.lastName}
            </h1>

            {/* user join date */}
            <p className="text-mxs 2xl:text-sm 3xl:text-base text-secondary dark:text-gray-300 mt-1 2xl:mt-2">
              Joined {moment(user?.timestamp).format("LL")}
            </p>
            <hr className="mt-2 2xl:mt-3 dark:border-t dark:border-secondary" />

            {/* stats */}
            <div className="flex justify-center items-center mt-3 2xl:mt-4">
              {/* members */}
              <div className="flex flex-col items-center px-2.5">
                <span className="dark:text-darkLight 2xl:text-lg">
                  {user?.posts.length}
                </span>
                <span className="text-mxs 2xl:text-sm dark:text-darkLight">
                  Posts
                </span>
              </div>

              {/* posts */}
              <div className="flex flex-col items-center px-2.5">
                <span className="dark:text-darkLight 2xl:text-lg">
                  {user?.forums.length}
                </span>
                <span className="text-mxs 2xl:text-sm dark:text-darkLight">
                  Forums
                </span>
              </div>
            </div>

            {/* edit icon */}
            <Link to="/user-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#919191"
                className="absolute top-3 w-4 2xl:w-5 3xl:w-6 right-3 hover:scale-110 transition-all"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </Link>
          </div>

          {/* user forums */}
          <div className="2xl:mt-8 3xl:mt-12">
            <ForumBox user={user} fixed={false} onProfilePage={true} />
          </div>
        </div>

        {/* user posts */}
        <div className="lg:max-w-[32rem] 2xl:max-w-[36rem] 3xl:max-w-[40rem] mt-6 lg:mt-2 lg:ml-24 2xl:justify-self-center">
          {/* filters */}
          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            posts={posts}
            setPosts={setPosts}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          {loading && (
            <div className="mx-auto text-center mt-8 2xl:mt-12">
              <Loading />
            </div>
          )}

          {/* posts */}
          {!loading &&
            posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                activeFilter={activeFilter}
                range={dateRange}
              />
            ))}

          {/* if there are no posts */}
          {posts.length === 0 && !loading && (
            <div className="text-center my-6 2xl:my-10">
              <LogoCropped color="rgba(98,98,98,0.9)" width="80" />
              <p className="text-gray-600 dark:text-gray-300 2xl:text-lg 3xl:text-xl my-4">
                You haven't created any posts yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default withRouter(Profile);
