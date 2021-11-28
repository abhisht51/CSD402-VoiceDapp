import { useContext, useEffect, useState } from "react";
import styles from "../styles/chat.module.css";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/router";

export default function Home() {
  const {
    gun,
    user,
    channels,
    usernameState: { username, setUsername },
    loggedinState: { loggedin, setLoggedin },
    selectedChannelState: { setSelectedChannel },
  } = useContext(UserContext);

  let selectedChannel = channels[0];

  const router = useRouter();

  useEffect(async () => {
    channels.forEach((channel) => {
      gun
        .get("gun-chat")
        .get(channel.channelCode)
        .map()
        .on((data) => {
          console.log(data);
        });
    });

    if (loggedin) {
      router.push("/chatpage");
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    setSelectedChannel(selectedChannel);
  }, [selectedChannel]);

  return (
    <div>
      {/* {loggedin && (
        <div>
          <span>Logged in as {username} </span>
          <button
            onClick={async () => {
              // console.log(await appRef.get(selectedChannel));
              console.log("signout");
              user.leave();
              setUsername("");
              setLoggedin(false);
            }}
          >
            Signout
          </button>
        </div>
      )}
      <Chat /> */}
    </div>
  );
}
