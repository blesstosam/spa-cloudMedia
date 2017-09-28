<template>
    <div class="SdInfo">
        <header class="title">
            <img src="../assets/img/animation/do-film2.png" />
            {{info.name}}</header>
        <div class="info">简介：{{info.short_desc || msg}}</div>
        <img class="poster" :src="info.poster|fposter" />

        <div class="btnSelect" :style="btnCss"></div>
        <div class="enter">
            <img src="../assets/img/public/confirm_playfocus.png" />
        </div>
        <div class="cancel">
            <img src="../assets/img/public/cancel_playfocus.png" />
        </div>
    </div>
</template>

<script>
import Service from '../service/index';

export default {
    name:'SdInfo',
    data: function () {
        return {
            info:{},
            msg : '暂无信息',
            recover:{
                index:0,
                id:'',
                action:'BTN',
                situationid:''
            }
        }
    },
    created: function () {
        this.recover.id=this.$route.query.id || this.recover.id;
        this.recover.situationid=this.$route.query.situationid || this.recover.situationid;
    },
    mounted:function(){
        keyAction.focus=this.recover.action;
        this.loadInfo();
        this.pageEve();
    },
    watch: {
        queryId(v) {
            this.recover.id = v;
            this.loadInfo();
        }
    },
    computed:{
        btnCss(){
            return {left: this.recover.index * 200 + 399 + 'px'}
        },
        queryId() {
            return this.$route.query.id;
        }
    },
    methods: {
        loadInfo(){
            Service.videoInfo({id: this.recover.id}, (s, v) => {
                if (s == "success") {
                    if(v.response.length!=0){
                        this.info = v.response[0];
                        console.log(this.info)
                    }
                }else if(s=='error'){
                    console.log('error:',v);
                }
            });
        },
        pageEve(){
            var _vue=this;
            keyAction.add(function () {
                if(_vue.recover.index==1){
                    _vue.recover.index=0;
                }
            },KEY.LEFT,'BTN');
            keyAction.add(function () {
                if(_vue.recover.index==0){
                    _vue.recover.index=1;
                }
            },KEY.RIGHT,'BTN');
            keyAction.add(function () {
                if(_vue.recover.index==0){
                    //播放
                    var _f={category_type:_vue.info.category_type,recover:_vue.recover};
                    if(_vue.recover.situationid!=""){  //cep推荐多传一个参数
                        _f.situationid=_vue.recover.situationid;
                    }
                    _vue.$emit('play',_vue.recover.id,_vue.info.name,_f);
                }else{
                    _vue.back();
                }
            },KEY.ENTER,'BTN');
            keyAction.add(function () {
                _vue.back();
            },KEY.BACK);
        }
    }
};

</script>

<style scoped>
.SdInfo{
    background: url('../assets/img/animation/ani_detail_bg.png');
    position: absolute;
    left:0;
    top:0;
    width:1280px;
    height:720px;
}
.title{
    position: absolute;
    left:400px;
    top:130px;
    font-size:28px;
    color:yellow;
}
.title img {
    position: relative;
    top: 7px;
    padding-right: 25px;
}
.info{
    position: absolute;
    left:400px;
    top:200px;
    width:700px;
    font-size:24px;
    color:white;
}
.poster{
    position: absolute;
    left:58px;
    top:102px;
    width:200px;
    height:302px;
}
.btnSelect{
    position: absolute;
    top:399px;
    width:144px;
    height:32px;
    border:5px solid yellow;
    border-radius: 40px;
}
.enter{
    position: absolute;
    left:400px;
    top:400px;
}
.cancel{
    position: absolute;
    left:600px;
    top:400px;
}
.enter img,.cancel img{
    width:150px;
    height:40px;
}
</style>

