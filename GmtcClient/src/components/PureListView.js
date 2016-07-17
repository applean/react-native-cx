import React, { Component, PropTypes } from 'react'
import {
  ListView
} from 'react-native'

export default class extends Component {

  static propTypes = {
    data: PropTypes.object
  };

  constructor (props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionHeaderData: (dataBlob, sid) => dataBlob[sid]
    })
    this.state = {
      dataSource: cloneWithData(dataSource, props.data)
    }
  }

  render () {
    console.log('test:', this.state.dataSource.getRowCount())
    return (
      <ListView
        {...this.props}
        initialListSize={10}
        pageSize={10}
        dataSource={this.state.dataSource}
      />
    )
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data)
      })
    }
  }
}

function cloneWithData (dataSource, data) {
  if (!data) {
    return dataSource.cloneWithRows([])
  }
  if (Array.isArray(data)) {
    return dataSource.cloneWithRows(data)
  }
  return dataSource.cloneWithRowsAndSections(data)
}
