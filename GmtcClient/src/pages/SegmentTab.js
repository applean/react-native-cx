import React, { Component, PropTypes } from 'react'

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'

export default class extends Component {
  static propTypes = {
    data: PropTypes.array,
    titleSize: PropTypes.number,
    verticalWidth: PropTypes.number,
    verticalHeight: PropTypes.number,
    horizontalWidth: PropTypes.number,
    horizontalHeight: PropTypes.number,
    orientation: PropTypes.string,
    activeColor: PropTypes.string,
    inActiveColor: PropTypes.string
  };

  static defaultProps = { // 返回默认的一些属性值
    data: [{title: 'One', selected: true}, {title: 'Two', selected: false}, {title: 'Three', selected: false}],
    verticalWidth: 100,
    verticalHeight: 120,
    horizontalWidth: 200,
    horizontalHeight: 40,
    titleSize: 14,
    orientation: 'horizontal',
    activeColor: 'red',
    inActiveColor: 'white'
  };

  constructor (props) {
    super(props)
    this.state = {
      data: this.props.data
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        data: nextProps.data
      })
    }
  }

  render () {
    const {verticalHeight, verticalWidth, horizontalHeight, horizontalWidth, orientation, activeColor, inActiveColor, titleSize} = this.props
    const {data} = this.state
    const style = orientation === 'horizontal'
    ? [{height: horizontalHeight, width: horizontalWidth, flexDirection: 'row'}]
    : [{width: verticalWidth, height: verticalHeight, flexDirection: 'column'}]
    return (
      <View style={{backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={[...style, {backgroundColor: inActiveColor}, {borderWidth: 0}]}>
          {
            data.map((item, index) => {
              const itemStyle = orientation === 'horizontal'
              ? (index === 0
                  ? [styles.horizontalStartItem, {borderWidth: 1}]
                  : (index < this.state.data.length - 1
                      ? [{borderWidth: 1, borderLeftWidth: 0}]
                      : [styles.horizontalEndItem, {borderWidth: 1, borderLeftWidth: 0, marginLeft: -1}]
                    )
                )
              : (index === 0
                  ? [styles.verticalStartItem, {borderWidth: 1}]
                  : (index < this.state.data.length - 1
                      ? [{borderWidth: 1, borderTopWidth: 0}]
                      : [styles.verticalEndItem, {borderWidth: 1, borderTopWidth: 0, marginTop: -1}]
                    )
                )
              return (
                <TouchableOpacity key={index}
                  onPress={() => this.onClick(index)}
                  activeOpacity={1}
                  style={[styles.item, {backgroundColor: (item.selected ? activeColor : 'transparent'), borderColor: activeColor}, ...itemStyle]}>
                  <Text style={{color: (item.selected ? inActiveColor : activeColor), fontSize: titleSize}}>{item.title}</Text>
                </TouchableOpacity>)
            })
          }
        </View>
      </View>
    )
  }

  onClick (index) {
    let data = []
    this.state.data.forEach(item => {
      item.selected = false
      data.push(item)
    })
    data[index].selected = !data[index].selected
    this.setState({
      data
    })
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontalStartItem: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  horizontalEndItem: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  verticalStartItem: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  verticalEndItem: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
})
