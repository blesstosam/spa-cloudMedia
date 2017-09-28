<template>
    <div :class="bgImg">
        <!--幼儿小班中班大班-->
        <div class="YouEr" v-if="recover.parentId=='190288'||recover.parentId=='599928'||
        recover.parentId=='599929'||recover.parentId=='599930'">
            <div class="proList">
                <ul>
                    <li v-for="(item,index) in proList" :class="{proFocus:recover.subIndex==index}">
                        <span>{{index+1}}</span>{{item.name}}</li>
                </ul>
            </div>


            <div class="pageInfo">
                第<span>{{recover.page}}</span>页/共<span>{{totalPage}}</span>页
            </div>
            <div class="lastPage" v-show="recover.subIndex==6">
                <img src="../../assets/img/education/prepagefocus2.png">
            </div>
            <div class="nextPage" v-show="recover.subIndex==7">
                <img src="../../assets/img/education/nextpagefocus2.png">
            </div>
            <div class="rec">
                <ul>
                    <li v-for="(item,index) in posterUrlList" :id="'recommend'+index">
                        <img :src="item|fposter('REC')"/>
                    </li>
                </ul>
            </div>
        </div>

        <!--益智动画和星猫乐园-->
        <div class="DongHuaXingMao" v-if="recover.parentId=='599931'||recover.parentId=='755948'">
            <!--节目表-->
            <div class="proList">
                <ul>
                    <li v-for="(item,index) in proList" :class="{proFocus:recover.subIndex==index}">
                        <span>{{index+1}}</span>{{item.name}}</li>
                </ul>
            </div>


            <div class="pageInfo">
                第<span>{{recover.page}}</span>页/共<span>{{totalPage}}</span>页
            </div>
            <div class="lastPage" v-show="recover.subIndex==6">
                <img src="../../assets/img/education/prepagefocus2.png">
            </div>
            <div class="nextPage" v-show="recover.subIndex==7">
                <img src="../../assets/img/education/nextpagefocus2.png">
            </div>
        </div>

    </div>
</template>

<script>
import {FEATURES} from '../../store/mutation-types.js';
import {RECOMMEND} from '../../store/mutation-types.js';
import {DEFAULT} from '../../store/mutation-types.js';
import Service  from '../../service';

