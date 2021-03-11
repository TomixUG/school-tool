const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const { genLoginResponse } = require("../../util/auth/tokenUtils");
const { registerValidation } = require("../../util/validation");
const errors = require("../../util/errors");

module.exports = {
  Mutation: {
    async register(_, { email, username, password }) {
      //validate input
      var validation = registerValidation({
        email: email,
        username: username,
        password: password,
      });
      if (validation.error) {
        errors.inputValidationError(
          validation.error.details[0].message,
          validation.error.details[0].path
        );
      }

      //check if email is already in database
      const emailExists = await User.findOne({ email: email });
      if (emailExists) {
        errors.emailDuplicateError();
      }
      //check if username is already in database
      const usernameExists = await User.findOne({
        username: { $regex: new RegExp("^" + username + "$", "i") },
      });
      if (usernameExists) {
        errors.usernameDuplicateError();
      }

      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create user in DB
      const user = new User({
        email: email,
        username: username,
        password: hashedPassword,
      });

      try {
        var savedUser = await user.save();
      } catch (e) {
        console.log(e);
        errors.dbError();
      }

      return genLoginResponse({ userId: savedUser.id });
    },
  },
};
