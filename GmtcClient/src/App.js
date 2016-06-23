import React, { Component } from 'react'
import reducers from './reducers'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import Home from './pages/Home'

const stores = createStore(reducers)
import {
  Navigator
} from 'react-native'

export default class extends Component {
  render () {
    return (
      <Provider store={stores}>
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
