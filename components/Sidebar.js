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
// import { ReactComponent as Logo } from "../public/voice_app_logo.svg";

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
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 626 621"
          style={{
            width: "25%",
          }}
        >
          <title>Artboard 1</title>
          <path
            style={{
              fill: "#7188d9",
            }}
            d="M484.2,78.5c-1.6,6-24.6,48.1-28.5,52.3-4.9,5.1-14,9.2-20.3,9.2-16.7,0-30.2-13.4-31.2-30.9-.2-4.1.1-9.1.7-11.2s6.6-13.9,13.2-26.3c12.8-23.9,14.7-26.3,24-30.6a26.88,26.88,0,0,1,10.25-2h1.59A30.24,30.24,0,0,1,465.6,41.4a41.3,41.3,0,0,1,8.5,5.4C481.6,53.3,486.7,69.3,484.2,78.5Z"
          />
          <path
            style={{
              fill: "#7188d9",
            }}
            d="M123.5,305.5c-22.4-41.8-44.2-81.9-48.5-89.1C63.5,197,60.2,189.3,59,179c-.9-7.6-.7-9.5,1.1-16.1,2.7-9.9,6.2-15.9,12.6-22,9.4-8.9,22.4-13.1,33.8-10.9,8.9,1.7,17.9,6.5,23.1,12.4,14.2,15.7,15.3,33.7,3.4,52.3-4.5,6.8-4.4,21.6.1,30.7,9.6,19,34.5,23.4,48.9,8.6,3.4-3.5,13.3-20.7,40.5-69.9,19.8-35.9,37.7-67.3,39.8-69.6,6.4-7.4,17.3-12.8,24.1-12.1,2.1.2,6.7,1.8,10.2,3.6a33.43,33.43,0,0,1,16.6,17.9c3,7.6,3,19.6.1,26.2-2.4,5.3-21.4,39.8-27.8,50.4-2.3,3.8-7,12.4-10.5,19s-18.2,33.4-32.7,59.5-27.1,49.9-28,52.9c-4.5,15.5,3.1,33.2,17.3,40.2,3.9,1.9,6.4,2.4,12.4,2.3,9-.1,14.8-2.5,20.9-8.7,4.5-4.5,7.3-9.5,60.7-107.7,38.7-71.3,38.7-71.3,51.2-75,11.4-3.5,20.6-1.3,29.4,6.9,6.6,6,10.1,13.8,10.6,23.7.5,10.1-.3,13-8.3,26.4-13.3,22.5-38.4,69.8-39.6,74.3-1.5,6.3-.7,16.1,1.9,22.1,3.3,7.4,7.5,12,14.4,15.6,5.4,2.9,7.2,3.3,13.4,3.3,8.9,0,16.5-3.3,22.1-9.7,2.9-3.3,79.5-142,90.6-164.1a34.69,34.69,0,0,1,14.3-14.1c7.7-3.8,17.7-3.9,24.9-.4,14,7,21.5,24.1,17.2,39.1-.9,3-10,21.1-20.3,40.4-21,39.6-28.3,53.9-35.9,70.7a160.88,160.88,0,0,1-8.3,16.2c-7,10.4-20.2,34.4-57.2,104.1-21.6,40.7-44.5,83.9-51,96s-14.7,27.6-18.4,34.5c-11.5,21.6-20,30.8-35.2,38-26.1,12.5-59,4.1-76.4-19.5-2.1-2.8-18.5-32.6-36.5-66.1-31.3-58.3-48.2-89.3-51.1-94.1"
          />
        </svg>
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

      <div
        className={styles.sidebar__voice}
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
        <FaSignal className={styles.sidebar__voiceIcon} fontSize="large" />
        <div className={styles.sidebar__voiceInfo}>
          <h3>Join Call</h3>
          <p>Stream</p>
        </div>

        <div className={styles.sidebar__voiceIcons}>
          <button>
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
