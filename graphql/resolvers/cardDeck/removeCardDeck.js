const checkAuth = require("../../../util/auth/checkauth");
const errors = require("../../../util/errors");
const CardDecks = require("../../../models/CardDecks");

module.exports = {
  Mutation: {
    async removeCardDeck(_, { cardDeckId }, context) {
      const data = checkAuth(context);

      const cd = await CardDecks.deleteOne({
        id: cardDeckId,
        userId: data.userId,
      });

      if (cd.deletedCount === 0) errors.cardDeckIdNotFound();
      return true;
    },
  },
};
