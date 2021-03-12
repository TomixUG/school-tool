const checkAuth = require("../../../util/auth/checkauth");
const errors = require("../../../util/errors");
const CardDecks = require("../../../models/CardDecks");

module.exports = {
  Mutation: {
    async removeCard(_, { cardDeckId, cardId }, context) {
      const data = checkAuth(context);

      const cd = await CardDecks.updateOne(
        { id: cardDeckId, userId: data.userId },
        { $pull: { cards: { id: cardId } } }
      );
      if (cd.nModified === 0) errors.cardDeckIdOrCardIdNotFound();

      return true;
    },
  },
};
