/**
 * Created by Leon.Hwa on 17/3/20.
 */
import React,{Component}from 'react'

import {
    View,
    Text
} from 'react-native'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import  thunk from 'redux-thunk'//
import  reducers from  './reducers'
import App from './containers/app'

const  createStoreWithWM = applyMiddleware(thunk)(createStore)
const  store = createStoreWithWM(reducers)


export default class  Root extends Component {
   render() {
       return (
           <Provider store={store}>
              <App />
           </Provider>
       )
   }
}