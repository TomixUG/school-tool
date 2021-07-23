const checkAuth = require("../../../util/auth/checkauth");
const errors = require("../../../util/errors");
const CardDecks = require("../../../models/CardDecks");

module.exports = {
  Mutation: {
    async resetCards(_, { cardDeckId }, context) {
      const data = checkAuth(context);

      const cd = await CardDecks.findOne({
        id: cardDeckId,
        userId: data.userId,
      });
      if (!cd) errors.cardDeckIdNotFound();

      for (var i = 0; i < cd.cards.length; i++) {
        cd.cards[i].status = "UNPLAYED";
        cd.cards[i].timeSpent = undefined;
      }

      await cd.save();

      return true;
    },
  },
};
