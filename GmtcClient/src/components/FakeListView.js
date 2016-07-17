import React, { Component, PropTypes } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

export default class extends Component {

  static propTypes = {
    data: PropTypes.object,
    needSeparator: PropTypes.bool,
    renderRow: PropTypes.func,
    renderSectionHeader: PropTypes.func
  };

  static defaultProps = {
    needSeparator: true
  }

  render () {
    return (
      <ScrollView>
        {this.renderContent()}
      </ScrollView>
    )
  }

  renderContent () {
    const {data, renderRow, renderSectionHeader} = this.props
    let result = []
    for (let item in data) {
      let sectionView = (
        <View key={item}>
        {[
          renderSectionHeader(data[item], item),
          data[item].map((row, index) => renderRow(row, index, this.renderSeparator))
        ]}
        </View>
      )
      result.push(sectionView)
    }
    return result
  }

  renderSeparator = (row, index) =>
    <View key={`${row}vs${index}`} style={styles.separator} />

}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#eee'
  }
})
