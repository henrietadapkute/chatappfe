import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App/App';
import './styles/global.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChatProvider } from './context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ChatProvider>
        <App />
      </ChatProvider>
    </Router>
  </React.StrictMode>
);
