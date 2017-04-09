/**
 * Created by Leon.Hwa on 17/3/20.
 */
import  { combineReducers } from 'redux'

import application from '../reducers/application'
import homeInfo from '../reducers/home'
import bannar from '../reducers/bannar'
import news from '../reducers/news'
import article from '../reducers/article'
import comment from '../reducers/comment'
import pageInfo from '../reducers/pageInfo'
import timeLine from '../reducers/timeLine'
import play from '../reducers/play'
const  reducers = combineReducers({
    application,
    homeInfo,
    bannar,
    news,
    article,
    comment,
    pageInfo,
    timeLine,
    play
});

export  default  reducers