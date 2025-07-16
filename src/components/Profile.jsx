import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
    const userData = useSelector((store) => store.user);

  return <EditProfile user={userData} />;
};

export default Profile;
