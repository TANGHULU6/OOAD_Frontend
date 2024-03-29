/* eslint-disable */
import request from '@/plugins/globalRequest';

//获取通知
export async function getNotifications(options?: { [key: string]: any }) {
  return request<API.NoticeIconItem>(`/api/notification/list`, {
    method: 'GET',
    ...(options || {}),
  });
}
export async function queryCurrent(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/accountSettingCurrentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 更新用户信息  */
export async function currentUserUpdate(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/current/update', {
    method: 'POST',
    ...(options || {}),
    data: body,
  });
}

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
    params: { courseId },
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
    params: { courseId },
    ...(options || {}),
  });
}

/** 新增项目 POST /api/project/insert */
export async function insertProject(
    courseId: number,
    body: API.ProjectList,
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<bigint>>('/api/project/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...body, courseId: courseId },
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

export async function getSubmissionById(body?: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.Submission>>('/api/submission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getAssignmentById(param?: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.Assignment>>('/api/assignment', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { assignmentId: param },
    ...(options || {}),
  });
}

export async function getUserBaseInformationById(param?: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.BaseInformation>>('/api/user/getBaseInformationById', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { id: param },
    ...(options || {}),
  });
}

export async function listReviews(assignmentId: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ReviewList[]>>('/api/submission/review/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { assignmentId: assignmentId },
    ...(options || {}),
  });
}

export async function submitReview(body: API.ReviewSubmit, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>('/api/submission/review/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getGradeBook(courseId: bigint, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.GradeBook[]>>('/api/gradeBook', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { courseId: courseId },
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
      data: response?.map((item) => ({
        id: item.id.toString(), // 确保 id 是字符串
        title: item.title, // 使用响应中的 title
        type: 'notification', // 示例类型，根据需要更改
        datetime: item.createTime || '未知时间', // 使用 createTime 或提供默认值
        // 添加或转换其他需要的字段
        // 如 description, status, avatar 等
      })),
      total: response?.length, // 总数为响应数组的长度
      success: true, // 假设请求总是成功的
    };
    console.log('Formatted response:', formattedResponse);
    return formattedResponse;
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw error; // 可以选择重新抛出错误
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
  return request<API.BaseResponse<API.CourseDetail>>('/api/course', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { courseId }, // 将 courseId 作为查询参数传递
    ...(options || {}),
  });
}

// 任命教师助理
export async function appointTA(
    courseId: number,
    taId: number[],
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<boolean>>(`/api/course/add/ta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { courseId, taId },
    ...(options || {}),
  });
}

// 免职教师助理
export async function dismissTA(
    courseId: number,
    taId: number[],
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<boolean>>(`/api/course/remove/ta`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { courseId, taId },
    ...(options || {}),
  });
}

// 添加学生
export async function addStudent(
    courseId: number,
    studentId: number[],
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<boolean>>(`/api/course/add/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { courseId, studentId },
    ...(options || {}),
  });
}

