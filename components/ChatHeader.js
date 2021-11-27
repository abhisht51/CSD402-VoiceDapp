import React, { useContext, useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaTelegramPlane,
  FaUsers,
  FaTimes,
} from "react-icons/fa";
import { UserContext } from "../context/userContext";
import styles from "../styles/chat.module.css";

function ChatHeader({
  allMessages,
  setFilterMessages,
  setIsFiltering,
  setSearchValue,
  searchValue,
}) {
  const {
    selectedChannelState: { selectedChannelstate },
  } = useContext(UserContext);

  const [matchCount, setMatchCount] = useState(0);

  useEffect(() => {
    if (searchValue.length > 0) {
      setIsFiltering(true);
      const messages = allMessages.filter((message) => {
        return message.what.toLowerCase().includes(searchValue.toLowerCase());
      });

      setFilterMessages(messages);
      setMatchCount(messages.length);
    } else setIsFiltering(false);
  }, [searchValue]);

  return (
    <div className={styles.chatHeader}>
      <div className={styles.chatHeader__left}>
        <h3>
          <span className={styles.chatHeader__hash}>#</span>
          {selectedChannelstate && selectedChannelstate.channelName}
        </h3>
      </div>

      <div className={styles.chatHeader__right}>
        <div className={styles.chatHeader__search}>
          <input
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          ></input>
          {searchValue.length <= 0 && (
            <FaSearch className={styles.chatHeader__icons} />
          )}
          {searchValue.length > 0 &&
            (matchCount <= 0 ? (
              <div className="text-red-500">
                <FaTimes className={styles.chatHeader__icons} />
              </div>
            ) : (
              matchCount
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
