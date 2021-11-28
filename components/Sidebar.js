import React from "react";
import styles from "../styles/sidebar.module.css";
import {
  FaAngleDown,
  FaPlus,
  FaSignal,
  FaInfoCircle,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import SidebarChannel from "./SidebarChannel";
import Avatar from "./Avatar";
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import Link from "next/link";
import { joinRoom } from "../utils/utils";

function Sidebar({ selectedChannel }) {
  const {
    gun,
    channels,
    selectedChannelState: { setSelectedChannel },
    usernameState: { username },
    meetingAuth: { setMeetingAuthToken },
  } = useContext(UserContext);

  const [userType, setUserType] = useState("");

  const handleSetChannel = (channelObject) => {
    selectedChannel = channelObject;
    setSelectedChannel(channelObject);
  };

  useEffect(() => {
    gun
      .get("gun-chat")
      .get("users")
      .get(`${username}`)
      .get("profile")
      .get("userType")
      .once((v) => {
        if (v) setUserType(v);
      });
  }, []);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h3 className={styles.logo}>Voice</h3>
      </div>
      <div className={styles.sidebar__channels}>
        <div className={styles.sidebar__channelsHeader}>
          <div className={styles.sidebar__header}>
            <h4>Text Channels</h4>
          </div>
        </div>
        <div className={styles.sidebar__channelsList}>
          {channels.map((channel, index) => (
            <SidebarChannel
              id={index}
              key={channel.channelCode}
              channel={channel.channelName}
              channelObject={channel}
              handleSetChannel={handleSetChannel}
              isSelected={
                selectedChannel &&
                selectedChannel.channelCode === channel.channelCode
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.sidebar__voice}>
        <FaSignal className={styles.sidebar__voiceIcon} fontSize="large" />

        <div className={styles.sidebar__voiceInfo}>
          <h3>Connect to Voice</h3>
          <p>Stream</p>
        </div>

        <div className={styles.sidebar__voiceIcons}>
          <button
            onClick={async () => {
              joinRoom(
                selectedChannel.courseRoomId,
                selectedChannel.courseRoomName,
                true,
                username
              )
                .then((authToken) => {
                  setMeetingAuthToken(authToken);
                })
                .then(() => {
                  router.push("/videocall");
                });
            }}
          >
            <a>
              <FaPhoneAlt className={styles.right_icons} />
            </a>
          </button>
        </div>
      </div>

      <div className={styles.sidebar__profile}>
        <Avatar name={username} sidebar={true} />
        <div className={styles.sidebar__profileInfo}>
          <h3>{username}</h3>
          <p>{userType}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
