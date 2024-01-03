import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Modal, Button, List, Form, Input, message } from 'antd';
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
  courseId: number; // 传入的 courseId 属性
}
const NotificationModal = ({ courseId, projectId }) => {
  console.log('🚀 ~ file: ProjectOverview.tsx:21 ~ NotificationModal ~ courseId:', courseId);
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
        values.receivers = null;
        values.courseId = parseInt(courseId, 10);
        // 在这里处理表单提交，例如发送请求到服务器
        console.log(courseId)
        await insertGroupNot(values, projectId);
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
        onOk={() => handleOk()}
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

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ projectId, courseId }) => {
  console.log('🚀 ~ file: ProjectOverview.tsx:92 ~ courseId:', courseId);
  const [projectDel, setProjectDel] = useState<any>({});
  const [GroupNot, setGroupNot] = useState<any[]>([]);

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
                const numberProps = ['groupNumber', 'maxNumber'];

                // 循环遍历对象的属性
                for (const prop in values) {
                  if (numberProps.includes(prop)) {
                    // 如果属性名在指定的数组中，将其值转换为数字类型
                    values[prop] = Number(values[prop]);
                  }
                }
                console.log(values);
                try {
                  const result = await projectDelUpdate({
                    ...projectDel,
                    ...values,
                    projectId: parseInt(projectId.toString(), 10),
                  });

                  if (result && result === true) {
                    message.success('修改成功');
                    return Promise.resolve();
                  } else {
                    throw new Error();
                  }
                } catch (error) {
                  message.error('修改失败，请重试！');
                  return Promise.reject();
                }
              }}
              request={async () => {
                const projectDel = await getProjectDel(projectId);
                setProjectDel(projectDel);
                // 使用从异步请求获取的数据更新状态
                const groupNot = await getGroupNot(projectId);
                setGroupNot(groupNot || []);
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
                    <div
                      key={'delete'}
                      style={{ color: 'red' }}
                      onClick={(e) => {
                        e.stopPropagation(); // 阻止点击事件冒泡到 List.Item
                        Modal.confirm({
                          title: '删除通知',
                          content: '确定删除该通知吗？',
                          okText: '确认',
                          cancelText: '取消',
                          onOk: async () => {
                            try {
                              const result = await delGroupNot({
                                notificationId: item.id,
                              });

                              if (result && result === true) {
                                message.success('删除成功！');
                                const groupNot = await getGroupNot(projectId);
                                setGroupNot(groupNot || []);
                                return Promise.resolve();
                              } else {
                                throw new Error();
                              }
                            } catch (error) {
                              message.error('删除失败，请重试！');
                              return Promise.reject();
                            }
                          },
                        });
                      }}
                    >
                      删除
                    </div>,
                  ]}
                >
                  <List.Item.Meta title={<div>通知:{item.title}<br></br>{item.message}</div>} />
                </List.Item>
              )}
            />
            <NotificationModal courseId={courseId} projectId={projectId}/>
          </div>
        </>
      }
    </div>
  );
};

export default ProjectOverview;
