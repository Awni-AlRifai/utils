const fetch = require("node-fetch");
require("dotenv").config();
var CryptoJS = require("crypto-js");
const csv = require("csv-parser");
const fs = require("fs");
const fetchNutrition = async (ids, urls, content_ids) => {
  const responses = await Promise.all(
    ids.map((id) =>
      fetch(
        `https://recipe-ds.kubefeature.hearstapps.net/nutrition?recipe_id=${id}`
      )
    )
  );
  const data = await Promise.all(responses.map((res) => res.json()));
  const hasRecipe = [];
  data.forEach((nutrition, i) => {
    if (ids[i] == urls[i]) hasRecipe.push([urls[i]]);
    else if (nutrition?.data?.length !== 0)
      hasRecipe.push(["https://" + urls[i].substring(2), 1]);
    else hasRecipe.push("https://" + [urls[i].substring(2), 0]);
  });
  return hasRecipe;
};
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

async function getRecipeIds(contentIds) {
  const ids = [];
  const urls = [];
  const responses = await Promise.all(
    contentIds.map((id) =>
      fetch("https://rover.kubefeature.hearstapps.net/v2/content/" + id, {
        headers,
      })
    )
  );
  const data = await Promise.all(responses.map((res) => res.json()));
  data.forEach((content, i) => {
    console.log(`Content ${i}`);
    if (!content["data"]) {
      ids.push(contentIds[i]);
      urls.push(contentIds[i]);
    } else {
      ids.push(content["data"]["recipe"]),
        urls.push(content["data"]["metadata"]["links"]["frontend"]["prod"]);
    }
  });
  return [ids, urls];
}
async function getIdsFromCSV() {
  const ids = [];
  const stream = fs.createReadStream("nutritionContentIds.csv");
  const csvStream = csv();

  return new Promise((resolve, reject) => {
    csvStream.on("data", (row) => {
      ids.push(Object.values(row)[0]);
    });

    csvStream.on("end", () => {
      resolve(ids);
    });

    csvStream.on("error", (error) => {
      reject(error);
    });

    stream.pipe(csvStream);
  });
}
async function main() {
  const content_ids = await getIdsFromCSV();
  const [ids, urls] = await getRecipeIds(content_ids);
  const failedIds = [];
  const nut = await fetchNutrition(ids, urls, content_ids);
  fs.writeFileSync("alreadyHaveNutritionRecipes.txt", [...nut].join("\n"));
}
main();
