const Joi = require("joi");

module.exports.registerValidation = registerValidation = (data) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(4).max(16).required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(64).required().label("Password"),
  });

  return schema.validate(data);
};

module.exports.loginValidation = loginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).max(64).required().label("Password"),
  });

  return schema.validate(data);
};

module.exports.cardDeckValidation = cardDeckValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(1).max(40).label("Name"),
    description: Joi.string().min(1).max(256).required().label("Description"),
  });

  return schema.validate(data);
};
module.exports.cardValidation = cardValidation = (data) => {
  const schema = Joi.object().keys({
    front: Joi.string().min(1).max(1024).label("front"),
    back: Joi.string().min(1).max(1024).label("back"),
  });

  return schema.validate(data);
};
