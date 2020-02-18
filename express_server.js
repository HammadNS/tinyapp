const express = require("express");
const app = express();
app.set('view engine', 'ejs');
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: false
}));

app.set("view engine", "ejs");

const urlDatabase = {
  
  "b2xvn2": {
    longURL: "http://www.lighthouselabs.ca", 
    
  },
  "9sd5xk": {
    longURL: "http://www.google.com", 
  }
};

function generateRandomString(num) {
  var num = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     num += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return num;
}


//generates short url
app.post("/urls", (req, res) => {
let shortURL = generateRandomString();
urlDatabase[shortURL] = {
  longURL: req.body.longURL,
};
res.redirect("/urls/" + shortURL);  
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  res.send("200 OK");         // Respond with 'Ok' (we will replace this)
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

//shorten url
app.get("/urls/:shortURL", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: req.body.longURL };
  res.render("urls_show", templateVars);
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) =>{
  res.json(urlDatabase);
});

app.post("/urls/:shortURL/delete", (req,res) =>{

  delete urlDatabase[req.params.shortURL];
  res.redirect("/urls");


});