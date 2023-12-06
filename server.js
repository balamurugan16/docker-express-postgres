const express = require("express")
const { Pool } = require("pg")
const PORT = process.env.PORT

const app = express()

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

app.get("/", async (_req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECt $1::text as message', ["Hello world!"]);
    const message = result.rows[0].message;
    res.send(message)
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("error connecting to the database")
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

