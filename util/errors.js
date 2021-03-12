const { ApolloError } = require("apollo-server");

module.exports.inputValidationError = inputValidationError = (
  message,
  path
) => {
  throw new ApolloError(message, "INPUT_VALIDATION_ERROR", {
    details: { path: path },
  });
};

module.exports.emailDuplicateError = emailDuplicateError = () => {
  throw new ApolloError("Email already exists", "EMAIL_ALREADY_EXISTS");
};

module.exports.invalidLogin = invalidLogin = () => {
  throw new ApolloError("Invalid login details", "INVALID_LOGIN");
};

module.exports.usernameDuplicateError = usernameDuplicateError = () => {
  throw new ApolloError("Username already exists", "USERNAME_ALREADY_EXISTS");
};

module.exports.dbError = dbError = () => {
  throw new ApolloError("DB Error", "DB_ERROR");
};

//auth
module.exports.invalidToken = invalidToken = () => {
  throw new ApolloError("Invalid access token", "INVALID_TOKEN");
};
module.exports.missingToken = missingToken = () => {
  throw new ApolloError("Access token not provided", "MISSING_TOKEN");
};
module.exports.missingRefreshToken = missingRefreshToken = () => {
  throw new ApolloError("Refresh token not provided", "MISSING_REFRESH_TOKEN");
};
module.exports.invalidRefreshToken = invalidRefreshToken = () => {
  throw new ApolloError("Invalid refresh token", "INVALID_REFRESH_TOKEN");
};

//admin
module.exports.forbidden = forbidden = () => {
  throw new ApolloError("Forbidden, nice try lol :D", "403");
};
module.exports.whatToDeleteIsNotValid = whatToDeleteIsNotValid = () => {
  throw new ApolloError(
    "whatToDelete is not valid",
    "WHATTODELETE_IS_NOT_VALID"
  );
};
module.exports.idToDeleteIsNotValid = idToDeleteIsNotValid = () => {
  throw new ApolloError("idToDelete is not valid", "IDTODELETE_IS_NOT_VALID");
};
//carddeck
module.exports.cardDeckIdNotFound = cardDeckIdNotFound = () => {
  throw new ApolloError("Card Deck ID not found", "CARDDECKID_NOT_FOUND");
};
module.exports.cardIdNotFound = cardIdNotFound = () => {
  throw new ApolloError("Card ID not found", "CARDID_NOT_FOUND");
};
module.exports.cardDeckIdOrCardIdNotFound = cardDeckIdOrCardIdNotFound = () => {
  throw new ApolloError(
    "Card Deck ID Or Card ID Not Found",
    "CARDDECKID_OR_CARDID_NOT_FOUND"
  );
};
