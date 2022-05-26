import { ForumContext } from "../../Contexts/ForumContext";
import { withRouter } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import ActionButtons from "../FormControl/ActionButtons";
import axios from "axios";

function AddRules({ forumRules, forumId, title, history }) {
  const [rules, setRules] = useState(forumRules || []);
  const [forums, setForums] = useContext(ForumContext);
  const formRef = useRef();

  useEffect(() => {
    document.title = title || "Forum Rules | CampusTalk";
  }, [title]);

  function handleSubmit(e) {
    e.preventDefault();

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    let body = {
      rules,
    };

    axios
      .put(`/api/forums/${forumId}/rules`, body, headers)
      .then((res) => {
        console.log(res.data);

        // update forums
        setForums(
          forums.map((f) => (f._id === forumId ? { ...f, rules: res.data } : f))
        );

        history.push(`/forums/${forumId}`);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response);
      });
  }

  function handleChange(e, index) {
    setRules([
      ...rules.slice(0, index),
      e.target.value,
      ...rules.slice(index + 1),
    ]);
  }

  function handleDelete(index) {
    setRules((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  }

  function addNewRule(e) {
    e.preventDefault();

    setRules((prevState) => [...prevState, ""]);
  }

  return (
    <main className="w-full bg-bubble h-screen overflow-auto flex flex-col justify-center items-center md:pt-20 md:pb-10 dark:bg-dark">
      <section className="bg-white rounded shadow-base w-[90%] md:w-2/3 xl:w-1/2 2xl:w-1/3 md:mt-10 inline-block 2xl:my-8">
        {/* title */}
        <h1 className="text-center font-bold mb-1 lg:mb-2 mt-5 lg:mt-8 text-primary text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
          Forum Rules
        </h1>

        {/* form */}
        <form
          ref={formRef}
          className="px-5 md:px-8 py-2"
          onSubmit={handleSubmit}
        >
          {/* if rules.length, then add an input field for each of the rule */}
          {rules.length &&
            rules.map((rule, index) => (
              <div
                className="flex items-center justify-between my-4"
                key={index}
              >
                <input
                  type="text"
                  name={`rule-${index}`}
                  value={rule}
                  onChange={(e) => handleChange(e, index)}
                  placeholder="Forum Rule"
                  className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181]
                      focus:outline-none focus:border-sky-500"
                  required
                />

                {/* delete button */}
                <button
                  title="Delete Rule"
                  type="button"
                  onClick={() => handleDelete(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 inline mt-1.5 stroke-[#818181] dark:stroke-gray-300 mx-1 ml-2 hover:scale-110 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            ))}

          {/* add button */}
          <div className="mt-4 my-2 text-center" onClick={addNewRule}>
            <button className="hover:underline transition-all hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 inline mx-1 fill-[#818181] dark:fill-gray-300"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Add Rule
            </button>
          </div>

          <ActionButtons
            path={`/forums/${forumId}`}
            action="Save"
            classes="my-4 md:my-5 2xl:my-6 float-right"
          />
        </form>
      </section>
    </main>
  );
}

export default withRouter(AddRules);
