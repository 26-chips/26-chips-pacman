import { ErrorPage } from 'pages';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const ErrorBoundary = () => {
  const error = useRouteError();

  const internalErrorProps = {
    statusCode: '500',
    errorText: 'Внутренняя ошибка сервера :(',
    image: 'Blue',
  };

  if (isRouteErrorResponse(error)) {
    return <ErrorPage />;
  } else {
    return (
      //@ts-ignore
      <ErrorPage {...internalErrorProps} />
    );
  }
};

// type ParentProps = {
//     children: ReactNode;
// };
//
// type State = {
//     error: boolean;
//     errorInfo: string;
// };
//
// export class ErrorBoundary extends Component {
//     constructor(props: ParentProps) {
//         super(props);
//         this.state = { error: false, errorInfo: '' };
//     }
//
//     componentDidCatch(error: Error) {
//         console.error(error)
//
//         this.setState({
//             error: Boolean(error),
//             errorInfo: error.message
//         })
//     }
//
//     render() {
//         if (this.state.errorInfo) {
//             return
//             <ErrorPage
//                 statusCode = '500'
//                 errorText = 'Внутренняя ошибка сервера :(\nМы о ней знаем и скоро все исправим!'
//                 image = 'Blue'
//             />;
//         }
//         return this.props.children;
//     }
// }
