const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный ID');
    }),
  }),
});

const validateRegisterBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'поле "email" не может быть пустым',
        'any.required': 'поле "email" должно быть заполнено',
      }),
    password: Joi.string().min(8).required().pattern(/^\S+$/)
      .messages({
        'string.min': 'минимальная длина поля "password" - 4 символа',
        'string.pattern.base': 'поле "password" содержит недопустимые символы',
        'string.empty': 'поле "password" не может быть пустым',
        'any.required': 'поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'минимальная длина поля "name" - 2 символа',
        'string.max': 'максимальная длина поля "name" - 30 символов',
        'string.empty': 'поле "name" не может быть пустым',
        'any.required': 'поле "name" должно быть заполнено',
      }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'поле "email" не может быть пустым',
        'any.required': 'поле "email" должно быть заполнено',
      }),
    password: Joi.string().min(4).required().pattern(/^\S+$/)
      .messages({
        'string.min': 'минимальная длина поля "password" - 4 символа',
        'string.pattern.base': 'поле "password" содержит недопустимые символы',
        'string.empty': 'поле "password" не может быть пустым',
        'any.required': 'поле "password" должно быть заполнено',
      }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.empty': 'поле "keyword" не может быть пустым',
        'any.required': 'поле "keyword" должно быть заполнено',
      }),
    title: Joi.string().required()
      .messages({
        'string.empty': 'поле "title" не может быть пустым',
        'any.required': 'поле "title" должно быть заполнено',
      }),
    text: Joi.string().required()
      .messages({
        'string.empty': 'поле "text" не может быть пустым',
        'any.required': 'поле "text" должно быть заполнено',
      }),
    date: Joi.string().required()
      .messages({
        'string.empty': 'поле "date" не может быть пустым',
        'any.required': 'поле "date" должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'string.empty': 'поле "source" не может быть пустым',
        'any.required': 'поле "source" должно быть заполнено',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('поле "link" должно быть валидным url-адресом');
    })
      .messages({
        'string.empty': 'поле "link" не может быть пустым',
        'any.required': 'поле "link" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('поле "image" должно быть валидным url-адресом');
    })
      .messages({
        'string.empty': 'поле "image" не может быть пустым',
        'any.required': 'поле "image" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateObjectId, validateLoginBody, validateRegisterBody, validateArticleBody,
};
