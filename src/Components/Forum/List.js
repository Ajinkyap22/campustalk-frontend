import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import Row from "./Row";
import LogoCropped from "../LogoCropped";

function List({ forums, forumsTab }) {
  const [user] = useContext(UserContext);

  return (
    <div>
      {forumsTab === "userForums" && (!user || user?.forums.length === 0) ? (
        <div className="text-center py-4">
          <LogoCropped color="rgba(98, 98, 98, 0.9)" width="100" />
          <p className="text-center my-3 text-gray-700 dark:text-gray-300">
            You have not joined any forums yet.
          </p>
          <p className="text-mxs w-2/3 md:w-1/3 mx-auto text-center my-3 text-gray-700 dark:text-gray-300">
            (If you have joined a forum but don't see it here, it means your
            request hasn't been accepted yet).
          </p>
        </div>
      ) : (
        <table
          className="table-fixed w-[90%] md:w-3/4 lg:w-[60%] m-auto bg-white dark:bg-darkSecondary shadow-base mt-8"
          hidden={forums.length === 0}
        >
          <thead>
            <tr>
              <th className="text-primary dark:text-primary-dark font-normal text-xs md:text-sm 2xl:text-2xl">
                Institute Name
              </th>
              <th className="text-primary dark:text-primary-dark font-normal text-xs md:text-sm 2xl:text-2xl">
                Members
              </th>
            </tr>
          </thead>
          <tbody>
            {forums.map((forum, i) => (
              <Row forum={forum} key={i} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default List;
