const { readCSV } = require("../Link_Recomender/readCSV");
const { writeFile } = require("../Link_Recomender/writeCSV");
const headers = [
    "originally_published_at",
    "publish_from",
    "id",
    "domain",
    "country",
    "title",
    "xfp",
    "toc",
    "cusurl",
    "url",
    "recipe_id",
    "haveNutrition",
  ];
const handleRecipeRow = (data, storage) => storage.add(data["ids"]);
const handleAllRecipeRow = (data, storage, idsWithNutrition) => {
    if(idsWithNutrition.has(data['recipe_id'])){
        data['haveNutrition'] = 1
    } else{
        data['haveNutrition'] = 0
    }
    storage.push(headers.map(header=>data[header]));
};

const onFinalRead = (storage) => {
 
  writeFile("haveRecipe/finalResult.csv", headers, storage);
};
const handleAllRecipes = (idsWithNutrition) => {
  readCSV(
    "haveRecipe/AllRecipes.csv",
    handleAllRecipeRow,
    onFinalRead,
    [],
    idsWithNutrition
  );
};
const onReadId = (storage) => handleAllRecipes(storage);

function main() {
  readCSV("haveRecipe/results.csv", handleRecipeRow, onReadId, new Set());
}
main();
