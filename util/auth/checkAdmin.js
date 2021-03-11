const User = require("../../models/User");
const errors = require("../errors");

module.exports = async function checkAdmin(data) {
  const db = await User.findOne({ id: data.userId }); //get user from DB
  if (!db.permissions.includes("admin")) errors.forbidden();
};
