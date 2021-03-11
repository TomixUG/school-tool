const checkAuth = require("../../../util/auth/checkauth");
const errors = require("../../../util/errors");
const { cardValidation } = require("../../../util/validation");
const CardDecks = require("../../../models/CardDecks");

module.exports = {
  Mutation: {
    async modifyCard(_, { cardDeckId, cardId, front, back, score }, context) {
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
      var cd = await CardDecks.findOne({ id: cardDeckId }); //TODO: make smarter
      if (!cd) errors.cardDeckIdNotFound();
      if (!cd.cards[cardId]) errors.cardIdNotFound();

      var params = {
        ["cards." + cardId + ".front"]: front,
        ["cards." + cardId + ".back"]: back,
        ["cards." + cardId + ".score"]: score,
      };
      for (let prop in params) if (!params[prop]) delete params[prop]; //remove if value is null

      await CardDecks.findOneAndUpdate(
        { id: cardDeckId },
        {
          $set: params,
        }
      );

      return true;
    },
  },
};
