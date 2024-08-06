const express = require('express')
const bodyParser = require('body-parser')
const {connectToMongo} = require("./src/helpers/db_connection");
const userRouter = require("./src/routes/user");
const logMiddleware = require("./src/middlewares/logger");
const port = process.env.PORT || 3000
const app = express()


connectToMongo().then(r => console.log(`Connection :${typeof r}`))
//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(logMiddleware)
//routes
app.use("/user", userRouter);




console.log(`started....${port}`);

app.listen(port)




