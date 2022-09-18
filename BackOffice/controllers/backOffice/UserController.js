const mongoose = require("mongoose");
var User = require("../../models/user");
var Role = require("../../models/roles");

const validatorEmail = require("email-validator");
const passwordValidator = require("password-validator");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.registerGet = async function (req, res) {
  if (typeof req.user == "undefined") {
    return res.redirect("/404");
  }

  let roles = await Role.find().distinct("role");

  res.render("../views/users/createUser", {
    userProfile: req.user,
    title: "Register User",
    roles: roles,
  });
};

function validatePhoneNumber(numberPhone) {
  var validation = new RegExp(/^9[1236]{1}[0-9]{7}$/);
  return validation.test(numberPhone);
}

userController.registerPost = function (req, res) {
  if (typeof req.user == "undefined") {
    return res.redirect("/404");
  }

  const { name, email, dateOfBirthday, phoneNumber, address, role } = req.body;
  const dateOfBirthdayV = new Date(dateOfBirthday);

  if (email == undefined || !validatorEmail.validate(email)) {
    res.redirect("/users/register?error=Invalid email");
    return;
  }
  if (name.length < 3) {
    res.redirect("/users/register?error=Invalid name");
    return;
  }
  if (!validatePhoneNumber(phoneNumber)) {
    res.redirect("/users/register?error=Invalid phone number");
    return;
  }
  if (address.length < 3) {
    res.redirect("/users/register?error=Invalid address");
    return;
  }
  if (!dateOfBirthdayV instanceof Date || isNaN(dateOfBirthdayV)) {
    res.redirect("/users/register?error=Invalid date of birthday");
    return;
  }
  if (role == "") {
    res.redirect("/users/register?error=Invalid role");
    return;
  }

  var passwordEncript = bcrypt.hashSync("password", saltRounds);

  User.create(
    {
      name: name,
      email: email,
      dateOfBirthday: dateOfBirthday,
      address: address,
      phoneNumber: phoneNumber,
      password: passwordEncript,
      role: role,
    },
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/users/listUsers");
      }
    }
  );
};

userController.list = function (req, res) {
  if (typeof req.user == "undefined") {
    return res.redirect("/404");
  }

  let query = {};

  const { page, fieldSearch, search } = req.query;

  if (req.user.role != "Admin") {
    query.$and = [];
    query.$and.push({ role: "Client" });
  }

  if (typeof search != "undefined") {
    if (typeof query.$and == "undefined") {
      query.$and = [];
    }

    if (typeof fieldSearch != "undefined" && fieldSearch != "all") {
      query.$and.push({ [fieldSearch]: { $regex: search, $options: "i" } });
    } else {
      let or = [];
      or.push({ name: { $regex: search, $options: "i" } });
      or.push({ email: { $regex: search, $options: "i" } });
      or.push({ role: { $regex: search, $options: "i" } });
      query.$and.push({ $or: or });
    }
  }

  const myCustomLabels = {
    docs: "users",
  };

  const options = {
    page: page != undefined && !isNaN(page) ? page : 1,
    limit: 10,
    customLabels: myCustomLabels,
  };

  User.paginate(query, options, function (err, result) {
    if (err) {
      console.log("Error", err);
    } else {
      result.userProfile = req.user;
      result.title = "List Users";
      res.render("../views/users/listUsers", result);
    }
  });
};

userController.edit = function (req, res) {
  const id = req.params.id;
  const userProfile = req.user;

  if (typeof userProfile == "undefined") {
    return res.redirect("/404");
  }

  User.findOne({ _id: id }).exec(async function (err, user) {
    if (err) {
      console.log("Error", err);
    } else {
      if (userProfile.role == "Employee" && user.role != "Client") {
        return res.redirect("/404");
      }
      let roles = await Role.find().distinct("role");
      res.render("../views/users/editUser", {
        userProfile: userProfile,
        title: "Edit User",
        user: user,
        roles: roles,
      });
    }
  });
};

