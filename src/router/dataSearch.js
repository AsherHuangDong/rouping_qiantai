export const dataSearch = {
    path: '/dataSearch',
    name: 'dataSearch',
    title: '数据检索',
    component: () => import("../components/page/dataSearch/dataSearch"),
    children:[
        {
            path:'/documDataSearch',
            name:'documDataSearch',
            component:() => import("../components/page/dataSearch/documDataSearch"),
            meta:{title:'数据检索/文献数据'}
        },
        {
            path:'/filloutDataSearch',
            name:'filloutDataSearch',
            meta:{title:'数据检索/填报数据'},
            component:() => import("../components/page/dataSearch/filloutDataSearch")
        },
        {
            path:'/dataCompare',
            name:'dataCompare',
            meta:{title:'数据比较'},
            component:() => import("../components/page/dataSearch/dataCompare")
        }
    ]
}