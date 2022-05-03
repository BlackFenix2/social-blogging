import { BlogUser } from "lib/context";
import React from "react";

type Props = {
  user: BlogUser;
};

const UserProfile = ({ user }: Props) => {
  return (
    <div className="box-center">
      <img src={user?.photoURL || "/hacker.png"} className="card-img-center" />
      <p>
        <i>@{user?.username}</i>
      </p>
      <h1>{user?.displayName || "Anonymous User"}</h1>
    </div>
  );
};

export default UserProfile;
