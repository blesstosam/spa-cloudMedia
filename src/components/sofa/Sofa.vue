<template>
    <div class="Sofa">
        <div class="logo"></div>
        <div class="defaultText">{{msg}}</div>
        <input type="text" id="input" autofocus v-show="recover.index==0||recover.index==1" />
        <div class="btn" :class="{bgBlue:recover.index==1}">确定</div>
        <div class="word1">君若不来 我为谁开 精彩影片与您今春有约</div>
        <div class="word2">支付选择</div>

        <div class="buyFocus" :style="buyBtn" v-show="recover.index==8||recover.index==7"></div>
        <div class="tvBuy"></div>
        <div class="codeBuy"></div>
        <div class="upArrow" :class="recover.posterIndex|fUpArrow(recover.index)"></div>
        <div class="downArrow" :class="recover.posterIndex|fDownArrow(recover.index,pLength)"></div>

        <div class="placeholder">
            <div class="bigPoster"></div>
            <div v-for="inx in 5" :class="'p_'+(inx-1)">
                <div class="mask" :class="inx|fClass(recover.index)"></div>
            </div>
        </div>

        <div class="poster">
            <div class="bigPoster">
                <img :src="bigPoster|fposter('SOFA_B')" />
            </div>
            <div v-for="(p,i) in posters" :class="'p_'+i">
                <img :src="p.poster|hPoster(i)" />
            </div>
        </div>
    </div>
</template>

<script>
import Service from '../../service/index.js';
import {SOFA} from '../../store/mutation-types';

export default {
    name:'Sofa',
    data: function () {
        return {
            msg:'已购票用户请输入电影码,校验观影',
            temIndex:4,
            posters:[],
            bigPoster:'',
            allPosters:[],
            pLength:0,
            recover:{
                index:8,
                posterIndex:2
            }
        }
    },
    created() {},
    mounted(){
        this.pageEve();
        this.reqPoster();
    },
    computed:{
        buyBtn(){
            return {left:470-(this.recover.index-7)*381+'px'}
        }
    },
    filters:{
        fUpArrow(pindex,index){
            if(pindex>2||(index>4&&index<=6)){
                return 'upArrow2';
            }else{
                return 'upArrow1';
            }
        },
        fDownArrow(pindex,index,pLength){
            if(pindex==pLength-3&&index==6){
                return 'downArrow1';
            }else{
                return 'downArrow2';
            }
        },
        fClass(inx,index){
            if(index==inx+1){
                if(inx>2){
                    return 'showMask'+' posterFocus2';
                }else{
                    return 'showMask'+' posterFocus1';
                }
            }
        },
        hPoster(val,i){
            if(!val) return '';
            if(i>1){
                return poster(val,'SOFA_H');
            }else{
                return poster(val,'SOFA_V');
            }
        }
    },
    methods: {
        posterUp(){
            --this.recover.posterIndex;
            this.posters.pop();
            var _item=this.allPosters[this.recover.posterIndex];
            this.posters.splice(2,0,_item);
        },
        posterDown(){
            ++this.recover.posterIndex;
            this.posters.splice(2,1);
            var _item=this.allPosters[this.recover.posterIndex+2];
            this.posters.push(_item);
        },
        reqPoster(){
            var _vue=this;
            var _cid=566532;
            Service.req(SOFA,{categoryId:_cid,pageSize:20},function (s,v) {
                if (s == "success") {
                    if(v.response.length!=0){
                        _vue.allPosters=[];
                        _vue.pLength=0;
                        _vue.posters=[];
                        _vue.bigPoster='';

                        _vue.allPosters=v.response;
                        _vue.pLength=v.response.length;
                        _vue.bigPoster=_vue.allPosters[0].poster;
                        _vue.posters=_vue.allPosters.slice(0,5);
                    }
                }else if(s =='error'){
                    console.log('err:',v);
                }
            });
        },
        pageEve(){
            var _vue=this;
            keyAction.add(function () {
                switch (_vue.recover.index){
                    case 1:
                        _vue.recover.index=0;
                        _vue.msg='';
                        _vue.$nextTick(function () {
                            document.getElementById('input').focus();
                        });
                        break;
                    case 3:
                        _vue.recover.index=2;
                        break;
                    case 2:
                    case 4:
                    case 5:
                    case 6:
                        _vue.recover.index=7;
                        break;
                    case 7:
                        _vue.recover.index=8;
                        break;
                }
            },KEY.LEFT);
            keyAction.add(function () {
                switch (_vue.recover.index){
                    case 0:
                        _vue.recover.index=1;
                        break;
                    case 2:
                        _vue.recover.index=3;
                        break;
                    case 7:
                        _vue.recover.index=_vue.temIndex;
                        break;
                    case 8:
                        _vue.recover.index=7;
                        break;
                }
            },KEY.RIGHT);
            keyAction.add(function () {
                switch (_vue.recover.index){
                    case 2:
                    case 3:
                        _vue.recover.index=0;
                        _vue.msg='';
                        _vue.$nextTick(function () {
                            document.getElementById('input').focus();
                        });
                        break;
                    case 4:
                        if(_vue.recover.posterIndex>2){
                            _vue.posterUp();
                        }else{
                            _vue.recover.index=2;
                        }
                        break;
                    case 5:
                    case 6:
                        --_vue.recover.index;
                        break;
                    case 7:
                    case 8:
                        _vue.recover.index=0;
                        _vue.msg='';
                        _vue.$nextTick(function () {
                            document.getElementById('input').focus();
                        });
                        break;
                }
            },KEY.UP);
            keyAction.add(function () {
                switch (_vue.recover.index){
                    case 0:
                    case 1:
                        _vue.recover.index=2;
                        break;
                    case 2:
                    case 3:
                        _vue.recover.index=4;
                        break;
                    case 4:
                    case 5:
                        ++_vue.recover.index;
                        break;
                    case 6:
                        if(_vue.recover.posterIndex+2<_vue.pLength-1){
                            _vue.posterDown();
                        }
                        break;
                }
            },KEY.DOWN);

            keyAction.add(function () {
                switch (_vue.recover.index){
                    case 1:
                        //search
                        break;
                    case 7:
                        //扫码
                        break;
                    case 8:
                        //电视购买
                        break;
                    default:
                        _vue.bigPoster=_vue.posters[_vue.recover.index-2].poster;
                        break;
                }
            },KEY.ENTER);

            keyAction.add(function () {
                _vue.back();
            },KEY.BACK);
        }
    }
};

