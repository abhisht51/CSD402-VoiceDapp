import axios from "axios";

/**
 *
 * @param title
 * @returns meeting object if the response is sucess
 */
export const createRoom = async (title) => {
  const response = await axios({
    url: `/api/meeting`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {
      title: title,
    },
  });
  if (response.data.success) return response.data.data;
  else return response.data;
};

/**
 *
 * @param meetingId - received from the meeting obj
 * @param roomName - received from the meeting obj
 * @param isHost - specific role - controlled on the dashboard
 * @returns authToken to be used to join the meeting
 */
export const joinRoom = async (meetingId, roomName, isHost) => {
  const resp = await axios({
    url: `/api/participant`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {
      isHost: isHost,
      meetingId: meetingId,
    },
  });

  return resp.data.data.authResponse.authToken;
  //   const authResponse = resp.data.data.authResponse;
  //   const authToken = authResponse.authToken;

  //   //saving meeting details in session storage
  //   sessionStorage.setItem("auth", authToken);
  //   sessionStorage.setItem("meetingID", meetingId);
  //   sessionStorage.setItem("roomName", roomName);

  //   //redirecting to the example meeting page
  //   history.push(`/${selectedExample}/meeting/${roomName}/${meetingId}`);
};

/**
 * Same as the above function currently
 */
export const joinExistingRoom = async (meetingId, roomName) => {
  const resp = await axios({
    url: `/api/participant`,
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    data: {
      meetingId: meetingId,
      isHost: true,
    },
  });
  const authResponse = resp.data.data.authResponse;
  return authResponse.authToken;
  //   const authToken = authResponse.authToken;

  //   //saving meeting details in session storage
  //   window.sessionStorage.setItem("auth", authToken);
  //   window.sessionStorage.setItem("meetingID", meetingId);
  //   window.sessionStorage.setItem("roomName", roomName);
  //   //reloading the page
  //   window.location.reload();
};
