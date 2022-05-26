import { UserContext } from "../../Contexts/UserContext";
import { EventContext } from "../../Contexts/EventContext";
import { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Input from "../FormControl/Input";
import ActionButtons from "../FormControl/ActionButtons";
import axios from "axios";
import moment from "moment";

function EventForm({ event, history, setShowOverlay }) {
  const [user] = useContext(UserContext);
  const [events, setEvents] = useContext(EventContext);
  const [userForums, setUserForums] = useState([]);

  const [formData, setFormData] = useState({
    name: event?.name || "",
    description: event?.description || "",
    link: event?.link || "",
    date: event ? moment(event.date).format("YYYY-MM-DD") : "",
    time: event?.time || "",
    venue: event?.venue || "",
    forum: event?.forum?._id || null,
  });

  useEffect(() => {
    if (!user) return;

    let forums = user.forums.filter((forum) => {
      let isMod = forum.moderators.indexOf(user._id) !== -1;

      return isMod;
    });

    if (forums.length === 0) {
      history.push("/forums");
    }

    if (event) {
      // check if user is an moderator of the event's forum
      let isMod = event.forum.moderators.indexOf(user._id) !== -1;

      if (!isMod) {
        history.push("/events");
      }
    }

    setUserForums(forums);
  }, [user]);

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

    if (event) {
      editRequest(formData, headers);
    } else {
      createRequest(formData, headers);
    }
  }

  function createRequest(formData, headers) {
    axios
      .post("/api/events/create-event", formData, headers)
      .then((res) => {
        setEvents([...events, res.data]);

        setShowOverlay(false);

        history.push(`/events/${res.data._id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function editRequest(formData, headers) {
    axios
      .put(`/api/events/${event._id}/update-event`, formData, headers)
      .then((res) => {
        setEvents(events.map((e) => (e._id === res.data._id ? res.data : e)));

        history.push(`/events/${res.data._id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form className="px-5 md:px-8 py-2" onSubmit={handleSubmit}>
      {/* event name */}
      <Input
        type="text"
        name="name"
        value={formData.name}
        label="Event's Name"
        callback={(e) => handleChange(e)}
        placeholder="Name of the event"
        required={true}
        setState={false}
      />

      {/* event description */}
      <div className="my-4 relative">
        <label
          htmlFor="description"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Event Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          cols="30"
          rows="8"
          value={formData.description}
          className="w-full mt-2 px-3 py-1.5 border-2 border-gray-300 dark:text-darkLight bg-[#f6f6f6] dark:border-[#3e3d3d] dark:bg-[#3e3d3d] rounded-lg text-xs lg:text-sm 2xl:text-base shadow-sm focus:outline-none focus:border-primary-500"
          placeholder="Information about the event e.g. What is the event about, rules, themes, requirements etc."
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* date */}
      <div className="my-4 relative">
        <label
          htmlFor="date"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          className="w-full mt-2 px-3 py-1.5 border-2 border-gray-300 bg-[#f6f6f6] dark:text-darkLight dark:border-[#3e3d3d] dark:bg-[#3e3d3d] rounded-lg text-xs lg:text-sm 2xl:text-base shadow-sm focus:outline-none focus:border-primary-500"
          placeholder="Date of the event"
          onChange={handleChange}
          required
        />
      </div>

      {/* time */}
      <div className="my-4 relative">
        <label
          htmlFor="time"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Time
        </label>

        <input
          type="time"
          name="time"
          value={formData.time}
          className="w-full mt-2 px-3 py-1.5 border-2 border-gray-300 bg-[#f6f6f6] dark:text-darkLight dark:border-[#3e3d3d] dark:bg-[#3e3d3d] rounded-lg text-xs lg:text-sm 2xl:text-base shadow-sm focus:outline-none focus:border-primary-500"
          placeholder="Time of the event"
          onChange={handleChange}
        />
      </div>

      {/* venue */}
      <Input
        type="text"
        name="venue"
        value={formData.venue}
        label="Event's Venue"
        callback={(e) => handleChange(e)}
        placeholder="Venue of the event"
        required={false}
        setState={false}
      />

      {/* link */}
      <div className="my-4 relative">
        <label
          htmlFor="website"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Registration Link
        </label>
        <input
          type="url"
          name="link"
          onChange={handleChange}
          value={formData.link}
          placeholder="Link to register for the event"
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 dark:text-darkLight dark:border-[#3e3d3d] dark:bg-[#3e3d3d] bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
          onBlur={checkUrl}
        />
      </div>

      {/* forum */}
      <div className="my-4 relative">
        <label
          htmlFor="forum"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Forum <span className="text-red-500">*</span>
        </label>

        <select
          name="forum"
          onChange={handleChange}
          value={formData.forum || ""}
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] dark:text-darkLight dark:border-[#3e3d3d] dark:bg-[#3e3d3d] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181]
              focus:outline-none focus:border-sky-500"
          required
        >
          <option value="">Select a forum</option>
          {userForums?.map((forum) => (
            <option key={forum?._id} value={forum?._id}>
              {forum?.forumName}
            </option>
          ))}
        </select>
      </div>

      {/* submit */}
      <ActionButtons
        path="/events"
        action={event ? "Update" : "Create"}
        classes="my-4 md:my-5 2xl:my-6 float-right"
      />
    </form>
  );
}

export default withRouter(EventForm);
