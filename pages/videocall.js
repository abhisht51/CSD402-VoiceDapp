import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { DyteMeeting } from "dyte-client";
import { useRouter } from "next/router";
import logo from "../public/dyte_logo_white.svg";
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
            logo: "https://raw.githubusercontent.com/basic-bhavya/gun-app/93a1d82ee8ee026a692c20fdd7cea6b792546050/voice_app_logo.svg",
            colors: {
              primary: "#404eed",
              secondary: "#2f3135",
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
