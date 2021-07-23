const getOwnProfile = require("./resolvers/getOwnProfile");
const registerResolver = require("./resolvers/register");
const loginResolver = require("./resolvers/login");
const refreshTokenResolver = require("./resolvers/refreshToken");

const createCardDeck = require("./resolvers/cardDeck/createCardDeck");
const removeCardDeck = require("./resolvers/cardDeck/removeCardDeck");
const modifyCardDeck = require("./resolvers/cardDeck/modifyCardDeck");
const getOwnCardDecks = require("./resolvers/cardDeck/getOwnCardDecks");
const getCardDeck = require("./resolvers/cardDeck/getCardDeck");
const addCard = require("./resolvers/cardDeck/addCard");
const modifyCard = require("./resolvers/cardDeck/modifyCard");
const removeCard = require("./resolvers/cardDeck/removeCard");
const resetCards = require("./resolvers/cardDeck/resetCards");

const getRegisteredUsers = require("./resolvers/admin/getRegisteredUsers"); //admin
const adminDelete = require("./resolvers/admin/adminDelete"); //admin

module.exports = {
  Query: {
    ...getOwnProfile.Query,
    ...getRegisteredUsers.Query,
    ...getOwnCardDecks.Query,
    ...getCardDeck.Query,
  },
  Mutation: {
    ...registerResolver.Mutation,
    ...loginResolver.Mutation,
    ...refreshTokenResolver.Mutation,
    ...adminDelete.Mutation,
    ...createCardDeck.Mutation,
    ...removeCardDeck.Mutation,
    ...modifyCardDeck.Mutation,
    ...addCard.Mutation,
    ...modifyCard.Mutation,
    ...removeCard.Mutation,
    ...resetCards.Mutation,
  },
};
