import React, { Component, PropTypes } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'

export default class extends Component {
  static propTypes = {
    data: PropTypes.object,
    style: View.propTypes.style
  };

  render () {
    const {data, style} = this.props
    return (
      <View style={[{padding: 14}, style]}>
        <Text numberOfLines={1} style={{fontSize: 16, color: '#6199b1'}}>{data.title}</Text>
        {
          data.author &&
          <View style={{flexDirection: 'row', paddingLeft: 5, marginTop: 15}}>
            {
              data.author_avatars.length > 0
              ? data.author_avatars.map((uri, index) =>
                <Image key={index} style={{height: 35, width: 35, borderRadius: 17.5, marginLeft: -5}} source={{uri}}/>
                )
              : <Image style={{height: 35, width: 35, borderRadius: 17.5, marginLeft: -5}} source={require('../assets/default_avatar.png')}/>
            }
            <View style={{marginLeft: 10, justifyContent: 'center', flex: 1}}>
              <Text numberOfLines={1} style={styles.font}>{data.author}</Text>
              <Text numberOfLines={1} style={{marginTop: 5, color: '#777777', fontSize: 11}}>{data.author_info}</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  font: {
    fontSize: 12.5,
    color: '#555555'
  }
})
