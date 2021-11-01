const mongoose = require("./index");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

const User = mongoose.model("users", userSchema);

const findUser = async (username, password) => {
  const result = await User.findOne({
    username: username,
    password: password,
  });
  return result;
};

const findUserById = async (id) => {
  const result = await User.findOne({
    _id: id,
  });
  return result;
};

exports.GetAll = async (id) => {
  const users = await User.find({});
  if (!users) {
    throw new Error("Wrong username or password");
  } else {
    return users;
  }
};

exports.register = async (username, password) => {
  const result = await User.findOne({
    username: username,
  });
  if (result) {
    throw new Error("Username existed");
  } else {
    const user = new User({
      username: username,
      password: password,
      role: "client",
    });
    user.save((err, user) => {
      if (err) {
        throw new Error("Something wrong");
      }
      return user;
    });
  }
};

exports.login = async (username, password) => {
  const user = await findUser(username, password);
  if (user) {
    return user; //token đâu // chô này vẫn thế mà chưa sửa
  } else {
    throw new Error("Wrong username or password");
  }
};

exports.changePass = async (username, password, newPass) => {
  const user = await findUser(username, password);
  if (!user) {
    throw new Error("Not found username or password");
  } else {
    console.log(username, password, newPass);
    await User.updateOne(
      {
        username: username,
        password: password,
      },
      {
        $set: { password: newPass },
      }
    );
    return user;
  }
};

exports.GetUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    throw new Error("Wrong username or password");
  } else {
    return user;
  }
};

exports.deleteAccount = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    throw new Error("Wrong username or password");
  } else {
    const result = await User.deleteOne({
      _id: id,
    });
    return result;
  }
};
