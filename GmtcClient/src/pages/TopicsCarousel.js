import React, {Component, PropTypes} from 'react'
import TopicDetail from './TopicDetail'
import {
  View
} from 'react-native'

export default class extends Component {

  static propTypes = {
    day: PropTypes.object
  };

  state = {
    selectedIndex:0
  };

  constructor(props) {
    super(props)
    const allTopics = this.props.day.topics
    for(let sectionID in allTopics) {

    }
  }

  render () {
    return <View style={{flex: 1, backgroundColor: 'white'}}/>
  }

  renderCard (index) {
  }
}
