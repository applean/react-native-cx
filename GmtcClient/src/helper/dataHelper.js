export function genData (data) {
  return data.days.map(day => {
    let topicTimeMap = {}
    day.rooms.forEach(room => {
      const {topics, ...others} = room
      topics.forEach(topic => {
        if (!topicTimeMap[topic.start_at]) {
          topicTimeMap[topic.start_at] = []
        }
        if (!(topic.rest && topicTimeMap[topic.start_at].length === 1)) {
          topic.room = {...others}
          topic.isSubscribed = false
          topicTimeMap[topic.start_at].push(topic)
        }
      })
    })
    day.topics = topicTimeMap
    delete day.rooms
    return day
  })
}

/*
 * 潜在Bug: 组合数据时，一定要返回一个新的对象。(days是一个不可变的源数据)
 * 否则，第一次调用，ListView接收到的是被修改了的原始数据。后期则是一直使用对原始数据的修改。
 * 因此，在每次调用的时候，一定要返回一个新的对象，以供ListView的WillReceiveProps做对比
 */
export function combineData (days, subscription) {
  return days.map(day => {
    const newTopics = {}
    for (let sectionID in day.topics) {
      let section = day.topics[sectionID].map(
        topic => ({
          ...topic,
          isSubscribed: subscription.indexOf(topic.id) > -1
        })
      )
      newTopics[sectionID] = section
    }
    return {...day, topics: newTopics}
  })
}

// [{..., topics: {1: [], 2: []}}, {}]
export function genSubscribedData (days, subscription) {
  let result = {}
  days.forEach(day => {
    for (let sectionID in day.topics) {
      day.topics[sectionID].forEach(topic => {
        if (subscription.indexOf(topic.id) > -1) {
          if (!result[day.id]) {
            result[day.id] = []
          }
          result[day.id].push(topic)
        }
      })
    }
  })
  return result
}
