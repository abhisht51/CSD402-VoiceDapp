import Gun from "gun";
import "gun/sea";
import router, { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const gun = Gun();

const UserProvider = (props) => {
  const router = useRouter();

  const [profile, setProfile] = useState({});
  const user = gun.user().recall({ sessionStorage: true });
  const [channels, setChannels] = useState([]);
  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedChannelstate, setSelectedChannel] = useState();
  let [meetingAuthToken, setMeetingAuthToken] = useState("");

  function getData() {
    setChannels([]);
    gun
      .get("gun-chat")
      .get("courses")
      .map()
      .on(function (courseObject, id) {
        if (courseObject) {
          setChannels((oldData) => [
            ...oldData,
            {
              channelName: courseObject.courseName,
              channelCode: courseObject.courseCode,
              courseRoomId: courseObject.courseRoomId,
              courseRoomName: courseObject.courseRoomName,
            },
          ]);

          gun
            .get("gun-chat")
            .get(`${courseObject.courseCode}`)
            .once((v) => {
              if (!v)
                gun.get("gun-chat").get(`${courseObject.courseCode}`).put({});
            });
        }
      });
  }

  useEffect(async () => {
    user.get("alias").on((v) => {
      setUsername(v);

      gun
        .get("gun-chat")
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
