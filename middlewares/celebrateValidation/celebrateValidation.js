const { celebrate, Joi } = require("celebrate");
const { urlRegex } = require("../../config/config");
const {
  empty,
  validUrl,
  min,
  max,
  required,
  emailMessage,
  alphanum,
  length,
  hex,
} = require("../../utils/celebrateErrorsMessages");

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({ "string.empty": empty }),
    title: Joi.string().required().messages({ "string.empty": empty }),
    text: Joi.string().required().messages({ "string.empty": empty }),
    date: Joi.string().required().messages({ "string.empty": empty }),
    source: Joi.string().required().messages({ "string.empty": empty }),
    link: Joi.string().pattern(urlRegex).required().messages({
      "string.pattern.base": validUrl,
      "string.empty": empty,
      "any.required": required,
    }),
    image: Joi.string().pattern(urlRegex).required().messages({
      "string.pattern.base": validUrl,
      "string.empty": empty,
      "any.required": required,
    }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().hex().length(24)
      .messages({
        "string.empty": empty,
        "string.alphanum": alphanum,
        "string.length": length,
        "string.hex": hex,
        "any.required": required,
      }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": emailMessage,
      "string.empty": empty,
      "any.required": required,
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": min,
      "string.empty": empty,
      "any.required": required,
    }),
  }),
});

const validateUserRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": emailMessage,
      "string.min": min,
      "string.empty": empty,
      "any.required": required,
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": min,
      "string.empty": empty,
      "any.required": required,
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        "string.min": min,
        "string.max": max,
        "string.empty": empty,
        "any.required": required,
      }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24)
      .messages({
        "string.empty": empty,
        "string.alphanum": alphanum,
        "string.length": length,
        "string.hex": hex,
        "any.required": required,
      }),
  }),
});

module.exports = {
  validateArticle,
  validateArticleId,
  validateUser,
  validateUserRegister,
  validateId,
};
