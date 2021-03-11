const getOwnProfile = require("./resolvers/getOwnProfile");
const registerResolver = require("./resolvers/register");
const loginResolver = require("./resolvers/login");
const refreshTokenResolver = require("./resolvers/refreshToken");

const createCardDeck = require("./resolvers/cardDeck/createCardDeck");
const getOwnCardDecks = require("./resolvers/cardDeck/getOwnCardDecks");
const getCardDeck = require("./resolvers/cardDeck/getCardDeck");
const addCard = require("./resolvers/cardDeck/addCard");

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
    ...addCard.Mutation,
  },
};