export default {
    name:'SubEdu',
    data: function () {
        return {
            proList:[],
            proListLength:0,

            posterList:[],      //推荐海报
            posterUrlList:[],
            isInit:true,
            totalPage:0,

            recover:{
                parentId:'',
                subIndex:0,
                page:1,
                categoryId:''   //id由上一级页面传过来
            }
        }
    },
    created() {
        this.getUrlParam();
    },
    mounted(){
        //beforeMounted将recover里面的数字字符串转为了数字类型
        this.recover.parentId=this.recover.parentId.toString();
        this.recover.categoryId=this.recover.categoryId.toString();
        var _parentId=this.recover.parentId;
        this.pageEve();
        this.reqData();
        if(_parentId=='190288'||_parentId=='599928'||
            _parentId=='599929'||_parentId=='599930'){
            this.loadPoster();
        }
    },
    computed:{
        bgImg(){
            var _bg={};
            _bg['SubEdu']=true;
            //switch是匹配全等(===)
            switch(this.recover.parentId){
                case '190288':    //这个应该改掉
                case '599928':
                    _bg['xiaobanBg']=true;
                    break;
                case '599929':
                    _bg['zhongbanBg']=true;
                    break;
                case '599930':
                    _bg['dabanBg']=true;
                    break;
                case '599931':
                    _bg['yzdh_'+this.recover.categoryId]=true;
                    break;
                case '185420':
                    _bg['xxly_'+this.recover.categoryId]=true;
                    break;
                case '755948':
                    _bg['xmly_'+this.recover.categoryId]=true;
                    break;
            }
            return _bg;
        }
    },
    methods: {
        getCid(beforestr, afterstr, url){
            if (url == '') return '';
            let _pos1 = url.indexOf(beforestr);
            let _pos2 = url.indexOf(afterstr);
            let _len1 = beforestr.length;
            let _length = _pos2 - _len1 - _pos1;
            return url.substr(_pos1 + _len1, _length);
        },
        pageUp(){
            if(this.recover.page>1){
                this.recover.subIndex=0;
                --this.recover.page;
                this.reqData();
            }
        },
        pageDown(){
            if(this.recover.page<this.totalPage){
                this.recover.subIndex=0;
                ++this.recover.page;
                this.reqData();
            }
        },
        getUrlParam(){
            this.recover.categoryId=this.$route.query.categoryId || this.recover.categoryId;
            this.recover.parentId=this.$route.query.parentId || this.recover.parentId;
        },
        loadPoster(){
            var _vue=this;
            var _cid=_vue.recover.categoryId;
            _vue.posterList=[];
            _vue.posterUrlList=[];
            Service.req(RECOMMEND,{categoryId: _cid, pageSize:2, pageNum: 1},
                function (s,v) {
                if (s == "success") {
                    _vue.posterList=v.response;
                    v.response.forEach(function (val) {
                        _vue.posterUrlList.push(val.img_url);
                    });
                }else if(s =='error'){
                    console.log('err:',v);
                }
            });
        },
        reqData(){
            var _vue=this;
            var _cid=_vue.recover.categoryId;
            _vue.proList=[];
            _vue.proListLength=0;
            Service.req(DEFAULT,{categoryId: _cid, pageSize:6, pageNum: this.recover.page},
            function (s,v) {
                if (s == "success") {
                    _vue.proListLength=v.response.length;
                    _vue.proList=v.response;
                    _vue.totalPage=Number(v.pageInfo.totalPage);
                }else if(s =='error'){
                    console.log('err:',v);
                }
            });
            this.isInit=false;
        },
        pageEve(){
            var _vue = this;
            keyAction.focus='POR';
            keyAction.add(function () {
                if(_vue.recover.subIndex==6){
                    ++_vue.recover.subIndex;
                }
            }, KEY.RIGHT,'POR');
            keyAction.add(function () {
                if(_vue.recover.subIndex==7){
                    --_vue.recover.subIndex;
                }
            }, KEY.LEFT,'POR');
            keyAction.add(function () {
                if(_vue.proListLength<6&&_vue.recover.subIndex==_vue.proListLength-1){
                    _vue.recover.subIndex=6;
                }
                if(_vue.recover.subIndex<_vue.proListLength){
                    ++_vue.recover.subIndex;
                }
            }, KEY.DOWN,'POR');
            keyAction.add(function () {
                if(_vue.recover.subIndex==6||_vue.recover.subIndex==7){
                    _vue.recover.subIndex=_vue.proListLength-1;
                }else if(_vue.recover.subIndex>0){
                    --_vue.recover.subIndex;
                }
            }, KEY.UP,'POR');


            keyAction.add(function () {
                switch (_vue.recover.subIndex) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        var _data=_vue.proList[_vue.recover.subIndex];
                        var _f={category_type:_data.category_type,recover:_vue.recover};
                        _vue.$emit('play',_data.id,_data.name,_f);
                        break;
                    case 6:
                        _vue.pageUp();
                        break;
                    case 7:
                        _vue.pageDown();
                        break;
                }
            }, KEY.ENTER,'POR');

            keyAction.add(function () {
                _vue.pageUp();
            },KEY.PAGEUP);
            keyAction.add(function () {
                _vue.pageDown();
            },KEY.PAGEDOWN);

            var _parentId=this.recover.parentId;

            if(_parentId=='190288'||_parentId=='599928'||
                _parentId=='599929'||_parentId=='599930'){
                keyAction.add(function () {
                    if(_vue.posterList.length!=0){
                        var _url = _vue.posterList[event.keyCode-49].url;
                    }
                    var _subCid=_vue.getCid('categoryid=','&groupid',_url);
                    var _parentId=_vue.getCid('parentid=','&clientid',_url);

                    _vue.recover.categoryId=_subCid;
                    _vue.recover.parentId=_parentId;

                    _vue.recover.page=1;
                    _vue.reqData();
                    _vue.loadPoster();
                },[KEY.NUMBER1,KEY.NUMBER2]);
            }

            keyAction.add(function () {
                _vue.back();
            },KEY.BACK);
        }
    }
};

</script>

<style scoped>
.SubEdu{
    position: absolute;
    left:0;
    top:0;
    width:1280px;
    height:720px;
}
.proFocus{
    background-color: #f0af02 !important;
}
/* 背景图片url */
.xiaobanBg{ background: url('../../assets/img/education/Childrens_bg.jpg') no-repeat left top}
.zhongbanBg{ background: url('../../assets/img/education/happy_bg.jpg') no-repeat left top}
.dabanBg{ background: url('../../assets/img/education/Growup_bg.jpg') no-repeat left top}

