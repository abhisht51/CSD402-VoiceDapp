import React, { useEffect, useState } from "react";
// import { UserContext } from "../context/userContext";
import { DyteMeeting } from "dyte-client";
import { createRoom, joinExistingRoom, joinRoom } from "../utils/utils";
const orgId = process.env.NEXT_PUBLIC_DYTE_ORG_ID;

export default function VideoCall() {
  //   const {
  //     usernameState: { username },
  //     selectedChannelState: { selectedChannelstate, setSelectedChannel },
  //   } = useContext(UserContext);

  const [title, setTitle] = useState("testTitle");
  const [authToken, setAuthToken] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(async () => {
    /** Creating a room with a room title */
    const createRoomResp = await createRoom(title);
    const { id, roomName } = createRoomResp.meeting;

    /** we use meeting id, roomName (different from title) to join a room
     * the third param is for role. i.e host or not etc
     */
    const authToken = await joinRoom(id, roomName, true);
    setRoomName(roomName);
    setAuthToken(authToken);
  }, []);

  return (
    <>
      {authToken && roomName && (
        <DyteMeeting
          onInit={(meeting) => {
            console.log("Init meeting component");
          }}
          clientId={orgId} // orgId || clientId
          meetingConfig={{
            roomName: roomName,
            authToken: authToken,
            apiBase: "https://api.cluster.dyte.in",
          }}
        />
      )}
    </>
  );
}
