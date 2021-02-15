module.exports = {
  successMessage: {
    removeArticle: "Пост успешно удален",
    authorization: "Авторизация прошла успешно",
  },

  clientErrorMessage: {
    incorrectEmail: "Неправильный формат почты",
    validationError: "Ошибка валидации",
    forbidden: "Вы не можете совершить данное действие",
    forbiddenArticle: "Вы не можете удалить данную статью",
    emailOrPasswordError: "Введены неверные email или пароль",
    castError: "В запросе переданы значения неправильного типа",
    unauthorized: "Необходима авторизация",
    tokenError: "С токеном что-то не так",
    notFoundArticle: "Статья не найдена",
    notFoundUser: "Пользователь не найден",
    notFoundRes: "Запрашиваемый ресурс не найден",
    conflictUser: "Пользователь с таким email уже зарегистрирован",
    tooManyRequests: "Ой... запросы, поступившие с вашего IP-адреса, похожи на автоматические. Повторите попытку позже",
  },

  serverErrorMessage: {
    serverError: "На сервере произошла ошибка",
    disconnectedError: "Нет соединения с базой данных",
    serverFallError: "Сервер сейчас упадёт",
  },
};
