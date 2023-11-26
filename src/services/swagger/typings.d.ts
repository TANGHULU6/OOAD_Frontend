// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Order = {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
  };

  type Category = {
    id?: number;
    name?: string;
  };

  type User = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  };

  type Tag = {
    id?: number;
    name?: string;
  };

  type Pet = {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    /** pet status in the store */
    status?: 'available' | 'pending' | 'sold';
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
    id: number;
    name: string;
    teacher: Teacher; // 假设教师信息是完整的对象
    teachingAssistants: Teacher[]; // 假设助教信息是教师对象的数组
    students: Student[]; // 假设学生信息是学生对象的数组
    creationTime: string;
    // 可以添加其他课程相关字段
  };
}
