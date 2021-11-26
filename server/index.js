const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// create connection to mysql database
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "cte_db",
  port: "3306",
});

//connnect to db
conn.connect();

app.listen(1337, () => {
  console.log("running on port 1337");
});

//query getting max of user_id
const sql = "SELECT MAX(user_id) FROM tb_user";
const getID = conn.query(sql);

//insert user data into database
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;

  const student_id = "STU" + getID;
  conn.query(
    "INSERT INTO tb_user(username, password) VALUES (?, ?);",
    [username, password],
    (err, result) => {
      console.log(err);
    }
  );
  conn.query(
    "INSERT INTO tb_student_info(student_id, first_name, last_name, email) VALUES (?, ?, ?, ?) WHERE tb_user.user_id = tb_student_info.user_id",
    [student_id, first_name, last_name, email],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = "SELECT role FROM tb_user WHERE username = ? AND password = ?";
  conn.query(sql, [username, password], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      res.send({ result: result });
    } else {
      res.send({ message: "wrong username or password!!" });
    }
  });
});

//update data for schedule
app.post("/schedule", (req, res) => {
  const class_id = req.body.class_id;

  const schedule = " SELECT * FROM tb_schedule;";
  conn.query(schedule, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    }
  });
});

// get data from api from schedule table and subject table
app.get("/api/get/schedule", (req, res) => {
  const schedule =
    "SELECT schedule_id, class_id, startDate, endDate, title FROM tb_schedule, tb_subject where tb_schedule.subject_id = tb_subject.subject_id and startDate > 0";
  conn.query(schedule, (err, result) => {
    //console.log(result);
    res.send(result);
  });
});

app.post("/api/get/testandquizzes/title", (req, res) => {
  const class_id = req.body.class_id;
  const getTestAndQuizzes =
    "SELECT nameOfTest, numberOfQuestions, note FROM tb_testandquizz WHERE class_id = ?";
  conn.query(getTestAndQuizzes, [class_id], (err, result) => {
    if (result.length > 0) {
      res.send({ result: result });
    }
    //console.log({ result: result });
  });
});

async function getOptionsByQuestion(questionId) {
  const getOptions = `SELECT a.optionData FROM tb_option as a, tb_question as b WHERE a.question_id = b.question_id and a.question_id =${questionId};`;
  return await new Promise((resole) =>
    conn.query(getOptions, (err, result) => {
      resole(result);
    })
  );
}

app.get("/api/get/testandquizzes/question", async (req, res) => {
  const getTestAndQuizzes =
    "SELECT question_id, question_title,trueOption, numberOfOption FROM tb_question;";

  conn.query(getTestAndQuizzes, async (error, questions) => {
    const questionRes = [];

    await Promise.all(
      questions.map(async (item) => {
        const options = await getOptionsByQuestion(item.question_id);
        const result = { question: item, options: options };
        questionRes.push(result);
        console.log(questionRes);
      })
    );

    res.send(questionRes);
  });

  //console.log(result);
});
