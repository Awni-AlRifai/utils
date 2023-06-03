const nodeFetch = require("node-fetch");

nodeFetch('https://thepioneerwoman-next.kubeprod.hearstapps.com/food-cooking/a10740/stocking-up/').then(res=>res.text()).then(data=>console.log(data)).catch(err=>console.log(err))