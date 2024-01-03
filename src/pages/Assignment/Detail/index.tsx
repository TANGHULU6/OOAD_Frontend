// HomeworkDetailsPage 组件
import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProForm, { ProFormText, ProFormDateTimePicker, ProFormSelect } from '@ant-design/pro-form';
import { getHomeworksDetails, updateHomeworkDetails, submitHomework } from '@/services/ant-design-pro/api';
import {history, useAccess, useParams} from 'umi';

const HomeworkDetailsPage = () => {
  // const [homeworkDetails, setHomeworkDetails] = useState({});
  const [fileList, setFileList] = useState([]);
  const {assignmentId} = useParams();
  const [homeworkDetails, setHomeworkDetails] = useState({
    title: 'default',
    description: 'default',
    startTime: null,  // Use appropriate default for date-time fields
    endTime: null,
    assignmentType: 0, // Assuming a default value
  });
  async function fetchHomeworkDetails() {
    try {
      const response = await getHomeworksDetails(assignmentId);
      setHomeworkDetails({
          // @ts-ignore
          assignmentId: assignmentId,
          // @ts-ignore
          title: response.title,
          // @ts-ignore
          startTime: response.startTime,
          // @ts-ignore
          endTime: response.endTime,
          // @ts-ignore
          description: response.description,
          // @ts-ignore
          assignmentType: response.assignmentType
        }
      );
      // 根据响应设置isTeacherOrAdmin状态
      // setIsTeacherOrAdmin(response.data.isTeacherOrAdmin);
    } catch (error) {
      message.error('获取作业详情失败');
    }
  }
  useEffect(() => {
    console.log("Current assignmentId:", assignmentId);
    if (assignmentId) {
      fetchHomeworkDetails();
    }
  }, [assignmentId]);


  const access = useAccess();
  const handleHomeworkUpdate = async (values) => {
    try {
      await updateHomeworkDetails(assignmentId, values);
      message.success('作业信息已更新');
      fetchHomeworkDetails(); // 重新获取更新后的作业详情
    } catch (error) {
      message.error('更新作业信息失败');
    }
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const handleSubmit = async () => {
    try {
      await submitHomework(assignmentId, fileList);
      message.success('作业提交成功');
      // 跳转到提交详情页
      // history.push(`/submission/${record.id}`);
      history.push(`/submission/${assignmentId}`);
    } catch (error) {
      message.error('提交作业失败');
    }
  };

  return (
    <div style={{paddingLeft: '200px', paddingRight: '200px'}}>
      <h1>作业详情</h1>
      <div>
        <p>标题: {homeworkDetails.title}</p>
        <p>描述: {homeworkDetails.description}</p>
        <p>开始时间: {new Date(homeworkDetails.startTime).toLocaleString()}</p>
        <p>截止时间: {new Date(homeworkDetails.endTime).toLocaleString()}</p>
        <p>类型: {homeworkDetails.assignmentType === 0 ? '个人作业' : '小组作业'}</p>
      </div>

      {access.canTeacher && (
        <ProForm initialValues={homeworkDetails} onFinish={handleHomeworkUpdate}>
          <ProFormText
            name="title"
            label="作业标题"
            rules={[{ required: true, message: '请输入作业标题' }]}
          />
          <ProFormText
            name="description"
            label="作业描述"
            rules={[{ required: true, message: '请输入作业描述' }]}
          />
          <ProFormDateTimePicker
            name="startTime"
            label="开始时间"
            rules={[{ required: true, message: '请选择开始时间' }]}
          />
          <ProFormDateTimePicker
            name="endTime"
            label="截止时间"
            rules={[{ required: true, message: '请选择截止时间' }]}
          />
          <ProFormSelect
            name="assignmentType"
            label="作业类型"
            options={[
              { label: '个人作业', value: 0 },
              { label: '小组作业', value: 1 },
            ]}
            rules={[{ required: true, message: '请选择作业类型' }]}
          />
          <Button type="primary" htmlType="submit">更新作业</Button>
        </ProForm>
      )}

      <div>
        <Upload onChange={handleFileChange} multiple={true} fileList={fileList}>
          <Button icon={<UploadOutlined />}>上传作业文件</Button>
        </Upload>
        <Button type="primary" onClick={handleSubmit} disabled={fileList.length === 0}>提交作业</Button>
      </div>
    </div>
  );
};

export default HomeworkDetailsPage;
