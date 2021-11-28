const axios = require("axios");

/**
 * API to make a call to dyte server for creating a meeting
 */
export default async function handler(req, res) {
  let title = req.body.title;
  let baseUrl = "https://api.cluster.dyte.in";
  let orgId = process.env.DYTE_ORG_ID;
  let key = process.env.DYTE_API_KEY;
  await axios({
    url: `${baseUrl}/v1/organizations/${orgId}/meeting`,
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `APIKEY ${key}`,
    },
    data: {
      title: title || "testTitle",
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => console.error(err));
}
