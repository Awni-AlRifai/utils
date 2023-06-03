const client = require("./connection");
const fs = require("fs");

const statement = `SELECT id,domain FROM brands_site`;

async function runSQLStatement(statement, delayTime = 1000) {
  try {
    console.log(`Running SQL statement after ${delayTime / 1000} Second`);
    console.log(`Running: ${statement}`);
    const res = await client.query('\dt;');
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}
async function main() {
  const siteIds = await runSQLStatement(statement);
  client.end();
}
main();
