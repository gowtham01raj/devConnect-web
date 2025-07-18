import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    const res = await axios.post(
      BASE_URL + `/request/review/${status}/${_id}`,
      {},
      { withCredentials: true }
    );

    dispatch(removeRequests(_id));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return <div>requests is not available. </div>;
  }
  return (
    <div className=" text-white  justify-center">
      <h1 className=" font-bold text-2xl">Connections</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, about } =
          request.fromUserId;
        return (
          <div key={_id} className="m-4 p-4 bg-base-300 rounded-lg flex mx-20">
            <img className="w-20 h-20" src={photoUrl} />
            <div className="flex flex-wrap mx-5">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
            </div>
            <div className="">
              <button
                className="btn btn-dash btn-warning m-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accepted
              </button>
              <button
                className="btn btn-dash btn-error m-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Ignored
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Request;
