const csv = require("csv-parser");
const fs = require("fs");
const cheerio = require("cheerio");
const URL = require('url');
const createCsvWriter = require("csv-writer").createArrayCsvWriter;

async function getIdsFromCSV(file) {
  const ids = [];
  const stream = fs.createReadStream(file);
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
async function handleBody(file, brands) {
  const stream = fs.createReadStream(file);
  const csvStream = csv();
  let c = 0;
  let data = [];
  return new Promise((resolve, reject) => {
    csvStream.on("data", (row) => {
      const body = Object.values(row)[1];
      if (!body) return;
      const doc = cheerio.load(body);
      let num = 0;
      doc("a").each((i, el) => {
        if (!doc(el).attr("rel")?.includes("nofollow")) return;
        const href = doc(el).attr("href");
        if (!href.includes("https") && !href.includes("http"))
          console.log(href);
        if (brands.has(href.split(".")[1])) {
          c++;
          num++;
        }
      });
      if (num > 0) {
        data.push([
          Object.values(row)[0] || "failedId",
         URL.parse( Object.values(row)[3] ).href|| "failedprodLink",
          num || "failedNum",
          Object.values(row)[2] || "failedCreatedAt",
        ]);
      }
    });

    csvStream.on("end", () => {
      console.log(c);
      resolve(data);
    });

    csvStream.on("error", (error) => {
      reject(error);
    });

    stream.pipe(csvStream);
  });
}

async function main() {
  const ids = new Set(await getIdsFromCSV("brands.csv"));
  const data = await handleBody('csvCosmo/100-120.csv',ids);

  const header = ["content_id",'prod_links', "number of Links", "created_at"];

  const csvWriter = createCsvWriter({
    header,
    path: "noFollowCosmopolitan.csv",
  });
  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully."));
}

main();
