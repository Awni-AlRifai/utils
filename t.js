const old = [
  "cooking-basics/",
  "college-football-tailgate-food/",
  "big-game-recipes/",
  "insanely-easy-chicken-dinners/",
  "keepin-it-real-chicken-recipes/",
  "easy-chicken-recipes/",
  "cozy-chicken-broth-recipes/",
  "spring-easy-weeknight-dinners/",
  "meal-prep/",
  "celebrity-chefs/",
  "eating-right-high-cholesterol/",
  "napkin-folding/",
  "jimmy-dean-breakfast-gallery/",
  "americas-test-kitchen/",
  "binge-watch-binge-eat/",
  "eye-on-awards-season/",
  "netflix/",
  "talk-show-recipes/",
  "best-places-to-eat-drink-las-vegas/",
  "new-orleans-best-restaurants-bars/",
  "party-starters/",
];
const mapped = [
  "https://www.delish.com/kitchen-tools/kitchen-secrets/",
  "https://www.delish.com/game-day-super-bowl-recipes/",
  "https://www.delish.com/game-day-super-bowl-recipes/",
  "https://www.delish.com/chicken-breast-recipes/",
  "https://www.delish.com/chicken-breast-recipes/",
  "https://www.delish.com/chicken-breast-recipes/",
  "https://www.delish.com/cooking/recipe-ideas/g3156/winter-dinners/",
  "https://www.delish.com/weeknight-dinners/",
  "https://www.delish.com/cooking/recipe-ideas/g36890133/healthy-meal-prep-recipes/",
  "https://www.delish.com/restaurants/",
  "https://www.delish.com/cooking/nutrition/",
  "https://www.delish.com/kitchen-tools/kitchen-secrets/",
  "https://www.delish.com/breakfast-ideas/",
  "https://www.delish.com/kitchen-tools/",
  "https://www.delish.com/entertainment/",
  "https://www.delish.com/entertainment/",
  "https://www.delish.com/entertainment/",
  "https://www.delish.com/entertainment/",
  "https://www.delish.com/travel/",
  "https://www.delish.com/travel/",
  "https://www.delish.com/appetizers/",
];

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
      "collections.id": id,
      page_size: 500,
      fields: "*.id,*.metadata.links.frontend.prod",
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
  results.forEach((contents, i) => {
    contents["data"].forEach((content, order) => {
      data.push([i, content.id, content.metadata.links.frontend.prod]);
    });
  });

  // return a;
  return data;
}
async function fetchAllLinks(ids) {
  const promises = ids.map(async (id) => {
    const paramsObject = {
      slug: id,
      fields: "*.id",
      "site.domain": "delish.com",
    };
    const params = new URLSearchParams(paramsObject);

    const res = await fetch(
      "https://rover.kubefeature.hearstapps.net/v2/collections?" + params,
      {
        headers: headers,
      }
    );
    if (res.status !== 200) console.log(`Error`);
    return { ...(await res.json()) };
  });

  const results = await Promise.all(promises);
  const collections = results.map((collection, i) => {
    return collection?.data[0]?.id;
  });

  // return contents;
  return collections;
}

async function main() {
  const col = mapped.map((link) => {
    const parts = link.split("/");
    return parts[parts.length - 2];
  });
  const newColl = (await fetchAllLinks(col)).filter((col) => col !== undefined);
  // const oldIds = await fetchAllLinks(old);
  const obj = {};
  newColl.forEach((id, i) => (obj[id] = old[i]));
  console.log(obj);

  // const data = oldIds.map((id,i) => {
  //   const string = `/${old[i]},0ab1c860-336a-4b0b-bb94-dd080aea7a20,${mapped[i]},0ab1c860-336a-4b0b-bb94-dd080aea7a20,Update for collection ID:${id},Path for collection ID ${id} is redirected`;
  //   return string;
  // })
  // fs.writeFileSync("redirection.csv",data.join('\n'));
  // const res = await fetch('https://delish-next.kubefeature.hearstapps.net/meal-prep');
  // console.log(res.status);
  // const res = await fetchAllContent(newColl);
  // console.log(res);
  // res.forEach(r=>{
  //   const index=r[0];
  //   r.push(newColl[index]);
  // })
  // fs.writeFileSync("removeCollection.csv", res.join("\n"));

  // const result = [];
  // res.forEach((row) => {
  //   const index = row[0];
  //   if (newColl[index]) {
  //    result.push([row[1],newColl[index]]);
  //   }
  // });
  // console.log("length of the resukt",result.length);
  // fs.writeFileSync("addCollection.csv", result.join("\n"));
}
// main();

