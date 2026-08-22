import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignupPage from './pages/signup';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
