/**
 * Created by Leon.Hwa on 17/3/20.
 */
import  { combineReducers } from 'redux'

import application from '../reducers/application'
import homeInfo from '../reducers/home'
import bannar from '../reducers/bannar'
import news from '../reducers/news'
import article from '../reducers/article'
import comment from '../reducers/article'
const  reducers = combineReducers({
    application,
    homeInfo,
    bannar,
    news,
    article,
    comment
});

export  default  reducers