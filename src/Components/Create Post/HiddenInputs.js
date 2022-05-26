function HiddenInputs({
  setFile,
  imageInput,
  videoInput,
  docInput,
  setFileType,
  setOriginalFileNames,
}) {
  function handleImageFileChange(e) {
    // get all files
    const files = e.target.files;
    // create an empty array
    const images = [];
    const fileNames = [];

    let size = 0;

    // loop through all files
    for (let i = 0; i < files.length; i++) {
      // check if the file is an image
      if (files[i].type.match("image.*")) {
        // push the file to the array
        images.push(files[i]);
        fileNames.push({ name: files[i].name, type: "image" });

        // add the file size to the size variable
        size += files[i].size;
      } else {
        // if the file is not an image, alert the user
        alert("Please select an image file");

        // set formData.file to null
        setFile(null);

        // reset the input
        imageInput.current.value = "";

        // break the loop, we don't need to check the rest of the files
        return;
      }

      // if the array has more than 12 files
      if (images.length > 10) {
        // remove the last file
        images.pop();
        fileNames.pop();
      }
    }

    // check if the size is greater than 20mb
    if (size > 20971520) {
      // alert the user
      alert("Total file size must be less than 50mb");

      // set formData.file to null
      setFile(null);

      // reset the input
      imageInput.current.value = "";

      return;
    }

    // set the formData
    setFile(images);
    setOriginalFileNames(fileNames);

    setFileType("image");
  }

  function handleVideoFileChange(e) {
    // get the file
    const file = e.target.files[0];

    // check if file size is greater than 50mb
    if (file.size > 50485760) {
      // alert the user
      alert("File size must be less than 50mb");

      // set formData.file to null
      setFile(null);
      setOriginalFileNames([]);

      // reset the input
      videoInput.current.value = "";

      return;
    }

    // check if the file is a video
    if (file.type.match("video.*")) {
      // set the formData
      setFile(file);
      setOriginalFileNames([{ name: file.name, type: "video" }]);

      setFileType("video");
    } else {
      // alert the user that the file is not a video
      alert("Please select a video file");

      // set the formData
      setFile(null);
      setOriginalFileNames([]);

      // reset the input
      videoInput.current.value = "";
    }
  }

  function handleDocFileChange(e) {
    // get the file
    const file = e.target.files[0];

    // check if file size is greater than 10mb
    if (file.size > 10485760) {
      // alert the user
      alert("File size must be less than 10mb");

      // set formData.file to null
      setFile(null);
      setOriginalFileNames([]);

      // reset the input
      docInput.current.value = "";

      return;
    }

    // check if the file is either a pdf, doc, docx, txt, ppt, pptx, xls, xlsx, or csv
    if (
      file.type.match("application/pdf") ||
      file.type.match("application/msword") ||
      file.type.match(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) ||
      file.type.match("text/plain") ||
      file.type.match("application/vnd.ms-powerpoint") ||
      file.type.match(
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) ||
      file.type.match("application/vnd.ms-excel") ||
      file.type.match(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) ||
      file.type.match("text/csv")
    ) {
      // set the formData
      setFile(file);
      setOriginalFileNames([
        { name: file.name, type: file.type, size: file.size },
      ]);

      setFileType("doc");
    } else {
      // alert the user that the file is not a doc
      alert("Please select a doc file");

      // set the formData
      setFile(null);
      setOriginalFileNames([]);

      // reset the input
      docInput.current.value = "";
    }
  }

  return (
    <div>
      {/* image input, accept only images */}
      <input
        onChange={handleImageFileChange}
        ref={imageInput}
        type="file"
        name="file"
        accept="image/*"
        multiple
        className="hidden"
        data-max-size="20971520"
      />

      {/* video inputm accept only videos */}
      <input
        onChange={handleVideoFileChange}
        ref={videoInput}
        type="file"
        name="file"
        accept="video/*"
        className="hidden"
        data-max-size=" 10485760"
      />

      {/* docs input - accept only pdf|doc|docx|ppt|pptx|xls|xlsx */}
      <input
        onChange={handleDocFileChange}
        ref={docInput}
        type="file"
        name="file"
        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
        data-max-size="10485760"
      />
    </div>
  );
}

export default HiddenInputs;
