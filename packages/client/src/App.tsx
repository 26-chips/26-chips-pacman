import { RouterProvider } from 'react-router-dom';
import { router } from 'router';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

function App() {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  if (firstRender) {
    return null;
  }

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
