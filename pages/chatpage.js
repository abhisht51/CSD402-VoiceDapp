import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Chat from "../components/chat";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/userContext";
import styles from "../styles/app.module.css";

export default function ChatPage() {
  const {
    selectedChannelState: { selectedChannelstate },
  } = useContext(UserContext);

  let selectedChannel = selectedChannelstate;

  return (
    <div className={styles.app}>
      <Sidebar selectedChannel={selectedChannel} />
      <Chat selectedChannel={selectedChannel} />
    </div>
  );
}
