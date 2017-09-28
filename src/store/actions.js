import   {
  FEATURES,
  EPISODE,
  INFO,
  DEFAULT,
  RECOMMEND

} from '../store/mutation-types'
import Vue from 'vue'
export  default {
  req(_context, _args){
      var _uri = DEFAULT;
      switch (_args.type) {
        case   FEATURES:
        case   EPISODE:
        case   INFO:
        case   RECOMMEND:
          _uri = _args.type;
          break;
        default:
          //console.warn("store/actions.js req method  type is not found")
          break

      }
      Vue.http.get(_uri, {params: _args.params || {}}).then(res => {

        if (_args.cb) {

          _args.cb( res.data.status=="200"?"success":"error", res.data);

        }
      }, res => {
        if (_args.cb) {
          _args.cb("error", res.data);
        }
      });

  },

}
