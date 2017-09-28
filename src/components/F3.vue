<template>
    <div class="Reminds">
        <div class="logo">
            <img src="../assets/img/reminds/logo.png" />
        </div>

        <!--菜单-->
        <div class="menu">
            <div :class="{menuFocus:recover.menuIndex==0}">今日提醒</div>
            <div :class="{menuFocus:recover.menuIndex==1}">更新预告</div>
            <div :class="{menuFocus:recover.menuIndex==2}">下片预告</div>
        </div>

        <div class="Info">
            <span class="first">节目名称</span>
            <span class="second" v-show="recover.menuIndex!=2">上线时间</span>
            <span class="second" v-show="recover.menuIndex==2">下线时间</span>
        </div>

        <div class="proList">
            <ul>
                <li v-for="(item,index) in proList" :class="{menuFocus:recover.proIndex==index&&
                recover.action=='PROGRAM'}">{{item.name}}
                <span id="time">{{item.time|fTime}}</span></li>
            </ul>
        </div>

        <!--上下页-->
        <div class="pageFocus1" v-show="recover.proIndex==7"></div>
        <div class="pageFocus2" v-show="recover.proIndex==8"></div>
        <div class="lastPage" >上一页</div>
        <div class="nextPage" >下一页</div>

        <div>
            <input id="input" type="text" v-show="recover.proIndex==9" autofocus/>
        </div>

        <div class="pageInfo">{{recover.page}}/{{totalPage}}</div>
    </div>
</template>

<script>
import {REMINDS} from '../store/mutation-types.js';
import Service  from '../service'

export default {
    name:'Reminds',
    data: function () {
        return {
            isInit:true,
            proList:[],
            proListLength:0,
            totalPage:0,
            type:['today','tomorrow','down'],
            recover:{
                action:'MENU',
                menuIndex:0,
                proIndex:0,
                page:1
            }
        }
    },
    created() {},
    mounted(){
        keyAction.focus=this.recover.action;
        this.reqData();
        this.pageEve();
    },
    filters:{
        fTime(val){
            return val.substr(0,10);
        }
    },
    components: {},
    methods: {
        toOtherPage(){
            var _page=document.getElementById('input').value;
            if(_page!=''&&Number(_page)<=this.totalPage&&Number(_page)>0){
                this.recover.page=Number(_page);
                this.reqData();
                document.getElementById('input').value='';
            }else{
                document.getElementById('input').value='';
                return;
            }
        },
        pageUp(){
            if(this.recover.page>1){
                --this.recover.page;
                this.reqData();
            }
        },
        pageDown(){
            if(this.recover.page<this.totalPage){
                ++this.recover.page;
                this.reqData();
            }
        },
        reqData(){
            var _vue = this;
            var _type=this.type[this.recover.menuIndex];
            _vue.proListLength=0;
            _vue.proList=[];
            Service.req(REMINDS,{type: _type, pageSize:7, pageNum: _vue.recover.page},
                function (s, v) {
                    _vue.isInit = false;
                    if (s == "success") {
                        if(v.Info.length!=0){
                            _vue.proList=v.Info;
                            _vue.proListLength=_vue.proList.length;
                            _vue.totalPage=Number(v.pageInfo.totalPage);
                        }
                    }else if(s =='error'){
                        console.log('err:',v);
                    }
                });

        },
        pageEve(){
            var _vue = this;


            keyAction.add(function () {
                if(_vue.recover.menuIndex>0){
                    --_vue.recover.menuIndex;
                    _vue.recover.page=1;
                    _vue.reqData();
                }
            }, KEY.LEFT, "MENU");
            keyAction.add(function () {
                if(_vue.recover.menuIndex<2){
                    ++_vue.recover.menuIndex;
                    _vue.recover.page=1;
                    _vue.reqData();
                }
            }, KEY.RIGHT, "MENU");
            keyAction.add(function () {
                _vue.recover.proIndex=0;
                _vue.recover.action=this.focus='PROGRAM';
            }, KEY.DOWN, "MENU");


            keyAction.add(function () {
                switch (_vue.recover.proIndex){
                    case 7:
                        ++_vue.recover.proIndex;
                        break;
                    case 8:
                        ++_vue.recover.proIndex;
                        _vue.$nextTick(function () {
                            document.getElementById('input').focus();
                        });
                        break;
                }
            }, KEY.RIGHT, "PROGRAM");
            keyAction.add(function () {
                if(_vue.recover.proIndex>7){
                    --_vue.recover.proIndex;
                }
            }, KEY.LEFT, "PROGRAM");
            keyAction.add(function () {
                switch (_vue.recover.proIndex){
                    case 7:
                    case 8:
                    case 9:
                        _vue.recover.proIndex=_vue.proListLength-1;
                        break;
                    case 0:
                        _vue.recover.action=this.focus='MENU';
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        --_vue.recover.proIndex;
                        break;
                }
            }, KEY.UP, "PROGRAM");
            keyAction.add(function () {
                if(_vue.proListLength<7&&_vue.recover.proIndex==(_vue.proListLength-1)){
                    _vue.recover.proIndex=7;
                }
                if(_vue.recover.proIndex<_vue.proListLength){
                    ++_vue.recover.proIndex;
                }
            }, KEY.DOWN, "PROGRAM");


            keyAction.add(function () {
                switch (_vue.recover.proIndex) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        //所有节目都是直接点播的
                        var _d=_vue.proList[_vue.recover.proIndex];
                        var _f={category_type:'0',recover:_vue.recover};
                        _vue.$emit('play', _d.id, _d.name, _f);
                        break;
                    case 7:
                        _vue.pageUp();
                        break;
                    case 8:
                        _vue.pageDown();
                        break;
                    case 9:
                        _vue.toOtherPage();
                        break;
                }
            }, KEY.ENTER, "PROGRAM");

            keyAction.add(function () {
                _vue.recover.proIndex=0;
                _vue.pageUp();
            },KEY.PAGEUP);
            keyAction.add(function () {
                _vue.recover.proIndex=0;
                _vue.pageDown();
            },KEY.PAGEDOWN);

            keyAction.add(function () {
                _vue.back();
            },KEY.BACK);

        }
    }
};

