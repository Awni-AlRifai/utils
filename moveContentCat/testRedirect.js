const clc = require("cli-color");
const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

function testRedirect(links, base = "") {
  const failed = new Set();
  const success = [];
  // redirect
  let counter = 0;
  const https = require("https");

  links.forEach((link, i) => {
    const url = base === "" ? link : base + "/" + link;

    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode <= 399) {
        console.log(res.statusCode);
        console.log(
          `${url} ` + clc.green("is redirected to ") + `${res.headers.location}`
        );
        success.push({ old_url: url, new_url: res.headers.location });
      } else {
        console.log(
          clc.red(`${url} is not redirected status code ${res.statusCode}`)
        );
        const chunks = url.split("/");
        const slug = chunks[chunks.length - 2];
        failed.add(slug);
      }
      counter++;
      console.log(counter);
      if (counter == urls.length) {
        addFailed(failed);
        addSuccess(success);
      }
    });
  });
}
const urls = [];
fs.createReadStream("moveContentCat/urls.csv")
    .pipe(csv())
    .on("data", (data) => {
      // Filter rows based on your conditions
      urls.push(data.content_id);
    })
    .on("end", () => {
        testRedirect(urls);
    });
const addFailed = (
  failed = new Set(["chili-shrimp-skillet-with-cara-cara-oranges-recipe"])
) => {
  const results = [];

  // Read the input CSV file and filter rows
  fs.createReadStream("moveContentCat/cat.csv")
    .pipe(csv())
    .on("data", (data) => {
      // Filter rows based on your conditions
      const url = data.content_id;
      const chunks = url.split("/");
      const slug = chunks[chunks.length - 2];
      if (failed.has(slug)) {
        results.push(data);
      }
    })
    .on("end", () => {
      // Write the filtered data to a new CSV file
      const csvWriter = createCsvWriter({
        path: "moveContentCat/output.csv",
        header: [
          { id: "content_id", title: "content_id" },
          { id: "to_section_id", title: "to_section_id" },
          { id: "to_subsection_id", title: "to_subsection_id" },
          { id: "to_collection_id", title: "to_collection_id" },
        ],
      });

      csvWriter
        .writeRecords(results)
        .then(() => console.log("The CSV file was written successfully"));
    });
};

const addSuccess = (results) => {
  console.log(results);

  // Write the filtered data to a new CSV file
  const csvWriter = createCsvWriter({
    path: "moveContentCat/success.csv",
    header: [
      { id: "old_url", title: "old_url" },
      { id: "new_url", title: "new_url" },
    ],
  });

  csvWriter
    .writeRecords(results)
    .then(() => console.log("The CSV file was written successfully"));
};
// addFailed()
