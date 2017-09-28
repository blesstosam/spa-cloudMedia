<template>
    <div class="Alert" v-show="showFlag">
        <div class="toast">{{msg}}</div>
        <div class="enter" :class="{selected:index==0}">确认</div>
        <!--<div class="cancel" :class="{selected:index==1}">取消</div>-->
    </div>
</template>

<script>

export default {
    name: 'Alert',
    props: {
        msg: {
            msg: String,
            default: '我是alert'
        }
    },
    data() {
        return {
            showFlag: false,
            index:0
        }
    },
    created() {

    },
    methods: {
        show() {
            this.showFlag = true;
            keyAction.oldFocus = keyAction.focus;
            this.action = keyAction.focus = 'ALERT';
            if (!keyAction.actions[KEY.ENTER]['ALERT']) {
                this.pageEve();
            }
        },
        hide() {
            keyAction.focus = keyAction.oldFocus;
            this.index = 0;
            this.showFlag = false;
        },
        pageEve(){
            keyAction.add(() => {
                this.$emit('enter');
                setTimeout(() => {
                    this.hide();
                }, 50)
            }, KEY.ENTER, 'ALERT');
            keyAction.add(() => {
                setTimeout(() => {
                    this.hide();
                }, 50)
            }, KEY.BACK, 'ALERT');
        }
    }
}
</script>

<style scoped>
    .Alert{
        background: url('../../assets/img/toast_bg.png') no-repeat;
        position: absolute;
        width: 650px;
        height: 397px;
        left:33%;
        top:20%;
        z-index: 99;
    }
    .selected{
        background-color: yellow !important;
    }
    .toast{
        position: absolute;
        left: 10px;
        top: 30px;
        margin: 20px;
        font-size:30px;
        color:white;
        font-weight: bold;
    }
    .enter,.cancel{
        position: absolute;
        top:330px;
        background-color: #d1d1d1;
        width:140px;
        height:50px;
        color:black;
        font-size:26px;
        font-weight: bold;
        border-radius:10px;
        line-height:50px;
        text-align: center;
    }
    .enter{
        left:260px;
    }
    .cancel{
        left:350px;
    }

</style>

