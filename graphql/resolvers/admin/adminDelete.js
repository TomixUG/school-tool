const User = require("../../../models/User");

const errors = require("../../../util/errors");
const checkAuth = require("../../../util/auth/checkauth");
const checkAdmin = require("../../../util/auth/checkAdmin");

module.exports = {
  Mutation: {
    async adminDelete(_, { idToDelete, whatToDelete }, context) {
      const data = checkAuth(context);
      await checkAdmin(data);

      if (whatToDelete === "user") {
        //
        var db = await User.findOneAndDelete({ id: idToDelete });
        //   } else if (whatToDelete === "ranklist") {
      } else {
        errors.whatToDeleteIsNotValid();
      }

      if (!db) errors.idToDeleteIsNotValid(); //removing failed
      return true; //finished
    },
  },
};
