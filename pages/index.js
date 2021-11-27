import Gun, { SEA } from "gun";
import { useContext, useEffect, useState } from "react";
// import Login from "../components/Login";
// import Login from "./login";
import styles from "../styles/chat.module.css";
import { UserContext } from "../context/userContext";
import { useRouter } from "next/router";

// const gun = Gun(["localhost:3000/gun", "gun-app.vercel.app/gun"]);
// const gun = Gun();

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

    // const alias = await user.get("alias");
    // console.log("before alias");
    // console.log("alias",alias);

    if (loggedin) {
      router.push("/chat");
      // console.log(alias);
    } else {
      // console.log("no alias");
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
