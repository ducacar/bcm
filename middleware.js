const Joi = require('joi');
const { ExpressError } = require("./utils/ExpressError");

const contactSchema = Joi.object({
  company: Joi.string().required(),
  email: Joi.string().email().required(),
  number: Joi.string().required(),
  subject: Joi.string(),
  from: Joi.string().required(),
  to: Joi.string().required(),
  message: Joi.string().required(),
});

const validateContactForm = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    throw new ExpressError(validationErrors, 400);
  }

  next();
};

module.exports = {
  validateContactForm,
};