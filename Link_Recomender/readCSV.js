const csv = require("csv-parser");
const fs = require("fs");

function readCSV(fileName, handleRow, onFullRead = (_) => {}, storage = null,extra = {}) {
  fs.createReadStream(fileName)
    .pipe(csv())
    .on("data", (data) => {
        
      handleRow(data, storage,extra);
    })
    .on("end", () => {
      onFullRead(storage);
      console.log("The CSV is read successfully");
    });
}

module.exports = {
  readCSV,
};
