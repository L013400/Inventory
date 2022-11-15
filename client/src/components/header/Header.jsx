import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import Login from '../login/Login';
import Popup from '../popup/Popup';
import './Header.css'
import { MainContext } from '../../App';
import { logoutUser, searchData } from '../../context/actions';
import Loader from '../loader/Loader';
import { getData } from '../../context/actions';
import { SEARCH_COLUMNS_ALIAS } from '../../constants/search';

export default function Header() {
  const { state: { user: { isAuthenticated, loading, user }, data:{type} }, dispatch } = useContext(MainContext);
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [searchString, setSearchString] = useState('')
  useEffect(() => {
    if (['/ON-PREM', '/MDM', '/IICS'].includes(location.pathname)) {
      getData(dispatch)(location.pathname.split('/')[1])
      setSearchString('')
    }
  }, [location, dispatch])

  if (showLogin && isAuthenticated) {
    setShowLogin(false)
  }
  function getUserInitial() {
    return user?.name?.[0]?.toUpperCase()
  }

  function logout() {
    logoutUser(dispatch)()
    setShowLogout(false)
  }

  function search() {
    if (searchString && searchString.length)
      searchData(dispatch)(type, searchString)
  }

  return (
    <nav className="header">
      <Link to="ON-PREM" style={{textDecoration:'none'}}><h1 className="logo">Inventory</h1></Link>
      <div className="searchbox">
        <input
          type="text"
          value={searchString}
          className='search-input'
          onChange={(e) => setSearchString(e.target.value)}
          placeholder={`Search by ${SEARCH_COLUMNS_ALIAS[type]}`} />
        <i className="uil uil-search" onClick={search}></i>
      </div>
      <div className="right">
        <NavLink className={({ isActive }) => (isActive && 'linkactive ') + ' links'} to='ON-PREM'>ON-PREM</NavLink>
        <NavLink className={({ isActive }) => (isActive && 'linkactive ') + ' links'} to='MDM'>MDM</NavLink>
        <NavLink className={({ isActive }) => (isActive && 'linkactive ') + ' links'} to='IICS'>IICS</NavLink>
        {loading ? <Loader /> : (isAuthenticated ? <div className="user" onClick={() => setShowLogout(!showLogout)}>
          {getUserInitial()}
        </div> : <button className='btn login-btn' onClick={() => setShowLogin(true)}>Login</button>)}
        {showLogout &&
          <div className="user-info-box">
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <button className='btn logout-btn' onClick={logout}>Logout</button>
          </div>}
      </div>
      {showLogin && <Popup visible={true} collapsible={true} handleVisible={(value) => setShowLogin(value)}>
        <Login />
      </Popup>}
    </nav>
  )
}
