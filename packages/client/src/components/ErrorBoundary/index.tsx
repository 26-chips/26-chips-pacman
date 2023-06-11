import { ErrorPage } from 'pages';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const ErrorBoundary = () => {
  const error = useRouteError();

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
        return <ErrorPage />;
      default:
        //@ts-ignore
        return <ErrorPage {...serverErrorProps} />;
    }
  } else {
    //@ts-ignore
    return <ErrorPage {...clientErrorProps} />;
  }
};
