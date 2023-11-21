const { query } = require("../database/database");
const bcrypt = require("bcryptjs");

const login = async (data) => {
  try {
    console.log(data);
    const { email, password } = data;

    if (!email || !password) {
      return { status: 400, message: "Please provide an email and password" };
    }
    const userQuery = "SELECT * FROM users WHERE email = ?";
    const user = await query(userQuery, [email]);
    if (!user[0] || !(await bcrypt.compare(password, user[0].password))) {
      return { status: 401, message: "Email or Password is incorrect" };
    }
    return {
      status: 200,
      message: "Successful",
      user,
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal error" };
  }
};

const register = async (data) => {
  try {
    console.log(data);
    const { first_name, last_name, email, password, confirm_password } = data;

    if (!email || !password || !first_name || !last_name || !confirm_password) {
      return { status: 400, message: "Please fill out all the fields" };
    } else {
      const userQuery = `SELECT * FROM users where email = ?`;
      const existingUser = await query(userQuery, [email]);

      if (existingUser.length > 0) {
        return { status: 409, message: "The email is already in use" };
      } else if (password !== confirm_password) {
        return { status: 400, message: "Passwords don't match" };
      }

      const hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      const insertUserQuery = `INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)`;
      await query(insertUserQuery, [
        email,
        hashedPassword,
        first_name,
        last_name,
      ]);
      return { status: 201, message: "User registered" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal error" };
  }
};


module.exports = {
  login,
  register,
};
