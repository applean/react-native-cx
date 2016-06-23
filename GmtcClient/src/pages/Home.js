/*global fetch*/
import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as dataActions from '../reducers/data'

class Home extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    load: PropTypes.func.isRequired,
    loadSuccess: PropTypes.func.isRequired,
    loadFailed: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    days: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired
  };

  render () {
    console.log('data: ', this.props.rooms)
    return (
      <View style={{flex: 1}}>
        <Text>{JSON.stringify(this.props.rooms, null, ' ')}</Text>
      </View>
    )
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    this.props.load()
    fetch('http://192.168.2.166:3000/home/index.json')
    .then(response => response.json())
    .then(responseData => this.props.loadSuccess(responseData.rooms, responseData.days))
    .catch(error => this.props.loadFailed(error))
  }
}

const mapStateToProps = state => ({
  loading: state.data.loading,
  error: state.data.error,
  days: state.data.days,
  rooms: state.data.rooms
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({...dataActions}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Home)
