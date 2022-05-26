import { Link } from "react-router-dom";

function ActionButtons({ path, action, classes = "" }) {
  return (
    <div className={classes || "mt-3"}>
      <Link
        to={path}
        className="px-2 md:px-3 text-xs md:text-sm lg:text-base 2xl:text-lg py-1.5 lg:py-2 mr-1 text-[#818181]"
      >
        Cancel
      </Link>
      <button className="px-2 md:px-3 py-1.5 lg:py-2 ml-1 text-xs md:text-sm lg:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
        {action}
      </button>
    </div>
  );
}

export default ActionButtons;
