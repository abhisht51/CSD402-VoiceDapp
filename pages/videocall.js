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
      router.push("/chatpage");
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
            logo: "https://raw.githubusercontent.com/abhisht51/CSD402-VoiceDapp/cdc73a7517c4f388289b9f1ecd119ce803a61cdf/public/voice_app_logo.svg?token=AN72G63C7256BNNVGV3ELU3BUO5EO",
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
