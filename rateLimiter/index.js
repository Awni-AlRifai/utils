const fetch = require('node-fetch');

const fetchWebsite = async (url) => {
    const res = await fetch('https://www.Twitter.com');
    console.log(res.headers.raw());
}

for(let  i = 0; i < 50; i++) {
    fetchWebsite();
}