// 移除学生
export async function removeStudent(
    courseId: number,
    studentId: number[],
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<boolean>>(`/api/course/remove/student`, {
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
  return request<API.BaseResponse<API.TeacherList[]>>(`/api/user/listAllTeacherName`, {
    method: 'GET',
    ...(options || {}),
  });
}
// 获取所有教师助理
export async function getAllTAs(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.TAList[]>>(`/api/user/listAllTaName`, {
    method: 'GET',
    ...(options || {}),
  });
}
// 获取所有学生
export async function getAllStudents(options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.StudentList[]>>(`/api/user/listAllStudentName`, {
    method: 'GET',
    ...(options || {}),
  });
}
//获取课程通知
export async function getCourseNotifications(courseId: bigint, options?: { [key: string]: any }) {
  return request<API.NoticeIconList>(`/api/course/notification/list`, {
    method: 'GET',
    params: { courseId },
    ...(options || {}),
  });
}
//发布课程通知
export async function insertCourseNotification(
    body: API.Notification,
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<bigint>>('/api/course/notification/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 删除课程通知
export async function deleteCourseNotification(
    notificationId: number,
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<boolean>>('/api/course/notification/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { notificationId },
    ...(options || {}),
  });
}
export async function getNotificationDetail(
    notificationId: number,
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<API.NotificationDetail>>('/api/notification', {
    method: 'GET',
    params: { notificationId }, // 将 notificationId 作为查询参数传递
    ...(options || {}),
  });
}

export async function getCurrentUserGroupInProject(
    projectId: number,
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<bigint>>('/api/project/group', {
    method: 'GET',
    params: { projectId: projectId }, // Sending projectId and groupId in the request body
    ...(options || {}),
  });
}

export async function getGroupDetails(groupId: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.GroupDetail>>(`/api/group`, {
    method: 'GET',
    params: { groupId },
    ...(options || {}),
  });
}
export async function updateGroupDetails(body: API.GroupDetail, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>(`/api/group/detail/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
export async function joinGroup(groupId: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>(`/api/group/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { groupId: groupId },
    ...(options || {}),
  });
}
export async function leaveGroup(groupId: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<boolean>>(`/api/group/leave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { groupId },
    ...(options || {}),
  });
}

//获取作业详情
export async function getHomeworksDetails(assignmentId: number, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.HomeworkDetail>>(`/api/assignment`, {
    method: 'GET',
    params: { assignmentId },
    ...(options || {}),
  });
}

//更新作业详情
export async function updateHomeworkDetails(
    assignmentId: number,
    body: API.HomeworkDetail,
    options?: { [key: string]: any },
) {
  return request<API.BaseResponse<boolean>>(`/api/assignment/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...body },
    ...(options || {}),
  });
}

//提交作业
export async function submitHomework(
    assignmentId: number,
    files: File[],
    options?: { [key: string]: any },
) {
  const formData = new FormData();
  files.forEach((file) => formData.append('files[]', file));

  return request<API.BaseResponse<boolean>>(`/api/assignment/submit`, {
    method: 'POST',
    headers: {
      // 需要根据后端要求设置正确的 Content-Type
      // 'Content-Type': 'multipart/form-data',
    },
    params: { assignmentId },
    data: formData,
    ...(options || {}),
  });
}

/** 根据项目ID获取项目详情 GET*/
export async function getProjectDel(projectId: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList[]>>('/api/project', {
    method: 'GET',
    params: { projectId },
    ...(options || {}),
  });
}
/** 根据项目ID获取项目详情下的小组列表 GET */
export async function getProjectDelGroups(projectId: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList[]>>('/api/project/groups', {
    method: 'GET',
    params: { projectId },
    ...(options || {}),
  });
}
/** 查询当前用户在当前项目哪个小组内  */
export async function getProjectDelGroups2(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList>>('/api/project/group', {
    method: 'POST',
    ...(options || {}),
    data: body,
  });
}
/** 根据项目ID获取当前项目通知列表  */
export async function getGroupNot(projectId: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList>>('/api/project/notification/list', {
    method: 'GET',
    params: { projectId },
    ...(options || {}),
  });
}
/** 发布项目通知  */
export async function insertGroupNot(body: any, courseId: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList>>('/api/project/notification/insert', {
    method: 'POST',
    ...(options || {}),
    data: {...body, courseId: courseId},
  });
}
/** 根据通知ID删除通知  */
export async function delGroupNot(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList>>('/api/project/notification/delete', {
    method: 'POST',
    ...(options || {}),
    data: body,
  });
}
/** 用户加入小组  */
export async function joinGroups(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList>>('/api/group/join', {
    method: 'POST',
    ...(options || {}),
    data: body,
  });
}
/** 用户退出小组  */
export async function leaveGroups(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList>>('/api/group/leave', {
    method: 'POST',
    ...(options || {}),
    data: body,
  });
}
/** 更新项目详情  */
export async function projectDelUpdate(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.ProjectList>>('/api/project/detail/update', {
    method: 'POST',
    ...(options || {}),
    data: body,
  });
}

export async function GroupUpdate(body: any, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.GroupDetail>>('/api/group/detail/update', {
    method: 'POST',
    ...(options || {}),
    data: body,
  });
}
