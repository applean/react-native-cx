/*global fetch*/
import React, { Component, PropTypes } from 'react'
import PureListView from '../components/PureListView'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import dataConverter from '../helper/dataHelper'
import * as dataActions from '../reducers/data'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import SegmentTabWrapper from '../components/SegmentTabWrapper'
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'

class Home extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    load: PropTypes.func.isRequired,
    loadSuccess: PropTypes.func.isRequired,
    loadFailed: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    days: PropTypes.array.isRequired
  };

  render () {
    if (this.props.loading) {
      return (
        <View style={[styles.container, styles.center]} >
          <Text>Loading...</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={[styles.center, {backgroundColor: '#1e4b9a', height: 250, paddingTop: 25}]}>
          <Image source={require('../assets/gmtc.png')} style={{padding: 10, height: 60, width: 200}} />
          <Text style={{color: 'white', fontSize: 29, marginTop: 15}}>全球移动技术大会</Text>
          <Text style={{color: 'rgba(255, 255, 255, 0.7)', fontSize: 11, marginTop: 3}}>2016年6月24日－25日</Text>
        </View>
        <ScrollableTabView style={{marginTop: -41}}
          renderTabBar={() =>
            <SegmentTabWrapper style={{marginBottom: 7}} borderRadius={13.5} titleSize={12} horizontalWidth={160} horizontalHeight={27} activeColor='rgba(255,255,255,0.5)'/>}>
          <PureListView data={this.props.days[0].topics} tabLabel='第一天'/>
          <PureListView data={this.props.days[1].topics} tabLabel='第二天'/>
        </ScrollableTabView>
      </View>
    )
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    this.props.load()
    fetch('http://gmtc.applean.cn/home/index.json')
    .then(response => response.json())
    .then(responseData => {
      this.props.loadSuccess(dataConverter(responseData))
    })
    .catch(error => this.props.loadFailed(error))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  loading: state.data.loading,
  error: state.data.error,
  days: state.data.days
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({...dataActions}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home)
