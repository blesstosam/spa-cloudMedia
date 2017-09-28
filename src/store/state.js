import   {
  FEATURES,
  FREE,
  TODAY_FREE,
  RECOMMEND
} from '../store/mutation-types'

// 'stream31a936a111e611e69cb7ed607f'  cep accesskey

export default {

  column:"movie",
  chistory:[],
  lastHistory: {},
  stbId:"99616612190002281",//"99616612190002281",//99810510140023379,//01486617150001110
  groupId:'1452081',  //'null'
  menus:[],
  vid:"null",
  eve:"none",
  action:"",
  cepid:'',
  debug:false,
  msg:"debug:",
  streamData:{},
  featureName: '',    //在进标清专题时需要
  newsPic: '',        //新闻板块的图片 在sd/info会用到
  featurePic: '',     //综艺，体育文化，生活专题的图片

  columns:{
    tv:[
      {id:287562, name:"热门",poster:"287562.jpg"},
      {id:400583, name:"专题",type:FEATURES},
      {id:"184369,184370,333166,333165,333168,333167,184368,184356", name:"免费", type:FREE},
      {id:184356, name:"热播"},
      {id:333166, name:"家庭"},
      {id:333165, name:"谍战"},
      {id:333168, name:"古装"},
      {id:333167, name:"偶像"},
      {id:184369, name:"大陆"},
      {id:184368, name:"港台"},
      {id:184370, name:"海外"},
      {id:"184356,184369,184370,333166,333165,333168,333167,184368", name:"全部"}
    ],
    movie:[
      {id:287526,name:"热门",poster:"287526.jpg"},
      {id:287527,name:"专题",type:FEATURES},
      {id:"184372,184375,184374,332578,332666,332665,332580,332579",name:"免费",type:FREE},
      {id:184372,name:"华语"},
      {id:184375,name:"海外"},
      {id:332578,name:"动作"},
      {id:332579,name:"科幻"},
      {id:332580,name:"喜剧"},
      {id:332665,name:"惊悚"},
      {id:184374,name:"经典"},
      {id:332666,name:"爱情"},
      {id:"184372,184375,184374,332578,332666,332665,332580,332579",name:"全部"}
    ],
    animation:[
      {id:950330, name:"最新上线",  },
      {id:301370, name:"专题推荐",  type:FEATURES},
      {id:188636, name:"超炫卡通",  },
      {id:184392, name:"国产经典",  },
      {id:184393, name:"热秀剧场",  },
      {id:184406, name:"青春励志",  },
      {id:184407, name:"益智幽默",  },
      {id:184394, name:"亲子乐园",  }

    ],
    arts:[
      {id: 445756, name: "头条",  poster: "kalaok2key.jpg"},
      {id: 447117, name: "免费",  type:FEATURES},
      {id: 185760, name: "快讯",  poster: "zy_ylkx.jpg"},
      {id: 185738, name: "明星",  poster: "zy_wqmx.jpg"},
      {id: 185761, name: "音乐",  type:FEATURES},
      {id: 456516, name: "影视",  poster: "zy_ys.jpg"},
      {id: 185768, name: "栏目",  type:FEATURES},
      // {id: 745243, name:"韩综",   type:FEATURES},
      {id: 185764, name: "策划",  type:FEATURES}
    ],
    sports:[
      {id:184384, name:"头条",  poster:"ty_zx.jpg"},
      {id:455594, name:"免费",  poster:"ty_mianfei.jpg"},
      {id:446986, name:"快讯",  poster:"ty_titankuaixun.jpg"},
      {id:184364, name:"策划",  type:FEATURES},
      {id:184385, name:"篮球",  type:FEATURES},
      {id:184386, name:"足球",  type:FEATURES},
      {id:184387, name:"搏击",  type:FEATURES},
      {id:184357, name:"电竞",  type:FEATURES},
      {id:184388, name:"综合",  type:FEATURES}
    ],
    culture:[{id:306465, name:"最新", poster:"wh_zxsx.jpg"},
      {id:445069, name:"免费",     type:FEATURES},
      {id:306466, name:"特别策划",  type:FEATURES},
      {id:185494, name:"热点",    poster:"wh_rd.jpg"},
      {id:185044, name:"军事",  type:FEATURES},
      {id:185293, name:"人文",  type:FEATURES},
      {id:185164, name:"探秘",  type:FEATURES},
      {id:185270, name:"自然",  type:FEATURES},
      {id:456705, name:"栏目",  type:FEATURES}

    ],
    hot:[
      {id: 311175, name: "最新上线"},
      {id: 311176, name: "专题推荐", type:FEATURES},
      {id: 566524, name: "高清推荐", type:RECOMMEND,poster:'hot_poster0.jpg'},
      {id: 8888,   name: "近期下线"}


    ],
    hd:[
      {id:566524, name:"高清推荐", column:"home" },
      {id:567720, name:"高清电影", column:"movie"},
      {id:567719, name:"高清剧集", column:"tv"},
      {id:567721, name:"综合高清", column:"all",type:FEATURES},
      {id:566533, name:"精品策划",column:"jp",type:FEATURES},
      {id:566535, name:"限时免费",column:"free",type:TODAY_FREE},
      {id:566541, name:"4k专区",column:"4k"},
      {id:566540, name:"杜比体验",column:"dolby"},
      {id:566536, name:"H好莱坞",column:"hlw" },
      {id:566537, name:"彩虹岛", column:"chd" },
      {id:566542, name:"3D专区",column:"3D"}
   ],
    news:[
      {id:185926,name:"热点"},
      {id:873256,name:"时政"},
      {id:188775,name:"民生"},
      {id:873258,name:"趣闻"},
      {id:873259,name:"文体"},
      {id:446289,name:"凤凰"},
      {id:185927,name:"新华社"},
      {id:185930,name:"央视锦集",type:FEATURES},
      {id:873260,name:"本地精选",type:FEATURES}
    ],
    life:[
      {id:446822, name:"最新", poster:'SH_zuixin.jpg'},
      {id:446974, name:"专题", type:FEATURES},
      {id:455459, name:"时尚", poster:'SH_shishang.jpg'},
      {id:447023, name:"美食", type:FEATURES},
      {id:455460, name:"健康", type:FEATURES},
      {id:455461, name:"旅行", poster:'SH_lvxing.jpg'},
      {id:455462, name:"家居", poster:'SH_jiaju.jpg'},
      {id:455463, name:"汽车", poster:'SH_qiche.jpg'}
    ],
    'vip-hollywood':[
      {id:470092,name:"好莱坞电影"},
      {id:470094,name:"好莱坞剧场"},
      {id:470097,name:"好莱坞综艺"}
    ],
    'vip-latale':[
      {id:809048, name:"鸭宝宝乐园"},
      {id:809051, name:"宝贝乐园"}
    ],



    economy:[
      {categoryId:508516,name:'首页',flag:'sy'},
      {categoryId:505548,name:'专家股评',flag:'zjgp'},
      {categoryId:505549,name:'投资课堂',flag:'tzkt'},
      {categoryId:505481,name:'栏目精品',flag:'lmjp'},
      {categoryId:505482,name:'冷眼热议',flag:'lyry'}
    ],
    education:[
      {categoryId : "599928",name : "幼儿小班",flag:'yexb',inx:0,
        sub:[
          {subCategoryId:"599971",name:"益智童谣乐园",poster:"D_yizhitongyao.jpg"},
          {subCategoryId:"599932",name:"儿歌天地",poster:"Y_tiandi.jpg"},
          {subCategoryId:"599972",name:"睡前小故事",poster:"Y_gushi.jpg"},
          {subCategoryId:"600030",name:"学手工-小班",poster:"Y_shougong.jpg"},
          {subCategoryId:"599968",name:"英语不用教",poster:"Y_yingyu.jpg"},
          {subCategoryId:"624610",name:"奇智奇才-语言",poster:"yuyan.jpg"},
          {subCategoryId:"624611",name:"奇智奇才-数学",poster:"shuxue.jpg"},
          {subCategoryId:"624612",name:"奇智奇才-科学",poster:"kexue.jpg"},
          {subCategoryId:"624613",name:"奇智奇才-美术",poster:"meishu.jpg"},
          {subCategoryId:"624614",name:"奇智奇才-音乐",poster:"yingyue.jpg"},
          {subCategoryId:"624615",name:"奇智奇才-健康",poster:"jiankang.jpg"},
          {subCategoryId:"624616",name:"奇智奇才-社会",poster:"shehui.jpg"},
          {subCategoryId:"644756",name:"贝瓦儿歌",poster:"beiwaerge.jpg"},
          {subCategoryId:"599970",name:"智商情商启蒙",poster:"zhishangqimeng.jpg"},
          {subCategoryId:"599969",name:"小小智慧树",poster:"xxzhs.jpg"}
        ]
      },

      {categoryId : "599929",name : "幼儿中班",flag:'yezb',inx:1,
        sub:[
          {subCategoryId:"600106",name:"英语直通车",poster:"D_yingyuztc.jpg"},
          {subCategoryId:"600103",name:"唱儿歌学英语",poster:"D_changegxyy.jpg"},
          {subCategoryId:"600102",name:"奥数启蒙",poster:"L_aoshu.jpg"},
          {subCategoryId:"600104",name:"成语故事",poster:"L_chengyu.jpg"},
          {subCategoryId:"600105",name:"鞠萍姐姐故事屋",poster:"L_gushiwu.jpg"},
          {subCategoryId:"600149",name:"娃娃学跳舞",poster:"L_tiaowu.jpg"},
          {subCategoryId:"600151",name:"学手工-中班",poster:"L_zhongban.jpg"},
          {subCategoryId:"624617",name:"奇智奇才-语言",poster:"yuyan.jpg"},
          {subCategoryId:"624618",name:"奇智奇才-数学",poster:"shuxue.jpg"},
          {subCategoryId:"624619",name:"奇智奇才-科学",poster:"kexue.jpg"},
          {subCategoryId:"624620",name:"奇智奇才-美术",poster:"meishu.jpg"},
          {subCategoryId:"624621",name:"奇智奇才-音乐",poster:"yingyue.jpg"},
          {subCategoryId:"624622",name:"奇智奇才-健康",poster:"jiankang.jpg"},
          {subCategoryId:"624623",name:"奇智奇才-社会",poster:"shehui.jpg"},
          {subCategoryId:"653863",name:"幼儿故事大王",poster:"gushidaquan.jpg"}
        ]
      },

      {categoryId : "599930",name : "幼儿大班",flag:'yedb',inx:2,
        sub:[
          {subCategoryId:"599960",name:"语文不用教",poster:"D_yuwenbyj.jpg"},
          {subCategoryId:"599958",name:"英语情景短片",poster:"D_yingyuqjdp.jpg"},
          {subCategoryId:"600031",name:"学手工-大班",poster:"Z_daban.jpg"},
          {subCategoryId:"599974",name:"学说绕口令",poster:"Z_kouling.jpg"},
          {subCategoryId:"599961",name:"智力数学大篷车",poster:"Z_dapengche.jpg"},
          {subCategoryId:"624624",name:"奇智奇才-语言",poster:"yuyan.jpg"},
          {subCategoryId:"624625",name:"奇智奇才-数学",poster:"shuxue.jpg"},
          {subCategoryId:"624496",name:"奇智奇才-科学",poster:"kexue.jpg"},
          {subCategoryId:"624497",name:"奇智奇才-美术",poster:"meishu.jpg"},
          {subCategoryId:"624498",name:"奇智奇才-音乐",poster:"yingyue.jpg"},
          {subCategoryId:"624690",name:"奇智奇才-健康",poster:"jiankang.jpg"},
          {subCategoryId:"624691",name:"奇智奇才-社会",poster:"shehui.jpg"},
          {subCategoryId:"599975",name:"幼儿经典童话故事",poster:"youertonghuagushi.jpg"},
          {subCategoryId:"599977",name:"水木娃娃童画乐园",poster:"yz_shuimwwth.jpg"},
          {subCategoryId:"599978",name:"水木娃娃探索宇宙之谜",poster:"yz_shuimwwtsyz.jpg"}
        ]
      },

      {categoryId : "599931",name : "益智动画",flag:'yzdh',inx:3,
        sub:[
          {subCategoryId:"907022",name:"熊出没之秋日团团转",poster:"D_xcmqrttz.jpg"},
          {subCategoryId:"920743",name:"熊出没之夏日连连看",poster:"D_xiarilianliankan.jpg"},
          {subCategoryId:"938388",name:"超级飞侠",poster:"D_chaojifeixia.jpg"},
          {subCategoryId:"735853",name:"热门动漫大电影",poster:"D_rmddy.jpg"},
          {subCategoryId:"735530",name:"熊出没之春日对对碰",poster:"D_crddp.jpg"},
          {subCategoryId:"735529",name:"喜羊羊13之妈妈乐疯狂",poster:"D_mmlfk.jpg"},
          {subCategoryId:"599989",name:"迪亚哥",poster:"D_yedige.jpg"},
          {subCategoryId:"599963",name:"乐比悠悠",poster:"D_youyou.jpg"},
          {subCategoryId:"599962",name:"小猪佩奇",poster:"D_peiqi.jpg"},
          {subCategoryId:"599965",name:"米奇妙妙屋",poster:"D_miaowu.jpg"},
          {subCategoryId:"599966",name:"托马斯小火车",poster:"D_xiaohuoche.jpg"},
          {subCategoryId:"599967",name:"熊出没",poster:"D_xiongchumo.jpg"},
          {subCategoryId:"599988",name:"熊出没之环球大冒险",poster:"D_damaoxian.jpg"},
          {subCategoryId:"599964",name:"芝麻街",poster:"D_zhimajie.jpg"},
          {subCategoryId:"715428",name:"猪猪侠7",poster:"D_zhuzhuxia7.jpg"},
          {subCategoryId:"601903",name:"猪猪侠8",poster:"D_zhuzhuxia8.jpg"},
          {subCategoryId:"599990",name:"猪猪侠9",poster:"D_zhuzhuxia9.jpg"},
          {subCategoryId:"718165",name:"熊出没之从林总动员",poster:"D_xiongchumo3cl.jpg"},
          {subCategoryId:"769293",name:"喜羊羊10之羊羊小心愿",poster:"D_yangyangxiaoxiny.jpg"},
          {subCategoryId:"769292",name:"喜羊羊11之衣橱大冒险",poster:"D_yichudamx.jpg"},
          {subCategoryId:"599988",name:"熊仔之非熊不可",poster:"yz_xiongzfxbk.jpg"},
          {subCategoryId:"882332",name:"小童猫之喵星来客",poster:"miaoxinglk.jpg"},
          {subCategoryId:"876793",name:"功夫家族之笨笨鼠",poster:"sy_gfjzzbebbebs.jpg"},
          {subCategoryId:"876723",name:"熊仔之雄心壮志",poster:"sy_xxzzxxzhzhi.jpg"},
          {subCategoryId:"876792",name:"带帽子的猫",poster:"sy_daimzdmao.jpg"},
          {subCategoryId:"876724",name:"俏皮大嘴猫之萌宠天下",poster:"sy_qpdzmaozmchtxia.jpg"},
          {subCategoryId:"886470",name:"大吉成长记",poster:"sy_dajichzhji.jpg"},
          {subCategoryId:"876788",name:"瓢虫贝贝之神秘工厂",poster:"sy_shenmgongch.jpg"},
          {subCategoryId:"876789",name:"瓢虫贝贝之拯救古树镇",poster:"sy_zhengjgushuzh.jpg"},
          {subCategoryId:"886469",name:"卫浴也疯狂",poster:"sy_weiyuyfkuang.jpg"},
          {subCategoryId:"876726",name:"小玩皮",poster:"sy_xiaowanp.jpg"},
          {subCategoryId:"886468",name:"梦想总动员",poster:"yz_dreamzdy.jpg"},
          {subCategoryId:"895249",name:"托马斯和他的朋友",poster:"D_tuomasihtdpy.jpg"},
          {subCategoryId:"898909",name:"洋洋小侦探",poster:"D_yangyangxzt.jpg"},
          {subCategoryId:"901709",name:"原始世界历险记",poster:"D_yangyyuanshisjlxj.jpg"},
          {subCategoryId:"905421",name:"伯特与厄尼的神奇冒险",poster:"D_btyendsqmx.jpg"},
          {subCategoryId:"905422",name:"超时空保卫战",poster:"D_kxcrlmzcskbwz.jpg"},
        ]
      },

      {categoryId : "185420",name : "小学乐园",flag:'xxly',inx:4,
        sub:[
          {subCategoryId:"460685",name:"小学语文",poster:"X_yuwen.jpg"},
          {subCategoryId:"460686",name:"小学数学",poster:"X_shuxue.jpg"},
          {subCategoryId:"460687",name:"小学英语",poster:"X_yingyu.jpg"},
          {subCategoryId:"",name:"",poster:"morenhaibao.gif"},
          {subCategoryId:"",name:"",poster:"morenhaibao.gif"},
          {subCategoryId:"",name:"",poster:"morenhaibao.gif"}
        ]
      },

      {categoryId : "755948",name : "星猫乐园",flag:'xmly',inx:5,
        sub:[
          {subCategoryId:"755949",name:"星猫之大笑西游",poster:"xm_dxxy.jpg"},
          {subCategoryId:"755950",name:"星达兴动画系列之欢乐秀",poster:"xm_huanlexiu.jpg"},
          {subCategoryId:"755951",name:"星达兴动画系列之昆虫世界",poster:"xm_kunchonshijie.jpg"},
          {subCategoryId:"755916",name:"神探包星星第一部",poster:"xm_bxx1.jpg"},
          {subCategoryId:"761108",name:"星猫之公益小品",poster:"xm_xiaoping.jpg"},
          {subCategoryId:"761109",name:"星猫的秘密基地 ",poster:"xm_jidi.jpg"},
          {subCategoryId:"799913",name:"星猫历险记之地球大冒险 ",poster:"xm_diqiudamaoxian.jpg"},
          {subCategoryId:"799914",name:"星达丘快乐学园 ",poster:"xm_kuailexueyuan.jpg"},
          {subCategoryId:"799917",name:"星猫漫游记 ",poster:"xm_manyou.jpg"},
          {subCategoryId:"799918",name:"功夫星猫 ",poster:"xm_gf.jpg"},
          {subCategoryId:"799922",name:"星猫历险记之星空大冒险 ",poster:"xm_xinkongmaox.jpg"},
          {subCategoryId:"799923",name:"星猫历险记之古城大冒险 ",poster:"xm_guchenmx.jpg"},
          {subCategoryId:"799926",name:"功夫星猫第二部 ",poster:"xm_gongfu2.jpg"},
          {subCategoryId:"799927",name:"吉祥猫可可 ",poster:"xm_keke.jpg"},
          {subCategoryId:"799897",name:"星猫漫游记之三金村 ",poster:"xm_sanjincun.jpg"},
          {subCategoryId:"799898",name:"小星猫魔幻乐章",poster:"xm_mohuanyue.jpg"},
          {subCategoryId:"799901",name:"顽皮的小星猫 ",poster:"xm_xiaoxinmao.jpg"},
          {subCategoryId:"799902",name:"小星猫的故事 ",poster:"xm_xgushi.jpg"},
          {subCategoryId:"799906",name:"小星猫与闪闪 ",poster:"xm_shangshang.jpg"},
          {subCategoryId:"799933",name:"星达兴之太空船 ",poster:"xm_taikong.jpg"},
          {subCategoryId:"799934",name:"星空救援队",poster:"xm_jiuyuan.jpg"},
          {subCategoryId:"799935",name:"神探包星星第二部 ",poster:"xm_bxx2.jpg"},
          {subCategoryId:"799938",name:"星猫之西域迷踪 ",poster:"xm_mizong.jpg"}
        ]
      }
    ],
    search:{
        classify:[
            {
                main:'电影',
                cid:567720,
                type:[
                    {name:'全部',typeParam:'all'},
                    {name:'动作',typeParam:'action'},
                    {name:'科幻',typeParam:'adventure'},
                    {name:'喜剧',typeParam:'comedy'},
                    {name:'惊悚',typeParam:'horror'},
                    {name:'爱情',typeParam:'romance'},
                    {name:'战争',typeParam:'war'},
                    {name:'其他',typeParam:'other'}
                ]
            },
            {
                main:'电视剧',
                cid:567719,
                type:[
                    {name:'全部',typeParam:'all'},
                    {name:'家庭',typeParam:'family'},
                    {name:'谍战',typeParam:'antispy'},
                    {name:'古装',typeParam:'ancient'},
                    {name:'偶像',typeParam:'idol'},
                    {name:'爱情',typeParam:'romance'},
                    {name:'战争',typeParam:'war'},
                    {name:'其他',typeParam:'other'}
                ]
            },
        ],
        area:[
            {name:'全部',areaId:'0'},
            {name:'大陆',areaId:'1'},
            {name:'欧美',areaId:'3'},
            {name:'日韩',areaId:'4'},
            {name:'港台',areaId:'2'},
            {name:'东南亚',areaId:'5'},
            {name:'其他',areaId:'99'}
        ],
        year:[
            {name:'全部',yearId:'all'},
            {name:'2017',yearId:'2017'},
            {name:'2016',yearId:'2016'},
            {name:'2015',yearId:'2015'},
            {name:'2014',yearId:'2015'},
            {name:'2013',yearId:'2013'},
            {name:'2012',yearId:'2012'},
            {name:'全部',yearId:'other'}
        ]
    }
  }

}
