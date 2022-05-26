import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import Member from "./Member";

function Members({
  members,
  moderators,
  removeMember,
  makeModerator,
  dismissModerator,
}) {
  const [moderatorsList, setModeratorsList] = useState({});
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    // create a hashmap of moderators
    let moderatorsHashMap = {};

    moderators.forEach((moderator) => {
      moderatorsHashMap[moderator._id] = true;
    });

    // update the state
    setModeratorsList(moderatorsHashMap);
  }, [moderators]);

  return (
    <div className="bg-white dark:bg-darkSecondary shadow-base w-full lg:min-w-[28rem] xl:min-w-[32rem] lg:rounded">
      {members.map((member, i) => (
        <Member
          key={i}
          members={members}
          member={member}
          moderatorsList={moderatorsList}
          user={user}
          removeMember={removeMember}
          makeModerator={makeModerator}
          dismissModerator={dismissModerator}
          i={i}
        />
      ))}
    </div>
  );
}

export default Members;
