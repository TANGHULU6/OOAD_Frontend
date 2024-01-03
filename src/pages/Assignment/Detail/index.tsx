// HomeworkDetailsPage 组件
import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Form, message, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {ProFormDateTimePicker, ProFormSelect, ProFormText} from '@ant-design/pro-form';
import {getHomeworksDetails, submitHomework, updateHomeworkDetails} from '@/services/ant-design-pro/api';
import {history, useAccess, useParams} from 'umi';
import {UploadProps} from "antd/es/upload/interface";
import styles from "@/pages/account/settings/components/BaseView.less";

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

  const customRequest = (option: any) => {
    const formData = new FormData();

    formData.append('file', option.file);
    fetch('http://localhost:8000/api/assignment/upload?assignmentId=' + assignmentId, {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
      // setUserInfo({avatarUrl: res.data})
      setFileList([]);
      option.onSuccess();
      history.push(`/submission/${res.data}`);
    })
    .catch(() => {
      message.error('upload failed.');
    })
  }

  const beforeUpload = (file: any) => {
    console.debug("file type:", file.type);
    // const allowFormat = file.type === 'csv';
    // if (!allowFormat) {
    //   message.error('只允许 CSV 文件!', 1000)
    // }
    const fileSize = file.size / 1024 / 1024 < 20;
    if (!fileSize) {
      message.error('作业文件应当小于20MB!', 1000)
    }
    // return allowFormat && fileSize;
    return fileSize;
  }

  const handleChange = (info: any) => {
    // console.debug("info:", info)
    if (info.file.status === 'done') {
      message.success('上传成功');
    }
    if (info.file.status === 'error') {
      message.error('上传失败');
    }
  };

  const props: UploadProps = {
    accept: ".pdf, .md",	//文件类型
    maxCount: 1,
    showUploadList: false,
    beforeUpload: beforeUpload,	//上传前的钩子
    onChange: handleChange,	//上传中、完成、失败都会调用这个函数
    customRequest: customRequest,	//覆盖默认的上传行为，自定义上传实现
  };

  return (
    <div style={{paddingLeft: '200px', paddingRight: '200px'}}>
      <Descriptions title="作业详情" bordered>
        <Descriptions.Item label="标题" span={3}>{homeworkDetails.title}</Descriptions.Item>
        <Descriptions.Item label="描述" span={3}>{homeworkDetails.description}</Descriptions.Item>
        <Descriptions.Item label="开始时间" span={3}>{new Date(homeworkDetails.startTime).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="截止时间" span={3}>{new Date(homeworkDetails.endTime).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="类型" span={3}>{homeworkDetails.assignmentType === 0 ? '个人作业' : '小组作业'}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="更新作业信息" style={{borderTop: 60}}></Descriptions>
      {access.canTeacher && (
        <Form initialValues={homeworkDetails} onFinish={handleHomeworkUpdate}>
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
          <Button htmlType="submit">更新作业信息</Button>
        </Form>
      )}

      <Upload {...props}>
        <div className={styles.button_view}>
          <Button type="primary">
            <UploadOutlined/>
            上传作业文件并提交
          </Button>
        </div>
      </Upload>
      {/*<div>*/}
        {/*<Upload onChange={handleFileChange} multiple={false} fileList={fileList}>*/}
        {/*  <Button type="primary" icon={<UploadOutlined />}>上传作业</Button>*/}
        {/*</Upload>*/}
        {/*<Button type="primary" onClick={handleSubmit} disabled={fileList.length === 0}>提交作业</Button>*/}
      {/*</div>*/}
    </div>
  );
};

export default HomeworkDetailsPage;
