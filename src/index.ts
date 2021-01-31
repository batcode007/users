const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');

const hostname = "localhost";
const app = express();
const port = 8080 || process.env.PORT;

const mongoose = require('mongoose');
import {mongoUrl} from "./config";
import {loginRouter} from "./routes/loginRouter";

const connect = mongoose.connect(mongoUrl.url,{useUnifiedTopology : true, useNewUrlParser:true});
connect.then((db : any)=>console.log('connected to db'),(err:any)=>console.log(err));

app.use(bodyParser.json());
app.use('/user', loginRouter);

const server = http.createServer(app);
server.listen(port, hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`);
})