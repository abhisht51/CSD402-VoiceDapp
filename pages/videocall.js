import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { DyteMeeting } from "dyte-client";
import { useRouter } from "next/router";
const orgId = process.env.NEXT_PUBLIC_DYTE_ORG_ID;

export default function VideoCall() {
  const {
    usernameState: { username },
    selectedChannelState: { selectedChannelstate, setSelectedChannel },
    meetingAuth: { meetingAuthToken },
  } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    console.log("meeting token", meetingAuthToken);
  }, [meetingAuthToken]);

  const onDyteInit = (meeting) => {
    //meeting ended event
    meeting.on(meeting.Events.meetingEnded, () => {
      router.back();
      router.reload();
    });

    meeting.on(meeting.Events.participantLeave, (participant) =>
      router.push("/chatpage")
    );
  };

  return (
    <>
      {meetingAuthToken && selectedChannelstate.courseRoomName && (
        <DyteMeeting
          onInit={onDyteInit}
          clientId={orgId} // orgId || clientId
          uiConfig={{
            controlBar: true,
            controlBarElements: {
              plugins: false,
              screenShare: true,
              share: false,
              participants: true,
              chat: true,
              polls: false,
              fullscreen: true,
            },
            header: true,
            logo: "./public/laptop.svg",
            colors: {
              primary: "#fff",
              secondary: "#262626",
              textPrimary: "#EEEEEE",
              videoBackground: "#1A1A1A",
            },
          }}
          meetingConfig={{
            roomName: selectedChannelstate.courseRoomName,
            authToken: meetingAuthToken,
            apiBase: "https://api.cluster.dyte.in",
          }}
        />
      )}
    </>
  );
}
