const menuList = function () {
  return [
    {
      path: '/homePage',
      name: 'homePage',
      permId: 1,
      show: false,
      title: '首页',
      userType:2
    },
    {
      path: '/dataSearch',
      name: 'dataSearch',
      permId: 2,
      show: false,
      title: '数据检索',
      userType: 2,
      children: [
        {
          path: '/documDataSearch',
          name: 'documDataSearch',
          permId: 3,
          show: false,
          title: '文献数据'
        },
        {
          path: '/filloutDataSearch',
          name: 'filloutDataSearch',
          permId: 4,
          show: false,
          title: '填报数据'
        }
      ]
    },
    {
      path: '/dataUpload',
      name: 'dataUpload',
      permId: 5,
      show: false,
      title: '数据上传',
      userType : 2,
      children: [
        {
          path: '/uploadData',
          name: 'uploadData',
          permId: 6,
          show: false,
          title: '上传数据',
          userType : 2
        },
        {
          path: '/myUpload',
          name: 'myUpload',
          permId: 7,
          show: false,
          title: '我的上传',
          userType : 2
        }
      ]
    },
    {
      path: '/myGroup',
      name: 'myGroup',
      permId: 8,
      show: false,
      title: '我的小组',
      userType : 2,
      children: [
        {
          path: '/addGroup',
          name: 'addGroup',
          permId: 9,
          show: false,
          title: '新建小组',
          userType: 2,
        },
        {
          path: '/groupDetail',
          name: 'groupDetail',
          permId: 10,
          show: false,
          title: '小组详情',
          userType: 2
        }
      ]
    },
    {
      path: '/myDownload',
      name: 'myDownload',
      permId: 11,
      show: false,
      title: '我的下载',
      userType: 2
    }
  ]
};

export default menuList;
