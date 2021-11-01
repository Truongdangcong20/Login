export class User {
  _id: String;
  username: String;
  password: String;
  role: String;
  newPass?: String;
  constructor() {}
}

export class UserLogin {
  username: String;
  password: String;
  constructor() {}
}
