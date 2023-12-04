// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BaseResponse<T> = {
    code: number
    data: T
    message: string
    description: string
  }

  type CurrentUser = {
    id: bigint;
    userAccount?: string;
    username?: string;
    userRole: number;
    age?: number;
    gender?: number;
    email?: string;
    avatarUrl?: string;
    technicalStack?: string;
    programmingSkills?: string;
    intendedTeammates?: string;
    createTime?: Date;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
  };

  type LoginWithMailParams = {
    mailAddress?: string;
    verificationCode?: string;
  };

  type LoginResult = {
    id?: bigint;
    userAccount?: string;
    userRole?: number;
    age?: number;
    gender?: number;
    email?: string;
    avatarUrl?: string;
    technicalStack?: string;
    programmingSkills?: string;
    intendedTeammates?: string;
    createTime?: Date;
  };

  type RegisterParams = {
    // 变量名后加?表示该属性为可选属性
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type RegisterResult = bigint;

  type SearchParams = {
    id?: bigint;
    userAccount?: string;
    username?: string;
    userRole?: number;
    age?: number;
    gender?: number;
    email?: string;
    startTime?: Date;
    endTime?: Date;
    current: number;
    pageSize: number;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };


  type ApiResponse = {
    code?: number;
    type?: string;
    message?: string;
  };
  type Course = {
    id?: number;
    name: string;
    teacherId: number;
    taIdList?: number[];
    studentCount?: number;
    creationTime?: string;
  };

  type Teacher = {
    id: number;
    name: string;
    // ... 其他教师相关属性 ...
  };

  type Student = {
    id: number;
    name: string;
    // ... 其他学生相关属性 ...
  };

  // 其他必要的类型声明，如课程列表、教师列表等
  type CourseList = Course[];
  type TeacherList = Teacher[];
  type StudentList = Student[];
  // 教师助理响应类型
  type TAResponse = {
    success: boolean;
    message?: string;
    // 可以添加其他响应字段
  };

  // 学生响应类型
  type StudentResponse = {
    success: boolean;
    message?: string;
    // 可以添加其他响应字段
  };

  // 课程详细信息类型
  type CourseDetail = {
    courseName: string;           // Name of the course
    teacherName: string;          // Name of the teacher
    taNameList: (string | null)[]; // List of teaching assistant names, which may include null
    studentNum: number;           // Number of students
    createTime: string;           // Creation time of the course
    // Add other fields if necessary
  };
}
