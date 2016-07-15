import React, {Component, PropTypes} from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'

export default class extends Component {

  static propTypes={
    isSubscribed: PropTypes.bool,
    onPress: PropTypes.func,
    style: View.propTypes.style
  };

  static defaultProps={
    onPress () {}
  }

  render () {
    const {isSubscribed, onPress, style} = this.props
    const promptMessage = isSubscribed ? '取消订阅' : '订    阅'
    const color = isSubscribed ? '#4DC7A4' : '#6A6AD5'
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.button, {backgroundColor: color}, style]}>
        <Text style={{color: 'white'}}>{promptMessage}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    marginTop: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
