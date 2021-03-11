const jwt = require("jsonwebtoken");

const { refreshTokenId } = require("../randomId");
const RTokens = require("../../models/RTokens");

function genAccessToken(data) {
  //
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

async function genRefreshToken(data) {
  //remove old from db
  var rtokenOld = await RTokens.findOne({ userId: data.userId });
  if (rtokenOld) {
    //delete
    await rtokenOld.remove();
    console.log("Deleted token from db");
  }

  data.refreshTokenId = refreshTokenId();
  //save new token to db
  const rtokens = new RTokens({
    userId: data.userId,
    refreshTokenId: data.refreshTokenId,
  });
  await rtokens.save();

  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

exports.genLoginResponse = function genLoginResponse(data) {
  return {
    token: genAccessToken(data),
    refreshToken: genRefreshToken(data),
  };
};

exports.genAccessToken = genAccessToken;
exports.genRefreshToken = genRefreshToken;
