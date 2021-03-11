const checkAuth = require("../../../util/auth/checkauth");
const CardDecks = require("../../../models/CardDecks");
module.exports = {
  Query: {
    async getOwnCardDecks(_, __, context) {
      const data = checkAuth(context);

      const db = await CardDecks.find({ userId: data.userId });

      //   const response = [];
      //   for (i = 0; i < db.length; i++) {
      //     response.push({
      //       name: db[i].name,
      //       description: db[i].description,
      //       id: db[i].id,
      //       createdAt: db[i].createdAt,
      //     });
      //   }
      // return response;
      return db;
    },
  },
};
