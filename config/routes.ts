export default [
  {
    name: '登录',
    layout: false,
    hideInMenu: true,
    path: '/user/login',
    component: './User/Login',
  },
  {
    name: '注册',
    layout: false,
    hideInMenu: true,
    path: '/user/register',
    component: './User/Register',
  },
  {
    name: '用户管理',
    access: 'canAdmin',
    icon: 'crown',
    path: '/user/manage',
    component: './User/Manage',
  },
  {
    name: '课程列表',
    icon: 'table',
    path: '/course/list',
    component: './Course/List',
  },
  {
    name: '课程详情',
    path: '/course/:courseId',
    component: './Course/Detail',
    hideInMenu: true,
    layout: {
      hideMenu: false,
      hideNav: false,
      hideFooter: false,
    },
  },
  {
    name: '项目详情',
    path: '/project/:projectId',
    component: './Project/Detail',
    hideInMenu: true,
    layout: {
      hideMenu: false,
      hideNav: false,
      hideFooter: false,
    },
  },
  {
    name: '作业详情',
    path: '/assignment/:assignmentId',
    component: './Assignment/Detail',
    hideInMenu: true,
    layout: {
      hideMenu: false,
      hideNav: false,
      hideFooter: false,
    },
  },
  {
    name: '提交详情',
    path: '/submission/:submissionId',
    component: './Assignment/Submission',
    hideInMenu: true,
    layout: {
      hideMenu: false,
      hideNav: false,
      hideFooter: false,
    },
  },
  {
    name: '评阅',
    path: '/review/:assignmentId',
    component: './Assignment/Review',
    hideInMenu: true,
    layout: {
      hideMenu: false,
      hideNav: false,
      hideFooter: false,
    },
  },
  // {
  //   name: '小组信息',
  //   icon: 'table',
  //   path: '/group',
  //   component: './Group/group',
  // },
  // {
  //   name: '小组信息1',
  //   icon: 'table',
  //   path: '/group1',
  //   component: './Group/ProjectSelector',
  // },
  {
    name: '小组信息',
    icon: 'table',
    path: '/group',
    component: './Group/UserGroup',
    // hideInMenu: true,
  },
  {
    name: 'Notify Table',
    icon: 'table',
    path: '/Notification/:courseId',
    component: '@/pages/Notification/Notification',
    hideInMenu: true,
  },
  {
    name: 'Notify Table',
    icon: 'table',
    path: '/CourseNotification',
    component: '@/pages/Notification/CourseNotification',
    hideInMenu: true,
  },
  {
    name: '个人中心',
    icon: 'user',
    path: '/account',
    component: './account/settings',
  },
  // -----------------------------------分界线--------------------------------
  // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       path: '/dashboard',
  //       redirect: '/dashboard/analysis',
  //     },
  //     {
  //       name: 'analysis',
  //       icon: 'smile',
  //       path: '/dashboard/analysis',
  //       component: './dashboard/analysis',
  //     },
  //     {
  //       name: 'monitor',
  //       icon: 'smile',
  //       path: '/dashboard/monitor',
  //       component: './dashboard/monitor',
  //     },
  //     {
  //       name: 'workplace',
  //       icon: 'smile',
  //       path: '/dashboard/workplace',
  //       component: './dashboard/workplace',
  //     },
  //   ],
  // },
  // {
  //   path: '/form',
  //   icon: 'form',
  //   name: 'form',
  //   routes: [
  //     {
  //       path: '/form',
  //       redirect: '/form/basic-form',
  //     },
  //     {
  //       name: 'basic-form',
  //       icon: 'smile',
  //       path: '/form/basic-form',
  //       component: './form/basic-form',
  //     },
  //     {
  //       name: 'step-form',
  //       icon: 'smile',
  //       path: '/form/step-form',
  //       component: './form/step-form',
  //     },
  //     {
  //       name: 'advanced-form',
  //       icon: 'smile',
  //       path: '/form/advanced-form',
  //       component: './form/advanced-form',
  //     },
  //   ],
  // },
  // {
  //   path: '/list',
  //   icon: 'table',
  //   name: 'list',
  //   routes: [
  //     {
  //       path: '/list/search',
  //       name: 'search-list',
  //       component: './list/search',
  //       routes: [
  //         {
  //           path: '/list/search',
  //           redirect: '/list/search/articles',
  //         },
  //         {
  //           name: 'articles',
  //           icon: 'smile',
  //           path: '/list/search/articles',
  //           component: './list/search/articles',
  //         },
  //         {
  //           name: 'projects',
  //           icon: 'smile',
  //           path: '/list/search/projects',
  //           component: './list/search/projects',
  //         },
  //         {
  //           name: 'applications',
  //           icon: 'smile',
  //           path: '/list/search/applications',
  //           component: './list/search/applications',
  //         },
  //       ],
  //     },
  //     {
  //       path: '/list',
  //       redirect: '/list/table-list',
  //     },
  //     {
  //       name: 'table-list',
  //       icon: 'smile',
  //       path: '/list/table-list',
  //       component: './list/table-list',
  //     },
  //     {
  //       name: 'basic-list',
  //       icon: 'smile',
  //       path: '/list/basic-list',
  //       component: './list/basic-list',
  //     },
  //     {
  //       name: 'card-list',
  //       icon: 'smile',
  //       path: '/list/card-list',
  //       component: './list/card-list',
  //     },
  //   ],
  // },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   icon: 'profile',
  //   routes: [
  //     {
  //       path: '/profile',
  //       redirect: '/profile/basic',
  //     },
  //     {
  //       name: 'basic',
  //       icon: 'smile',
  //       path: '/profile/basic',
  //       component: './profile/basic',
  //     },
  //     {
  //       name: 'advanced',
  //       icon: 'smile',
  //       path: '/profile/advanced',
  //       component: './profile/advanced',
  //     },
  //   ],
  // },
  // {
  //   name: 'result',
  //   icon: 'CheckCircleOutlined',
  //   path: '/result',
  //   routes: [
  //     {
  //       path: '/result',
  //       redirect: '/result/success',
  //     },
  //     {
  //       name: 'success',
  //       icon: 'smile',
  //       path: '/result/success',
  //       component: './result/success',
  //     },
  //     {
  //       name: 'fail',
  //       icon: 'smile',
  //       path: '/result/fail',
  //       component: './result/fail',
  //     },
  //   ],
  // },
  // {
  //   name: 'exception',
  //   icon: 'warning',
  //   path: '/exception',
  //   routes: [
  //     {
  //       path: '/exception',
  //       redirect: '/exception/403',
  //     },
  //     {
  //       name: '403',
  //       icon: 'smile',
  //       path: '/exception/403',
  //       component: './exception/403',
  //     },
  //     {
  //       name: '404',
  //       icon: 'smile',
  //       path: '/exception/404',
  //       component: './exception/404',
  //     },
  //     {
  //       name: '500',
  //       icon: 'smile',
  //       path: '/exception/500',
  //       component: './exception/500',
  //     },
  //   ],
  // },
  // {
  //   name: 'editor',
  //   icon: 'highlight',
  //   path: '/editor',
  //   routes: [
  //     {
  //       path: '/editor',
  //       redirect: '/editor/flow',
  //     },
  //     {
  //       name: 'flow',
  //       icon: 'smile',
  //       path: '/editor/flow',
  //       component: './editor/flow',
  //     },
  //     {
  //       name: 'mind',
  //       icon: 'smile',
  //       path: '/editor/mind',
  //       component: './editor/mind',
  //     },
  //     {
  //       name: 'koni',
  //       icon: 'smile',
  //       path: '/editor/koni',
  //       component: './editor/koni',
  //     },
  //   ],
  // },
  // -----------------------分割线---------------------------
  {
    path: '/',
    redirect: '/course/list',
  },
  {
    component: '404',
  },
];
