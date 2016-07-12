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
          topicTimeMap[topic.start_at].push(topic)
        }
      })
    })
    day.topics = topicTimeMap
    delete day.rooms
    return day
  })
}
