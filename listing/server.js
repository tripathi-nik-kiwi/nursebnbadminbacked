const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require("body-parser");
const router = require('./routes');

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req,res,next){
  var _send = res.send;
  var sent = false;
  res.send = function(data){
    if(sent) return;
    _send.bind(res)(data);
    sent = true;
};
  next();
});

app.use(express.json());
app.use('/admin/listing',router);

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`listing to port ${port}`));
