import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionData = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",

        { withCredentials: true }
      );
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionData) return;
  if (connectionData.length === 0) {
    return <div>Connections is not available. Please add some connections</div>;
  }
  return (
    <div className=" text-white  justify-center">
      <h1 className=" font-bold text-2xl">Connections</h1>
      {connectionData.map((connections) => {
        const { firstName, lastName, photoUrl, about, _id } = connections;
        return (
          <div className="m-4 p-4 bg-base-300 rounded-lg flex mx-20">
            <img className="w-20 h-20" src={photoUrl} />
            <div className="flex flex-wrap mx-5">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
            </div>
            <Link to={"/chat/" + connections._id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
