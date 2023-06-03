const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const locales = new Set([
  "ua",
  "au",
  "cn",
  "tw",
  "es",
  "uk",
  "se",
  "no",
  "nl",
  "ng",
  "jp",
  "it",
  "in",
  "dk",
  "en"
]);
function getDomainName(url) {
  let urlChunks;
  try {
    urlChunks = new URL(url).hostname;
  } catch (err) {
    //url could not be parsed
    return "";
  }
  return urlChunks;
}

function getLocaleFromUrl(url) {
	let slug;
	let locale = 'us';

	try{
		slug = new URL(url).pathname;
		
	} catch (err) {
		return '';
	}
	if(locales.has(slug.split('/')[1]))locale =slug.split('/')[1];
	return locale;
    
}


const results = [];
fs.createReadStream("testSyndication/urls.csv")
  .pipe(csv())
  .on("data", (data) => {
    if(!data.customUrl || !data.pageUrl)return 
    sameDomain = getDomainName(data.customUrl) === getDomainName(data.pageUrl);
    sameLocale = getLocaleFromUrl(data.customUrl) !== getLocaleFromUrl(data.pageUrl);
    if(sameDomain && sameLocale)results.push({custom:data.customUrl, url: data.pageUrl});
    else return ;
    console.log(data.customUrl,data.pageUrl);
  })
  .on("end", () => {
    // Write the filtered data to a new CSV file
    // console.log(results);
    const csvWriter = createCsvWriter({
      path: "testSyndication/output.csv",
      header: [{ id: "custom", title: "custom" },{ id: "url", title: "url" }],
    });

    csvWriter
      .writeRecords(results)
      .then(() => console.log("The CSV file was written successfully"));
  });
