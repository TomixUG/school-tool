const jwt = require("jsonwebtoken");

const errors = require("../../util/errors");
const RTokens = require("../../models/RTokens");
const {
  genAccessToken,
  genLoginResponse,
} = require("../../util/auth/tokenUtils");

module.exports = {
  Mutation: {
    async refreshToken(_, { refreshToken }) {
      try {
        var data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      } catch (e) {
        errors.invalidRefreshToken();
      }

      var rtokendb = await RTokens.findOne({
        refreshTokenId: data.refreshTokenId,
      });

      if (!rtokendb) return errors.invalidRefreshToken();

      return genLoginResponse({ userId: rtokendb.userId });
    },
  },
};
