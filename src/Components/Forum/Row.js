import { Link } from "react-router-dom";

function Row({ forum }) {
  return (
    <tr className="text-center py-4 dark:bg-[#89b8ff]">
      <td className="text-xsm pl-3 md:text-sm 2xl:text-lg dark:text-dark">
        {forum.forumName}
      </td>

      <td className="text-xsm md:text-sm 2xl:text-lg dark:text-dark">
        {forum.members.length}
      </td>

      <td>
        <button className="px-3 py-1 md:py.1.5 lg:py-1 xl:py-1.5 my-2 text-xsm md:text-sm xl:my-2 2xl:text-lg 2xl:px-4 2xl:my-3 bg-primary border border-primary text-white  rounded-full hover:bg-blue-700">
          <Link to={`/forums/${forum._id}`}>Visit</Link>
        </button>
      </td>
    </tr>
  );
}

export default Row;
