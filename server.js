var keys = require("./connectionParam.js");
var express = require("express");

var app = express();

var PORT = process.env.PORT || 3030;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

 var connection = mysql.createConnection({
  host: keys.connection.host,
  dbport: keys.connection.dbport,
  user: keys.connection.user,
  password: keys.connection.password,
  database: keys.connection.database 
}); 

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Serve index.handlebars to the root route.
app.get("/", function (req, res) {

  res.render("home");
  //res.render("test", { questions : data });
});


app.get("/survey", function (req, res) {

  res.render("surveyform");
  //res.render("test", { questions : data });

});

app.post("/survey", function (req, res) {

  connection.query("INSERT INTO friends (name,img_url) VALUES (?, ?)", [req.body.name, req.body.img_url], function (err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }

    var id = result.insertId;


    var values = [
      [req.body.question_id1, id, req.body.answer],
      [req.body.question_id2, id, req.body.answer1],
      [req.body.question_id3, id, req.body.answer2],
      [req.body.question_id4, id, req.body.answer3],
      [req.body.question_id5, id, req.body.answer4],
      [req.body.question_id6, id, req.body.answer5],
      [req.body.question_id7, id, req.body.answer6],
      [req.body.question_id8, id, req.body.answer7],
      [req.body.question_id9, id, req.body.answer8],
      [req.body.question_id10, id, req.body.answer9]
    ];

    connection.query("INSERT INTO answers (question_id,friend_id,answer) VALUES ?", [values], function (err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }

    });
  });
})


app.get("/result", function (req, res) {
  connection.query("SELECT max(friend_id) serchId,sum(answer) answersTot FROM answers where friend_id=(select max(friend_id) from answers);", function (err, data) {
    if (err) {
      return res.status(500).end();
    }
    //var serchId = data.id;
    if (data.length === 0) {
      data = [{
        serchId: 0,
        answersTot: 0
      }]
    }
    var currentUser = data[0].serchId;
    var currentAnswers = data[0].answersTot;

    connection.query("SELECT friend_id,sum(answer) tot FROM answers where friend_id !=? group by friend_id having tot <=? order by tot desc ;", [currentUser, currentAnswers], function (err, result) {
      if (err) {
        return res.status(500).end();
      }
      if (result.length === 0) { result = [{ friend_id: 0, tot: 0 }, { friend_id: 0, tot: 0 }, { friend_id: 0, tot: 0 }] }
      else if (result.length === 1) { result = [{ friend_id: result[0].friend_id, tot: result[0].tot }, { friend_id: 0, tot: 0 }, { friend_id: 0, tot: 0 }] }
      else if (result.length === 2) { result = [{ friend_id: result[0].friend_id, tot: result[0].tot }, { friend_id: result[1].friend_id, tot: result[1].tot }, { friend_id: 0, tot: 0 }] }
      else if (result.length === 3) { result = [{ friend_id: result[0].friend_id, tot: result[0].tot }, { friend_id: result[1].friend_id, tot: result[1].tot }, { friend_id: result[2].friend_id, tot: result[2].tot }] }

      connection.query("SELECT id,name,img_url FROM friends where id in(?,?,?)", [result[0].friend_id, result[1].friend_id, result[2].friend_id], function (err, rows) {
        if (err) {
          return res.status(500).end();
        }

        var myanswer = data[0].answersTot;
        res.render("result", { data: data, match100: rows[0], match75: rows[1], match50: rows[2], rowsLength: rows.length })
      })
    });
  });
});

app.listen(PORT, function (err) {

  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

