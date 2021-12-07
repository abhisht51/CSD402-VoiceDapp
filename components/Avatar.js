import router from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import styles from "../styles/avatar.module.css";

function Avatar({ name, sidebar }) {
  const {
    user,
    usernameState: { setUsername },
    loggedinState: { setLoggedin },
  } = useContext(UserContext);

  const handleSignout = () => {
    console.log("signout");
    user.leave();
    setUsername("");
    setLoggedin(false);
    router.push("/login");
  };

  function getInitials(userName) {
    var initials = "";
    var stripName = userName.trim();

    if (stripName.length == 0) return initials;

    var nameArray = stripName.split(" ");

    if (nameArray.length == 1) {
      if (nameArray[0].length == 1) {
        initials = nameArray[0].charAt(0);
      } else {
        initials = nameArray[0].substring(0, 2);
      }
    } else {
      initials = nameArray[0].charAt(0) + nameArray[1].charAt(0);
    }
    return initials.toUpperCase();
  }

  return (
    <button onClick={sidebar && handleSignout} className={sidebar && styles.tooltip}>
      {sidebar && <span className={styles.tooltiptext}>Logout</span>}
      <div className={styles.avatar}>
        <h4 className={styles.avatar__text}>{getInitials(name)}</h4>
      </div>
    </button>
  );
}

export default Avatar;
