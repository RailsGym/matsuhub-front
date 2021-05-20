import initializeBasicAuth from "nextjs-basic-auth";

const users = [{ user: "user", password: "password" }];

export default initializeBasicAuth({
  users: users
});
