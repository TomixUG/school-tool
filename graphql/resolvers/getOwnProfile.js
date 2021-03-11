const checkAuth = require("../../util/auth/checkauth");
const User = require("../../models/User");
module.exports = {
  Query: {
    async getOwnProfile(_, __, context) {
      const data = checkAuth(context);

      const db = await User.findOne({ id: data.userId });
      var admin = db.permissions.includes("admin");

      return [
        {
          username: db.username,
          email: db.email,
          createdAt: db.createdAt.toISOString(),
          admin: admin,
        },
      ];
    },
  },
};