.yzdh_907022{ background:url('../../assets/img/education/907022.jpg') no-repeat left top}
.yzdh_920743{ background:url('../../assets/img/education/920743.jpg') no-repeat left top}
.yzdh_938388{ background:url('../../assets/img/education/938388.jpg') no-repeat left top}
.yzdh_735853{ background:url('../../assets/img/education/735853.jpg') no-repeat left top}
.yzdh_735530{ background:url('../../assets/img/education/735530.jpg') no-repeat left top}
.yzdh_735529{ background:url('../../assets/img/education/735529.jpg') no-repeat left top}
.yzdh_599989{ background:url('../../assets/img/education/599989.jpg') no-repeat left top}
.yzdh_599963{ background:url('../../assets/img/education/599963.jpg') no-repeat left top}
.yzdh_599962{ background:url('../../assets/img/education/599962.jpg') no-repeat left top}
.yzdh_599965{ background:url('../../assets/img/education/599965.jpg') no-repeat left top}
.yzdh_599966{ background:url('../../assets/img/education/599966.jpg') no-repeat left top}
.yzdh_599967{ background:url('../../assets/img/education/599967.jpg') no-repeat left top}
.yzdh_599988{ background:url('../../assets/img/education/599988.jpg') no-repeat left top}
.yzdh_599964{ background:url('../../assets/img/education/599964.jpg') no-repeat left top}
.yzdh_715428{ background:url('../../assets/img/education/715428.jpg') no-repeat left top}
.yzdh_601903{ background:url('../../assets/img/education/601903.jpg') no-repeat left top}
.yzdh_599990{ background:url('../../assets/img/education/599990.jpg') no-repeat left top}
.yzdh_718165{ background:url('../../assets/img/education/718165.jpg') no-repeat left top}
.yzdh_769293{ background:url('../../assets/img/education/769293.jpg') no-repeat left top}
.yzdh_769292{ background:url('../../assets/img/education/769292.jpg') no-repeat left top}
.yzdh_599988{ background:url('../../assets/img/education/599988.jpg') no-repeat left top}
.yzdh_882332{ background:url('../../assets/img/education/882332.jpg') no-repeat left top}
.yzdh_876793{ background:url('../../assets/img/education/876793.jpg') no-repeat left top}
.yzdh_876723{ background:url('../../assets/img/education/876723.jpg') no-repeat left top}
.yzdh_876792{ background:url('../../assets/img/education/876792.jpg') no-repeat left top}
.yzdh_876724{ background:url('../../assets/img/education/876724.jpg') no-repeat left top}
.yzdh_886470{ background:url('../../assets/img/education/886470.jpg') no-repeat left top}
.yzdh_876788{ background:url('../../assets/img/education/876788.jpg') no-repeat left top}
.yzdh_876789{ background:url('../../assets/img/education/876789.jpg') no-repeat left top}
.yzdh_886469{ background:url('../../assets/img/education/886469.jpg') no-repeat left top}
.yzdh_876726{ background:url('../../assets/img/education/876726.jpg') no-repeat left top}
.yzdh_886468{ background:url('../../assets/img/education/886468.jpg') no-repeat left top}
.yzdh_895249{ background:url('../../assets/img/education/895249.jpg') no-repeat left top}
.yzdh_898909{ background:url('../../assets/img/education/898909.jpg') no-repeat left top}
.yzdh_901709{ background:url('../../assets/img/education/901709.jpg') no-repeat left top}
.yzdh_905421{ background:url('../../assets/img/education/905421.jpg') no-repeat left top}
.yzdh_905422{ background:url('../../assets/img/education/905422.jpg') no-repeat left top}
.yzdh_1011597{ background:url('../../assets/img/education/1011597.jpg') no-repeat left top}

