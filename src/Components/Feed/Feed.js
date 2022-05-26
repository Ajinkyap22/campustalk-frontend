import { UserContext } from "../../Contexts/UserContext";
import { TabContext } from "../../Contexts/TabContext";
import { PostContext } from "../../Contexts/PostContext";
import { EventContext } from "../../Contexts/EventContext";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "../Navbar/Nav";
import Filter from "./Filter";
import HomeBox from "./HomeBox";
import Post from "../Post/Post";
import ForumBox from "./ForumBox";
import FAQ from "./FAQ";
import LogoCropped from "../LogoCropped";
import Loading from "../Loading";
import EventsBox from "./EventsBox";
import MobileActions from "./MobileActions";
import Tour from "reactour";
import axios from "axios";
import useCheckMobileScreen from "../../Hooks/useCheckMobileScreen";

const faqData = [
  {
    question: "How do I post anonymously?",
    answer:
      "You can post anonymously by selecting the anonymous mode in the post form.",
  },

  {
    question: "Can I attach files to my posts?",
    answer:
      "Yes you can attach different types of files to your posts such as images, videos, documents, etc.",
  },

  {
    question: "How can I leave a forum?",
    answer:
      "Visit the forums page that you want to leave and click on the 'Leave a Forum' button.",
  },
  {
    question: "What is the 'important' filter?",
    answer:
      "The 'important' filter will show only the posts that are marked as important.",
  },
  {
    question: "What is the 'top' filter?",
    answer:
      "The 'top' filter will sort the posts by the number of upvotes, you can select different time ranges like 'Today', 'This Week', 'This Month' etc. that will show you the top posts from that period.",
  },
];

function Feed({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [dateRange, setDateRange] = useState("Today");
  const [posts, setPosts, loading] = useContext(PostContext);
  const [user, setUser] = useContext(UserContext);
  const [events] = useContext(EventContext);
  const [tourOpen, setTourOpen] = useState(false);
  const isMobile = useCheckMobileScreen();
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    document.title = title || "Feed | CampusTalk";
  }, [title]);

  useEffect(() => {
    setActiveTab("feed");
  }, [activeTab]);

  useEffect(() => {
    if (!user) return;

    setTourOpen(user.new);
  }, [user]);

  useEffect(() => {
    setSteps([
      {
        content:
          "Welcome to CampusTalk! before you get started, here's a quick tour for you.",
      },
      {
        content:
          "This is the feed page, you can see all the posts from the forums you have joined.",
      },
      {
        selector: isMobile ? ".mobileTabs" : ".tabs",
        content:
          "This is the tabs bar, you can see the tabs that you can switch between.",
      },
      {
        selector: ".filters",
        content:
          "This is the filters menu, you can see the filters that you can apply to the posts in your feed.",
      },
      {
        selector: ".posts",
        content:
          "This is the posts section, you can see all the posts from the forums you have joined here.",
      },
      {
        selector: isMobile ? ".mobileActions" : ".actions",
        content:
          "These are the actions you can perform from your feed. If you are a moderator, you'll also see a 'Create Event' option",
      },
      {
        selector: isMobile ? ".mobileForums" : ".forumsBox",
        content: isMobile
          ? "This tab shows the forums you have joined and all other CampusTalk forums."
          : "This box shows the forums you have joined recently, click on the 'See All' button to see all forums.",
      },
      {
        selector: isMobile ? ".mobileEvents" : ".eventsBox",
        content: isMobile
          ? "This tab shows the upcoming events from the forums you have joined."
          : "This box shows the upcoming events from the forums you have joined, click on the 'See All' button to see all events.",
      },
      {
        selector: isMobile ? ".chats" : ".faq",
        content: isMobile
          ? "This is the chats tab, you can access all of your chats here."
          : "This is the FAQ section, you can see the frequently asked questions if you have any doubts.",
      },
      {
        selector: isMobile ? ".mobileNotifications" : ".notifications",
        content: isMobile
          ? "This is the notifications tab, you can see all of your notifications here."
          : "This is the notifications section, you can see all of your notifications here.",
      },
      {
        selector: isMobile ? ".mobileProfile" : ".profile",
        content: isMobile
          ? "This is the profile tab, you can see view or edit your profile information here."
          : "This is the profile menu, you can see all profile-related options you can perform from here, including switching to dark mode!",
      },
      {
        content: "You're all set, enjoy CampusTalk!",
      },
    ]);
  }, [isMobile]);

  function closeTour() {
    setTourOpen(false);
  }

  function disableBodyScroll() {
    document.body.style.overflow = "hidden";
  }

  function enableBodyScroll() {
    document.body.style.overflow = "auto";
  }

  function onBeforeClose() {
    enableBodyScroll();

    if (!user) return;

    axios
      .put(`/api/users/${user?._id}/unmark`)
      .then(() => {
        setUser({ ...user, new: false });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="w-full min-h-full bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      {/* Feed content */}
      <section className="flex justify-evenly items-start lg:w-full mx-auto h-full relative">
        <div className="sticky top-[5.5rem] 2xl:top-[6rem] 3xl:top-[6.5rem]">
          {/* faq */}
          <FAQ faqData={faqData} />

          {/* events */}
          <EventsBox events={events} />
        </div>

        {/* posts and filters  */}
        <div className="posts flex-grow flex flex-col items-center my-6 lg:my-8 lg:mb-16 h-full lg:max-w-[28rem] xl:max-w-[32rem] 2xl:max-w-[36rem] 3xl:max-w-[40rem]">
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
            <div className="mt-10">
              <Loading />
            </div>
          )}

          {/* posts */}
          {!loading &&
            posts.map((post, i) => (
              <Post
                key={i}
                post={post}
                activeFilter={activeFilter}
                range={dateRange}
              />
            ))}

          {/* if feed is empty */}
          <div
            hidden={posts.length || loading ? true : false}
            className="my-12 text-gray-700 text-center"
          >
            {/* logo */}
            <LogoCropped color="rgba(98, 98, 98, 0.9)" width="75" />

            {/* text */}
            <p className="w-2/3 mx-auto my-4 dark:text-darkLight">
              Your feed is empty, why not{" "}
              <Link
                to="/create-post"
                className="text-primary dark:text-primary-dark underline underline-offset-1"
              >
                {" "}
                create a post{" "}
              </Link>{" "}
              or{" "}
              <Link
                to="/forums"
                className="text-primary dark:text-primary-dark underline underline-offset-1"
              >
                join more forums?
              </Link>
            </p>
          </div>
        </div>

        <div className="sticky top-[5.5rem] 2xl:top-[6rem] 3xl:top-[6.5rem]">
          {/* home info box */}
          <HomeBox user={user} />

          {/* forums joined box */}
          <ForumBox user={user} />
        </div>

        <MobileActions />
      </section>

      {/* tour */}
      <Tour
        steps={steps}
        isOpen={tourOpen}
        onRequestClose={closeTour}
        className="helper"
        rounded={5}
        onAfterOpen={disableBodyScroll}
        onBeforeClose={onBeforeClose}
        badgeContent={(curr, tot) => `${curr} of ${tot}`}
        closeButtonAriaLabel="Close the tour"
        closeWithMask={false}
        disableInteraction={true}
        lastStepNextButton={
          <button className="px-1.5 py-1.5 text-xs md:text-sm 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
            Done!
          </button>
        }
        nextButton={
          <button className="px-2 py-1.5 text-xs md:text-sm 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
            Next
          </button>
        }
      />
    </main>
  );
}

export default Feed;
