import Vue from 'vue'

import Router from 'vue-router'




//异步加载
const VodHome = resolve => require(['@/components/VodHome'],resolve);
const VipIndex = resolve => require(['@/components/VipIndex'],resolve);

const Index = resolve => require(['@/components/Index'],resolve);
const SdHome = resolve => require(['@/components/SdHome'], resolve);
const SdFeatures = resolve => require(['@/components/SdFeatures'], resolve);
const SdEpisode = resolve => require(['@/components/SdEpisode'], resolve);

const HdHome = resolve => require(['@/components/HdHome'], resolve);
const HdFeatures = resolve => require(['@/components/HdFeatures'], resolve);
const HdDolby = resolve => require(['@/components/public/HdDolby'], resolve);
const HdFree = resolve => require(['@/components/public/HdFree'], resolve);
const HdInfo = resolve => require(['@/components/HdInfo'], resolve);


const List = resolve => require(['@/components/public/List'], resolve);
const ListArts = resolve => require(['@/components/public/List-arts'], resolve);
const ListHot = resolve => require(['@/components/public/List-hot'], resolve);

const HdList = resolve => require(['@/components/public/HdList'], resolve);
const HdList6 = resolve => require(['@/components/public/HdList6'], resolve);
const HdInfoMovie = resolve => require(['@/components/public/HdInfoMovie'], resolve);
const HdInfoArts = resolve => require(['@/components/public/HdInfoArts'], resolve);


//视赢家,智学堂
const Economy = resolve => require(['@/components/economy/Economy'], resolve);
const Education = resolve => require(['@/components/education/Education'], resolve);
const SubEdu = resolve => require(['@/components/education/SubEdu'], resolve);
const SubEduXiaoXue = resolve => require(['@/components/education/SubEduXiaoXue'], resolve);

//排行榜,我的收藏,节目提醒,超清搜索
const F1 = resolve => require(['@/components/F1'], resolve);
const F2 = resolve => require(['@/components/F2'], resolve);
const F3 = resolve => require(['@/components/F3'], resolve);
const HdSearch = resolve => require(['@/components/HdSearch'], resolve);

//4K沙发
const Sofa = resolve => require(['@/components/sofa/Sofa'], resolve);

//标清详情
const SdInfo = resolve => require(['@/components/SdInfo'], resolve);



const Links = resolve => require(['@/components/Links'], resolve);
const Hello = resolve => require(['@/components/Hello'], resolve);





Vue.use(Router);






var _router= new Router({

 /* mode:'history',*/
  routes: [
    {
      path: '/',
      name: 'Index',
      component:Index,
    },
    {
      path: '/test',
      name: 'test',
      component:Hello,
    },
    {
      path:"/links",
      name:"Links",
      component:Links,
    },
    {
      path:"/vip",
      name:"Vip",
      component:VipIndex,
    },
    {
      path: '/sd/home/:column',
      //name: 'SdHome',
      component: SdHome,
      children:[

        {
          path: '/',

          name: 'default',
          component: List,
        },
        {
          path: 's2',

          component: ListArts,
        },
        {
          path: 'list',

          component: ListHot,
        },
      ]
    },
    {
      path: '/sd/features/:column',
      //name: 'SdFeatures',
      component: SdFeatures,
      children:[
        {
          path: '/',
          name: 'List',
          component: List,
        },
        {
          path: 'list',
          name: 'ListHot',
          component: ListHot,
        },
        {
          path: 's2',
          component: ListArts,
        }
     ]

    },
    {
      path: '/sd/episode/:column',
      name: 'SdEpisode',
      component: SdEpisode
    },

    {
      path: '/vod/home',
      name: 'VodHome',
      component: VodHome
    },
    {
      path:'/hd/home',
      name:'HdHome',
      component:HdHome
    },
    {
      path:'/hd/info',
      component:HdInfo,
      children:[
        {
          path:"/",
          name:"hd-info-movie",
          component:HdInfoMovie
        },
        {
          path:"arts",
          name:"hd-info-arts",
          component:HdInfoArts
        }
      ]
    },
    {
      path:'/hd',
      name:'HdFeatures',
      component: HdFeatures,
      children:[
        {
          path: 'movie',
          name: 'movie',
          component: HdList
        },
        {
          path: 'tv',
          name: 'tv',
          component: HdList
        },
        {
          path: 'all',
          name: 'all',
          component: HdList
        },
        {
          path: 'jp',
          name: 'jp',
          component: HdList6
        },
        {
          path: 'free',
          name: 'free',
          component: HdFree
        },
        {
          path: '4k',
          name: '4k',
          component: HdList
        },
        {
          path: 'dolby',
          name: 'dolby',
          component: HdDolby
        },
        {
          path: 'hlw',
          name: 'hlw',
          component: HdList
        },
        {
          path: 'chd',
          name: 'chd',
          component: HdList
        },
        {
          path: '3D',
          name: '3D',
          component: HdList
        },

      ]
    },

    //Economy
    {
        path: '/economy',
        name: 'Economy',
        component:Economy,
    },

    //Education
    {
        path: '/education',
        name: 'Education',
        component:Education
    },
    {
        path: '/education/sub',
        name: 'SubEdu',
        component:SubEdu
    },
    {
        path: '/education/subxiaoxue',
        name: 'SubEduXiaoXue',
        component:SubEduXiaoXue
    },

    //top
    {
        path: '/f1',
        name: 'Top',
        component:F1
    },
    //collect
    {
        path: '/f2',
        name: 'F2',
        component:F2
    },
    //reminds
    {
        path: '/f3',
        name: 'Reminds',
        component:F3
    },

    //search
    {
        path: '/hd/search',
        name: 'HdSearch',
        component:HdSearch
    },
    //sofa
    {
        path: '/hd/sofa',
        name: 'Sofa',
        component:Sofa
    },
    //卡通详情

    {
        path: '/sd/info',
        name: 'SdInfo',
        component:SdInfo
    },

  ]
});


//路由加上探针
/*_router.beforeEach((to, from, next) => {
    console.log(from,to);

    next();


})*/

/*_router.beforeEach((to, from, next) => {
  store.commit("upstate",{column:"test"});
  console.log("vuex  update")

  next();
});*/



export  default _router ;

