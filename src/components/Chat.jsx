import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const user = useSelector((store) => store.user);
  const fromUserId = user?._id;
  const firstName = user?.firstName;

  const fetchMessages = async () => {
    const chat = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
      withCredentials: true,
    });
    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg.text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchMessages();
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, fromUserId, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [fromUserId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      fromUserId,
      targetUserId,
      text: newMessages,
    });
    setNewMessages("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>

      <div className="p-2 border-t flex items-center w-full my-auto">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-full border outline-none text-sm"
          value={newMessages}
          onChange={(e) => setNewMessages(e.target.value)}
        />
        <button
          className="ml-2 text-green-600 hover:text-green-800"
          onClick={() => sendMessage()}
          Ent
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;
