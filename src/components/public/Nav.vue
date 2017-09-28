<template>
    <div class="navTmpl">
        <div  class="mleft"  v-show="focus"></div>
        <div  class="mright" v-show="focus"></div>
        <div class="focus"></div>
        <div id="menu">
            <ul>
                <li class="item" v-for="item in list">
                    {{item.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>



export default {
        props:['focus','index','ctype'],
        data(){
           return {}
        },
        created(){
          console.log("nav.created................")
        },
        mounted(){
          this.load();
        } ,
        destoryed(){
          console.log("nav.destoryed................")
        },
        watch:{
           list(val,oval){
             this.callback();
           }

        },
        methods: {
            load(){

               this.recover();
               this.callback();

            },
            recover(){
              if(this.index!=0 && this.index<this.list.length){
                var _f=this.list;
                var _v=_f.splice(0,this.index);
                _v.forEach(function (_t) {
                  _f.push(_t);
                })
              }

            },
            left(){
              var _t=this.list;
              var _f= _t.pop();
              _t.splice(0,0,_f);
            },
            right(){
              var _t=this.list;
              var _v=_t.splice(0,1);
              _t.push(_v[0]);
            },
            down(){
             this.$emit("switch",KEY.DOWN,"MENU");
            },

            callback(){
              var _t=this.list[0];
              this.$emit("cb",_t);
            }

        },
        computed:{
          list() {
            return this.$store.state.menus;
          }
        }
    }
</script>

<style scoped>
    /*nav部分*/
    .hide{
      display:none;}
     .mleft {
        width: 50px;
        height: 48px;
        background-image: url("../../assets/img/public/to_left.png");
        position: absolute;
        left: 85px;
        top: 105px;
    }
     .mright {
        width: 50px;
        height: 48px;
        background-image: url("../../assets/img/public/to_right.png");
        position: absolute;
        left: 1020px;
        top: 105px;
    }
     .focus {
        position: absolute;
        width: 148px;
        height: 56px;
        left: 140px;
        top: 103px;
        background-image: url("../../assets/img/public/menufocus.png");
    }
    #menu {
        width: 888px;
        height: 50px;
        position: relative;
        left: 139px;
        top: 105px;
        overflow: hidden;
    }
    #menu ul {
        width: 1900px;
        height: 50px;
        position: absolute;
    }
    #menu ul li {
        float: left;
        width: 148px;
        height: 50px;
        color: white;
        font-size: 26px;
        text-align: center;
        line-height: 50px;
        font-weight: bold;
    }

    /*动态样式*/
    #menu ul li:nth-child(1) {
        color: black;
    }
</style>
