import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import ListItem from "./ListItem";

function ForumList({ forums, setShowAlert }) {
  const [user] = useContext(UserContext);

  return (
    <table className="table-fixed w-full" hidden={forums.length ? false : true}>
      <thead>
        <tr>
          <th className="text-primary dark:text-primary-light font-normal text-xs lg:text-sm lg:text-base 2xl:text-2xl">
            Institute Name
          </th>
          <th className="text-primary dark:text-primary-light font-normal text-xs lg:text-sm lg:text-base 2xl:text-2xl">
            Members
          </th>
        </tr>
      </thead>

      <tbody>
        {forums.map((forum, i) => {
          return user?.forums.includes(forum._id) ? null : (
            <ListItem forum={forum} key={i} setShowAlert={setShowAlert} />
          );
        })}
      </tbody>
    </table>
  );
}

export default ForumList;
