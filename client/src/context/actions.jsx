import axios from "axios"
import {
  LOGIN_USER, LOAD_USER,
  LOGOUT, LOAD_USER_FAIL, LOGIN_USER_FAIL, LOAD_USER_START, GET_DATA_START,
  GET_DATA_FAIL, GET_DATA_SUCCESS, UPDATE_DATA_START, UPDATE_DATA_FAIL,
  UPDATE_DATA_SUCCESS, SEARCH_DATA, ADD_ALERT, REMOVE_ALERT
} from "./types"
import { generateRandomId } from "../constants/random"
import { TOAST } from "../constants/toast"
//axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
export const loginUser = (dispatch) => async (email, password) => {
  if (email.length && password.length)
    try {
      const res = await axios.post('/user/login', {
        email,
        password
      })
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      })
      const data = {
        id: generateRandomId(),
        type: TOAST.SUCCESS,
        message: 'Login Success'
      }
      addAlert(dispatch, data)
    } catch (err) {
      let errorObj = {
        404: 'User not found. Please use valid email.',
        401: 'Invalid credentials. Please try again',
        500: 'Error occured at server.'
      }
      let error = errorObj[err?.response?.status] || err?.response?.data?.error || 'Server error'
      dispatch({
        type: LOGIN_USER_FAIL
      })

      const data = {
        id: generateRandomId(),
        type: TOAST.ERROR,
        message: error
      }
      addAlert(dispatch, data)

    }

}


export const loadUser = (dispatch) => async () => {
  dispatch({
    type: LOAD_USER_START
  })
  try {
    const res = await axios.get('/user/')
    dispatch({
      type: LOAD_USER,
      payload: res.data
    })
  } catch (err) {

    dispatch({
      type: LOAD_USER_FAIL
    })
    if (err?.response?.status && err.response.status === 401) {
      localStorage.token && (localStorage.removeItem('token') && window.location.reload())
    }
  }
}

export const logoutUser = (dispatch) => async () => {
  dispatch({
    type: LOGOUT
  })
}


export const getData = (dispatch) => async (type) => {
  type = type.toUpperCase()
  if (['ON-PREM', 'MDM', 'IICS'].includes(type))
    try {
      dispatch({
        type: GET_DATA_START
      })
      const res = await axios.get(`/inventory/${type}`)
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: {
          data: res.data.data,
          type
        }
      })
    } catch (err) {
      dispatch({
        type: GET_DATA_FAIL
      })
      if (err?.response?.status && err.response.status === 401) {
        localStorage.token && (localStorage.removeItem('token') && window.location.reload())
      }
    }
}

export const updateData = (dispatch) => async (type, data, ID) => {
  type = type.toUpperCase()
  if (['ON-PREM', 'MDM', 'IICS'].includes(type))
    try {
      dispatch({
        type: UPDATE_DATA_START
      })
    await axios.put(`/inventory/edit`, {type,ID,data})
      dispatch({
        type: UPDATE_DATA_SUCCESS,
        payload:{ID, data}
      })
      const alert = {
        id: generateRandomId(),
        type: TOAST.SUCCESS,
        message: 'Updated record successfully'
      }
      addAlert(dispatch, alert)
    } catch (err) {
      dispatch({
        type: UPDATE_DATA_FAIL
      })
      if (err?.response?.status && err.response.status === 401) {
        localStorage.token && (localStorage.removeItem('token') && window.location.reload())
      }
      const alert = {
        id: generateRandomId(),
        type: TOAST.ERROR,
        message: err?.message
      }
      addAlert(dispatch, alert)
    }
}

export const searchData = (dispatch) => async (type, searchString) => {
  dispatch({
    type: SEARCH_DATA,
    payload:{type, searchString}
  })
}
export const addAlert = async (dispatch, data) => {
  dispatch({
    type: ADD_ALERT,
    payload:data
  })

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: data.id
    })
  }, 2500)


}