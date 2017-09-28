//This keyCode is not mapping to WebKey Event KeyCode
window.cs ={};

(function(){

  cs.VkKeymap = {
    N1 : 2,
    N2 : 3,
    N3 : 4,
    N4 : 5,
    N5 : 6,
    N6 : 7,
    N7 : 8,
    N8 : 9,
    N9 : 10,
    N0 : 11,
    DEL : 83,
    '#': 13,
    /*
     '*': 46,
     */
    BACK_SPACE : 14, // CS
    PRECH : null,
    VOL_UP : 75,
    VOL_DOWN : 72,
    MUTE : null,
    CH_UP : 105,
    CH_DOWN : 99,
    TOOLS : null,
    ENTER : 28,
    RETURN : 27,
    INFO : null,
    UP : 72,
    DOWN : 80,
    LEFT : 75,
    RIGHT : 77,
    RED : 59,
    GREEN : 60,
    YELLOW : 61,
    BLUE : 62,
    RW : 188,
    FF : 190,
    FAV : 70 //KeyBoard F
  };

})();




/**
 * Webapp/STB/Cloud Streaming Server간 통신 API<br><br>
 * cs.sendMssageToCSS / cs.receiveMessageFromCSS 메소드를 이용하여 데이터를 주고 받음.
 *
 * @namespace Communicator
 * @see cs.sendMssageToCSS
 * @see cs.receiveMessageFromCSS
 * @example
 * cs.sendMssageToCSS({
  		type : 'response',
  		command : 'StartApp',
  		data : {'appversion':'v1.0'}
  	});
 *
 * cs.receiveMessageFromCSS({
		command : 'StartApp',
		request : function(data){
		  	cs.sendMssageToCSS({
		  		type : 'response',
		  		command : 'StartApp',
		  		data : {'appversion':'v1.0'}
		  	});
		}
	});
 */



