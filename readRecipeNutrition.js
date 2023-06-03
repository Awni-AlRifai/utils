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

readFilePromise('response_1674034412114.json').then(data=>{
    const nutrition = JSON.parse(data).data;
    const res = [];
    nutrition.forEach(n =>{
        res.push(n?.recipe_id);
    })
    fs.appendFile('recipeIds.txt', res.join('\n'),(err,data)=>err)
    
});