import { withRouter } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import avatar from "../../assets/avatar.png";
import Toast from "../Toast";
import ProfileModal from "./ProfileModal";
import Input from "../FormControl/Input";
import Overlay from "../Overlay";

function UserInfo({ title, ...props }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [picture, setPicture] = useState(avatar);
  const [error, setError] = useState("");
  const inputRef = useRef();
  const imageRef = useRef();
  const cropRef = useRef();
  const modalRef = useRef();
  const [user, setUser] = useContext(UserContext);

  // redirect back to login if there is no user
  useEffect(() => {
    if (!user) props.history.push("/login");
  }, [user, props.history]);

  // Update page title
  useEffect(() => {
    document.title = title || "User Profile | CampusTalk";
  }, [title]);

  // check if user already has an name & picture
  useEffect(() => {
    if (user?.firstName) setFirstName(user.firstName);
    if (user?.lastName) setLastName(user.lastName);
    if (user?.picture) setPicture(user.picture);
  }, [firstName, lastName, picture, user]);

  function handleImageUpload() {
    inputRef.current.click();
  }

  function handlePreview(e) {
    const isImage = validateFileType(e.target);

    if (isImage) {
      changePreview(e.target);

      modalRef.current.classList.add("z-10");

      setShowModal(true);

      setError("");
    } else {
      setError("Invalid file format. Please provide an Image.");
    }
  }

  function changePreview(image) {
    if (image.files && image.files[0]) {
      imageRef.current.setAttribute(
        "src",
        window.URL.createObjectURL(image.files[0])
      );
    }
  }

  function validateFileType(file) {
    var fileName = file.value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", user.email);
    picture !== avatar && formData.append("picture", picture);

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .put(`/api/users/profile/${user._id}`, formData, headers)
      .then((res) => {
        setUser({
          ...user,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          picture: res.data.picture,
        });

        if (user.new) {
          sendVerificationMail(
            res.data.firstName,
            res.data.email,
            res.data._id
          );
        }

        user.new
          ? props.history.push("/verify")
          : props.history.push("/profile");
      })
      .catch((err) => {
        console.error(err);
        setError(err.response || err);
      });
  }

  function sendVerificationMail(name, email, id) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    let body = {
      name,
      email,
      confirmationCode: id,
    };

    axios.post("/api/mail/verification", body, headers).catch((err) => {
      console.log(err.response);
      console.error(err);
    });
  }

  return (
    <div className="w-full h-full bg-bubble flex relative flex-col justify-center items-center">
      <section className="bg-white dark:bg-darkSecondary rounded shadow-base p-2 md:p-5 w-[90%] md:w-2/3 lg:w-[40%] 2xl:w-1/3 my-14 md:my-20 2xl:my-28 mb-20 md:mb-14">
        <h1 className="text-primary dark:text-primary-light text-center text-xl pt-2 md:text-2xl">
          Tell us a bit about yourself!
        </h1>

        <form
          className="px-5 md:px-6 py-3"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* picture */}
          <div
            onClick={handleImageUpload}
            className="my-4 relative hover:scale-105 transition-all cursor-pointer"
          >
            <img
              src={
                user.picture && user.picture.includes("googleusercontent")
                  ? user.picture
                  : user.picture
                  ? `/uploads/images/${user.picture}`
                  : avatar
              }
              alt="Profile pic upload"
              className="rounded-full m-auto w-32 h-32 border-4 border-gray-400"
              title="Upload Profile Picture"
              ref={imageRef}
            />

            <div className="absolute left-1/2 bottom-[-10%] bg-white border border-gray-300 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="gray"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <input
              ref={inputRef}
              type="file"
              name="profile_picture"
              placeholder="Profile picture"
              accept="image/*"
              className="hidden"
              onChange={handlePreview}
            />
          </div>

          <p
            className="text-sm text-red-600 text-center"
            hidden={error ? false : true}
          >
            {error}
          </p>

          {/* first name */}
          <Input
            name="firstName"
            label="First Name"
            type="text"
            callback={(value) => setFirstName(value)}
            placeholder="Enter your first name"
            value={firstName}
            required={true}
          />

          {/* last name */}
          <Input
            name="lastName"
            label="Last Name"
            type="text"
            callback={(value) => setLastName(value)}
            placeholder="Enter your last name"
            value={lastName}
            required={true}
          />

          {/* Submit */}
          <div className="my-4 md:mt-6 float-right">
            <button className="px-2 md:px-3 py-1.5 mr-1 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
              {user.new ? "Next" : "Save"}
            </button>
          </div>
        </form>
      </section>

      {/* modal for image cropping */}
      <ProfileModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalRef={modalRef}
        imageRef={imageRef}
        cropRef={cropRef}
        setShowToast={setShowToast}
        setPicture={setPicture}
      />

      {/* overlay */}
      <Overlay text="Saving..." showOverlay={showModal} />

      {/* toast notification */}
      <Toast text="Profile Picture Saved" show={showToast ? true : false} />
    </div>
  );
}

export default withRouter(UserInfo);
