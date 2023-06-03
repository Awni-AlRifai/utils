const nodeFetch = require("node-fetch")
const fs = require('fs');

fs.readFile('data.txt', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const urls =data.split('\n');
    await fetch(urls);
    
  });

  const fetch = async (urls) =>{
    let str = [];    
    for(let url of urls){
        url = url.replace('https://www.thepioneerwoman.com',"http://thepioneerwoman.fre-hdm.docker");
        const res = await nodeFetch(url);
        const id = await res.text();
        str.push(id);
    }
    fs.appendFile('test.txt', str.join(' '),(err,data)=>err);    
  }