</script>

<style scoped>
.Reminds{
    position: absolute;
    width:1280px;
    height:720px;
    background-image: url('../assets/img/reminds/programremind_bg.jpg');
}
.logo{
    position: absolute;
    left: 54px;
    top: 31px;
}
.helpBtn{
    position: absolute;
    left: 1060px;
    top: 41px;
}
.menu{
    position: absolute;
    left:83px;
    top:136px;
    width:1130px;
    height:47px;

}
.menu div{
    float: left;
    width:369px;
    height:47px;
    line-height: 47px;
    color:white;
    font-weight: bold;
    font-size:30px;
    margin-right:7px;
    text-align: center;
}
.menuFocus{
    background-color: #ff9e00;
}
.Info{
    position: absolute;
    left:84px;
    top:186px;
    height:50px;
    width:1122px;
    font-size: 28px;
    line-height: 50px;
}
.Info .second{
    margin-left:650px;
}
.Info .first{
    margin-left:50px;
}
.proList{
    position: absolute;
    width:1123px;
    left:83px;
    top:238px;
}
.proList ul li{
    font-size:28px;
    height:44px;
    line-height: 44px;
    padding-left:27px;
}
#time{
    position: absolute;
    left:795px;
}
.lastPage{
    position: absolute;
    left:340px;
    top:565px;
    width:156px;
    height:38px;
    font-size:20px;
    text-align:center;
    line-height: 38px;
}
.nextPage{
    position: absolute;
    left:500px;
    top:565px;
    width:156px;
    height:38px;
    font-size:20px;
    text-align:center;
    line-height: 38px;
}
.pageFocus1{
     position: absolute;
     top:559px;
     left: 337px;
     width:156px;
     height:44px;
     border:3px solid #3bcdee;
     border-radius: 44px;
}
.pageFocus2{
    position: absolute;
    top:559px;
    left: 496px;
    width:156px;
    height:44px;
    border:3px solid #3bcdee;
    border-radius: 44px;
}
.pageInfo{
    position: absolute;
    left:860px;
    top:565px;
    height:38px;
    font-size:25px;
    text-align:center;
    line-height: 38px;
    font-weight: bold;
}
#input{
    border:1px solid #3bcdee;
    width:44px;
    height:22px;
    position: absolute;
    left:700px;
    top:573px;
}
</style>

