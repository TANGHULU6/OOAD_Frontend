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
    path: '/new',
    component: '@/pages/layouts/Newpage',
  },
  {
    name: 'CourseOverview',
    icon: 'table',
    path: '/test',
    component: '@/pages/CourseOverview',
  },
  {
    name: 'Test',
    icon: 'table',
    path: '/test',
    component: '@/pages/CourseOverview',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
