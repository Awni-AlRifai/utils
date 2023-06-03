const fs = require("fs");
const nodeFetch = require("node-fetch");
function readFilePromise(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, "utf-8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

Promise.all([readFilePromise("contentProductIds.txt")]).then(([file]) => {
  let i = 150;
  let interval = setInterval(() => {
    if (i >= 1700) {
      clearInterval(interval);
    }
    const idsArray = file.split("\n").slice(i, i + 50);
    Promise.all(
        idsArray.map((id) =>
          nodeFetch(
            `https://vader.cdn.hearstapps.net/content_products?content_id=${id}`
          ).then((res) => res.json())
        )
      )
        .then((data) => {
          const failedIds = [];
          data.forEach((content) => {
            const contentArray = Object.entries(content).map(
              ([key, value]) => value
            );
           let  isInternal = false;
            contentArray.forEach((product) => {
              if (product?.metadata?.isInternal) isInternal = true;
            });
            if (!isInternal) failedIds.push(content[0]?.content_id);
          });
          fs.appendFile(
            "failedIds.txt",
            failedIds.join("\n"),
            (err, data) => err
          );
        })
        .catch((err) => console.log(err));
   i += 50;
  },10000);

  i += 50;
});
