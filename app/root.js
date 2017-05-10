/**
 * Created by Leon.Hwa on 17/3/20.
 */
import React,{Component}from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import  thunk from 'redux-thunk'//
import  reducers from  './reducers'
import App from './containers/app'

import Constants from './common/constants';

import MyStorage from './channel/MyStorage'


const  createStoreWithWM = applyMiddleware(thunk)(createStore)
const  store = createStoreWithWM(reducers)

/**
 *
 * http://www.g-cores.com/api/set_device_token
 * auth_exclusive	dpkynzs2q0wm9o5gi1r83fcabthl4eu
   device_token	08532edf3c771890ad23a62d65cb749f02341c6d72213eb6d72ba97e7547e580
   user_id	-1
 *
 * */
export default class  Root extends Component {

   render() {
       global.Common = Constants;
       let storage =  new MyStorage()
       storage.loadAccount((user,err)=>{

       })
       return (
           <Provider store={store}>
              <App />
           </Provider>
       )
   }
}
