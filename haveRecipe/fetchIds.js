const fetch = require("node-fetch");
const { writeFile } = require("../Link_Recomender/writeCSV");

const params = new URLSearchParams(paramsObject);

async function main() {
  const ids = [];
  for (let i = 1; i < 50; i++) {
    const res = await fetch(
      `https://recipe-ds.kubeprod.hearstapps.com/nutrition?page_size=500&page=${i}`
    );
    const data = await res.json();
    if(data.data.length == 0)break;
    
    if (!data?.data) {
      console.log("data is not fetched for " + i);
    }
    data?.data.forEach((row) => ids.push([row["recipe_id"]]));

    // delay 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  writeFile("haveRecipe/results.csv", ["ids"], ids);
}
main();
