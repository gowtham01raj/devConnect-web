import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const FeedCard = ({ user }) => {
  const dispatch = useDispatch();
  const sendRequest = async (status, _id) => {
    const res = await axios.post(BASE_URL + `/request/send/${status}/${_id}`,{},{withCredentials:true});
    console.log(res.data.data);
    dispatch(removeUserFromFeed(_id));
  };
  
  const { photoUrl, firstName, lastName, skills, about, _id } = user;
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm border-gray-600 border my-5 mx-5">
        <figure>
          <img src={photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          <p>{skills}</p>
          <div className="card-actions  justify-center flex">
            <button
              className="btn btn-primary bg-pink-900"
              onClick={() => sendRequest("ignored", _id)}
            >
              Ignored
            </button>
            <button
              className="btn btn-primary bg-green-600"
              onClick={() => sendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
