const SUBSCRIBE = 'SUBSCRIBE'
const UNSUBSCRIBE = 'UNSUBSCRIBE'

const initialState = {
  mettings: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SUBSCRIBE:
      return {
        mettings: [...state.mettings, action.id]
      }
    case UNSUBSCRIBE:
      return {
        mettings: state.filter((id) => id !== action.id)
      }
    default:
      return state
  }
}

export function subscribe (id) {
  return {
    type: SUBSCRIBE,
    id
  }
}

export function unsubscribe (id) {
  return {
    type: UNSUBSCRIBE,
    id
  }
}
