const cheerio = require("cheerio");

function parseBody(body){
    const doc = cheerio.load(body);
    return doc;
}

module.exports ={
    parseBody
}