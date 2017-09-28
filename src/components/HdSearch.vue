<template>
    <div class="Search">
        <div class="menuFocus0"><img src="../assets/img/search/mov.png"
            v-show="recover.menuIndex==0" /></div>
        <div class="menuFocus1"><img src="../assets/img/search/tv.png"
            v-show="recover.menuIndex==1" /></div>
        <div id="type">
            <ul>
                <li v-for="(_type,index1) in classify[recover.menuIndex].type"
                    :class="{threeFocus:recover.stayTypeIndex==index1,
                    blueFocus:typeIndex==index1&&recover.action=='TYPE'}">
                    {{_type.name}}</li>
            </ul>
        </div>
        <div id="area">
            <ul>
                <li v-for="(_area,index2) in area"
                    :class="{threeFocus:recover.stayAreaIndex==index2,
                    blueFocus:areaIndex==index2&&recover.action=='AREA'}">
                    {{_area.name}}</li>
            </ul>
        </div>
        <div id="year">
            <ul>
                <li v-for="(_year,index3) in year"
                    :class="{threeFocus:recover.stayYearIndex==index3,
                    blueFocus:yearIndex==index3&&recover.action=='YEAR'}">
                    {{_year.name}}</li>
            </ul>
        </div>
        <div class="iconUp"><img src="../assets/img/search/upicon.png" /></div>
        <div class="iconDown"><img src="../assets/img/search/nexticon.png" /></div>
        <div class="pageInfo">{{recover.page}}/{{totalPage}}</div>

        <div id="placeholder">
            <div v-for="index in 8" :class="{pFocus:recover.posterIndex==(index-1)&&
                recover.action=='POSTER'}">
                <div class="mask"></div>
            </div>
        </div>
        <div id="poster">
            <div v-for="(item,inx) in pList" :class="{pFocus:recover.posterIndex==inx&&
                recover.action=='POSTER'}">
                <img :src="item.poster|fposter('HD')" />
                <div :class="icoCss(item.tag)"></div>
                <div class="mask" :class="inx|fClass">
                    <p class="desc">{{item.short_desc}}</p>
                    <p class="price">{{item.price|fPrice}}</p>
                </div>
                <div class="title">{{item.name}}</div>
            </div>
        </div>

    </div>
</template>

<script>
import Service  from '../service';
import {CQSEARCH} from '../store/mutation-types.js';

