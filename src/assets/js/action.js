(function (v) {
  v.KEY={ UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ENTER: 13,
    PAGEUP: 33,
    PAGEDOWN: 34,
    //后退-
    BACK: 8,
    //退出+
    EXIT: 187,
    NUMBER0: 48,
    NUMBER1: 49,
    NUMBER2: 50,
    NUMBER3: 51,
    NUMBER4: 52,
    NUMBER5: 53,
    NUMBER6: 54,
    NUMBER7: 55,
    NUMBER8: 56,
    NUMBER9: 57,
    //音量>
    VOLUMNUP: 190,
    //音量减<
    VOLUMNDOWN: 188,
    STOP: 48,//stop
    STOPPOINT: 68,//stop
    //静音：?
    VOLUMNNO: 191,
    F1: 112, //A  65
    F2: 113, //B  66
    F3: 114, //C  67
    F4: 115,  //D 68
    INFO: 73,  //I    通过v.html点出来是0
    MENU:72    //F3
    };
    v.keyAction={
    actions: {
      "all": {
        "all" : []
      }
    },
    oldFocus:"",
    focus: "",
    isLock:false,
    befEve:function (_k) {},
    aftEve:function (_k) {},
    init: function() {
      document.onkeydown = keyEvent;
      //document.onsystemevent = keyEvent;
      var _self=this;
      function keyEvent() {
        var event = arguments[0] || window.event;
        var keyCode = event.which || event.keyCode;
        //var keyCode = event.keyCode;
        //调用keyAction

        _self.befEve(keyCode);

         _self.done(keyCode);

        _self.aftEve(keyCode);
      }

    },
    done: function(keyCode, callback) {
      var actions = this.actions;
      if (actions[keyCode]) {

        if(!this.isLock){
          this.runAction(actions[keyCode][this.focus], keyCode);
        }
        this.runAction(actions[keyCode]["all"], keyCode);

      }

      if (actions["all"]) {
        this.runAction(actions["all"][this.focus], keyCode);
        this.runAction(actions["all"]["all"], keyCode);
      }
      (typeof callback == 'function') && (callback(keyCode));
    },
    runAction: function(actions, keyCode){
      if(!actions) return;
      for (var i = 0, im = actions.length; i < im; i++) {
        actions[i].call(this, keyCode);
      }
    },
    add: function(fun, keyCode, focus) {

      if (typeof fun != "function") return;
      var type = typeof keyCode;
      if (type == 'string' || type == 'number') {
        keyCode = [keyCode];
      } else {
        keyCode = keyCode || ["all"];
      }
      focus = focus || "all";

      for (var i in keyCode) {
        !(this.actions[keyCode[i]]) && (this.actions[keyCode[i]] = {});
        (typeof this.actions[keyCode[i]][focus] == "undefined") && (this.actions[keyCode[i]][focus] = []);
        this.actions[keyCode[i]][focus].push(fun);
      }

    },
    remove: function(key) {
      if(key&&this.actions[key]){
        delete this.actions[key]
      }else{
        var _k=Object.keys(this.actions);
        for(var i in _k){
          if(_k[i]!="all"){
            delete  this.actions[_k[i]];
          }
        }
      }

      var _self=this;

      [KEY.PAGEDOWN,KEY.PAGEUP,KEY.BACK,KEY.EXIT].forEach(function (v) {
        delete _self.actions[v];
      })


      this.befEve=function (k) { }
      this.aftEve=function (k) { }
    }
  }
  v.keyAction.init();
})(window)




