import {PlusOutlined} from '@ant-design/icons';
import {ActionType, ModalForm, PageContainer, ProColumns, ProFormSelect, ProFormText, ProTable} from '@ant-design/pro-components';
import {Avatar, Button, message, Modal} from 'antd';
import {useRef, useState} from 'react';
import {deleteUser, insertUser, listUsersByParams, updateUser} from "@/services/ant-design-pro/api";
import styles from '@/components/RightContent/index.less';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
    hideInTable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, currentUser) => {
      return (
        <a href={currentUser.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
          <Avatar
            style={{ fontSize: 24 }}
            src={currentUser.avatarUrl}
            size="large"
            className={styles.avatar}
          >
            {currentUser.username?.charAt(0)}
          </Avatar>
        </a>
      );
    },
    hideInSearch: true,
  },
  {
    title: '学工号',
    dataIndex: 'userAccount',
  },
  {
    title: '姓名',
    dataIndex: 'username',
  },
  {
    title: '身份',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '学生',
        color: 'yellow'
      },
      1: {
        text: '教师助理',
        color: 'green'
      },
      2: {
        text: '教师',
        color: 'red'
      },
      3: {
        text: '管理员',
        color: 'brown'
      }
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '未指定'
      },
      1: {
        text: '男'
      },
      2: {
        text: '女'
      }
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
    editable: false
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: "dateTimeRange",
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id.toString());
        }}
      >
        编辑
      </a>,
      <a
        key={"delete"}
        style={{color: 'red'}}
        onClick={() => {
          Modal.confirm({
            title: '删除会议',
            content: '确定删除该用户吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
              try {
                const result = await deleteUser(record.id);
                // @ts-ignore
                if (result && result === true) {
                  message.success("删除成功！")
                  action?.reload()
                  return Promise.resolve()
                } else {
                  throw new Error();
                }
              } catch (error) {
                message.error('删除失败，请重试！');
                return Promise.reject()
              }
            },
          });
        }}
      >
        删除
      </a>
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  return (
    <PageContainer>
      <ProTable<API.CurrentUser>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // @ts-ignore
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          await waitTime(2000);
          const roomList = await listUsersByParams(params);
          return {
            data: roomList
          }
        }}
        editable={{
          type: 'single',
          onSave: async (key, record, originRow, newLineConfig) => {
            try {
              const result = await updateUser(record);
              // @ts-ignore
              if (result && result === true) {
                message.success("保存成功！")
                actionRef.current?.reload()
                return Promise.resolve()
              } else {
                throw new Error();
              }
            } catch (error) {
              message.error('保存失败，请重试！');
              return Promise.reject()
            }
          },
          onDelete: async (key, row) => {
            try {
              const result = await deleteUser(row.id);
              // @ts-ignore
              if (result && result === true) {
                message.success("删除成功！")
                actionRef.current?.reload()
                return Promise.resolve()
              } else {
                throw new Error();
              }
            } catch (error) {
              message.error('删除失败，请重试！');
              return Promise.reject()
            }
          }
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={false}
        dateFormatter="string"
        headerTitle="会议列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined/>}
            onClick={() => {
              handleModalVisible(true)
            }}
            type="primary"
          >
            新建
          </Button>
        ]}
      />
      <ModalForm
        title="添加用户"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          console.log(value)
          try {
            const result = await insertUser(value as API.CurrentUser);
            // @ts-ignore
            if (result) {
              message.success("添加成功！")
              actionRef.current?.reload()
              return true
            } else {
              throw new Error();
            }
          } catch (error) {
            message.error('添加失败，请重试！');
            return true
          }
        }}
      >
        <ProFormText
          name="userAccount"
          label="学工号"
          rules={[
            {
              required: true,
              message: '请输入学工号!',
            },
            {
              pattern: /^[0-9]{8}$/,
              message: '学工号格式不正确!',
            },
          ]}
          width="md"
        />
        <ProFormText
          name="username"
          label="姓名"
          rules={[
            {
              required: true,
              message: '请输入姓名!',
            },
          ]}
          width="md"
        />
        <ProFormSelect
          name="userRole"
          label="用户身份"
          rules={[
            {
              required: true,
              message: '请选择用户身份!',
            },
          ]}
          options={[
            {
              label: '学生',
              value: 0,
            },
            {
              label: '教师助理',
              value: 1,
            },
            {
              label: '教师',
              value: 2,
            },
            {
              label: '管理员',
              value: 3,
            },
          ]}
          width="md"
        />
        <ProFormText
          name="age"
          label="年龄"
          rules={[
            {
              required: false,
              message: '请输入年龄!',
            },
            {
              pattern: /^[1-9][0-9]?[0-9]?$/,
              message: '年龄格式不正确!',
            },
          ]}
          width="md"
        />
        <ProFormSelect
          name="gender"
          label="性别"
          rules={[
            {
              required: true,
              message: '请输入性别!',
            },
          ]}
          options={[
            {
              label: '不指定',
              value: 0,
            },
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 2,
            },
          ]}
          width="md"
        />
        <ProFormText
          name="email"
          label="邮箱"
          rules={[
            {
              required: false,
              message: '请输入邮箱!',
            },
            {
              pattern: /^[A-Za-z0-9+_.-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,8}$/,
              message: '邮箱格式不正确!',
            },
          ]}
          width="md"
        />
      </ModalForm>
    </PageContainer>
  );
};
