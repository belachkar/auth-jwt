const Joi = require('@hapi/joi');

// Fields to validate
const name = Joi.string().alphanum().min(2).max(255).required();
const email = Joi.string().email({ minDomainSegments: 2 }).required();
const password = Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required();

const registerValitator = (data) => {
  const schema = Joi.object().keys({ name, email, password });

  return Joi.validate(data, schema);
};

const loginValitator = (data) => {
  const schema = Joi.object().keys({ email, password });

  return Joi.validate(data, schema);
};

module.exports = { registerValitator, loginValitator };
