import { Route, Routes } from 'react-router-dom';
import { paths } from 'router';
import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        {paths.map(route => {
          return <Route key={route.path} {...route} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
