import React, {Component, PropTypes} from 'react'
import TopicDetail from './TopicDetail'
import Carousel from '../components/Carousel'
import {
  View,
  StyleSheet
} from 'react-native'

export default class extends Component {

  static propTypes = {
    day: PropTypes.object,
    topic: PropTypes.object
  };

  constructor (props) {
    super(props)
    let flatTopicsList = []
    let contexts = []
    const allTopics = this.props.day.topics
    for (let sectionID in allTopics) {
      const sectionLength = allTopics[sectionID].length
      let rowIndex = 0
      allTopics[sectionID].forEach(topic => {
        flatTopicsList.push(topic)
        contexts.push({
          rowIndex,
          sectionLength,
          sectionTitle: sectionID
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
    this.renderCard = this.renderCard.bind(this)
    this.handleIndexChange = this.handleIndexChange.bind(this)
  }

  render () {
    const {rowIndex, sectionLength, sectionTitle} = this.state.contexts[this.state.selectedIndex]
    return (
      <View style={styles.container}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContent: {
    height: 65,
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
  time: {
    fontWeight: 'bold',
    fontSize: 17
  },
  card: {
    borderRadius: 2,
    marginHorizontal: 3
  }
})
