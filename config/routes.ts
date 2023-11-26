export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/admin',
    name: 'teacher',
    icon: 'crown',
    access: 'canTeacher',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'Course List',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'Notify Table',
    icon: 'table',
    path: '/Notification',
    component: '@/pages/Notification/Notification',
  },
  {
    name: 'CourseOverview',
    icon: 'table',
    path: '/CourseOverview',
    component: '@/pages/CourseOverview',
  },
  {
    name: 'Test',
    icon: 'table',
    path: '/NotificationContent',
    component: '@/pages/Notification/NotificationContent',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
