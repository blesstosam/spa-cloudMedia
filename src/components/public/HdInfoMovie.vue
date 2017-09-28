<template>
  <div>
    <HdRec class="rec" v-bind="{'focus':rfocus,'rindex':rindex,'id':id}" @cb="rcb" @switch="eswitch"></HdRec>
    <HdEpi class="epi" v-bind="{'focus':efocus,'id':id,'eindex':eindex,'epage':epage}" @cb="ecb"
           @switch="eswitch"></HdEpi>
  </div>
</template>

<script>
  import HdRec from './HdRecList.vue' ;
  import HdEpi from './HdEpisode.vue' ;
  import Service from  '../../service'
  //switch event 级件之间切换焦点事件
  export default {

    name: '',
    props: ['id','action','index','page'],
    data () {
      return {

        ritem: {},
        eitem: {},
        rindex: 0,
        eindex: 0,
        epage: 1,
        maxEpi:0,
      }
    },
    computed: {
      rfocus(){
        return this.action == "rec";
      },
      efocus(){
        return this.action == "epi";
      }
    },

    mounted: function () {
/*      window.setTimeout(() => {
        this.action = "epi"
      }, 3000);*/


      switch (this.action){
        case"epi":
            this.eindex=this.index;
            this.epage=this.page;
            break
        case "rec":
            this.rindex=this.index;
            break
      }
    },
    methods: {
      rcb(_inx, _ritem){
        this.rindex = _inx;
        this.ritem = _ritem;
        this.cb();
      },
      ecb(_inx, _item,_page,_maxEpi){
        this.eindex = _inx;
        this.eitem = _item;
        this.epage=_page;
        this.maxEpi=_maxEpi;  //最大集数
        this.cb();
      },

      eswitch(_kcode,_f){
        if (_kcode == KEY.UP) {
          this.$emit("switch", _kcode,_f)
        }

      },
      left(){
        switch (this.action) {
          case "rec":
            this.$children[0].left();
            break
          case "epi":
            this.$children[1].left();
              break
        }
      },
      right(){
        switch (this.action) {
          case "rec":

            this.$children[0].right();
            break
          case "epi":
            this.$children[1].right();
            break
        }
      },
      up(){
        switch (this.action) {
          case "epi":
            this.$children[1].up();
            break
          case "rec":
              this.$emit("switch", KEY.UP,"rec")
              break
        }
      },
      down(){
        switch (this.action) {
          case "epi":
            this.$children[1].down();
            break
        }
      },
      pageUp(){
        switch (this.action) {
          case "epi":
            this.$children[1].pageUp();
            break
        }
      },
      pageDown(){
        switch (this.action) {
          case "epi":
            this.$children[1].pageDown();
            break
        }
      },
      cb(){
        switch (this.action) {
          case "epi":
            this.$emit("cb", this.eindex, this.eitem,this.epage,this.maxEpi);
            break
          case "rec":
              console.log('hdinfo..');
            this.$emit("cb", this.rindex, this.ritem,1);
            break
        }
      }
    },

    components: {HdRec, HdEpi}

  }

</script>
<style scoped>
  .rec {
    position: absolute;
    left: 100px;
    top: 505px;
  }

  .epi {
    position: absolute;
    left: 0px;
    top: 450px;
  }
</style>
