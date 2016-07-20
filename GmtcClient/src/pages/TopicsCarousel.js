import React, {Component, PropTypes} from 'react'
import TopicDetail from './TopicDetail'
import Carousel from '../components/Carousel'
import F8PageControl from '../components/F8PageControl'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export default class extends Component {

  static propTypes = {
    day: PropTypes.object,
    topic: PropTypes.object,
    navigator: PropTypes.object
  };

  constructor (props) {
    super(props)
    let flatTopicsList = []
    let contexts = []
    const allTopics = this.props.day.topics
    for (let sectionID in allTopics) {
      const sectionLength = allTopics[sectionID].length
      const startTime = allTopics[sectionID][0].start_at.slice(11, 16)
      const endTime = allTopics[sectionID][0].end_at.slice(11, 16)

      let rowIndex = 0
      allTopics[sectionID].forEach(topic => {
        flatTopicsList.push(topic)
        contexts.push({
          rowIndex,
          sectionLength,
          sectionTitle: `${startTime}~${endTime}`
        })
        rowIndex++
      })
    }

    const selectedIndex = flatTopicsList.findIndex(s => s.id === this.props.topic.id)

    this.state = {
      count: flatTopicsList.length,
      selectedIndex,
      flatTopicsList,
      contexts
    }
    this.dismiss = this.dismiss.bind(this)
    this.renderCard = this.renderCard.bind(this)
    this.handleIndexChange = this.handleIndexChange.bind(this)
  }

  render () {
    const {rowIndex, sectionLength, sectionTitle} = this.state.contexts[this.state.selectedIndex]
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerLeft} onPress={this.dismiss}>
            <Image source={require('../assets/x-white.png')} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              <Text style={styles.day}>{this.props.day.name}</Text>
              {'\n'}
              <Text style={styles.time}>{sectionTitle}</Text>
            </Text>
            <F8PageControl
              count={sectionLength}
              selectedIndex={rowIndex}
            />
          </View>
          <View style={{flex: 1}}/>
        </View>
        <Carousel
          count={this.state.count}
          selectedIndex={this.state.selectedIndex}
          onSelectedIndexChange={this.handleIndexChange}
          renderCard={this.renderCard}
        />
      </View>
    )
  }

  renderCard (index) {
    return (
      <TopicDetail
        key={index}
        style={styles.card}
        topic={this.state.flatTopicsList[index]}
      />
    )
  }

  handleIndexChange (selectedIndex) {
    this.setState({ selectedIndex })
  }

  dismiss () {
    this.props.navigator.pop()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6ec0df'
  },
  header: {
    paddingTop: 20,
    flexDirection: 'row'
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10
  },
  headerContent: {
    flex: 3,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  },
  day: {
    fontWeight: 'bold'
  },
  card: {
    borderRadius: 2,
    marginHorizontal: 3
  }
})
