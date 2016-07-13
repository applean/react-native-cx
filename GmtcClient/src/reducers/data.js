const LOAD = 'LOAD'
const LOAD_SUCCESS = 'LOAD_SUCCESS'
const LOAD_FAILED = 'LOAD_FAILED'

const initialState = {
  loading: false,
  error: null,
  days: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        error: null
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        days: action.days
      }
    case LOAD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}

export function load () {
  return {
    type: LOAD
  }
}

export function loadSuccess (days) {
  return {
    type: LOAD_SUCCESS,
    days
  }
}

export function loadFailed (error) {
  return {
    type: LOAD_FAILED,
    error
  }
}
