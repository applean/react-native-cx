import React, { Component, PropTypes } from 'react'
import PureListView from '../components/FakeListView'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as dataActions from '../reducers/data'
import TopicsCarousel from './TopicsCarousel'
import Topic from './Topic'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

class MySchedules extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    load: PropTypes.func.isRequired,
    loadSuccess: PropTypes.func.isRequired,
    loadFailed: PropTypes.func.isRequired,
    days: PropTypes.array.isRequired,
    topics: PropTypes.object
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={[styles.center, {backgroundColor: '#1e4b9a', height: 250, paddingTop: 25}]}>
          <Image source={require('../assets/gmtc.png')} style={{padding: 10, height: 60, width: 200}} />
          <Text style={{color: 'white', fontSize: 29, marginTop: 15}}>全球移动技术大会</Text>
          <Text style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: 11, marginTop: 3}}>2016年6月24日－25日</Text>
          <View style={styles.title}>
            <Text style={{color: 'white', fontSize: 16}}>我 的 订 阅</Text>
          </View>
        </View>
        <PureListView data={this.props.topics}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}/>
      </View>
    )
  }

  renderRow = (item, index, renderSeparator) => {
    return (
      <TouchableOpacity onPress={() => this.goToCarousel(item)}>
        <Topic topic={item}/>
        {renderSeparator(item, index)}
      </TouchableOpacity>
    )
  }

  goToCarousel = (item) => {
    // const dayId = item.room.day_id
    this.props.navigator.push({
      component: TopicsCarousel,
      day: this.props.days[item.room.day_id - 1],
      topic: item
    })
  }

  renderSectionHeader = (sectionData, time) => {
    const dayName = ['第一天', '第二天']
    if (sectionData.length === 0) {
      return null
    }
    return (
      <View key={time} style={{backgroundColor: '#eeeeee'}}>
        <Text style={[{margin: 6, marginLeft: 8}, styles.font]}>{dayName[time - 1]}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  font: {
    fontSize: 12.5,
    color: '#555555'
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'}
})

const mapStateToProps = state => ({
  loading: state.data.loading,
  error: state.data.error,
  days: state.data.days,
  topics: state.schedule.mySchedules
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({...dataActions}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(MySchedules)
