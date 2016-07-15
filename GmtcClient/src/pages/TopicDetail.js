import React, {Component, PropTypes} from 'react'
import Topic from './Topic'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
const AWESOME_COLOR = ['red', 'orange', 'green', 'cyan', 'blue', 'purple']
export default class extends Component {

  static propTypes = {
    topic: PropTypes.object
  }

  render () {
    const {topic} = this.props
    const address = topic.room.name
    const duration = getDuration(topic.start_at, topic.end_at)
    const addressColor = AWESOME_COLOR[topic.id % AWESOME_COLOR.length]
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerFont, {color: addressColor}]}>{address}</Text>
          <Text style={styles.headerFont}> - {duration} min</Text>
        </View>
        <ScrollView style={styles.content}>
          <Topic topic={topic} style={{paddingLeft: 0, paddingRight: 0}}/>
          <Text style={styles.description}>{topic.description}</Text>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity activeOpacity={0.7} onPress={this.toggleAdded} style={styles.button}>
            <Text style={{color: 'white'}}>订   阅</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  toggleAdded = () => {
    console.log('added')
  }
}

function getDuration (start, end) {
  const startHour = start.slice(11, 13)
  const startMin = start.slice(14, 16)
  const endHour = end.slice(11, 13)
  const endMin = end.slice(14, 16)
  return (endHour - startHour) * 60 + (endMin - startMin)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  headerFont: {
    fontSize: 11,
    color: '#555555'
  },
  content: {
    padding: 10
  },
  description: {
    fontSize: 13,
    marginTop: 10,
    lineHeight: 20,
    color: '#555555'
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  button: {
    height: 40,
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A6AD5'
  }
})
