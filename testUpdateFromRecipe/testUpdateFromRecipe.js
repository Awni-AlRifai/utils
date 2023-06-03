var CryptoJS = require("crypto-js");
require("dotenv").config();
const csv = require("csv-parser");
const fs = require("fs");
const fetch = require("node-fetch");
const clc = require('cli-color');


var authClient = "Doorman-SHA256 Credential=" + process.env.clientID;
var authTimestamp = Math.floor(Date.now() / 1000);
var hash = CryptoJS.SHA256(
  process.env.clientID + process.env.clientSecret + authTimestamp
);
var authSignature = CryptoJS.enc.Hex.stringify(hash);

const headers = {
  Authorization: authClient,
  Timestamp: authTimestamp,
  Signature: authSignature,
  "Content-Type": "application/json",
};

async function fetchAllContent(ids) {
  const promises = ids.map(async (id) => {
    const paramsObject = {
      "id": id
    };
    const params = new URLSearchParams(paramsObject);

    const res = await fetch(
      "https://rover.kubefeature.hearstapps.net/v2/content?" + params,
      {
        headers: headers,
      }
    );
    if (res.status !== 200) console.log(`Error`);
    return { ...(await res.json()) };
  });

  const results = await Promise.all(promises);
  const data = [];
  const success = clc.green.bold;
  const failed = clc.red.bold;
  const headline = clc.black.bold
  results.forEach((contents, i) => {
    contents["data"].forEach((content, order) => {
     console.log(clc.bgBlueBright(i + 1 + " ") + 'for content :' + clc.blue.bold(ids[i]));
     content.metadata.hide_from_homepage ? console.log("  "+headline("Hide from home page: ")+ success("on")) : console.log(headline("Hide from home page: ")+ failed("off"));
     !content.metadata.auto_social ? console.log( "  "+headline("Auto Social: ")+ success("off")) : console.log(headline("Auto Social: ")+ failed("on"));
     
    });
  });

  // return a;
  return data;
}

async function main(){
    await fetchAllContent([
        "d3757a01-e7f3-4aad-91bb-dec349f563dd",
    "8c220394-ecc6-49a1-809b-b09834e9a2dd",
    "017b3699-de4e-4978-b417-f5361477a503",
    "c728b0cd-32dc-49cf-9215-3b2f8b4536ee",
    "b622f89c-5296-458c-bf81-be4b206af536",
    "2a535dcc-6786-4240-92bf-e5db4ea47b35",
    "a7801d6a-716c-415a-bdd2-29fdfc48be24",
    "ef5a6ba9-5d2c-461d-a965-f9d42fd4a456",
    "ac82caad-acc2-4698-9739-45cd0779d87b",
    "c785696c-364e-4cfa-9df0-9dd52d55ff87",
    "4fd46f68-f4e1-47f3-a750-695b37c13610",
    "8c99a588-629f-445f-921d-f5201f39783b",
    "9ed3e56e-eba0-4967-8000-ddaeae18a853",
    "18e6073e-36dd-4d26-8c28-5e1f7b7ccf6e",
    "eb4f1866-f79b-42fb-8f10-3d61a6d3be95",
    "e9988405-e3ee-4533-867d-0df37f31dc23",
    "af92e33c-ae79-4455-936d-9a64d24d6cf3",
    "4fef69f7-e612-48d3-910d-00b9135226e5",
    "76e622a1-7684-4415-9297-4cfd0cc95b9a",
    "e25460f7-de32-403f-9aa7-c602c8402dc7",
    "5b94215e-4eaf-44ff-819b-2cab2ba81fb4",
    "e75cb593-7861-4403-bf77-68bc2767e2fe",
    "5fcc0b6b-4f0a-4e2a-88c4-56170b7b6c86",
    "e0a54e22-45d0-4a86-b94f-bfe1083c7a86",
    "ff2b7082-934c-403f-9939-cd251409b7fc",
    "2fe17cf8-b891-4148-a439-8d63e6350bf0",
    "f89151d4-10e8-4607-b429-64a913ad5498",
    "4719ba7f-6efb-4f64-9fd4-f232231e7fd8",
    "76220342-ed88-49b8-a0b5-02d1d0ca9a39",
    "08d1ec5b-2607-4dc0-bea4-c1b96f498a86",
    "5832f1c0-9e5f-4b97-833a-4feab0a05f6e",
    "dcf9d4a3-c3eb-472d-a332-ed270b7d7f4c",
    "cd19a6f4-344d-45d6-9b81-d421d13d7992",
    "0ec2122f-6a88-48d8-b4d0-27a2b52f4d1a",
    "c7a6e63c-3848-4086-b4fe-9f7545764bc4",
    "700d97e0-b2ee-4747-95d6-b367ede7dfe3",
    "7a75503c-90f3-4e24-ae2d-ce5f3da17622",
    "0c24c8e1-8842-424c-abcc-845f0c0331b5",
    "24b300a1-a67b-418a-a587-ae7417c4d8b7",
    "b40817cd-17fa-4073-8d63-ccbd157f0977",
    "4c983e46-daef-461c-82c1-980099f5e460",
    "5d151453-7f5a-44c0-bd81-c4e5df627bf1",
    "cdf61bc9-56b8-4df9-ab8f-746ff76f34ac",
    "de6cd1fa-9792-4560-b2bb-1abb84d3c8f3",
    "2f3559d1-b702-4fc9-9c82-bb5ba7b63bee",
    "ebf66f69-e196-4616-bd5f-c0ea94c2970f",
    "3d414c1d-c522-44ec-8510-9859089a0f0d",
    "29317e94-9c8b-421c-a2ac-2058000374d2",
    "526e3f91-0174-4ce6-9521-02aa6fd24559"
    ])
}
main()
