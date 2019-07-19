const Joi = require('@hapi/joi');

const registerValitator = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(255).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required()
  });

  return Joi.validate(data, schema);
};

const loginValitator = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(255).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required()
  });

  return Joi.validate(data, schema);
};

module.exports = { registerValitator, loginValitator };
