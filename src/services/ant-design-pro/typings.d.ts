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

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
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
}
