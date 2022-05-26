function ProgressBar({ progress }) {
  return (
    <div
      className="w-full lg:w-[26rem] xl:w-[30rem] 2xl:w-[34rem] 3xl:w-[38rem] my-4 bg-gray-200 rounded-full dark:bg-gray-700 z-10"
      hidden={!progress}
    >
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${progress}%` }}
      >
        {" "}
        {progress}%
      </div>
    </div>
  );
}

export default ProgressBar;
