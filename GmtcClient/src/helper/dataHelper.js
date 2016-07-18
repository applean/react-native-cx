export default function (data) {
  return data.days.map(day => {
    let topicTimeMap = {}
    day.rooms.forEach(room => {
      room.topics.forEach(topic => {
        if (!topicTimeMap[topic.start_at]) {
          topicTimeMap[topic.start_at] = []
        }
        if (!(topic.rest && topicTimeMap[topic.start_at].length === 1)) {
          topic.room = room
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

export function combineData (days, subscription) {
  return days.map(day => {
    const newTopics = {}
    for (let sectionID in day.topics) {
      let section = day.topics[sectionID].map(
        topic => {
          return {
            ...topic,
            isSubscribed: subscription.indexOf(topic.id) > -1
          }
        })
      day.topics[sectionID] = section
      newTopics[sectionID] = section
    }
    return {...day, topics: newTopics}
  })
}
