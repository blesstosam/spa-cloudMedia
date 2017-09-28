<template>
  <div class="nav">
    <div class="ico leftIco"></div>
    <ul class="menu">
      <li :class="{focus:i==index&&focus,lost:i==index&&!focus}" v-for="(item,i) in list">
        {{item.name}}
      </li>
    </ul>
    <div class="ico rightIco"></div>
  </div>
</template>

<script>


  export default {
    props: ['focus', 'init','kback'],
    data(){
      return {list: [], index: 0, showMaxIndex: 8,isInit:true,
       reback:false,
      }
    },

    mounted(){
      console.log("hdnav.vue................mounted",this.$route.path);
      this.index = Number(this.init || 0);
      this.isInit=true;
      this.load();
    },
    watch:{
      "$route.path"(){
        console.log("hdnav.vue................$route",this.$route.path);
        if(this.reback){
          var _t=null;

          for(var i in this.list){
            var v=this.list[i];
            if(this.$route.name==v.column){
              if(i>this.showMaxIndex){
                _t=i;
              }else{
                this.index=i;
              }
              break;
            }
          }

          if(_t!=null){
             var _v= this.list[_t];

            if(_v.inx<this.showMaxIndex){
              var _f = this.list.splice(_t, this.list.length-_t);
              for(var k=_f.length-1;k>=0;k--){
                this.list.splice(0,0,_f[k]);
              }
              this.index=0;
            }else{
              var _step=_v.inx-this.showMaxIndex-this.list[0].inx;
              var _f=this.list.splice(0, _step);
              console.log(_f,_step,_t)
              _f.forEach((v,i)=>{
                this.list.push(v);
              });
              this.index=this.showMaxIndex;
            }

          }
          this.cb();
          this.reback=false;
        }
        this.$emit("route-eve");
      },
      kback(){
         this.reback=true;
      }
    },
    methods: {
      url2inx(){
        if(!this.$route.query.minit){
         /* var i=this.col2inx[this.$route.name];
          if(!isNaN(i)&&Number(i)!=this.index){
            console.log("hdNav.vue..........",this.$route.name,i);
            this.index=i;
            if(!this.isInit){
              this.cb();
            }
          }*/
          this.list.forEach((v,i)=>{
              if(this.$route.name==v.column){
               this.index=i;

                if(!this.isInit){
                  //this.recover();
                  this.cb();
                }
              }
          });
        }
      },
      load(){
        var _vue = this;
        if (this.$store.state.columns) {
          this.$store.state.columns.hd.forEach(function (v, i) {
             v.inx = i;

            _vue.list.push(v);
          });
          this.url2inx();
          this.recover();
          this.cb();
        }
      },
      recover(){
        if (this.index > this.showMaxIndex) {
          var _m = this.index - this.showMaxIndex;

          var _f = this.list;

          var _v = _f.splice(0, _m);
          _v.forEach(function (_t) {
            _f.push(_t);
          });
          this.index = this.showMaxIndex;
        }
        this.isInit=false;
      },
      left(){

        if (this.list[this.index].inx == 0) {
          return false;
        } else if (this.index == 0) {
          var _t = this.list;
          var _f = _t.pop();
          _t.splice(0, 0, _f);
        } else {
          this.index -= 1;
        }
        var _column = this.list[this.index].column;
        this.cb();
        this.push({path: "/hd/" + _column});



      },
      right(){
        console.log("aaaaaaaaaaaa",this.index,this.list[this.index].inx,this.list.length)
        if (this.list[this.index].inx ==(this.list.length-1) ) {
          return false;
        } else if (this.index == this.showMaxIndex) {
          var _t = this.list;
          var _v = _t.splice(0, 1);
          _t.push(_v[0]);
        } else {
          this.index++;
        }
        var _column = this.list[this.index].column;
        this.cb();
        this.push({path: "/hd/" + _column});


      },
      down(){
        this.$emit("switch",KEY.DOWN,"nav" )
      },
      cb(){
        var _m = this.list[this.index];
        this.$emit("cb", _m.inx, _m)
      }
    },
    computed: {
      mleft: function () {
        return {left: this.focus};
      }
      ,
      mright: function () {
        return {right: this.focus};
      }
    }
  }
</script>

<style scoped>

  .nav {
    position: absolute;
    left: 65px;
    top: 58px;
    width: 1215px;

  }

  .nav .ico {
    width: 26px;
    height: 35px;
    float: left;

  }

  .leftIco {
    background: url("../../assets/img/hd/left.png") center no-repeat;
  }

  .rightIco {
    background: url("../../assets/img/hd/right.png") center no-repeat;
  }

  .nav .menuFocusbg {
    position: absolute;
    width: 148px;
    height: 56px;
    left: 140px;
    background-image: url("../../assets/img/public/menufocus.png");
  }

  .menu {
    float: left;
    list-style: none;
    width: 1089px;
    height: 40px;
    overflow: hidden;
    font-size: 23px;
    text-align: center;
  }

  .menu li {
    float: left;
    width: 121px;
    height: 35px;
    line-height: 35px;
  }

  .lost {
    color: #dc8c0a;
  }

  .focus {
    color: #029ce4;
    font-size: 27px;
  }

</style>
