import { RouterProvider } from 'react-router-dom';
import { router } from 'router';
import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
