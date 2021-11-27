const axios = require("axios");
// const cors = require("cors");

/**
 * API to make a call to dyte server get all the meetings
 */
export default async function handler(req, res) {
  let title = req.body.title;
  let baseUrl = "https://api.cluster.dyte.in";
  let orgId = process.env.DYTE_ORG_ID;
  let key = process.env.DYTE_API_KEY;
  console.log({ orgId });
  console.log({ key });

  await axios({
    url: `${baseUrl}/v1/organizations/${orgId}/meetings`,
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `APIKEY ${key}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.error(err));
}
