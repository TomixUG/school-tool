const { gql } = require("apollo-server");

module.exports = gql`
  type LoginResponse {
    token: String!
    refreshToken: String!
  }

  type User {
    id: ID!
    username: String!
    createdAt: String!
  }

  type OwnProfile {
    username: String!
    email: String!
    createdAt: String!
    admin: Boolean!
  }

  #admin
  type RegisteredUsers {
    id: String!
    username: String!
    email: String!
    createdAt: String!
    admin: Boolean!
  }
  #carddecks
  type OwnCardDecks {
    name: String!
    description: String
    id: String!
    createdAt: String!
  }

  enum CardStatus {
    UNPLAYED
    GOOD
    BAD
  }

  type Card {
    id: String!
    front: String!
    back: String!
    timeSpent: Float
    status: CardStatus!
  }

  type CardDeck {
    name: String!
    description: String
    createdAt: String!
    numberOfCards: Int!
    cards: [Card]!
  }

  ###################
  type Query {
    getOwnProfile: [OwnProfile]
    #admin
    getRegisteredUsers: [RegisteredUsers]
    #carddecks
    getOwnCardDecks: [OwnCardDecks]
    getCardDeck(cardDeckId: String!): CardDeck!
  }

  type Mutation {
    # prettier-ignore
    register(email: String!, username: String!, password: String!): LoginResponse!
    login(email: String!, password: String!): LoginResponse!
    refreshToken(refreshToken: String!): LoginResponse!
    #admin
    adminDelete(idToDelete: String!, whatToDelete: String!): Boolean!
    #carddecks
    createCardDeck(name: String!, description: String): Boolean!
    removeCardDeck(cardDeckId: String!): Boolean!
    modifyCardDeck(
      cardDeckId: String!
      name: String
      description: String
    ): Boolean!
    addCard(cardDeckId: String!, front: String!, back: String!): Boolean!
    modifyCard(
      cardDeckId: String!
      cardId: String!
      front: String
      back: String
      timeSpent: Float
      status: CardStatus
    ): Boolean!
    removeCard(cardDeckId: String!, cardId: String!): Boolean!
  }
`;
