const axios = require("axios");
// const cors = require("cors");

/**
 * API to add a user to the room, the userName is controlled here
 */
export default async function handler(req, res) {
  let meetingId = req.body.meetingId;
  let clientId = req.body.clientId;
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
      res.send(response.data);
    })
    .catch((err) => console.error(err));
}
