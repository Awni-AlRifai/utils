const { parseBody } = require("./bodyParser");
const { readCSV } = require("./readCSV");

function prepareKeyWords(onEnd) {
  readCSV(
    "Link_Recomender/seo_magazines seo_keyword_page_report 2023-05-04T1506.csv",
    handleRow,
    onFullRead,
    []
  );

  function handleRow(data, keyWords) {
    keyWords.push(data["Google Search Console Keyword"]);
  }
  function onFullRead(storage) {
    onEnd(storage);
  }
}
const keyWords = prepareKeyWords(handleBody);
function handleBody(keyWords) {

  readCSV("Link_Recomender/body.csv", handleRow);

  function handleRow(data) {
    const url = data["page_url"];
    const body = data["body"];
    const doc = parseBody(body);
    doc("a").each((_,el) => {
      const href = doc(el).attr("href");
      const string = doc(el).text();
      hasKeyword(keyWords,string, href, url);
    });
  }
}

function hasKeyword(keyWords,string,url, sourceUrl) {
  for (const keyWord of keyWords) {
    if (string == keyWord) {
      console.log("keyword", keyWord,'\n', string);
    }
  }
}
