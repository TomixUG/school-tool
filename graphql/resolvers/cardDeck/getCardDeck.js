const checkAuth = require("../../../util/auth/checkauth");
const CardDecks = require("../../../models/CardDecks");
const errors = require("../../../util/errors");
const shuffle = require("./../../../util/shuffleArray");
module.exports = {
  Query: {
    async getCardDeck(_, { cardDeckId }, context) {
      const data = checkAuth(context);

      var db = await CardDecks.findOne({
        userId: data.userId,
        id: cardDeckId,
      });

      // sort/randomize the cards
      var unplayed = [];
      var good = [];
      var bad = [];
      for (var i = 0; i < db.cards.length; i++) {
        if (db.cards[i].status === "UNPLAYED") unplayed.push(db.cards[i]);
        if (db.cards[i].status === "GOOD") good.push(db.cards[i]);
        if (db.cards[i].status === "BAD") bad.push(db.cards[i]);
      }
      db.cards = shuffle(unplayed).concat(shuffle(bad), shuffle(good));

      if (!db) return errors.cardDeckIdNotFound();
      return {
        name: db.name,
        description: db.description,
        createdAt: db.createdAt,
        numberOfCards: db.cards.length,
        cards: db.cards,
      };
    },
  },
};