</script>

<style scoped>
.Sofa{
    position: relative;
    width:1280px;
    height:720px;
    background: url('../../assets/img/sofa/common_bg.png') no-repeat;
}
.logo{
    position: absolute;
    left:40px;
    top:45px;
    width:180px;
    height:61px;
    background: url('../../assets/img/sofa/sofaLogo.png') no-repeat;
}
.defaultText{
    position: absolute;
    width: 325px;
    height: 70px;
    left: 250px;
    top: 40px;
    text-align: center;
    line-height: 70px;
    font-size: 18px;
    color:#958c96;
    font-weight: bold;
    background: url('../../assets/img/sofa/inport.png');
}
#input{
    border:1px solid #00a0e9;
    position: absolute;
    left: 270px;
    top: 50px;
    /*border: 0;*/
    margin: 0;
    padding: 0;
    width: 290px;
    line-height: 50px;
    height: 50px;
    font-size: 30px;
}
.btn{
    position: absolute;
    width: 112px;
    height: 60px;
    left: 585px;
    top: 47px;
    text-align: center;
    line-height: 60px;
    font-size: 35px;
    color:#ffffff;
    background-color:#79707a ;
    border-radius: 25px;
}
.word1{
    position: absolute;
    left:730px;
    top:55px;
    height:47px;
    width:500px;
    background-color: #3a3850;
    color:#ffffff;
    font-size:20px;
    line-height: 47px;
}
.word2{
    position: absolute;
    left:42px;
    top:470px;
    height:40px;
    color:#958c96;
    font-size:24px;
    line-height: 40px;
    font-weight:bold;
}
.tvBuy{
    position: absolute;
    left: 80px;
    top: 530px;
    background: url('../../assets/img/sofa/tvBuy.png') no-repeat;
    width:296px;
    height:122px;
}
.codeBuy{
    position: absolute;
    left: 460px;
    top: 530px;
    background: url('../../assets/img/sofa/codeBuy.png') no-repeat;
    width:296px;
    height:122px;
}
.buyFocus{
    position: absolute;
    top:535px;
    width:268px;
    height:100px;
    border:5px solid #00a0e9;
    border-radius: 33px;
}
.upArrow{
    position: absolute;
    left: 970px;
    top: 405px;
    width:79px;
    height:43px;
}
.upArrow1{
    background: url('../../assets/img/sofa/topIcon.png');
}
.upArrow2{
    background: url('../../assets/img/sofa/topIcon_focus.png');
}
.downArrow{
    position: absolute;
    left: 970px;
    top: 650px;
    width:79px;
    height:43px;
}
.downArrow1{
    background: url('../../assets/img/sofa/downIcon.png');
}
.downArrow2{
    background: url('../../assets/img/sofa/downIcon_focus.png');
}
.bigPoster{
    position: absolute;
    width: 738px;
    height: 336px;
    left: 42px;
    top: 118px;
    background-color: #999;
}
.p_0{
    position: absolute;
    width: 207px;
    height: 285px;
    left: 790px;
    top: 118px;
    background-color: #999;
    overflow: hidden;
}
.p_1{
    position: absolute;
    width: 207px;
    height: 285px;
    left: 1024px;
    top: 118px;
    background-color: #999;
    overflow: hidden;
}
.p_2{
    position: absolute;
    width: 444px;
    height: 66px;
    left: 790px;
    top: 440px;
    background-color: #999;
    overflow: hidden;
}
.p_3{
    position: absolute;
    width: 444px;
    height: 66px;
    left: 790px;
    top: 515px;
    background-color: #999;
    overflow: hidden;
}
.p_4{
    position: absolute;
    width: 444px;
    height: 66px;
    left: 790px;
    top: 590px;
    background-color: #999;
    overflow: hidden;
}
.mask{
    color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(23,93,227,0.5);
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    z-index:100;
}
.showMask{
    display: flex !important;
}
.bgBlue{
    background-color: #00a0e9;
}
.posterFocus1{
   background: url('../../assets/img/sofa/vPoster_focus.png') no-repeat;
}
.posterFocus2{
    background: url('../../assets/img/sofa/hPoster_focus.png') no-repeat;
}
</style>

