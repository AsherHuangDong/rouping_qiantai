export const myGroup = {
    path: '/myGroup',
    name: 'myGroup',
    title: '我的小组',
    component: () => import("../components/page/myGroup/myGroup"),
    children:[
        {
            path:'/addGroup',
            name:'addGroup',
            component:() => import("../components/page/myGroup/addGroup"),
            meta:{title:'我的小组/新建小组'}
        },
        {
            path:'/groupDetail',
            name:'groupDetail',
            component:() => import("../components/page/myGroup/groupDetail"),
            meta:{title:'我的小组/小组详情'}
        },
        {
            path:'/groupContent',
            name:'groupContent',
            component:() => import("../components/page/myGroup/groupContent"),
            meta:{title:'我的小组/小组详情/小组内容'}
        },
    ]
}