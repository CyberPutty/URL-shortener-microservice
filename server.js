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
  
  // https
 if(req.params.url.match(/www/)){
 Url.findOne({url: req.params.url},function(err,data){
    if (err) console.log(err);
    console.log(data);
   if (data){
     resp.end(JSON.stringify(data));
   }
  });
  console.log(req.params);
 }
else if(req.params.url.match(/d+/)){
Url.findOne({shortened: req.params.url},function(err,data){
if (err) console.log(err);
  if(data){
  resp.end(JSON.stringify(data));
  }
});
} 
else {
  Url.count(function(err,data){
  if (err) console.log(err);
    if(data)
  
  });
Url.save({url: req.params.url.toString(), shortened})

}
 
  
  
  
  
  
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
