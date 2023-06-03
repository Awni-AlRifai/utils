const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createArrayCsvWriter;

// Define an array to store the data from all the CSV files
const combinedData = [];
let r = 0;

// Define the path to the directory containing the CSV files
const directoryPath = "./csvCosmo/";

// Read each CSV file in the directory and parse its data
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Unable to read directory: " + err);
    return;
  }

  // Iterate over each CSV file in the directory
  files.forEach((file) => {
    if (file.endsWith(".csv")) {
      const filePath = directoryPath + file;

      // Parse the CSV data and add it to the combinedData array
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          combinedData.push([data.id, data.body, data.created_at,data.url]);
          r++;
        })
        .on("end", () => {
          console.log(r);
          csvWriter
            .writeRecords(combinedData)
            .then(() =>
              console.log("The combined CSV file was written successfully.")
            );
        });
    }
  });
});
  
// Define the header for the CSV file
const header = ["id", "body", "created_at",'url'];

// Create a CSV writer
const csvWriter = createCsvWriter({
  header,
  path: "noFollowCosmo.csv",
});

// Write the combined data to a new CSV file
