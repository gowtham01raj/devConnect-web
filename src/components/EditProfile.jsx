import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeedCard from "./feedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setlastName] = useState(user?.lastName);
  const [emailId, setEmailId] = useState(user?.emailId);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          emailId,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      const i = setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10 ">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Your Profile saved Successfully.</span>
          </div>
        </div>
      )}
      <div className="mx-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4  justify-center">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">firstName</label>
          <input
            type="text"
            className="input"
            placeholder="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">lastName</label>
          <input
            type="text"
            className="input"
            placeholder="lastName"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
          <label className="label">photoUrl</label>
          <input
            type="text"
            className="input"
            placeholder="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <label className="label">emailId</label>
          <input
            type="text"
            className="input"
            placeholder="emailId"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />

          <label className="label">About</label>
          <textarea
            className="textarea"
            placeholder="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          <button
            className="btn btn-neutral mt-4 hover:bg-pink-700 bg-pink-900 "
            onClick={saveProfile}
          >
            Save
          </button>
        </fieldset>
      </div>
      <FeedCard user={{ firstName, lastName, about, emailId, photoUrl }} />
    </div>
  );
};

export default EditProfile;
