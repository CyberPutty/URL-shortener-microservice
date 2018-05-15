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
  shortened: String
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
app.get("/https\?\://:url", function(req,resp){
  let regex= new RegExp("www");
  // match urlToShorten;
  //console.log(req.params.url.toString().match(/regex/));
 if(req.params.url.toString().match(regex)){
   console.log("passed regex");
 Url.findOne({url: req.params.url},function(err,data){
    if (err) console.log(err);
   if (data){
     console.log(data);
     resp.json(data);
   }
   // update record if data is null;
   else{
  Url.count(function(err,data){
  if (err) console.log(err);
    let count= data;
    if(data){
      console.log("there is data"+data);
    }
     else{
       count=0;
     } 
      
    let entry= new Url({
    url: req.params.url,
    shortened: "https://chocolate-wizard.glitch.me/"+((count+1).toString())
    });
      entry.save();
    resp.json(entry);
    
  });
   }
  });
  console.log(req.params);
 }
  else{
  resp.sendStatus(400);
  }
  // match shortened;
// else if(req.params.url.match(/d+/)){

// } 
  
});
app.get('/:shortened(\\d+)',function(req,resp){
Url.findOne({shortened: "https://chocolate-wizard.glitch.me/"+ req.params.shortened},function(err,data){
if (err) console.log(err);
  if(data){
    console.log(data.url);
  resp.redirect("https://"+data.url);
  }
  else{
  resp.sendStatus(400);
  }
});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
