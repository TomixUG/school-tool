const jwt = require("jsonwebtoken");

const { invalidToken, missingToken } = require("../errors");

module.exports = (context) => {
  {
    const authHeader = context.req.headers.authorization;
    if (!authHeader) missingToken();
    const token = authHeader.split("Bearer ")[1];
    if (!token) missingToken();

    // console.log(token);

    //verify
    try {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return data;
    } catch (e) {
      invalidToken();
    }
  }
};
