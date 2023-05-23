const dotenv = require ('dotenv');
dotenv.config({path:__dirname+'/.env'})
const express = require("express");
const connectToDb = require("./src/database/database");
const routes = require("./src/routes/routes");
const cors = require("cors");

connectToDb();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.options("*",cors());
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`)
});