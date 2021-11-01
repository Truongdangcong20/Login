const PORT = 8000;
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./repositories");
const {
  register,
  login,
  changePass,
  deleteAccount,
  GetUserById,
  GetAll,
} = require("./repositories/user");
const { checkLogin, isLogin } = require("./middleware");
const {
  createCourse,
  deleteCourseById,
  deleteCourseByName,
  deleteCourseByTime,
  deleteCourseByType,
  deleteCourseByAddress,
  updateCourse,
  showAllCourse,
  showCourseByName,
  showCourseByTime,
  showCourseByType,
  showCourseByAddress,
} = require("./repositories/course");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.get("/", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({
      message: "Unauthorized",
    });
  } else {
    try {
      const j = await jwt.verify(token, "test");
      res.status(200).send({
        role: j.role,
      });
    } catch (e) {
      console.log(e.message);
      res.status(401).send({
        message: e.message,
      });
    }
  }
});

app.get("/get-all", async (req, res) => {
  try {
    const result = await GetAll();
    res.json(result);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await login(username, password);
    if (result) {
      const data = {
        _id: result._id,
        username: result.username,
        role: result.role,
      };

      const token = jwt.sign(data, "test", {
        expiresIn: "10000000s",
      });
      res.json({ token, username }); // tim cai gi
    }
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const result = await register(username, password);
    res.json({
      result,
      message: "Successful",
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.get("/get-by-id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await GetUserById(id);
    res.json(result);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.put("/change-password", async (req, res) => {
  const { username, password, newPass } = req.body;
  try {
    await changePass(username, password, newPass);
    res.json({
      message: "Successful",
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.delete("/delete-account/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("id: " + id);
    const result = await deleteAccount(id);
    res.json(result);
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.post("/create-course", async (req, res) => {
  const { name, type, time, address } = req.body;
  if (type !== "Online" && type != "Offline") {
    res.status(400).send({
      message: "Bad request",
    });
  } else {
    try {
      await createCourse(name, time, type, address);
      res.status(200).send("ok");
    } catch (e) {
      res.status(400).send({
        message: "Bad request",
      });
    }
  }
});

app.post("/delete-course-id", async (req, res) => {
  const { _id } = req.body;
  try {
    await deleteCourseById(_id);
    res.status(200).send("ok");
  } catch (e) {
    res.status(400).send({
      message: "Bad request",
    });
  }
});

app.post("/delete-course-name", async (req, res) => {
  const { name } = req.body;
  try {
    await deleteCourseByName(name);
    res.status(200).send("ok");
  } catch (e) {
    res.status(400).send({
      message: "Bad request",
    });
  }
});

app.post("/delete-course-time", async (req, res) => {
  const { time } = req.body;
  try {
    await deleteCourseByTime(time);
    res.status(200).send("ok");
  } catch (e) {
    res.status(400).send({
      message: "Bad request",
    });
  }
});

app.post("/delete-course-type", async (req, res) => {
  const { type } = req.body;
  if (type !== "Online" && type != "Offline") {
    res.status(400).send({
      message: "Bad request",
    });
  } else {
    try {
      await deleteCourseByType(type);
      res.status(200).send("ok");
    } catch (e) {
      res.status(400).send({
        message: "Bad request",
      });
    }
  }
});

app.post("/delete-course-address", async (req, res) => {
  const { address } = req.body;
  try {
    await deleteCourseByAddress(address);
    res.status(200).send("ok");
  } catch (e) {
    res.status(400).send({
      message: "Bad request",
    });
  }
});

app.post("/update-course", async (req, res) => {
  const { _id, name, time, type, address } = req.body;
  if (type !== "Online" && type != "Offline") {
    res.status(400).send({
      message: "Bad request",
    });
  } else {
    try {
      await updateCourse(_id, name, time, type, address);
      res.status(200).send("ok");
    } catch (e) {
      res.status(400).send({
        message: "Bad request",
      });
    }
  }
});

app.post("/show-course", async (req, res) => {
  const result = await showAllCourse();
  res.json(result);
});

app.post("/show-course-name", async (req, res) => {
  const { name } = req.body;
  const result = await showCourseByName(name);
  res.json(result);
});

app.post("/show-course-time", async (req, res) => {
  const { time } = req.body;
  const result = await showCourseByTime(time);
  res.json(result);
});

app.post("/show-course-type", async (req, res) => {
  const { type } = req.body;
  const result = await showCourseByType(type);
  res.json(result);
});

app.post("/show-course-address", async (req, res) => {
  const { address } = req.body;
  const result = await showCourseByAddress(address);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Running at ${PORT}`);
});
