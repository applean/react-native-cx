/*global fetch*/
import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as dataActions from '../reducers/data'

class Home extends Component {

  state = {
    selected: 0
  };

  static propTypes = {
    navigator: PropTypes.object,
    load: PropTypes.func.isRequired,
    loadSuccess: PropTypes.func.isRequired,
    loadFailed: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired
  };

  render () {
    const day = this.props.data.days && this.props.data.days[0] || {}
    return (
      <ScrollView style={styles.container}>
        <View style={{flex: 1, height: 35, flexDirection: 'row', backgroundColor: '#b9b9b9'}}>
          <View style={{flex: 1, borderColor: 'white', borderRightWidth: 1}}>
            <Text style={[{color: 'white'}, styles.font]}>25日</Text>
          </View>
          <View style={{flex: 2, borderColor: 'white', borderRightWidth: 1}}>
            <Text style={[{color: 'white'}, styles.font]}>主题</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[{color: 'white'}, styles.font]}>讲师</Text>
          </View>
        </View>
        {this.renderRooms(day.rooms || [])}
      </ScrollView>
    )
  }

  renderRooms (rooms) {
    return rooms.map((room, index) =>
      <View key={index}>
        <View style={{height: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eeeeee'}}>
          <Text style={[{color: '#acc51f', fontSize: 13}, styles.font]}>{room.name}</Text>
        </View>
        {this.renderTopics(room.topics || [])}
      </View>
    )
  }

  renderTopics (topics) {
    return topics.map((topic, index) => {
      const startTime = topic.start_at.slice(11, 16)
      const endTime = topic.end_at.slice(11, 16)
      return (
        <View key={index} style={{flex: 1, flexDirection: 'row', borderColor: '#eeeeee', borderBottomWidth: 1}}>
          <View style={{flex: 1, borderColor: '#eeeeee', borderRightWidth: 1}}>
            <Text style={[{color: '#1358A2'}, styles.font]}>{startTime}~{endTime}</Text>
          </View>
          <View style={{flex: 2, borderColor: '#eeeeee', borderRightWidth: 1}}>
            <Text style={[{color: '#1358A2'}, styles.font]}>{topic.title}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[{color: '#1358A2'}, styles.font]}>{topic.author}</Text>
          </View>
        </View>
      )
    })
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    this.props.load()
    fetch('http://gmtc.applean.cn/home/index.json')
    .then(response => response.json())
    .then(responseData => this.props.loadSuccess(responseData))
    .catch(error => this.props.loadFailed(error))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24
  },
  font: {
    fontSize: 12,
    margin: 10
  }
})

const mapStateToProps = state => ({
  loading: state.data.loading,
  error: state.data.error,
  data: state.data.data
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({...dataActions}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home)
