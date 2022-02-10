import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { store } from './redux/store/store';
import App from './App';
import './index.css';
import CreateUserForm from './components/Froms/CreateUserForm/CreateUserForm';
import TableComponent from './components/Table/Table';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<TableComponent />} />
            <Route path="/create" element={<CreateUserForm />} />
            <Route path="/edit/:id" element={<CreateUserForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

