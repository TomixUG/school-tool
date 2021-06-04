const checkAuth = require("../../../util/auth/checkauth");
const errors = require("../../../util/errors");
const { cardValidation } = require("../../../util/validation");
const CardDecks = require("../../../models/CardDecks");

module.exports = {
  Mutation: {
    async modifyCardDeck(_, { cardDeckId, name, description }, context) {
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

      var params = {
        name: name,
        description: description,
      };
      for (let prop in params)
        if (params[prop] === undefined) delete params[prop]; //remove if value is null

      const cd = await CardDecks.findOneAndUpdate(
        { id: cardDeckId, userId: data.userId },
        {
          $set: params,
        }
      );
      if (!cd) errors.cardDeckIdNotFound();

      return true;
    },
  },
};
