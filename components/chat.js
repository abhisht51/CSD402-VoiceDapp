import React from "react";
import styles from "../styles/chat.module.css";
import ChatHeader from "../components/ChatHeader";
import Message from "../components/Message";
import { FaSmile } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";


import { DyteMeeting } from "dyte-client";
import { createRoom, joinExistingRoom, joinRoom } from "../utils/utils";
const orgId = process.env.NEXT_PUBLIC_DYTE_ORG_ID;

const ENCRYPTION_KEY = "#encryptionkey";

function Chat({ selectedChannel }) {
  const {
    user,
    gun,
    appRef,
    loggedinState: { loggedin },
    channels,
    selectedChannelState: { selectedChannelstate, setSelectedChannel },
  } = useContext(UserContext);

  let channelCode = selectedChannel && selectedChannel.channelCode;

  const router = useRouter();

  const [newMessage, setNewMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filterMessages, setFilterMessages] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const messageIds = [];

  const sendMessage = async (e) => {
    e && e.preventDefault();

    const secret = await SEA.encrypt(newMessage, ENCRYPTION_KEY);
    const message = user.get("all").set({ what: secret });
    const index = new Date().toISOString();
    appRef.get(`${channelCode}`).get(index).put(message);
    setNewMessage("");
  };

  const getMessages = () => {
    setAllMessages([]);
    let messages = [];
    appRef
      .get(`${channelCode}`)
      .map()
      .on(
        async function (data) {
          const messageUser = await gun.user(data).get("alias");
          const id = data["_"]["#"].substring(
            data["_"]["#"].indexOf("/") + 1,
            data["_"]["#"].length
          );
          if (data) {
            let type;
            gun
              .get("gun-chat")
              .get(`${messageUser}`)
              .get("profile")
              .get("userType");
            let message = {
              id: id,
              who: messageUser,
              type: type,
              what: (await SEA.decrypt(data.what, ENCRYPTION_KEY)) + "",
              when: GUN.state.is(data, "what"),
            };
            if (message.what && !messageIds.includes(id)) {
              messageIds.push(id);
              messages = [...messages.slice(-100), message];
              setAllMessages(messages.sort((a, b) => a.when - b.when));
            }
          }
        },
        {
          change: true,
        }
      );
  };

  useEffect(() => {
    setSelectedChannel(channels[0]);
  }, []);

  useEffect(() => {
    getMessages();
  }, [selectedChannelstate]);

  const [title, setTitle] = useState("testTitle");
  const [authToken, setAuthToken] = useState("");
  const [roomName, setRoomName] = useState("");

  return (
    <div className={styles.chat}>
      {authToken && roomName && (
        <DyteMeeting
          onInit={(meeting) => {
            console.log("Init meeting component");
          }}
          clientId={orgId} // orgId || clientId
          meetingConfig={{
            roomName: roomName,
            authToken: authToken,
            apiBase: "https://api.cluster.dyte.in",
          }}
        />
      )}
      <ChatHeader
        allMessages={allMessages}
        setIsFiltering={setIsFiltering}
        setFilterMessages={setFilterMessages}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />

      <div className={styles.chat_messages}>
        {allMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            searchTerm={searchValue}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chat__input}>
        <div>
          <input
            type="text"
            value={newMessage}
            className={styles.send_message_input}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message in #This Channel`}
          />
        </div>

        <div className={styles.chat__inputIcons}>
          <button
            onClick={async () => {
              /** Creating a room with a room title */
              const createRoomResp = await createRoom(title);
              const { id, roomName } = createRoomResp.meeting;

              /** we use meeting id, roomName (different from title) to join a room
               * the third param is for role. i.e host or not etc
               */
              const authToken = await joinRoom(id, roomName, true);
              setRoomName(roomName);
              setAuthToken(authToken);
            }}
          >
            <FaSmile className={styles.chat__inputIcon} fontSize="large" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
