import { RESET_AUTH_STATE } from 'actions/Auth/actionTypes'
import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILURE
} from 'actions/Auth/actionTypes'
import {setInLocalStorage} from '../utils/helpers'

const initialState = {
  posts: [],
  isLoggingIn: false,
  isRegistering: false,
  user: {
    country: null,
    firstName: null,
    lastName: null,
    preferredCurrency: null,
    profileImage: null,
    email: null,
    password:null
  }
}

const loginStart = (state, action) => ({
  ...state,
  isLoggingIn: true
})

const loginSuccess = (state, action) => {
  const { data } = action.payload
  return ({
    ...state,
    isLoggingIn: false,
    user: data ? { ...data } : { ...state.user }
  })
}

const loginFailure = (state, action) => ({
  ...state,
  isLoggingIn: false
})

const registerStart = (state, action) => ({
  ...state,
  isRegistering: true
})

const registerSuccess = (state, action) => {
  const userData = {
    ...action.payload.data,
    rememberMe:true
  }
  setInLocalStorage("remember",JSON.stringify(userData))
  return ({
    ...state,
    user:{
      ...state.user,
      ...userData
    },
    isRegistering: false,
  })
}

const registerFailed = (state, action) => ({
  ...state,
  isRegistering: false
})

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: return loginStart(state, action)
    case LOGIN_REQUEST_SUCCESS: return loginSuccess(state, action)
    case LOGIN_REQUEST_FAILURE: return loginFailure(state, action)
    case SIGNUP_REQUEST: return registerStart(state, action)
    case SIGNUP_REQUEST_SUCCESS: return registerSuccess(state, action)
    case SIGNUP_REQUEST_FAILURE: return registerFailed(state, action)
    case RESET_AUTH_STATE: return initialState
    default: return state
  }
}

export default authReducer
