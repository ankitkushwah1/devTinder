const validator = require("validator");
const bcrypt = require("bcrypt");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a strong Password");
  }
};

const validateLoginData = (req) => {
  const { emailId } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

const validateForgetPassword = (req) => {
  const { oldPassword, newPassword } = req.body;
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Please Enter Strong Password");
  } else if (oldPassword === newPassword) {
    throw new Error("Your have enter old and new password same");
  }
};
module.exports = {
  validateSignUpData,
  validateLoginData,
  validateProfileEditData,
  validateForgetPassword,
};
