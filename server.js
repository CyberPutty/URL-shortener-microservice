// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const mongoose= require('mongoose');
mongoose.connect(process.env.MONGO_URI);

var db = mongoose.connection;

const urls= mongoose.Schema({
  url: String,
  shortened: Number
});

const Url= mongoose.model("Url", urls);


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  

});
app.get("/:url", function(req,resp){
  
  // match urlToShorten;
 if(req.params.url.match(/https:/)){
 Url.findOne({url: req.params.url},function(err,data){
    if (err) console.log(err);
    console.log(data);
   if (data){
     resp.end(JSON.stringify(data));
   }
   else{
     
   }
  });
  console.log(req.params);
 }
  // match shortened;
else if(req.params.url.match(/d+/)){
Url.findOne({shortened: req.params.url},function(err,data){
if (err) console.log(err);
  if(data){
  resp.end(JSON.stringify(data));
  }
});
} 
  // create new entry if entry doesn't exist


  
  });
 
 }
  
 function countAndUpdate(data){
  Url.count(function(err,data){
  if (err) console.log(err);
    if(data){
    let entry= new Url({
    url: req.params.url,
    shortened: data+1
    });
      Url.save(entry);
    resp.end(JSON.stringify(entry));
    }  
  
  
  
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
