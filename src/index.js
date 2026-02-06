import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './app/store';
import App from './App';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Enable performance monitoring for Lighthouse audits
reportWebVitals((result) => {
  // Send to analytics if needed
  if (process.env.NODE_ENV === 'production') {
    // Metrics available: name, value, id, navigationType
    console.debug('Web Vital:', result);
  }
});
