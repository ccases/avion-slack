import React, { useState, useEffect } from "react";
import ChatArea from "./ChatArea";
import ChatForm from "./ChatForm";
import "./Chat.css";
import ChatHeader from "./ChatHeader";

function Chat(props) {
  const { chat, recentDms, userDb, setRecentDms, setUserDb } = props;
  const [chatWith, setChatWith] = useState("");
  const [convo, setConvo] = useState([]);
  const [chatType, setChatType] = useState("User"); // can be Channel, CAPITALIZE FIRST LETTER!

  useEffect(() => {
    if (!chat) return;
    if (chat["owner_id"] !== undefined) {
      // if object passed has owner id, set chat type to channel!
      setChatType("Channel");
      setChatWith(chat);
    } else if (chat["email"] !== undefined) {
      // if chat has property: email, single user lang siya
      setChatType("User");
      setChatWith(chat);
    }
  }, [chat]);

  return (
    <div className="chat">
      <div className="chat-header">
        <ChatHeader
          chat={chat}
          chatType={chatType}
          userDb={userDb}
          setUserDb={setUserDb}
        />
      </div>
      <ChatArea
        userId={chatWith.id}
        userEmail={chatWith.uid}
        convo={convo}
        setConvo={setConvo}
        chatType={chatType}
        recentDms={recentDms}
        setRecentDms={setRecentDms}
        chat={chat}
        userDb={userDb}
      />
      <ChatForm
        userId={chatWith.id}
        setConvo={setConvo}
        convo={convo}
        userEmail={chatWith.uid}
        chatType={chatType}
      />
    </div>
  );
}

export default Chat;
