import clsx from 'clsx';
import { Route, Routes } from 'react-router-dom';

import { Custom404 } from './pages/404';
import { Home } from './pages/home';

function App() {
  return (
    <div className={clsx('text-myblack')}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Custom404 />} />
      </Routes>
    </div>
  );
}

export default App;
