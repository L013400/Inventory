import { SEARCH_COLUMNS } from "../constants/search"
import {
    LOGIN_USER, LOAD_USER, LOGOUT, LOAD_USER_FAIL, LOAD_USER_START, GET_DATA_START,
    GET_DATA_SUCCESS, GET_DATA_FAIL, SEARCH_DATA, LOGIN_USER_FAIL, ADD_ALERT, REMOVE_ALERT,
    UPDATE_DATA_SUCCESS
} from "./types"

export const userReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case LOGIN_USER:
            localStorage.setItem('token', payload.token)
            localStorage.setItem('expAt', payload.expAt)
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                loading: false
            }
        case LOGIN_USER_FAIL: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false
            }
        }
        case LOAD_USER_START:
            return {
                ...state,
                loading: true
            }
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                loading: false
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false
            }
        case LOGOUT:
            localStorage.removeItem('token')
            localStorage.removeItem('expAt')
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false
            }
        default:
            return state
    }
}

function getSearchedData(state, {type, searchString}){
    searchString = searchString?.toLowerCase()
    if(!state.data)
    return []
    return state.data.filter((item) => {
       let abs =  SEARCH_COLUMNS[type]?.split(',')?.some((col)=>item[col]?.includes(searchString))
    console.log(abs)
    return abs
    })
}
export const dataReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_DATA_START:
            return {
                ...state,
                loading: true
            }
        case GET_DATA_SUCCESS:
            return {
                ...state,
                data: payload.data,
                type: payload.type,
                searchedData: [],
                loading: false
            }
        case UPDATE_DATA_SUCCESS:
            return {
                ...state,
                data: state?.data?.map((item) => {
                    if (item.ID === payload.ID)
                        return {
                            ...item,
                            ...payload.data
                        }
                    return item;
                }),
                searchedData: state?.searchedData?.map((item) => {
                    if (item.ID === payload.ID)
                        return {
                            ...item,
                            ...payload.data
                        }
                    return item;
                })
            }
        case SEARCH_DATA: {
            return {
                ...state,
                searchedData:getSearchedData(state, payload)
            }
        }
        case GET_DATA_FAIL:
            return {
                ...state,
                data: null,
                searchedData: [],
                loading: false
            }
        default:
            return state
    }
}


export const alertReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case ADD_ALERT: {
            return [payload, ...state]
        }
        case REMOVE_ALERT: {
            return state.filter((alert) => alert.id !== payload)
        }
        default:
            return state;
    }
}

let allReducers = { user: userReducer, data: dataReducer, alerts: alertReducer }
export const rootReducer = (state, action) => {
    const newState = {};
    for (let key in allReducers) {
        newState[key] = allReducers[key](state[key], action);
    }
    return newState;
}

export default rootReducer;