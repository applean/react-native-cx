import React, { Component, PropTypes } from 'react'
import {
  View,
  ListView,
  StyleSheet
} from 'react-native'

const dataSource = new ListView.DataSource({
  getRowData: (dataBlob, sid, rid) => dataBlob[sid][rid],
  getSectionHeaderData: (dataBlob, sid) => dataBlob[sid],
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
})

export default class extends Component {

  static propTypes = {
    data: PropTypes.object,
    needSeparator: PropTypes.bool
  };

  static defaultProps = {
    needSeparator: true
  }

  constructor (props) {
    super(props)
    this.state = {
      dataSource: cloneWithData(dataSource, props.data)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        dataSource: cloneWithData(this.state.dataSource, nextProps.data)
      })
    }
  }

  render () {
    return (
      <ListView
        {...this.props}
        initialListSize={10}
        pageSize={10}
        renderSeparator={this.renderSeparator}
        dataSource={this.state.dataSource}
        onContentSizeChange={this.onContentSizeChange.bind(this)}
      />
    )
  }

  onContentSizeChange (contentWidth, contentHeight) {
    if (contentHeight !== this.state.contentHeight) {
      this.setState({contentHeight})
    }
  }

  renderSeparator = (sectionID, rowID) =>
    this.props.needSeparator && <View key={`${sectionID}vs${rowID}`} style={styles.separator} />

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

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#eee'
  }
})
