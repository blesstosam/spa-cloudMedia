<template>
  <ul class="list">
    <template  v-for="(v, i) in list">
    <li :class="action|focusCss(i,aindex)">
      {{v.name}}
    </li>
    </template>
  </ul>
</template>
<script>
  import Service from '../../service'
  export default {
    name: '',
    desc: 'hd-arts',
    props: ["id", 'action','index','page'],
    data () {
      return {
        list: [],
        apage:1,
        aindex: 0
      }
    },
    mounted: function () {
      this.aindex = this.index||0;
      this.apage=this.page||1;
      this.load();
    },
    filters:{
       focusCss(v1,v2,v3){
         return {'focus':v1=="arts"&&v2==v3}
       }
    },
    watch:{
      aindex(){
        this.cb();
      }
    },
    methods: {
      load(){
        //var _cid=this.id.split("_")[0];
        Service.videoList(null,{categoryId:this.id,pageSize:6,pageNum:this.apage},(s,v)=>{
            if(s=="success"){
              v.response.forEach((v,i)=>{
                  this.list.push(v)
              });
              this.cb();
            }
        });
      },
      left(){
        this.aindex = (this.aindex > 0 ? --this.aindex : this.list.length - 1)
      },
      right(){
        this.aindex = (this.aindex < this.list.length - 1 ? ++this.aindex : 0);
      },
      up(){
        if(this.aindex<3){
          this.$emit("switch", KEY.UP, "arts");
        }else{
          this.aindex-=3;
        }
      },
      down(){
        if(this.aindex+3<=this.list.length-1){
          this.aindex+=3;
        }
      },
      cb(){
        this.$emit("cb", this.aindex, this.list[this.aindex],1);
      }
    },

    components: {}

  }

</script>
<style scoped>
  .list {
    position: absolute;
    left: 80px;
    top: 440px;
    width: 1130px;

  }

  .list li {
    width: 348px;
    height: 100px;
    border:2px solid rgb(85, 85, 85) ;
    margin:5px;
    padding-left:5px;
    padding-top:5px;
    float:left;
  }

  .focus {
    color:#fff;
    background-color: rgba(23, 93, 227, 0.3);
  }

  .name {
    margin-top: 40px;
  }
</style>
