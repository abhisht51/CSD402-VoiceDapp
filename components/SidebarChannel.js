import React from "react";
import styles from "../styles/sidebar.module.css";

function SidebarChannel({ channel, handleSetChannel, channelObject, isSelected }) {
  return (
    <div
      className={isSelected ? styles.sidebarChannel_selected : styles.sidebarChannel}
      onClick={() => handleSetChannel(channelObject)}
    >
      <h4>
        <span className={styles.sidebarChannel__hash}>#</span>
        {channel}
      </h4>
    </div>
  );
}

export default SidebarChannel;
