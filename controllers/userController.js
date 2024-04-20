const UserModel = require('../models/userModel');

const loginController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const password = req.body.password;
    console.log("useridpass", userId, password)
    const user = await UserModel.findOne({ userId, password });
    console.log("user", user);
    if (user) {
      res.status(200).send('Login Success!');
    } else {
      res.status(401).send('Invalid credentials or account not verified.');
    }
  } catch (error) {
    console.error(error);

  }
};

const registerController = async (req, res) => {
  try {
    const newUser = new UserModel({...req.body });
    await newUser.save();
    res.status(201).send('New User Added Successfully!');
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { loginController, registerController };