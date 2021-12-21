const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { promisify } = require("util");

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 1338;
const io = require("socket.io")(port, {
  cors: {
    origin: process.env.CLIENT,
    methods: ["GET", "POST"],
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLIENT }));
app.use(cookieParser());

io.on("connection", (socket) => {
  console.log("User Online");

  socket.on("canvas-data", (data) => {
    //console.log(data);
    socket.broadcast.emit("canvas-data", data);
  });
});

// create connection to mysql database
const conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: "3306",
});

//connnect to db
conn.connect();

app.listen(1337, () => {
  console.log("running on port 1337");
});

//insert user data into database
app.post("/register", (req, res) => {
  const {
    username,
    first_name,
    last_name,
    gender_id,
    email,
    class_id,
    password,
    password_confirm,
  } = req.body;

  let student_id = "STU";

  conn.query("SELECT MAX(user_id)+1 as maxid FROM tb_user", (err, result) => {
    maxid = result[0].maxid;
    if (err) {
      console.log(err);
    }
    if (result.length > 0) {
      student_id += result[0].maxid;
    }
    console.log(student_id);
  });

  conn.query(
    "SELECT username FROM tb_user WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        return res.send({ message: "Username is already in use !!!" });
      } else if (password !== password_confirm) {
        return console.log(maxid);
        //return res.send({ message: "Password do not match !!!" });
      } else {
        console.log(req.body);
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log("hashedPassword: " + hashedPassword);

        conn.query(
          "INSERT INTO tb_user(username, password) VALUES (?, ?);",
          [username, hashedPassword],
          (err, result) => {
            if (err) {
              console.log("register1:  " + err);
            }
          }
        );
        conn.query(
          "INSERT INTO tb_student_info(student_id, user_id, first_name, last_name, gender_id, email, class_id) VALUES (?, ?, ?, ?, ?, ?, ?);",
          [
            student_id,
            maxid,
            first_name,
            last_name,
            gender_id,
            email,
            class_id,
          ],
          (err, result) => {
            if (err) {
              console.log("register2:  " + err);
            }
          }
        );
        return res.send({ message: "Sign-up success !!!" });
      }
    }
  );
});

app.put("/forgot-password", async (req, res) => {
  const { username, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 8);
  console.log(hashedPassword);
  conn.query(
    "UPDATE tb_user SET password = ? WHERE username =?;",
    [hashedPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result) {
        res.send({ message: "Change the password successfully!!" });
      } else {
        res.send({ message: "err" });
      }
    }
  );
});

