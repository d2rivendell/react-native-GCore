'use strict'
/**
 * Created by Leon.Hwa on 17/3/20.
 */
import  {Dimensions, PixelRatio} from  'react-native'

const  APP = {
    TAB: 'APP.TAB',
    NAVIGATION:'APP.NAVIGATION',
    SIGNIN:'APP.SIGNIN',
    SIGNOUT:'APP.SIGNOUT',
}

const WINDOW = {
    width :Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    onePR:1/PixelRatio.get()
}

const  AUTH_KEY = {
    auth_key: 'dpkynzs2q0wm9o5gi1r83fcabthl4eu'
}
const HOME = {
    INFO: 'HOME.INFO',
    DETAIL: 'HOME.DETAIL',
    BANNAR:'HOME.BANNAR'
}

const NEWS = {
    INFO: 'NEWS.INFO',
    DETAIL: 'NEWS.DETAIL',
}

const ARTICLE = {
    INFO: 'ARTICLE.INFO',
    DETAIL: 'ARTICLE.DETAIL',
}
const COMMENT = {
    HOT: 'COMMENT.HOT',
    TIME: 'COMMENT.TIME',
}
const PAGEINFO = {
    INFO: 'PAGEINFO'
}
const TIMELINE = {
    INFO: 'TIMELINE.INFO',
    CATEGORY:'TIMELINE.CATEGORY',
    DOWNLOAD: 'TIMELINE.DOWNLOAD'
}
const PLAY = {
    SHOW: 'PLAY.SHOW',
    HIDDEN:'PLAY.HIDDEN',
    PLAY:'PLAY.PLAY'
}
const RADIO = {
    INFO: 'RADIO.INFO'
}
const VIDEO = {
    INFO: 'VIDEO.INFO'
}

const CATEGORIES = {
    INFO: 'CATEGORIES.INFO',
    DETAIL: 'CATEGORIES.DETAIL',
    SUB:'CATEGORIES.SUB',
    CLEAR:'CATEGORIES.CLEAR'
}
const SUBSCRIPT = {
    INFO: 'SUBSCRIPT.INFO',
}
const MYMARK = {
    INFO: 'MYMARK.INFO',
}
const DOWNLOAD = {
    BEGIN: 'DOWNLOAD.BEGIN',
    END: 'DOWNLOAD.END',
}
export default {
    APP,
    AUTH_KEY,
    WINDOW,
    HOME,
    ARTICLE,
    NEWS,
    COMMENT,
    PAGEINFO,
    TIMELINE,
    PLAY,
    RADIO,
    VIDEO,
    CATEGORIES,
    SUBSCRIPT,
    MYMARK,
    DOWNLOAD
}