export default {
    name:'Search',
    data: function () {
        return {
            classify:[],
            area:[],
            year:[],
            totalPage:0,
            pList:[],
            temTypeIndex:0,
            temAreaIndex:0,
            temYearIndex:0,
            temPosterIndex:0,
            typeIndex:0,
            areaIndex:0,
            yearIndex:0,
            recover:{
                menuIndex:0,   //电影
                posterIndex:0,

                stayTypeIndex:0,
                stayAreaIndex:0,
                stayYearIndex:0,

                page:1,
                action:'MENU'   //TYPE,AREA,YEAR
            }

        }
    },
    created() {
        this.getMenu();

    },
    mounted(){
        keyAction.focus=this.recover.action;
        this.pageEve();
        this.loadPoster();

    },
    filters:{
        fPrice(str){
            if(str){
                return '原价:'+str+'元';
            }
            return '';
        },
        fClass(inx){
            if(inx==null){
                return '';
            }
            return inx%2==0?'star5Bg':'star4Bg';
        },
        fFree(price){
           if(Number(price)==0) {
               return {display:'block'};
           }
           return '';
        }
    },
    computed:{},
    methods: {
      icoCss(t){

        var r={icon:true} ;
        if(t&&t!=""){
          r[t]=true;
        }
        return r;
      },
      getMenu(){
            this.classify=this.$store.state.columns.search.classify;
            this.area=this.$store.state.columns.search.area;
            this.year=this.$store.state.columns.search.year;
            var _year=new Date().getFullYear();
            for(var i=1;i<this.year.length-1;i++){
                this.year[i].name=this.year[i].yearId=_year+1-i;
            }
        },
        changeBg(){
            switch (this.recover.action){
                case 'TYPE':
                    this.recover.stayTypeIndex=this.typeIndex;
                    break;
                case 'AREA':
                    this.recover.stayAreaIndex=this.areaIndex;
                    break;
                case 'YEAR':
                    this.recover.stayYearIndex=this.yearIndex;
                    break;
                case 'MENU':
                    this.recover.stayTypeIndex=0;
                    this.recover.stayAreaIndex=0;
                    this.recover.stayYearIndex=0;
            }
        },
        recoverBg(){
            this.typeIndex=0;
            this.areaIndex=0;
            this.yearIndex=0;
            this.recover.posterIndex=0;

            this.temTypeIndex=0;
            this.temAreaIndex=0;
            this.temAreaIndex=0;
            this.temPosterIndex=0;

        },
        pageUp(){
            if(this.recover.page>1){
                --this.recover.page;
                this.loadPoster();
            }
        },
        pageDown(){
            if(this.recover.page<this.totalPage){
                ++this.recover.page;
                this.loadPoster();
            }
        },
        loadPoster(){
            var _vue = this;
            var _cid=this.classify[this.recover.menuIndex].cid;
            var _type=this.classify[this.recover.menuIndex].type[this.recover.stayTypeIndex].typeParam;
            var _area=this.area[this.recover.stayAreaIndex].areaId;
            var _year=this.year[this.recover.stayYearIndex].yearId;
            Service.req(CQSEARCH,{categoryId: _cid, pageSize:8, pageNum: this.recover.page,
                categoryType:_type,areaId:_area,year:_year},
                function (s, v) {
                    _vue.pList=[];
                    _vue.totalPage=1;
                    if (s == "success") {
                        if(v.list.length!=0){
                            _vue.pList=v.list;
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
                if(_vue.recover.menuIndex==1){
                    _vue.recover.menuIndex = 0;
                    _vue.recoverBg();
                    _vue.changeBg();
                    _vue.recover.page=1;
                    _vue.loadPoster();
                }
            }, KEY.LEFT, "MENU");
            keyAction.add(function () {
                if(_vue.recover.menuIndex==0){
                    _vue.recover.menuIndex = 1;
                    _vue.recoverBg();
                    _vue.changeBg();
                    _vue.recover.page=1;
                    _vue.loadPoster();
                }
            }, KEY.RIGHT, "MENU");
            keyAction.add(function () {
                _vue.typeIndex=0;
                _vue.recover.action=this.focus='TYPE';
            }, KEY.DOWN, "MENU");


            keyAction.add(function () {
                _vue.temTypeIndex=_vue.typeIndex;
                _vue.areaIndex=_vue.temAreaIndex;
                _vue.recover.action=this.focus='AREA';
            }, KEY.RIGHT, "TYPE");
            keyAction.add(function () {
                switch (_vue.typeIndex){
                    case 0:
                        _vue.recover.action=this.focus='MENU';
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        --_vue.typeIndex;
                        break;
                }
            }, KEY.UP, "TYPE");
            keyAction.add(function () {
                switch (_vue.typeIndex){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        ++_vue.typeIndex;
                        break;
                }
            }, KEY.DOWN, "TYPE");


            keyAction.add(function () {
                _vue.temAreaIndex=_vue.areaIndex;
                _vue.typeIndex=_vue.temTypeIndex;
                _vue.recover.action=this.focus='TYPE';
            }, KEY.LEFT, "AREA");
            keyAction.add(function () {
                _vue.temAreaIndex=_vue.areaIndex;
                _vue.yearIndex=_vue.temAreaIndex;
                _vue.recover.action=this.focus='YEAR';
            }, KEY.RIGHT, "AREA");
            keyAction.add(function () {
                switch (_vue.areaIndex){
                    case 0:
                        _vue.recover.action=this.focus='MENU';
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        --_vue.areaIndex;
                        break;
                }
            }, KEY.UP, "AREA");
            keyAction.add(function () {
                switch (_vue.areaIndex){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        ++_vue.areaIndex;
                        break;
                }
            }, KEY.DOWN, "AREA");


            keyAction.add(function () {
                _vue.temAreaIndex=_vue.yearIndex;
                _vue.areaIndex=_vue.temAreaIndex;
                _vue.recover.action=this.focus='AREA';
            }, KEY.LEFT, "YEAR");
            keyAction.add(function () {
                _vue.temAreaIndex=_vue.yearIndex;
                _vue.recover.posterIndex=_vue.temPosterIndex;
                _vue.recover.action=this.focus='POSTER';
            }, KEY.RIGHT, "YEAR");
            keyAction.add(function () {
                switch (_vue.yearIndex){
                    case 0:
                        _vue.recover.action=this.focus='MENU';
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        --_vue.yearIndex;
                        break;
                }
            }, KEY.UP, "YEAR");
            keyAction.add(function () {
                switch (_vue.yearIndex){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        ++_vue.yearIndex;
                        break;
                }
            }, KEY.DOWN, "YEAR");


            keyAction.add(function () {
                if(_vue.recover.posterIndex==0||_vue.recover.posterIndex==4){
                    _vue.temPosterIndex=_vue.recover.posterIndex;
                    _vue.yearIndex=_vue.temAreaIndex;
                    _vue.recover.action=this.focus='YEAR';
                }else{
                    --_vue.recover.posterIndex;
                }
            }, KEY.LEFT, "POSTER");
            keyAction.add(function () {
                switch (_vue.recover.posterIndex){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        ++_vue.recover.posterIndex;
                        break;
                }
            }, KEY.RIGHT, "POSTER");
            keyAction.add(function () {
                switch (_vue.recover.posterIndex){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        _vue.pageUp();
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        _vue.recover.posterIndex-=4;
                        break;
                }
            }, KEY.UP, "POSTER");
            keyAction.add(function () {
                switch (_vue.recover.posterIndex){
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        _vue.recover.posterIndex+=4;
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        _vue.pageDown();
                        break;
                }
            }, KEY.DOWN, "POSTER");


            keyAction.add(function () {
                switch (_vue.recover.action){
                    case 'TYPE':
                    case 'AREA':
                    case 'YEAR':
                        _vue.recover.page=1;
                        _vue.changeBg();
                        _vue.loadPoster();
                        break;
                    case 'POSTER':
                        var _id=_vue.pList[_vue.recover.posterIndex].id;
                        _vue.push({path: "/hd/info",query:{id:_id}});
                        break;
                }
            }, KEY.ENTER);


            keyAction.add(function () {
                _vue.pageUp();
            },KEY.PAGEUP);
            keyAction.add(function () {
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
.Search{
    position: absolute;
    width:1280px;
    height:720px;
    background-image: url('../assets/img/search/search_bg.png');
}
#type{
    position: absolute;
    left:74px;
    top:220px;
    width:117px;
    color:white;
    font-size:26px;
    text-align: center;
}
#type ul li{
    margin-top:16px;
    height:33px;
    line-height:33px;
    width:109px;
    margin-left:5px;
}
.threeFocus{
    background-color: grey ;
}
.blueFocus{
    background-color:#00a0e9 !important;
}
.hot{
    background: url("../assets/img/hd/icoHot.png") no-repeat;
}
.new{
    background: url("../assets/img/hd/icoNew.png") no-repeat;
}
.free{
    background: url("../assets/img/hd/icoFree.png") no-repeat;
}
.icon{
    position: absolute;
    left:2px;
    top:0px;
    width:53px;
    height: 54px;
}
.menuFocus0{
    z-index:2;
    position: absolute;
    left:74px;
    top:108px;
}
.menuFocus1{
    z-index:2;
    position: absolute;
    left:192px;
    top:108px;
}
#area{
    position: absolute;
    left:192px;
    top:220px;
    width:117px;
    color:white;
    font-size:26px;
    text-align: center;
}
#area ul li{
    margin-top:16px;
    height:33px;
    line-height:33px;
    width:109px;
    margin-left:5px;
}
#year{
    position: absolute;
    left:310px;
    top:220px;
    width:117px;
    color:white;
    font-size:26px;
    text-align: center;
}
#year ul li{
    margin-top:16px;
    height:33px;
    line-height:33px;
    width:109px;
    margin-left:5px;
}
#placeholder{
    position: absolute;
    left: 436px;
    top: 107px;
}
#placeholder>div{
    background-color: #999;
    width:180px;
    height:240px;
    margin-bottom: 50px;
    margin-left:9px;
    float: left;
    position: relative;
    overflow:hidden;
}
#poster{
    position: absolute;
    left: 436px;
    top: 107px;
}
#poster>div{
    width:180px;
    height:290px;
    margin-left:9px;
    float: left;
    position: relative;
    overflow:hidden;
}
.iconUp{
    position: absolute;
    left:1210px;
    top:320px;
}
.iconDown{
    position: absolute;
    left:1210px;
    top:410px;
}
.iconUp img,.iconDown img{
    width:17px;
    height:13px;
}
.pageInfo{
    position: absolute;
    left:1195px;
    top:361px;
    font-size: 20px;
    color:#a9a0a7;
}

.mask {
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(23,93,227,0.5);
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    z-index:100;
    width:180px;
    height:240px;
}
.pFocus .mask{
    display: flex;
}
.mask > p {
    text-align:center;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
}
.mask .desc {
    width: 170px;
    margin-top: 90px;
    font-size: 20px;
}
.mask .price {
    width: 170px;
    margin-top: 20px;
    font-size: 24px;
    color:#999;
}
.star4Bg{
    background-image: url('../assets/img/search/movie_4star.png');
    opacity: 0.7;
}
.star5Bg{
    background-image: url('../assets/img/search/movie_5star.png');
    opacity: 0.7;
}
.title{
    position: absolute;
    height:50px;
    width:180px;
    text-align:center;
    line-height:45px;
    color:#a9a0a7;
    font-size: 23px;
    font-weight: bold;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

</style>

