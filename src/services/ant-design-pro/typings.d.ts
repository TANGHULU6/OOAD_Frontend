// @ts-ignore
/* eslint-disable */

declare namespace API {
    type BaseResponse<T> = {
        code: number;
        data: T;
        message: string;
        description: string;
    };

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

    type ProjectList = {
        id: bigint;
        projectName: string;
        description?: string;
        groupDeadline?: Date;
        endDeadline?: Date;
    };

    type AssignmentList = {
        id: bigint;
        title: string;
        description?: string;
        startTime?: Date;
        endTime?: Date;
        assignmentType: number;
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

    type NoticeIcons = {
        courseId?: string;
        createTime?: string;
        id?: string;
        isDeleted?: string;
        message?: string;
        projectId?: string;
        senderId?: string;
        title?: string;
        updateTime?: string;
    };
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

    export type TeacherList = {
        id: bigint;
        userName: string;
    };

    export type TAList = {
        id: bigint;
        username: string;
    };

    export type StudentList = {
        id: bigint;
        username: string;
    };
    // 课程详细信息类型
    export type CourseDetail = {
        courseName: string; // Name of the course
        teacherName?: string; // Name of the teacher
        taNameList?: string[]; // List of teaching assistant names, which may include null
        studentNum: number; // Number of students
        createTime: string; // Creation time of the course
        // Add other fields if necessary
    };
    export type CourseList = {
        id: bigint;
        courseName: string;
    };

    // 通知详细信息类型
    export type NotificationDetail = {
        id: bigint; // 通知的唯一标识符
        senderName: string; // 发送者名称
        title: string; // 通知标题
        message: string; // 通知内容
        courseName?: string; // 相关课程名称（可选）
        projectName?: string; // 相关项目名称（可选）
        sendTime: string; // 发送时间
        isRead: boolean; // 是否已读标志
        // 根据需要添加其他字段
    };
    export type Notification = {
        courseId: bigint;
        title: string;
        message: string;
        receivers?: number[];
    };
    export type GroupDetail = {
        id: bigint; // Unique identifier for the group
        groupName: string; // Name of the group
        groupLeader: string; // Name of the group leader
        defenceTeacher?: string; // Name of the defence teacher (optional)
        presentationTime?: string; // Time of presentation (optional)
        publicInfo?: string; // Publicly available information about the group (optional)
        memberList?: MemberList[]; // List of members in the group
        projectDetails?: ProjectList; // Details of the project associated with the group
        // Add other relevant fields as necessary
    };

    export type MemberList = {
        id: bigint; // Unique identifier for the member
        username: string; // Name of the member
        role: string; // Role of the member in the group
        // Add other relevant fields as necessary
    };
}
