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
  Navigator
} from 'react-native'

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{
            component: Home
          }}
          renderScene={(route, navigator) => {
            return <route.component navigator={navigator} {...route} {...route.passProps}/>
          }}/>
      </Provider>
    )
  }
}
