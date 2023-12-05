/* eslint-disable */
import request from '@/plugins/globalRequest';

/** 获取当前的用户 GET /api/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 学工号密码登录接口 POST /api/user/login */
export async function login(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 请求邮箱验证码接口 POST /api/user/login/mail/send */
export async function loginMailSend(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/login/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    data: body,
    ...(options || {}),
  });
}

/** 邮箱验证码登录接口 POST /api/user/login/mail/check */
export async function loginMailCheck(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/login/mail/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/user/register */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据条件列举用户 GET /api/user/listByParams */
export async function listUsersByParams(param: API.SearchParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/listByParams', {
    method: 'GET',
    params: param,
    ...(options || {}),
  });
}

/** 新增用户 POST /api/user/insert */
export async function insertUser(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<API.BaseResponse<bigint>>('/api/user/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户 POST /api/user/update */
export async function updateUser(body: API.CurrentUser, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 POST /api/user/delete */
export async function deleteUser(body?: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据课程id列举作业 GET /api/assignment/list */
export async function listAssignments(courseId: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.AssignmentList[]>>('/api/assignment/list', {
    method: 'GET',
    params: {courseId},
    ...(options || {}),
  });
}

/** 新增作业 POST /api/assignment/insert */
export async function insertAssignment(body: API.AssignmentList, options?: { [key: string]: any }) {
  return request<API.BaseResponse<bigint>>('/api/assignment/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改作业信息 POST /api/assignment/update */
export async function updateAssignment(body: API.AssignmentList, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/assignment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除作业 POST /api/assignment/delete */
export async function deleteAssignment(body?: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/assignment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据用户身份及课程id列举项目 GET /api/project/list */
export async function listProjects(courseId: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList[]>>('/api/project/list', {
    method: 'GET',
    params: {courseId},
    ...(options || {}),
  });
}

/** 新增项目 POST /api/project/insert */
export async function insertProject(body: API.ProjectList, options?: { [key: string]: any }) {
  return request<API.BaseResponse<bigint>>('/api/project/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改项目信息 POST /api/project/update */
export async function updateProject(body: API.ProjectList, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/project/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除项目 POST /api/project/delete */
export async function deleteProject(body?: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/project/delete', {
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
  console.log('Fetching notices with options:', options);
  try {
    const response = await request('/api/notification/list', {
      method: 'GET',
      ...(options || {}),
    });
    console.log('Notices received:', response);

    // 格式化响应数据
    const formattedResponse = {
      // @ts-ignore
      data: response.map(item => ({
        id: item.id.toString(), // 确保 id 是字符串
        title: item.title, // 使用响应中的 title
        type: 'notification', // 示例类型，根据需要更改
        datetime: item.createTime || '未知时间', // 使用 createTime 或提供默认值
        // 添加或转换其他需要的字段
        // 如 description, status, avatar 等
      })),
      total: response.length, // 总数为响应数组的长度
      success: true, // 假设请求总是成功的
    };

    console.log('Formatted response:', formattedResponse);
    return formattedResponse;
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw error;  // 可以选择重新抛出错误
  }
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
export async function listCourses(options?: { [key: string]: any }) {
  return request<API.CourseList>('/api/course/list', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 更新课程信息 */
export async function updateCourse(body: API.CourseList, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/course/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除课程 */
export async function deleteCourse(body?: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/course/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建新课程 */
export async function insertCourse(body: API.CourseList, options?: { [key: string]: any }) {
  return request<API.BaseResponse<bigint>>('/api/course/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
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
  return request<API.BaseResponse<API.TAResponse>>(`/api/course/add/ta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { courseId, taId },
    ...(options || {}),
  });
}

// 免职教师助理
export async function dismissTA(courseId: number, taId: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.TAResponse>>(`/api/course/remove/ta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { courseId, taId },
    ...(options || {}),
  });
}

// 添加学生
export async function addStudent(courseId: number, studentId: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.StudentResponse>>(`/api/course/add/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { courseId, studentId },
    ...(options || {}),
  });
}

// 移除学生
export async function removeStudent(courseId: number, studentId: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.StudentResponse>>(`/api/course/remove/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
export async function getCourseNotifications(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>(`/api/course/notification/list`, {
    method: 'GET',
    ...(options || {}),
  });
}
// 删除课程通知
export async function deleteCourseNotification(notificationId: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/course/notification/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { notificationId },
    ...(options || {}),
  });
}
