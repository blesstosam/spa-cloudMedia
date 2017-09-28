import   {
    FEATURES,
    EPISODE,
    INFO,
    DEFAULT,
    VOD_EXIT_POINT,
    RECOMMEND,
    COLLECTTOP,
    MYCOLLECT,
    ASK_PRICE,
    AUTH,
    REMINDS,
    RECENT,

    CQSEARCH,
    TODAY_FREE,

    ADPIC,
    ADPIC2,
    IE_CEP,
    SEARCH,

    FAVORITES,
    SOFA,
    CHECKVIP,
    EPISODE_REMEMBER_LIST,
    RECOMMEND_BAK_DATA,
    SET_EPISODE_REMEMBER,
    NEXTVIDEO,
    GROUPID

} from '../store/mutation-types'
import Vue from 'vue'
export  default {

    groupId(_params, cb) {
        this.req(GROUPID, _params, cb)
    },

    vodExitPoint(_params, cb){
        this.req(VOD_EXIT_POINT, _params, cb)
    },

    videoList(_uri, _param, cb){
        var _u = _uri && _uri != "" ? _uri : DEFAULT;

        this.req(_u, _param, cb);

    },

    videoInfo(_param, cb){
        this.req(INFO, _param, cb);
    },
    epiList(_param, cb){
        this.req(EPISODE, _param, cb);
    },
    featuresList(_param, cb){
        this.req(FEATURES, _param, cb);
    },

    askPrice(_param, cb){
        this.req(ASK_PRICE, _param, cb)
    },
    videoAuth(_param, cb){
        this.req(AUTH, _param, cb)
    },

    favorites(_param, cb){

        this.req(FAVORITES, _param, cb)
    },
    cepBakData(_param, cb){
        this.req(RECOMMEND_BAK_DATA, _param, cb)
    },
    episodeRemember(_param, cb){
        this.req(SET_EPISODE_REMEMBER, _param, cb)
    },

    adPic(_params, cb){
        this.req(ADPIC, _params, cb)

    },
    adPic2(_params, cb){
        this.req(ADPIC2, _params, cb)

    },

    IeCep(_params, cb){
        this.req(IE_CEP, _params, cb)

    },
    feedBack(_stbId, _situationid, _assetId){

        this.req(IE_CEP, {
            service: "ie.v2",
            operation: "EventFeedback",
            feedback_type: "click",
            portal_type: 'vod',
            terminal_type: 'STB',
            uid: _stbId + "_0",
            param1: 1,
            param2: 'vod',
            param3: 'situation',
            param4: _situationid,
            cid: _assetId
        })
    },

    NextVideo(_params, cb){
        this.req(NEXTVIDEO, _params, cb)

    },

    //推荐位
    Recommend(_params, cb) {
        this.req(RECOMMEND, _params, cb)
    },

    req(_uri, _params, cb){


        Vue.http.get(_uri || DEFAULT, {params: _params || {}}).then(res => {

            if (cb) {

                cb(!res.data.status || res.data.status == "200" ? "success" : "error", res.data);

            }
        }, res => {
            if (cb) {
                cb("error", res.data);
            }
            console.log("service/index.js  req-method  err:", res)
        });

    }

}