app.get("/api/get/class", (req, res) => {
  conn.query("SELECT * FROM tb_class", (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length > 0) {
      res.send({ result: result });
    }
  });
});
app.get("/api/get/gender", (req, res) => {
  conn.query("SELECT * FROM tb_gender", (err, result) => {
    if (err) {
      res.send(err);
    }

    if (result.length > 0) {
      res.send({ result: result });
    }
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Please provide an usename and password !!!" });
    }

    const data = await new Promise((resole) =>
      conn.query(
        "SELECT * FROM tb_user WHERE username= ? ;",
        [username],
        (err, result) => {
          resole(result);
        }
      )
    );
    console.log(data);
    if (!data || !(await bcrypt.compare(password, data[0].password))) {
      return res
        .status(401)
        .send({ message: "Username or password is incorect !!!" });
    } else {
      if (data[0].role === "student") {
        //console.log("hello");
        conn.query(
          "SELECT * FROM token WHERE username= ? ;",
          [data[0].username],
          (err, result) => {
            const token = jwt.sign(
              {
                user_id: result[0].user_id,
                role: result[0].role,
                student_id: result[0].student_id,
                //username: result[0].username,
                //first_name: result[0].first_name,
                //last_name: result[0].last_name,
                // gender: result[0].gender,
                // birtday: result[0].birtday,
                class_id: result[0].class_id,
                // email: result[0].email,
                // phone_number: result[0].phone_number,
                //address: result[0].address,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
              }
            );
            console.log("Token is: " + token);
            //res.send({ token: token });
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("profile", token, cookieOptions);

            res.send({
              result: result,
            });
          }
        );
      }
      if (data[0].role === "teacher") {
        //console.log("hello");
        conn.query(
          "SELECT * FROM token_teacher WHERE username= ? ;",
          [data[0].username],
          (err, result) => {
            const token = jwt.sign(
              {
                user_id: result[0].user_id,
                role: result[0].role,
                teacher_id: result[0].teacher_id,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: process.env.JWT_EXPIRES_IN,
              }
            );
            console.log("Token is: " + token);
            //res.send({ token: token });
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            res.cookie("profile", token, cookieOptions);

            res.send({
              result: result,
            });
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
});

const isLoggedIn = async (req, res, next) => {
  if (req.cookies.profile) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      console.log("Cookies: " + req.cookies.profile);
      req.decoded = decoded;
    } catch (err) {
      console.log(err);
    }
  }

  next();
};
app.get("/api/get/handlelogin", async (req, res) => {
  if (req.cookies.profile) {
    try {
      //verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      console.log("Cookies: " + req.cookies.profile);
      console.log(decoded);
      res.send({ handle: decoded.role });
    } catch (err) {
      console.log(err);
    }
  }
});
app.get("/logout", (req, res) => {
  res.clearCookie("profile", {
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).send({});
});

app.get("/profile", async (req, res) => {
  if (req.cookies.profile) {
    try {
      //verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      console.log("Cookies: " + req.cookies.profile);
      console.log(decoded);
      conn.query(
        "SELECT * FROM token WHERE user_id= ? ;",
        [decoded.user_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            res.send({ result: result });
            console.log(result[0].birthday);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("err");
    res.send({ message: "err" });
  }
});

app.put("/profile/update", async (req, res) => {
  const { email, phone_number, birthday } = req.body;
  if (req.cookies.profile) {
    try {
      //verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );

      console.log(decoded);
      conn.query(
        "UPDATE tb_student_info SET profile =?, email =?, phone_number =?, birthday =? WHERE user_id =?;",
        [email, phone_number, birthday, decoded.user_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            console.log(result);
            res.send({ message: "success" });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/profile-teacher", async (req, res) => {
  if (req.cookies.profile) {
    try {
      //verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      console.log("Cookies: " + req.cookies.profile);
      console.log(decoded);
      conn.query(
        "SELECT * FROM token_teacher WHERE user_id= ? ;",
        [decoded.user_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            res.send({ result: result });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log("err");
    res.send({ message: "err" });
  }
});

// get data from api from schedule table and subject table
app.get("/api/get/schedule", async (req, res) => {
  if (req.cookies.profile) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      //console.log("Cookies: " + req.cookies.profile);
      console.log(decoded.class_id);

      conn.query(
        "SELECT schedule_id, class_id, startDate, endDate, title FROM tb_schedule, tb_subject where tb_schedule.subject_id = tb_subject.subject_id and startDate > 0 and class_id = ?;",
        [decoded.class_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            res.send({ result: result });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/api/get/schedule-teacher", async (req, res) => {
  let teacher_id;

  if (req.cookies.profile) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      //console.log("Cookies: " + req.cookies.profile);
      //console.log(decoded.class_id);

      conn.query(
        "SELECT schedule_id, class_id, startDate, endDate, title FROM tb_schedule, tb_subject where tb_schedule.subject_id = tb_subject.subject_id and startDate > 0 and teacher_id = ? ORDER BY startDate;",
        [decoded.teacher_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            res.send({ result: result });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

app.post("/api/get/testandquizzes/title", (req, res) => {
  const class_id = req.body.class_id;
  const getTestAndQuizzes =
    "SELECT nameOfTest, numberOfQuestions, note FROM tb_testandquizz WHERE test_id = ?";
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

app.get("/transcript/personal", async (req, res) => {
  if (req.cookies.profile) {
    try {
      //verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      console.log("Cookies: " + req.cookies.profile);
      console.log(decoded);
      conn.query(
        "SELECT  ROW_NUMBER() OVER () AS num, c.title, scores_15p1, scores_15p2, scores_15p3, scores_45p1, scores_semester, (scores_15p1 + scores_15p2 + scores_15p3 + scores_45p1 + scores_semester)/5 as total FROM cte_db.tb_transcript as a, tb_student_info as b, tb_subject as c where a.student_id = b.student_id AND a.subject_id = c.subject_id AND a.student_id= ?;",
        [decoded.student_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            res.send({ result: result });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/transcript/class", async (req, res) => {
  let student_id;
  if (req.cookies.profile) {
    try {
      //verify the token
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      console.log("Cookies: " + req.cookies.profile);
      console.log(decoded);
      conn.query(
        "SELECT  ROW_NUMBER() OVER () AS num,CONCAT(b.first_name,', ',b.last_name) as full_name FROM cte_db.tb_transcript as a, tb_student_info as b, tb_subject as c where a.student_id = b.student_id AND a.subject_id = c.subject_id group by full_name;",
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            res.send({ result: result });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/selectclasses", async (req, res) => {
  if (req.cookies.profile) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      //console.log("Cookies: " + req.cookies.profile);
      //console.log(decoded.class_id);
      conn.query(
        "SELECT class_id FROM tb_teacher_classes WHERE teacher_id=?",
        [decoded.teacher_id],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result.length > 0) {
            res.send({ result: result });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

app.post("/selectclasses/class", async (req, res) => {
  const class_id = req.body.class_id;

  if (req.cookies.profile) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      conn.query(
        "select ROW_NUMBER() OVER () AS num, CONCAT(b.first_name,', ',b.last_name) as full_name, scores_15p1, scores_15p2, scores_15p3, scores_45p1, scores_semester FROM tb_transcript as a, tb_student_info as b WHERE a.student_id = b.student_id and teacher_id = ? and b.class_id = ?;",
        [decoded.teacher_id, class_id],
        (err, result) => {
          res.send({ result: result });
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/selectQuiz", async (req, res) => {
  if (req.cookies.profile) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.profile,
        process.env.JWT_SECRET
      );
      conn.query(
        "select test_id, ROW_NUMBER() OVER () AS num, nameOftest, b.title, concat(c.first_name,',',c.last_name) as teacher , time(startDate) as startDate, time(endDate) as endDate from tb_testandquizz as a, tb_subject as b, tb_teacher_info as c where b.subject_id = a.subject_id and a.teacher_id = c.teacher_id and Now() > startDate and Now() < endDate and a.class_id=?;",
        [decoded.class_id],
        (err, result) => {
          console.log(result);
          if (result.length > 0) {
            res.send({ result: result });
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
});
