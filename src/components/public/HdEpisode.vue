<template>
  <div class="bg" v-if="focus">
    <ul class="list">
      <li :class="{'focus':focus&&i==index}" v-for="(v,i) in items">第{{v.chapter}}集</li>
    </ul>
  </div>
</template>

<script>

  import Service from '../../service'
  export default {
    props: ['focus', 'eindex', 'id', 'epage'],
    data(){
      return {items: [], index: -1, page: 1, totalPage: 1,maxEpi:0}
    },
    created(){
      console.log("hdepisode nav.created................")
    },
    mounted(){
      this.index = this.eindex;
      this.page = this.epage;


    },
    destoryed(){
      console.log("nav.destoryed................")
    },
    watch: {
      focus(n, o){
        if (n) {
          this.load();
        }
      },
      index(n, o){
        this.cb();
      }
    },

    methods: {
      load(){
        Service.epiList({id: this.id, pageNum: this.page, pageSize: 18}, (s, v) => {
          if (s == "success") {
            var _f = this.items;
            if (_f.length != 0) {
              _f.splice(0, _f.length);
            }
            this.maxEpi=0;
            this.totalPage = Number(v.pageInfo.totalPage);

            this.maxEpi=Number(v.pageInfo.totalNum); //获取最大集数,只有选集那个按钮才能触发，使maxEpi不为0

            v.response.forEach((_i) => {
              _f.push(_i);
            });
            this.cb();

          }
        });

      },
      cb(){
        if (this.items.length > 0 && this.index != -1) {
          this.$emit("cb",  this.index,this.items[this.index],this.page,this.maxEpi);
        }
      },
      left(){
        this.index = (this.index != 0 ? --this.index : this.items.length - 1)
      },
      right(){
        this.index = (this.index != this.items.length - 1 ? ++this.index : 0)
      },
      up(){
        if (this.index - 9 >= 0) {
          this.index -= 9;
        } else if (this.page > 1 && this.index - 9 < 0) {
          this.pageUp();
        }else{
          this.$emit("switch",KEY.UP,"epi");
        }
      },
      down(){
        if (this.index + 9 <= this.items.length - 1) {
          this.index += 9;
        } else if (this.page < this.totalPage && this.index + 9 > this.items.length - 1) {
          this.pageDown();
        }
      },
      pageUp(){
        if (this.page > 1) {
          this.page--;
          this.index = 0;
          this.load();
        }
      },
      pageDown(){
        if (this.page < this.totalPage) {
          this.page++;
          this.index = 0;
          this.load();
        }
      }
    },
    computed: {}
  }
</script>

<style scoped>
  *{
    -webkit-transition-duration: 0ms;
    transition-duration:0ms;
  }
  .bg {

    width: 1280px;
    height: 270px;
    /* background: url(../../assets/img/hd/episodes_bg.png);*/
    background-color: #060608;
    opacity: 0.8;

  }

  .list {
    position: absolute;
    left: 100px;
    top: 55px;
    width: 1100px;
    height: 152px;
    color: #958c96;
    font-size: 26px;
    line-height: 60px;
    text-align: center;

  }

  .list li {
    width: 120px;
    height: 61px;
    margin-bottom: 20px;
    float: left;
    border: 1px #999 solid;

  }

  .focus {
    background-color: #00a0e9;
    color: #fff;
  }
</style>