userController.update = function (req, res) {
  const user = req.user;
  if (typeof req.user == "undefined") {
    return res.redirect("/404");
  }

  const {
    name,
    email,
    dateOfBirthday,
    phoneNumber,
    address,
    role,
    points,
    status,
  } = req.body;
  const dateOfBirthdayV = new Date(dateOfBirthday);

  if (email == undefined || !validatorEmail.validate(email)) {
    res.redirect("/users/register?error=Invalid email");
    return;
  }
  if (name.length < 3) {
    res.redirect("/users/register?error=Invalid name");
    return;
  }
  if (!validatePhoneNumber(phoneNumber)) {
    res.redirect("/users/register?error=Invalid phone number");
    return;
  }
  if (address.length < 3) {
    res.redirect("/users/register?error=Invalid address");
    return;
  }
  if (!dateOfBirthdayV instanceof Date || isNaN(dateOfBirthdayV)) {
    res.redirect("/users/register?error=Invalid date of birthday");
    return;
  }
  if (role == "" || (user.role == "Employee" && role != "Client")) {
    res.redirect("/users/register?error=Invalid role");
    return;
  }
  if (user.role == "Admin" && status == "") {
    res.redirect("/users/register?error=Invalid role");
    return;
  }
  if (points < 0) {
    res.redirect("/users/register?error=Invalid points");
    return;
  }

  const newData = {
    name: name,
    email: email,
    address: address,
    dateOfBirthday: dateOfBirthday,
    phoneNumber: phoneNumber,
    role: role,
    points: points,
  };

  if (user.role == "Admin") {
    newData.status = status;
  }

  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: newData,
    },
    { new: true },
    function (err) {
      if (err) {
        console.log(err);
        res.render("../views/users/edit", {
          userProfile: req.user,
          title: "Update User",
          user: req.body,
        });
      }
      res.redirect("/users/listUsers/");
    }
  );
};

userController.profileGet = function (req, res) {
  const userProfile = req.user;

  if (typeof userProfile == "undefined") {
    return res.redirect("/404");
  }

  const { error, success } = req.query;

  res.render("../views/users/profile", {
    userProfile: userProfile,
    title: "Profile",
    error: error,
    success: success,
  });
};

const validatorPassword = new passwordValidator();

function addRestrictionsPassword(name, email) {
  validatorPassword
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(50) // Maximum length 50
    .has()
    .uppercase(1) // Must have uppercase letters
    .has()
    .lowercase(1) // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .symbols(1) // Must have at least 2 symbols
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf([name, email]); // Blacklist these values
}

userController.profilePost = function (req, res) {
  const userProfile = req.user;

  const { name, email, password, phoneNumber, address, dateOfBirthday } =
    req.body;
  const dateOfBirthdayV = new Date(dateOfBirthday);

  const newValues = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    dateOfBirthday: dateOfBirthday,
  };

  if (email == undefined || !validatorEmail.validate(email)) {
    res.redirect("/users/profile?error=Invalid email");
    return;
  }
  if (name.length < 3) {
    res.redirect("/users/profile?error=Invalid name");
    return;
  }
  if (!validatePhoneNumber(phoneNumber)) {
    res.redirect("/users/profile?error=Invalid phone number");
    return;
  }
  if (!dateOfBirthdayV instanceof Date || isNaN(dateOfBirthdayV)) {
    res.redirect("/users/profile?error=Invalid date of birthday");
    return;
  }
  if (address.length < 3) {
    res.redirect("/users/profile?error=Invalid address");
    return;
  }
  addRestrictionsPassword(name, email);
  if (password != "" && !validatorPassword.validate(password)) {
    res.redirect("/users/profile?error=Very easy password");
  }
  if (password != "") {
    const passwordEncript = bcrypt.hashSync(password, saltRounds);
    newValues.password = passwordEncript;
  }

  User.findByIdAndUpdate(
    userProfile.id,
    {
      $set: newValues,
    },
    { new: true },
    function (err, user) {
      if (err) {
        res.redirect("/users/profile?error=Email is already in use");
      } else {
        res.redirect("/users/profile?success=True");
      }
    }
  );
};

userController.delete = function (req, res) {
  if (typeof req.user == "undefined") {
    return res.redirect("/404");
  }

  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: "Inactive",
      },
    },
    { new: true },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/users/listUsers/");
      }
    }
  );
};

userController.search = async function (req, res) {
  if (typeof req.user == "undefined") {
    return res.redirect("/404");
  }

  const { status } = req.query;
  let query = {};

  if (req.user.role != "Admin") {
    query = { role: "Client" };
  }

  if (status != undefined && status != "Active") {
    query.status = { $eq: "Active" };
  } else if (status != undefined && status != "Inactive") {
    query.status = { $eq: "Inactive" };
  }

  User.find(query).exec(function (err, user) {
    if (err) {
      console.log("Error", err);
    } else {
      res.render("../views/users/listUsers", {
        userProfile: req.user,
        title: "Find Users",
        users: user,
      });
    }
  });
};

module.exports = userController;
