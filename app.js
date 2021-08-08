const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");



const homeStartingContent = "It is a Blog or Daily journal where you can delete or add the posts and have a track of your daily routine.";
const aboutContent = "It is a Blog or Daily Journal where you can add delete update the posts  and have a track of your daily routine";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts=[];







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

app.get("/remove",function(req,res)
{
  res.render("remove");
})


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

  res.redirect("/");



})

app.post("/remove",function(req,res)
{
  var n=req.body.title;
  var i=0;
  for(;i<posts.length;i++)
  {
    if(posts[i].title===n)
    {
      var k=posts.splice(i,1);
      break;
    }
  }

  res.redirect("/");
})









app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
