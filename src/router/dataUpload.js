export const dataUpload = {
    path: '/dataUpload',
    name: 'dataUpload',
    title: '数据上传',
    component: () => import("../components/page/dataUpload/dataUpload"),
    children:[
        {
            path:'/uploadData',
            name:'uploadData',
            component:() => import("../components/page/dataUpload/uploadData"),
            meta:{title:'数据上传/上传数据'}
        },
        {
            path:'/myUpload',
            name:'myUpload',
            component:() => import("../components/page/dataUpload/myUpload"),
            meta:{title:'数据上传/我的上传'}
        },
        {
            path:'/refreshData',
            name:'refreshData',
            component:() => import("../components/page/dataUpload/refreshData"),
            meta:{title:'数据上传/我的上传/更新数据'}
        }
    ]
}