 const csv = require("csv-parser");
 const createCsvWriter = require("csv-writer").createArrayCsvWriter;
 const fs = require("fs");

 const readCSV = async (file) =>{
    const stream = fs.createReadStream(file);
    const csvStream = csv();
    const data = [];

    return new Promise((resolve, reject) => {
        csvStream.on("data", (row) => {
          data.push(Object.values(row));
        });
    
        csvStream.on("end", () => {
          resolve(data);
        });
    
        csvStream.on("error", (error) => {
          reject(error);
        });
    
        stream.pipe(csvStream);
      });
 }

 async function main(){
    let withoutTopTouts = await readCSV('testLCP/test2/withoutTouts.csv');
    let withTopToutsStatic = await readCSV('testLCP/test2/withoutChange.csv');
    let withTopToutsDynamic = await readCSV('testLCP/test2/withTouts.csv');
    let withoutTouts = 0;
    let withoutChange = 0;
    let withChange  = 0;
    res = withoutTopTouts.map((el,i)=>{
        const lcpWithTopTouts = parseFloat(withTopToutsStatic[i][1]);
        const lcpWithoutTouts = parseFloat(el[1]);
        const lcpDynamic =parseFloat(withTopToutsDynamic[i][1]);
        el.push(lcpWithTopTouts);
        el.push(lcpDynamic);
        const min = Math.min(lcpDynamic,lcpWithTopTouts,lcpWithoutTouts);
        if(min == lcpDynamic){
            el.push("withOurChange");
            withChange++;
        }
        else if(min == lcpWithTopTouts){
            el.push('withoutChange');
            withoutChange++;
        }
        else  if(min == lcpWithoutTouts){
            el.push('withoutTouts');
            withoutTouts++;
        }

        return el;
    })
    fs.writeFileSync('testLCP/result.csv',res.filter(el=>!el[1].includes('NaN s') || el[2]!= 'NaN s' || el[3] != 'NaN s').join('\n'));
    console.log(withoutTouts);
    console.log(withoutChange);
    console.log(withChange);
 }

 main();

