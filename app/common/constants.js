'use strict'
/**
 * Created by Leon.Hwa on 17/3/20.
 */
import  {Dimensions, PixelRatio} from  'react-native'

const  APP = {
    TAB: 'APP.TAB',
    NAVIGATION:'APP.NAVIGATION'
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

export default {
    APP,
    AUTH_KEY,
    WINDOW,
    HOME,
    ARTICLE,
    NEWS
}