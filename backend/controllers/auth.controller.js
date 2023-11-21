const { login, register } = require("../services/auth.service");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const result = await login({
      email: req.body.email,
      password: req.body.password,
    });
    //console.log(result);
    if (result.status === 200) {
      const token = jwt.sign({ id: result.user[0].id }, process.env.JWT_SECRET);
      return res.status(200).json({ message: result.message, token: token, user: result.user });
    } else {
      return res.status(result.status).json({ message: result.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const registerController = async (req, res) => {
  try {
    const result = await register({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
    });
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  loginController,
  registerController,
};
