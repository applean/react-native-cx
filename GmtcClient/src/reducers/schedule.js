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
  switch (action.type) {
    case SUBSCRIBE:
      const oldDaySchedule = state.mySchedules[action.topic.room.day_id] || []
      const topics = [...oldDaySchedule, action.topic]
      return {
        ...state,
        subscription: [
          ...state.subscription,
          action.topic.id
        ],
        mySchedules: {
          ...state.mySchedules,
          [action.topic.room.day_id]: topics},
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
      const dayId = action.topic.room.day_id
      return {
        ...state,
        subscription: state.subscription.filter(item => item !== action.topic.id),
        mySchedules: {
          ...state.mySchedules,
          [dayId]: (state.mySchedules[dayId] || []).filter(item => item.id !== action.topic.id)
        },
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
