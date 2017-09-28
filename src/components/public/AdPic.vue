<template>
    <div class="AdPic">
        <div class="ad-wrapper" v-if="!defAd">
            <img class="adPic" :src="url" />
        </div>
        <div class="adPic defAd" v-if="defAd"></div>
    </div>
</template>

<script>
import {ADPIC} from '../../store/mutation-types';
import Service from '../../service/index.js';

export default {
    name:'AdPic',
    data: function () {
        return {
            url:'',
            defAd:false
        }
    },
    created(){
        console.log('adpic created...')
    },
    computed: {
        statusInfo() {
            return this.$store.state.streamData.statusInfo || {};
        }
    },
    mounted() {

    },
    methods: {
        getUrl(beforestr, afterstr, str){
            if (str == '') return '';
            let _pos1 = str.indexOf(beforestr);
            let _pos2 = str.indexOf(afterstr);
            let _len1 = beforestr.length;
            let _length = _pos2 - _len1 - _pos1;
            return str.substr(_pos1 + _len1, _length);
        },
        reqPic(_assetId,_adIds){
            this.defAd=false;
            var _vue=this;
            var _stb=this.statusInfo.stbId || '99616612190002281';
            var _movieAsset=_assetId;
            var _placement=_adIds||'3,';
            Service.adPic2({
                'terminalType': 'STB',
                'terminalId':_stb,
                'idType': 'stbno',
                'movieAssetId':_movieAsset,
                //'adParam.placementIds':_placement    //少传一个参数
            }, function (s, v) {
                if (s == "success" && v.adPlacementList.length) {

                    let index = v.adPlacementList.findIndex((item) => {
                        return item.id == '3';
                    });
                    if (index != -1) {
                        let _url = v.adPlacementList[index].contentUrl;
                        _url = _url.substr(_url.indexOf('http://')+7);
                        _url = _url.substr(_url.indexOf('/'));
                        console.log(_url,0);
                        _vue.$http.get(_url).then((res) => {
                            if (res.status === 200) {
                                _vue.url=_vue.getUrl('src="','" class', res.data);
                            } else {
                                _vue.defAd = true;
                            }
                        })
                    } else {
                        _vue.defAd = true;
                    }
                }else{
                    _vue.defAd = true;
                    console.log('err:', v);
                }
            });
        }
    }
};

</script>

<style scoped>
.adPic{
    width:445px;
    height:270px;
    border-radius: 4px;
}
.defAd{
  background:url('../../assets/img/auth/ad.gif') no-repeat;
  background-size: 100% 100%;
}
</style>

