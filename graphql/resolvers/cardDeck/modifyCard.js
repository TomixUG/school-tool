const checkAuth = require("../../../util/auth/checkauth");
const errors = require("../../../util/errors");
const { cardValidation } = require("../../../util/validation");
const CardDecks = require("../../../models/CardDecks");

module.exports = {
  Mutation: {
    async modifyCard(
      _,
      { cardDeckId, cardId, front, back, timeSpent, status },
      context
    ) {
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

      var params = {
        "cards.$.front": front,
        "cards.$.back": back,
        "cards.$.timeSpent": timeSpent,
        "cards.$.status": status,
      };
      for (let prop in params) if (!params[prop]) delete params[prop]; //remove if value is null

      const cd = await CardDecks.findOneAndUpdate(
        { id: cardDeckId, userId: data.userId, "cards.id": cardId },
        {
          $set: params,
        }
      );
      if (!cd) errors.cardDeckIdOrCardIdNotFound();

      return true;
    },
  },
};
