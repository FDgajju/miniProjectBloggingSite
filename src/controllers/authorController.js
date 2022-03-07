const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");

const createAuthor = async function (req, res) {
  try {
    let { body } = req;

    if (Object.keys(body).length === 0) {
      return res
        .status(404)
        .send({ status: "INVALID", message: "Invalid requested Body" });
    }

    const { fname, lname, email, password, title } = body;

    if (!fname || fname.trim() === "") {
      return res
        .status(400)
        .send({ status: false, message: "invalid required filled 'fname'" });
    }

    if (!lname || lname.trim() === "") {
      return res
        .status(400)
        .send({ status: false, message: "invalid required filled 'lname'" });
    }

    if (title) {
      if (["Mr", "Mrs", "Miss"].indexOf(title) === -1) {
        return res.status(400).send({
          status: false,
          message: "Title must be 'Mr', 'Mrs', 'Miss'",
        });
      }
    }

    if (!email || email.trim() === "") {
      return res
        .status(400)
        .send({ status: false, message: "invalid required filled 'email'" });
    }

    const isEmailAlreadyUsed = await authorModel.findOne({ email: email });

    if (isEmailAlreadyUsed) {
      return res
        .status(400)
        .send({ status: false, message: "email already exist, please login!" });
    }

    if (!password || password.trim() === "") {
      return res
        .status(400)
        .send({ status: false, message: "invalid required filled 'password'" });
    }

    if (password.length < 8 || password.length > 15) {
      return res
        .status(400)
        .send({ status: false, message: "password length between 8 to 15" });
    }

    let savedData = await authorModel.create(body);
    res.status(200).send({
      status: "CREATED",
      message: "data successfully created",
      data: savedData,
    });
  } catch (error) {
    res.status(500).send({ status: "failed", message: error.message });
  }
};

//login author ---------
const loginAuthor = async function (req, res) {
  try {
    const { body } = req;

    const { email, password } = body;

    if (email && password) {
      const author = await authorModel.findOne({
        email: email,
        password: password,
      });

      if (author) {
        const payload = { _id: author._id };
        const token = jwt.sign(payload, "backend");
        return res
          .status(200)
          .send({ status: true, data: author, token: token });
      } else {
        return res
          .status(400)
          .send({ status: false, msg: "invalid email and password" });
      }
    } else {
      return res.status(400).send({
        status: false,
        msg: "request body must contain email and password",
      });
    }
  } catch (err) {
    res
      .status(500)
      .send({ status: "something went wrong", error: err.message });
  }
};

module.exports = { createAuthor, loginAuthor };
