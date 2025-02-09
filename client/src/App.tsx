import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { IndexPage } from './page';
import LoginPage from './page/LoginPage';
import ListPage from './page/ListPage';
import RegisterPage from './page/RegisterPage';
import ProtectedRoute from './components/ProtectRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/list' element={<ListPage />} />
        <Route path='/' element={<IndexPage />} />
      </Route>
    </Routes>
  );
};

export default App;
