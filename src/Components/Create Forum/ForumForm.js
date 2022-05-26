import { ForumContext } from "../../Contexts/ForumContext";
import { UserContext } from "../../Contexts/UserContext";
import { PostContext } from "../../Contexts/PostContext";
import { EventContext } from "../../Contexts/EventContext";
import { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Input from "../FormControl/Input";
import ActionButtons from "../FormControl/ActionButtons";

function ForumForm({ forum, setShowOverlay, history }) {
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [forums, setForums] = useContext(ForumContext);
  const [posts, setPosts] = useContext(PostContext);
  const [events, setEvents] = useContext(EventContext);
  const [status, setStatus] = useState(0);

  const [formData, setFormData] = useState({
    forumName: forum?.forumName || "",
    address: forum?.address || "",
    website: forum?.website || "",
    email: forum?.email || "",
    user: user?._id,
  });

  const handleChange = function (e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function checkUrl(e) {
    let string = e.target.value;

    if (!string.match(/^https?:/) && string.length) {
      string = "https://" + string;

      e.target.value = string;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    setShowOverlay(true);

    if (!formData.user) {
      formData.user = user._id;
    }

    if (!forum) {
      createRequest(formData, headers);
    } else {
      editRequest(formData, headers);
    }
  }

  function createRequest(formData, headers) {
    axios
      .post(`/api/forums/create-forum`, formData, headers)
      .then((res) => {
        // update forums
        setForums((forums) => [...forums, res.data]);
        // add forum to user's forums
        setUser((user) => ({
          ...user,
          forums: [...user.forums, res.data],
        }));
        // redirect
        history.push(`/forums/${res.data._id}`);
        setShowOverlay(false);
      })
      .catch((err) => {
        setStatus(err?.response?.status || 0);
      });
  }

  function editRequest(formData, headers) {
    axios
      .put(`/api/forums/update/${forum._id}`, formData, headers)
      .then((res) => {
        // update forums
        setForums((forums) =>
          forums.map((f) => (f._id === res.data._id ? res.data : f))
        );

        // update user
        setUser((user) => ({
          ...user,
          forums: user.forums.map((f) =>
            f._id === res.data._id ? res.data : f
          ),
        }));

        // update posts
        setPosts((posts) =>
          posts.map((p) =>
            p.forum._id === res.data._id ? { ...p, forum: res.data } : p
          )
        );

        // update events
        setEvents((events) =>
          events.map((e) =>
            e.forum._id === res.data._id ? { ...e, forum: res.data } : e
          )
        );

        history.push(`/forums/${res.data._id}`);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response);
      });
  }

  function handleBack(e) {
    e.preventDefault();

    if (!forum) {
      user.forums.length ? history.goBack() : history.push("/join-forum");
    } else {
      history.push(`/forums/${forum._id}`);
    }
  }

  return (
    <form className="px-5 md:px-8 py-2" onSubmit={handleSubmit}>
      {/* forum name */}
      <Input
        type="text"
        name="forumName"
        value={formData.forumName}
        label="Institute's Name"
        callback={(e) => handleChange(e)}
        placeholder="Your institute's official name"
        required={true}
        setState={false}
      />

      {/* address */}
      <Input
        type="text"
        name="address"
        value={formData.address}
        label="Institute's Address"
        callback={(e) => handleChange(e)}
        placeholder="Your institute's address"
        required={true}
        setState={false}
      />

      {/* website */}
      <div className="my-4 relative">
        <label
          htmlFor="website"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Institute's Website
          <span className="text-red-600">*</span>
        </label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Your institute's official website"
          className="mt-2 block w-full px-3 py-1.5 border dark:text-darkLight dark:border-[#3e3d3d] dark:bg-[#3e3d3d] border-gray-300 bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
          required
          onBlur={checkUrl}
        />
      </div>

      {/* email */}
      <Input
        type="email"
        name="email"
        value={formData.email}
        label="Institute's email"
        callback={(e) => handleChange(e)}
        placeholder="Your institute's official email id"
        required={true}
        setState={false}
      />

      <p
        className="mt-3 text-mxs dark:bg-darkError bg-red-200 text-error dark:text-darkLight border border-red-300 dark:border-red-500 rounded p-1 px-2"
        hidden={status === 409 ? false : true}
      >
        A forum with the same email address or website already exists. Please
        make sure your institute's forum doesn't already exist.
      </p>

      {/* checkbox */}
      <div className="mt-6 relative">
        <input
          type="checkbox"
          name="consent"
          id="consent"
          className="cursor-pointer"
          value={false}
          onChange={() => setChecked(!checked)}
          required
        />
        <label
          htmlFor="consent"
          className="text-xsm lg:text-xs mx-2 relative bottom-[0.2rem] dark:text-darkLight lg:bottom-[0.1rem] "
          value="yes"
        >
          I understand that this information will be used for the institute
          verification process. Inaccurate information will result in the
          deletion of the created forum.
        </label>
      </div>

      {/* Submit */}
      <div className="my-4 mdmy-5 2xl:my-6 float-right">
        <button
          className="px-2 md:px-3 text-xs md:text-sm lg:text-base 2xl:text-lg py-1.5 lg:py-2 mr-1 text-[#818181]"
          onClick={handleBack}
          type="button"
        >
          Cancel
        </button>
        <button className="px-2 md:px-3 py-1.5 lg:py-2 ml-1 text-xs md:text-sm lg:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
          {!forum ? "Next" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default withRouter(ForumForm);
