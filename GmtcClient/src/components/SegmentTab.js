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
    inActiveColor: PropTypes.string,
    textActiveColor: PropTypes.string,
    textInActiveColor: PropTypes.string,
    selected: PropTypes.number,
    borderRadius: PropTypes.number,
    style: View.propTypes.style
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
    inActiveColor: 'transparent',
    textInActiveColor: 'white',
    selected: 0,
    textActiveColor: 'white',
    borderRadius: 5
  };

  render () {
    const styles = createStyle(this.props.borderRadius)
    const {verticalHeight, verticalWidth, horizontalHeight, horizontalWidth, selected, data,
      orientation, activeColor, inActiveColor, titleSize, textActiveColor, textInActiveColor} = this.props

    const style = orientation === 'horizontal'
    ? [{height: horizontalHeight, width: horizontalWidth, flexDirection: 'row'}]
    : [{width: verticalWidth, height: verticalHeight, flexDirection: 'column'}]
    return (
      <View style={[...style, {backgroundColor: 'transparent'}, {borderWidth: 0}, this.props.style]}>
        {
          data.map((item, index) => {
            const itemStyle = orientation === 'horizontal'
            ? (index === 0
                ? [styles.horizontalStartItem, {borderWidth: 1}]
                : (index < data.length - 1
                    ? [{borderWidth: 1, borderLeftWidth: 0}]
                    : [styles.horizontalEndItem, {borderWidth: 1, borderLeftWidth: 0, marginLeft: -1}]
                  )
              )
            : (index === 0
                ? [styles.verticalStartItem, {borderWidth: 1}]
                : (index < data.length - 1
                    ? [{borderWidth: 1, borderTopWidth: 0}]
                    : [styles.verticalEndItem, {borderWidth: 1, borderTopWidth: 0, marginTop: -1}]
                  )
              )
            return (
              <TouchableOpacity key={index}
                onPress={() => this.onClick(item)}
                activeOpacity={1}
                style={[styles.item, {backgroundColor: (index === selected ? activeColor : inActiveColor), borderColor: activeColor}, ...itemStyle]}>
                <Text style={{color: (index === selected ? textActiveColor : textInActiveColor), fontSize: titleSize}}>{item.title}</Text>
              </TouchableOpacity>)
          })
        }
      </View>
    )
  }

  onClick (item) {
    item.onPress()
  }
}

function createStyle (borderRadius) {
  return StyleSheet.create({
    item: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    horizontalStartItem: {
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius
    },
    horizontalEndItem: {
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    },
    verticalStartItem: {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius
    },
    verticalEndItem: {
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    }
  })
}
