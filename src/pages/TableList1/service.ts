// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

// export async function getCourseList(
//     params: {
//       current?: number;
//       pageSize?: number;
//     },
//     options?: { [key: string]: any },
// ) {
//   return request<{
//     data: TableListItem[];
//     total?: number;
//     success?: boolean;
//   }>('/api/course/list', {  // 更新 API 端点
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
export async function getCourseList(params: { current?: number; pageSize?: number; }, options?: { [key: string]: any }) {
  const response = await request('/api/course/list', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
  console.log(response)
  // 检查 API 返回的 code 是否表示成功
  const success = response.code === 20000;

  // 转换数据格式以适应 ProTable
  return {
    data: response,
    total: response.length, // 假设所有数据都在当前页返回
    success: true,
  };
}

export async function addCourse(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/course/insert', {  // 更新 API 端点
    data,
    method: 'POST',
    ...(options || {}),
  });
}
export async function updateCourse(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/course/update', {  // 更新 API 端点
    data,
    method: 'POST', // 根据实际情况可能需要更改请求方法
    ...(options || {}),
  });
}
export async function removeCourse(data: { id: number[] }, options?: { [key: string]: any }) {
  return request<boolean>('/api/course/delete', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

