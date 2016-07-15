import React, { Component, PropTypes } from 'react'

import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native'

export default class extends Component {
  static propTypes = {
    topic: PropTypes.object,
    style: View.propTypes.style
  };

  render () {
    const {topic, style} = this.props
    return (
      <View style={[{padding: 14}, style]}>
        <Text numberOfLines={1} style={{fontSize: 16, color: '#6199b1'}}>{topic.title}</Text>
        {
          topic.author &&
          <View style={{flexDirection: 'row', paddingLeft: 5, marginTop: 15}}>
            {
              topic.author_avatars.length > 0
              ? topic.author_avatars.map((uri, index) =>
                <Image key={index} style={{height: 35, width: 35, borderRadius: 17.5, marginLeft: -5}} source={{uri}}/>
                )
              : <Image style={{height: 35, width: 35, borderRadius: 17.5, marginLeft: -5}} source={require('../assets/default_avatar.png')}/>
            }
            <View style={{marginLeft: 10, justifyContent: 'center', flex: 1}}>
              <Text numberOfLines={1} style={styles.font}>{topic.author}</Text>
              <Text numberOfLines={1} style={{marginTop: 5, color: '#777777', fontSize: 11}}>{topic.author_info}</Text>
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
