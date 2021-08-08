const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "It is a Blog or Daily journal where you can delete or add the posts and have a track of your daily routine.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts=[{title:"po",content:"hi"}];







app.get("/",function(req,res)
{
    res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
})


app.get("/about",function(req,res)
{
  res.render("about",{aboutContent:aboutContent});
})

app.get("/contact",function(req,res)
{
  res.render("contact",{contactContent:contactContent});
})

app.get("/compose",function(req,res)
{
  res.render("compose");
})

app.get("/edit",function(req,res)
{
  res.render("edit");
})


app.get("/posts/:topic",function(req,res)
{
  const requestedTitle=_.lowerCase(req.params.topic);
  var i=0;
  for(i=0;i<posts.length;i++)
  {
    var k=_.lowerCase(posts[i].title);
    if(k===requestedTitle)
    {
      res.render("post",{title:posts[i].title,content:posts[i].content});
      break;
    }
  }

  if(i==posts.length)
  {
    res.send("Match Not Found");
  }
  
  










});


app.post("/compose",function(req,res)
{
  var n=req.body.title;
  var k=req.body.post;
  
  const newPost={
    title:n,
    content:k
  };

  posts.push(newPost);
  res.redirect("/");


})

app.post("/edit",function(req,res)
{
  var n=req.body.title;
  var k=req.body.post;

  var i=0;
  for(;i<posts.length;i++)
  {
    if(posts[i].title==n)
    {
      posts[i].content=k;
      break;
    }
  }

  const newPost={
    title:n,
    content:k
  };

  if(i==posts.length)
  {
    posts.push(newPost);
  }

  res.redirect("/");



})









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
