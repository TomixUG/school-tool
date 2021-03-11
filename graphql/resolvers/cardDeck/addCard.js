const checkAuth = require("../../../util/auth/checkauth");
const errors = require("../../../util/errors");
const { cardValidation } = require("../../../util/validation");
const CardDecks = require("../../../models/CardDecks");

module.exports = {
  Mutation: {
    async addCard(_, { cardDeckId, front, back }, context) {
      const data = checkAuth(context);
      //validate input
      var validation = cardValidation({
        front: front,
        back: back,
      });
      if (validation.error) {
        errors.inputValidationError(
          validation.error.details[0].message,
          validation.error.details[0].path
        );
      }

      var db = await CardDecks.updateOne(
        { userId: data.userId, id: cardDeckId },
        { $push: { cards: { front: front, back: back, score: -1 } } }
      );

      if (db.nModified === 0) return errors.cardDeckIdNotFound();

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
