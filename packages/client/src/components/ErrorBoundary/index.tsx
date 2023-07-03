import { ErrorPage } from 'pages';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const ErrorBoundary = () => {
  const error = useRouteError();

  const errorProps404 = {
    statusCode: '404',
    errorText:
      'Страница не найдена :(\nВозможно, вы ввели некорректный адрес, проверьте и попробуйте еще раз',
    image: 'Blue',
  };

  const serverErrorProps = {
    statusCode: '500',
    errorText:
      'Внутренняя ошибка сервера :(\nМы о ней знаем и скоро все исправим!',
    image: 'Blue',
  };

  const clientErrorProps = {
    statusCode: 'ОЙ',
    errorText: 'Ошибка, уже исправляем',
    image: 'Purple',
  };

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return <ErrorPage {...errorProps404} />;
      default:
        //@ts-ignore
        return <ErrorPage {...serverErrorProps} />;
    }
  } else {
    //@ts-ignore
    return <ErrorPage {...clientErrorProps} />;
  }
};
