const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};
const Article = mongoose.model("Article", articleSchema);

// app.get("/articles", function (req, res) {
//   Article.find(function (err, foundArticles) {
//     console.log(foundArticles);
//   });
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app
  .route("/articles")
  .get(async (req, res) => {
    try {
      const articles = await Article.find({});
      res.send(articles); //if we want to send it back to the client(localhost:3000/articles) we use res.send
      //console.log(articles); //shows result in command prompt
    } catch (err) {
      console.log(err);
    }
  })
  .post(function (req, res) {
    // console.log(req.body.title);
    // console.log(req.body.content);

    const umair = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    umair.save();

    // umair.save(function (err) {
    //   if (!err) {
    //     res.send("successfully added new article");
    //   } else {
    //     console.log(err);
    //   }
    // });
  })
  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        console.log("Successfully deleted all items");
      } else {
        console.log(err);
      }
    });
  });

app.listen(3000, function () {
  console.log("server started");
});
