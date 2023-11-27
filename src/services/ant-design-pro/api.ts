// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
// 获取课程列表
export async function getCourseList(options?: { [key: string]: any }) {
  return request<API.CourseList>('/api/course/list', {
    method: 'GET',
    ...(options || {}),
  });
}
// 更新课程信息
export async function updateCourse(params: { id: number; courseName: string; teacherId: number; taIdList: number[] }, options?: { [key: string]: any }) {
  return request<boolean>('/api/course/update', {
    method: 'POST',
    data: {
      ...params
    },
    ...(options || {}),
  });
}
// 删除课程
export async function removeCourse(params: { id: number }, options?: { [key: string]: any }) {
  return request<boolean>('/api/course/delete', {
    method: 'POST',
    data: {
      ...params
    },
    ...(options || {}),
  });
}
// 创建新课程
export async function addCourse(params: { courseName: string; teacherId: number; taIdList: number[] }, options?: { [key: string]: any }) {
  return request<{ courseId: bigint }>('/api/course/insert', {
    method: 'POST',
    data: {
      ...params
    },
    ...(options || {}),
  });
}
// 获取课程详情
export async function getCourseDetail(courseId: number, options?: { [key: string]: any }) {
  return request<API.CourseDetail>('/api/course', {
    method: 'GET',
    params: { courseId }, // 将 courseId 作为查询参数传递
    ...(options || {}),
  });
}

// 任命教师助理
export async function appointTA(courseId: number, taId: number, options?: { [key: string]: any }) {
  return request<API.TAResponse>(`/api/course/add/ta`, {
    method: 'POST',
    data: { courseId, taId },
    ...(options || {}),
  });
}

// 免职教师助理
export async function dismissTA(courseId: number, taId: number, options?: { [key: string]: any }) {
  return request<API.TAResponse>(`/api/course/remove/ta`, {
    method: 'POST',
    data: { courseId, taId },
    ...(options || {}),
  });
}

// 添加学生
export async function addStudent(courseId: number, studentId: number, options?: { [key: string]: any }) {
  return request<API.StudentResponse>(`/api/course/add/student`, {
    method: 'POST',
    data: { courseId, studentId },
    ...(options || {}),
  });
}

// 移除学生
export async function removeStudent(courseId: number, studentId: number, options?: { [key: string]: any }) {
  return request<API.StudentResponse>(`/api/course/remove/student`, {
    method: 'POST',
    data: { courseId, studentId },
    ...(options || {}),
  });
}

// 获取所有教师
export async function getAllTeachers(options?: { [key: string]: any }) {
  return request<API.TeacherList>(`/api/user/listAllTeacherName`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 获取所有学生
export async function getAllStudents(options?: { [key: string]: any }) {
  return request<API.StudentList>(`/api/user/listAllStudentName`, {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getCourseNotifications(courseId: number, options?: { [key: string]: any }) {
  return request<API.NoticeIconList>(`/api/course/notification/list`, {
    method: 'GET',
    params: { courseId }, // Passing courseId as a query parameter
    ...(options || {}),
  });
}
export async function deleteCourseNotification(notificationId: number, options?: { [key: string]: any }) {
  return request<boolean>('/api/course/notification/delete', {
    method: 'POST',
    data: { notificationId }, // Sending notificationId in the request body
    ...(options || {}),
  });
}
