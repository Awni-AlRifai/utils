const fs = require('fs');
const csv = require('csv-parser');
const stream = fs.createReadStream('a.csv');

let data = [];

stream.pipe(csv())
  .on('data', (row) => {
    if (!data.some(d => d.custom_retailer === row.custom_retailer)) {
      data.push(row);
    }
  })
  .on('end', () => {
    data.forEach(d => console.log(d['custom_retailer']))
  });
