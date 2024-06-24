import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { ValidateEmailProvider } from './context/useValidateEmail';
import { AuthProvider } from './context/useAuth';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <React.StrictMode>
        <ValidateEmailProvider>
            <ToastContainer position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <App />
        </ValidateEmailProvider>
      </React.StrictMode>
    </AuthProvider>
  </BrowserRouter>
);