import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';

import { useAuth } from './providers/AuthProvider.jsx';

import NavBar from './components/NavBar.jsx';
import ChatPage from './pages/chat/page.jsx';
import ErrorPage from './pages/errors/404.jsx';
import LoginPage from './pages/login/page.jsx';
import routes from './routes.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const PrivateOutlet = () => {
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

const PublicOutlet = () => {
  const { loggedIn } = useAuth();
  return loggedIn ? <Navigate to={routes.chatPage()} /> : <Outlet />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <NavBar />
      <Routes>
        <Route path={routes.chatPage()} element={<PrivateOutlet />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path={routes.loginPage()} element={<PublicOutlet />}>
          <Route path="" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  </BrowserRouter>
);

export default App;
