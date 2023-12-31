import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProForm, { ProFormText, ProFormDateTimePicker, ProFormSelect } from '@ant-design/pro-form';

const HomeworkDetailsPage = () => {
  // 假设这里有一个函数来获取作业详情
  const [homeworkDetails, setHomeworkDetails] = useState({});
  const [fileList, setFileList] = useState([]);
  const [isTeacherOrAdmin, setIsTeacherOrAdmin] = useState(false); // 根据用户角色设置

  useEffect(() => {
    // 获取作业详情
    // setHomeworkDetails(...);
    // setIsTeacherOrAdmin(...); // 设置用户角色
  }, []);

  const handleHomeworkUpdate = (values) => {
    // 更新作业信息
    message.success('作业信息已更新');
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const handleSubmit = () => {
    // 提交作业
    message.success('作业提交成功');
    // 跳转到提交详情页
  };

  return (
    <div>
      <h1>作业详情</h1>
      <div>
        <p>标题: {homeworkDetails.title}</p>
        <p>描述: {homeworkDetails.description}</p>
        <p>开始时间: {homeworkDetails.startTime}</p>
        <p>截止时间: {homeworkDetails.endTime}</p>
        <p>类型: {homeworkDetails.type}</p>
      </div>

      {isTeacherOrAdmin && (
        <ProForm onFinish={handleHomeworkUpdate}>
          <ProFormText name="title" label="作业标题" />
          <ProFormText name="description" label="作业描述" />
          <ProFormDateTimePicker name="startTime" label="开始时间" />
          <ProFormDateTimePicker name="endTime" label="截止时间" />
          <ProFormSelect
            name="type"
            label="作业类型"
            options={[
              { label: '个人作业', value: 'individual' },
              { label: '小组作业', value: 'group' },
            ]}
          />
          <Button type="primary" htmlType="submit">
            更新作业
          </Button>
        </ProForm>
      )}

      <div>
        <Upload
          onChange={handleFileChange}
          multiple={false}
          fileList={fileList}>
          <Button icon={<UploadOutlined />}>上传作业</Button>
        </Upload>
        <Button type="primary" onClick={handleSubmit}>提交作业</Button>
      </div>
    </div>
  );
};

export default HomeworkDetailsPage;
