const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const errors = require("../../util/errors");
const { genLoginResponse } = require("../../util/auth/tokenUtils");
const { loginValidation } = require("../../util/validation");

module.exports = {
  Mutation: {
    async login(_, { email, password }) {
      //validate input
      var validation = loginValidation({
        email: email,
        password: password,
      });
      if (validation.error) {
        errors.inputValidationError(
          validation.error.details[0].message,
          validation.error.details[0].path
        );
      }

      const user = await User.findOne({ email: email });
      //email not found
      if (!user) return errors.invalidLogin();

      //check if pass is correct
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) return errors.invalidLogin();

      return genLoginResponse({ userId: user.id });
    },
  },
};
