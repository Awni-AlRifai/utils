var CryptoJS = require("crypto-js");
require("dotenv").config();
const csv = require("csv-parser");
const fs = require("fs");
const fetch = require("node-fetch");
const { fetchAllLinks, extractSlug } = require("../getIdsFromUrl");

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

async function getIdsFromCSV() {
  const contentLinks = [];
  const sectionLinks = [];
  const subSectionLinks = [];
  const stream = fs.createReadStream("moveContentCat/moveContent.csv");
  const csvStream = csv();

  return new Promise((resolve, reject) => {
    csvStream.on("data", (row) => {
      contentLinks.push(Object.values(row)[0]);
      sectionLinks.push(Object.values(row)[1]);
      subSectionLinks.push(Object.values(row)[2]);
    });

    csvStream.on("end", () => {
      resolve([contentLinks, sectionLinks, subSectionLinks]);
    });

    csvStream.on("error", (error) => {
      reject(error);
    });

    stream.pipe(csvStream);
  });
}

async function fetchField(urls, endpoint, prefix) {
  const promises = urls.map(async (url) => {
    if (!url || url == "") return "";
    const slug = extractSlug(url);
    const paramsObject = {
      slug: slug,
      fields: "*.id",
      "site.site_prefix": prefix,
    };
    const params = new URLSearchParams(paramsObject);

    const res = await fetch(
      `https://rover.kubefeature.hearstapps.net/v2/${endpoint}?` + params,
      {
        headers: headers,
      }
    );
    if (res.status !== 200) console.log(`Error`);
    return { ...(await res.json()) };
  });

  const results = await Promise.all(promises);
  const res = {};
  const collections = results.forEach((collection, i) => {
    if (!collection.data)return ;
    const slug = extractSlug(urls[i]);
    res[slug] = collection?.data[0]?.id;
  });

  // return contents;
  return res;
}

async function main() {
  const [contentUrls, sectionUrls, subsectionUrls] = await getIdsFromCSV();
  const contentIds = await fetchAllLinks(contentUrls);
  const sectionIds = await fetchField(
    [...new Set(sectionUrls)],
    "sections",
    "DEL"
  );
  const subSectionIds = await fetchField(
    [...new Set(subsectionUrls)],
    "sections",
    "DEL"
  );
 
  
 const res =  contentIds.map((id,i)=>{
    let sec = '';
    let sub = '';
    if(sectionUrls[i]){
        sec = sectionIds[extractSlug(sectionUrls[i])];
    }
    if(subsectionUrls[i]){
        sub = subSectionIds[extractSlug(subsectionUrls[i])];
    }
    return [id,sec,sub,''];
 })
 fs.writeFileSync('DEL.cleanup.move_contents_categorization.csv',res.join('\n'));
  
}
main();
