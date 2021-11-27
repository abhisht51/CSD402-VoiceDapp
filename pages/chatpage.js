import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/userContext";
import styles from "../styles/app.module.css";

export default function ChatPage() {
  const {
    usernameState: { username },
    selectedChannelState: { selectedChannelstate, setSelectedChannel },
  } = useContext(UserContext);

  let selectedChannel = selectedChannelstate;
  // console.log(selectedChannel);

  const router = useRouter();

  return (
    <div className={styles.app}>
      <Sidebar selectedChannel={selectedChannel} />
      <Chat selectedChannel={selectedChannel} />
    </div>
  );
}
