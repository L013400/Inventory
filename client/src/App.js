import React, { useEffect, useReducer } from 'react';
import './App.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import Details from './components/details/Details';
import rootReducer from './context/reducer';
import { loadUser, logoutUser } from './context/actions';
import setAuthToken from './utils/setAuthToken';
import DefaultLayout from './components/layout/DefaultLayout';
import Header from './components/header/Header';
import Error404 from './components/error/Error404';
import Toast from './components/Toast/Toast';


const store = {
  user: {
    loading: false,
    user: null,
    isAuthenticated: false,
    error: null
  },
  data: {
    loading: false,
    data: null,
    type:null,
    searchedData: [],
    error: null
  },
  alerts: []
}


export const MainContext = React.createContext()
function withLayout(component) {
  return <DefaultLayout>
    {component}
  </DefaultLayout>
}
function App() {
  const [state, dispatch] = useReducer(rootReducer, store)
  useEffect(() => {
    if (localStorage.token) {
      loadUser(dispatch)()
    }
  }, [])
  if (localStorage.expAt && localStorage.expAt < Date.now()){
    logoutUser(dispatch)()
    window.location.reload()
  }

  if (localStorage.token)
    setAuthToken(localStorage.token)
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/')
      navigate('/ON-PREM')

  }, [location.pathname, navigate])
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Header />
        {state.alerts.length ? <Toast /> : null}
        <Routes>
          <Route path='/ON-PREM' element={withLayout(<Details />)} />
          <Route path='/MDM' element={withLayout(<Details />)} />
          <Route path='/IICS' element={withLayout(<Details />)} />
          <Route path='*' element={withLayout(<Error404 />)} />
        </Routes>
      </div>
    </MainContext.Provider>
  );
}

export default App;
