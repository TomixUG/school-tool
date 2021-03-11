const checkAuth = require("../../../util/auth/checkauth");
const CardDecks = require("../../../models/CardDecks");
const errors = require("../../../util/errors");
module.exports = {
  Query: {
    async getCardDeck(_, { cardDeckId }, context) {
      const data = checkAuth(context);

      var db = await CardDecks.findOne({
        userId: data.userId,
        id: cardDeckId,
      });
      if (!db) return errors.cardDeckIdNotFound();
      return {
        name: db.name,
        description: db.description,
        createdAt: db.createdAt,
        cards: db.cards,
      };
    },
  },
};
