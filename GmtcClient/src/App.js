import React, { Component } from 'react'
import reducers from './reducers'
import {Provider} from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {createStore} from 'redux'
import {AsyncStorage} from 'react-native'
import Home from './pages/MainScreen'

const store = autoRehydrate()(createStore)(reducers)
persistStore(store, {storage: AsyncStorage})
import {
  Platform,
  StatusBar,
  View,
  Navigator
} from 'react-native'

export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const NAV_BAR_HEIGHT = (Platform.OS === 'ios' ? 44 : 56)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar
            barStyle='light-content'
            backgroundColor='transparent'
            style={{height: STATUS_BAR_HEIGHT}}
            translucent={ABOVE_LOLIPOP}
          />
          <Navigator
            initialRoute={{
              component: Home
            }}
            configureScene={route => Navigator.SceneConfigs.FloatFromBottom}
            renderScene={(route, navigator) => {
              return <route.component navigator={navigator} {...route} {...route.passProps}/>
            }}/>
        </View>
      </Provider>
    )
  }
}
