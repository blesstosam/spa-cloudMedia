<template>
    <div class="OverRec">
        <div class="titleFocus" :style="titleFocus"></div>
        <div class="title">
            <ul>
                <li v-for="(p,i) in list" :class="{colorWhite:i==index}">{{p.name|fstr(7)}}</li>
            </ul>
        </div>
        <div class="desc">
            <div class="name">{{list|proName(index)}}</div>
            <div class="director">导演：{{list|proDir(index)}}</div>
            <div class="actor">演员：{{list|proActor(index)}}</div>
        </div>
        <div class="poster"><img :src="list|proPoster(index)" /></div>
    </div>
</template>

<script>
import Service from '../../service/index.js';


export default {
    name:'OverRec',
    data: function () {
        return {
            cid:'',
            list:[],
            index:0,
            action:'',
            cate:'',
            id:'',
            chapter: '',
            isHd: false,     //是否是高清
            isTv:false,      //是否需要选集
            hasNext:false,   //是否有下一集
            situationid:'c8b689d0de284fc5a7edaa2a33fc5bd2'  //点播后推荐的场景id
        }
    },
    created() {},
    mounted(){

    },
    filters:{
        proName(arr,index){
            if(arr.length!=0 && arr[index]){
                return arr[index].name;
            }
        },
        proDir(arr,index){
            if(arr.length!=0 && arr[index]){
                return arr[index].video_director || arr[index].director;
            }
        },
        proActor(arr,index){
            if(arr.length!=0 && arr[index]){
                return arr[index].video_actor || arr[index].actor;
            }
        },
        proPoster(arr,index){
            if(arr.length!=0 && arr[index]){
                return poster(arr[index].poster,'CEP');
            }
        }
    },
    computed:{
        titleFocus(){
            return {top: 59 + 75 * this.index + 'px'};
        },
        statusInfo() {
            return this.$store.state.streamData.statusInfo || {};
        }
    },
    components: {},
    methods: {
        open(_id){
            this.id=_id || this.id;
            if(!keyAction.actions[KEY.ENTER]){
                this.pageEve();
            }else if(keyAction.actions[KEY.ENTER]&&!keyAction.actions[KEY.ENTER]['OVERREC']){
                this.pageEve();
            }

            keyAction.oldFocus = keyAction.focus;
            this.action = keyAction.focus = 'OVERREC';

            var _vue=this;
            this.cate=_id.substr(0,_id.indexOf('_'));
            this.cid=_id.substr(_id.indexOf('_')+1);

            this.$store.commit("upstate",{vid:"none"});

            Service.videoInfo({id: _id,flag:0},function (s,v) {
               if(s == "success"){
                   if(v.response[0]){
                       _vue.isHd=  v.response[0].is_hd == 'Y';   //根据影片详情来判断是否高清
                       if(v.response[0].chapter!=0){   //表示电视剧
                           _vue.chapter = v.response[0].chapter;
                           _vue.isTv = true;
                       }
                       _vue.reqPoster(4);
                   }
               }
            });
        },
        close(){
            this.$store.commit("debug","close");
            keyAction.focus = keyAction.oldFocus;
            this.action = "";
            this.$emit("over-close");
        },
        pageEve(){
            var _vue=this;
            keyAction.add(function () {
                if(_vue.index<3){
                    ++_vue.index;
                }else{
                    _vue.index=0;
                }
            },KEY.DOWN,'OVERREC');
            keyAction.add(function () {
                if(_vue.index>0){
                    --_vue.index;
                }else{
                    _vue.index=3;
                }
            },KEY.UP,'OVERREC');
            keyAction.add(function () {
                let _id=_vue.list[_vue.index].id;
                if(!_id){
                    _id=_vue.list[_vue.index].category_id.split(",")[0].trim()+"_"+ _vue.list[_vue.index].contid;
                }
                /** 如果是按确定焦点要重新设置 **/
                switch (_vue.index) {
                    case 0:
                        if(_vue.hasNext){             //表示下一集
                            let _next =  _vue.list[0];
                            let _firstId = _next.id ? _next.id : _next.category_id.split(",")[0].trim() + '_'+_next.contid;
                            _vue.close();

                            //下一集直接鉴权,获取最后一个页面的recover值
                            let lastHistory = _vue.$store.state.lastHistory;

                            //type 为1 表示电视剧
                            var _f = {category_type: '1', recover: lastHistory.query};
                            if (_vue.situationid != "") {
                                _f.situationid = _vue.situationid;
                            }
                            _vue.$emit('play', _firstId, _next.name, _f);
                        }else {
                            if (!_vue.isTv){           //电影而且是cep的
                                if (_vue.isHd) {
                                    _vue.push({path: '/hd/info', query: {id: _id}});
                                } else {
                                    _vue.push({path: '/sd/info', query: {id: _id}});
                                }
                            } else {                //电视剧
                                if(_vue.isHd){     //高清
                                    _vue.push({path: '/hd/info', query: {id:_id}});
                                }else {            //标清
                                    _vue.push({path: '/sd/episode/tv', query: {cid:_id}});
                                }
                            }
                        }
                        break;
                    default:
                        if (!_vue.isTv){           //电影而且是cep的
                           if (_vue.isHd) {
                               _vue.push({path: '/hd/info', query: {id: _id}});
                           }else {
                               _vue.push({path: '/sd/info', query: {id: _id}});
                           }
                        }else {
                            if(_vue.isHd){         //高清
                                _vue.push({path: '/hd/info',query: {id: _id}});
                            }else {
                                _vue.push({path: '/sd/episode/tv', query: {cid: _id}});
                            }
                        }
                        break;
                }

                if (keyAction.focus == 'OVERREC') {
                    _vue.close();
                }
            },KEY.ENTER,'OVERREC');
            keyAction.add(function () {
                event.preventDefault();
                setTimeout(function(){
                    _vue.close();
                },100)

            },KEY.BACK,'OVERREC');
        },
        load(_c){
            var _vue=this;
            Service.cepBakData({id: this.id, count: _c},function (s,v) {
                if (s == "success") {
                    if(v.info.length!=0){
                        v.info.forEach(function (item) {
                            item.title=item.name;
                            _vue.list.push(item);
                        })
                    }
                }
            });

        },
        reqPoster(_count){
            var _vue = this;
            var _uid = this.statusInfo.stbId || '99616612190002281';
            var _cid = this.cid;
            var _CategoryID = this.cate;
            //高清标清入参hd_content=1/0

           /* if(this.isHd) {
                _filter= "CABLEVOD='Y' and  video_poster!='morenhaibao.gif'  and  video_poster!='morenhaibao.jpg'  and  video_poster!=''   and  hd_content=1  and video_price<>'0' ";
            }else {
                _filter= "CABLEVOD='Y' and  video_poster!='morenhaibao.gif'  and  video_poster!='morenhaibao.jpg'  and  video_poster!=''   and  hd_content=0  and video_price<>'0' ";
            }*/
            Service.IeCep({
                //78506c4aee5e495cb651ba43e24018dc
                accesskey:'stream31a936a111e611e69cb7ed607f',
                service:'ie.v2',
                operation:'GetRecommendList',
                rtype:'recommend.situation.v1',
                ctype:'vod',
                count:_count,
                filter: "CABLEVOD='Y'",
                uid:_uid,
                situationid:_vue.situationid,
                postertype:2,
                urltype:1,
                backurl:'none',
                period:'weekly',
                user_weight:0.5,
                optr_weight:0.5,
                cid: _cid,    //资产id
                CategoryID: _CategoryID
            },function (s,v) {
                if (s == "success") {
                    if(v.recommend.length!=0){
                        if (v.recommend[0].type == 'nextchapter') {
                            _vue.hasNext = true;  //第一个数据是下一集
                        }
                        v.recommend.forEach(function (item) {
                            item.name=item.title;
                            _vue.list.push(item);
                        });
                    }
                } else {
                    //只要接口有问题才补充数据
                    if (_vue.isTv) {   //表示电视剧
                        Service.NextVideo({id: _vue.id, chapter: _vue.chapter}, function (_s, _v) {
                            if (_s == "success") {
                                _vue.list = [];
                                if (_v.info.length != 0) {
                                    _vue.list.push(_v.info[0]);
                                    _vue.list[0].video_director = _vue.list[0].director;
                                    _vue.list[0].video_actor = _vue.list[0].actor;

                                    _vue.hasNext = true;  //有下一集
                                    _vue.load(3);
                                } else {
                                    _vue.load(4);
                                }
                            }
                        });
                    } else {
                        _vue.load(4);
                    }
                }
            });

        }
    }
};

</script>

<style scoped>
.OverRec{
    background: url('../../assets/img/hd/bg_hd2.png');
    position: absolute;
    left:220px;
    top:160px;
    width:755px;
    height:425px;
    z-index:999;
}
.title {
    position: absolute;
    left:22px;
    top:59px;
    width:226px;
    height:279px;
    font-size:21px;
    color:#999;
    font-weight: 600;
}
.title ul li{
    height:49px;
    line-height:49px;
    margin-bottom: 27px;
    text-align: center;
}
.colorWhite{
    color:white !important;
}
.titleFocus {
    position: absolute;
    left:23px;
    width:222px;
    height:45px;
    border:3px solid #00a0e9;
    border-radius:28px;
}
.desc{
    position: absolute;
    left:280px;
    top:100px;
    width:250px;
    height:150px;
    color:#ddd;
    font-size:24px;
    font-weight: 600;
}
.desc .name{

}
.desc .director{
    padding-top: 10px;
    padding-bottom: 10px;
    height:50px;
    line-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.desc .actor{

}
.poster{
     position: absolute;
     left:533px;
     top:79px;
}
.poster img{
    width:180px;
    height:240px;
}
</style>

