const createCsvWriter = require("csv-writer").createArrayCsvWriter;

const writeFile = (
  fileName,
  header,
  data,
  onFinish = () => console.log("The CSV file was written successfully.")
) => {
  const csvWriter = createCsvWriter({
    header,
    path: fileName,
  });
  csvWriter.writeRecords(data).then(onFinish);
};

module.exports ={
    writeFile,
}