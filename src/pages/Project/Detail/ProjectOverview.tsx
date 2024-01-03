import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Button, List, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProForm, ProFormText, ProFormDateTimePicker } from '@ant-design/pro-components';
import {
  projectDelUpdate, //更新项目信息 参数projectId
  getProjectDel, //获取项目信息 参数projectId
  getGroupNot, // 获取项目通知列表 参数projectId
  insertGroupNot, // 发布项目通知
  delGroupNot, // 删除通知 参数 notificationId
} from '@/services/ant-design-pro/api';
import styles from './index.less';
import { history, useAccess } from 'umi';

interface ProjectOverviewProps {
  projectId: number; // 传入的 projectId 属性
}
const NotificationModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制对话框显示状态的变量
  const [form] = Form.useForm(); // Form 实例
  const access = useAccess();
  // 显示对话框
  const showModal = () => {
    setIsModalVisible(true);
  };

  // 处理对话框的提交事件
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values: any) => {
        console.log('Received values of form: ', values);
        values.receivers = '';
        values.courseId = 1;
        // 在这里处理表单提交，例如发送请求到服务器
        await insertGroupNot(values);
        // 关闭对话框
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info: any) => {
        console.log('Validate Failed:', info);
      });
  };

  // 处理对话框的取消事件
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={showModal} disabled={!access.canTA}>
        发布项目通知
      </Button>
      <Modal
        title="发布通知"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="发布"
        cancelText="取消"
      >
        <Form form={form} name="notification_form" layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入通知标题!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="message"
            label="消息内容"
            rules={[{ required: true, message: '请输入通知内容!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
//进入消息详情
const goNotDel = async (item: any) => {
  console.log('🚀 ~ file: index.tsx:103 ~ goNotDel ~ item:', item);
};
const ProjectOverview: React.FC<ProjectOverviewProps> = ({ projectId }) => {
  const [projectDel, setProjectDel] = useState<any>({});
  const [GroupNot, setGroupNot] = useState<any[]>([]);
  console.log('🚀 ~ file: ProjectOverview.tsx:111 ~ GroupNot:', GroupNot);

  // useEffect(() => {
  //   // 定义一个异步函数来获取分组列表
  //   async function fetchGroupList() {
  //     try {
  //       // 发起异步请求获取分组列表
  //       const data = await getGroupNot(projectId);
  //       console.log('🚀 ~ file: ProjectOverview.tsx:117 ~ fetchGroupList ~ data:', data);

  //       // 使用从异步请求获取的数据更新状态
  //       setGroupNot(data);
  //     } catch (error) {
  //       // 如果有错误发生，你可以在这里处理它(例如，设置错误状态或者打印到控制台)
  //       console.error('Failed to fetch group list:', error);
  //     }
  //   }
  //   // 调用上面定义的异步函数来获取数据
  //   fetchGroupList();
  // }, [projectId]); // 这里的projectId是这个effect的依赖项，如果它变化了，effect会重新运行
  const access = useAccess();
  return (
    <div className={styles.mymycont}>
      {
        <>
          <div className={styles.left}>
            <div className={styles.mytit}>项目详情</div>
            <ProForm
              layout="vertical"
              submitter={{
                submitButtonProps: {
                  // 设置为不可点击
                  disabled: !access.canTA,
                },
                searchConfig: {
                  submitText: '修改项目信息',
                },
                render: (_, dom) => dom[1],
              }}
              onFinish={async (values) => {
                console.log(values);
                await projectDelUpdate({
                  ...projectDel,
                  ...values,
                  projectId: parseInt(projectId.toString(), 10),
                });
                // console.log(values);
                // message.success('修改成功');
              }}
              request={async () => {
                const projectDel = await getProjectDel(projectId);
                setProjectDel(projectDel);
                // 使用从异步请求获取的数据更新状态
                const groupNot = await getGroupNot(projectId);
                setGroupNot(groupNot);
                return {
                  ...projectDel,
                };
              }}
            >
              <ProFormText
                name="projectName"
                label="项目名称"
                disabled={!access.canTA}
                rules={[
                  {
                    required: true,
                    message: '请输入项目名称!',
                  },
                ]}
                width="md"
              />
              <ProFormText
                name="description"
                label="项目描述"
                disabled={!access.canTA}
                width="md"
                rules={[
                  {
                    required: true,
                    message: '请输入项目描述!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="groupNumber"
                disabled={!access.canTA}
                label="项目小组数"
                rules={[
                  {
                    required: true,
                    message: '请输入项目小组数!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="maxNumber"
                disabled={!access.canTA}
                label="每个小组最大人数"
                rules={[
                  {
                    required: true,
                    message: '请输入每个小组最大人数!',
                  },
                ]}
              />
              <ProFormDateTimePicker
                name="groupDeadline"
                disabled={!access.canTA}
                label="组队截止时间"
                rules={[
                  {
                    required: true,
                    message: '请选择组队截止时间!',
                  },
                ]}
                width="md"
              />
              <ProFormDateTimePicker
                name="endDeadline"
                disabled={!access.canTA}
                label="项目截止时间"
                rules={[
                  {
                    required: true,
                    message: '请选择项目截止时间!',
                  },
                ]}
                width="md"
              />
            </ProForm>
          </div>
          <div className={styles.mymy}>
            <div className={styles.right}>项目通知</div>
            <List
              itemLayout="horizontal"
              dataSource={GroupNot}
              renderItem={(item, index) => (
                <List.Item
                  onClick={() => {
                    goNotDel(item);
                    history.push(`/project/notdetail/${item.id}`);
                  }}
                  style={{ cursor: 'pointer' }}
                  actions={[
                    <Button
                      type="link"
                      disabled={!access.canTA}
                      onClick={async (e) => {
                        e.stopPropagation(); // 阻止点击事件冒泡到 List.Item
                        console.log(item);
                        await delGroupNot({
                          notificationId: item.id,
                        });
                      }}
                    >
                      删除
                    </Button>,
                  ]}
                >
                  <List.Item.Meta title={<div>通知标题:{item.title}</div>} />
                </List.Item>
              )}
            />
            <NotificationModal />
          </div>
        </>
      }
    </div>
  );
};

export default ProjectOverview;
