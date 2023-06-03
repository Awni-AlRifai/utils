// const fs = require("fs");
// const nodeFetch = require("node-fetch");
// for (let i = 101; i < 120; i++) {
//   nodeFetch(
//     `https://vader.cdn.hearstapps.net/retailers?page_size=500&page=${i}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       const retailer = data["data"].map((retailer) => retailer["name"]);
//       fs.appendFile("retailers.txt", retailer.join("\n"), (err, data) => err);
//     });
// }
// fs.readFile("products.json", "utf8", async (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const retailers = JSON.parse(data)["data"];
//   const retailer = retailers.map((retailer,i) => {
//     if(i === 78) console.log(retailer);
//     if (Array.isArray(retailer["sites"])) {
//         if(retailer["sites"][0]){
//             return retailer["sites"][0]["domain"];
//         }

//     }

//     return null;
//   });
//   fs.appendFile("brands.txt", retailer.join("\n"), (err, data) => err);
// });

const fs = require("fs");

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

Promise.all([
  readFilePromise("content_links.txt")
  // readFilePromise("retailers.txt"),
]).then(function (out) {
  const content = out[0].split('\n');
  

 
    fs.appendFile("filteredContent.txt",[...new Set(content)].join('\n') , (err, data) => err);

});
