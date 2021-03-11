const checkAuth = require("../../../util/auth/checkauth");
const errors = require("../../../util/errors");
const { cardDeckValidation } = require("../../../util/validation");
const CardDecks = require("../../../models/CardDecks");

module.exports = {
  Mutation: {
    async createCardDeck(_, { name, description }, context) {
      const data = checkAuth(context);
      //validate input
      var validation = cardDeckValidation({
        name: name,
        description: description,
      });
      if (validation.error) {
        errors.inputValidationError(
          validation.error.details[0].message,
          validation.error.details[0].path
        );
      }
      const db = new CardDecks({
        userId: data.userId,
        name: name,
        description: description,
      });
      db.save();
      ////////
      return true;
    },
  },
};

// const db = new CardDecks({
//   userId: data.userId,
//   name: name,
//   description: description,
//   cards: [
//     { front: "question", back: "answer", score: 5 },
//     { front: "questdion", back: "ansdddwer", score: 5 },
//     { front: "quefdfdstion", back: "ansfdwer", score: 8 },
//   ],
// });
// db.save();