(function(v){

	var x2js, callbacks = {}, version = '1.0';

	function X2JS(v){var q="1.1.5";v=v||{};h();r();function h(){if(v.escapeMode===undefined){v.escapeMode=true;}v.attributePrefix=v.attributePrefix||"_";v.arrayAccessForm=v.arrayAccessForm||"none";v.emptyNodeForm=v.emptyNodeForm||"text";if(v.enableToStringFunc===undefined){v.enableToStringFunc=true;}v.arrayAccessFormPaths=v.arrayAccessFormPaths||[];if(v.skipEmptyTextNodesForObj===undefined){v.skipEmptyTextNodesForObj=true;}if(v.stripWhitespaces===undefined){v.stripWhitespaces=true;}v.datetimeAccessFormPaths=v.datetimeAccessFormPaths||[];}var g={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};function r(){function x(z){var y=String(z);if(y.length===1){y="0"+y;}return y;}if(typeof String.prototype.trim!=="function"){String.prototype.trim=function(){return this.replace(/^\s+|^\n+|(\s|\n)+$/g,"");};}if(typeof Date.prototype.toISOString!=="function"){Date.prototype.toISOString=function(){return this.getUTCFullYear()+"-"+x(this.getUTCMonth()+1)+"-"+x(this.getUTCDate())+"T"+x(this.getUTCHours())+":"+x(this.getUTCMinutes())+":"+x(this.getUTCSeconds())+"."+String((this.getUTCMilliseconds()/1000).toFixed(3)).slice(2,5)+"Z";};}}function t(x){var y=x.localName;if(y==null){y=x.baseName;}if(y==null||y==""){y=x.nodeName;}return y;}function o(x){return x.prefix;}function p(x){if(typeof(x)=="string"){return x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;");}else{return x;}}function j(x){return x.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#x2F;/g,"/");}function l(B,y,A){switch(v.arrayAccessForm){case"property":if(!(B[y] instanceof Array)){B[y+"_asArray"]=[B[y]];}else{B[y+"_asArray"]=B[y];}break;}if(!(B[y] instanceof Array)&&v.arrayAccessFormPaths.length>0){var x=0;for(;x<v.arrayAccessFormPaths.length;x++){var z=v.arrayAccessFormPaths[x];if(typeof z==="string"){if(z==A){break;}}else{if(z instanceof RegExp){if(z.test(A)){break;}}else{if(typeof z==="function"){if(z(B,y,A)){break;}}}}}if(x!=v.arrayAccessFormPaths.length){B[y]=[B[y]];}}}function a(C){var A=C.split(/[-T:+Z]/g);var B=new Date(A[0],A[1]-1,A[2]);var z=A[5].split(".");B.setHours(A[3],A[4],z[0]);if(z.length>1){B.setMilliseconds(z[1]);}if(A[6]&&A[7]){var y=A[6]*60+Number(A[7]);var x=/\d\d-\d\d:\d\d$/.test(C)?"-":"+";y=0+(x=="-"?-1*y:y);B.setMinutes(B.getMinutes()-y-B.getTimezoneOffset());}else{if(C.indexOf("Z",C.length-1)!==-1){B=new Date(Date.UTC(B.getFullYear(),B.getMonth(),B.getDate(),B.getHours(),B.getMinutes(),B.getSeconds(),B.getMilliseconds()));}}return B;}function n(A,y,z){if(v.datetimeAccessFormPaths.length>0){var B=z.split(".#")[0];var x=0;for(;x<v.datetimeAccessFormPaths.length;x++){var C=v.datetimeAccessFormPaths[x];if(typeof C==="string"){if(C==B){break;}}else{if(C instanceof RegExp){if(C.test(B)){break;}}else{if(typeof C==="function"){if(C(obj,y,B)){break;}}}}}if(x!=v.datetimeAccessFormPaths.length){return a(A);}else{return A;}}else{return A;}}function w(z,E){if(z.nodeType==g.DOCUMENT_NODE){var F=new Object;var x=z.childNodes;for(var G=0;G<x.length;G++){var y=x.item(G);if(y.nodeType==g.ELEMENT_NODE){var D=t(y);F[D]=w(y,D);}}return F;}else{if(z.nodeType==g.ELEMENT_NODE){var F=new Object;F.__cnt=0;var x=z.childNodes;for(var G=0;G<x.length;G++){var y=x.item(G);var D=t(y);if(y.nodeType!=g.COMMENT_NODE){F.__cnt++;if(F[D]==null){F[D]=w(y,E+"."+D);l(F,D,E+"."+D);}else{if(F[D]!=null){if(!(F[D] instanceof Array)){F[D]=[F[D]];l(F,D,E+"."+D);}}(F[D])[F[D].length]=w(y,E+"."+D);}}}for(var A=0;A<z.attributes.length;A++){var B=z.attributes.item(A);F.__cnt++;F[v.attributePrefix+B.name]=B.value;}var C=o(z);if(C!=null&&C!=""){F.__cnt++;F.__prefix=C;}if(F["#text"]!=null){F.__text=F["#text"];if(F.__text instanceof Array){F.__text=F.__text.join("\n");}if(v.escapeMode){F.__text=j(F.__text);}if(v.stripWhitespaces){F.__text=F.__text.trim();}delete F["#text"];if(v.arrayAccessForm=="property"){delete F["#text_asArray"];}F.__text=n(F.__text,D,E+"."+D);}if(F["#cdata-section"]!=null){F.__cdata=F["#cdata-section"];delete F["#cdata-section"];if(v.arrayAccessForm=="property"){delete F["#cdata-section_asArray"];}}if(F.__cnt==1&&F.__text!=null){F=F.__text;}else{if(F.__cnt==0&&v.emptyNodeForm=="text"){F="";}else{if(F.__cnt>1&&F.__text!=null&&v.skipEmptyTextNodesForObj){if((v.stripWhitespaces&&F.__text=="")||(F.__text.trim()=="")){delete F.__text;}}}}delete F.__cnt;if(v.enableToStringFunc&&(F.__text!=null||F.__cdata!=null)){F.toString=function(){return(this.__text!=null?this.__text:"")+(this.__cdata!=null?this.__cdata:"");};}return F;}else{if(z.nodeType==g.TEXT_NODE||z.nodeType==g.CDATA_SECTION_NODE){return z.nodeValue;}}}}function m(E,B,D,y){var A="<"+((E!=null&&E.__prefix!=null)?(E.__prefix+":"):"")+B;if(D!=null){for(var C=0;C<D.length;C++){var z=D[C];var x=E[z];if(v.escapeMode){x=p(x);}A+=" "+z.substr(v.attributePrefix.length)+"='"+x+"'";}}if(!y){A+=">";}else{A+="/>";}return A;}function i(y,x){return"</"+(y.__prefix!=null?(y.__prefix+":"):"")+x+">";}function s(y,x){return y.indexOf(x,y.length-x.length)!==-1;}function u(y,x){if((v.arrayAccessForm=="property"&&s(x.toString(),("_asArray")))||x.toString().indexOf(v.attributePrefix)==0||x.toString().indexOf("__")==0||(y[x] instanceof Function)){return true;}else{return false;}}function k(z){var y=0;if(z instanceof Object){for(var x in z){if(u(z,x)){continue;}y++;}}return y;}function b(z){var y=[];if(z instanceof Object){for(var x in z){if(x.toString().indexOf("__")==-1&&x.toString().indexOf(v.attributePrefix)==0){y.push(x);}}}return y;}function f(y){var x="";if(y.__cdata!=null){x+="<![CDATA["+y.__cdata+"]]>";}if(y.__text!=null){if(v.escapeMode){x+=p(y.__text);}else{x+=y.__text;}}return x;}function c(y){var x="";if(y instanceof Object){x+=f(y);}else{if(y!=null){if(v.escapeMode){x+=p(y);}else{x+=y;}}}return x;}function e(z,B,A){var x="";if(z.length==0){x+=m(z,B,A,true);}else{for(var y=0;y<z.length;y++){x+=m(z[y],B,b(z[y]),false);x+=d(z[y]);x+=i(z[y],B);}}return x;}function d(D){var x="";var B=k(D);if(B>0){for(var A in D){if(u(D,A)){continue;}var z=D[A];var C=b(z);if(z==null||z==undefined){x+=m(z,A,C,true);}else{if(z instanceof Object){if(z instanceof Array){x+=e(z,A,C);}else{if(z instanceof Date){x+=m(z,A,C,false);x+=z.toISOString();x+=i(z,A);}else{var y=k(z);if(y>0||z.__text!=null||z.__cdata!=null){x+=m(z,A,C,false);x+=d(z);x+=i(z,A);}else{x+=m(z,A,C,true);}}}}else{x+=m(z,A,C,false);x+=c(z);x+=i(z,A);}}}}x+=c(D);return x;}this.parseXmlString=function(z){var B=window.ActiveXObject||"ActiveXObject" in window;if(z===undefined){return null;}var A;if(window.DOMParser){var C=new window.DOMParser();var x=null;if(!B){try{x=C.parseFromString("INVALID","text/xml").childNodes[0].namespaceURI;}catch(y){x=null;}}try{A=C.parseFromString(z,"text/xml");if(x!=null&&A.getElementsByTagNameNS(x,"parsererror").length>0){A=null;}}catch(y){A=null;}}else{if(z.indexOf("<?")==0){z=z.substr(z.indexOf("?>")+2);}A=new ActiveXObject("Microsoft.XMLDOM");A.async="false";A.loadXML(z);}return A;};this.asArray=function(x){if(x instanceof Array){return x;}else{return[x];}};this.toXmlDateTime=function(x){if(x instanceof Date){return x.toISOString();}else{if(typeof(x)==="number"){return new Date(x).toISOString();}else{return null;}}};this.asDateTime=function(x){if(typeof(x)=="string"){return a(x);}else{return x;}};this.xml2json=function(x){return w(x);};this.xml_str2json=function(x){var y=this.parseXmlString(x);if(y!=null){return this.xml2json(y);}else{return null;}};this.json2xml_str=function(x){return d(x);};this.json2xml=function(y){var x=this.json2xml_str(y);return this.parseXmlString(x);};this.getVersion=function(){return q;};};

	/**
	* XML 버전을 확인하여 호환성 유지
	* @param {Object} XML Data Object
	* @return {newObj} new XML Data object
	*/
	function checkVersion(obj){
		var newObj = {};
		newObj = obj;
		if(typeof obj == 'object'){
			if(!obj.INTERFACE._version){
				newObj.INTERFACE.TYPE = obj.INTERFACE.COMMAND;
				newObj.INTERFACE.COMMAND = obj.INTERFACE.GTYPE;
			}
		}
		return newObj;
	}

	function initialize(){
		x2js = new X2JS();
		if(typeof app != 'undefined'){
		  try{
			app.setMessageCallback('ContainerToApp', function( name, args ){
				var rd = checkVersion(xmlStrToJsonObj(args[0]));
				//console.debug('[receiveMessage] ', args[0]);

				execCallback(rd.INTERFACE.COMMAND, rd.INTERFACE.TYPE, rd.INTERFACE.DATA);
			 });
      }catch (e){  }
	  }
	}

	// XML String to JSON Object
	function xmlStrToJsonObj(xml){
		var jsonObj;
		if(x2js){
			jsonObj = x2js.xml_str2json(xml);

			// history 데이터 보정을 위한 코드 0.0.5 [by JayJin @ 2015-12-03 오후 7:53]
			if( typeof jsonObj.INTERFACE.DATA.historyList !== 'undefined' ){
				jsonObj.INTERFACE.DATA.historyList.history = x2js.asArray(jsonObj.INTERFACE.DATA.historyList.history);
			}
		}
		return jsonObj;
	}

	// JSON Object to XML String
	function jsonObjToXmlStr(jsonObj){
		var xmlStr;
		if(x2js){
			xmlStr = x2js.json2xml_str(jsonObj);
		}
		return xmlStr;
	}

	function sendMessage(xmlStr){
		//console.log('[sendMessage] _____________________________ commuicator.js');
		//console.log('[sendMessage] xmlStr : ', xmlStr);
	    if(typeof app != 'undefined'){

	      try{
	    	app.sendMessage('AppToContainer', [xmlStr]);
        }catch (e){ }

	    }
	}

	function receiveMessage(xml){
		//console.log('[receiveMessage] _____________________________ commuicator.js');
		//console.log('[receiveMessage] xmlStr : ', xml);
	    setTimeout(function(){
			var rd = checkVersion(xmlStrToJsonObj(xml));
			//cs.logCSI(' receive / ' + rd.INTERFACE.COMMAND + ' / ' + rd.INTERFACE.TYPE, rd);
			execCallback(rd.INTERFACE.COMMAND, rd.INTERFACE.TYPE, rd.INTERFACE.DATA);
        }, 1000);
	}

	function createXML(obj){
		var jsonObj, xmlStr;
		if(version == '1.0'){
			jsonObj = {
				'INTERFACE' : {
					'COMMAND' : obj.type,
					'GROUP'	  : (obj.command == 'KeyInfo') ? 'Input_Info' : 'BYPASS',
					'GTYPE'   : obj.command,
					'DATA'    : obj.data
				}
			};
		}else{
			jsonObj = {
		        'INTERFACE': {
		          'TYPE': obj.type,
		          'COMMAND': obj.command,
		          'DIRECTION': 'AppToSTB',
		          'DATA': obj.data
		        }
			};
      	}

		xmlStr = jsonObjToXmlStr(jsonObj);
		xmlStr = '<?xml version="1.0" ?>' + xmlStr;
		if(version != '1.0'){
			xmlStr = xmlStr.replace('INTERFACE','INTERFACE version="'+version+'"');
		}
		return xmlStr;
	}

	function _send(obj){
		if(typeof obj == 'object'){
			sendMessage(createXML(obj));
		}
	}

	function _receive(obj){
		var cmd;
		if(typeof obj == 'object'){
			if(typeof obj.command != 'undefined'){
				cmd = obj.command;
				callbacks[cmd] = {};
				for(var pro in obj){
					if(pro != 'command'){
						callbacks[cmd][pro] = obj[pro];
					}
				}
			}
		}
	}

	function execCallback(command, type, data){
		//console.log('[execCallback] _____________________________ commuicator.js');
		if(typeof callbacks[command] != 'undefined'){
			if(typeof callbacks[command][type] == 'function'){
				callbacks[command][type](data);
			}
		}
	}

	/**
     * CSS 서버에 데이터를 보냄
     * @param {object} obj - 데이터 객체
     * @alias sendMssageToCSS
     * @example
     *
		cs.sendMssageToCSS({
			type : 'response',
			command : 'StartApp',
			data : {'appversion':'v1.0'}
		});
     * @memberof cs
     */
	cs.sendMssageToCSS = function(obj){
		_send(obj);
		if(typeof cs.debuggerToApp == 'function') {
			cs.debuggerToApp(obj);
		}
	};

	/**
     * CSS 서버에서 보낸 데이터를 받음
     * @memberof cs
     * @example
		cs.receiveMessageFromCSS({
			command : 'StartApp',
			request : function(data){
			  	cs.sendMssageToCSS({
			  		type : 'response',
			  		command : 'StartApp',
			  		data : {'appversion':'v1.0'}
			  	});
			}
		});
     */
	cs.receiveMessageFromCSS = function(obj){
		_receive(obj);
	};

	/**
     * CSS 서버에서 보낼 가상의 데이터를 받음
     * @memberof cs
     */
	cs.testCommunicator = function(xml){
		receiveMessage(xml);
	};

	initialize();

})();








(function (v) {
  var entrix =  {};


  var callback = {};
  var eventCallBack = {};

  function saveCallback(command, cbFunc) {
    if (typeof command != 'undefined' && command != '' && typeof cbFunc == 'function') {
      if (!callback[command].length) {
        callback[command] = [];
      }
      callback[command].push(cbFunc);
    }
    /*
     if( !callback[ command ].length ) {
     callback[ command ][0] = cb_str;
     } else {
     callback[ command ][ callback[ command].length ] = cb_str;
     }
     */
  }

  cs.receiveMessageFromCSS({
    command: 'StartVOD',
    response: function (data) {
      callback['startVOD'][0](data);
      callback['startVOD'].shift();
    }
  });

  cs.receiveMessageFromCSS({
    command: 'StatusInfo',
    information: function (data) {
      if (typeof eventCallBack['statusInfo'] == 'function') {
        eventCallBack['statusInfo'](data);
      }
    }
  });

  cs.receiveMessageFromCSS({
    command: 'Move',
    request: function (data) {
      if (typeof eventCallBack['move'] == 'function') {
        eventCallBack['move'](data);
      }
    }
  });

  cs.receiveMessageFromCSS({
    command: 'NotifyKeyPressed',
    request: function (data) {
      if (typeof eventCallBack['notifyKeyPressed'] == 'function') {
        eventCallBack['notifyKeyPressed'](data);
      }
    }
  });
  /*
   STB -> WebApp
   */
  cs.receiveMessageFromCSS({
    command: 'Recover',
    information: function (data) {
      if (typeof eventCallBack['recover'] == 'function') {
        eventCallBack['recover'](data);
      }
    }
  });

  /*
   VOD Play Function
   Head End Data to Send STB
   This Param is VOD Play Parameter. STB Need Param.
   ex) assetId , startTime, etc
   */
  /*
   * 作用：开启点播服务
   * 调用：当选中某节目后，按下遥控器确认键，开始VOD点播，即调用此方法进行点播，传入的参数是VOD播放需要的相关参数
   * 参数：assetId ,etc.
   * */
  entrix.startVOD = function (data) {
    cs.sendMssageToCSS({
      type: 'request',
      command: 'StartVOD',
      data: data
    });
  };

  entrix.startVOD_OLD = function (data, cbFunc) {
    saveCallback('StartVOD', cbFunc);
    cs.sendMssageToCSS({
      type: 'response',
      command: 'StartVOD',
      data: data
    });
  };
  /*
   Service Web Start
   Service Web Used Key Code List - SC Code, Scan Code -
   */
  /*
   * 作用：设置该页面可用的STB键值
   * 调用：当某个页面被加载时，需要调用此方法，传入当前页面可用的STB键值，如果跳转到新的页面，该方法需被重新调用
   * 参数：all or 72, 70, 77, 80,etc.
   * */
  entrix.keyInfo = function (data) {
    cs.sendMssageToCSS({
      type: 'information',
      command: 'KeyInfo',
      data: data
    });
  };

  /*
   WebApp Focus Index Write Data to Free DEV
   WebApp -> STB
   This is Focus move And Screen Change KeyEvent
   setHistory function
   */
  /*
   * 作用：保存操作历史
   * 调用：按遥控器任意键，当页面上的焦点移动、页面屏幕改变、菜单改变等，都需要调用此方法区进行历史记录保存，保存的数据格式可以自行按照ServiceWeb需要的方式进行定义
   * 参数：menuNO,pageURL,etc.
   * */
  entrix.history = function (data) {
    console.log('sendMessageToCSS History : ', data);
    cs.sendMssageToCSS({
      type: 'information',
      command: 'History',
      data: data
    });
  };

  /*
   App Exit
   */
  /*
   * 作用：退出APP
   * 调用：当需要退出APP的时候，调用此方法
   * 参数：null
   * */
  entrix.hideUI = function () {
    cs.sendMssageToCSS({
      type: 'information',
      command: 'HideUI',
      data: ''
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*
   EntrixCS (VCS or ICS) Service Change CyberCloud GAME
   Data : URL -> Move CyberCloud Client Action Move to URL
   */
  /*
   * 作用：ICS 或 VCS 切换到CC 游戏或直播频道时，利用此方法改变切换的URL
   * 调用：当需要切换到CC游戏或直播频道时，调用此方法
   * 参数：URL,stopServie
   * */
  entrix.changeServiceURL = function (data) {
    cs.sendMssageToCSS({
      type: 'information',
      command: 'ChangeServiceURL',
      data: data
    });
  };
  /*
   VCS -> VCS , ICS -> ICS
   */
  /*
   * 作用：将流化从ICS切换到VCS，或者VCS切换到ICS
   * 调用：当需要从ICS切换到VCS，或者VCS切换到ICS的时候，需要调用此方法
   * 参数：URL
   * */
  entrix.changeCSServiceURL = function (data) {
    cs.sendMssageToCSS({
      type: 'information',
      command: 'ChangeCSServiceURL',
      data: data
    });
  };
  /*
   VCS WebApp 1 -> VCS WebApp 2 , ICS WebApp 1 -> ICS WebApp 2
   */
  /*
   * 作用：在VCS或ICS中切换APP
   * 调用：当需要切换APP的时候，需要调用此方法
   * 参数：URL
   * */
  entrix.changeAppServiceURL = function (data) {
    console.log(`sendMssageToCSS:to another app`)
    cs.sendMssageToCSS({
      type: 'information',
      command: 'ChangeAppServiceURL',
      data: data
    });
  };
  /*
   Control ScreenSize
   */
  /*
   * 作用：改变屏幕大小
   * 调用：当需要改变屏幕大小的时候，调用此方法
   * 参数：posX，posY，width，height
   * */
  entrix.changeScreenSize = function (data) {
    cs.sendMssageToCSS({
      type: 'information',
      command: 'ChangeScreenSize',
      data: data
    });
  };

  /*
   * dont care for now
   * */
  entrix.launchCSApp = function (data) {
    cs.sendMssageToCSS({
      type: 'information',
      command: 'LaunchCSApp',
      data: data
    });
  };
  /*
   * dont care for now
   * */
  entrix.onLoad = function (data) {
    cs.sendMssageToCSS({
      type: 'information',
      command: 'OnLoad',
      data: data
    });
  };
  /*
   * 作用：告知STB是否页面开启成功
   * 调用：当开启流化，页面第一次出现的时候，调用此方法
   * 参数：
   * */
  entrix.moveResult = function (data) {
    cs.sendMssageToCSS({
      type: 'response',
      command: 'Move',
      data: data
    });
  };

  /*
   * 作用：响应特殊的键值操作，比如exit、menu,change screen,etc.
   * 调用：该方法是处理STB传上来的特殊键值进行处理，比如exit，退出流化，即断开STB与CSE的链接等，仅需要addEventListener即可，暂时不需要做其他处理
   * 参数：191,36，etx.
   * */
  entrix.notifyKeyPressedResult = function (data) {
    cs.sendMssageToCSS({
      type: 'response',
      command: 'NotifyKeyPressed',
      data: data
    });
    switch (data.value) {
      case '191' : //종료
        //utility.EXIT();
        var objParam = {"type": "close"}; //EntrixCS Close
        entrix.hideUI(objParam);
        return;
      case '36' : //메뉴
        //utility.EXIT();
        var objParam = {"type": "close"}; //EntrixCS Close
        entrix.hideUI(objParam);
        return;
    }
  };
  /*
   * 作用 恢复历史记录
   * 调用：当开启流化时，如果需要进行历史恢复，则STB会通过回调函数告知WebApp去进行历史恢复
   * 参数：data（保存的历史信息）
   * */
  entrix.recoverResult = function (data) {
    cs.sendMssageToCSS({
      type: 'response',
      command: 'Recover',
      data: data
    });
  };
  /*
   * 作用：添加监听，暂时支持move，statusInfo，recover，notifyKeyPressed四个监听
   * 调用：在document.ready的时候，进行监听注册
   * 参数：监听事件名，回调函数，除了notifyKeyPressed的回调函数是Entrix的WEB框架定义好的，其他的监听事件回调函数ServiceWebApp 开发者可自行定义
   * */
  entrix.addEventListener = function (command, eventFunc) {
    if (typeof command != 'undefined' || command != '') {
      eventCallBack[command] = eventFunc;
    }
  };

  /*
   entrix.request.testCallback = function( cbStr ) {
   saveCallback( 'command', cbStr );

   cs.sendMssageToCSS({
   type : 'request',
   command : 'command',
   data : {
   test : 'test'
   }
   });
   };

   entrix.response.history({

   });
   */
  v.entrix=entrix;

})(window);
