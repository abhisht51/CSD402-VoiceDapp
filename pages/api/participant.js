const axios = require("axios");
// const cors = require("cors");

/**
 * API to add a user to the room, the userName is controlled here
 */
export default async function handler(req, res) {
  let meetingId = req.body.meetingId || "df02b30e-82ef-4adc-9277-df56d890cb5c";
  let clientId = req.body.clientId || Math.random().toString(36).substring(7);
  let isHost = req.body.isHost;
  let baseUrl = "https://api.cluster.dyte.in";
  let orgId = process.env.DYTE_ORG_ID;
  let key = process.env.DYTE_API_KEY;
  axios
    .post(
      `${baseUrl}/v1/organizations/${orgId}/meetings/${meetingId}/participant`,
      {
        clientSpecificId: clientId,
        userDetails: {
          name: isHost ? "Host" : "Participant" + "abhisht",
        },
        roleName: isHost ? "host" : undefined,
      },
      {
        headers: {
          Authorization: `APIKEY ${key}`,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => console.error(err));
}
