
window.poster=function(name,flag) {
  var DATA_PREFIX="/vpg";
  var s=null;
  name=name.replace("posters/","");
  switch (flag){
    case "BIG":
      s=DATA_PREFIX+"/images/posters/bigposter/"+name;
      break;
    case "SMALL":
      s=DATA_PREFIX+"/images/posters/small/"+name;
      break;
    case "HD":
      s=DATA_PREFIX+"/images/posters/chaoqing/"+name;
      break;
    case "HD_BIG":
      s=DATA_PREFIX+"/images/posters/chaoqing/bigposter/"+name;
      break;
    case "CEP":
      s=DATA_PREFIX+"/images/posters/cepposter/"+name;
      break;
    case "HD_HUNPAI":
      s=DATA_PREFIX+"/images/posters/hd_tuwenhunpai/"+name;
      break;
    case "EDUCATE":
      s=DATA_PREFIX+"/images/posters/educate/"+name;
      break;
    case "REC":
      s=DATA_PREFIX+"/images/posters/recommend/"+name;
      break;
    case "CHAOQING":
      s=DATA_PREFIX+"/images/posters/chaoqing/"+name;
      break;
    case "SOFA_B":
        s=DATA_PREFIX+"/images/posters/chaoqing/sofa/bigposters/"+name;
        break;
    case "SOFA_V":
        s=DATA_PREFIX+"/images/posters/chaoqing/sofa/vposters/"+name;
        break;
    case "SOFA_H":
        s=DATA_PREFIX+"/images/posters/chaoqing/sofa/hposters/"+name;
        break;
    case "HD_REC":
        s=DATA_PREFIX+"/images/posters/cepimg/"+name;
    break;
    default:
      s=DATA_PREFIX+"/images/posters/"+name;
      break;
  }

  return s;
}
window.getParam=function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r=window.location.search.substr(1).replace(new RegExp(/(amp;)/g),'').match(reg);
    if (r != null) {
        return r[2];
    }
    return null;
};

window.getVueParam=function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var _search = window.location.href.substr(window.location.href.indexOf('?'));
    var r=_search.substr(1).replace(new RegExp(/(amp;)/g),'').match(reg);
    if (r != null) {
        return r[2];
    }
    return null;
};

window.cutStr=function(str, len, replaceSymbol) {
  if (!str || !len) {
    return '';
  }
  var a = 0;
  var i = 0;
  var temp = '';
  for (i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      a += 2;
    } else {
      a++;
    }
    if (a > len) {
      return temp + (replaceSymbol||"...");
    }
    temp += str.charAt(i);
  }
  return str;
};
window.genres=function (k) {
  var v={"movie-action":"动作","movie-adventure":"科幻","movie-comedy":"喜剧","movie-horror":"惊悚","movie-romance":"爱情","movie-war":"战争","movie-adult":"成人","movie-children":"少儿","movie-classic":"经典","movie-drama":"戏剧","movie-foreign":"外语","movie-western":"西部","movie-reminiscence":"怀旧","movie-anti-spy":"反特","movie-horror":"恐怖","movie-tragedy":"灾难","movie-cliffhang":"悬疑","movie-history":"历史","movie-ethic":"生活伦理","movie-detective":"刑侦","movie-series":"系列","movie-romance":"情感","movie-documentary":"纪实","movie-crime":"犯罪","movie-fantasy":"奇幻","series-family":"家庭","series-anti-spy":"谍战","series-ancient costume":"古装","series-romance":"偶像","series-war":"战争","series-idol":"偶像剧","series-comedy":"喜剧","series-family":"生活","series-children":"少儿","series-history":"历史","series-chinese revolution":"革命历史","series-city":"都市生活","series-conutryside":"农村生活","series-famous Literary work":"文学名著改编","series-drama":"戏曲","series-secret history":"戏剧秘史","series-military":"战争军事","series-detective":"刑侦","series-wuxia":"武侠","series-mythology":"神话","series-crime":"警匪","series-main stream":"主旋律"};
  var _r=v[k];
  return _r&&_r!=""?_r:"其它";
};
window.region=function (k) {
  var v={"1":"大陆","3":"欧美","4":"日韩","2":"港澳台","5":"东南亚"};
  var _r=v[k];

  return _r&&_r!=""?_r:"其它";
};
window.toHexStr=function(str) {
  var hexstr = "";
  var byteCount = 0;
  for (var i = 0; i < str.length; i++) {
    byteCount = str.charCodeAt(i);
    if (byteCount.length == 1) {
      byteCount = "0" + byteCount;
    }
    byteCount = byteCount.toString(16).toUpperCase();
    hexstr += byteCount;
  }
  return hexstr;
};
window.startVod=function (_id,_name,_point) {
  if(_id&&_id!=""){
    var _aid=_id.indexOf("_")!=-1?_id.split("_")[1]:_id;

    var _v=toHexStr(_aid)+":normal";
    var _n=_name.substring(0, 10);
    entrix.startVOD({
      confirm_movieassetid:_v,
      num:_point||0,
      confirm_moviename: _n,
      assetid:_id

    })
  }
};


