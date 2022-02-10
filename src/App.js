import './App.css';
import { Outlet } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { fetchUsersAsync } from './redux/actions/userActionCreator'
import ModalComponent from './components/Modal/Modal';

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchUsersAsync)
  })


  return (
    <div className="App">
      <ModalComponent />
      <Outlet />
    </div>
  );
}

export default App;
