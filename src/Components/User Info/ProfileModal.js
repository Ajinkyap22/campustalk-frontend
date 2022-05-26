import AvatarEditor from "react-avatar-editor";

function ProfileModal({
  showModal,
  setShowModal,
  modalRef,
  imageRef,
  cropRef,
  setShowToast,
  setPicture,
}) {
  function closeModal() {
    setShowModal(false);
  }

  function cropImage() {
    modalRef.current.classList.remove("z-10");

    setTimeout(() => {
      let cropped = cropRef.current.getImage();

      cropped.toBlob((blob) => {
        let file = new File([blob], "picture.jpg", { type: "image/jpeg" });
        setPicture(file);
      }, "image/jpeg");

      let imageURL = cropped.toDataURL();

      if (cropRef) {
        imageRef.current.setAttribute("src", imageURL);

        setShowModal(false);

        setShowToast(true);
      }
    }, 100);
  }

  return (
    <div
      ref={modalRef}
      className="absolute bg-white dark:bg-dark rounded shadow-lg pb-5 z-10 w-[95%] xsm:w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] my-14 md:my-20 2xl:my-28 mb-20 md:mb-14"
      hidden={showModal ? false : true}
    >
      <h1 className="text-primary dark:text-primary-light text-xl p-4 align-middle">
        Adjust Profile Picture
      </h1>

      <button onClick={closeModal} className="absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#999999"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="w-full editor bg-black">
        <AvatarEditor
          image={imageRef.current?.getAttribute("src")}
          ref={cropRef}
          width={250}
          height={250}
          border={50}
          borderRadius={120}
          color={[255, 255, 255, 0.6]}
          scale={1}
          rotate={0}
          style={{ margin: "auto" }}
        />
      </div>

      {/* Save image */}
      <div className="mt-5 mx-6 flex justify-end">
        <button
          className="px-2 md:px-3 text-sm md:text-base 2xl:text-lg py-2 mr-1 text-[#818181] dark:text-gray-300"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          onClick={cropImage}
          className="px-2 md:px-3 py-2 ml-1 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;
