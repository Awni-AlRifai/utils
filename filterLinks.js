const fs = require("fs");
const csv = require("csv-parser");

const filterLinks = async () => {
  const stream = fs.createReadStream("links.csv");
  const csvStream = csv();
  const links = new Set();
  return new Promise((resolve, reject) => {
    csvStream.on("data", (row) => {
      links.add(Object.values(row)[0]);
    });

    csvStream.on("end", () => {
      resolve(links);
    });

    csvStream.on("error", (error) => {
      reject(error);
    });

    stream.pipe(csvStream);
  });
};

(async()=>{
    const links = await filterLinks();
    fs.writeFileSync('links.csv','');
    fs.appendFileSync('links.csv',[...links].join('\n'))
})()