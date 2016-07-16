const SUBSCRIBE = 'SUBSCRIBE'
const SUBSCRIBE_SUCCESS = 'SUBSCRIBE_SUCCESS'
const SUBSCRIBE_FAILED = 'SUBSCRIBE_FAILED'
const UNSUBSCRIBE = 'UNSUBSCRIBE'
const UNSUBSCRIBE_SUCCESS = 'UNSUBSCRIBE_SUCCESS'
const UNSUBSCRIBE_FAILED = 'UNSUBSCRIBE_FAILED'

const initialState = {
  subscribing: true,
  error: null,
  subscription: [],
  mySchedules: {}
}

export default function reducer (state = initialState, action) {
  let topic, dayId
  let subscribeTemp = {}
  let unsubscribeTemp
  if (action.type === SUBSCRIBE || action.type === UNSUBSCRIBE) {
    topic = action.topic
    dayId = topic.room.day_id
    subscribeTemp[dayId] = [...state.mySchedules[dayId], topic]
    unsubscribeTemp[dayId] = state.mySchedules[dayId].filter(item => item.id !== topic.id)
  }

  switch (action.type) {
    case SUBSCRIBE:
      return {
        ...state,
        subscription: [...state.subscription, topic.id],
        mySchedules: {...state.mySchedules, ...subscribeTemp},
        error: null
      }
    case SUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscribing: false,
        error: null
      }
    case SUBSCRIBE_FAILED:
      return {
        ...state,
        subscribing: false,
        error: action.error
      }
    case UNSUBSCRIBE:
      return {
        ...state,
        subscription: state.subscription.filter(item => item !== topic.id),
        mySchedules: {...state.mySchedules, ...unsubscribeTemp},
        error: null
      }
    case UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        subscribing: false,
        error: null
      }
    case UNSUBSCRIBE_FAILED:
      return {
        ...state,
        subscribing: false,
        error: action.error
      }
    default:
      return state
  }
}

export function subscribe (topic) {
  return {
    type: SUBSCRIBE,
    topic
  }
}

export function subscribeSuccess () {
  return {
    type: SUBSCRIBE_SUCCESS
  }
}

export function subscribeFailed (error) {
  return {
    type: SUBSCRIBE_FAILED,
    error
  }
}

export function unsubscribe (topic) {
  return {
    type: UNSUBSCRIBE,
    topic
  }
}

export function unsubscribeSuccess () {
  return {
    type: UNSUBSCRIBE_SUCCESS
  }
}

export function unsubscribeFailed (error) {
  return {
    type: UNSUBSCRIBE_FAILED,
    error
  }
}
