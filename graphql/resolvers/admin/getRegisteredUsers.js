const checkAuth = require("../../../util/auth/checkauth");
// const errors = require("../../../util/errors");
const checkAdmin = require("../../../util/auth/checkAdmin");
const User = require("../../../models/User");
module.exports = {
  Query: {
    async getRegisteredUsers(_, __, context) {
      const data = await checkAuth(context);
      await checkAdmin(data); //check if user is admin IMPORTANT

      const db = await User.find({});

      var userMap = [];
      for (i = 0; i < db.length; i++) {
        var isAdmin = db[i].permissions[0] === "admin";
        userMap.push({
          username: db[i].username,
          email: db[i].email,
          createdAt: db[i].createdAt,
          admin: isAdmin,
          id: db[i].id,
        });
      }

      return userMap;
    },
  },
};
