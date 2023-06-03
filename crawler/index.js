const https = require("https");
const cheerio = require("cheerio");

https.get("https://www.cosmopolitan.com", (res) => {
    let body = '';
    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        const doc = cheerio.load(body);

         doc('a').each((i, el) => {
            const href = doc(el).attr('href');
            console.log(href);
         })
    }).on('error', (err) => {
        console.log(err);
    })

    res.on('error', (err => console.log(err)))

}).on('error',(err)=> console.log(err))
