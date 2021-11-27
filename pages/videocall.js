import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { DyteMeeting } from "dyte-client";
import { createRoom, joinExistingRoom, joinRoom } from "../utils/utils";
import { useRouter } from "next/router";
const orgId = process.env.NEXT_PUBLIC_DYTE_ORG_ID;

export default function VideoCall() {
  const {
    usernameState: { username },
    selectedChannelState: { selectedChannelstate, setSelectedChannel },
    meetingAuth: { meetingAuthToken },
  } = useContext(UserContext);
  const router = useRouter();
  // const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    console.log("meeting token", meetingAuthToken);
  }, [meetingAuthToken]);

  // const [title, setTitle] = useState("testTitle");
  // const [roomName, setRoomName] = useState("");

  // useEffect(async () => {
  //   /** Creating a room with a room title */
  //   const createRoomResp = await createRoom(title);
  //   const { id, roomName } = createRoomResp.meeting;

  //   /** we use meeting id, roomName (different from title) to join a room
  //    * the third param is for role. i.e host or not etc
  //    */
  //   const authToken = await joinRoom(id, roomName, true);
  //   setRoomName(roomName);
  //   setAuthToken(authToken);
  // }, []);

  return (
    <>
      {meetingAuthToken && selectedChannelstate.courseRoomName && (
        <DyteMeeting
          onInit={(meeting) => {
            console.log("Init meeting component");
          }}
          clientId={orgId} // orgId || clientId
          meetingConfig={{
            roomName: selectedChannelstate.courseRoomName,
            // roomName: "hello",
            authToken:
              "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBhMjYzNGQ0LWI3MDQtNGM2OC1hMzRhLTNhY2NkZDc0MzY0NyIsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE2MzgwMjE0MDQsImV4cCI6MTYzODEwNzgwNH0.KFDq60-XmdcMDmG9b6q3ghxY2qABOptgmBFnB8trV_CvB5_2HuM0epSNsWv4Zq9dAFcu6RvZ6crYS9k0NDNIKv2cX9-4Qq8vS-YEDptJqE_AJspU8Vofx8OvbiJoh-SeWaqTQ79ViuoDkbArfk3AVqWF7pouSVspLaatRlGHYWBjcMCdNVCh7ZWCQTaHzHxAA6xbLf5kxmX7zCnuKDS48eWXT_TTVyfz363X_4c5VQyo1YyQd7yquZnVMcjpBZsgRlc3ly6a_v8zPRR2v16wzL4fJTN0m-cJkJ8gt7GQHStUBAymnt0ATkY9BkRVjO713pPzuYH2ARrqKcBG99uWLw",
            // authToken: meetingAuthToken,
            apiBase: "https://api.cluster.dyte.in",
          }}
        />
      )}
    </>
  );
}
