export  default {
  upstate(_s, v){
    if (v) {
       var _ks=Object.keys(v)  ;
       _ks.forEach(function (k,i) {

        if (_s[k]) {
          switch (typeof(_s[k])) {
            case "object":
              if(v[k] instanceof Array){
                for (var k2 in v[k]) {
                    if(k2==0){  _s[k].splice(0,_s[k].length)}
                    _s[k].push(v[k][k2]);
                 }
              }else{

                 var _ks2=Object.keys(v[k]);
                console.log(k,v[k])
                _ks2.forEach(function (k2) {
                  _s[k][k2]=v[k][k2];
                  console.log(k,v[k],k2, _s[k][k2])
                })
              }
              break
            default:
              _s[k] = v[k];
              break
          }
        }

       })


    }
  },
  streamData(_s, data) {
    if(data) {
       _s.streamData = data;
    }
  },
  lastHistory(_s, history) {
    if(history) {
      _s.lastHistory = history;
    }
  },
  upmenus(_s){

    var _v = _s.columns[_s.column];
    var _f = [];
    _v.forEach(function (v, i) {
       v.inx=i;
      _f.push(v);
    })
    _s.menus = _f;


  },
  chistory(_s, v){
    if (v) {
      _s.chistory.push(v);

    }else{
      _s.chistory.pop();
    }

    let _link = window.location.href;
    //_s.msg+= ('---link:'+_link + '---history:'+JSON.stringify(_s.chistory))
    try{ entrix.history({chistory:  _s.chistory, link: _link}); }catch(e){ }
  },
  debug(_s,str){
    if(str){
      _s.msg+=str;
    }
  },
  debug2(_s,str){
    if(str){
        _s.msg=str;
    }
  },

  feature(_s, str) {
    if (str) {
        _s.featureName = str;
    }
  },

  //保存新闻图片
  saveNewsPic(_s, str) {
      if (str) {
          _s.newsPic = str;
      }
  },

    //保存综艺，体育，文化，生活专题图片
    saveFeaturePic(_s, str) {
        if (str) {
            _s.featurePic = str;
        }
    }


}
