const { Client } = require("pg");

const CONNECTION_CREDENTIALS = {
  user: "postgres",
  host: "127.0.0.1",
  database: "postgres",
  password: "password",
  port: 5432,
};
const client = new Client(CONNECTION_CREDENTIALS);
client.connect();

module.exports = client;