function testRedirect(links, base =''){
 // redirect
const https = require('https');

links.forEach((link,i)=>{
  const url =base ==='' ? link :  base+"/"+link;
  https.get(url, (res) => {
    
    if (res.statusCode >= 300 && res.statusCode <= 399) {
      console.log(`${url} ` + clc.green('is redirected to ') + `${res.headers.location}`);
    } else {
      console.log(clc.red(`${url} is not redirected status code ${res.statusCode}`));
    }
  });
})

}
// //! filter
// const data=fs.readFileSync("AddCollectionBadReq.txt",'utf-8');
// fs.writeFileSync("FilteredAddCollectionToContent.csv",data.split('\n').filter(row=>row!=="").join('\n'))

// add collection for sheet
const collectionMap = {
  "cc21ccd5-a524-4ebe-9f85-f7a2d423ad4e": "cooking-basics",
  "388bafc5-5626-40f3-8b74-47b0adf9e6ad": "college-football-tailgate-food",
  "fccee5da-6eab-4550-82da-06aa96a9e9e7": "big-game-recipes",
  "284e4b78-adb4-4276-adfd-5776b0765de3": "insanely-easy-chicken-dinners",
  "e6b4c248-c11b-4ac9-8d9c-a8d831b9b77e": "keepin-it-real-chicken-recipes",
  "1586c729-c3fc-4cfc-95d2-09469b4489ff": "easy-chicken-recipes",
  "057dbba2-d1cb-48c1-9384-b4958a39c03e": "cozy-chicken-broth-recipes",
  "c8ceed4f-075c-4c61-9998-b061a53d6233": "spring-easy-weeknight-dinners",
  "35bd8edb-37ee-4831-acec-65ffe5685cc5": "meal-prep",
  "636d6964-87ad-471f-805f-e5ac3019fd11": "celebrity-chefs",
  "80424019-a8ca-49eb-b665-335235f3e0a1": "eating-right-high-cholesterol",
  "d5e065fc-cf19-4fa8-b9a9-e17c3eb32256": "napkin-folding",
  "c29fc21b-2507-4b10-8453-b6330c5463ff": "jimmy-dean-breakfast-gallery",
  "2ced8531-e7af-4ac1-a07b-7997d6e8bc16": "americas-test-kitchen",
  "5d335649-19fb-45f4-983e-aefa0037f0f7": "binge-watch-binge-eat",
  "d18dc14f-71af-428d-8d31-62b28eb69118": "eye-on-awards-season",
  "23a82127-e64f-43d3-aebc-778e4c884d54": "netflix",
  "ce34db5f-3e07-4f96-860e-2899007bd5c3": "talk-show-recipes",
  "f97e307c-e8a6-4e51-ac9f-b097467690bd": "best-places-to-eat-drink-las-vegas",
  "3522e198-c73d-4623-8bb5-68a51925ec88": "new-orleans-best-restaurants-bars",
  "d1ec3706-fbbc-454e-ab2c-87a225fe342a": "party-starters",
};
const newCollectionMap = {
  "150a2842-e324-4036-84aa-d9eedfb4c284": "college-football-tailgate-food",
  "8095ad2b-ee3b-46e6-b65a-6980a8f53441": "keepin-it-real-chicken-recipes",
  "26f05533-d670-47b9-9ad0-9c3591387095": "easy-chicken-recipes",
  "2c6c1919-83ce-4e78-8dc9-639e37bbcf6d": "cozy-chicken-broth-recipes",
  "e69ccdbb-b304-401a-bec1-53b345295351": "eating-right-high-cholesterol",
  "f6853433-18b9-494c-82e1-7d55969af266": "jimmy-dean-breakfast-gallery",
  "cc9e112a-4414-4ec2-b616-38b573b4b173": "americas-test-kitchen",
};
// const arr = [];
// fs.createReadStream("colData.csv")
//   .pipe(csv())
//   .on("data", (data) => {
//     arr.push([ (Object.values(data)[0]), (Object.values(data)[1]),  newCollectionMap[(Object.values(data)[1])]]);
//     (Object.values(data)[1]);
//   })
//   .on("end", () => {
//     fs.writeFileSync('collectionQAStrike.csv',arr.join('\n'));
//   })
//   .on("error", (err) => console.log(err));


  testRedirect(old.map(l=>'https://www.delish.com/'+l));
  module.exports= {
    testRedirect,
  }