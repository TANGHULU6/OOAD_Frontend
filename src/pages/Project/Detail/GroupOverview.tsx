import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Button, List, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ProForm, ProFormText, ProFormDateTimePicker } from '@ant-design/pro-components';
import {
  getProjectDelGroups, //获取小组列表 参数projectId
  getProjectDelGroups2, //查询用户在哪个小组内 参数projectId
  joinGroups, //用户加入小组 参数groupId
  leaveGroups, //用户退出小组 参数groupId
  getGroupNot, // 获取项目通知列表 参数projectId
  insertGroupNot, // 发布项目通知
  delGroupNot, // 删除通知 参数 notificationId
} from '@/services/ant-design-pro/api';
import styles from './index.less';
import { history, useAccess } from 'umi';

interface DataType {
  groupName: string;
  groupCurrentNumber: string;
  groupMaxNumber: string;
  publicInfo: string;
}
const notData = [
  {
    id: 1,
    title: 'Ant Design Title 1',
  },
  {
    id: 2,
    title: 'Ant Design Title 2',
  },
  {
    id: 3,
    title: 'Ant Design Title 3',
  },
  {
    id: 4,
    title: 'Ant Design Title 4',
  },
];
const columns: ColumnsType<DataType> = [
  {
    title: '小组名称',
    dataIndex: 'groupName',
    key: 'groupName',
  },
  {
    title: '小组当前人数',
    dataIndex: 'groupCurrentNumber',
    key: 'groupCurrentNumber',
  },
  {
    title: '小组最大人数',
    dataIndex: 'groupMaxNumber',
    key: 'groupMaxNumber',
  },
  {
    title: '小组公开信息',
    key: 'publicInfo',
    dataIndex: 'publicInfo',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button
          onClick={(e) => {
            e.stopPropagation(); // 阻止事件冒泡
            handleJoin(record);
          }}
        >
          加入
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation(); // 阻止事件冒泡
            handleExit(record);
          }}
        >
          退出
        </Button>
      </Space>
    ),
  },
];
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
//加入小组
const handleJoin = async (record: DataType) => {
  console.log('加入 clicked for record:', record);
  await joinGroups({ groupId: 1 });
};
//退出小组
const handleExit = async (record: DataType) => {
  console.log('退出 clicked for record:', record);
  await leaveGroups({ groupId: 1 });
};
//进入消息详情
const goNotDel = async (item: any) => {
  console.log('🚀 ~ file: index.tsx:103 ~ goNotDel ~ item:', item);
};
const data: DataType[] = [
  {
    groupName: '小组名称',
    groupCurrentNumber: '10',
    groupMaxNumber: '100',
    publicInfo: '公开信息',
  },
];

interface GroupOverviewProps {
  projectId: number; // 传入的 projectId 属性
}

const GroupOverview: React.FC<GroupOverviewProps> = ({ projectId }) => {
  console.log('🚀 ~ file: GroupOverview.tsx:183 ~ projectId:', projectId);
  const [groupList, setGroupList] = useState<any>({});
  //   const groupList = await getProjectDelGroups(projectId);
  //   setGroupList(projectDel);
  const access = useAccess();
  return (
    <div className={styles.baseView}>
      {
        <>
          <div className={styles.right}>
            <div className={styles.mytit}>项目内小组详情</div>
            <Table
              columns={columns}
              onRow={(record) => {
                return {
                  onClick: (event) => {
                    console.log('🚀 ~ file: index.tsx:192 ~ ProjectDetail ~ event:', record);
                    history.push(`/group`);
                  },
                };
              }}
              dataSource={data}
            />
            <div className={styles.mytit}>项目通知</div>
            <List
              itemLayout="horizontal"
              dataSource={notData}
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

export default GroupOverview;
