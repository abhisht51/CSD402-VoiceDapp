import Gun from "gun";
import "gun/sea";
import router, { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

// const gun = Gun({
//   peers: [
//     // "https://csd-402-voice-dapp-git-main-abhisht51.vercel.app",
//     // "https://csd-402-voice-dapp.vercel.app",
//     // "https://csd-402-voice-dapp-abhisht51.vercel.app",
//     "http://localhost:3000",
//     "https://94809fc24c17.ngrok.io",
//     // "http://gun-manhattan.herokuapp.com/gun",
//   ],
// });
const gun = Gun({
  peers: [
    "https://gun-server-app.herokuapp.com/gun",
    // "http://localhost:3030/gun",
    // "http://f1468e19e0c4.ngrok.io/gun",
  ],
});

const appRef = gun.get("gun-chat");

// csd-402-voice-dapp-git-main-abhisht51.vercel.app
// csd-402-voice-dapp.vercel.app
// csd-402-voice-dapp-abhisht51.vercel.app
const UserProvider = (props) => {
  const router = useRouter();

  const [profile, setProfile] = useState({});
  const user = gun.user().recall({ sessionStorage: true });
  const [channels, setChannels] = useState([]);
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedChannelstate, setSelectedChannel] = useState();
  let [meetingAuthToken, setMeetingAuthToken] = useState("");

  useEffect(() => {
    console.log(channels);
  }, [channels]);

  const thisCourseExists = (courseCode) => {
    return !!channels.find((channel) => channel.channelCode === courseCode);
  }

  function getData() {
    setChannels([]);
    appRef
      .get("courses")
      .map()
      .on(function (courseObject, id) {
        if (courseObject && !thisCourseExists(courseObject.courseCode)) {
          setChannels((oldData) => [
            ...oldData,
            {
              channelName: courseObject.courseName,
              channelCode: courseObject.courseCode,
              courseRoomId: courseObject.courseRoomId,
              courseRoomName: courseObject.courseRoomName,
            },
          ]);

          appRef.get(`${courseObject.courseCode}`).once((v) => {
            if (!v) appRef.get(`${courseObject.courseCode}`).put({});
          });
        }
      });
  }

  useEffect(async () => {
    user.get("alias").on((v) => {
      setUsername(v);

      appRef
        .get("users")
        .get(`${v}`)
        .get("profile")
        .once((data) => {
          setProfile(data);
        });

      router.push("/chatpage");
    });

    gun.on("auth", async (event) => {
      const alias = await user.get("alias");
      if (alias) {
        setLoggedin(true);
      }
    });

    return () => {
      gun.off();
      user.get("alias").off();
    };
  }, []);

  useEffect(() => {
    getData();
  }, [username]);

  return (
    <UserContext.Provider
      value={{
        gun,
        appRef,
        profile,
        user,
        channels,
        loggedinState: { loggedin, setLoggedin },
        usernameState: { username, setUsername },
        selectedChannelState: { selectedChannelstate, setSelectedChannel },
        meetingAuth: { meetingAuthToken, setMeetingAuthToken },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
