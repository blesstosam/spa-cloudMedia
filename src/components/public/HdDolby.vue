<template>
  <div class="dolby">
    <div v-for="(p, i) in items" :class="'p-'+i">
      <div class="poster"></div>
      <div class="mask" v-if="focus && index == i">
        {{p.title}}
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'HdDolby',
    props: ['focus','lindex'],
    data () {
      return {
        index: 0,
        items: [
          {
            id: "577033",
            title: '环绕立体声影厅',
          },
          {
            id: "577048",
            title: '美国杜比实验室',
          },
          {
            id: "577451",
            title: '杜比好声音',
          },
          {
            id: "577049",
            title: '音乐会',
          }

        ]

      }
    },
    watch:{
      index(){
          this.cb();
      }
    },
    mounted(){
      this.index=Number(this.lindex||0) ;
      this.cb();
    },
    methods: {

      left(){
        if (this.index > 0) {
          this.index = 0;
        }
      },
      right(){

        if (this.index == 0) {
          this.index++;
        }
      },
      up(){

        if (this.index< 2) {
          this.$emit("switch",KEY.UP,"dolby");
        }else if (this.index > 0) {
          this.index--;
        }
      },

      down(){
        if (this.index <this.items.length-1) {
          this.index++;
        }
      },
      cb(){
        this.$emit("cb", this.index, 1, this.items[this.index], 0);
      }

    }
  }
</script>
<style scoped>

  .dolby > div {
    position: absolute;
    overflow: hidden;
  }

  .p-0 {
    width: 490px;
    height: 510px;
    top: 140px;
    left: 100px;
  }

  .p-0 .poster {
    background: url('../../assets/poster/dolby_poster1.jpg') no-repeat;
    background-size: 100%;
    height: 100%;
  }

  .p-1 {
    width: 490px;
    height: 156px;
    left: 650px;
    top: 140px;
  }

  .p-1 .poster {
    background: url('../../assets/poster/dolby_poster2.jpg') no-repeat;
    background-size: 100%;
    height: 100%;
  }

  .p-2 {
    width: 490px;
    height: 156px;
    left: 652px;
    top: 318px;
  }

  .p-2 .poster {
    background: url('../../assets/poster/dolby_poster3.jpg') no-repeat;
    background-size: 100%;
    height: 100%;
  }

  .p-3 {
    width: 490px;
    height: 156px;
    left: 650px;
    top: 495px;
  }

  .p-3 .poster {
    background: url('../../assets/poster/dolby_poster4.jpg') no-repeat;
    background-size: 100%;
    height: 100%;
  }

  .mask {
    color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(23, 93, 227, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
    z-index: 100;
    font-size: 40px;
  }


</style>
