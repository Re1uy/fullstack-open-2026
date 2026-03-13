const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).json({error: 'password should longer than 3'})
  }

  if (!username || username.length < 3) {
    return response.status(400).json({error : 'username should longer than 3'})
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(400).end();
  }
});

usersRouter.get("/", async (request, response) => {
  const result = await User.find({});
  response.json(result);
});

module.exports = usersRouter;