.xmly_755949{background:url('../../assets/img/education/755949.jpg') no-repeat left top}
.xmly_755950{background:url('../../assets/img/education/755950.jpg') no-repeat left top}
.xmly_755951{background:url('../../assets/img/education/755951.jpg') no-repeat left top}
.xmly_755916{background:url('../../assets/img/education/755916.jpg') no-repeat left top}
.xmly_761108{background:url('../../assets/img/education/761108.jpg') no-repeat left top}
.xmly_761109{background:url('../../assets/img/education/761109.jpg') no-repeat left top}
.xmly_799913{background:url('../../assets/img/education/799913.jpg') no-repeat left top}
.xmly_799914{background:url('../../assets/img/education/799914.jpg') no-repeat left top}
.xmly_799917{background:url('../../assets/img/education/799917.jpg') no-repeat left top}
.xmly_799918{background:url('../../assets/img/education/799918.jpg') no-repeat left top}
.xmly_799922{background:url('../../assets/img/education/799922.jpg') no-repeat left top}
.xmly_799923{background:url('../../assets/img/education/799923.jpg') no-repeat left top}
.xmly_799926{background:url('../../assets/img/education/799926.jpg') no-repeat left top}
.xmly_799927{background:url('../../assets/img/education/799927.jpg') no-repeat left top}
.xmly_799897{background:url('../../assets/img/education/799897.jpg') no-repeat left top}
.xmly_799898{background:url('../../assets/img/education/799898.jpg') no-repeat left top}
.xmly_799901{background:url('../../assets/img/education/799901.jpg') no-repeat left top}
.xmly_799902{background:url('../../assets/img/education/799902.jpg') no-repeat left top}
.xmly_799906{background:url('../../assets/img/education/799906.jpg') no-repeat left top}
.xmly_799933{background:url('../../assets/img/education/799933.jpg') no-repeat left top}
.xmly_799934{background:url('../../assets/img/education/799934.jpg') no-repeat left top}
.xmly_799935{background:url('../../assets/img/education/799935.jpg') no-repeat left top}
.xmly_799938{background:url('../../assets/img/education/799938.jpg') no-repeat left top}

/*.xxly_460685{background:url('../../assets/img/education/460685.jpg') no-repeat left top}*/
/*.xxly_460686{background:url('../../assets/img/education/460686.jpg') no-repeat left top}*/
/*.xxly_460687{background:url('../../assets/img/education/460687.jpg') no-repeat left top}*/

/*幼儿小中大班css*/
.YouEr .proList{
    position: absolute;
    width: 654px;
    height: 420px;
    left: 200px;
    top: 270px;
}
.YouEr .proList ul li{
    width:630px;
    height:54px;
    line-height: 54px;
    font-size: 28px;
    font-family: '黑体';

}
.YouEr .proList ul li span{
    width:30px;
    display: inline-block;
}
.YouEr .pageInfo{
    position: absolute;
    width: 178px;
    height: 30px;
    left: 435px;
    top: 618px;
    font-size:22px;
    font-weight: bold;
    font-family: '黑体';
}
.YouEr .lastPage{
    position: absolute;
    left: 300px;
    top: 603px;
}
.YouEr .lastPage img{
    width: 120px;
    height: 50px;
}
.YouEr .nextPage{
    position: absolute;
    left: 576px;
    top: 603px;
}
.YouEr .nextPage img{
    width: 120px;
    height: 50px;
}
.YouEr #recommend0{
    position: absolute;
    left: 915px;
    top: 310px;
}
.YouEr #recommend0 img{
    width: 200px;
    height: 130px;
}
.YouEr #recommend1{
    position: absolute;
    left: 915px;
    top: 465px;
}
.YouEr #recommend1 img{
    width: 200px;
    height: 130px;
}
/*幼儿小中大班css结束*/

/* 益智动画和星猫乐园的css */
.DongHuaXingMao .proList{
    position: absolute;
    left: 275px;
    top: 300px;
}
.DongHuaXingMao .proList ul li{
    padding-left:30px;
    width:608px;
    height:50px;
    line-height: 50px;
    font-size: 28px;
    font-family: '黑体';
}
.DongHuaXingMao .proList ul li span{
    width:30px;
    display: inline-block;
}
.DongHuaXingMao .pageInfo{
    position: absolute;
    width: 178px;
    height: 30px;
    left: 516px;
    top: 612px;
    font-size:22px;
    font-weight: bold;
    font-family: '黑体';
}
.DongHuaXingMao .lastPage{
    position: absolute;
    left: 354px;
    top: 592px;
}
.DongHuaXingMao .nextPage{
    position: absolute;
    left: 692px;
    top: 592px;
}

</style>

